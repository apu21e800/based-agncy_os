# HUBSS.com — Project Intelligence File

## Client
HUB Surface Systems — Canadian leader in decorative and functional pavement
solutions. 30+ years experience. Two regional offices:
- East: Milton, Ontario (doug.bain@hubss.com / 416-540-9287)
- West: Ladysmith, BC (cleve.stordy@hubss.com / 604-309-8212)

## What They Do
Stamped asphalt, preformed thermoplastics, and specialty coatings for
municipalities, developers, and contractors across Canada. Products include
TrafficPatterns, TrafficPatternsXD, StreetPrint, StreetBond, MMAX, DecoMark,
DuraShield, DuraTherm, PreMark, AirMark.

Applications: Crosswalks, Bus & Bike Lanes, Driveways, Public Art, Regulatory
Markings, Parks & Paths, Community Branding, Town Homes, Parking Lots, Airports.

## Brand
- Colors: Black background, orange accent (#F97316 approx), white text
- Tone: Municipal authority meets civic pride. Technical credibility + visual impact.
- Positioning: "Redefining hardscapes" — surfaces as community identity, not
  just infrastructure
- Key proof points: Vision Zero, Complete Streets, AODA compliance, 20-year
  durability, used by York Region, City of Toronto, Vancouver, UBC

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS
- TypeScript (strict)
- MDX for blog posts (markdown with components)
- Framer Motion for animations
- Images: /public/images/ — swap by replacing files, no code change needed
- Documents: /public/docs/ — PDFs linked by filename

## Project Structure
hubss-website/
├── app/
│   ├── page.tsx (landing page)
│   ├── projects/
│   ├── products/
│   ├── applications/
│   ├── about/
│   ├── blog/
│   └── contact/
├── components/
│   ├── ui/ (buttons, cards, nav)
│   ├── sections/ (hero, projects, lunch-learn, footer)
│   └── blog/ (post layout, card)
├── content/
│   └── blog/ (*.mdx files — add posts here)
├── public/
│   ├── images/
│   └── docs/
└── CLAUDE.md

## Pages to Build (in order)
1. Landing page — hero, products grid, applications, recent projects,
   lunch & learn CTA, footer
2. Projects page — filterable grid by product/application
3. Products page — each product with specs
4. Blog — MDX-powered, easy to add posts
5. Contact — form + both office locations

## Adding Content (no developer needed)
- New blog post: create /content/blog/post-name.mdx
- Swap hero image: replace /public/images/hero.jpg
- Add PDF spec sheet: drop in /public/docs/, update link in products page
- New project: add entry to /content/projects/project-name.mdx

## Conversion Goals
Primary CTA: "Request Spec Sheet" + "Book Lunch & Learn"
Secondary: Project gallery browsing → contact form
Lead capture: Name + Email + Phone (matches current form)

## Commands
npm run dev     # local development
npm run build   # production build
npm run start   # run production locally

## Deploy
Vercel — connected to GitHub, auto-deploys on push to main
