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
