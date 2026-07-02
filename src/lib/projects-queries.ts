import "server-only";
import { eq, asc, desc, sql, and, ne } from "drizzle-orm";

import { db } from "@/db";
import { projects, projectImages, type Project, type ProjectImage } from "@/db/schema";
import { getPublicUrl } from "@/lib/storage";

/** Shape returned to the public site — includes full image URLs. */
export interface ProjectWithImages extends Project {
  images: (ProjectImage & { url: string })[];
}

/** Shape returned to the admin — includes image URLs and all projects (drafts too). */
export interface AdminProjectWithImages extends Project {
  images: (ProjectImage & { url: string })[];
}

function attachUrls(imgs: ProjectImage[]): (ProjectImage & { url: string })[] {
  return imgs.map((img) => ({ ...img, url: getPublicUrl(img.storageKey) }));
}

/** Convert a title to a URL-safe slug. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Ensure a slug is unique by appending -2, -3, etc. if needed. */
async function ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
  let slug = baseSlug;
  let suffix = 2;
  while (true) {
    const conditions = [eq(projects.slug, slug)];
    if (excludeId !== undefined) conditions.push(ne(projects.id, excludeId));
    const [existing] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(and(...conditions))
      .limit(1);
    if (!existing) return slug;
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }
}

/** Get all published projects for the public gallery, ordered featured → sortOrder → createdAt. */
export async function getPublishedProjects(): Promise<ProjectWithImages[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(
      desc(projects.featured),
      asc(projects.sortOrder),
      desc(projects.createdAt)
    );

  if (rows.length === 0) return [];

  const imgs = await db
    .select()
    .from(projectImages)
    .where(
      sql`${projectImages.projectId} IN (${sql.join(
        rows.map((r) => sql`${r.id}`),
        sql`,`
      )})`
    )
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id));

  return rows.map((p) => ({
    ...p,
    images: attachUrls(imgs.filter((i) => i.projectId === p.id)),
  }));
}

/** Get a single published project by slug (public). */
export async function getPublishedProjectBySlug(
  slug: string
): Promise<ProjectWithImages | null> {
  const [row] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .limit(1);
  if (!row) return null;

  const imgs = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, row.id))
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id));

  return { ...row, images: attachUrls(imgs) };
}

/** Get a single project by ID (admin — includes drafts). */
export async function getProjectById(id: number): Promise<AdminProjectWithImages | null> {
  const [row] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!row) return null;

  const imgs = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, id))
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id));

  return { ...row, images: attachUrls(imgs) };
}

/** Get all projects (admin — includes drafts). */
export async function getAllProjects(): Promise<AdminProjectWithImages[]> {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.featured), asc(projects.sortOrder), desc(projects.createdAt));

  if (rows.length === 0) return [];

  const imgs = await db
    .select()
    .from(projectImages)
    .where(
      sql`${projectImages.projectId} IN (${sql.join(
        rows.map((r) => sql`${r.id}`),
        sql`,`
      )})`
    )
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id));

  return rows.map((p) => ({
    ...p,
    images: attachUrls(imgs.filter((i) => i.projectId === p.id)),
  }));
}

export interface ProjectInput {
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  location?: string;
  published?: boolean;
  featured?: boolean;
  sortOrder?: number;
}

/** Create a new project. */
export async function createProject(input: ProjectInput): Promise<Project> {
  const baseSlug = input.slug?.trim() ? slugify(input.slug) : slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug);

  const [row] = await db
    .insert(projects)
    .values({
      title: input.title,
      slug,
      description: input.description ?? null,
      category: input.category ?? null,
      location: input.location ?? null,
      published: input.published ?? true,
      featured: input.featured ?? false,
      sortOrder: input.sortOrder ?? 0,
    })
    .returning();
  return row;
}

/** Update a project. */
export async function updateProject(
  id: number,
  input: Partial<ProjectInput>
): Promise<Project | null> {
  const set: Record<string, unknown> = { updatedAt: new Date() };
  if (input.title !== undefined) set.title = input.title;
  if (input.description !== undefined) set.description = input.description;
  if (input.category !== undefined) set.category = input.category;
  if (input.location !== undefined) set.location = input.location;
  if (input.published !== undefined) set.published = input.published;
  if (input.featured !== undefined) set.featured = input.featured;
  if (input.sortOrder !== undefined) set.sortOrder = input.sortOrder;

  // Handle slug update — re-slugify and ensure uniqueness
  if (input.slug !== undefined && input.slug.trim()) {
    set.slug = await ensureUniqueSlug(slugify(input.slug), id);
  } else if (input.title !== undefined && !input.slug) {
    // Auto-update slug when title changes and no explicit slug provided
    set.slug = await ensureUniqueSlug(slugify(input.title), id);
  }

  const [row] = await db
    .update(projects)
    .set(set)
    .where(eq(projects.id, id))
    .returning();
  return row ?? null;
}

/** Delete a project and all its images (cascade handles DB; we clean up MinIO). */
export async function deleteProject(id: number): Promise<void> {
  const imgs = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, id));

  // Delete objects from MinIO (best-effort)
  const { deleteObject } = await import("@/lib/storage");
  await Promise.all(imgs.map((img) => deleteObject(img.storageKey)));

  await db.delete(projects).where(eq(projects.id, id));
}

/** Add an image record to a project (after the file has been uploaded to MinIO). */
export async function addProjectImage(
  projectId: number,
  data: {
    storageKey: string;
    alt?: string;
    contentType?: string;
    size?: number;
    sortOrder?: number;
  }
): Promise<ProjectImage> {
  const [row] = await db
    .insert(projectImages)
    .values({
      projectId,
      storageKey: data.storageKey,
      alt: data.alt ?? null,
      contentType: data.contentType ?? null,
      size: data.size ?? null,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning();
  return row;
}

/** Delete a single project image (from MinIO + DB). */
export async function deleteProjectImage(imageId: number): Promise<void> {
  const [img] = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.id, imageId))
    .limit(1);
  if (!img) return;

  const { deleteObject } = await import("@/lib/storage");
  await deleteObject(img.storageKey);
  await db.delete(projectImages).where(eq(projectImages.id, imageId));
}

/** Update alt text / sort order for a project image. */
export async function updateProjectImage(
  imageId: number,
  data: { alt?: string; sortOrder?: number }
): Promise<ProjectImage | null> {
  const [row] = await db
    .update(projectImages)
    .set({
      ...(data.alt !== undefined && { alt: data.alt }),
      ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
    })
    .where(eq(projectImages.id, imageId))
    .returning();
  return row ?? null;
}

/** Quick stats for the admin dashboard. */
export interface ProjectStats {
  total: number;
  published: number;
  drafts: number;
  featured: number;
  totalImages: number;
}

export async function getProjectStats(): Promise<ProjectStats> {
  try {
    const [projectStats] = await db
      .select({
        total: sql<number>`count(*)::int`,
        published: sql<number>`count(*) filter (where ${projects.published})::int`,
        drafts: sql<number>`count(*) filter (where not ${projects.published})::int`,
        featured: sql<number>`count(*) filter (where ${projects.featured})::int`,
      })
      .from(projects);

    const [imageStats] = await db
      .select({
        totalImages: sql<number>`count(*)::int`,
      })
      .from(projectImages);

    return {
      total: projectStats?.total ?? 0,
      published: projectStats?.published ?? 0,
      drafts: projectStats?.drafts ?? 0,
      featured: projectStats?.featured ?? 0,
      totalImages: imageStats?.totalImages ?? 0,
    };
  } catch {
    return { total: 0, published: 0, drafts: 0, featured: 0, totalImages: 0 };
  }
}
