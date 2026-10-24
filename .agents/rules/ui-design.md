---
trigger: glob
globs: "**/*.{jsx,tsx,css,html}"
description: "Studio-grade UI physics, lighting, typography, and Radix UI architecture"
---
# Elite UI Engineering Standards
- **Design System**: Follow `design-system/portfolio/MASTER.md` and semantic CSS tokens. Avoid flat light-lavender backgrounds or generic purple gradients.
- **Lighting & Surface Physics**: Combine translucent fill (`bg-zinc-900/60 backdrop-blur-xl`), hairline border (`border border-white/[0.08]`), and top-edge specular highlight (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]`).
- **Typography**: Apply `tracking-tight` and `[text-wrap:balance]` on headings; `tabular-nums` on numbers/metrics; `font-mono text-[11px] uppercase tracking-widest` on eyebrow labels.
- **Bento Rhythm**: Use 12-col asymmetric spans (`grid-cols-12 gap-4`, `lg:col-span-7` + `lg:col-span-5`). Every card needs a visual anchor (mini UI preview, terminal block, live badge)—never just an icon + text.
- **Radix & Motion**: Use `@radix-ui/*` (`asChild`) for interactive overlays. Use spring easing `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]` and `cursor-pointer`.
- **Output**: Output code directly. No ASCII wireframes or filler explanations.
