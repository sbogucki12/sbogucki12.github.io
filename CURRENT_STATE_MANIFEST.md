# CURRENT_STATE_MANIFEST — bogoodski.com

> Snapshot of the live repository `sbogucki12/sbogucki12.github.io` (branch `main`, 66 commits, first commit 2023-07-31, latest 2026-05-26) taken 2026-10-30. Written as input for an Astro-based modernization plan. No source files were modified to produce this document.

---

## 1. Directory Tree

```
sbogucki12.github.io/
├── .gitignore                    # empty (0 bytes)
├── CNAME                         # "bogoodski.com" (custom domain for GitHub Pages)
├── README.md                     # project log / AI-prompting journal (see §4)
├── about.txt                     # favicon font attribution (Source Code Pro, SIL OFL)
├── site.webmanifest              # PWA manifest (name/short_name empty, white theme)
│
├── index.html                    # Page 1: home / portfolio (single-page, modal-driven)
├── styles.css                    # styles for index.html (~12 KB)
├── script.js                     # behavior for index.html (~6 KB)
│
├── maui.html                     # Page 2: long-form "Maui, 2023" story (~39 KB)
├── maui.css                      # styles for maui.html (~9 KB)
├── maui.js                       # progressive-reveal logic for maui.html
│
├── BOGOODSKI.png                 # header logo
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
│
├── text-to-html.ipynb            # authoring helper: converts plain-text story → HTML (used for Maui page)
│
└── media/
    ├── images/                   # ~45 personal photos (gallery carousel source) + section images
    │   ├── 11.png, running.png, interview1-3.png, steve_roux.jpg, stevejoshuatree.jpg, ...
    │   ├── IMG_2021xxxx…, IMG_2022xxxx…, IMG_2023xxxx… (.jpg / .JPEG / .webp)
    │   ├── PXL_2022xxxx…, PXL_2023xxxx… (Pixel phone originals, 1.9–5.8 MB each)
    │   ├── Screenshot_… (.jpg / .png)
    │   ├── name-extractor.ipynb  # helper notebook (uses `os`; lists image filenames) — misplaced in media/
    │   ├── maui/                 # 38 assets for maui.html
    │   │   ├── *.jpg / *.png     # photos, maps, charts (some 2–3.6 MB)
    │   │   ├── evacuation-video.mp4      # 86.6 MB
    │   │   ├── maui-rental-video.mp4     # 68.1 MB
    │   │   └── shopping-line-video.mp4   # 12.5 MB
    │   └── websites/             # 6 thumbnails for the "little websites" section
    │       ├── 2doapp_thumb.jpg, bogoodski2019_thumb.jpg, bogoodski2020_thumb.jpg
    │       └── corregidortech_thumb.jpg, dailyrun_thumb.jpg, djbogoodski_thumb.jpg
    └── readme/                   # 30 screenshots/GIFs/MP4 used ONLY by README.md
        └── (prompt screenshots, feature GIFs, Canva banner, certificate, etc.)
```

**Size note:** the git pack is ~248 MB. Three MP4s total ~167 MB; many photos are unoptimized phone originals. No Git LFS is configured.

---

## 2. Core Technologies

| Layer | Current state |
|---|---|
| Markup | Hand-written static HTML5, two standalone pages, no templating, no shared partials (head/analytics duplicated in both files). |
| Styling | Plain CSS, one stylesheet per page. No preprocessor, no CSS variables, no framework. Breakpoints: `max-width: 768px` (home); `768px / 769–1024px / ≥1025px` (Maui). Neon/fluorescent visual theme, `@keyframes fadein`. |
| Scripting | Vanilla ES5 JavaScript (`var`, `onclick` assignment), loaded with `defer`. No modules, no bundler, no npm, no `package.json`. |
| Fonts | Google Fonts — **Dosis 300** (home), **Roboto** (Maui); system fallbacks Arial and Impact. |
| Icons | Font Awesome via kit script (`kit.fontawesome.com/8db165ecfc.js`) — brands, solid, regular sets. |
| Analytics | Google Analytics 4 via gtag.js, ID `G-EVKCT4JXLS` (on both pages). |
| Embeds | YouTube iframe (`mAogBvaMcHU`) on home; native `<video>` with self-hosted MP4s on Maui. |
| Hosting | GitHub Pages (user site repo `sbogucki12.github.io`), served at custom domain `bogoodski.com` via `CNAME`. No build step, no CI/workflows, no Jekyll config. |
| Local dev | `python -m http.server` (per README). |
| Authoring tooling | Two Jupyter notebooks (Python): `text-to-html.ipynb` (prose → HTML for Maui story), `name-extractor.ipynb` (image filename listing, likely used to build the gallery array). |
| Code origin | Generated primarily via ChatGPT (see §4). |

