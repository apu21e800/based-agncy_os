# /public/images/projects

Hero images for completed project case studies.
Referenced in `lib/projects.ts` → `project.imageUrl` per entry.

## Naming convention

Name each file after the project's `slug` field in `lib/projects.ts`:

```
[project-slug].jpg
```

**Example:** A project with `slug: "york-region-crosswalk"` uses `york-region-crosswalk.jpg`.

## Dimensions

| Slot           | Width  | Height | Notes              |
|----------------|--------|--------|--------------------|
| Project hero   | 1200px | 800px  | 3:2                |
| Gallery tile   | 800px  | 533px  | 3:2, centred crop  |

You can use a single file for both — Next.js Image handles cropping.

## Shot guidance

- Show the finished surface from the best angle (aerial preferred)
- Include enough context to identify the location type (intersection, plaza, airport, etc.)
- Before/after pairs are excellent — name them `[slug]-before.jpg` / `[slug]-after.jpg`
- Avoid construction-in-progress shots as the primary image

## Current projects

Check `lib/projects.ts` for the full list of slugs. Add one `.jpg` per project.
