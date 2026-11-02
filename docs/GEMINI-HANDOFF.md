# Portfolio handoff for Gemini

Continue improving the existing portfolio. Keep it compact, glassy, responsive, and easy to scan. Work from the current files, not an earlier screenshot or an assumed redesign.

## Read first

- `AGENTS.md`: project rules and design authority.
- `src/styles/theme.css`: current theme tokens.
- `docs/ARCHITECTURE.md`: structure and component ownership. Some older passages conflict with the newer maintenance notes; verify against code.
- `README.md`: setup and recent behavior.
- `src/data/portfolioData.js`: portfolio facts, projects, experience, and process content.
- `git diff`: existing work in progress. Preserve it. These changes are local and uncommitted; nothing was pushed.

## What has been done

### Logo and hero

- Replaced the connected monogram with a custom angular D, shallow extrusion, emerald-to-teal shading, and a glass tile. Removed the earlier pale white/green face.
- Updated the matching SVG favicon in `public/brand/dhrubo-mark.svg`.
- Removed the green dot beside the portrait name. Availability still has its own status indicator.
- Changed hero technology links into compact, content-width glass chips with original local logos, readable labels, edge highlights, subtle raised depth, and hover/press feedback.
- Allowed mobile social buttons to wrap. Hero technology links now lead to Projects.

Files: `Logo.jsx`, `HeroBento.jsx`, `styles/logo.css`, `styles/hero.css`.

### Technology badges and experience

- Applied compact glass frames to project technology logos.
- Added local technology logos to Experience preview badges and expanded role details.
- Used exact logo mappings; methods and technologies without a matching asset remain text inside the same glass badge.
- Styled the Skills gallery similarly, then removed the separate Technical Stack section at the user's request. Its source and data remain available but are not mounted.
- Removed stack links from navigation, search, and footer. Legacy `#skills` links resolve to Projects through App handling.

Files: `Experience.jsx`, `styles/experience.css`, `App.jsx`, `navigation/navConfig.js`, `CommandPalette.jsx`, `Footer.jsx`. `Skills.jsx` and `styles/stack.css` are retained, unused gallery files.

### Section presentation

- Centered section introductions: labels, headings, and descriptions.
- Removed numeric section prefixes and decorative process/stack counters.
- Detailed card content remains left-aligned for reading. Do not assume the entire website should be centered.

Files: `styles/typography.css` and section components.

### How I work

- Replaced the unrelated mixing flask with four workflow illustrations: Design blueprint, Build page assembly, Automate branching pipeline, and Verify checklist.
- Removed the illustration's separate frame, grid background, caption bar, “in motion” text, and counter. It blends into the parent panel.
- **Below 768px:** all four cards appear in normal scroll order. An IntersectionObserver starts each finite entrance animation. Step navigation is hidden.
- **768px and wider:** only one card is visible. Hover, keyboard focus, or clicking a step selects its panel without scrolling the page.
- Reduced motion disables illustration animations. Observers, media-query listeners, scroll/resize listeners, and pending frames have cleanup.
- The former `ReactionScene.jsx` is no longer mounted here. The separate science lab remains.

Files: `Strategy.jsx`, `ui/WorkflowScene.jsx`, `styles/strategy.css`.

### Projects

- Reduced the home showcase from six large cards to three equal, compact cards: Brown’s Interior, Squicy UAP, and ScrapeAutomate.
- Removed the oversized featured-card treatment, browser-title bars, repeated subtitles, extra badge text, and large archive banner.
- Cards contain a preview, category, title, short description, up to three technology logos, live link, and Details button.
- Descriptions are limited to three visible lines; full content remains in the project drawer.
- Grid: three columns on wide screens, two at 640–1199px, one below 640px.
- A simple All projects button opens the archive. Other project records were not deleted.

Files: `ProjectsShowcase.jsx`, `styles/projects.css`.

## User preferences to preserve

- Compact surfaces and small logo chips, not oversized empty boxes.
- Visible glass material and restrained 3D depth, with labels readable before hover.
- Original technology artwork; do not recolor logos to manufacture a glass effect.
- Clear custom D; avoid returning to the pale white/green generic letter.
- Centered section introductions without section numbering.
- Workflow illustrations should relate to the work, not decorative chemistry mixing.
- Mobile can reveal the process through scrolling. Desktop should stay compact.
- Keep only a short project selection on the home page; use the archive for depth.
- Do not reintroduce the standalone Technical Stack section.

