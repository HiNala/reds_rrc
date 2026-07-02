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
    title: "Outdoor Patio & Living Space",
    description:
      "Custom patio with outdoor seating overlooking the Bay Area hills. Complete with shade structure, landscape integration, and durable finishes that stand up to California weather year-round.",
    category: "Outdoor Living",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-01.png", alt: "Man relaxing on a shaded patio with a yellow Labrador — outdoor living space", sortOrder: 0 },
    ],
  },
  {
    id: 2,
    slug: "custom-deck-and-railing",
    title: "Custom Deck with Glass Railing",
    description:
      "Newly constructed deck featuring premium composite decking and glass panel railings for unobstructed views. Clean joinery, hidden fasteners, and a seamless transition from the interior living space.",
    category: "Deck & Patio",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-02.jpg", alt: "Custom deck with glass railing overlooking the Bay Area", sortOrder: 0 },
    ],
  },
  {
    id: 3,
    slug: "residential-renovation",
    title: "Whole-Home Renovation",
    description:
      "Complete interior and exterior renovation of a Bay Area residence. Updated finishes, new flooring, modernized kitchen and bathrooms, and refreshed exterior siding — all completed on schedule.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-03.jpg", alt: "Completed residential renovation with modern finishes", sortOrder: 0 },
    ],
  },
  {
    id: 4,
    slug: "interior-remodel",
    title: "Interior Remodel & Finish Work",
    description:
      "Detailed interior remodel featuring custom trim, new doors, and smooth wall finishes. Every detail was matched to the home's original character while bringing it up to modern standards.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-04.jpg", alt: "Interior remodel with custom finish work", sortOrder: 0 },
    ],
  },
  {
    id: 5,
    slug: "construction-project-showcase",
    title: "New Construction Project",
    description:
      "Ground-up construction project showcasing Red's RRC's ability to manage every phase — from foundation and framing to finishes and final inspection.",
    category: "New Construction",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-05.jpg", alt: "New construction project from foundation to finishes", sortOrder: 0 },
    ],
  },
  {
    id: 6,
    slug: "deck-construction",
    title: "Finished Deck Construction",
    description:
      "Quality deck built with premium materials and expert craftsmanship. The finished surface is smooth, level, and ready for years of outdoor enjoyment — even the family dog approved immediately.",
    category: "Deck & Patio",
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
    description:
      "Outdoor construction that seamlessly integrates with existing landscape and yard features. Grading, drainage, and hardscape work all coordinated to preserve the natural beauty of the property.",
    category: "Outdoor Living",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-07.jpg", alt: "Outdoor construction integrating with existing landscape", sortOrder: 0 },
    ],
  },
  {
    id: 8,
    slug: "interior-finish-work",
    title: "Interior Finish & Flooring",
    description:
      "Interior renovation with clean finish work and new flooring throughout. The space was transformed from outdated to move-in ready with attention to every seam, joint, and surface.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-08.png", alt: "Dog resting inside a home with interior finish work completed", sortOrder: 0 },
    ],
  },
  {
    id: 9,
    slug: "commercial-build-out",
    title: "Commercial Build-Out",
    description:
      "Tenant improvement and commercial build-out project. New partition walls, drop ceiling, lighting, and ADA-compliant restroom — delivered on a tight timeline with zero disruption to neighboring tenants.",
    category: "Commercial",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-09.jpg", alt: "Commercial build-out with new walls and finishes", sortOrder: 0 },
    ],
  },
  {
    id: 10,
    slug: "restaurant-renovation",
    title: "Restaurant Renovation",
    description:
      "Full renovation of a restaurant dining area including new flooring, lighting, bar build-out, and dining space reconfiguration. Completed during off-hours so the restaurant could stay operational.",
    category: "Restaurant",
    location: "Bay Area, CA",
    featured: true,
    images: [
      { url: "/gallery/project-10.jpg", alt: "Restaurant renovation with new flooring and lighting", sortOrder: 0 },
    ],
  },
  {
    id: 11,
    slug: "kitchen-remodel",
    title: "Kitchen Remodel",
    description:
      "Complete kitchen remodel with new cabinetry, countertops, tile backsplash, and stainless appliances. The layout was reconfigured for better flow and functionality while staying within the existing footprint.",
    category: "Kitchen",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-11.jpg", alt: "Kitchen remodel with new cabinetry and countertops", sortOrder: 0 },
    ],
  },
  {
    id: 12,
    slug: "bathroom-renovation",
    title: "Bathroom Renovation",
    description:
      "Full bathroom renovation featuring a new vanity, tile shower, modern fixtures, and updated lighting. Waterproofing and moisture management were prioritized for long-lasting results.",
    category: "Bathroom",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-12.jpg", alt: "Bathroom renovation with new vanity and tile shower", sortOrder: 0 },
    ],
  },
  {
    id: 13,
    slug: "driveway-site-work",
    title: "Driveway & Site Work",
    description:
      "Site preparation and driveway construction with proper grading and drainage. Clean jobsite management throughout the project — no mud, no mess, no surprises for the homeowners.",
    category: "Site Work",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-13.png", alt: "Driveway and site work with clean jobsite management", sortOrder: 0 },
    ],
  },
  {
    id: 14,
    slug: "addition-and-expansion",
    title: "Home Addition & Expansion",
    description:
      "Second-story addition and expansion that more than doubled the home's living space. Structural engineering, new staircase, and seamless roofline integration made the addition look original to the home.",
    category: "Addition",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-14.jpg", alt: "Home addition and expansion project", sortOrder: 0 },
    ],
  },
  {
    id: 15,
    slug: "family-friendly-renovation",
    title: "Family-Friendly Renovation",
    description:
      "Whole-home renovation designed with pets and family in mind. Durable, easy-to-clean finishes, secure outdoor spaces, and thoughtful details that make the home work for every member of the family.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-15.png", alt: "Family-friendly renovation with pet-safe finishes", sortOrder: 0 },
    ],
  },
  {
    id: 16,
    slug: "modern-home-construction",
    title: "Modern Home Construction",
    description:
      "Contemporary new construction with clean lines, open floor plan, and energy-efficient features. From foundation to final coat of paint, every phase was managed by Red's RRC's in-house crew.",
    category: "New Construction",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-16.jpg", alt: "Modern home construction with open floor plan", sortOrder: 0 },
    ],
  },
  {
    id: 17,
    slug: "project-finish-detail",
    title: "Finish Detail & Trim Work",
    description:
      "Close-up of the finish detail and trim work that sets Red's RRC apart. Precise miter joints, scribed transitions, and flawless paint — the small details that make a big difference in the final result.",
    category: "Finish Work",
    location: "Bay Area, CA",
    featured: false,
    images: [
      { url: "/gallery/project-17.jpg", alt: "Finish detail and trim work showcase", sortOrder: 0 },
    ],
  },
];
