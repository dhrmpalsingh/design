# Floating House (reel)

73-second vertical explainer (720×1280, 30 fps) with voice-over and word-by-word captions: `floating-house.mp4`.

The story builds an amphibious house one problem at a time: a pit of water (it sinks), a hollow concrete box (it floats), ballast tanks and a pump (it stops tipping), steel posts with rings (it can't drift), and coiled utility lines (nothing snaps). Then a flood comes and the house rises.

- `vo.py`: the narration script. It voices each line with Kokoro TTS (`af_heart` voice) into `vo/*.wav`, estimates word timings for the captions, and writes `vo.js`.
- `reel.html`: the animation, one continuous SVG cross-section with a moving camera. Each scene is one narration line, and every action is placed at a fraction of its scene (see `TR` and `CAM`). Open it in a browser to play.
- `render.js`: renders the frames with Playwright and writes the timed cues to `cues.json`.
- `audio.py`: mixes `soundtrack.wav` (voice, a music bed ducked under it, sound effects, rain) from `cues.json`.

Rebuild:

```sh
# only when the narration changes (needs: pip install kokoro-onnx soundfile, plus the
# kokoro-v1.0.onnx and voices-v1.0.bin files from the kokoro-onnx GitHub releases)
python vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart

node render.js video video_silent.mp4 30
python3 audio.py cues.json
ffmpeg -y -i video_silent.mp4 -i soundtrack.wav -c:v libx264 -crf 20 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart floating-house.mp4
```

## 3D version

`floating-house-3d.mp4` is the same story, voice-over and sound, rendered in 3D with Three.js: real lighting and soft shadows, a furnished cutaway house, a ground cross-section with soil and bedrock layers, translucent water with moving waves, and a storm.

- `reel3d.html`: the 3D scene. It reuses the 2D version's timing through `timeline.js`, so both stay in sync with `cues.json` and the soundtrack.
- `timeline.js`: the shared timing, state tracks and captions, extracted from `reel.html` (lines 27–147 and 428–469). Re-extract it if those parts of `reel.html` change.
- `render3d.js`: serves the folder locally (the page loads ES modules) and renders the frames with headless Chromium's software WebGL, about 1 second per frame.

```sh
npm install                       # installs three@0.160.0
node render3d.js video video3d_silent.mp4 30
ffmpeg -y -i video3d_silent.mp4 -i soundtrack.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart floating-house-3d.mp4
```