## Recommended next work, in order

1. **Reconcile documentation.** Older architecture text still says the first project spans the grid, hero badges link to Skills, and the workflow is scroll-driven everywhere. Rewrite those paragraphs around the current behavior rather than adding more conflicting notes.
2. **Review mobile density.** Four workflow cards can still make the phone page long. Reduce unnecessary gaps and illustration height while keeping each stage legible and visible through normal scrolling. Inspect 320px and short landscape screens before changing breakpoints.
3. **Polish the project layout.** At tablet widths, three projects produce a two-plus-one arrangement. Consider a compact third row or another balanced arrangement. Keep the current three-project scope and access to full details. Confirm truncation does not remove the useful distinction between projects.
4. **Fix search behavior.** `CommandPalette.jsx` suggests commands such as Contact, but nonempty queries filter projects only and hide section links. Include matching sections/actions in search results and verify keyboard selection.
5. **Improve cursor resilience.** `ui/CustomCursor.jsx` checks pointer/reduced-motion preferences only when mounted. Listen for preference changes and restore the native cursor when appropriate. Check window blur/re-entry and text-input behavior.
6. **Review responsive workflow transitions.** Resize across 767/768px, try every step using keyboard and touch, and inspect partially visible cards. React-controlled classes and observer-added `is-visible` classes deserve testing together. Avoid restarting animations unnecessarily or letting hover override a keyboard user's chosen state.
7. **Consolidate CSS carefully.** Legacy, refinement, studio, typography, and owning styles overlap. Remove verified dead selectors and duplicate material rules in small changes, preserving the current appearance. Unused Skills and ReactionScene sources may be cleaned up after confirming there are no imports or references.
8. **Review branding consistency.** The SVG favicon matches the new D. Apple touch and social-preview raster assets are older separate assets; assess them before claiming every branding surface matches.

These are proposed improvements, not claims that every item has been reproduced as a browser bug. Search filtering and cursor preference handling were identified in source review; wider interaction coverage remains useful.

## Implementation rules

- Never run `git push` without a direct user instruction. Do not reset or overwrite existing local edits.
- Preserve desktop left section rail, right utility dock, and centered content. Preserve mobile safe areas and navigation.
- Use the existing semantic tokens. Keep off-white/forest-green light mode and obsidian/emerald dark mode unless the user explicitly changes the overall palette.
- Keep content facts in `portfolioData.js`; do not invent metrics, credentials, client outcomes, or project claims.
- Keep Lucide for controls and local SVGs under `public/tech/` for brand marks. Preserve attribution and licenses.
- Preserve focus visibility, keyboard operation, Escape/focus return for dialogs, and at least 44px interactive targets.
- Respect reduced motion. Avoid scroll interception, forced scrolling, endless decorative motion, or additional heavy animation libraries for simple effects.
- Contact prepares a mailto draft; it does not send mail. The portfolio guide is scripted, not a remote AI service.
- Keep changes scoped to the component's owning stylesheet. Inspect the entire cascade before adding overrides.

## Validation and current limits

- Latest `npm run build` and `npm run lint` passed.
- An existing build warning remains: the lazy Three.js lab chunk is about 579 KB minified. This is separate from the initial page bundle and is not a new regression.
- Browser checks covered light/dark themes at 375px, 768px, and 1440px. No horizontal page overflow was found in those checks.
- Checked the compact three-card project layout and desktop selection of all four workflow stages. Earlier checks also covered scroll revelation and reduced-motion animation suppression.
- This is not a complete accessibility, cross-browser, performance, or external-link audit. Recheck interactions after changes, especially breakpoint transitions and project-drawer focus return.
- Temporary browser scripts and screenshots were written under `/tmp`; they are session artifacts, not maintained project tests, and may disappear.

For each improvement: inspect current code, make one coherent change, run build/lint, inspect both themes at phone/tablet/desktop widths, exercise the affected interactions, and report changes and any remaining limitations. Keep the page smaller and clearer as you refine it.
