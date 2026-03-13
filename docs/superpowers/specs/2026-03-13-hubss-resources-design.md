# HUBSS Resources / Document Library Design

**Date:** 2026-03-13
**Status:** Approved

## Overview

Add a Resources section to hubss.com that:
1. Provides a dedicated `/resources` landing page listing all product documents
2. Adds a document download section to each product detail page
3. Adds "Resources" to the main nav (between Blog and Contact)
4. Creates a `public/docs/` folder structure for dropping in PDFs

---

## Data Layer — `lib/documents.ts`

Central registry for all downloadable documents. Mirrors the pattern of `lib/products.ts`.

```ts
export type DocType =
  | 'brochure'
  | 'spec-sheet'
  | 'colour-guide'
  | 'installation-guide'
  | 'data-sheet'      // TDS, PDS, Product Data Sheet — all normalised to this type
  | 'design-manual'
  | 'sds'             // Safety Data Sheet
  | 'certificate'
  | 'guide'           // Substrate Guide, Corundum Guide, Custom Design Guidelines, etc.
  | 'other'           // Catch-all for FAQ, Cross Section Detail, Template Catalog, etc.

export interface ProductDocument {
  label: string       // exact display name, e.g. "SB120 Specification Sheet"
  type: DocType
  href: string        // e.g. "/docs/streetprint/streetprint-spec.pdf"
  lang?: 'en' | 'fr' // only set for explicitly bilingual docs; omit for English-only
}

export interface ProductDocs {
  slug: string        // matches lib/products.ts slug exactly
  docs: ProductDocument[]
}

export const productDocuments: ProductDocs[] = [ /* populated per product — see inventory below */ ]

/** Returns docs for a given product slug, or empty array if none registered */
export function getDocsForProduct(slug: string): ProductDocument[] {
  return productDocuments.find((p) => p.slug === slug)?.docs ?? []
}
```

### DocType mapping rules

| Raw document name (from live site) | DocType |
|------------------------------------|---------|
| Brochure | `brochure` |
| Specification / Spec Sheet | `spec-sheet` |
| Colour Guide | `colour-guide` |
| Installation Guide / Application Instructions | `installation-guide` |
| TDS / PDS / Product Data Sheet / Extended Season PDS | `data-sheet` |
| Design Manual | `design-manual` |
| SDS | `sds` |
| Certificate of Analysis | `certificate` |
| Substrate Guide / Corundum Guide / Custom Design Guidelines | `guide` |
| FAQ / Template Catalog / Cross Section Detail | `other` |

### Document inventory (from hubss.com/documentation)

| Product | Documents |
|---------|-----------|
| StreetPrint | Spec Sheet, Colour Guide, Template Catalog (`other`), FAQ (`other`) |
| StreetBond | Brochure, Colour Guide, Substrate Guide (`guide`), SB120 Spec, SB150 Spec, SB120 TDS, SB150 TDS, SB150 AL TDS, Concrete Spec, Concrete Primer WB TDS, Concrete Primer QS TDS, Pro 220 MMA Install Guide, Pro 220 MMA Brochure, Pro 220 MMA TDS, Pro 250 MMA Install Guide, Pro 250 MMA Brochure, Pro 250 MMA TDS |
| TrafficPatterns | Brochure, Design Manual, Custom Design Guidelines (`guide`), 125 SA Spec, Solid Sheets 125 Spec, Two Component Sealer Spec, Colour Guide |
| TrafficPatternsXD | Brochure, Design Manual, Spec EN, Spec FR (`lang: 'fr'`), Two Component Sealer Spec, Colour Guide, Cross Section Detail (`other`) |
| DecoMark | Brochure, Application Instructions, Custom Design Guidelines (`guide`), Spec, Colour Guide |
| MMAX | Brochure, Application Instructions, Product Data Sheet (`data-sheet`), Extended Season Corundum Guide (`guide`), Extended Season PDS (`data-sheet`) |
| PreMark | Brochure, PreMarkXF Brochure |
| DuraShield | Color Asphalt TDS (`data-sheet`), Color Solar Gray TDS (`data-sheet`) |
| DuraTherm | Brochure, Design Manual, Custom Design Guidelines (`guide`), Spec, Colour Guide |
| AirMark | Brochure EN, Brochure FR (`lang: 'fr'`), TrafficPaint Brochure EN, TrafficPaint Brochure FR (`lang: 'fr'`), WB Airfield PDS (`data-sheet`), PreMark Groundside Airports Brochure |

