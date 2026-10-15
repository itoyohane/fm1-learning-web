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

## Verification limits

Reference text was read through web access. No browser or browser-capture tool is available, so no rendered screenshots, paired visual comparison, browser console review or real interaction checks were performed. This report does not claim visual QA passed. Automated checks are listed in README.md and can run without network access.

Starting the preview server was also attempted; binding 127.0.0.1:4173 failed with EPERM in this sandbox. The offline entry point remains usable without a server. The HTTP handler is tested directly without socket access.

## Environment adaptation

The bundled web template was initialized. Package installation failed with EPERM at the network socket; application code therefore uses native JavaScript with a dependency-free Node preview/build pipeline. Original hosting Worker, metadata and preparation script remain intact.
