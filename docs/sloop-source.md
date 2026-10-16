# SLOOP source baseline

Checked on **2026-10-16** against [isod89/sloop-fm1](https://github.com/isod89/sloop-fm1). The independent bilingual guide lives in `src/content-sloop.js` and is registered under `sloop`.

## Version boundary

The retrieved [`ui.c`](https://github.com/isod89/sloop-fm1/blob/main/firmware/src/ui.c) identifies `FELUCCA_VERSION` as **SLOOP 2.6**. [`SLOOP.md`](https://github.com/isod89/sloop-fm1/blob/main/SLOOP.md) also identifies 2.6. Retrieved [`GUIDE.md`](https://github.com/isod89/sloop-fm1/blob/main/GUIDE.md) identifies **2.7** and includes later features. Retrieval times differed across files; this is a 2.6 content baseline, not a claim that all upstream main files form one immutable snapshot.

Git network access failed with a socket EPERM. GitHub connector access failed, and the web service could not retrieve the commit API. No commit SHA was obtained. References therefore point to mutable main URLs. Before changing the baseline, obtain a consistent source revision and compare the actual control implementations with the matching guide.

## Inspected behavior

| File / resource | Guide coverage |
| --- | --- |
| [`ui.c`](https://github.com/isod89/sloop-fm1/blob/main/firmware/src/ui.c) | Version identifier; user presets; MIDI learn selection, reserved CCs and mapping persistence. |
| [`ui_input.c`](https://github.com/isod89/sloop-fm1/blob/main/firmware/src/ui_input.c) | Tap / hold; layer button + HOME locks; DRUMS cycles two pages; STEP and external MIDI note entry; context-dependent SAVE. |
| [`ui_layers.c`](https://github.com/isod89/sloop-fm1/blob/main/firmware/src/ui_layers.c) | Step velocity, ratchets, nudge, locks and fill conditions; mix keys; section storage / confirmation; song chains. |
| [`SLOOP.md`](https://github.com/isod89/sloop-fm1/blob/main/SLOOP.md) | Free / tempo recording, twelve synth engines, 153 sounds, drum kits, INSERT, TEXTURE, USB audio, samples and backups. |
| [`GUIDE.md`](https://github.com/isod89/sloop-fm1/blob/main/GUIDE.md) | Cross-reference for shared gestures and page labels; explicitly newer features excluded. |

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
