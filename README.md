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
| `npm run test:e2e` | Playwright smoke tests (needs build first) |

## Environment variables

### Local

```bash
cp .env.example .env.local
# edit .env.local with your keys
npm run dev
```

`.env.local` is gitignored. Non-secret defaults (contact inbox) are pre-filled.

### Vercel (production / preview)

**Project:** [bigfivegroup-africa-8rr7](https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7)  
**Dashboard env UI:** Project → Settings → Environment Variables

Or sync from this repo with a [Vercel token](https://vercel.com/account/tokens):

```bash
# 1. Put secrets in a gitignored file
cp .env.vercel.secrets.example .env.vercel.secrets
# edit .env.vercel.secrets (RESEND_API_KEY, Calendly URL, etc.)

# 2. Export token and push to Production + Preview + Development
export VERCEL_TOKEN=vercel_xxxx
npm run env:vercel
```

Then **Redeploy** production so new env vars load.

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `RESEND_API_KEY` | For inbox delivery | [Resend](https://resend.com) API key — without it, contact form uses mailto |
| `CONTACT_FROM_EMAIL` | With Resend | Verified sender, e.g. `Big Five Group <hello@yourdomain.com>` |
| `CONTACT_TO_EMAIL` | Recommended | Inbox (default `craig@bigfivegroup.africa`) |
| `CONTACT_WEBHOOK_URL` | Optional | Zapier / Make / Formspree webhook |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional | Booking link on `/contact` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID |
| `NEXT_PUBLIC_SAM_VIDEO_URL` | Optional | YouTube/Vimeo embed for `/connect/sam` |

Files:

| File | Commit? | Role |
|------|---------|------|
| `.env.example` | Yes | Template for all vars |
| `.env.local` | No | Local Next.js |
| `.env.vercel.secrets.example` | Yes | Template for Vercel secrets |
| `.env.vercel.secrets` | No | Real secrets for `npm run env:vercel` |
| `scripts/sync-vercel-env.mjs` | Yes | Pushes env to Vercel API |

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
