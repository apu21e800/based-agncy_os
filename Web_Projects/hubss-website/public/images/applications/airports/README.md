# /public/images/applications/airports

**Application:** Airports — FAA and TC Canada compliant airfield markings

## Files

| Filename                  | Purpose                            |
|---------------------------|------------------------------------|
| `airports-card.jpg`       | Homepage mosaic tile + listing card |
| `airports-hero.jpg`       | Application detail page hero       |
| `airports-detail-01.jpg`  | Close-up of runway marking (optional) |
| `airports-night.jpg`      | Night retroreflectivity (optional) |

## Dimensions

| File   | Width  | Height | Aspect |
|--------|--------|--------|--------|
| Card   | 800px  | 600px  | 4:3    |
| Hero   | 1200px | 675px  | 16:9   |
| Detail | 800px  | 533px  | 3:2    |

## Shot guidance

- Runway or taxiway perspective shot — yellow hold-short bars, runway numbers, threshold markings
- Clean, precise markings communicate FAA compliance and safety-critical precision
- Aerial or eye-level along a runway works best for the hero
- Night shot with retroreflective markings glowing is a highly persuasive secondary image
- Regional airport is fine — does not need to be YYZ or YVR

## Update lib/applications.ts

```ts
imageUrl: "/images/applications/airports/airports-card.jpg"
```
