# Code Walkthrough: Astro Islands vs. React SPAs

Since you recently built BOGOODSKI.dev as a Vite/React Single Page Application (SPA), it is crucial to understand why this personal site uses Astro, and how the underlying mechanics differ.

## The React SPA Model (Vite)
In a standard Vite/React app, the server sends a nearly empty HTML file containing a single `<div id="root"></div>` and a massive bundle of JavaScript. The browser must download, parse, and execute all that JavaScript just to render the text on the screen. 
*   **Pros:** Incredible for highly interactive, state-heavy applications (like dashboards or complex forms).
*   **Cons:** Slower initial load, heavy processing overhead, and search engines/AI crawlers have to work harder to read your content since it doesn't exist until the JS runs.

## The Astro Island Model (Partial Hydration)
Astro flips this completely. It renders your React components to pure HTML *on the server at build time*. When a user visits the site, they download a lightweight, raw HTML document. No JavaScript is sent by default.

When we needed the interactive PDF viewer (`<ItineraryViewer client:visible />`), we created an **Astro Island**. 

### How `client:visible` Works:
1.  Astro serves the static HTML for the whole page, including the HTML structure of your React button.
2.  The browser renders the page instantly. The button is visible but not yet "clickable" (it has no JS attached).
3.  An Intersection Observer watches the user's scrolling. 
4.  The exact millisecond the user scrolls the component into the viewport, Astro dynamically downloads *only* the specific React JavaScript needed for that one component.
5.  Astro "hydrates" the island, attaching the event listeners and React state, making it fully interactive.

**The Result:** You get the pristine SEO and raw speed of an old-school static HTML site, with the developer experience and dynamic state management of React, injected surgically only where necessary.