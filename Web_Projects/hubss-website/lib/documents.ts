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
      { label: 'Brochure',                      type: 'brochure',           href: '/docs/streetbond/streetbond-brochure.pdf' },
      { label: 'Colour Guide',                  type: 'colour-guide',       href: '/docs/streetbond/streetbond-colour-guide.pdf' },
      { label: 'Substrate Guide',               type: 'guide',              href: '/docs/streetbond/streetbond-substrate-guide.pdf' },
      { label: 'SB120 Specification',           type: 'spec-sheet',         href: '/docs/streetbond/streetbond-sb120-spec.pdf' },
      { label: 'SB150 Specification',           type: 'spec-sheet',         href: '/docs/streetbond/streetbond-sb150-spec.pdf' },
      { label: 'SB120 Technical Data Sheet',    type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb120-tds.pdf' },
      { label: 'SB150 Technical Data Sheet',    type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb150-tds.pdf' },
      { label: 'SB150 AL Technical Data Sheet', type: 'data-sheet',         href: '/docs/streetbond/streetbond-sb150-al-tds.pdf' },
      { label: 'Concrete Specification',        type: 'spec-sheet',         href: '/docs/streetbond/streetbond-concrete-spec.pdf' },
      { label: 'Concrete Primer WB Data Sheet', type: 'data-sheet',         href: '/docs/streetbond/streetbond-concrete-primer-wb-tds.pdf' },
      { label: 'Concrete Primer QS Data Sheet', type: 'data-sheet',         href: '/docs/streetbond/streetbond-concrete-primer-qs-tds.pdf' },
      { label: 'Pro 220 MMA Installation Guide',type: 'installation-guide', href: '/docs/streetbond/streetbond-pro220-install-guide.pdf' },
      { label: 'Pro 220 MMA Brochure',          type: 'brochure',           href: '/docs/streetbond/streetbond-pro220-brochure.pdf' },
      { label: 'Pro 220 MMA Data Sheet',        type: 'data-sheet',         href: '/docs/streetbond/streetbond-pro220-tds.pdf' },
      { label: 'Pro 250 MMA Installation Guide',type: 'installation-guide', href: '/docs/streetbond/streetbond-pro250-install-guide.pdf' },
      { label: 'Pro 250 MMA Brochure',          type: 'brochure',           href: '/docs/streetbond/streetbond-pro250-brochure.pdf' },
      { label: 'Pro 250 MMA Data Sheet',        type: 'data-sheet',         href: '/docs/streetbond/streetbond-pro250-tds.pdf' },
    ],
  },
  {
    slug: 'traffic-patterns',
    docs: [
      { label: 'Brochure',                          type: 'brochure',      href: '/docs/traffic-patterns/traffic-patterns-brochure.pdf' },
      { label: 'Design Manual',                     type: 'design-manual', href: '/docs/traffic-patterns/traffic-patterns-design-manual.pdf' },
      { label: 'Custom Design Guidelines',          type: 'guide',         href: '/docs/traffic-patterns/traffic-patterns-custom-design-guidelines.pdf' },
      { label: '125 with SA Specification',         type: 'spec-sheet',    href: '/docs/traffic-patterns/traffic-patterns-125-sa-spec.pdf' },
      { label: 'Solid Sheets 125 Specification',    type: 'spec-sheet',    href: '/docs/traffic-patterns/traffic-patterns-solid-sheets-125-spec.pdf' },
      { label: 'Two Component Sealer Specification',type: 'spec-sheet',    href: '/docs/traffic-patterns/traffic-patterns-two-component-sealer-spec.pdf' },
      { label: 'Colour Guide',                      type: 'colour-guide',  href: '/docs/traffic-patterns/traffic-patterns-colour-guide.pdf' },
    ],
  },
  {
    slug: 'traffic-patterns-xd',
    docs: [
      { label: 'Brochure',                          type: 'brochure',      href: '/docs/traffic-patterns-xd/traffic-patterns-xd-brochure.pdf' },
      { label: 'Design Manual',                     type: 'design-manual', href: '/docs/traffic-patterns-xd/traffic-patterns-xd-design-manual.pdf' },
      { label: 'Specification',                     type: 'spec-sheet',    href: '/docs/traffic-patterns-xd/traffic-patterns-xd-spec-en.pdf', lang: 'en' },
      { label: 'Specification',                     type: 'spec-sheet',    href: '/docs/traffic-patterns-xd/traffic-patterns-xd-spec-fr.pdf', lang: 'fr' },
      { label: 'Two Component Sealer Specification',type: 'spec-sheet',    href: '/docs/traffic-patterns-xd/traffic-patterns-xd-two-component-sealer-spec.pdf' },
      { label: 'Colour Guide',                      type: 'colour-guide',  href: '/docs/traffic-patterns-xd/traffic-patterns-xd-colour-guide.pdf' },
      { label: 'Cross Section Detail',              type: 'other',         href: '/docs/traffic-patterns-xd/traffic-patterns-xd-cross-section-detail.pdf' },
    ],
  },
  {
    slug: 'mmax',
    docs: [
      { label: 'Brochure',                           type: 'brochure',           href: '/docs/mmax/mmax-brochure.pdf' },
      { label: 'Application Instructions',           type: 'installation-guide', href: '/docs/mmax/mmax-application-instructions.pdf' },
      { label: 'Product Data Sheet',                 type: 'data-sheet',         href: '/docs/mmax/mmax-product-data-sheet.pdf' },
      { label: 'Extended Season Corundum Guide',     type: 'guide',              href: '/docs/mmax/mmax-extended-season-corundum-guide.pdf' },
      { label: 'Extended Season Product Data Sheet', type: 'data-sheet',         href: '/docs/mmax/mmax-extended-season-pds.pdf' },
    ],
  },
  {
    slug: 'decomark',
    docs: [
      { label: 'Brochure',                 type: 'brochure',           href: '/docs/decomark/decomark-brochure.pdf' },
      { label: 'Application Instructions', type: 'installation-guide', href: '/docs/decomark/decomark-application-instructions.pdf' },
      { label: 'Custom Design Guidelines', type: 'guide',              href: '/docs/decomark/decomark-custom-design-guidelines.pdf' },
      { label: 'Specification',            type: 'spec-sheet',         href: '/docs/decomark/decomark-spec.pdf' },
      { label: 'Colour Guide',             type: 'colour-guide',       href: '/docs/decomark/decomark-colour-guide.pdf' },
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
      { label: 'Brochure',          type: 'brochure', href: '/docs/premark/premark-brochure.pdf' },
      { label: 'PreMarkXF Brochure',type: 'brochure', href: '/docs/premark/premark-xf-brochure.pdf' },
    ],
  },
  {
    slug: 'duratherm',
    docs: [
      { label: 'Brochure',                 type: 'brochure',      href: '/docs/duratherm/duratherm-brochure.pdf' },
      { label: 'Design Manual',            type: 'design-manual', href: '/docs/duratherm/duratherm-design-manual.pdf' },
      { label: 'Custom Design Guidelines', type: 'guide',         href: '/docs/duratherm/duratherm-custom-design-guidelines.pdf' },
      { label: 'Specification',            type: 'spec-sheet',    href: '/docs/duratherm/duratherm-spec.pdf' },
      { label: 'Colour Guide',             type: 'colour-guide',  href: '/docs/duratherm/duratherm-colour-guide.pdf' },
    ],
  },
  {
    slug: 'airmark',
    docs: [
      { label: 'Brochure',                           type: 'brochure',   href: '/docs/airmark/airmark-brochure-en.pdf',              lang: 'en' },
      { label: 'Brochure',                           type: 'brochure',   href: '/docs/airmark/airmark-brochure-fr.pdf',              lang: 'fr' },
      { label: 'TrafficPaint Brochure',              type: 'brochure',   href: '/docs/airmark/airmark-trafficpaint-brochure-en.pdf', lang: 'en' },
      { label: 'TrafficPaint Brochure',              type: 'brochure',   href: '/docs/airmark/airmark-trafficpaint-brochure-fr.pdf', lang: 'fr' },
      { label: 'WB Airfield Product Data Sheet',     type: 'data-sheet', href: '/docs/airmark/airmark-wb-airfield-pds.pdf' },
      { label: 'PreMark Groundside Airports Brochure',type: 'brochure',  href: '/docs/airmark/airmark-premark-groundside-brochure.pdf' },
    ],
  },
]

/** Returns docs for a given product slug, or empty array if none registered */
export function getDocsForProduct(slug: string): ProductDocument[] {
  return productDocuments.find((p) => p.slug === slug)?.docs ?? []
}
