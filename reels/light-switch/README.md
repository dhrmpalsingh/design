# Light Switch Riddle (reel)

68.6-second vertical riddle reel (720×1280, 30 fps) with voice-over: `light-switch-riddle.mp4`.

- `reel.html`: the animation, drawn as SVG from time `t`. Open it in a browser to play (click or space to pause, arrow keys to scrub). Captions and timings are in `CAPS` and `SCENES`.
- `vo.py`: the narration script. It voices each line with Kokoro TTS (`af_heart` voice) into `vo/*.wav` and writes `vo.js`. A scene stretches slightly when its lines need more time than the animation gives.
- `render.js`: renders the frames to video with Playwright and writes the timed cues to `cues.json`.
- `audio.py`: mixes `soundtrack.wav` (voice, music ducked under it, sound effects) from `cues.json`.

Rebuild:

```sh
# only when the narration changes (needs: pip install kokoro-onnx soundfile, plus the
# kokoro-v1.0.onnx and voices-v1.0.bin files from the kokoro-onnx GitHub releases)
python vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart

node render.js video video_silent.mp4 30
python3 audio.py cues.json
ffmpeg -y -i video_silent.mp4 -i soundtrack.wav -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart light-switch-riddle.mp4
```
