# Reel kit

Shared code for the puzzle reels (`../prisoners-boxes`, `../potion-bottles`, `../bridge-night`, `../missing-dollar`, `../three-doors`).

- `kit.js`: drawing helpers, the characters (prisoners, warden, and outfits via `body`, `tie`, `crown`, `cap`, `tongue`, `hat`), the timeline built from `vo.js`, caption pills, the 10-second countdown card and the frame/player loop (`startReel`).
- `template.html`: the page each reel's `reel.html` is made from. It loads `vo.js`, `kit.js` and the reel's own `scenes.js`.
- `vo.py`: voices a reel's `lines.json` (`[narration, caption, extra hold]` per scene) with Kokoro TTS into `vo/*.wav` and `vo.js`.
- `render.js`, `audio.py`, `build.sh`: render the frames, mix the soundtrack (voice, music bed `mystery` or `bright`, sound effects) and produce the MP4.
- `preview.js`: one still per scene, tiled, for a quick check.

Make or rebuild a reel, from its folder:

```sh
python ../kit/vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart   # when lines.json changes
node ../kit/preview.js /tmp/preview                             # optional check
../kit/build.sh OUTPUT_NAME
```
