# Website Structure & UI Reference

> **Purpose:** A complete map of this site's content, structure, and styling, written as a handoff for an agent refactoring the **user interface**. It describes what exists today, how the pieces fit together, and — importantly — the **constraints a UI refactor must not break** (static export, routing/slugs, CSP, the blog frontmatter contract, dark mode, SEO).
>
> `architecture.md` (existing) covers the content→build data pipeline as a diagram. This document covers the **rendered UI**.

---

## 1. Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (Pages Router, not App Router) |
| Language | TypeScript + React |
| Output | **Static export** (`output: "export"` in `next.config.ts`) — no server runtime, everything is generated at build time |
| Styling | **Tailwind CSS** + `@tailwindcss/typography` (`prose`), plus a small `styles/globals.css` |
| Fonts | **Inter** via `next/font/google` (CSS var `--font-inter`) |
| Content | Markdown files in `posts/`, parsed with `gray-matter` + `remark`/`rehype` |
| Analytics | Google Analytics (`components/GoogleAnalytics.tsx`) |
| Hosting | **Azure Static Web Apps** (GitHub Action on push to `main`/`master`) |
| Images | `next/image` with `images.unoptimized = true` (required by static export) |

---

## 2. Repository layout (UI-relevant)

```
pages/
  _app.tsx          # Global shell: Inter font, GoogleAnalytics, <Footer> on every page
  _document.tsx     # <html lang>, favicon (/df.png)
  index.tsx         # Home page (/)
  blog/
    index.tsx       # Blog listing (/blog) — filters + post cards
    [slug].tsx      # Blog post (/blog/<slug>) — markdown → HTML
components/
  Navbar.tsx        # Top nav (logo + Home/Blog, responsive hamburger)
  Profile.tsx       # Home hero: name, title, two bio paragraphs, headshot
  Skills.tsx        # Home: "Technologies & Skills" (3 tiers of pills)
  Work.tsx          # Home: "Selected work" (Microsoft case studies)
  Projects.tsx      # Home: "Built end to end" (independent projects, with screenshot + live link)
  RecentBlogPost.tsx# Home: "Latest Blog Post" card
  SocialLinks.tsx   # Home: GitHub / LinkedIn / email icons (centered)
  Footer.tsx        # Global copyright footer
  BlogLayout.tsx    # Wrapper for a single post (cover image, header, prose body)
  Seo.tsx           # <Head> meta: title/description/OG/Twitter/canonical/JSON-LD
  GoogleAnalytics.tsx
data/
  technologies.ts   # Skills content (3 arrays)
  work.ts           # Selected work content (Microsoft case studies)
  projects.ts       # Projects content (independent projects)
posts/*.md          # Blog content (frontmatter + markdown). Filename = URL slug.
types/blog.ts       # Frontmatter + summary type contracts
utils/blog.ts       # Reads/parses posts (getAllPosts, getPostBySlug, getAllSlugs, getLatestPost)
styles/
  globals.css       # Tailwind directives, CSS vars, animated gradient, base element styles
  Home.module.css   # LEGACY / UNUSED (leftover Next.js template)
public/             # Images & static assets (logo, headshot, blog images, favicons)
staticwebapp.config.json  # Azure routing: 301 redirects, SPA fallback, CSP, security headers
next.config.ts, tailwind.config.js, postcss.config.js
```

---

## 3. Routing & pages

