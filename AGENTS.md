# Project Guidelines & Rules

## Version Control & Git
- **STRICT PROHIBITION ON `git push`**: NEVER execute `git push` under any circumstances unless the user explicitly and directly instructs to push to remote. All commits and changes must strictly remain local to this machine.
- Avoid running intrusive or unsandboxed commands that prompt for user permission unless specifically requested by the user.

## Design & UI System
- **Glass UI**: Preserve a distinctive glass appearance with translucent surfaces, background blur, fine edge highlights, and tactile iPhone-inspired buttons. Use a sliding moon/sun toggle for the theme control. Keep mobile controls and content comfortably responsive.
- **Two-Sided Layout**: Maintain the balanced dual-rail layout on desktop (`Sidebar` on the left, `RightDock` on the right, content centered between them).
- **Color Consistency**:
  - **Light Mode**: Editorial off-white canvas (`#fdfdfc`), crisp borders (`#e4e4e7`), and Forest Green accent (`#15803d`).
  - **Dark Mode**: Obsidian canvas (`#0B0A0A`), elevated cards (`#121215`), and vibrant Technical Emerald accent (`#22c55e`).
  - Ensure all tokens and variables remain unified across components.

## Preserve Project Context
- Before changing UI, read this file and `docs/ARCHITECTURE.md`. For a new design area, inspect the current component, its data in `src/data/portfolioData.js`, and all relevant styles before editing. Do not infer the current design from screenshots, generated design-system files, or old CSS alone.
- Treat this file and the live tokens in `src/styles/theme.css` as the design authority. `design-system/portfolio/MASTER.md` is historical and may be stale; check `docs/ARCHITECTURE.md` for the precedence rules.
- Keep the established identity: rounded translucent glass with visible background bleed, a fine edge highlight, restrained blur and shadow, vibrant section colors coordinated with the emerald brand, neutral readable text, and green primary actions. Use colorful marks selectively. Avoid heavy 3D extrusion, generic opaque dashboards, and loud glow on every control.
- Navigation must read as glass rather than flat opaque cards: use translucent theme-aware fills, backdrop blur/saturation, a clear upper rim, and soft ambient shadow. Primary actions use a bright emerald gradient with restrained domed and pressed depth; supporting actions may use cool cyan glass. Keep strong dimensional styling on key actions, not every button.
- Preserve layout responsibilities: desktop section links stay in the left rail, utility actions stay in the right dock, and the centered page stays between them. Mobile uses a top bar, a four-item bottom navigation, and the full section menu. Check safe areas and ensure fixed controls do not cover content.
- Use semantic theme variables from `src/styles/theme.css`; avoid introducing a second token set or hardcoded theme colors where a token fits. Before adding a CSS override, search `src/index.css` and `src/styles/` because legacy and refinement selectors overlap. Prefer scoped rules in the owning stylesheet.
- Keep Lucide for interface controls and use the local brand SVGs under `public/tech/` for technology logos. Preserve logo artwork and its attribution/license. Use text when a correct mark is unavailable; never assign a neighboring technology's logo.
- Keep content facts in `src/data/portfolioData.js` and render them from there rather than duplicating facts in JSX. If changing `Skills.jsx`, preserve its category relationship with `skillsData` or make the mapping explicit. Update the project selection list in `ProjectsShowcase.jsx` when featured projects change.
- Keep the portfolio guide described as a scripted guide unless its implementation becomes a real remote AI service. Render visitor-provided text safely. Keep contact messaging honest: the form prepares a `mailto:` draft and cannot report that a message was sent.
- Keep science graphics clearly labeled as illustrative models unless they calculate and validate scientific results. Lazy load the Three.js lab; pause work when offscreen where practical, honor reduced motion, and dispose observers, timers, animation frames, and WebGL resources.
- For dialogs and interactions, support keyboard use, visible focus, Escape where appropriate, focus return, and touch targets of at least 44px. Respect `prefers-reduced-motion`.
- When changing section order, navigation, URL behavior, content schema, theme tokens, assets, or major interactions, update `docs/ARCHITECTURE.md` and `README.md` in the same change. Keep these notes concise and describe the implementation that actually exists.
- After UI changes, run `npm run build` and `npm run lint`, then inspect both themes at phone, tablet, and desktop sizes when browser tooling is available. Report existing warnings separately from regressions.
