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

## Factual review and shared keycaps (2026-10-28)

Reviewed all 49 chapters in both languages against their declared firmware versions. Felucca distinguishes physical SEL, the SELECT encoder and the SCL page; corrected cursor-entry prerequisites for parameter locks, FM6 backup scope, count-in / external-clock behavior, chord-entry voice limits and omitted MIDI routing modes. SLOOP remains on 2.6 with release-pinned references; corrected engine selection, FM6 patch persistence, drum filtering, LFO triggering, flash-save prerequisites and offline-editor instructions. Stock instructions were rechecked against the supplied PDF. Source evidence and retrieval limits are recorded in `docs/felucca-fact-check.md`, `docs/other-guides-fact-check.md` and `docs/sloop-source.md`.

The shared renderer uses the same native `kbd` markup as Quick start for printed panel controls in article titles, summaries, section headings, prose, callouts and tables. It preserves existing keycaps, explicit `code` literals, URLs and attributes. Stock keyboard OP legends are scoped to that guide. Table accessible names use plain header text even when visible headers contain keycaps or screen-value markup. Search data and all chapter / section IDs remain unchanged by presentation.

The 28 manual checks pass, including bilingual source parity, destinations and search, keycap idempotence and content preservation across every section, literal handling and factual regressions. No browser tool or executable is available; another preview attempt failed with `listen EPERM` at 127.0.0.1:4173. No hardware, rendered comparison or visual pass is claimed.

## Verification limits

Reference text was read through web access. No browser or browser-capture tool is available, so no rendered screenshots, paired visual comparison, browser console review or real interaction checks were performed. This report does not claim visual QA passed. Automated checks are listed in README.md and can run without network access.

Starting the preview server was also attempted; binding 127.0.0.1:4173 failed with EPERM in this sandbox. The offline entry point remains usable without a server. The HTTP handler is tested directly without socket access.

## Environment adaptation

The bundled web template was initialized. Package installation failed with EPERM at the network socket; application code therefore uses native JavaScript with a dependency-free Node preview/build pipeline. Original hosting Worker, metadata and preparation script remain intact.


## UI refinement (2026-10-28)

Implemented the user's eleven constraints within the existing manual. Removed middle-dot separators in UI strings, document titles, parameter tables and source labels. Shortened search and chapter-navigation copy in both languages; removed the repeated firmware/language header context, visible firmware-selector subtitle and current-page breadcrumb segment. Retained chapter summaries, search excerpts, source/version information and operational warnings because they support reading and result selection.

Local Radix Slate and Indigo sRGB values now cover light/dark surfaces, interactive states, separators, focus, text, highlights, source-mark tint and print styling. Usage follows https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale. Typography uses 12px, 16px and 24px; group headings remain larger than chapter links. Borders and focus outlines use 0.5px. Callouts have flat neutral backgrounds without left accents; previous/next navigation uses top separators instead of framed cards. Removed decorative shadows, CSS transitions, entry keyframes, pressed transforms and JavaScript article fades. Dialog radius 16px, inner inset 12px and inner radius 4px share corner centers. Search labels and results share 24px text insets. Header controls have matching 44px heights, and touch navigation retains 44px targets.

Validation: `npm test`, `npm run build`, `npm run test:sites`, source checks and `git diff --check`. Preview startup was attempted with the local server and failed with `listen EPERM` on 127.0.0.1:4173. No browser executable or browser tool is available. Desktop/laptop/tablet/mobile rendering, optical alignment, external-logo tint and focus/history interactions have not been visually verified; no screenshot or visual pass is claimed.

## Firmware documentation update (2026-10-28)

Current check supersedes the earlier unavailable-browser limitation for the flows below. Preserved the existing layout and styles; added JIANT through the same selector and firmware registry. Its ten bilingual chapters share section IDs; all four guides total 59 chapters per language. Kept JIANT navigation groups contiguous.

- Chromium via a temporary Playwright Core install outside the repository; desktop 1440×1000 and mobile/touch 390×844.
- Opened JIANT deep links; verified Chinese → English keeps the hash, Chinese search returns results in the English guide, ArrowDown/Enter opens a JIANT destination, and switching SLOOP → JIANT restores a valid location.
- No page script errors; no horizontal overflow on the SAMPLE page at either size. Inspected desktop and mobile screenshots. Screenshots are temporary local QA artifacts, not published assets.
- Automated checks cover bilingual structures, section IDs, sources, search isolation, legacy Felucca routes, new JIANT assets and specific updated SLOOP instructions. Build and Sites worker checks cover packaging.
- No physical FM-1, flashing, MIDI transfer or audio verification. JIANT editions remain distinct. Official product-page retrieval returned HTTP 403; the supplied official manual revision remains unchanged.
