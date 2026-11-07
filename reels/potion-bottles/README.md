# The Potion and 1,000 Bottles (reel)

`potion-bottles.mp4`: 1:28, 720×1280. One of 1,000 bottles holds a potion that turns your tongue green after exactly a day, and the feast is in 24 hours with only 10 tasters. The answer is binary: tasters stand for 1, 2, 4 … 512, and each sips every bottle whose number includes their value. The green tongues add up to the bottle's number (worked example: 7 bottles, tasters 1, 2, 4, and green on 1 and 4 means bottle 5). 10 tasters cover up to 2¹⁰ − 1 = 1,023 bottles.

Built with `../kit`: narration in `lines.json`, scenes in `scenes.js`. Rebuild with `../kit/build.sh potion-bottles`.
