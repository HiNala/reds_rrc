import type { Post, PostMeta } from "./types";

import RestaurantBuildOut, {
  meta as restaurantBuildOutMeta,
} from "./restaurant-build-out-101";
import KitchenBathRoi, {
  meta as kitchenBathRoiMeta,
} from "./kitchen-bath-roi";
import ChoosingContractor, {
  meta as choosingContractorMeta,
} from "./choosing-the-right-general-contractor";
import PermitsInspections, {
  meta as permitsInspectionsMeta,
} from "./permits-inspections-restaurant-construction";
import DesignBuild, {
  meta as designBuildMeta,
} from "./design-build-vs-design-bid-build";

/** All published posts, newest first. */
export const posts: Post[] = [
  { ...restaurantBuildOutMeta, Content: RestaurantBuildOut },
  { ...kitchenBathRoiMeta, Content: KitchenBathRoi },
  { ...choosingContractorMeta, Content: ChoosingContractor },
  { ...permitsInspectionsMeta, Content: PermitsInspections },
  { ...designBuildMeta, Content: DesignBuild },
].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

/** Look up a single post by slug. */
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All unique tags across posts, sorted alphabetically. */
export function getAllTags(): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

/** Posts that include a given tag, newest first. */
export function getPostsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag));
}

/** Slugs for generateStaticParams. */
export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export type { Post, PostMeta };
