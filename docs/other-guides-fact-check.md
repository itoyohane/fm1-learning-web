# SLOOP and stock-guide fact check

Checked **2026-10-28**. Scope: all 18 SLOOP chapters and all 14 stock chapters, in Chinese and English. Firmware baselines remain SLOOP 2.6 and the supplied official manual revision 2026-08-10. Existing UI and punctuation edits were preserved.

## SLOOP source identity

The [v2.6 release](https://github.com/isod89/sloop-fm1/releases/tag/v2.6) identifies commit [`d30d6553353373cf5506b9ed285fc4a2aa0c30ef`](https://github.com/isod89/sloop-fm1/commit/d30d6553353373cf5506b9ed285fc4a2aa0c30ef). Both the [versioned short manual](https://github.com/isod89/sloop-fm1/blob/v2.6/SLOOP.md) and [versioned complete guide](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md) were retrieved and identify SLOOP 2.6. Content source links now point to that release commit, rather than mutable `main`.

The online `main` guide describes newer 2.7 controls. The 2.6 instructions retain PROJECT, the two DRUMS pages, quantized recording, and the original arpeggiator choices. No firmware upgrade was made or implied.

## Corrected or clarified SLOOP instructions

| Topic | Correction | Primary reference |
| --- | --- | --- |
| Direct engine selection | Use **KNOB 2** on SAVE → PRESETS. Replaced the ambiguous instruction to use an “ENGINE knob,” which is not a panel label. | [Guide §16, §17](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#17-the-sounds-and-the-twelve-engines) |
| FM6 persistence | Projects and user presets retain PTCH and macros, not an auditioned external patch. Added Store in bank and selecting its B slot before relying on a project recall. | [Guide §17, FM6](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#fm6-and-dx7-patches) |
| Drum-track filtering | Split the synth FILTER-page route from the drum route, which uses **FX + KNOB 4**. The 2.6 drum-page exceptions do not make every synth page usable on drums. | [Guide §16, notes](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#16-every-page-knob-by-knob) |
| LFO trigger | NOTE restarts at PHS on a new phrase; replaced wording that implied a restart on every note. | [Guide §16, LFO 2 note](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#16-every-page-knob-by-knob) |
| Saving | Quick start and saving instructions now explicitly stop playback before writing projects or user sounds to flash. | [Guide §13](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#13-undo-clear-save-projects-autosave) |
| Matching offline editor | Direct readers to the v2.6 release's `sloop-editor-2.6.html`; removed the unverified promise that the 2.6 editor can be installed as an app. The live editor can advance independently. | [Guide §24](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md#24-the-web-editor), [v2.6 release assets](https://github.com/isod89/sloop-fm1/releases/tag/v2.6) |
| Control/value distinction | `OTHER = SEL`, `CLICK = REC`, REC READY, and SAVE / LOAD GO fields are marked as screen values, rather than physical button presses. | [Guide §8, §13, §21](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md) |

Confirmed against the same guide: seven layers locked with button + HOME; four tracks with a dedicated 16-sound drum track; twelve synth engines; 153 factory presets; free-take closure on the next downbeat; 1–64 steps; synth step VEL; ratchets, nudge and locks; A–D as four sections of one song; MIDI channel defaults 1/2/3/10; incoming-only clock synchronization; USB stereo 44.1/48 kHz; no BLE MIDI; and 2.6-to-2.5 project incompatibility.

## Stock manual

Source: the user-supplied `../FM-1-manual.pdf`, 31 pages. Its identity, SHA-256, revision and page index are recorded in [official-manual-source.md](official-manual-source.md). With no PDF utility installed, a temporary local script decompressed PDF text streams and decoded the embedded ToUnicode maps; English and Chinese passages were compared. No dependency or extraction script was added to the repository.

| Topic | Finding / adjustment | PDF pages |
| --- | --- | --- |
| SEL label | The effect-order button is **SEL**. Existing stock wording was already correct and remains so. | 7, 23 |
| Panel and keyboard GLO | Kept the distinction between the panel's device-settings control and the printed keyboard GLO function inside EDIT. Applied the existing key helper to keyboard GLO, PIT, MONO, POLY and OP gestures. | 8–9, 24 |
| OCT shorthand | Expanded OCT± to **OCT− / OCT+**, avoiding a label for a physical key that does not exist. | 2–3, 18–19 |
| Firmware selection | Where the installed firmware has four tracks, point to its matching Felucca **or SLOOP** guide, rather than always prescribing Felucca. | Scope clarification; stock control differences in pages 2–3, 7–11 |
| Parameters | Confirmed 32 FM algorithms, six operators, twelve-note POLY limit, six operator pages, overall ENV toggle, LFO note-reset meaning, and MONO-only glide. | 4–9, 20–24 |
| MIDI | Confirmed MIDI Channel = ALL **or** 1–16, Effect Channel = 1–16, BLE via HOME, simultaneous three MIDI interfaces, and DX7 bank import. | 9–10, 14, 24–25, 29 |
| Sequencer | Confirmed SEQ-before-REC/PLAY, 16 patterns / 16 steps, three parameter pages, held-key long notes, REC + SELECT positioning, rests, chain and automatic pattern storage. | 6, 10–12, 22, 25–27 |
| Saving and reset | Kept hold SAVE, preset pending-write behavior, and reset to the last imported bank. The manual does not establish a complete backup/export or USB audio workflow. | 9–10, 14, 24–25, 29 |

The stock manual revision is still **2026-08-10**, not a firmware version. Both guides' audit dates are now 2026-10-28.

## Limits

The versioned SLOOP prose and release identity were available; requests for versioned raw C files returned web cache misses. This pass therefore does not claim to have executed or inspected every C implementation at the pinned commit. Device behavior was not tested on hardware. Root validation covers bilingual structure, links and search; rendered key styling requires browser verification when available.
