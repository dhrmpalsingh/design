# How Kavach stops trains from colliding (reel)

`kavach.mp4`: about 1:50, 1080×1920, 24 fps. A 3D night-time explainer of Kavach, Indian Railways' own automatic train protection system, in the style of `../space-elevator` and `../underwater-house`. The narration is original English (Kokoro TTS, `af_heart`).

Story, one scene per narration line:

1. Two trains head toward each other on one track; both brake by themselves and stop about 384 m apart (live gap and speed readout).
2. *Kavach* means armour; a shield emblem over the stopped engine.
3. **Step 1, location**: GPS can't tell which of three parallel tracks (about 5 m apart) a train is on → RFID tag pairs between the rails (about one per km, and at every signal) → a reader under the engine scans a tag (position, direction, track).
4. **Step 2, signals**: the station Kavach unit is wired to signals S-1 (green) and S-2 (red); a radio tower streams that to every engine in range.
5. **Step 3, braking**: the engine draws a braking curve to the red signal; it warns the driver, then brakes by itself and stops short of the signal.
6. The cab screen: speed against the limit and the next signal, visible through fog.
7. Two Kavach engines on the same track detect each other and both stop.
8. Cost cards: about ₹50 lakh per km of track and about ₹80 lakh per engine.
9. A schematic map (city dots, not to scale) with the Delhi–Mumbai and Delhi–Howrah corridors drawn in: about 2,490 km live with Kavach 4.0, 21,794 km of trackside work under way, 6,290 engines fitted.
10. A comment poll ("Is Kavach on your route?") and Follow.

Facts used (from Ministry of Railways replies in the Lok Sabha, as reported in 2025–26): trackside about ₹50 lakh/km, about ₹80 lakh per locomotive; Kavach 4.0 commissioned on about 2,490 route km of the Delhi–Mumbai and Delhi–Howrah corridors (July 2026); trackside work on 21,794 route km and 6,290 locomotives fitted (August 2026). Figures keep changing, so check them before reposting.

- `lines.json` and `vo.py`: the narration, written to `vo.js` and `vo/*.wav` with word timings for the captions.
- `reel3d.html`: the scene (Three.js 0.160 with bloom; `npm install`). Tracks, catenary, trees, station, signals, tags, radio tower and both trains are built in code.
- `render3d.js`: renders frames headless.
- Sound: `python3 ../kit/audio.py cues.json` (music `space`, with horn, brake hiss, alarm, radio and coin effects).

```sh
npm install
python vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart        # when lines.json changes
D=frames; for r in "0 660" "660 1320" "1320 1980" "1980 2640"; do set -- $r; RES=1080 node render3d.js frames $1 $2 $D 24 & done; wait
python3 ../kit/audio.py cues.json
ffmpeg -y -framerate 24 -i $D/f%05d.jpg -i soundtrack.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart kavach.mp4
```
