# BOGOODSKI.com - Modern Personal Hub

This repository houses the modern iteration of my personal digital hub, rebuilt from a legacy static site into a highly observable, secure, and blazing-fast Astro web application. 

## Architectural Philosophy: The Symbiotic AI Workflow

This project is a demonstration of modern AI-assisted software engineering. Rather than treating AI as a glorified autocomplete, this site was built using a **symbiotic orchestration model**:
*   **Strategic Architect (Gemini):** Utilized for high-level system design, framework selection, AI observability structuring (JSON-LD, `llms.txt`), and security auditing.
*   **Local Executor (Claude Code):** Embedded directly in the VS Code terminal with full filesystem access to execute scaffolding, refactoring, and CSS Grid implementations based on precise architectural prompts.
*   **Human Orchestrator (Me):** Guiding the aesthetic vision, enforcing security boundaries, defining the routing logic, and validating the final integrations.

By separating the architectural reasoning from the code execution, I maintain total confidence in the structural integrity, security, and performance of the build.

## Tech Stack
*   **Framework:** Astro (Static-first, Zero-JS by default)
*   **UI Components:** React (Hydrated strictly via Astro Islands)
*   **Styling:** Tailwind CSS v4 (Bento Box CSS Grid architecture)
*   **Deployment:** Netlify 

## Security & Observability Hardening
Before a single component was pushed to production, strict defensive measures were integrated:
1.  **EXIF Data Sanitization:** Automated stripping of GPS metadata from all legacy repository images to prevent physical security exposures.
2.  **Strict Content Security Policy (CSP):** Configured at the CDN edge via `netlify.toml` to block unauthorized framing, enforce HSTS, and strictly control script execution boundaries, explicitly permitting only necessary React hydration and designated analytics.
3.  **LLM Optimization:** Integration of semantic HTML, JSON-LD schema (`Person`, `WebSite`), and a root `llms.txt` file to feed structured, accurate entity data directly to AI crawlers and knowledge graphs.

## Historical Archive
The previous iteration of this site (circa 2023) was an early experiment in prompt engineering using pure vanilla JS/HTML. The original README documenting those early prompting techniques has been preserved for historical context at [README_ARCHIVE_2023.md](./README_ARCHIVE_2023.md).
