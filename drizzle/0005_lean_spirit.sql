-- Add slug column to projects table for SEO-friendly URLs
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "slug" varchar(220);
-- Backfill slugs from titles for existing projects
UPDATE "projects" SET "slug" = LOWER(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g')) WHERE "slug" IS NULL;
UPDATE "projects" SET "slug" = TRIM(BOTH '-' FROM "slug");
-- Make slug NOT NULL and unique
ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE ("slug");
-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" ("slug");
CREATE INDEX IF NOT EXISTS "projects_published_featured_idx" ON "projects" ("published", "featured");
