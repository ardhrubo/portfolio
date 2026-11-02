# Opus Execution Plan: Portfolio Refinements & Quality Polish

This plan provides concrete, copy-pasteable instructions for Claude Opus to implement the improvements specified in `docs/GEMINI-HANDOFF.md`. Each step is self-contained with exact file targets, rationale, implementation specifications, and verification checks.

---

## ⚠️ Non-Negotiable Project Rules

1. **NO `git push`**: Never execute `git push` under any circumstances. Keep all changes local.
2. **Vanilla CSS & Scoped Styles**: Do not introduce Tailwind classes into vanilla CSS components or write arbitrary ad-hoc utility classes. Use scoped stylesheets (`src/styles/*.css`).
3. **Theme Tokens**: Use semantic tokens from `src/styles/theme.css` (`--background`, `--foreground`, `--glass-bg`, `--glass-border`, `--glass-highlight`, `--glass-shadow`, `--primary`, `--tint-bg`, `--tint-border`).
4. **Desktop & Mobile Layouts**:
   - Desktop (≥1024px): Left sidebar rail (navigation), center content rail, right dock (utilities).
   - Mobile (<1024px): Header bar, bottom dock (4 core tabs), slide-out navigation drawer.
5. **Quality Gates**: Every step must pass `npm run build` and `npm run lint` before moving to the next.

---

## Step 1: Reconcile Architecture Documentation

### Target File
- `docs/ARCHITECTURE.md`

### Objective
Update outdated passages that contradict the current code state (flagship showcase, workflow illustrations, and removed Technical Stack section).

### Changes to Apply
1. **Section Home Page Order (lines 38–45)**:
   - Update `ProjectsShowcase` entry: describe the compact 3-card equal showcase (`brownsinterior`, `squicyuap`, `scrapeautomate`) with drawer inspection, replacing the old "featured lead card spanning the grid" description.
   - Update `Strategy` entry: clarify that below 768px all four cards appear in scroll sequence with finite entrance animations, while at ≥768px it is a single-stage interactive panel with tab controls.
   - Remove references to `Skills` as an active home page section. Note that `#skills` automatically redirects to `#projects` in `App.jsx`.
2. **Projects Content Model (lines 58–61)**:
   - Remove "The first card spans the grid; 'Explore the build' opens the drawer".
   - Replace with: "Displays 3 curated flagship cards in an equal grid with preview, category, title, concise description, up to 3 technology marks, live link, and a Details drawer trigger."
3. **Technical Stack Model (lines 62–65)**:
   - Clarify that `Skills.jsx` and `src/styles/stack.css` are unmounted legacy gallery assets; technology presentation is now embedded directly in Project and Experience badges.
4. **Strategy Illustration (lines 42–46)**:
   - Replace the legacy mention of mixing/reaction flask with the 4 modern workflow stages: Design blueprint, Build page assembly, Automate branching pipeline, and Verify checklist.

### Verification
- Run `npm run build && npm run lint` to confirm no build issues.

---

## Step 2: Fix Command Palette Search Filtering

### Target File
- `src/components/CommandPalette.jsx`

### Objective
Currently, when `query !== ''`, `CommandPalette` only filters `projectsData` and completely hides quick actions and section navigation. Typing queries like "contact", "email", "github", "strategy", or "experience" yields "No projects found matching...".

### Implementation Details
1. Filter `sections` based on `query`:
   ```javascript
   const filteredSections = sections.filter(sec =>
     sec.name.toLowerCase().includes(query.toLowerCase()) ||
     sec.href.toLowerCase().includes(query.toLowerCase())
   );
   ```
2. Filter `quickActions` based on `query`:
   ```javascript
   const quickActions = [
     { id: 'copy-email', title: `Copy Email Address (${personalInfo.email})`, type: 'copy', icon: Copy, shortcut: 'Enter', keywords: ['email', 'contact', 'mail', 'write'] },
     { id: 'github', title: 'Open GitHub Profile (@ardhrubo)', type: 'external', href: personalInfo.socials.github, icon: Github, keywords: ['github', 'code', 'git', 'repo'] },
     { id: 'linkedin', title: 'Open LinkedIn Profile', type: 'external', href: personalInfo.socials.linkedin, icon: Linkedin, keywords: ['linkedin', 'social', 'career'] },
   ];

   const filteredActions = quickActions.filter(act =>
     act.title.toLowerCase().includes(query.toLowerCase()) ||
     act.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
   );
   ```
3. Update JSX rendering in `.cmd-results`:
   - When `query !== ''`, render:
     - Matching Actions (if any)
     - Matching Sections (if any)
     - Matching Projects (if any)
     - If all three lists are empty, render a single clean empty message: `No results found for "${query}"`.
4. Preserve keyboard navigation:
   - The modal `onKeyDown` queries `const items = [...event.currentTarget.querySelectorAll('.cmd-item')]`. By applying `.cmd-item` class to matching action, section, and project buttons, arrow key navigation and Enter selection automatically work across all result types!

