# HUBSS Resources / Document Library Design

**Date:** 2026-03-13
**Status:** Approved

## Overview

Add a Resources section to hubss.com that:
1. Provides a dedicated `/resources` landing page listing all product documents
2. Adds a document download section to each product detail page
3. Adds "Resources" to the main nav (between Blog and Contact)
4. Creates a `public/docs/` folder structure for dropping in PDFs

Reference: mirrors document types and products found at hubss.com/documentation.

---

## Data Layer — `lib/documents.ts`

Central registry for all downloadable documents. Mirrors the pattern of `lib/products.ts`.

```ts
export type DocType =
  | 'brochure'
  | 'spec-sheet'
  | 'colour-guide'
  | 'installation-guide'
  | 'tds'           // Technical Data Sheet
  | 'design-manual'
  | 'sds'           // Safety Data Sheet
  | 'certificate'
  | 'other'

export interface ProductDocument {
  label: string       // display name, e.g. "Specification Sheet"
  type: DocType
  href: string        // e.g. "/docs/streetprint/streetprint-spec.pdf"
  lang?: 'en' | 'fr' // for bilingual docs (AirMark, TrafficPatternsXD)
}

export interface ProductDocs {
  slug: string        // matches lib/products.ts slug exactly
  docs: ProductDocument[]
}

export const productDocuments: ProductDocs[] = [ /* populated per product */ ]

/** Returns docs for a given product slug, or empty array if none registered */
export function getDocsForProduct(slug: string): ProductDocument[] {
  return productDocuments.find((p) => p.slug === slug)?.docs ?? []
}
```

### Document inventory (from hubss.com/documentation)

| Product | Doc Types |
|---------|-----------|
| StreetPrint | Spec Sheet, Colour Guide, Template Catalog, FAQ |
| StreetBond | Brochure, Colour Guide, Substrate Guide, SB120 Spec, SB150 Spec, TDS variants, Pro 220 MMA (Install Guide + Brochure + TDS), Pro 250 MMA (Install Guide + Brochure + TDS), Concrete Primer TDS |
| TrafficPatterns | Brochure, Design Manual, Custom Design Guidelines, 125 SA Spec, Solid Sheets 125 Spec, Two Component Sealer Spec, Colour Guide |
| TrafficPatternsXD | Brochure, Design Manual, Spec (EN + FR), Two Component Sealer Spec, Colour Guide, Cross Section Detail |
| DecoMark | Brochure, Application Instructions, Custom Design Guidelines, Spec, Colour Guide |
| MMAX | Brochure, Application Instructions, Product Data Sheet, Extended Season Corundum Guide, Extended Season PDS |
| PreMark | Brochure, PreMarkXF Brochure |
| DuraShield | TDS (Color Asphalt), TDS (Color Solar Gray) |
| DuraTherm | Brochure, Design Manual, Custom Design Guidelines, Spec, Colour Guide |
| AirMark | Brochure (EN + FR), TrafficPaint Brochure (EN + FR), WB Airfield PDS, PreMark Groundside Airports Brochure |

---

## Resources Landing Page — `app/resources/page.tsx`

- Server component
- Route: `/resources`
- Imports `productDocuments` from `lib/documents.ts` and `products` from `lib/products.ts`
- Renders one card per product that has documents
- Each card shows the product name and a list of download rows
- Each row: doc type badge + document label + download arrow icon (links to PDF, `target="_blank"`)
- Products with zero docs registered are omitted entirely (no empty states)
- Page header matches site style (orange eyebrow, large bold heading, grey subtitle)
- If a PDF file doesn't exist yet, the link still renders — browser handles the 404 gracefully

---

## DocumentDownloads Component — `components/sections/DocumentDownloads.tsx`

- Client or server component (server is fine — no interactivity needed)
- Props: `slug: string`
- Calls `getDocsForProduct(slug)` internally
- If result is empty array, renders nothing (`return null`)
- Renders a section below the gallery on the product detail page:
  - Section heading: "Downloads"
  - List of rows: type badge + label + download icon
  - Same dark card style as the Specifications panel (`background: #2d2d2d, border: 1px solid #333`)

---

## Product Page Integration — `app/products/[slug]/page.tsx`

- Import and render `<DocumentDownloads slug={product.slug} />` between the gallery and the Related Applications section
- No other changes to the product page

---

## Nav Update — `components/sections/Nav.tsx`

Add to `navLinks` array between "Blog" and "Contact":
```ts
{ label: "Resources", href: "/resources" }
```

---

## File Structure — `public/docs/`

One subfolder per product slug. Each subfolder contains a README listing the expected filenames.

```
public/docs/
├── README.md
├── streetprint/
│   └── README.md
├── streetbond/
│   └── README.md
├── traffic-patterns/
│   └── README.md
├── traffic-patterns-xd/
│   └── README.md
├── mmax/
│   └── README.md
├── decomark/
│   └── README.md
├── durashield/
│   └── README.md
├── premark/
│   └── README.md
├── duratherm/
│   └── README.md
└── airmark/
    └── README.md
```

Filenames use kebab-case matching the `href` values in `lib/documents.ts`.

---

## Files Changed

| Action | File |
|--------|------|
| Create | `lib/documents.ts` |
| Create | `app/resources/page.tsx` |
| Create | `components/sections/DocumentDownloads.tsx` |
| Modify | `app/products/[slug]/page.tsx` |
| Modify | `components/sections/Nav.tsx` |
| Create | `public/docs/README.md` |
| Create | `public/docs/[10 product subfolders]/README.md` |
