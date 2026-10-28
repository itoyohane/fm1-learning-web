# Official FM-1 manual source

The stock-firmware guide is independently written from the user-supplied `../FM-1-manual.pdf`. The PDF is not redistributed in this repository.

- Device: M-VAVE FM-1.
- Manual revision: **2026-08-10**, printed on PDF page 30. This is not a firmware version.
- File: 31 pages; 1,033,110 bytes.
- SHA-256: `9ca4e9d69138ed3d3c266184498acb670939b290975839b8505309f296c1f993`.
- Rechecked: 2026-10-28. Detailed findings: [other-guides-fact-check.md](other-guides-fact-check.md).

References in `src/content-official.js` use PDF file page numbers, rather than printed footer numbers. The English body is on pages 2–15 and the Chinese body on pages 18–30.

| Topic | Chinese PDF pages | English PDF pages |
| --- | --- | --- |
| Knobs, octave, presets | 18–19 | 2–3 |
| Parameter tables | 20–22 | 4–6 |
| Effects and reordering | 20, 22–23 | 4–5, 7 |
| Envelope and LFO | 21, 23 | 5, 7–8 |
| Operator editing and keyboard functions | 21, 23–24, 28 | 5–6, 8–9, 13 |
| Device global settings | 22, 24 | 6, 9 |
| HOME, saving, bank import | 25 | 9–10 |
| Arpeggiator | 22, 25–26 | 6, 10 |
| Sequencer and transport | 22, 26–27 | 6, 10–12 |
| MIDI | 29 | 14 |
| Power and ports | 29–30 | 14–15 |

Do not import Felucca behavior into this guide. Stock ALGORITHM chooses an FM algorithm; SELECT changes pages; holding HOME toggles BLE MIDI; holding SAVE saves. SEQ must be enabled before REC / PLAY. ARP and SEQ are mutually exclusive. SEQ provides 16 patterns with up to 16 steps, and uses its Voice parameter while PRESETS is inactive.

The manual does not document flashing, a complete MIDI CC map, bank export, or USB audio. Reset Patches restores the last imported bank, according to the manual; avoid promising the original factory bank. For ambiguous gestures such as Clear or naming confirmation, direct readers to the screen prompt rather than inventing a shortcut.
