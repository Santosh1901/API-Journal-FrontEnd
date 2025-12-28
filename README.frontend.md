# API Journal — Frontend (Vite + React + TypeScript)

This is a clean, minimal frontend that consumes a deployed FastAPI backend.

## Features
- Landing page with recent journal entries
- Entries list and detail page
- Create new entry form
- Loading / empty / error states
- Uses Tailwind CSS for modern minimal styling

## Local setup
1. Install dependencies

```bash
npm install
```

2. Add environment variable

Create `.env.local` or copy `.env.example` and set your backend base URL:

```bash
cp .env.example .env.local
# edit .env.local and set VITE_API_BASE_URL
```

3. Run in dev mode

```bash
npm run dev
```

Open http://localhost:5173

## Important
- The app expects a backend exposing the following public endpoints:
  - GET /api/entries
  - GET /api/entries/:id
  - POST /api/entries
- Base URL is set via `VITE_API_BASE_URL` environment variable

## Notes
- No mocked data and no authentication by design
- Designed to be a portfolio-ready UI for demos

---

## Deployment

You can deploy this project in several ways. Below are recommended options and quick instructions.

### Vercel (recommended for simplicity)
1. Push this repository to GitHub.
2. Import the repo in Vercel and set the build command to `npm run build` and the output directory to `dist`.
3. In Vercel project settings add the environment variable `VITE_API_BASE_URL` pointing to your backend.
4. Vercel will build automatically on push.

### Netlify
1. Push to GitHub and connect the repo in Netlify.
2. Build command: `npm run build`, Publish directory: `dist`.
3. In Netlify site settings add `VITE_API_BASE_URL` as an env var.
4. Optionally set the `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` GitHub repository secrets for automated deploys via the included GitHub Actions workflow.

### Docker (run anywhere)
1. Build the image locally:

```bash
docker build -t api-journal-frontend:latest .
```

2. Run it:

```bash
docker run -p 3000:80 -e VITE_API_BASE_URL="https://api.example.com" api-journal-frontend:latest
```

It serves static assets via nginx on port 80 in the container.

### CI / GitHub Actions
A workflow is included at `.github/workflows/ci.yml` that will:
- Install dependencies
- Build the app
- Run `npm run typecheck`
- Optionally deploy to Netlify when `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets are present


---

If you want, I can push a simple GitHub Pages or Netlify deploy from here as a one-off to get an immediate public URL — tell me which provider you prefer and provide any required secrets (NETLIFY_SITE_ID, NETLIFY_AUTH_TOKEN) and I'll wire it up.
