# 100 Prisoners and 100 Boxes (reel)

`prisoners-boxes.mp4`: 1:33, 720×1280. Third in the prison series. Each prisoner may open 50 of 100 boxes to find their own number, and all must succeed. Random guessing: (½)¹⁰⁰ ≈ 1 in 1.27×10³⁰. The loop strategy (open your own number's box, then follow the numbers inside) succeeds whenever no cycle is longer than 50: 1 − (H₁₀₀ − H₅₀) ≈ 31.2%.

Built with `../kit`: narration in `lines.json`, scenes in `scenes.js`. Rebuild with `../kit/build.sh prisoners-boxes`.