### Page inventory & features

**`index.html`** (home)
- Header: logo + nav of 10 items (LinkedIn, GitHub, Resume*, 𝕏/Twitter, Run Log, Instagram, Medium, Gallery*, Maui 2023, SoundCloud). *= opens a modal instead of navigating.
- Sections: YouTube video, objective/bio, interview images (click → full-screen modal), running section (image + Daily Run / Strava links), "little websites I've created" thumbnail grid (6 external Azure/other sites), footer (© 2023).
- Three hidden modals: `#interview-modal`, `#gallery-modal` (shuffled photo carousel, 42 images hard-coded in `script.js`), `#resume-modal` (6-slide content carousel: Web Dev, Management, Data Science, Security & Compliance, Communications, Education — resume content is hard-coded HTML).

**`maui.html`** (story)
- Long-form article split into 6 `<section class="reveal-section">` blocks; all but the first are `.hidden`.
- "More" button (`#revealButton`) reveals the next section; after the last one it is replaced by a Home button (`#homeButton` → `window.location.href = '/'`).
- ~35 images and 3 videos, inline `style` attributes in places.

### Known defects / tech debt (relevant to migration)
1. **`window.onclick` is assigned twice** in `script.js` (lines 32 and 165); the second overwrites the first, so click-outside-to-close no longer works for the gallery and resume modals — only for the interview modal.
2. **Analytics script sits between `</head>` and `<body>`** (invalid placement) on both pages.
3. **Invalid nav markup:** `<a>`/`<div>` elements wrap `<li>` directly inside `<ul>`; stray `</a>` inside `#gallery-button`.
4. **Backslash path:** `src="media\images\running.png"` (works on most servers by luck; non-portable).
5. **Absolute self-link:** nav uses `https://bogoodski.com/maui.html` rather than a relative path.
6. **Fragile selectors:** gallery carousel binds to the *first* `.carousel-button-previous/next` in the document via `querySelector`, relying on DOM order.
7. **Stale content:** resume still says Cornell ML certificate "ETA Aug 2023" while the bio says "Graduate"; footer © 2023.
8. **Accessibility:** modal triggers are non-focusable `<div>`s; no focus trapping, no Esc handling, `alt` attributes on `<button>`/`<video>` (not valid), generic image alt text.
9. **Asset weight:** no responsive images, no lazy loading, no compression; MP4s committed directly to git.
10. **`site.webmanifest`** has empty `name`/`short_name`.

---

## 3. Routing Analysis

There is **no router** — routing is purely **file-based static hosting by GitHub Pages**.

| URL | Served file | How reached |
|---|---|---|
| `/` (and `/index.html`) | `index.html` | Domain root |
| `/maui.html` | `maui.html` | Nav link (absolute URL `https://bogoodski.com/maui.html`) |
| `/media/...`, `/styles.css`, etc. | literal files | Direct asset paths |

