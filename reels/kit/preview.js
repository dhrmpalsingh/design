// Renders one still per scene (at fraction F of each scene) and tiles them: node ../kit/preview.js OUT_DIR [F]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
(async () => {
  const out = process.argv[2], f = +(process.argv[3] || .75);
  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 720, height: 1280 } });
  p.on('pageerror', e => console.log('PAGE ERROR', e.message));
  await p.goto('file://' + path.join(process.cwd(), 'reel.html') + '?render=1'); await p.evaluate(() => window.ready);
  const v = await p.evaluate(() => window.cues().vo.map(x => x.t).concat([window.DUR]));
  console.log('duration', v[v.length - 1].toFixed(1), 's');
  for (let i = 0; i < v.length - 1; i++) {
    const t = v[i] + (v[i + 1] - v[i]) * f;
    await p.evaluate(t => window.renderAt(t), t);
    await p.screenshot({ path: path.join(out, `s${String(i).padStart(2, '0')}.png`) });
  }
  await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(out, 's*.png'), '-vf', 'scale=200:-1,tile=7x3', '-frames:v', '1', path.join(out, 'sheet.jpg')]);
})();
