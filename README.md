# Big Five Group Africa

Corporate website for **Big Five Group** — eight pillars building regenerative, sovereign, and ethical impact across Africa.

**Live (production):** [bigfivegroup.africa](https://bigfivegroup.africa)  
**Repo:** [github.com/bigfivefoods/bigfivegroup-africa](https://github.com/bigfivefoods/bigfivegroup-africa)  
**Vercel project (active):** [bigfivegroup-africa-8rr7](https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7)

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

Production is the Vercel project **`bigfivegroup-africa-8rr7`** on team **bigfivefoods-projects**, with custom domain **`bigfivegroup.africa`**.

| Link | URL |
|------|-----|
| **Deployments (monitor)** | https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7/deployments |
| **Project overview** | https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7 |
| **Latest production deploy** | https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7/ATdPg2SdTj2V3sL6wHMMjHWPQDaG |
| **Live site** | https://bigfivegroup.africa |

1. Push to `main` on GitHub — production deploys automatically to this project.
2. Pull requests get preview deployments.
3. Optional CLI (global, not a project dependency):

```bash
npm i -g vercel
vercel link   # select bigfivegroup-africa-8rr7 (team: bigfivefoods-projects)
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

`bigfivegroup.africa` is already attached to the active project. Manage domains under  
**Project → Settings → Domains**.

> **Note:** Older duplicate projects (`bigfivegroup-africa`, `bigfivegroup-africa-dlya`) may still appear in the team. Prefer the **8rr7** project links above — that is the git-connected production project.

## Notes

- Hero and product assets live in `/public`.
- Flag images for the Global page load from `flagcdn.com` (allowed in `next.config.ts`).
- `/tribal` remains available as heritage content; primary nav uses **Global**.
