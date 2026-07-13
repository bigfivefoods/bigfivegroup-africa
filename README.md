# Big Five Group Africa

Corporate website for **Big Five Group** — eight pillars building regenerative, sovereign, and ethical impact across Africa.

**Live:** [bigfivegroup-africa.vercel.app](https://bigfivegroup-africa.vercel.app)  
**Repo:** [github.com/bigfivefoods/bigfivegroup-africa](https://github.com/bigfivefoods/bigfivegroup-africa)

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4**
- **Framer Motion** + **Lucide** icons
- Deployed on **Vercel** (GitHub integration)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project structure

```
app/
  page.tsx              # Home
  layout.tsx            # Root layout, SEO metadata
  components/           # Navbar, Footer, shared UI
  lib/companies.ts      # Pillar data
  agri|foods|direct|…   # Pillar & content pages
  sitemap.ts / robots.ts
public/                 # Images, PDFs, certifications
```

## Deploying to Vercel

This repo is already connected to the Vercel project **`bigfivegroup-africa`** under the **bigfivefoods-projects** team.

1. Push to `main` on GitHub — production deploys automatically.
2. Pull requests get preview deployments.
3. Optional CLI (global, not a project dependency):

```bash
npm i -g vercel
vercel link   # select bigfivegroup-africa
vercel        # preview
vercel --prod # production
```

### Vercel settings (recommended)

| Setting | Value |
|---------|--------|
| Framework | Next.js (auto-detected) |
| Build command | `next build` |
| Install command | `npm install` |
| Node.js | 20.x or 24.x |
| Root directory | `.` (repo root) |

No environment variables are required for the static marketing site.

### Custom domain

In the Vercel dashboard → Project → **Settings → Domains**, add `bigfivegroup.africa` (and `www`) and point DNS as instructed.

## Notes

- Hero and product assets live in `/public`.
- Flag images for the Global page load from `flagcdn.com` (allowed in `next.config.ts`).
- `/tribal` remains available as heritage content; primary nav uses **Global**.