Three page types, all statically generated:

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.tsx` | Single-page portfolio |
| `/blog` | `pages/blog/index.tsx` | Client-side filtering (series / featured / tags) |
| `/blog/<slug>` | `pages/blog/[slug].tsx` via `getStaticPaths` | One page per non-draft `.md` file. **`slug` === filename without `.md`** |

There is **no** About, Projects, or Contact route. "Projects" is a section on the home page; "Contact" is the social icon row.

---

## 4. Global shell

- **`_app.tsx`** wraps every page: applies the Inter font variable, renders `<GoogleAnalytics/>`, the page `<Component/>`, and a global `<Footer/>`. It is a flex column with `min-h-screen`.
- **`_document.tsx`** sets `<html lang="en">` and the favicon (`/df.png`).
- **`Navbar`** is **not** in `_app` — each page imports and renders it itself (`index.tsx`, `blog/index.tsx`, and `BlogLayout`). A refactor consolidating the nav should touch all three.
- **`Footer`** IS global (via `_app`). Content: `© <current year> Daniel Fullerton. All rights reserved.` (year from `new Date()`).

### Navbar detail
- Left: `df.png` logo (40×40, links to `/`) via `next/legacy/image` (note: legacy component, unlike the rest of the site which uses `next/image`).
- Right (desktop ≥`sm`): text links **Home** and **Blog** only.
- Mobile (<`sm`): animated hamburger toggling a collapsible menu (`useState`).
- No wordmark text, no other destinations. Large empty horizontal space between logo and the two links.

---

## 5. Page: Home (`/`)

Background: an **animated rainbow gradient** (`.parallax-gradient`, see §9) filling the viewport, with a single **white rounded card** (`bg-white dark:bg-gray-900 rounded-xl shadow-md p-8`, `max-w-7xl`) floating on top. Section order inside the card:

1. **`<Profile/>`** — `h1` name "Daniel Fullerton", `h2` "Software Engineer", two bio paragraphs (Microsoft link with inline Windows logo SVG; mentions T-Mobile, Randstad, CS degree), and a **192×192 circular headshot** (`/profile.jpeg`). The headshot sits in a `bg-gray-200 dark:bg-gray-700` circle → shows a **gray disc until the image loads** (image is `unoptimized`, no `priority`/blur placeholder). On desktop the headshot is right of the bio; on mobile it stacks on top (`order-first`).
2. **`<Skills/>`** — heading "Technologies & Skills", three labeled tiers rendered as pill tags. Content from `data/technologies.ts`:
   - *What I work with daily* → `currentFocus`
   - *Shipped to production* → `productionExperience`
   - *Hands-on experience* → `familiarWith`
3. **`<Work/>`** and **`<Projects/>`** — rendered in that order directly after `<Profile/>`. `Work` ("Selected work") lists numbered Microsoft case studies from `data/work.ts`. `Projects` ("Built end to end", anchor `#projects`, linked from the navbar at `sm` and up) lists independent projects from `data/projects.ts`: title, context, a linked screenshot of the live site, summary, metrics, stack, and a "Visit" link. See §10.
4. **`<RecentBlogPost/>`** — heading "Latest Blog Post", a single card for the newest non-draft post (from `getLatestPost()`): thumbnail, title, date • read time, excerpt, "Read more →".
5. **`<SocialLinks/>`** — centered row of GitHub / LinkedIn / email icon links.

`Seo` sets the home `<title>` to `Software Engineer | Daniel Fullerton` and OG image to `/profile.jpeg`.

---

## 6. Page: Blog index (`/blog`)

- Background: a **static gray gradient** (`bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950`) — **different from the home page's animated gradient** (visual inconsistency to reconcile in a refactor).
- Same white-card container as home.
- `h1` "Blog Posts", then a **filter block**:
  - **Filter by Series** — `<select>` dropdown (built from post `series` values).
  - **Featured Posts** — a toggle button ("Show All Posts" ⇄ "Show Featured Only").
  - **Filter by Tags** — a custom multi-select dropdown (checkboxes; closes on outside-click via a `useEffect` listener).
- Filtering is **client-side** over the full post list (`useState`).
- Each post renders as an `<article>` (bottom border between items): optional 48×48 thumbnail, `h2` title, optional "Featured" badge, a meta row (`date • timeToRead to read • category`), optional "Series:" line, tag pills, and excerpt/description.

---

## 7. Page: Blog post (`/blog/<slug>`)

Rendered by `pages/blog/[slug].tsx` inside **`BlogLayout`**:

- Markdown → HTML pipeline: `unified()` → `remark-parse` → `remark-gfm` → `remark-html` (`sanitize: false`) → `rehype-mermaid` (Mermaid diagram support). Injected via `dangerouslySetInnerHTML`.
- **`BlogLayout`** structure:
  - `<Seo type="article">` with full article metadata (published/modified time, canonical URL, JSON-LD `Article`).
  - `<Navbar/>`.
  - Optional **cover image** hero: `50vh`, background-image with a **scroll parallax** (`translate3d` on scroll) and a `bg-black/40` overlay. Only shown if the post has `coverImage`.
  - Article container `max-w-2xl` (narrower than home/index): a "← Back to Blog" button, `h1` title, meta row (date • author • read time • category), optional series, tag pills + optional Featured badge, and the `description` as a lead paragraph.
  - Body wrapped in Tailwind Typography: `prose lg:prose-xl dark:prose-invert prose-a:text-blue-600`.

Note: three page types use **three different content widths** (`max-w-7xl` home, `max-w-7xl` blog index, `max-w-2xl` post) and **three different backgrounds**.

---

