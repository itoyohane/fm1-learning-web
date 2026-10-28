# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project preferences

Preserve the concise documentation layout. Keep the complete manual and interface available in Chinese and English, with identical chapter/section IDs and the reader's position preserved on language changes. Keep functional buttons and hardware key labels visually distinct through Radix surfaces and fine borders; respect reduced-motion settings. Search must support both languages, IME composition, keyboard selection, and reliable focus restoration. The user authorized proceeding without screenshots when the environment cannot capture them; document the verification limit accurately.

Offer Felucca, SLOOP and official FM-1 firmware guides. Preserve the existing design when extending firmware selection. Keep navigation, search, control instructions, and sources scoped to the selected firmware. Before changing operation instructions, read `docs/felucca-fact-check.md` or `docs/sloop-source.md` for the selected firmware's versioned sources. Use the supplied `../FM-1-manual.pdf` for stock instructions; cite PDF page numbers and distinguish the manual's revision date from a firmware version. Keep legacy Felucca links working.

Name the physical scale button SEL and the encoder SELECT. Retain SCL when quoting Felucca's on-screen scale page or an internal source identifier. Render physical controls with the shared Quick start keycap style throughout article prose, headings, callouts and tables in both languages. `src/core.js` formats printed control labels at render time; use `code` markup for literal screen values and filenames, and explicit `kbd` for musical-key legends. Keep parameter values distinct from instructions to press a button.

Keep the header search centered independently of adjacent controls. The search dialog stays centered at a stable size while only its results scroll. Use an icon link immediately before language selection: GitHub for Felucca and SLOOP, M-VAVE's site mark linking to its FM-1 product page for stock firmware. Do not restore the print-page action or per-chapter source footer for the stock guide; preserve source data and the dedicated sources chapter.

Keep chapter group labels such as 入门 and 声音 visibly larger than chapter links in both languages. Hide search keyboard hints on mobile and touch layouts while retaining a tappable close action. Use a compact synthesizer-inspired FM-1 Docs mark with a waveform and panel details. Navigation scrollbars stay transparent when idle, appear during scrolling, and hide shortly after scrolling stops; hovering alone must not reveal them.


## UI refinement preferences

Use concise, professional Chinese and English for FM-1 learners. Keep labels specific to their action; remove repeated context and explanatory UI subtitles while retaining operational instructions, firmware-version boundaries and source references. Use parentheses for parameter ranges and annotations; omit middle-dot separators.

Use locally defined Radix Slate and Indigo scales in both themes: steps 1–2 for surfaces, 3–5 for control states, 6 for separators, 7–8 for control borders and focus, 11–12 for text. Keep text at 12px, 16px or 24px, using weight and spacing for hierarchy; chapter group headings stay larger than chapter links. Use 0.5px borders, flat surfaces and restrained functional rounding. Nested corners share a center: search dialog radius 16px, inset 12px, inner control radius 4px. Align navigation labels, controls and article content to consistent insets. Keep primary choices in the firmware/language selectors and navigation; avoid additional confirmation steps. Omit decorative shadows, card edge accents and entry/press animations. If a transition becomes necessary, start with 250ms ease-out and respect reduced motion.
