/**
 * Static fallback project gallery — uses the original site's project photos
 * from start/assets/images/ (copied to /gallery/). Used when the database
 * is not available (e.g. local dev without Postgres) so the clients page
 * always shows real work.
 *
 * Image descriptions are based on AI analysis of the original slurped site
 * assets and the alt text / context from the original Wix pages.
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
    slug: "patio-with-adirondack-chairs",
    title: "Patio with Hillside Views",
    description: "Outdoor patio with Adirondack chairs overlooking trees and houses on a sunny Bay Area day.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-01.png", alt: "Patio with two Adirondack chairs overlooking a scenic hillside", sortOrder: 0 },
    ],
  },
  {
    id: 2,
    slug: "deck-with-glass-railing",
    title: "Deck with Glass Railing",
    description: "Modern outdoor deck with wicker seating, glass railing, and a scenic hillside view with a large tree.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-02.png", alt: "Modern deck with wicker seating and glass railing overlooking hillside", sortOrder: 0 },
    ],
  },
  {
    id: 3,
    slug: "home-renovation-detail",
    title: "Home Renovation",
    description: "Interior and exterior renovation work showcasing craftsmanship and attention to detail.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-03.jpg", alt: "Home renovation project detail", sortOrder: 0 },
    ],
  },
  {
    id: 4,
    slug: "construction-site-portrait",
    title: "On-Site Portrait",
    description: "Founder Devin Aloise on the jobsite — hands-on oversight is standard on every project.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-04.jpg", alt: "Devin Aloise on the jobsite", sortOrder: 0 },
    ],
  },
  {
    id: 5,
    slug: "outdoor-living-with-dogs",
    title: "Outdoor Living Space",
    description: "Patio and outdoor living area — the crew treats pets like family and keeps the site clean for them.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-05.png", alt: "Man relaxing on a patio with a yellow Labrador — outdoor living space built by Red's RRC", sortOrder: 0 },
    ],
  },
  {
    id: 6,
    slug: "crew-pets-family",
    title: "Pets Are Family",
    description: "The crew is kind to every client's pets — a common thread in what our clients tell us.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-06.png", alt: "Founder with a small white dog — the crew treats pets like family", sortOrder: 0 },
    ],
  },
  {
    id: 7,
    slug: "driveway-and-site-work",
    title: "Driveway & Site Work",
    description: "Construction site with driveway work and materials — clean jobsite management throughout.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-07.png", alt: "Black dog on driveway with construction materials — clean jobsite management", sortOrder: 0 },
    ],
  },
  {
    id: 8,
    slug: "deck-construction-detail",
    title: "Deck Construction",
    description: "Finished deck detail showing craftsmanship and quality materials.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-08.jpg", alt: "Small dog on a sunlit finished deck — quality deck construction", sortOrder: 0 },
    ],
  },
  {
    id: 9,
    slug: "yard-and-landscape-integration",
    title: "Yard & Landscape Integration",
    description: "Outdoor construction that integrates with existing landscape and yard features.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-09.jpg", alt: "Dog in yard with outdoor construction integrating landscape", sortOrder: 0 },
    ],
  },
  {
    id: 10,
    slug: "interior-finish-work",
    title: "Interior Finish Work",
    description: "Interior renovation with clean finish work and attention to detail.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-10.png", alt: "Dog resting inside a home with interior finish work completed", sortOrder: 0 },
    ],
  },
  {
    id: 11,
    slug: "project-showcase-1",
    title: "Project Showcase",
    description: "Completed construction project showcasing the team's craftsmanship.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-11.jpg", alt: "Completed construction project showcase", sortOrder: 0 },
    ],
  },
  {
    id: 12,
    slug: "project-showcase-2",
    title: "Project Showcase",
    description: "Another view of completed work by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-12.jpg", alt: "Completed construction project showcase", sortOrder: 0 },
    ],
  },
  {
    id: 13,
    slug: "project-showcase-3",
    title: "Project Showcase",
    description: "Detail of construction work showing quality and precision.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-13.jpg", alt: "Construction project detail", sortOrder: 0 },
    ],
  },
  {
    id: 14,
    slug: "project-showcase-4",
    title: "Project Showcase",
    description: "Completed project highlighting the team's attention to detail.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-14.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 15,
    slug: "project-showcase-5",
    title: "Project Showcase",
    description: "Construction progress photo from one of our Bay Area projects.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-15.jpg", alt: "Construction progress photo", sortOrder: 0 },
    ],
  },
  {
    id: 16,
    slug: "project-showcase-6",
    title: "Project Showcase",
    description: "Another completed project by Red's RRC in the Bay Area.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-16.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 17,
    slug: "project-showcase-7",
    title: "Project Showcase",
    description: "Construction detail showing the quality of work Red's RRC delivers.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-17.jpg", alt: "Construction project detail", sortOrder: 0 },
    ],
  },
  {
    id: 18,
    slug: "project-showcase-8",
    title: "Project Showcase",
    description: "Completed project in the Bay Area.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-18.jpg", alt: "Completed construction project", sortOrder: 0 },
    ],
  },
  {
    id: 19,
    slug: "project-showcase-9",
    title: "Project Showcase",
    description: "Another view of quality construction work by Red's RRC.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-19.jpg", alt: "Construction project showcase", sortOrder: 0 },
    ],
  },
  {
    id: 20,
    slug: "project-showcase-10",
    title: "Project Showcase",
    description: "Final detail of a completed Bay Area construction project.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-20.jpg", alt: "Completed construction project detail", sortOrder: 0 },
    ],
  },
];
