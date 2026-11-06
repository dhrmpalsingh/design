# Light Switch Riddle (reel)

65-second vertical riddle reel (720×1280, 30 fps): `light-switch-riddle.mp4`.

- `reel.html`: the animation, drawn as SVG from time `t`. Open it in a browser to play (click or space to pause, arrow keys to scrub). Captions and timings are in `CAPS` and `SCENES`.
- `render.js`: renders the frames to video with Playwright and writes the sound cues to `sfx.json`.
- `audio.py`: builds `soundtrack.wav` (music loop and sound effects) from `sfx.json`.

Rebuild:

```sh
node render.js video video_silent.mp4 30
python3 audio.py sfx.json
ffmpeg -y -i video_silent.mp4 -i soundtrack.wav -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart light-switch-riddle.mp4
```
