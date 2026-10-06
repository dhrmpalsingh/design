# FLUTTER — Handoff (cloud → local)

Where things stand when this work moved from the cloud session to Dharampal's computer.

## Done and pushed

- **Pre-production locks** (proposed v0.1): [world rules](01-world-rules.md), [protagonist](02-protagonist.md), [creature](03-creature.md), [39 story beats](04-story-beats.md), [21 decisions](05-decisions.md)
- **Protagonist look locked** from [`reference/protagonist-C01-C03.webp`](reference/protagonist-C01-C03.webp). Played by **Dharampal (DP)**.
- **Google Flow guide**: [`storyboard/flow-guide.md`](storyboard/flow-guide.md), with ingredient prompts for DP, the creature, the chrysalis, props, characters and locations
- **Storyboard renderer**: [`storyboard/render.py`](storyboard/render.py). It turns `storyboard/data/*.json` into storyboard pages, Flow prompt pages, a hero-frame list and a CSV, and embeds frames from `storyboard/frames/`.

## Stopped before finishing

1. **Protagonist name: parked.** Working name **DP** everywhere. The final name is decided later and must be universal (no national or cultural markers). The earlier Sanskrit-rooted candidates are archived in [`../archive/flutter-name-candidates-parked.md`](../archive/flutter-name-candidates-parked.md).
2. **Storyboard: Episode 1 done (draft v0.1).** The series runs as episodes. Episode 1 (10:00) is in [`episode-01/`](episode-01/storyboard.md): 19 scenes, 104 shots, hero list and Flow prompts, built from `episode-01/shots.py` by `episode-01/build.py`. The earlier full-film storyboard plan (`storyboard/data/S1…S5`) is superseded; `storyboard/flow-guide.md` still applies.

## Next on the local machine: Google Flow

1. Open the Browser pane (desktop app) or use Claude in Chrome, and sign in to Google as the account with Flow credits (**pipihiri2021**) yourself.
2. Follow [`storyboard/flow-guide.md`](storyboard/flow-guide.md) §1: build the ingredients first (DP → creature → chrysalis and G2 → props → locations), picking one image at each step.
3. Then generate Episode 1 frames from [`episode-01/flow-prompts.md`](episode-01/flow-prompts.md), hero frames first. Save them as `episode-01/frames/<SHOT>.png` (e.g. `SC06C.png`) and run `python3 flutter/episode-01/build.py`.