### Verification
- Open search modal (`Ctrl+K` or search button in RightDock).
- Type "email" -> Verify "Copy Email Address" appears and can be activated via Enter.
- Type "contact" -> Verify "Get in Touch" navigation item appears.
- Type "React" -> Verify matching React projects appear.
- Empty query -> Verify default grouped view (Quick Actions, Jump to Section, Top Projects) displays as before.

---

## Step 3: Polish Project Showcase Tablet Grid Layout

### Target File
- `src/styles/projects.css`

### Objective
At tablet breakpoints (`640px` to `1199px`), the 3 flagship project cards are rendered in a 2-column grid (`repeat(2, minmax(0, 1fr))`), which leaves the 3rd card awkwardly alone on the second row spanning only half the container width.

### Implementation Details
In `src/styles/projects.css`:
1. For screen widths between `640px` and `1023px` (tablet portrait/landscape):
   - Allow the 3rd card to span 2 columns so the grid has a balanced 2-top, 1-bottom wide layout:
   ```css
   @media (min-width: 640px) and (max-width: 1023px) {
     #projects .flagship-grid {
       grid-template-columns: repeat(2, minmax(0, 1fr));
     }
     #projects .flagship-card:nth-child(3):last-child {
       grid-column: span 2;
       display: grid;
       grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
       align-items: center;
     }
     #projects .flagship-card:nth-child(3):last-child .flagship-media {
       height: 100%;
       justify-content: center;
       border-right: 1px solid var(--glass-border);
     }
   }
   ```
2. For desktop screens (`≥1024px`):
   - Keep clean 3-column layout:
   ```css
   @media (min-width: 1024px) {
     #projects .flagship-grid {
       grid-template-columns: repeat(3, minmax(0, 1fr));
     }
   }
   ```
3. For mobile screens (`<640px`):
   - Keep 1-column layout (`grid-template-columns: minmax(0, 1fr)`).

### Verification
- Check display at 375px (1 column).
- Check display at 768px and 900px (2 columns top, full-width balanced horizontal card bottom).
- Check display at 1200px+ (3 equal cards side-by-side).

---

## Step 4: Streamline Mobile Workflow Density

### Target Files
- `src/styles/strategy.css`
- `src/components/Strategy.jsx`

### Objective
On mobile (< 768px), all four workflow cards are displayed sequentially. The height of the `.workflow-stage` (222px) plus large padding makes each card tall, resulting in excessive scrolling distance on phones.

### Implementation Details
1. In `src/styles/strategy.css`:
   - At `@media (max-width: 767px)`:
     ```css
     @media (max-width: 767px) {
       #strategy .strategy-nav-grid { display: none; }
       #strategy .strategy-scroll-steps { gap: 14px; }
       #strategy .strategy-active-card {
         padding: 18px 16px;
         border-radius: 20px;
       }
       #strategy .strategy-card-title {
         font-size: 20px;
       }
       #strategy .strategy-card-desc {
         font-size: 14px;
         margin-bottom: 12px;
         line-height: 1.55;
       }
       #strategy .workflow-stage {
         height: 175px;
         margin: 0;
       }
       #strategy :is(.workflow-blueprint, .workflow-build, .workflow-pipeline, .workflow-verify) {
         transform: scale(0.85);
         transform-origin: center center;
         top: 0;
       }
     }
     ```
2. Retain accessibility:
   - Ensure touch targets for `<summary>` ("Explore the details") remain ≥ 44px.
   - Keep deliverable check items legible and readable.

### Verification
- Inspect at 320px and 375px viewport widths.
- Ensure the cards scroll comfortably without visual clutter or horizontal overflow.

---

## Step 5: Enhance Custom Cursor Resilience & Preferences

### Target File
- `src/components/ui/CustomCursor.jsx`

### Objective
`CustomCursor.jsx` only inspects pointer fine and reduced-motion preferences at mount time without listening for preference changes. It also needs robust window focus/blur/mouseout handling to prevent frozen cursor rings.

### Implementation Details
1. Dynamically observe media queries with `addEventListener('change', ...)`:
   ```javascript
   useEffect(() => {
     const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
     const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

     let active = fine.matches && !reduced.matches;
     // Re-evaluate on preference change
     const updateEligibility = () => {
       const isEligible = fine.matches && !reduced.matches;
       if (isEligible !== active) {
         // toggle cursor visibility / event listeners
       }
     };
     fine.addEventListener('change', updateEligibility);
     reduced.addEventListener('change', updateEligibility);
   ```
2. Clean Window State Handlers:
   - Hide cursor on `window.addEventListener('blur', ...)` and `document.addEventListener('mouseleave', ...)`.
   - Restore cursor visibility on `window.addEventListener('focus', ...)` and `pointermove`.
   - When over text inputs (`input`, `textarea`, `[contenteditable="true"]`), ensure cursor is set to `data-state="text"` or hidden so native I-beam cursor is unobstructed.

