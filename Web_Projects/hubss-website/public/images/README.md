# HUBSS Photo Handoff Guide

Swap any image by dropping a file into the correct folder and updating the
`imageUrl` field in the matching data file. No other code changes needed.

## Naming Convention

All filenames must be **kebab-case** — lowercase, hyphens only, no spaces.

```
✅ crosswalk-hero.jpg
✅ streetprint-detail-01.jpg
❌ CrosswalkHero.JPG
❌ streetprint detail.jpg
```

Formats: `.jpg` or `.webp` for photos, `.png` or `.svg` for graphics with transparency.

---

## Folder Structure

```
images/
├── hero/             Site-wide hero background
├── about/            About page — team, story, offices
├── blog/             Blog post covers
├── lunch-learn/      Lunch & Learn section image
├── projects/         One image per project (named by slug)
├── products/         One subfolder per product (10 total)
│   ├── traffic-patterns/
│   ├── traffic-patterns-xd/
│   ├── streetprint/
│   ├── streetbond/
│   ├── mmax/
│   ├── decomark/
│   ├── durashield/
│   ├── premark/
│   ├── duratherm/
│   └── airmark/
└── applications/     One subfolder per application (9 total)
    ├── crosswalks/
    ├── bus-bike-lanes/
    ├── driveways/
    ├── public-art/
    ├── regulatory-markings/
    ├── parks-paths/
    ├── community-branding/
    ├── parking-lots/
    └── airports/
```

Each subfolder has its own README explaining what images belong there,
recommended dimensions, and the exact filenames to use.

---

## How to Swap a Photo (no developer needed)

1. Resize and optimize your photo to the dimensions in the subfolder README.
2. Drop the file into the correct subfolder using the exact filename listed.
3. Open the matching `lib/*.ts` or `lib/images.ts` file.
4. Change the `imageUrl` value from the Unsplash URL to the local path:
   ```
   "/images/products/streetprint/streetprint-hero.jpg"
   ```
5. Save. Done — the site uses your photo immediately on next build.

---

## Global Specs

- **Format:** WebP preferred, JPEG acceptable
- **Colour space:** sRGB
- **No watermarks, no stock-site overlays**
- **Aspect ratios:** 16:9 hero/product heroes · 4:3 application cards · 3:2 project tiles
- **File size targets:** Hero <300 KB · Cards <150 KB · Thumbnails <80 KB

---

## Docs / PDFs

Drop spec sheet PDFs in `/public/docs/` (not this folder).
See `/public/docs/README.md` for the full filename list.
