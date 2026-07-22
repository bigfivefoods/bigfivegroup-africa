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

`.env.local` is gitignored.

**Contact:** the site form delivers enquiries via Resend to
`craig@bigfivegroup.africa` (Reply-To = visitor). WhatsApp / phone for a faster
loop. No Calendly — briefings are confirmed manually.

### Vercel (production / preview)

**Project:** [bigfivegroup-africa-8rr7](https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7)  
**Dashboard env UI:** Project → Settings → Environment Variables

Optional keys only (analytics / SAM video):

```bash
cp .env.vercel.secrets.example .env.vercel.secrets
# edit optional values
export VERCEL_TOKEN=vercel_xxxx
npm run env:vercel
```

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID |
| `NEXT_PUBLIC_SAM_VIDEO_URL` | Optional | YouTube/Vimeo embed for `/connect/sam` |
| `NEWSLETTER_SECRET` | Recommended | Token signing for confirm / prefs / unsub |
| `UPSTASH_REDIS_REST_URL` + `TOKEN` | Recommended (prod) | Durable subscriber store on Vercel |
| `RESEND_API_KEY` | Optional | Double opt-in + branded HTML emails |
| `NEWSLETTER_FROM_EMAIL` | Optional | Verified Resend from address |
| `NEWSLETTER_WEBHOOK_URL` | Optional | CRM / Make / Zapier fan-out |
| `NEWSLETTER_ADMIN_SECRET` | Optional | Admin export at `/api/newsletter/admin` |

### Newsletter

Public pages: `/newsletter`, `/newsletter/confirm`, `/newsletter/preferences`, `/newsletter/unsubscribe`.

APIs: `POST /api/newsletter/subscribe`, confirm/unsubscribe GET+POST, preferences GET+POST, admin export.

Without Resend, signup is single opt-in with recorded POPIA consent. With `RESEND_API_KEY`, double opt-in is enforced and welcome mail includes preference + unsubscribe links.

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
