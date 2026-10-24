# FLUTTER — Handoff

Where things stand when this work moved from the cloud session to Dharampal's computer.

## Done and pushed

- **Pre-production locks** (proposed v0.1): [world rules](01-world-rules.md), [protagonist](02-protagonist.md), [creature](03-creature.md), [39 story beats](04-story-beats.md), [21 decisions](05-decisions.md)
- **Protagonist look locked** from [`reference/protagonist-C01-C03.webp`](reference/protagonist-C01-C03.webp). Played by **Dharampal (DP)**.
- **Google Flow guide**: [`storyboard/flow-guide.md`](storyboard/flow-guide.md), with ingredient prompts for DP, the creature, the chrysalis, props, characters and locations
- **Storyboard renderer**: [`storyboard/render.py`](storyboard/render.py). It turns `storyboard/data/*.json` into storyboard pages, Flow prompt pages, a hero-frame list and a CSV, and embeds frames from `storyboard/frames/`.

## Stopped before finishing

1. **Protagonist name: parked.** Working name **DP** everywhere. The final name is decided later and must be universal (no national or cultural markers). The earlier Sanskrit-rooted candidates are archived in [`../archive/flutter-name-candidates-parked.md`](../archive/flutter-name-candidates-parked.md).
2. **Storyboard: Episode 1 done (draft v0.1).** The series runs as episodes. Episode 1 (10:00) is in [`episode-01/`](episode-01/storyboard.md): 19 scenes, 104 shots, hero list and Flow prompts, built from `episode-01/shots.py` by `episode-01/build.py`. The earlier full-film storyboard plan (`storyboard/data/S1…S5`) is superseded; `storyboard/flow-guide.md` still applies.

## Starting on another computer

If this folder came from a zip, it's a full git repository. The history is included and the branch is `claude/dream-sequence-film-di9de1`. To continue with Claude:

1. Open a terminal in this folder and run `claude`.
2. Tell it: "Read flutter/HANDOFF.md and flutter/episode-01/RUN-IN-FLOW.md, then continue." The chat history doesn't travel with the zip; this file and the run-book carry the state.
3. To push changes, the remote is `https://github.com/dhrmpalsingh/design.git` (already set as `origin`).

Key decisions so far:
- The story is **universal**: no national or cultural markers.
- The protagonist's working name is **DP**, played by Dharampal; the final name is parked.
- His look follows the reference strictly in every scene: [`reference/DP-C01.png`](reference/DP-C01.png), [`DP-C02.png`](reference/DP-C02.png), [`DP-C03.png`](reference/DP-C03.png) (clean crops of the C01–C03 sheet). At home he wears the same outfit without the jacket and boots.
- No dialogue.
- Episode 1 is 10:00.

## Next on the local machine: Google Flow

1. Open the Browser pane (desktop app) or use Claude in Chrome, and sign in to Google as the account with Flow credits (**pipihiri2021**) yourself.
2. Follow [`storyboard/flow-guide.md`](storyboard/flow-guide.md) §1: build the ingredients first (DP → creature → chrysalis and G2 → props → locations), picking one image at each step.
   Step-by-step for a local Claude session with Chrome: [`episode-01/RUN-IN-FLOW.md`](episode-01/RUN-IN-FLOW.md).
3. Then generate Episode 1 frames from [`episode-01/flow-prompts.md`](episode-01/flow-prompts.md), hero frames first. Save them as `episode-01/frames/<SHOT>.png` (e.g. `SC06C.png`) and run `python3 flutter/episode-01/build.py`.
