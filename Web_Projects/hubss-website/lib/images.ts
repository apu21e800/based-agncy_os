/**
 * SITE_IMAGES — Central image registry for static slots.
 *
 * HOW TO SWAP IN REAL PHOTOS:
 * 1. Drop the photo into the correct /public/images/ subfolder
 * 2. Change the URL below from the Unsplash URL to the local path
 *    e.g. "https://images.unsplash.com/..." → "/images/hero/hero-bg.jpg"
 * 3. Save. The site updates instantly — no other code changes needed.
 *
 * For dynamic content (products, projects, applications) see:
 *   lib/products.ts → product.imageUrl
 *   lib/projects.ts → project.imageUrl
 *   lib/applications.ts → application.imageUrl
 */
export const SITE_IMAGES = {
  // ── Hero ──────────────────────────────────────────────────────────────
  // Recommended: aerial shot of colourful Canadian crosswalk or streetscape
  // Dimensions: 1600×900px minimum
  hero_bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",

  // ── About Page ────────────────────────────────────────────────────────
  // Recommended: team photo or office exterior
  // Dimensions: 1200×800px
  about_team: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",

  // Recommended: Canadian city or infrastructure aerial
  // Dimensions: 1200×800px
  about_story: "https://images.unsplash.com/photo-1486325212980-2af6a2b98b1f?w=1200&q=80",

  // ── Blog ──────────────────────────────────────────────────────────────
  // Default cover when a post has no specific image
  // Dimensions: 800×500px
  blog_default: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80",

  // ── Lunch & Learn ─────────────────────────────────────────────────────
  // Recommended: boardroom, lunch meeting, or professional presentation
  // Dimensions: 800×600px
  lunch_learn: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
} as const;

export type ImageKey = keyof typeof SITE_IMAGES;

/** Get a site image URL by key */
export function img(key: ImageKey): string {
  return SITE_IMAGES[key];
}
