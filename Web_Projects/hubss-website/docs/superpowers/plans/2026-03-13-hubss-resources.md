# HUBSS Resources / Document Library Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Resources section to hubss.com with a `/resources` landing page, per-product download sections, nav link, and `public/docs/` folder structure for PDFs.

**Architecture:** A central `lib/documents.ts` data registry (mirroring `lib/products.ts`) maps each product slug to its documents. A reusable `DocumentDownloads` server component renders the download list on product pages. A new `app/resources/page.tsx` server component renders all products' docs as a full library. Nav gains a "Resources" link. `public/docs/` subfolders hold the actual PDFs.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS 4, no test framework — verify with `npm run build` and visual inspection at `http://localhost:3000`.

---

## Chunk 1: Data Layer + Component + Product Page

### Task 1: Create lib/documents.ts

**Files:**
- Create: `Web_Projects/hubss-website/lib/documents.ts`

- [ ] **Step 1: Create the file with full content**

```ts
// lib/documents.ts
// Central document registry — mirrors lib/products.ts pattern.
// To add a document: add an entry here and drop the PDF in public/docs/[slug]/filename.pdf

export type DocType =
  | 'brochure'
  | 'spec-sheet'
  | 'colour-guide'
  | 'installation-guide'
  | 'data-sheet'      // TDS, PDS, Product Data Sheet
  | 'design-manual'
  | 'sds'
  | 'certificate'
  | 'guide'           // Substrate Guide, Corundum Guide, Custom Design Guidelines
  | 'other'           // FAQ, Template Catalog, Cross Section Detail, etc.

/** Human-readable badge labels for each DocType */
export const docTypeLabel: Record<DocType, string> = {
  'brochure':           'Brochure',
  'spec-sheet':         'Spec Sheet',
  'colour-guide':       'Colour Guide',
  'installation-guide': 'Install Guide',
  'data-sheet':         'Data Sheet',
  'design-manual':      'Design Manual',
  'sds':                'SDS',
  'certificate':        'Certificate',
  'guide':              'Guide',
  'other':              'Document',
}

export interface ProductDocument {
  label: string        // display name, e.g. "SB120 Specification Sheet"
  type: DocType
  href: string         // e.g. "/docs/streetprint/streetprint-spec.pdf"
  lang?: 'en' | 'fr'  // only set for bilingual docs
}

export interface ProductDocs {
  slug: string         // matches lib/products.ts slug exactly
  docs: ProductDocument[]
}

export const productDocuments: ProductDocs[] = [
  {
    slug: 'streetprint',
    docs: [
      { label: 'Specification Sheet',  type: 'spec-sheet',    href: '/docs/streetprint/streetprint-spec.pdf' },
      { label: 'Colour Guide',         type: 'colour-guide',  href: '/docs/streetprint/streetprint-colour-guide.pdf' },
      { label: 'Template Catalog',     type: 'other',         href: '/docs/streetprint/streetprint-template-catalog.pdf' },
      { label: 'FAQ',                  type: 'other',         href: '/docs/streetprint/streetprint-faq.pdf' },
    ],
  },
  {
    slug: 'streetbond',
    docs: [
      { label: 'Brochure',                     type: 'brochure',           href: '/docs/streetbond/streetbond-brochure.pdf' },
      { label: 'Colour Guide',                 type: 'colour-guide',       href: '/docs/streetbond/streetbond-colour-guide.pdf' },
      { label: 'Substrate Guide',              type: 'guide',              href: '/docs/streetbond/streetbond-substrate-guide.pdf' },
      { label: 'SB120 Specification',          type: 'spec-sheet',         href: '/docs/streetbond/streetbond-sb120-spec.pdf' },
      { label: 'SB150 Specification',          type: 'spec-sheet',         href: '/docs/streetbond/streetbond-sb150-spec.pdf' },
      { label: 'SB120 Technical Data Sheet',   type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb120-tds.pdf' },
      { label: 'SB150 Technical Data Sheet',   type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb150-tds.pdf' },
      { label: 'SB150 AL Technical Data Sheet',type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb150-al-tds.pdf' },
      { label: 'Concrete Specification',       type: 'spec-sheet',         href: '/docs/streetbond/streetbond-concrete-spec.pdf' },
      { label: 'Concrete Primer WB Data Sheet',type: 'data-sheet',         href: '/docs/streetbond/streetbond-concrete-primer-wb-tds.pdf' },
      { label: 'Concrete Primer QS Data Sheet',type: 'data-sheet',         href: '/docs/streetbond/streetbond-concrete-primer-qs-tds.pdf' },
      { label: 'Pro 220 MMA Installation Guide',type: 'installation-guide',href: '/docs/streetbond/streetbond-pro220-install-guide.pdf' },
      { label: 'Pro 220 MMA Brochure',         type: 'brochure',           href: '/docs/streetbond/streetbond-pro220-brochure.pdf' },
      { label: 'Pro 220 MMA Data Sheet',       type: 'data-sheet',         href: '/docs/streetbond/streetbond-pro220-tds.pdf' },
      { label: 'Pro 250 MMA Installation Guide',type: 'installation-guide',href: '/docs/streetbond/streetbond-pro250-install-guide.pdf' },
      { label: 'Pro 250 MMA Brochure',         type: 'brochure',           href: '/docs/streetbond/streetbond-pro250-brochure.pdf' },
      { label: 'Pro 250 MMA Data Sheet',       type: 'data-sheet',         href: '/docs/streetbond/streetbond-pro250-tds.pdf' },
    ],
  },
  {
    slug: 'traffic-patterns',
    docs: [
      { label: 'Brochure',                    type: 'brochure',      href: '/docs/traffic-patterns/traffic-patterns-brochure.pdf' },
      { label: 'Design Manual',               type: 'design-manual', href: '/docs/traffic-patterns/traffic-patterns-design-manual.pdf' },
      { label: 'Custom Design Guidelines',    type: 'guide',         href: '/docs/traffic-patterns/traffic-patterns-custom-design-guidelines.pdf' },
      { label: '125 with SA Specification',   type: 'spec-sheet',    href: '/docs/traffic-patterns/traffic-patterns-125-sa-spec.pdf' },
      { label: 'Solid Sheets 125 Specification',type: 'spec-sheet',  href: '/docs/traffic-patterns/traffic-patterns-solid-sheets-125-spec.pdf' },
      { label: 'Two Component Sealer Specification',type: 'spec-sheet',href: '/docs/traffic-patterns/traffic-patterns-two-component-sealer-spec.pdf' },
      { label: 'Colour Guide',                type: 'colour-guide',  href: '/docs/traffic-patterns/traffic-patterns-colour-guide.pdf' },
    ],
  },
  {
    slug: 'traffic-patterns-xd',
    docs: [
      { label: 'Brochure',                       type: 'brochure',      href: '/docs/traffic-patterns-xd/traffic-patterns-xd-brochure.pdf' },
      { label: 'Design Manual',                  type: 'design-manual', href: '/docs/traffic-patterns-xd/traffic-patterns-xd-design-manual.pdf' },
      { label: 'Specification',                  type: 'spec-sheet',    href: '/docs/traffic-patterns-xd/traffic-patterns-xd-spec-en.pdf', lang: 'en' },
      { label: 'Specification',                  type: 'spec-sheet',    href: '/docs/traffic-patterns-xd/traffic-patterns-xd-spec-fr.pdf', lang: 'fr' },
      { label: 'Two Component Sealer Specification',type: 'spec-sheet', href: '/docs/traffic-patterns-xd/traffic-patterns-xd-two-component-sealer-spec.pdf' },
      { label: 'Colour Guide',                   type: 'colour-guide',  href: '/docs/traffic-patterns-xd/traffic-patterns-xd-colour-guide.pdf' },
      { label: 'Cross Section Detail',           type: 'other',         href: '/docs/traffic-patterns-xd/traffic-patterns-xd-cross-section-detail.pdf' },
    ],
  },
  {
    slug: 'mmax',
    docs: [
      { label: 'Brochure',                         type: 'brochure',           href: '/docs/mmax/mmax-brochure.pdf' },
      { label: 'Application Instructions',         type: 'installation-guide', href: '/docs/mmax/mmax-application-instructions.pdf' },
      { label: 'Product Data Sheet',               type: 'data-sheet',         href: '/docs/mmax/mmax-product-data-sheet.pdf' },
      { label: 'Extended Season Corundum Guide',   type: 'guide',              href: '/docs/mmax/mmax-extended-season-corundum-guide.pdf' },
      { label: 'Extended Season Product Data Sheet',type: 'data-sheet',        href: '/docs/mmax/mmax-extended-season-pds.pdf' },
    ],
  },
  {
    slug: 'decomark',
    docs: [
      { label: 'Brochure',                  type: 'brochure',           href: '/docs/decomark/decomark-brochure.pdf' },
      { label: 'Application Instructions',  type: 'installation-guide', href: '/docs/decomark/decomark-application-instructions.pdf' },
      { label: 'Custom Design Guidelines',  type: 'guide',              href: '/docs/decomark/decomark-custom-design-guidelines.pdf' },
      { label: 'Specification',             type: 'spec-sheet',         href: '/docs/decomark/decomark-spec.pdf' },
      { label: 'Colour Guide',              type: 'colour-guide',       href: '/docs/decomark/decomark-colour-guide.pdf' },
    ],
  },
  {
    slug: 'durashield',
    docs: [
      { label: 'Color Asphalt Technical Data Sheet',    type: 'data-sheet', href: '/docs/durashield/durashield-color-asphalt-tds.pdf' },
      { label: 'Color Solar Gray Technical Data Sheet', type: 'data-sheet', href: '/docs/durashield/durashield-color-solar-gray-tds.pdf' },
    ],
  },
  {
    slug: 'premark',
    docs: [
      { label: 'Brochure',         type: 'brochure', href: '/docs/premark/premark-brochure.pdf' },
      { label: 'PreMarkXF Brochure',type: 'brochure', href: '/docs/premark/premark-xf-brochure.pdf' },
    ],
  },
  {
    slug: 'duratherm',
    docs: [
      { label: 'Brochure',                  type: 'brochure',      href: '/docs/duratherm/duratherm-brochure.pdf' },
      { label: 'Design Manual',             type: 'design-manual', href: '/docs/duratherm/duratherm-design-manual.pdf' },
      { label: 'Custom Design Guidelines',  type: 'guide',         href: '/docs/duratherm/duratherm-custom-design-guidelines.pdf' },
      { label: 'Specification',             type: 'spec-sheet',    href: '/docs/duratherm/duratherm-spec.pdf' },
      { label: 'Colour Guide',              type: 'colour-guide',  href: '/docs/duratherm/duratherm-colour-guide.pdf' },
    ],
  },
  {
    slug: 'airmark',
    docs: [
      { label: 'Brochure',                          type: 'brochure',   href: '/docs/airmark/airmark-brochure-en.pdf',               lang: 'en' },
      { label: 'Brochure',                          type: 'brochure',   href: '/docs/airmark/airmark-brochure-fr.pdf',               lang: 'fr' },
      { label: 'TrafficPaint Brochure',             type: 'brochure',   href: '/docs/airmark/airmark-trafficpaint-brochure-en.pdf',  lang: 'en' },
      { label: 'TrafficPaint Brochure',             type: 'brochure',   href: '/docs/airmark/airmark-trafficpaint-brochure-fr.pdf',  lang: 'fr' },
      { label: 'WB Airfield Product Data Sheet',    type: 'data-sheet', href: '/docs/airmark/airmark-wb-airfield-pds.pdf' },
      { label: 'PreMark Groundside Airports Brochure',type: 'brochure', href: '/docs/airmark/airmark-premark-groundside-brochure.pdf' },
    ],
  },
]

/** Returns docs for a given product slug, or empty array if none registered */
export function getDocsForProduct(slug: string): ProductDocument[] {
  return productDocuments.find((p) => p.slug === slug)?.docs ?? []
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd Web_Projects/hubss-website && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd Web_Projects/hubss-website && git add lib/documents.ts
git commit -m "feat: add lib/documents.ts — document registry for all 10 products"
```

