# Expert Connect Launch

A modern React + TypeScript landing and signup form to grow an expert network for student founders.

## Tech stack
- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui

## Requirements
- Node.js 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm 9+

## Local development
```sh
npm install
npm run dev
```
The app runs at `http://localhost:8080`.

## Production build
```sh
npm run build
```
The static site will be generated in `dist/`.

## Deploying to Netlify
This project is ready for Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects: configured via `netlify.toml`

### One‑click (recommended)
1. Push to GitHub.
2. In Netlify, New site from Git → pick your repo.
3. Keep the defaults (build cmd and publish dir as above).

### Manual deploy (optional)
```sh
npm run build
netlify deploy --prod --dir=dist
```

## Project structure
```
src/
  components/        # UI components and form
  pages/             # Routes
  hooks/, lib/       # Utilities
public/              # Static assets
```

## License
MIT © 2025
