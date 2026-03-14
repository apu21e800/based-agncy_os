# HUBSS Mega Navigation — Design Spec

**Date:** 2026-03-13
**Status:** Approved
**Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS 4, Framer Motion, lucide-react

---

## Overview

Replace `components/sections/Nav.tsx` with a mega menu navigation. Two nav items — **Products** and **Applications** — open full-width dropdown panels driven by live data from `lib/products.ts` and `lib/applications.ts`. All other nav items remain as plain links. Mobile collapses to hamburger with accordion expansion for the two mega items.

The constant gradient bottom-border on the nav is removed. The orange→yellow gradient is used in exactly five purposeful moments across the nav (see Gradient Strategy).

**Data counts:** 10 products (`lib/products.ts`), 9 applications (`lib/applications.ts`).

---

## Gradient Strategy

The `linear-gradient(90deg, #F97316, #EAB308)` brand signature is used sparingly:

| Moment | Usage |
|--------|-------|
| Wordmark "SS" | Gradient text fill — always visible, brand anchor |
| Active nav link underline | 2px gradient line, only on the active route |
| Hover nav link underline | Same 2px line, animates in from `w-0 → w-full` on hover |
| Mega panel top border | 3px gradient seal at the very top of the dropdown panel |
| Eyebrow text inside panel | Gradient text fill on "Products" / "Applications" label |

The constant `3px` gradient line at the bottom of the nav bar (`<div class="absolute bottom-0…">`) is **removed entirely**. The nav darkens on scroll (existing behaviour preserved) — no decorative stripe.

---

## Component Architecture

Single file replacement: `components/sections/Nav.tsx` (client component).

No new files. No Radix UI (not installed). Built with:
- `useState` — `activePanel: 'products' | 'applications' | null`, `mobileOpen: boolean`, `mobileExpanded: 'products' | 'applications' | null`
- `useRef`:
  - `navRef` — ref on the `<nav>` element for outside-click detection
  - `closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)` — cancelable timer for hover-off delay
  - `lastTriggerRef = useRef<HTMLElement | null>(null)` — tracks which trigger last opened a panel, for Escape-key focus return
- `useEffect` — scroll listener, outside-click listener (`mousedown` on `document`), Escape key listener, pathname change listener (close panel on navigation), cleanup on unmount (clear `closeTimerRef`)
- Framer Motion `AnimatePresence` + `motion.div` for panel open/close

Data is imported at the top of the file (server-side safe — no async needed):
```ts
import { products } from "@/lib/products";
import { applications } from "@/lib/applications";
```

---

## Interaction Model (Desktop)

- **Hover trigger → open panel.** Mouse entering a mega trigger (`Products`, `Applications`) opens its panel.
- **Hover off → close panel with 150ms delay** (pointer intent buffer — prevents flicker when moving diagonally toward panel items). Implementation: `onMouseLeave` on both the trigger button AND the panel `motion.div` starts `closeTimerRef` with `setTimeout(150ms, () => setActivePanel(null))`. `onMouseEnter` on either the trigger or the panel cancels the timer with `clearTimeout(closeTimerRef.current)`. This ensures diagonal mouse movement (trigger → panel) does not trigger a flicker close.
- **Click trigger → navigate** to `/products` or `/applications` (the trigger is also a `<Link>`).
- **Click panel item → navigate** to `/products/[slug]` or `/applications/[slug]`. Panel closes on navigation (handled by `useEffect` on `pathname`).
- **Outside click → close panel.** `mousedown` listener on `document`, checks `!navRef.current.contains(e.target)`.
- **Escape key → close panel**, return focus to `lastTriggerRef.current` (whichever trigger was last hovered to open the panel). `onMouseEnter` of each trigger sets `lastTriggerRef.current = e.currentTarget`.
- **No layout shift.** Panel is `position: fixed` below the nav bar, not `position: absolute` inside the nav — so it never pushes page content.
- **Z-index:** Nav is `z-50`. The mega panel is also `z-50` — it sits below the nav bar by virtue of `top: 64px`, not by z-index layering.

---

## Animation Spec

Using Framer Motion `AnimatePresence`:

```ts
// Panel enters
initial:  { opacity: 0, y: -8 }
animate:  { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } }
// Panel exits
exit:     { opacity: 0, y: -4, transition: { duration: 0.13, ease: 'easeIn' } }
```

---

## Desktop Panel — Products

**Layout:** Full viewport width, `position: fixed`, `top: 64px` (matches nav `h-16`), `left: 0`, `right: 0`. Two-column grid: product list (flex: 1) + featured callout (280px fixed).

**Panel styles:**
- `background: #111`
- Gradient top border via inline style (Tailwind has no `border-image` utility): `style={{ borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg, #F97316, #EAB308) 1' }}`
- `box-shadow: 0 24px 48px rgba(0,0,0,0.8)`

