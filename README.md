# Portfolio

Next.js (App Router) + Tailwind CSS personal site.

## Structure

- `/` — Home
- `/about` — About
- `/photography` — Photography
- `/films` — Films
- `/projects` — Projects
- `/apps` — Index of apps
- `/apps/still-point` — Example app, in its own route
- `/contact` — Contact

Each app lives at `app/apps/<slug>/page.jsx`. To add a new one:
1. Build the app as a client component in `components/`.
2. Create `app/apps/<slug>/page.jsx` that renders it.
3. Add an entry to the `APPS` array in `app/apps/page.jsx`.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy on Vercel

1. Push this project to a GitHub repo.
2. Import the repo at vercel.com (sign in with GitHub).
3. Vercel auto-detects Next.js — no config needed.
4. Add your custom domain under Project → Settings → Domains, then point
   your registrar's DNS at the records Vercel gives you.

## To customize

- Swap "Your Name" in `components/Nav.jsx`, `components/Footer.jsx`, and page titles.
- Replace placeholder copy in `app/about`, `app/photography`, `app/films`, `app/projects`.
- Add real images to `public/` and swap the gradient tiles in `app/photography/page.jsx`
  for Next's `<Image />` component.
- Update contact links in `app/contact/page.jsx`.
