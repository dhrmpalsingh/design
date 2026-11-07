# What if the Sun suddenly disappeared? (reel)

`sun-disappeared.mp4`: about 1:32, 1080×1920, 24 fps. A 3D "what if" explainer with five sets:

- **Solar system**: a glowing Sun (shader surface, corona, bloom) that vanishes in a flash. A light front and a gravity ripple on a spacetime grid spread outward at light speed. Earth and the Moon stay on their orbit for 8 min 20 s, then fly off in a straight line. At the end Earth drifts past the Milky Way among other rogue planets.
- **Coast**: a cottage, lamps, trees and sea under a day sky that turns black at T + 8:20, with stars appearing and lamps switching on. The Moon goes dark a second later while Jupiter stays lit for over an hour. In a meadow, grass and flowers wilt over weeks. The land frosts and the sea freezes as the temperature counter falls to −70 °C. Finally the frozen air falls as snow.
- **Ice**: a cutaway of the frozen ocean, with an ice lid over liquid water.
- **Vent**: a deep-sea hydrothermal vent with smoking chimneys, tube worms and shrimp, lit by an ROV spotlight.
- **Bunker**: a section through the rock, 60 m down. It shows a living room with bunks and supplies, a grow-light room, a reactor room, and a geothermal pipe down to the heat below.

Facts used (checked):
- Sunlight takes about 8 min 20 s to reach Earth, and changes in gravity also travel at the speed of light.
- Jupiter is about 35 to 52 light-minutes away, so it stays lit for well over half an hour and up to about an hour and a half (shown as "over an hour").
- Earth's orbital speed is about 30 km/s.
- Without sunlight, Earth's average temperature would fall below freezing within about a week and to around −70 °C within a year. Ice insulates the oceans, so liquid water lasts a very long time underneath.
- Vent ecosystems run on chemosynthesis.
- Over a much longer time, nitrogen and oxygen freeze out of the air.
- Rogue planets probably number in the billions in our galaxy.
- The Sun has about 5 billion years left.

Files:
- `lines.json` and `vo.py`: the narration (Kokoro TTS, `af_heart`) with word timings, written to `vo.js` and `vo/*.wav`.
- `reel3d.html`: the scene (Three.js 0.160 with a logarithmic depth buffer, bloom and a procedural Earth that can go dark and freeze; `npm install`).
- `render3d.js`: renders frames headless; run three `frames` workers in parallel at `RES=1080`.
- Sound: `python3 ../kit/audio.py cues.json` (music `space`).

```sh
npm install
D=frames; for r in "0 736" "736 1472" "1472 2210"; do set -- $r; RES=1080 node render3d.js frames $1 $2 $D 24 & done; wait
python3 ../kit/audio.py cues.json
ffmpeg -y -framerate 24 -i $D/f%05d.jpg -i soundtrack.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart sun-disappeared.mp4
```
