# 100 Prisoners and the Hat Line (reel)

1:48 vertical puzzle reel (720×1280, 30 fps) with English voice-over: `prisoners-hats.mp4`. A companion to `../prisoners-bulb/`, with the same characters and style.

The classic hat puzzle: 100 prisoners stand in a line, each with a red or blue hat, and can see only the hats in front of them. From the back, each says one word; naming your own hat colour sets you free. After a 10-second "comment your plan" countdown, the reel explains the parity code: the back prisoner says BLUE if they see an even number of red hats and RED if odd. Everyone else adds the reds heard behind them to the reds seen ahead and compares with the code. A worked example with five prisoners shows it, then the full line of 100: 99 go free guaranteed, and the back prisoner has a 50/50 chance.

- `vo.py`: the narration and caption for each scene, voiced with Kokoro TTS (`af_heart`) into `vo/*.wav`, plus `vo.js`.
- `reel.html`: the animation. It shares its character, prison and countdown code with `../prisoners-bulb/reel.html` and adds the hats.
- `render.js` and `audio.py`: render the frames with Playwright and write `cues.json`, then mix `soundtrack.wav` (voice, music bed, sound effects).

Rebuild:

```sh
python vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart   # only when the narration changes
node render.js video video_silent.mp4 30
python3 audio.py cues.json
ffmpeg -y -i video_silent.mp4 -i soundtrack.wav -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart prisoners-hats.mp4
```