**Left column — product grid:**
- Eyebrow: "Products" in gradient text, uppercase, 0.62rem, tracking-widest
- 3-column CSS grid, 10 product rows
- Each row: icon box (32×32px, `rgba(249,115,22,0.1)` bg, 7px radius) containing a lucide icon at `size={16}`, centred — + name (`0.78rem`, `font-semibold`, `#e5e7eb`) + shortDesc (`0.67rem`, `#4b5563`)
- Hover row: `rgba(255,255,255,0.04)` background, 7px radius
- Focus-visible row: `outline: 1.5px solid rgba(249,115,22,0.6); outline-offset: 2px;`
- Footer: "View all products →" link (muted, arrow in gradient text)

**Right column — featured callout (280px):**
- `background: #0d0d0d`, `border-left: 1px solid #1e1e1e`
- Static content for now: label "Featured", a card with product image placeholder, tag, name, short description
- Bottom CTA: "Book a Lunch & Learn →" — `rgba(249,115,22,0.08)` bg, orange border, orange text, `href="/contact"`
- **Featured content is hardcoded** in the component for now (no data-driven requirement). Update manually when client wants to promote a specific product.

---

## Desktop Panel — Applications

**Layout:** Same fixed positioning as Products panel.

**Single column layout** (no featured callout — applications panel is simpler):
- Content area: max-width 900px, centred with `margin: 0 auto`, same horizontal padding (`2rem`) as the Products panel left column
- Eyebrow: "Applications" in gradient text
- 3-column CSS grid
- Each row: icon box (same 32×32px style as products, icon at `size={16}`) + application name only (no `desc` — keeps panel scannable)
- "View all applications →" footer link
- No featured column

---

## Icon Assignments (lucide-react)

### Products

| Product | Lucide Icon |
|---------|------------|
| TrafficPatterns | `Layers` |
| TrafficPatternsXD | `Shield` |
| StreetPrint | `PenTool` |
| StreetBond | `Paintbrush` |
| MMAX | `Zap` |
| DecoMark | `Palette` |
| DuraShield | `ShieldCheck` |
| DuraTherm | `Flame` |
| PreMark | `Milestone` |
| AirMark | `PlaneLanding` |

### Applications

| Application | Lucide Icon |
|-------------|------------|
| Crosswalks | `ArrowLeftRight` |
| Bus & Bike Lanes | `Bus` |
| Driveways | `Home` |
| Public Art | `Sparkles` |
| Regulatory Markings | `TriangleAlert` |
| Parks & Paths | `TreePine` |
| Community Branding | `Building2` |
| Parking Lots | `SquareParking` |
| Airports | `Plane` |

> **Note:** 9 applications total — "Town Homes" is not in `lib/applications.ts` and is excluded.

> **Note:** If any icon name doesn't resolve in the installed lucide-react version, substitute with the closest available. Do not add a dependency for icons.

---

## Wordmark Update

Current wordmark: "HUB" (`font-extrabold`, `#f5f0eb`) + a vertical orange divider `<span>` + "SS" (`font-light`, `tracking-[0.15em]`, `#f97316`).

New wordmark: removes the divider, changes "SS" to gradient text fill. The weight shift from `font-light` to a heavier weight is intentional — "SS" gains visual authority to match the gradient.

```tsx
<Link href="/">
  <span style={{ color: "#f5f0eb", fontWeight: 800, letterSpacing: "-0.02em" }}>HUB</span>
  <span style={{
    background: "linear-gradient(90deg,#F97316,#EAB308)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  }}>SS</span>
</Link>
```

Remove the `<span>` vertical divider bar — the visual break is now the gradient itself.

---

## Mobile Behaviour

Hamburger toggle (existing) preserved. When open, the mobile menu renders as a vertical list:

- Plain links (Projects, About, Blog, Resources, Contact) render as before
- **Products** and **Applications** render as accordion triggers:
  - Tap trigger → expands inline list of product/application names as `<Link>` items
  - Tap again → collapses
  - Arrow icon rotates 180° when expanded (Framer Motion `rotate`)
  - Only one accordion open at a time
- "Book Lunch & Learn" CTA button at the bottom, full width

State: `mobileExpanded: 'products' | 'applications' | null` — setting one closes the other.

---

## Accessibility

- Nav landmark: `<nav aria-label="Main navigation">`
- Mega triggers: `aria-expanded={activePanel === 'products'}`, `aria-haspopup="true"`
- Panel: `role="region"`, `aria-label="Products menu"`
- Escape key closes panel and returns focus to trigger (`triggerRef.current?.focus()`)
- Outside mousedown closes panel
- All interactive elements are keyboard-focusable
- No `outline: none` overrides without replacement

---

## Files Changed

| Action | File |
|--------|------|
| Replace | `components/sections/Nav.tsx` |

No other files change. Products and applications data imports are read-only.

---

## Out of Scope

- Animated product image previews on hover (future enhancement)
- Search within the mega menu
- Keyboard arrow-key navigation within the grid (nice-to-have, not required)
- Featured content driven by CMS (hardcoded for now)