---

### Task 2: Create DocumentDownloads component

**Files:**
- Create: `Web_Projects/hubss-website/components/sections/DocumentDownloads.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/DocumentDownloads.tsx
import { getDocsForProduct, docTypeLabel, type ProductDocument } from "@/lib/documents";

function DocRow({ doc, isLast }: { doc: ProductDocument; isLast: boolean }) {
  const label = doc.lang ? `${doc.label} (${doc.lang.toUpperCase()})` : doc.label;

  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 py-3 group"
      style={{ borderBottom: isLast ? "none" : "1px solid #333" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
          style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
        >
          {docTypeLabel[doc.type]}
        </span>
        <span className="text-sm truncate" style={{ color: "#f5f0eb" }}>
          {label}
        </span>
      </div>
      <svg
        className="w-4 h-4 shrink-0 transition-transform group-hover:translate-y-0.5"
        style={{ color: "#9ca3af" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </a>
  );
}

export default function DocumentDownloads({ slug }: { slug: string }) {
  const docs = getDocsForProduct(slug);
  if (docs.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#f5f0eb" }}>
        Downloads
      </h2>
      <div
        className="rounded-xl p-6"
        style={{ background: "#2d2d2d", border: "1px solid #333" }}
      >
        {docs.map((doc, idx) => (
          <DocRow key={idx} doc={doc} isLast={idx === docs.length - 1} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd Web_Projects/hubss-website && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/DocumentDownloads.tsx
git commit -m "feat: add DocumentDownloads component"
```

