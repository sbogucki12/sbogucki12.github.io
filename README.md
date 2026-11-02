# BOGOODSKI.com - Modern Personal Hub

This repository houses the modern iteration of my personal digital hub, rebuilt from a legacy static site into a highly observable, secure, and blazing-fast Astro web application. 

## Architectural Philosophy: The Symbiotic AI Workflow
This project is a demonstration of modern AI-assisted software engineering. Rather than treating AI as a glorified autocomplete, this site was built using a **symbiotic orchestration model**:
*   **Strategic Architect (Gemini):** Utilized for high-level system design, framework selection, AI observability structuring (JSON-LD, `llms.txt`), UX/UI behavioral logic, and security auditing.
*   **Local Executor (Claude Code):** Embedded directly in the VS Code terminal with full filesystem access to execute scaffolding, refactoring, and CSS Grid implementations based on precise architectural prompts.
*   **Human Orchestrator (Me):** Guiding the aesthetic vision, enforcing security boundaries, defining the routing logic, and validating the final integrations. Crucially, this workflow does not eliminate the need for engineering experience or deep focus. While AI served as the muscle for scaffolding and execution, orchestrating this architecture, debugging framework edge-cases (like compiler whitespace quirks), and crafting the authentic Valle de Guadalupe narrative (which required over 90 minutes of dedicated human writing) demanded significant hands-on effort and domain knowledge.

By separating the architectural reasoning from the code execution, I maintain total confidence in the structural integrity, security, and performance of the build.

## Tech Stack
*   **Framework:** Astro (Static-first, Zero-JS by default)
*   **UI Components:** Vanilla JavaScript (Zero React footprint)
*   **Styling:** Tailwind CSS v4 (Bento Box CSS Grid architecture)
*   **Deployment:** Netlify 

## Security & Observability Hardening
Before a single component was pushed to production, strict defensive measures were integrated:
1.  **EXIF Data Sanitization:** EXIF, GPS, and camera metadata is stripped at both layers: the source image files committed to the repository (including legacy images) are scrubbed losslessly, and Astro's image pipeline (Sharp) emits metadata-free optimized images at build time. This prevents physical security exposures from either the repo or the live site.
2.  **Strict Content Security Policy (CSP):** Configured at the CDN edge via `netlify.toml` to block unauthorized framing, enforce HSTS, and strictly control script execution boundaries, explicitly permitting only the site's necessary vanilla scripts and designated analytics (GA4).
3.  **LLM Optimization:** Integration of semantic HTML, JSON-LD schema (`Person`, `WebSite`), and a root `llms.txt` file to feed structured, accurate entity data directly to AI crawlers and knowledge graphs.
