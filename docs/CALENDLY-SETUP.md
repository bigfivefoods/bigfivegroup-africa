# Calendly setup for bigfivegroup.africa

The site already supports Calendly. When `NEXT_PUBLIC_CALENDLY_URL` is set, `/contact` shows an **inline booking panel**. Without it, visitors use email/WhatsApp only.

## 1. Create your Calendly account

1. Go to [https://calendly.com](https://calendly.com) → **Sign up** (email or Google).
2. Use a professional email (e.g. `craig@bigfivegroup.africa`) if possible.
3. Connect **Google Calendar** or **Outlook** so bookings write into your diary and block conflicts.

## 2. Create one event type (recommended)

Suggested settings for Big Five:

| Field | Recommendation |
|--------|----------------|
| **Name** | Big Five strategic briefing |
| **Duration** | 30 minutes |
| **Location** | Google Meet / Zoom / Phone (your choice) |
| **Availability** | e.g. weekdays 09:00–16:00 SAST, max 2–3 per day |
| **Buffer** | 10–15 min before/after |
| **Invitee questions** | Organisation · Interest (Foods / Leadership / Connect / Other) · Country |

Optional: create a second event later (“Leadership cohort consult” 45 min).

## 3. Copy your public link

1. In Calendly → **Event types** → open the event.
2. Click **Copy link**.
3. It looks like:

```text
https://calendly.com/your-username/big-five-strategic-briefing
```

That full URL is what the website needs.

## 4. Wire it to the website

### Option A — Vercel (production)

1. Open [Vercel project → Settings → Environment Variables](https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7/settings/environment-variables).
2. Add:

| Name | Value | Environments |
|------|--------|----------------|
| `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/your-username/your-event` | Production, Preview, Development |

3. **Redeploy** production (Deployments → ⋯ → Redeploy).

### Option B — Local

In `.env.local`:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/your-event
```

Restart `npm run dev`, open [http://localhost:3000/contact](http://localhost:3000/contact).

### Option C — Script

```bash
# .env.vercel.secrets
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/your-event

export VERCEL_TOKEN=...
npm run env:vercel
# then redeploy
```

## 5. Check it works

1. Visit `https://bigfivegroup.africa/contact`.
2. You should see **Book a strategic briefing** with the Calendly calendar.
3. Book a **test** slot with another email, then cancel it.
4. Confirm the invite hit your calendar and email.

## 6. Branding tips (optional, Calendly paid tiers)

- Logo: Big Five or Super-Cube
- Colour: black / emerald to match the site
- Confirmation page: thank-you + link to partner kit `/partner-kit`

## Troubleshooting

| Issue | Fix |
|--------|-----|
| Calendar not on /contact | Env var missing or site not redeployed after set |
| Wrong times | Time zone in Calendly account settings (use Africa/Johannesburg) |
| Double bookings | Connect only one primary calendar; enable conflict checks |
| Embed blank | Ad blockers; try “Open full-page booking” link |

## After you have the link

Paste the Calendly URL here (or set it in Vercel) and we can confirm it’s live on production.