---

### Task 3: Add DocumentDownloads to product detail page

**Files:**
- Modify: `Web_Projects/hubss-website/app/products/[slug]/page.tsx`

The product page left column currently ends with the gallery grid. Add `<DocumentDownloads>` immediately after the closing `</div>` of the gallery grid, before the closing `</div>` of the left column.

- [ ] **Step 1: Add the import**

In `app/products/[slug]/page.tsx`, add after the existing imports:
```tsx
import DocumentDownloads from "@/components/sections/DocumentDownloads";
```

- [ ] **Step 2: Add the component**

Find this block (end of gallery section, inside the left column):
```tsx
            </div>
          </div>

          {/* Right: specs + CTA */}
```

Replace with:
```tsx
            </div>

            <DocumentDownloads slug={product.slug} />
          </div>

          {/* Right: specs + CTA */}
```

- [ ] **Step 3: Verify build**

```bash
cd Web_Projects/hubss-website && npm run build
```
Expected: Build completes with no errors.

- [ ] **Step 4: Visual check**

With `npm run dev` running, visit `http://localhost:3000/products/streetprint`.
Expected: A "Downloads" section appears below the gallery with 4 rows (Spec Sheet, Colour Guide, Template Catalog, FAQ).

Visit `http://localhost:3000/products/airmark`.
Expected: Downloads section shows 6 rows, with "(EN)" / "(FR)" suffixes on bilingual docs.

