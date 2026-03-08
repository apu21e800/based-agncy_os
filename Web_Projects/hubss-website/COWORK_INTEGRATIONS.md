# HUBSS Cowork Integration Guide

Three workflows that connect the physical office (Ladysmith BC / Milton ON) to the
live website, keeping content fresh without requiring developer involvement.

---

## Workflow 1 — Photo Pipeline

**Goal:** Replace Unsplash placeholder images with real HUBSS project photography.

### Step-by-step

1. **Shoot / receive photos** — Preferred format: JPEG or WebP, sRGB, minimum 1600 px wide.
2. **Rename the file** using the slug convention in `/public/images/README.md`.
   Example: a photo for the York Region crosswalk project → `york-region-crosswalk.jpg`
3. **Optimise the file**:
   - Online: squoosh.app → target < 200 KB for heroes, < 150 KB for project thumbs
   - CLI: `npx @squoosh/cli --webp '{"quality":82}' your-file.jpg`
4. **Drop the file** into the correct subfolder under `/public/images/`:
   - Products → `/public/images/products/`
   - Projects → `/public/images/projects/`
   - About page → `/public/images/about/`
   - Blog covers → `/public/images/blog/`
5. **Update the `imageUrl` field** in the matching data file:
   - Products → `lib/products.ts` → find the product entry → change `imageUrl` to `/images/products/your-file.jpg`
   - Projects → `lib/projects.ts` → same pattern
   - Applications → `lib/applications.ts` → same pattern
6. **Commit and push** — Vercel deploys automatically on push to `main`.

### File naming cheat sheet

| Asset type       | Pattern                        | Example                           |
|------------------|--------------------------------|-----------------------------------|
| Product hero     | `[product-slug].jpg`           | `streetprint.jpg`                 |
| Project hero     | `[project-slug].jpg`           | `york-region-crosswalk.jpg`       |
| Application card | `[application-slug].jpg`       | `bus-bike-lanes.jpg`              |
| About — team     | `team.jpg`                     | `team.jpg`                        |
| Blog cover       | `[post-slug].jpg` or `default.jpg` | `vision-zero-markings.jpg`    |

---

## Workflow 2 — AI Blog Notification

**Goal:** Keep the team aware when a new AI-generated blog draft is ready for review.

### How the blog generation works

1. Open `https://hubss.com/admin/blog` (or localhost equivalent).
2. Enter the `ADMIN_PASSWORD` from `.env.local`.
3. Optionally type a custom topic; leave blank for a random HUBSS topic.
4. Click **Generate** — Claude Opus 4.6 writes a full MDX draft (~30 seconds).
5. Review the draft: **Publish** moves it to `content/blog/` so it appears on the live site;
   **Discard** deletes the draft.

### Notification hook (optional Slack/email alert)

To notify the team when a draft is ready, add a webhook call inside
`app/api/blog/generate/route.ts` after the draft is saved:

```ts
// After: await writeFile(path.join(draftsDir, filename), mdx, "utf8");
if (process.env.SLACK_WEBHOOK_URL) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New HUBSS blog draft ready for review: *${topic.slice(0, 80)}*\nApprove at https://hubss.com/admin/blog`,
    }),
  });
}
```

Add `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...` to `.env.local`.

### Scheduled generation (cron)

To auto-generate one post per week, add a Vercel Cron Job in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/blog/generate",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

The cron hits POST `/api/blog/generate`. Because cron requests don't carry the
`x-admin-password` header, add an alternative auth check using a `CRON_SECRET`
env var (`req.headers.get("authorization") === "Bearer " + process.env.CRON_SECRET`).

---

## Workflow 3 — Deploy Trigger

**Goal:** Trigger a production rebuild when new content is added without pushing code
(useful for non-developer staff who drop MDX files or images directly via SFTP).

### Vercel Deploy Hook

1. In Vercel dashboard → Project → Settings → Git → **Deploy Hooks**
2. Create a hook named "Content Update" → copy the URL
3. Add `VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...` to `.env.local`
4. Call it from any admin action or a dedicated script:

```bash
# scripts/trigger-deploy.sh
curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
echo "Deploy triggered."
```

### Integrate with photo upload

In a future file-upload UI, call the hook after writing the image:

```ts
// After saving the image file
if (process.env.VERCEL_DEPLOY_HOOK_URL) {
  await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
}
```

---

## Environment Variables Reference

Add all of these to `.env.local` (copy from `.env.local.example`):

| Variable                | Required | Used by                        |
|-------------------------|----------|--------------------------------|
| `RESEND_API_KEY`        | Yes      | Contact + Lunch & Learn forms  |
| `CONTACT_EMAIL`         | No       | Contact form destination       |
| `ANTHROPIC_API_KEY`     | Yes      | Blog generation (AI)           |
| `ADMIN_PASSWORD`        | Yes      | Blog admin dashboard           |
| `SLACK_WEBHOOK_URL`     | No       | Draft-ready notifications      |
| `VERCEL_DEPLOY_HOOK_URL`| No       | Trigger rebuild from content   |

---

## Folder Structure Quick Reference

```
hubss-website/
├── content/blog/           ← published MDX posts (read by site)
│   └── drafts/             ← AI drafts awaiting approval
├── public/images/
│   ├── products/           ← one photo per product
│   ├── projects/           ← one photo per project
│   ├── about/              ← team + office photos
│   └── blog/               ← blog cover images
└── public/docs/            ← PDF spec sheets
```
