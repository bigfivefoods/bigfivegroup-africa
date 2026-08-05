# Grok Build brief — SupplierAdvisor® (Big Five Foods storefront)

**Paste this entire document into Grok Build in the SupplierAdvisor repository.**

---

## Context

**bigfivegroup.africa** is the branded Foods storefront (discovery, trust, shortlist).  
**supplieradvisor.com** is the **system of record** (catalog, quotes, orders, stock, invoices, fulfilment).

Marketing site is already wired for Phase 2:

| Marketing behaviour | Expected SA endpoint |
|---------------------|----------------------|
| Order CTAs | `GET /store/big-five-foods` and `/store/big-five-foods/products/{sku\|externalRef}` |
| Deep-link params | `source`, `ref`, `product`, `sku`, `name`, `channel` |
| Register | `/onboarding?type=business&partner=big-five-foods&intent=order&source=...` → land on store |
| Login | `/login?next=/store/big-five-foods?...` |
| Live catalog | `GET /api/storefront/big-five-foods/products` (proxied by marketing `/api/foods/catalog`) |
| Quotes | `POST /api/storefront/big-five-foods/quotes` (proxied by marketing `/api/foods/quote`) |
| Multi-SKU list | Store with `?products=id1,id2&intent=cart&source=...` (or `/cart` if you implement it) |
| Seed | `POST /api/storefront/seed` with `STOREFRONT_SEED_SECRET` |

**Your job:** make SA production-grade so the full buy path is world-class, transparent, and efficient.

---

## Non-negotiable architecture

1. **No second order book** on the marketing site.  
2. **Big Five Foods** is the seller company; public slug `big-five-foods`.  
3. **NSNP / institutional SKUs = quote-first** (never fake instant checkout).  
4. **externalRef** on every product must match marketing ids (see seed list below).  
5. Quotes visible to Foods seller under **Customers → Quotes**.  
6. Attribution params preserved end-to-end (`source=bigfivegroup.africa`, `ref=foods-sales-portal`).

---

## Phase 2 acceptance (must pass)

### Store & catalog
- [ ] `https://www.supplieradvisor.com/store/big-five-foods` lists all seeded products (fast, mobile-clean).
- [ ] `.../products/porridge-chocolate?source=bigfivegroup.africa&ref=foods-sales-portal` opens that product (by **externalRef** or sku).
- [ ] Unknown product key → **store home**, not hard 404.
- [ ] `GET /api/storefront/big-five-foods/products` returns JSON (array or `{ products: [...] }`) with `externalRef` / metadata.
- [ ] Images, pack, badge (`NSNP approved`), channel flags present.

### Auth handoff
- [ ] Onboarding with `partner=big-five-foods&intent=order` redirects to store (or product if `product`/`sku` set).
- [ ] Login with `next=/store/big-five-foods?...` returns to that URL after auth.
- [ ] New buyer can start trade with Big Five Foods without dead ends.

### Quotes & trade
- [ ] `POST /api/storefront/big-five-foods/quotes` creates a seller-visible quote (name, email, org, product, channel, source, ref, message).
- [ ] Institutional / NSNP path is quote-first in UI and API.
- [ ] Retail/wholesale can create draft order / PO when verified (or clear “request quote” if stock/price missing).
- [ ] Multi-product query `products=id1,id2` pre-fills draft cart/quote when possible.

### Seed (production)
```bash
curl -X POST https://www.supplieradvisor.com/api/storefront/seed \
  -H "x-storefront-seed-secret: $STOREFRONT_SEED_SECRET" \
  -H "Content-Type: application/json" \
  -d '{}'
```
- [ ] Sets `profiles.metadata.store_slug = big-five-foods`
- [ ] Upserts all SKUs with `metadata.externalRef` matching list below
- [ ] Idempotent re-run safe

---

## Product seed list (`externalRef`)

**Porridges:** `porridge-original`, `porridge-chocolate`, `porridge-banana`, `porridge-strawberry`  
**Soya:** `soya-beef`, `soya-chilli-beef`, `soya-beef-onion`, `soya-mutton`  
**One-pots:** `onepot-chicken`, `onepot-beef`, `onepot-chilli-beef`, `onepot-chakalaka`  
**Soups:** `soup-chicken`, `soup-brown-onion`, `soup-oxtail`, `soup-minestrone`  
**NSNP (quote-first, institutional):**  
`nsnp-beef-soya-5kg`, `nsnp-enriched-porridge-5kg`, `nsnp-onepot-chicken-biryani-5kg`

---

## World-class ops requirements (implement or expose in product)

These make the process transparent and efficient — not optional for “world class”:

| Requirement | Implementation notes |
|-------------|----------------------|
| **Quote SLA** | Show “response within 1 business day” on quote confirmation UI; notify seller immediately |
| **Buyer notifications** | Email (and optional in-app): quote received → quoted → order confirmed → shipped |
| **Seller queue** | Quotes/orders inbox for Big Five Foods workspace, sortable, unread clear |
| **Status trail** | Buyer sees status on SA (no tracking only by phone) |
| **Stock honesty** | `inStock` / made-to-order flag on API + store UI |
| **Price honesty** | Price list or “price on request” — never silent blank |
| **Lot / batch on ship** | Where food safety requires, attach lot to fulfilment |
| **OTIFEF** | Score deliveries against confirmed orders (existing SA strength) |
| **Seller of record** | Invoice/legal name = Big Five Foods |
| **Channel rules** | retail / wholesale / institutional price lists & approval rules |
| **Attribution** | Store `source` + `ref` on quote/order for website ROI |
| **Returns / damage** | Short published policy linked from store footer |

