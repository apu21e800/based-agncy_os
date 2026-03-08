# HUBSS Photo Handoff Guide

Swap any image by dropping a file into the correct folder and updating the
`imageUrl` field in the matching data file. No other code changes needed.

---

## Folder Map

### `/public/images/products/`
One hero image per product. Referenced in `lib/products.ts` → `imageUrl`.

| File name                    | Product           | Ideal shot                          |
|------------------------------|-------------------|-------------------------------------|
| traffic-patterns.jpg         | TrafficPatterns   | Overhead crosswalk, vivid pattern   |
| traffic-patterns-xd.jpg      | TrafficPatternsXD | High-traffic intersection install   |
| streetprint.jpg              | StreetPrint       | Stamped asphalt close-up            |
| streetbond.jpg               | StreetBond        | Coloured driveway or plaza          |
| mmax.jpg                     | MMAX              | Thermoplastic bike lane marking     |
| decomark.jpg                 | DecoMark          | Decorative crosswalk wide shot      |
| durashield.jpg               | DuraShield        | Parking lot with sealcoat finish    |
| premark.jpg                  | PreMark           | Preformed symbols on asphalt        |
| duratherm.jpg                | DuraTherm         | Hot-applied pavement marking        |
| airmark.jpg                  | AirMark           | Airport runway markings             |

**Recommended:** 1600×900 px, WebP or JPEG, <200 KB each.

---

### `/public/images/projects/`
One hero image per project. Referenced in `lib/projects.ts` → `imageUrl`.

Name files using the project slug (e.g. `york-region-crosswalk.jpg`).
See `lib/projects.ts` for the full slug list.

**Recommended:** 1200×800 px, WebP or JPEG, <150 KB each.

---

### `/public/images/about/`
| File name       | Used on        | Subject                        |
|-----------------|----------------|--------------------------------|
| team.jpg        | About page     | Full team photo or site visit  |
| story.jpg       | About page     | Founders / early project shot  |
| office-east.jpg | About / Contact| Milton ON office exterior      |
| office-west.jpg | About / Contact| Ladysmith BC office exterior   |

---

### `/public/images/blog/`
| File name        | Used for                              |
|------------------|---------------------------------------|
| default.jpg      | Fallback for any post without a cover |
| [post-slug].jpg  | Custom cover per post (optional)      |

---

### `/public/docs/`
Drop PDF spec sheets here. Update product links to point to these files.

| File name                    | Product           |
|------------------------------|-------------------|
| traffic-patterns-spec.pdf    | TrafficPatterns   |
| streetprint-spec.pdf         | StreetPrint       |
| streetbond-spec.pdf          | StreetBond        |
| mmax-spec.pdf                | MMAX              |
| decomark-spec.pdf            | DecoMark          |
| durashield-spec.pdf          | DuraShield        |
| premark-spec.pdf             | PreMark           |
| duratherm-spec.pdf           | DuraTherm         |
| airmark-spec.pdf             | AirMark           |

---

## How to Swap a Photo (no developer needed)

1. Resize and optimize your photo to the dimensions above.
2. Drop the file into the correct subfolder.
3. Open the matching `lib/*.ts` file and change the `imageUrl` value to `/images/products/your-file.jpg` (local path starting with `/`).
4. Save. Done — the site will use your photo immediately on next build.

## Specs
- Format: WebP preferred, JPEG acceptable
- Aspect ratio: 16:9 for heroes, 1:1 for gallery tiles, 4:3 for application cards
- Color space: sRGB
- No watermarks, no stock-site overlays