### Verification
- Open site on desktop: move mouse -> verify emerald dot and glass ring track smoothly.
- Hover over buttons -> ring expands.
- Hover over text input -> custom cursor cleanly defers to native text cursor.
- Switch browser devtools emulation to touch or reduced motion -> custom cursor cleanly disappears.

---

## Step 6: Responsive Workflow Animation & Resize Transitions

### Target Files
- `src/components/Strategy.jsx`
- `src/styles/strategy.css`

### Objective
When resizing across the 767px/768px breakpoint, observer classes (`.is-visible`) and React state (`mobile`) must coordinate cleanly so no card gets stuck in a hidden or permanently paused animation state.

### Implementation Details
1. In `Strategy.jsx`:
   - When switching from `mobile` to desktop (`!mobile`), ensure the currently selected `activeStep` card has `.is-visible` applied immediately.
   - Prevent unnecessary scroll listeners or `IntersectionObserver` instances from persisting when `mobile` is false.
2. In `src/styles/strategy.css`:
   - Ensure `@media (min-width: 768px)` styles cleanly enforce `display: grid` on active cards and reset animations so that tab switching on desktop is immediate and predictable.

### Verification
- Resize window repeatedly between 600px and 900px.
- Confirm all cards display on mobile, and the selected card displays properly on desktop tabs.

---

## Step 7: Clean Up Dead References & Stale Files

### Target Files
- `src/components/Skills.jsx`
- `src/styles/stack.css`
- `src/components/ui/ReactionScene.jsx`

### Objective
`Skills.jsx` and `ReactionScene.jsx` are completely unmounted and unused. Remove dead imports and references, ensuring no build breaks occur.

### Implementation Details
1. Confirm no imports of `ReactionScene.jsx` exist across `src/`. Remove or archive `ReactionScene.jsx`.
2. Note that `Skills.jsx` and `src/styles/stack.css` can be safely removed or kept unreferenced, as `src/main.jsx` and `src/App.jsx` do not import them. Verify `src/main.jsx` stylesheets order.
3. Verify that `portfolioData.js` retains `skillsData` (used by search/guide context).

### Verification
- Run `npm run build` and `npm run lint` to verify zero missing import errors.

---

## Step 8: Update Social Preview & Brand Alt Metadata

### Target File
- `index.html`

### Objective
Align metadata descriptions with the new custom angular D logo.

### Implementation Details
1. In `index.html`:
   - Update lines 41 and 46:
     ```html
     <!-- Before -->
     <meta property="og:image:alt" content="Dhrubo logo: a white D on emerald green" />
     <meta name="twitter:image:alt" content="Dhrubo logo: a white D on emerald green" />

     <!-- After -->
     <meta property="og:image:alt" content="Dhrubo logo: custom angular emerald-to-teal D monogram on dark glass" />
     <meta name="twitter:image:alt" content="Dhrubo logo: custom angular emerald-to-teal D monogram on dark glass" />
     ```

### Verification
- Run `npm run build && npm run lint`.
- Check `dist/index.html` to confirm metadata is correctly baked into production build.

---

## Final Quality Verification Checklist

Execute these terminal commands in order:
```bash
npm run build
npm run lint
```
Expected output:
- `vite build` completed successfully with 0 errors.
- `oxlint` completed with 0 errors and 0 warnings.

---

## Execution Status: Complete ✅

| Step | Scope | Target Files | Status |
|---|---|---|---|
| **User Request** | Opportunities Location ("Remote & Dhaka") | `portfolioData.js`, `HeroBento.jsx`, `Sidebar.jsx`, `AiChatModal.jsx` | Completed ✅ |
| **Step 1** | Reconcile Architecture Documentation | `docs/ARCHITECTURE.md` | Completed ✅ |
| **Step 2** | Fix Command Palette Search Filtering | `src/components/CommandPalette.jsx` | Completed ✅ |
| **Step 3** | Polish Project Showcase Tablet Grid | `src/styles/projects.css` | Completed ✅ |
| **Step 4** | Streamline Mobile Workflow Density | `src/styles/strategy.css` | Completed ✅ |
| **Step 5** | Enhance Custom Cursor Resilience | `src/components/ui/CustomCursor.jsx` | Completed ✅ |
| **Step 6** | Responsive Workflow Transitions | `src/components/Strategy.jsx`, `src/styles/strategy.css` | Completed ✅ |
| **Step 7** | Clean Up Dead Code & Stale Files | Removed unmounted `ReactionScene.jsx` | Completed ✅ |
| **Step 8** | Update Social Preview & Brand Alt | `index.html` | Completed ✅ |

**Verification**:
- `oxlint`: 0 warnings, 0 errors.
- `vite build`: Production bundle built cleanly in ~530ms.

