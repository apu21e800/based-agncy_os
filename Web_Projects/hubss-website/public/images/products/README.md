# /public/images/products

One subfolder per product. Each folder holds the hero image (and optionally
detail/gallery shots) for that product's page.

Referenced in `lib/products.ts` → `product.imageUrl`.

## Subfolders

| Folder                  | Product            | Slug                    |
|-------------------------|--------------------|-------------------------|
| `traffic-patterns/`     | TrafficPatterns    | `traffic-patterns`      |
| `traffic-patterns-xd/`  | TrafficPatternsXD  | `traffic-patterns-xd`   |
| `streetprint/`          | StreetPrint        | `streetprint`           |
| `streetbond/`           | StreetBond         | `streetbond`            |
| `mmax/`                 | MMAX               | `mmax`                  |
| `decomark/`             | DecoMark           | `decomark`              |
| `durashield/`           | DuraShield         | `durashield`            |
| `premark/`              | PreMark            | `premark`               |
| `duratherm/`            | DuraTherm          | `duratherm`             |
| `airmark/`              | AirMark            | `airmark`               |

## Standard filenames per product folder

| Filename                   | Purpose                           |
|----------------------------|-----------------------------------|
| `[slug]-hero.jpg`          | Main product card + detail page   |
| `[slug]-detail-01.jpg`     | Secondary gallery shot (optional) |
| `[slug]-detail-02.jpg`     | Third gallery shot (optional)     |
| `[slug]-install.jpg`       | Installation process shot (optional) |

## Dimensions

| Slot     | Width  | Height | Aspect |
|----------|--------|--------|--------|
| Hero     | 1200px | 675px  | 16:9   |
| Detail   | 800px  | 600px  | 4:3    |
| Install  | 800px  | 533px  | 3:2    |

See each product's subfolder README for subject-specific guidance.
