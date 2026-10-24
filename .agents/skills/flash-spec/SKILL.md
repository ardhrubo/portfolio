---
name: flash-spec
description: "Use with Gemini Flash to generate a compact, zero-bloat UI implementation prompt for Claude."
---
# Flash Architect -> Claude Prompt Compiler

When invoked on a target component:
1. Read `design-system/portfolio/MASTER.md` and inspect the target component file.
2. **Do NOT write the full component code.**
3. Output a single, copy-pasteable code block (< 220 words) addressed to Claude containing:
   - **Target File**: Exact file path to edit.
   - **Grid & Layout**: Exact 12-col asymmetric Bento spans (`col-span-*`).
   - **Surface & Lighting Classes**: Exact Tailwind classes using dark obsidian/zinc surfaces, `backdrop-blur-xl`, `border-white/[0.08]`, and `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]`.
   - **Visual Anchors**: Specific mini-UI preview, interactive state, or terminal/metric badge inside each card.
   - **Radix & Transitions**: Exact Radix primitive behavior and `ease-[cubic-bezier(0.16,1,0.3,1)]` transitions.
   - **Strict Lock**: End the prompt with: *"Do not run any skill scripts or search the codebase. Edit only the target file and output code directly."*