Visit `http://localhost:3000/products/premark`.
Expected: Downloads section shows 2 brochure rows.

- [ ] **Step 5: Commit**

```bash
git add app/products/[slug]/page.tsx
git commit -m "feat: add DocumentDownloads section to product detail pages"
```

---

## Chunk 2: Resources Page + Nav + File Structure

### Task 4: Create Resources landing page

**Files:**
- Create: `Web_Projects/hubss-website/app/resources/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// app/resources/page.tsx
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { productDocuments, docTypeLabel, type ProductDocument } from "@/lib/documents";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Resources | HUB Surface Systems",
  description:
    "Spec sheets, brochures, installation guides, and technical data sheets for every HUB Surface Systems product.",
};

function DocRow({ doc, isLast }: { doc: ProductDocument; isLast: boolean }) {
  const label = doc.lang ? `${doc.label} (${doc.lang.toUpperCase()})` : doc.label;
  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 py-3 group"
      style={{ borderBottom: isLast ? "none" : "1px solid #3a3a3a" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
          style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
        >
          {docTypeLabel[doc.type]}
        </span>
        <span className="text-sm truncate" style={{ color: "#f5f0eb" }}>
          {label}
        </span>
      </div>
      <svg
        className="w-4 h-4 shrink-0 transition-transform group-hover:translate-y-0.5"
        style={{ color: "#9ca3af" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </a>
  );
}

export default function ResourcesPage() {
  // Join with products to get display names and preserve product order
  const productsWithDocs = products
    .map((p) => ({
      ...p,
      docs: productDocuments.find((pd) => pd.slug === p.slug)?.docs ?? [],
    }))
    .filter((p) => p.docs.length > 0);

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-16 max-w-2xl">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#f97316" }}
          >
            Technical Library
          </p>
          <h1
            className="text-6xl font-bold mb-5 leading-tight"
            style={{ color: "#f5f0eb" }}
          >
            Resources
          </h1>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Spec sheets, brochures, installation guides, and technical data sheets
            for every HUB Surface Systems product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productsWithDocs.map((product) => (
            <div
              key={product.slug}
              className="rounded-xl p-6"
              style={{ background: "#2d2d2d", border: "1px solid #333" }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ color: "#f5f0eb" }}
              >
                {product.name}
              </h2>
              {product.docs.map((doc, idx) => (
                <DocRow
                  key={idx}
                  doc={doc}
                  isLast={idx === product.docs.length - 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd Web_Projects/hubss-website && npm run build
```
Expected: Build completes, `/resources` route appears in output.

