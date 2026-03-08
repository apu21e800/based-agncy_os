export interface Application {
  name: string;
  slug: string;
  imageUrl: string;
  desc: string;
  col?: string; // grid span classes for homepage mosaic
}

export const applications: Application[] = [
  {
    name: "Crosswalks",
    slug: "crosswalks",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    desc: "High-visibility pedestrian crossings that save lives and support Vision Zero frameworks across Canadian municipalities. HUB Surface Systems provides thermoplastic, stamped asphalt, and coloured pavement solutions for all crosswalk applications.",
    col: "sm:col-span-2 sm:row-span-2",
  },
  {
    name: "Bus & Bike Lanes",
    slug: "bus-bike-lanes",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80",
    desc: "Dedicated transit and cycling infrastructure markings that define Complete Streets corridors. From MMAX red resin bus lanes to StreetBond bike lane coatings — durable, high-visibility, long-lasting.",
    col: "",
  },
  {
    name: "Driveways",
    slug: "driveways",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    desc: "Decorative stamped asphalt and colour coatings for residential and commercial entrance treatments. StreetPrint and StreetBond deliver the look of premium pavers at a fraction of the cost.",
    col: "",
  },
  {
    name: "Public Art",
    slug: "public-art",
    imageUrl: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&q=80",
    desc: "Street-scale murals and artistic pavement installations celebrating community identity. DecoMark custom thermoplastic brings any design to the street with precision colour and lasting vibrancy.",
    col: "sm:row-span-2",
  },
  {
    name: "Regulatory Markings",
    slug: "regulatory-markings",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    desc: "AODA-compliant safety markings, symbols, and wayfinding systems for accessible public infrastructure. PreMark preformed symbols ensure consistent, code-compliant installations every time.",
    col: "",
  },
  {
    name: "Parks & Paths",
    slug: "parks-paths",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    desc: "Trail markings, plaza treatments, and recreational surface coatings for parks and greenways. StreetBond and DuraShield extend the life of recreational pavement while improving aesthetics.",
    col: "sm:col-span-2",
  },
  {
    name: "Community Branding",
    slug: "community-branding",
    imageUrl: "https://images.unsplash.com/photo-1486325212980-2af6a2b98b1f?w=800&q=80",
    desc: "Municipal identity and placemaking surfaces that give neighbourhoods a distinctive visual character. From BIA corridor treatments to gateway intersections — HUB makes streets memorable.",
    col: "",
  },
  {
    name: "Parking Lots",
    slug: "parking-lots",
    imageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    desc: "Durable markings, stall delineation, and protective coatings for commercial and municipal parking facilities. DuraShield restoration and PreMark symbols deliver a professional finish that lasts.",
    col: "",
  },
  {
    name: "Airports",
    slug: "airports",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    desc: "FAA and TC Canada compliant airfield markings for runways, taxiways, aprons, and helipads. AirMark preformed thermoplastic delivers precision retroreflective markings engineered for commercial airports, regional facilities, and private airstrips across Canada where visibility and durability are safety-critical.",
    col: "",
  },
];
