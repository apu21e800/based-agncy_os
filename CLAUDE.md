\# Based Agency | Project Intelligence



\## 🌐 Context

This is a professional creative agency hub combining high-end video production with full-stack web applications.



\## 📁 Project Structure

\- `Media\_Library/`: Storage for high-fidelity assets (LFS tracked).

&nbsp; - `Raw/`: Original footage and project files.

&nbsp; - `Final/`: Optimized exports for web/social.

\- `Web\_Projects/`: Node.js/Next.js applications.

&nbsp; - `based-eats-app/`: DoorDash-scale restaurant ordering platform.



\## 🛠 Tech Stack

\- \*\*Framework\*\*: Next.js 15 (App Router)

\- \*\*Styling\*\*: Tailwind CSS + Shadcn/UI

\- \*\*Animations\*\*: Framer Motion

\- \*\*Database/Auth\*\*: Supabase

\- \*\*Payments\*\*: Stripe



\## 📜 Development Rules

1\. \*\*TypeScript\*\*: Always use strict typing. Avoid `any`.

2\. \*\*Components\*\*: Use functional components with Tailwind utility classes.

3\. \*\*Assets\*\*: Reference videos from `/public/videos/` and images from `/public/images/`.

4\. \*\*Git\*\*: Never push large binary files without Git LFS.



\## 🚀 Commands

\- \*\*Start Dev Server\*\*: `cd Web\_Projects/based-eats-app; npm run dev`

\- \*\*Build App\*\*: `cd Web\_Projects/based-eats-app; npm run build`

\- \*\*Git Sync\*\*: `git add .; git commit -m "update"; git push`

