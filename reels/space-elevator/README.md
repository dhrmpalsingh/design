# What if you could take an elevator to space? (reel)

`space-elevator.mp4`: about 1:50, 1080×1920, 24 fps. A 3D "what if" explainer with five sets:

- **Ocean**: a floating equator platform (pontoons, columns, deck, helipad, anchor tower, crane, laser dish) on animated waves under a gradient sky with clouds; a storm in the distance; a sunset ending.
- **Space**: a procedural Earth (continents, ice caps, clouds, city lights on the night side, atmosphere glow, ocean glint), the cable to geostationary orbit and the counterweight, satellites in low and geostationary orbit, debris to dodge, and a capsule flung off past orbit.
- **Ascent**: the climber on the ribbon with the real-scale Earth (6,371 km radius) shrinking below and a live altitude, speed and day readout.
- **Lab**: steel and Kevlar cables snapping, and a graphene sheet rolling into a carbon nanotube atom by atom; the record nanotube on a ruler.
- **Cabin**: weight falling as you climb (computed from gravity minus the spin: 70 kg at the surface, 0 at geostationary orbit), then floating.

Facts used (checked): geostationary orbit 35,786 km up, one orbit per day; steel breaks under its own weight after about 32 km and Kevlar after about 255 km (breaking length = strength / (density × g)); a tapered carbon-nanotube ribbon; 200 km/h takes about 7.5 days to orbit; a 100,000 km cable end moves at about 7.8 km/s, above the 2.7 km/s escape speed there; the longest nanotube made is about 0.55 m.

- `lines.json` and `vo.py`: the narration (Kokoro TTS, `af_heart`) with word timings, written to `vo.js` and `vo/*.wav`.
- `reel3d.html`: the scene (Three.js 0.160 with a logarithmic depth buffer and bloom; `npm install`).
- `render3d.js`: renders frames headless; run three `frames` workers in parallel at `RES=1080`.
- Sound: `python3 ../kit/audio.py cues.json` (music `space`).

```sh
npm install
D=frames; for r in "0 876" "876 1752" "1752 2630"; do set -- $r; RES=1080 node render3d.js frames $1 $2 $D 24 & done; wait
python3 ../kit/audio.py cues.json
ffmpeg -y -framerate 24 -i $D/f%05d.jpg -i soundtrack.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart space-elevator.mp4
```
