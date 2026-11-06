// Renders reel3d.html (served over a local HTTP server, since it loads ES modules).
//   node render3d.js stills 2.5,12,30 out_dir
//   node render3d.js video out.mp4 [fps]   -> silent H.264 video + cues.json
//   node render3d.js frames START END dir [fps] -> numbered JPEGs (run several in parallel, then join with ffmpeg)
// Env: RES=1080 for 1080x1920 (default 720), AO=0 to turn off ambient occlusion.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.json': 'application/json' };

(async () => {
  const [mode, arg1, arg2] = process.argv.slice(2);
  const RES = +(process.env.RES || 720), AO = process.env.AO === '0' ? '0' : '1', VW = RES, VH = Math.round(RES * 16 / 9);
  const server = http.createServer((req, res) => {
    const f = path.join(__dirname, decodeURIComponent(req.url.split('?')[0]));
    if (!f.startsWith(__dirname) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  }).listen(0);
  const port = server.address().port;
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('PAGE ERROR', e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('console', m.type(), m.text()); });
  await page.goto(`http://localhost:${port}/reel3d.html?render=1&res=${RES}&ao=${AO}${process.env.QX || ''}`);
  await page.waitForFunction(() => window.ready, null, { timeout: 120000 });
  await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);

  if (mode === 'frames') {   // node render3d.js frames START END out_dir [fps]: numbered JPEGs for parallel chunks
    const [start, end, dir, fpsArg] = process.argv.slice(3), fps = +(fpsArg || 30);
    fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(dur * fps), t0 = Date.now();
    for (let i = +start; i < Math.min(+end, n); i++) {
      const f = path.join(dir, `f${String(i).padStart(5, '0')}.jpg`);
      if (fs.existsSync(f)) continue;
      await page.evaluate(t => window.renderAt(t), i / fps);
      fs.writeFileSync(f + '.tmp', await page.screenshot({ type: 'jpeg', quality: 93 }));
      fs.renameSync(f + '.tmp', f);
      if (i % 50 === 0) console.log(`frame ${i} (${start}-${end})  ${((Date.now() - t0) / 60000).toFixed(1)} min`);
    }
    if (+start === 0) fs.writeFileSync(path.join(__dirname, 'cues.json'), JSON.stringify(await page.evaluate(() => window.cues()), null, 1));
  } else if (mode === 'stills') {
    const times = arg1.split(',').map(Number);
    fs.mkdirSync(arg2, { recursive: true });
    for (const t of times) {
      const t0 = Date.now();
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: path.join(arg2, `t${String(t.toFixed(2)).padStart(6, '0')}.png`) });
      console.log(`t=${t} ${Date.now() - t0}ms`);
    }
  } else {
    const fps = +(arg2 || 30);
    fs.writeFileSync(path.join(__dirname, 'cues.json'), JSON.stringify(await page.evaluate(() => window.cues()), null, 1));
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', arg1], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(dur * fps), start = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.renderAt(t), i / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 60 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - start) / 1000 / 60).toFixed(1)} min`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
  server.close();
})();
