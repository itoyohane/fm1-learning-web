# Design QA

final result: blocked

## Selected direction

The user rejected all generated concepts and chose a concise learning-manual layout referencing https://docs.langchain.com/oss/python/langchain/overview. On 2026-10-15, the user explicitly authorized skipping screenshots and another visual-selection round and implementing directly.

## Implemented scope

Chapter navigation, concise instructional articles, local search, page outline, previous/next links, light/dark mode, mobile navigation and print styling. No decorative assets or simulated hardware.

The v0.2 iteration adds complete English chapters and UI, reading-position preservation, native language selection, tactile key labels and button feedback. Search now has grouped bilingual results, default suggestions, a clear action, active-descendant selection, IME guards, retained queries, and separate focus restoration for cancellation versus navigation. Reduced-motion preferences disable animations.

Automated v0.2 checks cover all 17 translations, matching route/section IDs, bilingual queries, group order, selection wrapping, IME key classification, reading-anchor calculations, static assets and hosting output. These are not browser interaction tests.

The v0.3 iteration preserves the documentation layout and adds a native firmware selector above the chapter navigation. Felucca retains 17 chapters; a bilingual stock-firmware guide adds 14 chapters based on the supplied FM-1-manual.pdf. Header context, sources, chapters, and search follow the selected firmware. Qualified links identify the firmware; legacy links remain Felucca links. The choice and last chapter per firmware are stored locally. The mobile menu includes the selector in its focus cycle.

Automated v0.3 checks cover both guides in both languages, source page references, translated section parity, cross-links, firmware-qualified and legacy routes, destination restoration, default search suggestions, search isolation, and stock control differences. Browser Back/Forward, localStorage persistence, menu focus, and rendered appearance still require real-browser verification; route-helper tests do not establish that those interactions pass.

The header search now uses a centered grid column; on mobile it occupies a centered second row. The larger search dialog uses fixed viewport positioning and a stable height, with scrolling confined to results or the empty-state panel. An accessible icon link replaces the firmware text link: GitHub for Felucca, the site's M-VAVE mark for stock firmware, with an M fallback if the external image cannot load. Print-page controls and stock per-chapter source footers are removed. Stock source records and its sources chapter remain available. These layout changes have not been inspected in a browser.

## SLOOP and navigation update · 2026-10-16

Added 18 independently written bilingual SLOOP chapters with a separate firmware registration, qualified routes, scoped search, sources and build / preview assets. Existing Felucca and stock guides remain available. The inspected UI identifies 2.6 while the online complete guide describes 2.7; the source scope and excluded additions are recorded in `docs/sloop-source.md` and the SLOOP sources chapter.

Chapter group headings increased from 12px desktop / 13px mobile to 16px, including English. The FM-1 Docs mark now combines an inline square-wave panel symbol, tick marks and a monospaced wordmark. Mobile widths and coarse touch pointers hide only search keyboard hints, retaining the close button and manual hardware key labels. Left and right navigation use transparent scrollbar thumbs until a passive scroll handler adds `is-scrolling`; the handler removes it after 700ms without another scroll. Gutter space remains stable, and hover does not reveal the thumb.

`npm test`, `npm run build`, `npm run test:sites` and `git diff --check` passed. The manual checks cover all three guides, 49 bilingual chapters, internal links, registered suggestions, SLOOP task searches and key 2.6 control differences. No browser or screenshot tool is installed. The preview was attempted again and failed to bind 127.0.0.1:4173 with EPERM. Desktop / mobile rendering, touch interaction, scrollbar painting and timing, and browser focus / history behavior remain unverified visually. No screenshot or visual pass is claimed.

## Verification limits

Reference text was read through web access. No browser or browser-capture tool is available, so no rendered screenshots, paired visual comparison, browser console review or real interaction checks were performed. This report does not claim visual QA passed. Automated checks are listed in README.md and can run without network access.

Starting the preview server was also attempted; binding 127.0.0.1:4173 failed with EPERM in this sandbox. The offline entry point remains usable without a server. The HTTP handler is tested directly without socket access.

## Environment adaptation

The bundled web template was initialized. Package installation failed with EPERM at the network socket; application code therefore uses native JavaScript with a dependency-free Node preview/build pipeline. Original hosting Worker, metadata and preparation script remain intact.
