/**
 * Static fallback project gallery — uses the original site's project photos
 * from the Clients page slideshow (start/assets/images/).
 *
 * The 17 images are in the same order as they appeared in the original
 * Wix StripSlideshow gallery on the Our Clients page.
 * Used when the database is not available so the clients page always
 * shows real work.
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
    slug: "outdoor-patio-living",
    title: "Outdoor Patio Living",
    description: "Patio with outdoor seating overlooking the Bay Area hills — the kind of outdoor living spaces Red's RRC builds.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-01.png", alt: "Man relaxing on a shaded patio with a yellow Labrador — outdoor living space", sortOrder: 0 },
    ],
  },
  {
    id: 2,
    slug: "project-showcase-02",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-02.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 3,
    slug: "project-showcase-03",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-03.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 4,
    slug: "project-showcase-04",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-04.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 5,
    slug: "project-showcase-05",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-05.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 6,
    slug: "deck-construction",
    title: "Deck Construction",
    description: "Finished deck with quality materials and craftsmanship — a small black dog enjoys the sunlit result.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-06.jpg", alt: "Small black dog on a sunlit finished deck — quality deck construction", sortOrder: 0 },
    ],
  },
  {
    id: 7,
    slug: "yard-landscape-integration",
    title: "Yard & Landscape Integration",
    description: "Outdoor construction that integrates with existing landscape and yard features.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-07.jpg", alt: "Dog in yard — outdoor construction integrating with landscape", sortOrder: 0 },
    ],
  },
  {
    id: 8,
    slug: "interior-finish-work",
    title: "Interior Finish Work",
    description: "Interior renovation with clean finish work — a brindle dog rests peacefully on the finished floor.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-08.png", alt: "Dog resting inside a home with interior finish work completed", sortOrder: 0 },
    ],
  },
  {
    id: 9,
    slug: "project-showcase-09",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-09.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 10,
    slug: "project-showcase-10",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-10.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 11,
    slug: "project-showcase-11",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-11.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 12,
    slug: "project-showcase-12",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-12.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 13,
    slug: "driveway-site-work",
    title: "Driveway & Site Work",
    description: "Construction site with driveway work — clean jobsite management throughout the project.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-13.png", alt: "Black dog on driveway with construction materials — clean jobsite management", sortOrder: 0 },
    ],
  },
  {
    id: 14,
    slug: "project-showcase-14",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-14.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 15,
    slug: "crew-pets-family",
    title: "Pets Are Family",
    description: "The crew is kind to every client's pets — a common thread in what our clients tell us.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-15.png", alt: "Founder with a small white dog — the crew treats pets like family", sortOrder: 0 },
    ],
  },
  {
    id: 16,
    slug: "project-showcase-16",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-16.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 17,
    slug: "project-showcase-17",
    title: "Project Showcase",
    description: "Completed construction project by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-17.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
];
