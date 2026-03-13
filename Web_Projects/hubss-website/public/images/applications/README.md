# /public/images/applications

One subfolder per application. Each folder holds the card image (and optionally
detail shots) for that application's page.

Referenced in `lib/applications.ts` → `application.imageUrl`.

## Subfolders

| Folder                   | Application          | Slug                    |
|--------------------------|----------------------|-------------------------|
| `crosswalks/`            | Crosswalks           | `crosswalks`            |
| `bus-bike-lanes/`        | Bus & Bike Lanes     | `bus-bike-lanes`        |
| `driveways/`             | Driveways            | `driveways`             |
| `public-art/`            | Public Art           | `public-art`            |
| `regulatory-markings/`   | Regulatory Markings  | `regulatory-markings`   |
| `parks-paths/`           | Parks & Paths        | `parks-paths`           |
| `community-branding/`    | Community Branding   | `community-branding`    |
| `parking-lots/`          | Parking Lots         | `parking-lots`          |
| `airports/`              | Airports             | `airports`              |

## Standard filenames per application folder

| Filename                    | Purpose                                   |
|-----------------------------|-------------------------------------------|
| `[slug]-card.jpg`           | Application grid card (homepage + listing) |
| `[slug]-hero.jpg`           | Application detail page hero              |
| `[slug]-detail-01.jpg`      | Gallery / supporting shot (optional)      |

## Dimensions

| Slot  | Width | Height | Aspect | Notes                         |
|-------|-------|--------|--------|-------------------------------|
| Card  | 800px | 600px  | 4:3    | Homepage mosaic tiles         |
| Hero  | 1200px| 675px  | 16:9   | Application detail page top   |
| Detail| 800px | 533px  | 3:2    | Supporting gallery            |

See each application's subfolder README for subject-specific guidance.