---

## Recommended API shapes (stable contracts)

### GET `/api/storefront/big-five-foods/products`

```json
{
  "seller": "Big Five Foods",
  "storeUrl": "https://www.supplieradvisor.com/store/big-five-foods",
  "updatedAt": "ISO-8601",
  "products": [
    {
      "id": "porridge-chocolate",
      "sku": "BFF-PORR-CHOC",
      "externalRef": "porridge-chocolate",
      "name": "Fortified Porridge · Chocolate",
      "shortName": "Porridge Chocolate",
      "description": "...",
      "pack": "Retail / catering packs",
      "packSize": "...",
      "images": ["https://..."],
      "badges": ["NSNP approved"],
      "channel": "retail",
      "channelFlags": ["retail", "wholesale"],
      "quoteFirst": false,
      "inStock": true,
      "priceOnRequest": true,
      "active": true
    }
  ]
}
```

### POST `/api/storefront/big-five-foods/quotes`

```json
{
  "name": "string",
  "email": "string",
  "organisation": "string?",
  "phone": "string?",
  "message": "string?",
  "product": "externalRef or sku",
  "productName": "string?",
  "channel": "institutional",
  "source": "bigfivegroup.africa",
  "ref": "foods-sales-portal"
}
```

Response: `{ "ok": true, "quoteId": "..." }` and create seller quote row.

### Multi-SKU handoff (implement if not done)

Accept on store home or `/store/{slug}/cart`:

```
?source=bigfivegroup.africa&ref=foods-sales-portal&intent=cart&products=id1,id2,id3
```

Prefill draft cart/quote lines for logged-in company; if logged out, preserve list through login `next=`.

---

## UX / copy constraints

- Brand: **SupplierAdvisor®** + **Big Five Foods**  
- Do not present as anonymous consumer Amazon cart unless you deliberately ship B2C mode  
- Default: **verified company trade**  
- Tagline direction: *Order on the verified network — one OS for trade and proof*  
- Store should feel as polished as the Group marketing site (typography, mobile, load speed)

---

## Security & production

- [ ] `STOREFRONT_SEED_SECRET` required for production seed  
- [ ] Public catalog GET rate-limited / cacheable  
- [ ] Quotes POST rate-limited + spam protection  
- [ ] CORS only if browser calls SA directly (prefer marketing site proxy — already built)  
- [ ] No PII in public product JSON  

---

## End-to-end dry-run (must pass before calling it done)

1. Open `https://bigfivegroup.africa/foods#shop`  
2. Click **Order on SA** on a retail product → correct SA product page  
3. **Register** with partner handoff → land on Foods store  
4. **Login** with next= → return to store  
5. **NSNP product** → quote-first → seller sees quote in Customers → Quotes  
6. Multi-product list from marketing site → SA draft with multiple lines (or clear multi-product store view)  
7. Seller confirms → buyer sees status on SA  
8. Marketing `/api/foods/catalog` shows **live** when SA API is up  

---

## Out of scope for this sprint

- Rebuilding bigfivegroup.africa  
- Dual inventory on the marketing site  
- Full multi-currency expansion (design hooks only)  
- Claiming WFP/DBE sponsorship beyond approved Foods copy  

---

## Implementation order (recommended)

1. Production **seed** + verify externalRefs  
2. Store + product deep links + param handling  
3. Onboarding + login next  
4. Quotes API + seller inbox + buyer confirmation  
5. Multi-SKU `products=` handoff  
6. Stock/price honesty flags on API + UI  
7. Notifications + SLA UI  
8. OTIFEF + lot on fulfilment polish  

---

## Success definition

A school, caterer, or retailer can discover products on **bigfivegroup.africa**, complete a **real quote or order** on **SupplierAdvisor** with Big Five Foods, and both sides share a **transparent status trail** — with NSNP never falsely sold as instant checkout.

---

## Start prompt (copy into Grok Build)

```
Implement and harden the Big Five Foods storefront on SupplierAdvisor to production world-class standard.

Follow docs/supplieradvisor-grok-build-brief.md (or the pasted brief) as source of truth.

Priority:
1. Ensure production seed creates store_slug big-five-foods and all externalRef SKUs
2. Public store + product pages with deep-link params from bigfivegroup.africa
3. Onboarding partner=big-five-foods intent=order → store; login next= works
4. Quotes API creates seller-visible quotes; NSNP quote-first
5. Multi-product products= handoff from marketing order list
6. Catalog API stable JSON with externalRef for marketing /api/foods/catalog proxy
7. Buyer/seller notifications and 1-business-day quote SLA messaging

Do not invent a second cart only on the marketing site. SA remains system of record.
```
