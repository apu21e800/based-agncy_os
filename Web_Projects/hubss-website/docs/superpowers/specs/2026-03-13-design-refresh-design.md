# HUBSS Design Refresh — Typography, Mega Menu, StatsBar

**Date:** 2026-03-13
**Status:** Approved

---

## Scope

Four targeted changes across three files plus layout:

| Change | Files |
|--------|-------|
| Font system — Inter for body, Geist for headings | `app/layout.tsx`, `app/globals.css` |
| Full-viewport mega menu | `components/sections/Nav.tsx` |
| StatsBar redesign | `components/sections/StatsBar.tsx` |
| ProductsGrid softer treatment | `components/sections/ProductsGrid.tsx` |

---

## 1. Font System

**Problem:** Geist renders poorly below ~16px — strokes thin out and lose legibility on dark backgrounds. Body copy, descriptions, nav links, labels all suffer.

**Solution:** Dual font stack.
- **Geist** → headings, display text, numbers, wordmark (stays as-is)
- **Inter** → everything else: body copy, descriptions, nav links, badges, labels, captions

**Implementation:**

`app/layout.tsx` — load both fonts:
```tsx
import { Geist, Inter } from "next/font/google";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300","400","500","600","700"] });

// Apply both variables to <body>: className={`${geist.variable} ${inter.variable} antialiased`}
```

`app/globals.css` — set defaults:
```css
@theme inline {
  --font-sans: var(--font-inter);   /* body default → Inter */
  --font-display: var(--font-geist); /* headings → Geist */
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.7;
}

h1, h2, h3, h4 {
  font-family: var(--font-geist), system-ui, sans-serif;
}
```

All existing component code stays unchanged — the cascade handles it. Only components that explicitly set `fontFamily` inline need updating (none do currently).

---

## 2. Full-Viewport Mega Menu

**Problem:** Current dropdown panels feel like a dropdown. Needs editorial impact at scale.

**Approach:** Full-screen overlay (`position: fixed; inset: 0; padding-top: 64px`) that covers the page behind the nav. Dark background (`#0a0a0a`) with subtle noise texture via SVG filter. Nav bar stays on top (`z-50`), overlay at `z-40`.

### Layout (Products panel)

Two columns: `1fr 380px`

**Left — numbered product list:**
- Eyebrow: "Surface Systems" in gradient text
- 10 rows, each: number (01–10, muted), icon box (32px, orange-tinted), product name (Geist, 1.05rem, 700, `#c9c4be`), shortDesc (Inter, 0.72rem, `#3d3d3d`)
- Hover: name brightens to `#fff`, desc to `#6b7280`, arrow `→` slides in from left, row gets subtle `rgba(255,255,255,0.02)` bg
- "View all products →" footer link
- Padding: `3rem 4rem`, border-right: `1px solid rgba(255,255,255,0.05)`

**Right — Option B: project card + stats + contact:**
- Background: `#080808`
- Recent project card: pulls `projects[0]` from `lib/projects.ts` — image (aspect 16:9, rounded-lg), location badge (top-left), project title (Geist), product tag
- Stats strip: 3 stats (30+ Years, 500+ Projects, 10 Systems) — Geist numbers in gradient text, Inter labels
- Contact strip: "Talk to a specialist" + "East: Milton · West: Ladysmith" + orange "Book →" button linking `/contact`

### Layout (Applications panel)

Same overlay, same structure. Left: 9 applications (name + icon, no desc needed). Right: simplified — stats strip + CTA only (no project card).

### Animation

```ts
// Overlay
initial: { opacity: 0 }
animate: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }
exit:    { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }

// Left column content (staggered slide-up)
initial: { opacity: 0, y: 12 }
animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut", delay: 0.05 } }
```

### Interaction

Same as existing: hover trigger opens, 150ms close timer, `cancelCloseTimer` on panel enter, Escape closes + returns focus, outside click closes, route change closes. `mode="wait"` on AnimatePresence.

Since the overlay now covers the full screen, "outside click" is handled by clicking the overlay background (not just outside the nav ref).

---

## 3. StatsBar Redesign

**Problem:** Orange solid top/bottom borders are harsh. Orange gradient wash over the entire section reads as decorative noise. Numbers in solid orange (`#f97316`) look cheap.

**Design:**
- Background: `#111` (slightly elevated from page `#1a1a1a`) — no borders
- 4 stat items in a `grid-cols-4` (mobile: `grid-cols-2`)
- Each stat: number in Geist gradient text (same `linear-gradient(90deg, #F97316, #EAB308)`) at `text-4xl font-black`, label in Inter `#4b5563` at `0.72rem`
- Subtle vertical dividers between items: `1px solid rgba(255,255,255,0.05)`
- `py-16` generous vertical padding
- No borders on the section itself — it floats between hero and products

Stats data unchanged: 30+ Years Experience, 500+ Projects Delivered, 10 Provinces Served, 20 Year Durability Guarantee.

---

## 4. ProductsGrid Softer Treatment

**Problem:** `shortDesc` in `#fb923c` (orange) competes with the product name and reads as an accent, not a descriptor. Cards feel dense and hard.

**Changes:**
- `shortDesc` color: `#fb923c` → `#4b5563` (muted gray, Inter)
- Card background: `#222` → `#1e1e1e` (slightly softer)
- Description body text: stays `#e5e7eb` but weight from whatever it is → `400` (regular, not medium)
- "Explore system" CTA: stays orange — it's earned as the action
- Top accent bar animation: keep (it's a nice detail)
- Section heading "Our Systems": stays Geist bold — now handled by the font cascade

No layout changes. Just color and weight adjustments.

---

## Files Changed

| Action | File |
|--------|------|
| Modify | `app/layout.tsx` |
| Modify | `app/globals.css` |
| Modify | `components/sections/Nav.tsx` |
| Modify | `components/sections/StatsBar.tsx` |
| Modify | `components/sections/ProductsGrid.tsx` |
