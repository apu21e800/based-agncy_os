export interface Product {
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    name: "TrafficPatterns",
    slug: "traffic-patterns",
    shortDesc: "Intersection-grade preformed thermoplastic markings",
    description: "TrafficPatterns is HUB Surface Systems' flagship preformed thermoplastic marking solution, engineered for high-traffic municipal intersections. Manufactured to exacting specifications, these durable markings offer superior visibility, fast installation, and long-term performance. Ideal for crosswalks, stop bars, and directional arrows across Canadian municipalities.",
    specs: [
      { label: "Material", value: "Preformed thermoplastic" },
      { label: "Thickness", value: "90mil standard" },
      { label: "Temperature Range", value: "-40°C to +60°C" },
      { label: "Retroreflectivity", value: "ASTM D4956 Type III" },
      { label: "Installation", value: "Heat application" },
      { label: "Warranty", value: "5-year performance" },
    ],
  },
  {
    name: "TrafficPatternsXD",
    slug: "traffic-patterns-xd",
    shortDesc: "150mil aggregate-reinforced for extreme durability",
    description: "TrafficPatternsXD raises the bar with 150mil aggregate-reinforced thermoplastic construction, engineered for the most demanding intersections and high-speed corridors. Where standard markings wear prematurely, XD delivers consistent retroreflectivity and skid resistance season after season.",
    specs: [
      { label: "Material", value: "Aggregate-reinforced thermoplastic" },
      { label: "Thickness", value: "150mil" },
      { label: "Aggregate", value: "Glass bead + crushed aggregate" },
      { label: "Skid Resistance", value: "BPN 65+" },
      { label: "Installation", value: "Heat application" },
      { label: "Warranty", value: "7-year performance" },
    ],
  },
  {
    name: "StreetPrint",
    slug: "streetprint",
    shortDesc: "Decorative stamped asphalt for civic identity",
    description: "StreetPrint transforms ordinary asphalt into stunning civic art. Using a proprietary in-place stamping system, StreetPrint creates decorative patterns — brick, stone, slate — that define intersections, plazas, and pedestrian zones. Used by municipalities across Canada to create sense of place without the cost of traditional pavers.",
    specs: [
      { label: "System", value: "In-place asphalt stamping" },
      { label: "Patterns", value: "12+ standard + custom" },
      { label: "Colours", value: "20+ standard colours" },
      { label: "Base Required", value: "Existing asphalt or new lay" },
      { label: "Durability", value: "20-year colour retention" },
      { label: "Applications", value: "Intersections, plazas, driveways" },
    ],
  },
  {
    name: "StreetBond",
    slug: "streetbond",
    shortDesc: "UV-stable color coating with 20-year performance",
    description: "StreetBond is a high-performance coloured pavement coating that delivers vibrant, durable colour to roads, bike lanes, and pedestrian areas. Its UV-stable formulation resists fading, cracking, and peeling — maintaining vivid colour for 20 years. Used extensively for bike lane delineation and Complete Streets applications.",
    specs: [
      { label: "Type", value: "Acrylic pavement coating" },
      { label: "UV Stability", value: "20-year colour retention" },
      { label: "Coverage", value: "30–50 sq ft per gallon" },
      { label: "Dry Time", value: "2–4 hours" },
      { label: "Colours", value: "Custom colour matching available" },
      { label: "Standards", value: "MUTCD compliant" },
    ],
  },
  {
    name: "MMAX",
    slug: "mmax",
    shortDesc: "Fast-cure MMA resin for bus and bike lanes",
    description: "MMAX is HUB's methyl methacrylate (MMA) resin system — the gold standard for high-durability, fast-cure coloured pavement markings. Specifically engineered for bus lanes, bike lanes, and high-stress urban corridors, MMAX delivers unmatched bonding strength and can be opened to traffic within 60 minutes of application.",
    specs: [
      { label: "Material", value: "Methyl Methacrylate (MMA) resin" },
      { label: "Cure Time", value: "30–60 minutes" },
      { label: "Thickness", value: "1.5–3mm" },
      { label: "Bond Strength", value: ">3 MPa" },
      { label: "Temperature", value: "-10°C application" },
      { label: "Lifespan", value: "10+ years in service" },
    ],
  },
  {
    name: "DecoMark",
    slug: "decomark",
    shortDesc: "Custom decorative pavement marking systems",
    description: "DecoMark is HUB's custom decorative marking system, enabling municipalities and artists to bring complex designs, murals, and community identifiers to the street. From Indigenous art installations to Pride crosswalks to neighbourhood branding, DecoMark delivers precision colour and lasting vibrancy.",
    specs: [
      { label: "System", value: "Preformed + hand-applied thermoplastic" },
      { label: "Colour Range", value: "Full custom Pantone matching" },
      { label: "Design", value: "Custom artwork accepted" },
      { label: "Minimum Order", value: "Project-based" },
      { label: "Installation", value: "Certified HUB applicators" },
      { label: "Warranty", value: "5-year colour" },
    ],
  },
  {
    name: "DuraShield",
    slug: "durashield",
    shortDesc: "Protective asphalt coating and restoration",
    description: "DuraShield is HUB's protective asphalt coating designed to extend pavement life, restore faded surfaces, and reduce lifecycle costs. Applied as a rejuvenating seal coat, DuraShield penetrates the asphalt matrix to restore flexibility, reduce oxidation, and deliver a uniform, professional finish.",
    specs: [
      { label: "Type", value: "Asphalt rejuvenating seal coat" },
      { label: "Coverage", value: "100–150 sq ft per gallon" },
      { label: "Penetration Depth", value: "6–12mm" },
      { label: "Dry Time", value: "4–8 hours" },
      { label: "Traffic Open", value: "24 hours" },
      { label: "Lifespan Extension", value: "3–5 years" },
    ],
  },
  {
    name: "PreMark",
    slug: "premark",
    shortDesc: "Preformed symbols and legends for road markings",
    description: "PreMark delivers precision-manufactured preformed thermoplastic symbols, legends, and arrows for road marking applications. From standard MUTCD symbols to custom legends, PreMark ensures consistent, professional results with minimal installation time and maximum durability.",
    specs: [
      { label: "Material", value: "Preformed thermoplastic" },
      { label: "Thickness", value: "90–125mil" },
      { label: "Standards", value: "MUTCD / TAC compliant" },
      { label: "Symbols", value: "200+ standard + custom" },
      { label: "Retroreflectivity", value: "Type III glass beads" },
      { label: "Warranty", value: "5-year" },
    ],
  },
];
