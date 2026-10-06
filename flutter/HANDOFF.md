# FLUTTER — Handoff (cloud → local)

Where things stand when this work moved from the cloud session to Dharampal's computer.

## Done and pushed

- **Pre-production locks** (proposed v0.1): [world rules](01-world-rules.md), [protagonist](02-protagonist.md), [creature](03-creature.md), [39 story beats](04-story-beats.md), [21 decisions](05-decisions.md)
- **Protagonist look locked** from [`reference/protagonist-C01-C03.webp`](reference/protagonist-C01-C03.webp). Played by **Dharampal (DP)**.
- **Google Flow guide**: [`storyboard/flow-guide.md`](storyboard/flow-guide.md), with ingredient prompts for DP, the creature, the chrysalis, props, characters and locations
- **Storyboard renderer**: [`storyboard/render.py`](storyboard/render.py). It turns `storyboard/data/*.json` into storyboard pages, Flow prompt pages, a hero-frame list and a CSV, and embeds frames from `storyboard/frames/`.

## Stopped before finishing

1. **Protagonist name.** The naming workflow produced 18 candidates ([`name-candidates.md`](name-candidates.md)) but was stopped before judging and fact-checking. The docs still say "Sameer" in places; the storyboard and Flow material say **DP**. Next: pick the name, verify its meaning, then replace "Sameer" across `flutter/*.md`.
2. **Storyboard shots.** The storyboard workflow was stopped before writing any data. Next: write `storyboard/data/S1-the-world.json` … `S5-hunt-and-ending.json`, then run `python3 flutter/storyboard/render.py`.
   - One shot object per shot, with keys `id` (e.g. `B07-A`), `beat`, `title`, `duration_s`, `shot_size`, `angle`, `lens_mm`, `camera`, `frame`, `action`, `light_colour`, `sound`, `text_on_screen`, `transition`, `keyframe_prompt`, `motion_prompt`, `refs`, `notes`.
   - Shot durations must add up to each beat's time range in [`04-story-beats.md`](04-story-beats.md).
   - Keyframe prompts must be self-contained, include the character and creature text blocks when those are in frame, never ask for rendered text, and end with *"cinematic film still, 2.39:1 composition, … photoreal, no text"*.
   - Sequences: S1 = beats 1–7 (0:00–3:00), S2 = 8–13 (3:00–5:30), S3 = 14–17 (5:30–8:30), S4 = 18–25 (8:30–11:45), S5 = 26–39 (11:45–16:30).

## Next on the local machine: Google Flow

1. Open the Browser pane (desktop app) or use Claude in Chrome, and sign in to Google as the account with Flow credits (**pipihiri2021**) yourself.
2. Follow [`storyboard/flow-guide.md`](storyboard/flow-guide.md) §1: build the ingredients first (DP → creature → chrysalis and G2 → props → locations), picking one image at each step.
3. Then generate shot frames from `storyboard/flow/`, hero frames first. Save them as `storyboard/frames/<shot-id>.png` and run the renderer.
