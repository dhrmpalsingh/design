// Renders reel.html to video frames.
//   node render.js stills 2.5,12,30 out_dir   -> PNG stills at those times
//   node render.js video out.mp4 [fps]        -> silent H.264 video + sfx.json
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
  const [mode, arg1, arg2] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'reel.html') + '?render=1');
  await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);

  if (mode === 'stills') {
    const times = arg1.split(',').map(Number);
    fs.mkdirSync(arg2, { recursive: true });
    for (const t of times) {
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: path.join(arg2, `t${String(t.toFixed(2)).padStart(6, '0')}.png`) });
    }
  } else {
    const fps = +(arg2 || 30);
    fs.writeFileSync(path.join(__dirname, 'sfx.json'), JSON.stringify(await page.evaluate(() => window.SFX)));
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', arg1], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(dur * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.renderAt(t), i / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log(`frame ${i}/${n}`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
