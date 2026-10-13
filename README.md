# Stem Cell

Product website for natural herbal remedies and stem cell dietary supplements, with ordering via WhatsApp.

Plain HTML, CSS and JavaScript — no build step. Open `index.html` or serve the folder with any static host.

## Editing content

All site settings and products live in `js/products.js`:

- `SITE` — business name, WhatsApp number (digits only, e.g. `2348012345678`), phone, email, address.
- `CATEGORIES` — the category filters on the shop.
- `PRODUCTS` — one entry per product. Set `price` to a number to show it, or `null` to show "Ask for price". Set `featured: true` to show it under Best Sellers.

Product images go in `images/products/`.

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.
