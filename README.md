# danielfullerton.com

Source for my personal site and blog — [danielfullerton.com](https://danielfullerton.com). A statically-generated Next.js site with a lightweight, file-based content pipeline: posts are plain Markdown, parsed and rendered at build time, and the whole thing exports to static HTML deployed on Azure Static Web Apps.

## Stack

- **Framework:** Next.js 15 (Pages Router) + React 19, TypeScript
- **Content:** Markdown in [`posts/`](posts), processed with `gray-matter` (front-matter) and `remark`/`rehype` (Markdown → HTML, GFM, Mermaid diagrams)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Hosting:** static export (`next build` → `out/`), deployed to Azure Static Web Apps via GitHub Actions

## Project layout

```
components/   UI components (layout, nav, footer, post rendering)
pages/        Next.js routes
posts/        Blog posts (Markdown + front-matter)
data/         Structured content — work history, technologies
styles/       Global styles and Tailwind config
utils/        Markdown processing and helpers
scripts/      Local preview server
public/       Static assets
```

## Running locally

```bash
npm install
npm run dev
```

`npm run dev` starts the Next.js dev server bound to your LAN and prints a QR code so you can open the site on a phone for quick mobile checks.

## Building

```bash
npm run build   # static export to ./out
```

Pushes to `main` build and deploy automatically through the [Azure Static Web Apps workflow](.github/workflows/azure-static-web-apps.yml).

## Content

Add a post by dropping a Markdown file in [`posts/`](posts) with front-matter (title, date, description); it's picked up automatically at build time. See [`architecture.md`](architecture.md) for a diagram of the content pipeline.
