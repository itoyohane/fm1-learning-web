# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project preferences

Preserve the concise documentation layout. Keep the complete manual and interface available in Chinese and English, with identical chapter/section IDs and the reader's position preserved on language changes. Give functional buttons and key labels restrained tactile styling; respect reduced-motion settings. Search must support both languages, IME composition, keyboard selection, and reliable focus restoration. The user authorized proceeding without screenshots when the environment cannot capture them; document the verification limit accurately.

Offer only Felucca and official FM-1 firmware guides for now. Preserve the existing design when extending firmware selection. Keep navigation, search, control instructions, and sources scoped to the selected firmware. Use the supplied `../FM-1-manual.pdf` for stock instructions; cite PDF page numbers and distinguish the manual's revision date from a firmware version. Keep legacy Felucca links working.
