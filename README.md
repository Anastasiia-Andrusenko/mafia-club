This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project notes

- **Gallery photos** live in `public/images/<set>-large/` (full size, shown in
  the modal). The grid and the Home "Thread" strip use 640px previews from
  `public/images/<set>-thumb/`. After adding photos, run
  `npm run media:thumbs` (needs `sharp`, already a devDependency) and commit
  the generated thumbnails. They are plain static files, so no Vercel image
  optimization quota is used (`images.unoptimized` stays on).
- **Slow-load indicator**: `src/lotties/load.json` is a *dotLottie* archive
  (a ZIP despite the `.json` name). `scripts/dotlottie-loader.cjs` unpacks it
  at build time (`import ... from "@/lotties/load.json?dotlottie"`), and
  `lottie-web`'s light SVG player renders it from a lazily loaded chunk.
- **Security headers** (CSP, X-Frame-Options, COOP, Referrer-Policy, HSTS, ...)
  are set for production in `next.config.mjs`. When adding a third-party
  script, image host or API, add its origin to the CSP there.
- **Fonts** (Oswald, Spectral SC) are self-hosted via `next/font/google` in
  `src/pages/_app.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
