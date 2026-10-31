# bogoodski.com

> **Looking for the original 2023 build log?** See [README_ARCHIVE_2023.md](README_ARCHIVE_2023.md). It holds the day-by-day ChatGPT prompting log used to build the first version of this site: the prompts, screenshots, and notes from that AI-assisted development experiment.

Personal site of BOGOODSKI, rebuilt with [Astro](https://astro.build), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com).

## Project structure

```
/
├── public/
│   ├── CNAME              # custom domain (bogoodski.com)
│   ├── maui.html          # Maui 2023 story, still served at /maui.html
│   ├── maui.css
│   ├── maui.js
│   ├── favicon.*, site.webmanifest, ...
│   └── legacy/            # original 2023 site, served at /legacy/
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       └── media/         # images and video (also used by maui.html)
├── src/
│   ├── pages/             # each .astro/.md file here becomes a route
│   └── styles/global.css  # Tailwind entry point
├── astro.config.mjs
└── package.json
```

Anything in `public/` is copied to the build output unchanged.

## Commands

Run from the project root:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |
| `npm run astro …` | Run Astro CLI commands (`astro add`, `astro check`) |

Requires Node.js 22 or later (see `engines` in `package.json`).

## Deploying to Netlify

Astro builds a fully static site by default, so no adapter is needed.

### Option 1: Netlify UI (Git-based)

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select the repo.
3. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Site configuration → Environment variables**, optionally set `NODE_VERSION` to `22` (or later).
5. Deploy. Every push to `main` triggers a new build; pull requests get deploy previews.

### Option 2: `netlify.toml`

Commit a `netlify.toml` at the project root to keep the settings in code:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

### Option 3: Netlify CLI

```sh
npm install -g netlify-cli
netlify login
netlify init          # link or create the site
npm run build
netlify deploy --prod --dir=dist
```

### Custom domain

In Netlify, go to **Domain management → Add a domain** and enter `bogoodski.com`, then update DNS at your registrar as Netlify instructs (or move DNS to Netlify). Netlify provisions HTTPS automatically.

`public/CNAME` is only read by GitHub Pages; Netlify ignores it. It's kept so the site can still deploy to GitHub Pages if needed.

### Server-side features (optional)

If you later add on-demand rendering (API routes, server islands, SSR pages), add the Netlify adapter:

```sh
npx astro add netlify
```