## 8. Component inventory

| Component | Used on | Responsibility | Content source |
|---|---|---|---|
| `Navbar` | all | Top nav + mobile menu | hardcoded links |
| `Profile` | home | Hero: name, title, bio, headshot | hardcoded JSX |
| `Skills` | home | 3 tiers of tech pills | `data/technologies.ts` |
| `Work` | home | "Selected work" case studies | `data/work.ts` |
| `Projects` | home | Independent projects with live links | `data/projects.ts` |
| `RecentBlogPost` | home | Latest post card | `getLatestPost()` |
| `SocialLinks` | home | GitHub/LinkedIn/email icons | hardcoded array |
| `Footer` | all (via `_app`) | Copyright line | `new Date()` |
| `BlogLayout` | posts | Post chrome + prose body | props (metadata) |
| `Seo` | all | `<Head>` meta + JSON-LD | props |
| `GoogleAnalytics` | all (via `_app`) | GA script | — |

---

## 9. Styling system

- **Tailwind utility-first**, configured in `tailwind.config.js` scanning `pages/**` and `components/**`. Only plugin: `@tailwindcss/typography`. `theme.extend` is empty (no custom tokens/colors — everything uses stock Tailwind grays/blue).
- **Dark mode:** Tailwind default **`media` strategy** (no `darkMode` key set) → dark styles come from `dark:` classes and follow the **OS `prefers-color-scheme` only**. There is **no manual toggle**. `globals.css` also defines dark CSS vars via a `@media (prefers-color-scheme: dark)` block. A refactor that wants a theme switch must add `darkMode: "class"` and a toggle.
- **`styles/globals.css`** contains:
  - `@tailwind base/components/utilities`.
  - CSS custom properties (`--background`, `--foreground`, `--accent`, `--muted`, `--border`) with light + dark values.
  - `.parallax-gradient` — the **home background**: a 4-color linear gradient (`#ee7752, #e73c7e, #23a6d5, #23d5ab`) animated over `5s` infinite (`@keyframes gradient`). Loud/energetic; the single biggest visual signature of the site.
  - Base element resets, link colors, inline `code` styling, `overflow-x: hidden` on `html,body`.
- **`styles/Home.module.css`** exists but is **unused legacy** (old Next.js template classes). Safe to delete.
- **Recurring UI patterns** (reuse these when refactoring for consistency):
  - Card container: `bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden p-8`.
  - Section divider + heading: `mt-8 pt-8 border-t border-gray-200 dark:border-gray-700` then `h3 text-xl font-semibold`.
  - Pill/tag: `px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm`.
  - Accent color throughout: `blue-600` / `blue-400` (dark).

---

## 10. Content & data model

### Blog posts (`posts/*.md`)
- **The filename (minus `.md`) is the URL slug.** All slugs are kebab-case (e.g. `chain-of-thought.md` → `/blog/chain-of-thought`). Do **not** reintroduce spaces/capitals in filenames — that produces `%20` URLs.
- Frontmatter contract is defined in `types/blog.ts` and read in `utils/blog.ts`. Key fields: `title`, `date`, `author`, `status` (`draft` hides the post from all listings and from `getStaticPaths`), `description`, `excerpt`, `tags[]`, `category`, `series`, `featured`, `timeToRead`, `image` (list/card thumbnail), `coverImage` (post hero), `canonicalUrl`, `keywords[]`, `noindex`/`nofollow`, `tableOfContents`.
- `utils/blog.ts` API: `getAllPosts()` (sorted newest-first, drafts excluded), `getLatestPost()`, `getPostBySlug(slug)`, `getAllSlugs()`.
- Current posts (7 published + 1 draft `faith-and-ai`): mostly AI/prompt-engineering how-tos plus two personal year-in-review "Retrospectives".

### Skills (`data/technologies.ts`)
Three string arrays: `currentFocus`, `productionExperience`, `familiarWith`. Rendered by `Skills.tsx`.

### Work (`data/work.ts`)
`WorkEntry[]` with `{ title, context, summary, metrics[] }`. Microsoft case studies; figures are generalized, with no customer names or internal identifiers.

### Projects (`data/projects.ts`)
`Project[]` with `{ title, context, summary, metrics[], stack[], href, linkLabel, image, imageAlt }`. Independent work shown with a live link. Currently one entry: Lean Site Services (leansiteservices.com), with its screenshot at `public/lss-homepage.jpg`. Metrics come from the Lean Site Services repo's own records; re-check them there when updating the copy.

---