- **Domain:** `CNAME` → `bogoodski.com`; GitHub also serves `sbogucki12.github.io`. Git history shows the CNAME file being repeatedly deleted/re-created (≈15 commits), suggesting past custom-domain instability.
- **No clean URLs:** the Maui page is only reachable with the `.html` extension. Any Astro migration that emits `/maui/index.html` must keep `/maui.html` working (redirect or `build.format: 'file'`) to avoid breaking existing links.
- **"Virtual routes" via modals:** Resume and Gallery are not URLs; they are hidden `<div>`s toggled by JS (`style.display = "block"`). They are not deep-linkable, not indexable, and have no history/back-button support. These are prime candidates to become real routes (e.g. `/resume`, `/gallery`) in Astro.
- **Intra-page "pagination":** the Maui story's "More" button is client-side progressive disclosure, not routing. Back navigation returns to the home page via `window.location.href = '/'`.
- **No 404 page** (`404.html` absent → GitHub's default 404).
- **No sitemap, robots.txt, canonical tags, meta description, or Open Graph tags.**
- All other navigation is outbound to external sites (`target="_blank" rel="noopener noreferrer"`).

---

## 4. README.md Summary

**Title:** "BOGOODSKI-AI Portfolio Website."
**Stated objective:** use generative AI — primarily **ChatGPT** — to generate an entire portfolio website, as an experiment in AI-assisted web development. The README links the full shared ChatGPT conversation that "developed" the site (`chat.openai.com/share/c6599edc-…`). Credits note ChatGPT also drafted the README itself.

**Structure:** a dated development log ("Day 0" → "Day 7"), a Features list, a Development Process section, Deployment (GitHub Pages), and Future Enhancements (*blog section*, *contact form "to challenge the AI"*).

### Development timeline
| Day | Date | Feature added |
|---|---|---|
| 0 | 2023-07-31 | Basic scaffolding and styling |
| 1 | 2023-08-01 | Responsive layout, modal + image carousel |
| 2 | 2023-08-02 | Resume modal/carousel (from LinkedIn text), favicon |
| 3 | 2023-08-03 | Embedded YouTube video section with neon styling |
| 4 | 2023-08-04 | Interview-images section with full-screen modal |
| 5 | 2023-08-16 | Maui 2023 story page (hand-written narrative) |
| 6 | 2023-09-16 | Neon "run" section with Run Log / Strava links |
| 7 | 2023-09-24 | "Little websites" thumbnail section |

### Historical prompting techniques documented
The README is primarily evidence of a 2023-era **conversational, iterative ChatGPT workflow**. The prompts themselves exist only as **screenshots** in `media/readme/` (not as text), so their exact wording is not machine-readable from the repo. Techniques evident from the README:

1. **Single long-running conversation as the "codebase memory."** The whole site was built in one shared ChatGPT thread; context carried across days rather than through files.
2. **Initial requirements prompt → scaffold.** Day 0 began with an "Initial Prompt" outlining objectives and requirements (`initial-prompt.jpg`), followed by AI-generated HTML/CSS scaffolding (`initial-scaffold.jpg`).
3. **Incremental feature-by-feature prompts.** Each day = one prompt describing a single feature (carousel, resume, video, interview modal, run section, websites section), with screenshots for each (`carousel-prompt.jpg`, `resume-prompt.jpg`, `video-prompt.jpg`, `interview-images-prompt.jpg`, `websites_section_prompt.jpg`, `modal-prompt.jpg`).
4. **Highly descriptive visual/style specification in natural language.** E.g. the video prompt specified centering on desktop and mobile, a fluorescent border, a contrasting neon drop shadow, a reduced-opacity neon caption aligned right, and a mobile font size that keeps it on one line. The "futuristic neon theme" for the run section was also prompt-driven. The README links a "ChatGPT-style objective" (`chatgpt-style-objective.jpg`) showing a style brief.
5. **Content transformation prompts.** Resume content was produced by pasting **raw LinkedIn profile text** and asking ChatGPT to structure and style it into the carousel (`resume-prompt.jpg` → `resume-response.jpg`).
6. **Refinement / update prompts.** Separate follow-ups modify existing features (`update-carousel-prompt.jpg`), and per-file output was requested and pasted in (`modal-html.jpg`, `modal-css.jpg`, `modal-js.jpg`).
7. **Integration of third-party tooling via prompting.** ChatGPT was asked to integrate Font Awesome icons (`font-awesome.jpg`); the favicon came from an external generator (`favicon-generator.jpg`).
8. **AI-written documentation.** The README itself was drafted/formatted by ChatGPT (`readme-prompt.jpg`).
9. **Human-authored exception.** The Maui story (Day 5) is explicitly personal writing, converted to HTML with the `text-to-html.ipynb` notebook rather than generated.

*Editor's note in the README:* "AI has been instrumental in every update. Lol."

**README inaccuracies to be aware of:** it says the site is "deployed at https://sbogucki12.github.io/" (now fronted by `bogoodski.com`), and the README's media folder (~13 MB of screenshots/GIFs) is shipped as part of the public site.

---

## 5. External Assets, Scripts & Dependencies in `<head>` of `index.html`

In source order (lines 4–27 of `index.html`):

| # | Element | Source | Type | Notes |
|---|---|---|---|---|
| 1 | `<meta charset="UTF-8">` | — | meta | |
| 2 | `<meta name="viewport" …>` | — | meta | `width=device-width, initial-scale=1.0` |
| 3 | `<title>` | — | meta | "Bogoodski" |
| 4 | `<link rel="stylesheet" href="styles.css">` | local | CSS | |
| 5 | `<script src="script.js" defer>` | local | JS | |
| 6 | `<script src="https://kit.fontawesome.com/8db165ecfc.js" crossorigin="anonymous">` | **Font Awesome Kit (CDN)** | JS (render-blocking, no `defer`/`async`) | Kit ID `8db165ecfc` is tied to the owner's Font Awesome account. |
| 7 | `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` | local | icon | 180×180 |
| 8 | `<link rel="icon" … href="/favicon-32x32.png">` | local | icon | |
| 9 | `<link rel="icon" … href="/favicon-16x16.png">` | local | icon | |
| 10 | `<link rel="manifest" href="/site.webmanifest">` | local | PWA manifest | references android-chrome 192/512 PNGs |
| 11 | `<link rel="preconnect" href="https://fonts.googleapis.com">` | **Google Fonts** | preconnect | |
| 12 | `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` | **Google Fonts** | preconnect | |
| 13 | `<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap" rel="stylesheet">` | **Google Fonts** | CSS | Dosis, weight 300 only |
| 14* | `<script async src="https://www.googletagmanager.com/gtag/js?id=G-EVKCT4JXLS">` | **Google Analytics 4 (gtag.js)** | JS | *Placed after `</head>`, before `<body>` (invalid position; browsers hoist it). |
| 15* | Inline `<script>` — `dataLayer` init + `gtag('config','G-EVKCT4JXLS')` | inline | JS | *Same misplacement. No consent banner. |

**Not in `<head>` but external dependencies loaded by the body:**
- YouTube embed iframe: `https://www.youtube.com/embed/mAogBvaMcHU` (no `loading="lazy"`, not privacy-enhanced `youtube-nocookie.com`).
- Outbound links: LinkedIn, GitHub, X/Twitter, dailyrun.net, Instagram, Medium, SoundCloud, Strava, and five `*.azurewebsites.net` / `2do.azurewebsites.net` (HTTP) project sites.

**For comparison — `maui.html` `<head>`:** same pattern, but loads `maui.css`, `maui.js`, Font Awesome kit, Google Fonts **Roboto** (instead of Dosis), and the same misplaced GA4 snippet. It has **no favicon or manifest links**.

---

## 6. Migration-Relevant Observations (for the Astro architect)

- **Two pages, zero shared layout** → natural fit for a single Astro `BaseLayout.astro` holding head, fonts, icons, and analytics.
- **Data that is currently hard-coded and should become content/data files:** gallery image list (42 paths in `script.js`), resume (6 sections of HTML), nav links (10), "little websites" (6 entries), interview images (3). Candidates for Astro Content Collections or JSON/YAML data.
- **Maui story** is long-form prose with embedded media → good candidate for MDX in a content collection, with the 6 reveal sections preserved as components or replaced by native scroll.
- **Images** → `astro:assets` / `<Image>` would address the multi-MB originals; **videos** should probably move off-repo (YouTube/Cloudflare Stream/object storage) given ~167 MB of MP4s.
- **Font Awesome kit** could be replaced by a tree-shaken icon set (e.g. `astro-icon`) to drop a render-blocking third-party script.
- **Interactivity is small** (three modals, two carousels, one reveal button) → can be Astro islands or plain `<script>` tags; no framework runtime is required.
- **URL preservation:** keep `/maui.html` resolvable; keep `CNAME` (Astro: place in `public/`); GitHub Pages deploy would move to a GitHub Actions workflow since a build step is introduced.
- **Repo hygiene:** `media/readme/` and the `.ipynb` helpers are not site content and should be excluded from the deployed output.
