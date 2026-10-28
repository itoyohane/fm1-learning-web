# Felucca factual review

Checked **2026-10-28**. Guide baseline remains **Felucca v1.6.1**. Chinese and English chapter / section IDs are retained.

## Primary sources and revision

- The [v1.6.1 release](https://github.com/hugelton/Felucca/releases/tag/v1.6.1) points to commit [`a53ecf428c29c780108fd70a31b71a32a6b5c313`](https://github.com/hugelton/Felucca/commit/a53ecf428c29c780108fd70a31b71a32a6b5c313).
- Retrieved tagged source: [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c), [`ui.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui.c).
- First-party Wiki: [Controls](https://github.com/hugelton/Felucca/wiki/Controls), [Features](https://github.com/hugelton/Felucca/wiki/Features), [Engines](https://github.com/hugelton/Felucca/wiki/Engines), [Menu](https://github.com/hugelton/Felucca/wiki/Menu), [Scale Keyboard](https://github.com/hugelton/Felucca/wiki/Scale-Keyboard). Retrieved Wiki pages identify their edits as 2026-10-13, before the 1.6.1 release.
- Supplementary source: [`ui_layer.c` on main](https://github.com/hugelton/Felucca/blob/main/firmware/src/ui_layer.c). The web service returned a cache miss for this file at the tag / full commit, so this supplementary read is not represented as an immutable snapshot. The displayed source links now select v1.6.1 rather than mutable main.

## Corrections

| Topic | Correction and supporting source |
| --- | --- |
| Physical SEL versus screen SCL | Physical-button instructions, quick-layer lists and shortcut tables now say **SEL**, following the device label reported by the user. The device has a separate **SELECT** knob. The real Felucca page name **SCL** remains in code styling, including `SCL > QNT`. [Scale Keyboard](https://github.com/hugelton/Felucca/wiki/Scale-Keyboard) names the page SCL; [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c) maps the `B_SCL` internal enum to its family. The Wiki itself also uses SCL as a button shorthand, which must not be copied as a physical label. |
| Piano-roll parameter locks | Added the missing step-recording prerequisite: stop, arm REC on the STEP piano roll, then hold the notes being entered. Without arming, notes only play and `ui.entry_open` remains clear, so `lock_held()` returns no piano-roll step. Drum-grid step keys can be held directly. See `lock_held()`, `rec_tap()` and the STEP branch in [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c). |
| Backup scope | Replaced the claim that the editor backs up all data. It backs up projects, presets, samples and settings, but **excludes the external FM6 voice bank**, whose `.syx` must be retained separately. [Features](https://github.com/hugelton/Felucca/wiki/Features), Web section. |
| Step chord entry | Clarified that HOLD writes held notes into the same step and advances when all are released. POLY can keep four notes; mono modes keep one. See `step_toggle()` / `seq_entry()` in [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c) and [Menu](https://github.com/hugelton/Felucca/wiki/Menu), CHORD ENTRY. |
| Count-in | Added the external-clock exception: COUNT-IN does not run with an external clock. Preserved the correct statement that the click does not enter USB audio. [Menu](https://github.com/hugelton/Felucca/wiki/Menu), COUNT-IN; [Features](https://github.com/hugelton/Felucca/wiki/Features), Metronome and count-in. |
| MIDI routing | Completed the omitted CH5-8, CH9-12 and CH13-16 channel blocks and the TRACK choices 1–16 / OMNI / OFF. Clarified that MIDI IN and track channel assignments are project data. The routing mode named `SEL` is styled as a setting, not as the physical button. [Menu](https://github.com/hugelton/Felucca/wiki/Menu), MIDI IN and T1–T4 CHANNEL; [Features](https://github.com/hugelton/Felucca/wiki/Features), MIDI. |

## Reviewed claims retained

- **Thirteen engines**, including SLICE and the eight-lane DRUM engine, are correct for Felucca; DIGITAL belongs to older configurations and must not be added from SLOOP's engine list. [Engines](https://github.com/hugelton/Felucca/wiki/Engines), [`ui.c` visibility conditions](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui.c).
- **Four tracks share eight voices**, and DRUM can be placed on a selected track. [Features](https://github.com/hugelton/Felucca/wiki/Features).
- **Double-tap locking**, held SAVE undo, held LFO temporary edits and OCT+ keeping temporary edits are correct. These are different from SLOOP's HOME layer-lock gesture. [Controls](https://github.com/hugelton/Felucca/wiki/Controls), [`ui.c` lock state](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui.c), [`ui_input.c` momentary handling](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c).
- **REC from HOME starts live recording**, while stopped non-drum STEP arms cursor entry; PLAY controls transport, and stopping does not itself clear all recording arms. `rec_tap()` in [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c).
- **SEQ TOOLS knobs LEN / DIV / SWING / GATE**, STEP editing, DETAIL CHANCE / RATCH / NUDGE / VEL, shared 128 motion records, MIXER LEVEL / PAN / REV / MUTE and FX LATCH behavior agree with the retrieved [Controls](https://github.com/hugelton/Felucca/wiki/Controls), [Features](https://github.com/hugelton/Felucca/wiki/Features), [Menu](https://github.com/hugelton/Felucca/wiki/Menu) and [`ui_input.c`](https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c).
- **USB audio 44.1 / 48 kHz**, speaker EQ affecting headphone / USB output and `USB LEVEL = FIXED` agree with [Features](https://github.com/hugelton/Felucca/wiki/Features) and [Menu](https://github.com/hugelton/Felucca/wiki/Menu).

## Limits

This is a source and text audit, with no attached FM-1 or hardware exercise. The physical SEL correction follows the user's device observation; internal enum and screen names are not evidence for changing the panel engraving. Some browser-source retrievals failed, and the Wiki is mutable. No claim is made that every possible firmware state or hardware interaction was exercised.
