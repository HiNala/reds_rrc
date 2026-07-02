/**
 * Static fallback project gallery — uses the original site's project photos
 * from start/assets/images/ (copied to /gallery/). Used when the database
 * is not available (e.g. local dev without Postgres) so the clients page
 * always shows real work.
 */

interface StaticProject {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  featured: boolean;
  images: { url: string; alt: string | null; sortOrder: number }[];
}

export const STATIC_PROJECTS: StaticProject[] = [
  {
    id: 1,
    slug: "outdoor-deck-patio",
    title: "Outdoor Deck & Patio",
    description: "Custom deck with glass railing and scenic Bay Area views.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-01.png", alt: "Outdoor deck and patio with seating area", sortOrder: 0 },
      { url: "/gallery/project-13.png", alt: "Deck construction detail with glass railing", sortOrder: 1 },
    ],
  },
  {
    id: 2,
    slug: "restaurant-build-out",
    title: "Restaurant Build-Out",
    description: "Full restaurant interior construction and finish work.",
    category: "Restaurant",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-03.jpg", alt: "Restaurant interior build-out", sortOrder: 0 },
      { url: "/gallery/project-05.jpg", alt: "Restaurant construction progress", sortOrder: 1 },
    ],
  },
  {
    id: 3,
    slug: "kitchen-remodel",
    title: "Kitchen Remodel",
    description: "Modern kitchen renovation with custom cabinetry and finishes.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-06.jpg", alt: "Kitchen remodel with custom finishes", sortOrder: 0 },
    ],
  },
  {
    id: 4,
    slug: "home-renovation",
    title: "Home Renovation",
    description: "Whole-home renovation including framing, drywall, and trim.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-07.jpg", alt: "Home renovation exterior", sortOrder: 0 },
      { url: "/gallery/project-09.jpg", alt: "Interior renovation detail", sortOrder: 1 },
    ],
  },
  {
    id: 5,
    slug: "commercial-build-out",
    title: "Commercial Build-Out",
    description: "Commercial space construction with custom build-outs.",
    category: "Commercial",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-10.jpg", alt: "Commercial build-out interior", sortOrder: 0 },
    ],
  },
  {
    id: 6,
    slug: "custom-woodwork",
    title: "Custom Woodwork",
    description: "Custom framing, trim, and finish carpentry details.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-11.jpg", alt: "Custom woodwork and trim detail", sortOrder: 0 },
      { url: "/gallery/project-16.jpg", alt: "Finish carpentry close-up", sortOrder: 1 },
    ],
  },
  {
    id: 7,
    slug: "outdoor-living-space",
    title: "Outdoor Living Space",
    description: "Patio and outdoor living area construction.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-15.png", alt: "Outdoor living space with patio", sortOrder: 0 },
    ],
  },
  {
    id: 8,
    slug: "project-spotlight",
    title: "Project Spotlight",
    description: "Featured project showcasing craftsmanship and attention to detail.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-08.png", alt: "Project spotlight photo", sortOrder: 0 },
    ],
  },
];