- [ ] **Step 3: Visual check**

Visit `http://localhost:3000/resources`.
Expected:
- Page header: "Technical Library" eyebrow, "Resources" heading
- 2-column grid of product cards (10 cards total — all products have docs)
- Each card shows product name + download rows with type badge + label + download icon
- AirMark card shows "(EN)" / "(FR)" on bilingual entries

- [ ] **Step 4: Commit**

```bash
git add app/resources/page.tsx
git commit -m "feat: add /resources landing page with full document library"
```

---

### Task 5: Add Resources to nav

**Files:**
- Modify: `Web_Projects/hubss-website/components/sections/Nav.tsx`

- [ ] **Step 1: Add the nav entry**

In `Nav.tsx`, find:
```ts
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
```

Replace with:
```ts
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
```

- [ ] **Step 2: Visual check**

Visit `http://localhost:3000` — "Resources" link appears in the desktop nav between "Blog" and "Contact".
Click it — lands on `/resources`.
Visit `http://localhost:3000/resources` — "Resources" link is highlighted orange (active state).

- [ ] **Step 3: Commit**

```bash
git add components/sections/Nav.tsx
git commit -m "feat: add Resources link to main nav"
```

---

### Task 6: Create public/docs/ folder structure

**Files:**
- Create: `Web_Projects/hubss-website/public/docs/README.md`
- Create: `Web_Projects/hubss-website/public/docs/streetprint/README.md`
- Create: `Web_Projects/hubss-website/public/docs/streetbond/README.md`
- Create: `Web_Projects/hubss-website/public/docs/traffic-patterns/README.md`
- Create: `Web_Projects/hubss-website/public/docs/traffic-patterns-xd/README.md`
- Create: `Web_Projects/hubss-website/public/docs/mmax/README.md`
- Create: `Web_Projects/hubss-website/public/docs/decomark/README.md`
- Create: `Web_Projects/hubss-website/public/docs/durashield/README.md`
- Create: `Web_Projects/hubss-website/public/docs/premark/README.md`
- Create: `Web_Projects/hubss-website/public/docs/duratherm/README.md`
- Create: `Web_Projects/hubss-website/public/docs/airmark/README.md`

- [ ] **Step 1: Create public/docs/README.md**

```markdown
# /public/docs

PDF document library for HUBSS.com. One subfolder per product.

## How to add a PDF

1. Drop the PDF into the correct product subfolder
2. Name it exactly as listed in the subfolder README (kebab-case, `.pdf` extension)
3. The download link on the website works immediately — no code change needed

## Naming rules

- Lowercase kebab-case only: `streetprint-spec.pdf` not `StreetPrint Spec.PDF`
- No spaces, no uppercase
- Extension must be `.pdf`

## Folder map

| Folder                  | Product            |
|-------------------------|--------------------|
| `streetprint/`          | StreetPrint        |
| `streetbond/`           | StreetBond         |
| `traffic-patterns/`     | TrafficPatterns    |
| `traffic-patterns-xd/`  | TrafficPatternsXD  |
| `mmax/`                 | MMAX               |
| `decomark/`             | DecoMark           |
| `durashield/`           | DuraShield         |
| `premark/`              | PreMark            |
| `duratherm/`            | DuraTherm          |
| `airmark/`              | AirMark            |
```

- [ ] **Step 2: Create public/docs/streetprint/README.md**

```markdown
# /public/docs/streetprint

Documents for **StreetPrint** — Decorative stamped asphalt for civic identity.

| Filename                              | Document Label        | Type        |
|---------------------------------------|-----------------------|-------------|
| `streetprint-spec.pdf`                | Specification Sheet   | Spec Sheet  |
| `streetprint-colour-guide.pdf`        | Colour Guide          | Colour Guide|
| `streetprint-template-catalog.pdf`    | Template Catalog      | Document    |
| `streetprint-faq.pdf`                 | FAQ                   | Document    |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 3: Create public/docs/streetbond/README.md**

```markdown
# /public/docs/streetbond

Documents for **StreetBond** — UV-stable color coating with 20-year performance.

