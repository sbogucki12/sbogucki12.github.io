# Code Walkthrough: Architecture & Quirks

## Zero-JS Architecture & Vanilla Enhancements
Astro renders every page to plain HTML at build time. When a user visits the site, they download a lightweight, raw HTML document. No JavaScript is sent unless a page explicitly asks for it.

The site originally used a React **Astro Island** (the `ItineraryViewer` component, hydrated with `client:visible`) on the Valle de Guadalupe page. We removed React from this build completely. Instead of shipping a framework runtime for a few interactions, the interactive pieces are small vanilla JavaScript `<script>` blocks that live directly in the Astro templates. Astro bundles each one into a tiny module that runs only on the page that uses it:
*   **Reading progress UI** (`src/components/story/StoryProgress.astro`): a top progress bar driven by a `requestAnimationFrame`-throttled scroll listener, a countdown pill estimated at 230 wpm, and a desktop chapter rail that tracks the current chapter with an `IntersectionObserver`. Smooth scrolling and transitions are disabled under `prefers-reduced-motion`.
*   **Lightbox** (`src/components/story/StoryLightbox.astro`): a single native `<dialog>` opened with `showModal()`, which provides focus containment, Escape to close, and focus return to the clicked photo without any library.

## UX Architecture: Hover State Isolation
When converting the DJ and Endurance Bento cards into 'mini-hubs' with multiple links, we decoupled the container aesthetics from the interactive states.
*   **The Container:** Retains the static aesthetic styling (glow, gradient, border sheen) but does *not* lift or translate.
*   **The Children (Buttons):** Each distinct link inside the container receives its own micro-interaction and `target='_blank'` tags.
This ensures the Bento Grid feels alive while maintaining precise, expected click-targets.

## Astro Template Whitespace Quirk
This is a consistent `.astro` template rendering rule, not an occasional glitch: whenever an element or component (like an `<a>` tag or `<StoryLink>`) starts on a new line, Astro's compiler drops the whitespace before it. Text on the previous line runs straight into the link (e.g., 'here it is:Our full itinerary').
**Solution:** When a line starts with a tag that follows text, put an explicit space in front of it with `{' '}`, or keep the preceding word and the tag on the same line.
