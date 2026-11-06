# 100 Prisoners and a Light Bulb (reel)

1:48 vertical puzzle reel (720×1280, 30 fps) with English voice-over: `prisoners-bulb.mp4`.

The classic logic puzzle: 100 prisoners who can never talk, one random prisoner a day visits a room with a single bulb, and anyone may announce that all 100 have visited (right = everyone free, wrong = locked up forever). After a 10-second "comment your plan" countdown, the reel explains the counter strategy with a worked example, a tally montage, and the real expected time: 100·H₉₉ + 9,900 ≈ 10,418 days, about 28.5 years.

- `vo.py`: the narration and caption for each scene, voiced with Kokoro TTS (`af_heart`) into `vo/*.wav`, plus `vo.js`.
- `reel.html`: the animation (original characters and prison art). Each scene is one narration line; actions sit at fractions of their scene.
- `render.js`: renders the frames with Playwright and writes the timed cues to `cues.json`.
- `audio.py`: mixes `soundtrack.wav` (voice, a pizzicato music bed ducked under it, sound effects) from `cues.json`.

Rebuild:

```sh
# only when the narration changes (needs: pip install kokoro-onnx soundfile, plus the
# kokoro-v1.0.onnx and voices-v1.0.bin files from the kokoro-onnx GitHub releases)
python vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart

node render.js video video_silent.mp4 30
python3 audio.py cues.json
ffmpeg -y -i video_silent.mp4 -i soundtrack.wav -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart prisoners-bulb.mp4
```