| Filename                                   | Document Label                      | Type          |
|--------------------------------------------|-------------------------------------|---------------|
| `streetbond-brochure.pdf`                  | Brochure                            | Brochure      |
| `streetbond-colour-guide.pdf`              | Colour Guide                        | Colour Guide  |
| `streetbond-substrate-guide.pdf`           | Substrate Guide                     | Guide         |
| `streetbond-sb120-spec.pdf`                | SB120 Specification                 | Spec Sheet    |
| `streetbond-sb150-spec.pdf`                | SB150 Specification                 | Spec Sheet    |
| `streetbond-sb120-tds.pdf`                 | SB120 Technical Data Sheet          | Data Sheet    |
| `streetbond-sb150-tds.pdf`                 | SB150 Technical Data Sheet          | Data Sheet    |
| `streetbond-sb150-al-tds.pdf`              | SB150 AL Technical Data Sheet       | Data Sheet    |
| `streetbond-concrete-spec.pdf`             | Concrete Specification              | Spec Sheet    |
| `streetbond-concrete-primer-wb-tds.pdf`    | Concrete Primer WB Data Sheet       | Data Sheet    |
| `streetbond-concrete-primer-qs-tds.pdf`    | Concrete Primer QS Data Sheet       | Data Sheet    |
| `streetbond-pro220-install-guide.pdf`      | Pro 220 MMA Installation Guide      | Install Guide |
| `streetbond-pro220-brochure.pdf`           | Pro 220 MMA Brochure                | Brochure      |
| `streetbond-pro220-tds.pdf`                | Pro 220 MMA Data Sheet              | Data Sheet    |
| `streetbond-pro250-install-guide.pdf`      | Pro 250 MMA Installation Guide      | Install Guide |
| `streetbond-pro250-brochure.pdf`           | Pro 250 MMA Brochure                | Brochure      |
| `streetbond-pro250-tds.pdf`                | Pro 250 MMA Data Sheet              | Data Sheet    |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 4: Create public/docs/traffic-patterns/README.md**

```markdown
# /public/docs/traffic-patterns

Documents for **TrafficPatterns** — Intersection-grade preformed thermoplastic markings.

| Filename                                            | Document Label                       | Type         |
|-----------------------------------------------------|--------------------------------------|--------------|
| `traffic-patterns-brochure.pdf`                     | Brochure                             | Brochure     |
| `traffic-patterns-design-manual.pdf`                | Design Manual                        | Design Manual|
| `traffic-patterns-custom-design-guidelines.pdf`     | Custom Design Guidelines             | Guide        |
| `traffic-patterns-125-sa-spec.pdf`                  | 125 with SA Specification            | Spec Sheet   |
| `traffic-patterns-solid-sheets-125-spec.pdf`        | Solid Sheets 125 Specification       | Spec Sheet   |
| `traffic-patterns-two-component-sealer-spec.pdf`    | Two Component Sealer Specification   | Spec Sheet   |
| `traffic-patterns-colour-guide.pdf`                 | Colour Guide                         | Colour Guide |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 5: Create public/docs/traffic-patterns-xd/README.md**

```markdown
# /public/docs/traffic-patterns-xd

Documents for **TrafficPatternsXD** — 150mil aggregate-reinforced for extreme durability.

| Filename                                               | Document Label                      | Type         | Language |
|--------------------------------------------------------|-------------------------------------|--------------|----------|
| `traffic-patterns-xd-brochure.pdf`                     | Brochure                            | Brochure     | —        |
| `traffic-patterns-xd-design-manual.pdf`                | Design Manual                       | Design Manual| —        |
| `traffic-patterns-xd-spec-en.pdf`                      | Specification                       | Spec Sheet   | EN       |
| `traffic-patterns-xd-spec-fr.pdf`                      | Specification                       | Spec Sheet   | FR       |
| `traffic-patterns-xd-two-component-sealer-spec.pdf`    | Two Component Sealer Specification  | Spec Sheet   | —        |
| `traffic-patterns-xd-colour-guide.pdf`                 | Colour Guide                        | Colour Guide | —        |
| `traffic-patterns-xd-cross-section-detail.pdf`         | Cross Section Detail                | Document     | —        |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 6: Create public/docs/mmax/README.md**

