# 🍔 Foodiezone

A full-stack food ordering demo — customer-facing storefront, kitchen dispatch view, and driver delivery view — built to prototype how a township takeaway could run end-to-end on a single Next.js app.

> **This is a demo project.** Default credentials (`staff123`, `drive123`) are for local evaluation only. Replace via `NEXT_PUBLIC_KITCHEN_PW` / `NEXT_PUBLIC_DRIVER_PW` env vars if you deploy. Real production auth would move this server-side.

---

## What it does

- **Customer** browses a menu, builds a cart, places an order
- **Kitchen** sees new orders live, flips tickets through prep → ready
- **Driver** picks up ready tickets, marks delivered
- **Catalogue** admin (separate `FoodCatalogue` app) manages menu items and pricing

---

## Stack

| Layer | Tech |
| :--- | :--- |
| Framework | Next.js + TypeScript |
| UI | Tailwind · Radix primitives · shadcn/ui |
| State | React Context (per-role auth) |
| Structure | Two-app monorepo (`foodiezone` + `FoodCatalogue`) |

---

## Quick start

```bash
git clone https://github.com/ChumaMike/Foodiezone.git
cd Foodiezone/foodiezone
npm install
npm run dev
```

The catalogue admin app lives at `../FoodCatalogue/` — same flow.

---

## 🗺️ Roadmap

- [ ] Move role auth server-side (current client-side gating is demo-only)
- [ ] Real payments (Yoco / Peach integration)
- [ ] Driver location tracking
- [ ] WhatsApp receipt delivery via Twilio

---

## License

MIT · Demo by [Chuma Meyiswa](https://github.com/ChumaMike)
