# Dhrubo’s portfolio

React 19 and Vite portfolio for Abdur Rahman Dhrubo, featuring software projects, engineering experience, scientific computing, services, and contact options. Responsive light and dark themes, glass surfaces, desktop dual rails, and an interactive science lab shape the experience.

## Get started

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
```

Vite prints the local URL. Other commands:

```sh
npm run build    # Create dist/
npm run preview  # Serve the production build locally
npm run lint     # Run Oxlint
```

## Project map

- `src/App.jsx` owns theme, current view, overlays, and page-level navigation state.
- `src/components/` contains page sections and interactions.
- `src/components/navigation/` contains desktop/mobile navigation and its shared navigation map.
- `src/components/ui/` contains shared controls, cards, brand icons, and accessible dialog behavior.
- `src/data/portfolioData.js` is the source for biography, projects, skills, experience, education, services, and events.
- `src/styles/` contains tokens and component/art-direction CSS; `src/index.css` has base and legacy styles.
- `public/` contains static imagery. `public/tech/` holds local Devicon SVGs with attribution and license.
- [Architecture and UI guide](docs/ARCHITECTURE.md) documents design, interactions, routing, and the change workflow.

## Important behavior

- The Approach section includes an illustrative mixing animation with Mix and Pause controls, offscreen pausing, and reduced-motion support. Space Grotesk headings and DM Sans body text (self-hosted) use shared section alignment. Metrics use glass tiles.

- The hero is a single glass stage: headline, intro, actions, and technology links on the left; a framed portrait with a glass name chip on the right. When the centre column is narrow, the portrait collapses into a compact profile row. A custom connected-D SVG mark appears in navigation and the browser tab; the full-resolution mark is in `public/brand/`.

- Desktop navigation uses a spacious centered glass section rail (260–304px) and a separate utility dock. Services use translucent visual cards with short summaries and direct contact links.

- Selected projects use framed previews and logo-only stack rows with accessible names and hover/focus labels. “Explore the build” opens the full stack and details, including technologies without local logos.

- Theme preference is stored as `portfolio-theme`; `index.html` applies it before React starts.
- One visible theme switch: right utility dock on desktop, top bar on mobile. Experience uses a quiet timeline with expandable contributions and separate education/events views.
- `#all-projects` opens the project archive. Other section hashes navigate the home view.
- Search: `Ctrl/Cmd+K`. Portfolio guide: `Ctrl/Cmd+J`.
- The Three.js lab loads near the viewport rather than in the initial page bundle.
- The lazy science lab uses a decorative SVG flask reaction with reduced-motion support; archive and guide use text loading states. Loading never adds an artificial delay.
- Public branding uses AR Dhrubo — Product Builder, with software engineering as the foundation. The hero uses local technology logos in glass tiles; Experience opens on Engineering, with research accessible through filters.
- Contact combines a direct-email profile and email draft composer in one glass panel. Extra social links expand under “Elsewhere online”; the form never sends a message itself.
- Primary actions use deep emerald; supporting actions use glass, with section accents shared with navigation.
- Contact prepares a `mailto:` draft; there is no form backend.

Read [AGENTS.md](AGENTS.md) before UI work. It is the current design authority. The generated [design-system master](design-system/portfolio/MASTER.md) predates the current palette; the architecture guide explains precedence.
