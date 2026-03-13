# /public/images/blog

Cover images for blog posts. Referenced in `lib/images.ts` → `SITE_IMAGES.blog_default`
and optionally per-post via MDX frontmatter.

## Files

| Filename           | Used for                                        |
|--------------------|-------------------------------------------------|
| `default.jpg`      | Fallback cover when a post has no specific image |
| `[post-slug].jpg`  | Custom cover per post — name matches the MDX filename |

**Example:** The post `content/blog/vision-zero-surface-markings.mdx` would use
`vision-zero-surface-markings.jpg` as its custom cover.

## Dimensions

| Slot        | Width | Height | Notes        |
|-------------|-------|--------|--------------|
| Cover image | 800px | 500px  | 16:10, centred crop |

## Shot guidance

- `default.jpg`: A versatile pavement/marking shot that works for any topic
- Per-post covers: Match the article topic (crosswalk for pedestrian safety articles, etc.)
- Avoid text overlays — the site adds the title on top of the image

## Naming convention

`kebab-case` matching the MDX filename exactly, `.jpg` extension.