```markdown
# /public/docs/mmax

Documents for **MMAX** — Fast-cure MMA resin for bus and bike lanes.

| Filename                                    | Document Label                        | Type          |
|---------------------------------------------|---------------------------------------|---------------|
| `mmax-brochure.pdf`                         | Brochure                              | Brochure      |
| `mmax-application-instructions.pdf`         | Application Instructions              | Install Guide |
| `mmax-product-data-sheet.pdf`               | Product Data Sheet                    | Data Sheet    |
| `mmax-extended-season-corundum-guide.pdf`   | Extended Season Corundum Guide        | Guide         |
| `mmax-extended-season-pds.pdf`              | Extended Season Product Data Sheet    | Data Sheet    |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 7: Create public/docs/decomark/README.md**

```markdown
# /public/docs/decomark

Documents for **DecoMark** — Custom decorative pavement marking systems.

| Filename                                  | Document Label              | Type          |
|-------------------------------------------|-----------------------------|---------------|
| `decomark-brochure.pdf`                   | Brochure                    | Brochure      |
| `decomark-application-instructions.pdf`   | Application Instructions    | Install Guide |
| `decomark-custom-design-guidelines.pdf`   | Custom Design Guidelines    | Guide         |
| `decomark-spec.pdf`                       | Specification               | Spec Sheet    |
| `decomark-colour-guide.pdf`               | Colour Guide                | Colour Guide  |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 8: Create public/docs/durashield/README.md**

```markdown
# /public/docs/durashield

Documents for **DuraShield** — Protective asphalt coating and restoration.

| Filename                                   | Document Label                            | Type       |
|--------------------------------------------|-------------------------------------------|------------|
| `durashield-color-asphalt-tds.pdf`         | Color Asphalt Technical Data Sheet        | Data Sheet |
| `durashield-color-solar-gray-tds.pdf`      | Color Solar Gray Technical Data Sheet     | Data Sheet |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 9: Create public/docs/premark/README.md**

```markdown
# /public/docs/premark

Documents for **PreMark** — Preformed symbols and legends for road markings.

| Filename                    | Document Label        | Type     |
|-----------------------------|-----------------------|----------|
| `premark-brochure.pdf`      | Brochure              | Brochure |
| `premark-xf-brochure.pdf`   | PreMarkXF Brochure    | Brochure |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 10: Create public/docs/duratherm/README.md**

```markdown
# /public/docs/duratherm

Documents for **DuraTherm** — Inlaid preformed thermoplastic — snowplow-safe.

| Filename                                  | Document Label              | Type          |
|-------------------------------------------|-----------------------------|---------------|
| `duratherm-brochure.pdf`                  | Brochure                    | Brochure      |
| `duratherm-design-manual.pdf`             | Design Manual               | Design Manual |
| `duratherm-custom-design-guidelines.pdf`  | Custom Design Guidelines    | Guide         |
| `duratherm-spec.pdf`                      | Specification               | Spec Sheet    |
| `duratherm-colour-guide.pdf`              | Colour Guide                | Colour Guide  |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 11: Create public/docs/airmark/README.md**

```markdown
# /public/docs/airmark

Documents for **AirMark** — FAA and TC Canada compliant airfield marking system.

| Filename                                       | Document Label                           | Type       | Language |
|------------------------------------------------|------------------------------------------|------------|----------|
| `airmark-brochure-en.pdf`                      | Brochure                                 | Brochure   | EN       |
| `airmark-brochure-fr.pdf`                      | Brochure                                 | Brochure   | FR       |
| `airmark-trafficpaint-brochure-en.pdf`         | TrafficPaint Brochure                    | Brochure   | EN       |
| `airmark-trafficpaint-brochure-fr.pdf`         | TrafficPaint Brochure                    | Brochure   | FR       |
| `airmark-wb-airfield-pds.pdf`                  | WB Airfield Product Data Sheet           | Data Sheet | —        |
| `airmark-premark-groundside-brochure.pdf`      | PreMark Groundside Airports Brochure     | Brochure   | —        |

Filenames must match exactly — kebab-case, `.pdf` extension.
```

- [ ] **Step 12: Commit all docs folders**

```bash
cd Web_Projects/hubss-website && git add public/docs/
git commit -m "feat: scaffold public/docs/ folder structure with README files for all 10 products"
```

---

### Final: Full build + push

- [ ] **Step 1: Full production build**

```bash
cd Web_Projects/hubss-website && npm run build
```
Expected: Build completes with 0 errors. `/resources` appears in the route list.

- [ ] **Step 2: Push to GitHub**

```bash
cd "C:/Users/cleve/Based_Agency/based-agncy_os" && git push origin main
```
Expected: All commits pushed. Vercel auto-deploys.
