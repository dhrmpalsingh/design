#!/bin/bash
# Build a puzzle reel. Run from the reel folder:  ../kit/build.sh OUTPUT_NAME
# (narration first, when lines.json changes:  python ../kit/vo.py kokoro-v1.0.onnx voices-v1.0.bin af_heart)
set -e
rm -f cues.json
node ../kit/render.js video video_silent.mp4 30 > render.log 2>&1 &
RP=$!
until [ -f cues.json ]; do sleep 1; done
python3 ../kit/audio.py cues.json
wait $RP
ffmpeg -v error -y -i video_silent.mp4 -i soundtrack.wav -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100" -c:a aac -b:a 192k -shortest -movflags +faststart "$1.mp4"
rm -f video_silent.mp4 render.log
ffprobe -v error -show_entries format=duration -of csv=p=0 "$1.mp4"
