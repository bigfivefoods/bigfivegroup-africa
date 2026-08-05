# Grok Build brief — Big Five Foods store product images (SupplierAdvisor)

**Repo:** SupplierAdvisor (supplieradvisor.com)  
**Scope:** Public storefront product cards/detail for Big Five Foods only (or all store tenants if shared component).

---

## Goal

On the Big Five Foods storefront (`/store/big-five-foods` and product cards):

1. Show the **full product image** (entire pack visible — **no crop**).
2. Make images **slightly smaller** so the grid stays dense and neat.

---

## Requirements

### Product cards (catalog grid)

- Use **`object-fit: contain`** (not `cover`).
- Light neutral plate behind the image (e.g. `#f8f7f5` or `bg-muted`).
- Fixed image area height, roughly **96–112px** on mobile, **112–128px** on desktop (or `max-height` on the img of ~100–120px).
- Center the image horizontally and vertically in the plate.
- Padding inside the plate (~8–12px) so the pack doesn’t touch edges.
- Do **not** stretch or crop; letterboxing on the plate is fine.
- Badges (e.g. NSNP) can sit absolute top-right of the plate without covering the pack.

### Product detail page

- Hero product image also **`object-contain`**, full pack visible.
- Slightly constrained max width (e.g. max-w-xs / max 280–320px) so it doesn’t dominate the page.

### CSS sketch (adapt to your stack)

```css
.store-product-image-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem; /* ~112px; use 6rem on small screens */
  padding: 0.5rem 0.625rem;
  background: #f8f7f5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.store-product-image-plate img,
.store-product-image-plate .next-image {
  width: 100%;
  height: 100%;
  max-width: 7rem;
  object-fit: contain;
  object-position: center;
}
```

Avoid:

```css
object-fit: cover; /* crops packs */
aspect-ratio: 1 / 1 with cover; /* crops */
```

---

## Acceptance

- [ ] Catalog grid: every pack fully visible (no cut tops/sides)
- [ ] Images slightly smaller than a large hero-style crop
- [ ] Grid remains neat (2–4 columns responsive)
- [ ] Product detail: full pack visible
- [ ] Works for Big Five Foods seed images (tall pack shots)

---

## Start prompt for Grok Build

```
On the public storefront (/store/[slug] product cards and product detail), change product images to object-fit: contain on a light plate so the full pack is visible, and make the image area slightly smaller (~100–120px height, max-width ~7rem on the img). Do not use object-fit: cover. Apply to Big Five Foods store and any shared store product card component.
```
