# Portfolio promo video

The finished exports are `public/media/portfolio-promo-vertical.mp4` (1080×1920, 9:16) and `public/media/portfolio-promo-widescreen.mp4` (1920×1080, 16:9). Both are 24 seconds, 30 fps, H.264 with yuv420p, no audio track, and fast-start MP4 metadata. They are local deliverables; nothing has been posted to social accounts.

The seven scenes invite viewers to the portfolio, assemble interface motion graphics, showcase Brown’s Interior, Squicy UAP, and ScrapeAutomate, explain tool roles, then invite viewers to visit ardhrubo.dev and book a project through info@ardhrubo.dev. Text is embedded for silent viewing. The vertical layout is composed separately with generous top/bottom margins. Preview boards and posters are included. English VTT captions and the website transcript provide a text alternative. There is no spoken narration.

The exports are music-free and have no audio track. The earlier instrumental master was removed. Animated interface assemblies and flowing connection lines support the message. Tool mentions are grouped by purpose: React/Next.js for websites, Python/Puppeteer for automation, Claude Code/Codex/Hermes Agent for the AI workflow. There are no added project numbers or numeric achievement claims. Existing project screenshots are preserved; any text within those previews belongs to the original projects. Fonts retain their licenses under `public/fonts/`.

## Rebuild

Requires Python 3, Pillow with WOFF2 font support, numpy, Node.js, and FFmpeg with libx264. No additional website runtime dependencies are needed.

```sh
python3 scripts/render-promo.py --preview
python3 scripts/render-promo.py --ffmpeg /path/to/ffmpeg
```

The renderer reads identity, project IDs, screenshots, and project facts from `src/data/portfolioData.js`. Promotional titles and timing are in the renderer. The website domain is ardhrubo.dev, matching `index.html` and the sitemap; update the renderer, captions, and transcript if that changes.

`#promo` uses native video playback with no autoplay. Video bytes load only when the promo view is opened (metadata preload). Links download the original exports. Review the final MP4 after any content or timing changes.
