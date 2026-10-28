# SLOOP source baseline

Rechecked on **2026-10-28** against [SLOOP v2.6](https://github.com/isod89/sloop-fm1/releases/tag/v2.6), release commit [`d30d6553353373cf5506b9ed285fc4a2aa0c30ef`](https://github.com/isod89/sloop-fm1/commit/d30d6553353373cf5506b9ed285fc4a2aa0c30ef). The independent bilingual guide lives in `src/content-sloop.js` and is registered under `sloop`.

## Version boundary

The initial 2026-10-16 inspection retrieved a main-branch `ui.c` identifying SLOOP 2.6 and a main-branch guide identifying 2.7. That mixed retrieval is superseded for documentation by matching, versioned [`SLOOP.md`](https://github.com/isod89/sloop-fm1/blob/v2.6/SLOOP.md) and [`GUIDE.md`](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md), both explicitly identifying **2.6**. The guide remains on 2.6; later features are outside its scope.

The release page provides the full commit above. The web service could retrieve the v2.6 manuals but not freshly retrieve all tagged source files; initial code inspection and this release-document audit are distinct evidence. Displayed source links now use the v2.6 release commit. Detailed corrections and remaining limits are in [other-guides-fact-check.md](other-guides-fact-check.md).

## Inspected behavior

| File / resource | Guide coverage |
| --- | --- |
| [`ui.c`](https://github.com/isod89/sloop-fm1/blob/v2.6/firmware/src/ui.c) | Initial code inspection: version identifier; user presets; MIDI learn selection, reserved CCs and mapping persistence. |
| [`ui_input.c`](https://github.com/isod89/sloop-fm1/blob/v2.6/firmware/src/ui_input.c) | Initial code inspection: tap / hold; layer button + HOME locks; DRUMS cycles two pages; STEP and external MIDI note entry; context-dependent SAVE. |
| [`ui_layers.c`](https://github.com/isod89/sloop-fm1/blob/v2.6/firmware/src/ui_layers.c) | Initial code inspection: step velocity, ratchets, nudge, locks and fill conditions; mix keys; section storage / confirmation; song chains. |
| [`SLOOP.md`](https://github.com/isod89/sloop-fm1/blob/v2.6/SLOOP.md) | Versioned document audit: free / tempo recording, twelve synth engines, 153 sounds, drum kits, INSERT, TEXTURE, USB audio, samples and backups. |
| [`GUIDE.md`](https://github.com/isod89/sloop-fm1/blob/v2.6/GUIDE.md) | Versioned document audit: gestures, page labels, step entry and voice settings. |

## Differences to preserve

- SLOOP locks a layer by holding its button and tapping HOME. Felucca's double-tap instructions do not apply.
- Stopped REC arms recording; an empty loop can use a free take, closed with REC on the next downbeat.
- DRUMS in the inspected input source cycles grid / kit. Do not add 2.7's sound page to 2.6 instructions.
- There are twelve synth engines, including DIGITAL and FM6, plus a dedicated drum track. Do not copy Felucca's thirteen-engine list or SLICE label.
- SAVE on TRACKS opens SONG. USER / PROJECT pages are reached from parameter pages. PROJECT slots 1–4 are sections A–D.
- The 2.7 guide renames PROJECT to SECTION and adds QUANT off, favourites, MIDI 3 and other functions. These are not presented as usable 2.6 controls.
- 2.6 project format 6 does not load in 2.5; an earlier backup is required for a downgrade. A–D are sections of one song; full backups keep separate songs.

## Validation limit

Content, route, search and build checks do not verify hardware behavior. No hardware was connected or flashed. Browser rendering and scroll interactions could not be inspected because this environment has no browser and preview socket binding fails with EPERM.
