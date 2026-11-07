# What if you built a house underwater? (reel)

`underwater-house.mp4`: about 1:28, 1080×1920, 24 fps. A 3D "what if" explainer in the style of `../floating-house`. Each step fixes the last problem:

1. An ordinary house lowered 10 m down floods in seconds.
2. A sealed steel shell, but at 10 m the water presses with about 10 tonnes on every square metre (ρgh ≈ 100 kPa).
3. Flat walls buckle, so the hull is curved like a submarine.
4. A hull full of air floats (about 1 tonne of lift per m³ of air), so it gets a heavy concrete base and seabed anchors.
5. Curved acrylic windows, many centimetres thick.
6. An airlock: swim in, close the hatch, pump out the water.
7. Fresh air down a hose from a surface buoy, with CO₂ scrubbers.
8. Insulation and heaters, since water draws heat about 25× faster than air.
9. Outside lights, because water absorbs red light within the first few metres.
10. Real-world close: the Aquarius lab, 19 m deep off Florida, where scientists live for days at a time.

Realism features: ambient occlusion, soft shadows, animated caustics on the seabed and hull, light shafts, a rippling surface seen from below, depth fog, red-light loss (a colour-grade pass), marine snow, schooling fish, swaying seagrass, coral and rocks.

- `lines.json` and `vo.py`: the narration (Kokoro TTS, `af_heart`) with word timings for the captions, written to `vo.js` and `vo/*.wav`.
- `reel3d.html`: the scene (Three.js 0.160, `npm install`).
- `render3d.js`: renders frames headless; run three `frames` workers in parallel at `RES=1080`.
- Sound: `python3 ../kit/audio.py cues.json` (music `deep`).

```sh
npm install
D=frames; for r in "0 700" "700 1400" "1400 2101"; do set -- $r; RES=1080 node render3d.js frames $1 $2 $D 24 & done; wait
python3 ../kit/audio.py cues.json
ffmpeg -y -framerate 24 -i $D/f%05d.jpg -i soundtrack.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart underwater-house.mp4
```
