# PromoStage Rehearsal Record (`src/components/PromoStage.tsx`)

## Stage & Choreography Summary
- **Component**: `PromoStage` (`src/components/PromoStage.tsx`, styles scoped to `.ps` in `src/components/promo-stage.css`)
- **Host Route**: `#promo` (`src/components/PromoReel.jsx`)
- **Design Dimensions**:
  - Wide: `760 × 440` (`theme="dark"`, corner-bleed browser window `ardhrubo.dev/studio/deployments` at `top: 48px; left: 48px; width: 744px` with a `168px` navigation sidebar)
  - Compact (`below: 760`): `358 × 320` (corner-bleed window at `top: 24px; left: 24px; width: 368px`, sidebar omitted)
- **Beats & Marks**:
  1. **Opening (`0.0s`)**: `Launch 3D studio` (`main`, `7d02b18`, `2h ago`, `41s`) holds the `Current` pill and `Ready` status.
  2. **`deploy` mark (`0.9s`)**: `<Collapse open={s.open} reveal="drop">` opens `Ship AI & 3D web` (`main`, `a41c9e2`, `Just now`) at the top of the list with a neutral `Building` badge (`<Spinner size={8} />`) while build telemetry ticks (`10s` → `17s` → `24s` → `31s` → `35s`).
  3. **`ready` mark (`3.3s`)**: The status badge transitions in place on the same pill from `Building` (neutral + spinner) to `Ready` (emerald `success` + 8px dot), the right edge of `.ps-label` eases to fit `"Ready"`, build time settles at `38s`, and the `Current` pill crossfades from `Launch 3D studio` to `Ship AI & 3D web`.
  4. **Seamless loop reset (`5.3s–6.0s`)**: The lead row collapses (`open: false`), handing `Current` back, and `a.snap({ ready: false, t: 10 })` resets state while hidden.

## Rehearsal Captures & Gate Results
- **Wide Loop (`1280px` viewport, `760×440` stage)**:
  - Command: `node .agents/skills/stageshow/scripts/film.mjs "http://localhost:4180/#promo" --select ".ps" --count 18 --every 500 --out /tmp/rehearsal-wide.png --gate`
  - Result: **`rehearsal passed`** (0 never-intentional lines).
- **Compact Phone Loop (`390px` viewport, `358×320` compact stage)**:
  - Command: `node .agents/skills/stageshow/scripts/film.mjs "http://localhost:4180/#promo" --select ".ps" --width 390 --count 18 --every 500 --out /tmp/rehearsal-compact.png --gate`
  - Result: **`rehearsal passed`** (0 never-intentional lines).
- **States Sweep (`open`, `deploy`, `deploy +0.7s`, `ready`, `ready +0.7s`, loop `end`)**:
  - Command: `node .agents/skills/stageshow/scripts/film.mjs "http://localhost:4180/#promo" --select ".ps" --states --states-for 9000 --out /tmp/rehearsal-states.png --gate`
  - Result: **`rehearsal passed`** (0 never-intentional lines).
- **Reduced Motion Poster (`prefers-reduced-motion: reduce`)**:
  - Command: `node .agents/skills/stageshow/scripts/film.mjs "http://localhost:4180/#promo" --select ".ps" --reduced --still --out /tmp/rehearsal-reduced.png`
  - Result: **`no-issues-detected`** (`poster={{ open: true, ready: true, t: 38 }}` renders the completed payoff frame with `Ship AI & 3D web` marked `Current` and `Ready` in `38s`).
- **CSS Namespace & Host Layout Audits**:
  - `node .agents/skills/stageshow/scripts/class-clash.mjs src/components` → `no overlapping class namespaces detected`.
  - `node .agents/skills/stageshow/scripts/layout.mjs "http://localhost:4180/#promo" --select .promo-video-page --width 390` → `no-issues-detected`.
  - `node .agents/skills/stageshow/scripts/layout.mjs "http://localhost:4180/#promo" --select .promo-video-page --width 1280` → `no-issues-detected`.

## Host Interactions Verified
- **Replay button**: `.promo-replay-btn` in `src/components/PromoReel.jsx` increments `run` (`<PromoStage key={run} />`), cleanly remounting the stage at the story boundary.
- **Keyboard & Escape**: Pressing `Escape` on `#promo` exits back to `#hero` and restores focus to `#hero-watch-promo` (`Promo`).
- **Cases Not Applicable**: Pointer hover choreography (`--hover`) is not used because `PromoStage` is a continuous loop (`play="loop"`) with an explicit host `Replay` control rather than `play="hover"`.
