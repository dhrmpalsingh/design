# Run Episode 1 in Google Flow (local session + Chrome)

Steps for a **local** Claude Code session connected to Chrome. A cloud session can't reach Chrome or Flow.

## Start it (on your computer)

```
cd design                                   # your clone of dhrmpalsingh/design
claude --teleport session_01C1zqSKbQJJ8p2VksSMHbFX
```

Then type `/chrome` in the session and connect the Claude in Chrome extension. Run `/chrome` again later if the connection drops. In Chrome, be signed in to Google as **pipihiri2021** and allow Claude on `labs.google`.

## What the session should do

1. Open Flow (labs.google/flow) in a new tab and create or open the project **FLUTTER**.
2. **Ingredients first** ([`../storyboard/flow-guide.md`](../storyboard/flow-guide.md) §1):
   - Upload `flutter/reference/DP-C01.png`, `DP-C02.png` and `DP-C03.png`.
   - Run the four DP consistency tests (§1.1) and show them to Dharampal.
   - **Stop and let him approve the likeness before continuing.**
   - Generate the creature (§1.2), the chrysalis (§1.3) and the location plates (§1.6). For each one, show the 4 options and let him pick.
3. **Hero frames**, in the order listed in [`flow-prompts.md`](flow-prompts.md):
   - For each one, attach the listed references and paste the image prompt.
   - Settings: Nano Banana Pro · 16:9 · 4 outputs.
   - Show the options, then download the chosen image to `flutter/episode-01/frames/<SHOT>.png`.
4. Run `python3 flutter/episode-01/build.py`, then commit and push to `claude/dream-sequence-film-di9de1`.
5. Then continue with the remaining shots, scene by scene.

## Rules

- Never sign out of, or change, anything on the Google account. Spend credits only on FLUTTER generations.
- Stop and ask before anything that costs credits beyond the batch Dharampal approved.
- Reject frames that break the locks: a face that doesn't match the reference, a creature that glows, dust or visible light beams before SC17E, neon, readable text in the image.