---

## Resources Landing Page — `app/resources/page.tsx`

- Server component, no client state needed
- Route: `/resources`
- Imports `productDocuments` from `lib/documents.ts` and `products` from `lib/products.ts`
- Renders one card per product that has at least one document registered
- Products with zero docs are omitted (no empty states)
- Page header matches site style: orange eyebrow, large bold heading, grey subtitle

### Card layout (per product)

- Product name as card heading
- List of download rows, each containing:
  - **Type badge** — short label derived from `DocType` (e.g. "Brochure", "Spec Sheet", "TDS")
  - **Document label** — the `label` field verbatim
  - **Language indicator** — if `lang` is set, append `(EN)` or `(FR)` after the label
  - **Download icon + link** — `<a href={doc.href} target="_blank" rel="noopener noreferrer">`
- Card style: `background: #2d2d2d, border: 1px solid #333, border-radius: 12px`
- If a PDF hasn't been dropped in yet, the link renders but returns a 404 — this is acceptable; dead links are the content team's responsibility, not a code concern

---

## DocumentDownloads Component — `components/sections/DocumentDownloads.tsx`

- Server component (no interactivity needed)
- Props: `{ slug: string }`
- Calls `getDocsForProduct(slug)` internally
- Returns `null` if result is empty array — section is completely hidden
- Same row layout and badge/label/language/icon pattern as the Resources page
- Card style matches the Specifications panel: `background: #2d2d2d, border: 1px solid #333`
- Section heading: "Downloads"

---

## Product Page Integration — `app/products/[slug]/page.tsx`

The product detail page has a two-column layout:
- **Left column (lg:col-span-2):** description → gallery
- **Right column (lg:col-span-1):** sticky specs + CTA panel

`<DocumentDownloads slug={product.slug} />` is inserted in the **left column**, immediately after the gallery grid and before the Related Applications section (which is full-width below the grid). No other changes to the page.

---

## Nav Update — `components/sections/Nav.tsx`

Add one entry to `navLinks` between "Blog" and "Contact":
```ts
{ label: "Resources", href: "/resources" }
```

`/resources` has no sub-routes, so the existing `pathname.startsWith(link.href + "/")` active-state logic is safe.

---

## File Structure — `public/docs/`

One subfolder per product slug. Each subfolder README lists the exact filenames expected (matching `href` values in `lib/documents.ts`) so the content team can drop PDFs in without needing to touch code.

README format per subfolder:
- Product name + description
- Table of: filename | document label | type
- Note: "Filename must match exactly — kebab-case, `.pdf` extension"

```
public/docs/
├── README.md               ← master guide: how to add PDFs, naming rules
├── streetprint/README.md
├── streetbond/README.md
├── traffic-patterns/README.md
├── traffic-patterns-xd/README.md
├── mmax/README.md
├── decomark/README.md
├── durashield/README.md
├── premark/README.md
├── duratherm/README.md
└── airmark/README.md
```

---

## Files Changed

| Action | File |
|--------|------|
| Create | `lib/documents.ts` |
| Create | `app/resources/page.tsx` |
| Create | `components/sections/DocumentDownloads.tsx` |
| Modify | `app/products/[slug]/page.tsx` |
| Modify | `components/sections/Nav.tsx` |
| Create | `public/docs/README.md` + 10 product subfolder READMEs |