## 11. Assets (`public/`)
- **Brand/identity:** `df.png` (logo + favicon), `profile.jpeg` (headshot).
- **Blog imagery:** per-post covers/thumbnails and inline figures (e.g. `chain_cover.png`, `gpt_todoist_cover.png`, `focused_cover.png`, `2023-retro.png`, `2024-retro.png`, plus many inline `*_image.png`).
- **Misc/personal:** `fullertonwoodworksbanner.png`, `maternity.jpeg`, `rambo.jpeg`, `stork.png`, etc. (used inside retrospective posts).
- Stock Next.js SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) are unused leftovers.

---

## 12. Build & deploy
- **Build:** `npm run build` = `next build` → static export into `out/` (gitignored). Mermaid rendering runs at build time.
- **Deploy:** `.github/workflows/azure-static-web-apps.yml` builds and deploys to Azure Static Web Apps on push to `main`/`master`. `app_location: "/"`, `output_location: "out"`. The Action rebuilds from source (does not deploy a committed `out/`).
- **`staticwebapp.config.json`** (Azure, applies to the deployed site):
  - `routes`: **301 redirects** from the old space-containing blog URLs to the new kebab slugs. Keep these when changing slugs.
  - `navigationFallback`: rewrites unknown paths to `/index.html` (SPA fallback), excluding image/css/js.
  - `globalHeaders`: **Content-Security-Policy** = `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';` plus `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

---

## 13. Current UI/UX state & known issues (refactor targets)

These are observations to inform the redesign, not bugs blocking the build:

1. **Inconsistent page framing.** Home uses an animated rainbow gradient; blog index uses a static gray gradient; posts have no gradient. Content widths differ (`max-w-7xl` vs `max-w-2xl`). Unify the visual language.
2. **The animated rainbow gradient** (`.parallax-gradient`) is loud and reads more "personal/playful" than "senior engineer." Consider a calmer, more professional treatment.
3. **Header is sparse.** Logo + two links with a large empty gap; no wordmark, no path to an About/Resume/Projects destination.
4. **Headshot gray-disc flash.** `profile.jpeg` is unoptimized with a gray placeholder background and no `priority`/blur — it pops in after a beat. Add `priority`, a blur placeholder, or preload.
5. **No dark-mode control.** Theme is OS-driven only; users can't toggle, and it can't be previewed intentionally.
6. **Long line lengths** on desktop: home/blog cards are `max-w-7xl`, so bio and excerpts run very wide. Consider a reading-width constraint.
7. **Dead/legacy files:** `styles/Home.module.css`, unused stock SVGs in `public/`, and `drafts/` are not referenced by the UI.
8. **Component/import inconsistency:** `Navbar` uses `next/legacy/image` while everything else uses `next/image`.
9. **Raw date strings** (`2025-05-09`) shown to readers; consider human-friendly formatting.
10. **Blog post code blocks** go through `remark-html` without a syntax-highlighting step (no Prism/Shiki) — code renders unstyled.

---

## 14. Constraints a UI refactor MUST preserve

1. **Static export only.** No server components, no API routes, no runtime data fetching — everything resolves at build (`getStaticProps`/`getStaticPaths`). Keep `output: "export"` working.
2. **Slugs = post filenames** (kebab-case). Don't change `/blog/<slug>` URLs without updating the **301 redirects** in `staticwebapp.config.json`. Never produce `%20` URLs.
3. **Blog frontmatter contract** (`types/blog.ts` + `utils/blog.ts`): keep field names/semantics, especially `status: "draft"` (hides posts) and the `image`/`coverImage` distinction.
4. **Content Security Policy** in `staticwebapp.config.json` is `default-src 'self'`. Any external font, CDN, script, or style will be **blocked** unless you self-host it or update the CSP. Prefer self-hosted/inline assets (as the current Inter-via-next/font setup does).
5. **Dark mode:** every component currently ships `dark:` variants — preserve dark support across any new/changed markup.
6. **SEO/social:** keep `Seo.tsx` meta, Open Graph, Twitter cards, canonical URLs, and JSON-LD on every page. Don't regress `<title>`/OG image behavior.
7. **Images unoptimized** (static export requirement): keep `images.unoptimized`, or use plain `<img>`; don't assume the Next image optimizer is available.
8. **Global shell:** `Footer` and `GoogleAnalytics` come from `_app`; `Navbar` is per-page. Keep GA and the footer on every route.
9. **Deploy trigger:** pushing to `main` deploys to production immediately. There is no staging branch.
```
