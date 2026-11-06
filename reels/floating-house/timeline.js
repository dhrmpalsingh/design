// Shared timeline for reel3d.html: extracted from reel.html (math, voice-over timing,
// state tracks, sound cues, captions). Regenerate with the sed command in README if reel.html changes.
// ---------------------------------------------------------------------------
const W = 720, H = 1280;
const C = {
  ink: '#232026', skyTop: '#79C0EA', skyBot: '#D9F0FA', stormTop: '#465463', stormBot: '#8D9AA4',
  grass: '#77B25A', grassDark: '#5E9446', soil: '#B97A4C', soil2: '#A86C42', soilLine: '#9C6139', pit: '#7A4D32',
  rock: '#7E7B82', rock2: '#6C6970', water: 'rgba(52,156,212,.55)', waterLine: '#E6F6FF',
  wall: '#F4EADB', wallLine: '#E5D8C2', roof: '#4E6178', roof2: '#5E728B', accent: '#E07B47', glass: '#A3D3E8',
  room1: '#EADFCD', room2: '#DCE6EC', concrete: '#BAB7AF', concrete2: '#A6A39B', air: '#EFEEE9',
  tank: '#4FA6D3', steel: '#A3ACB6', steel2: '#7F8893', ring: '#F2C230', red: '#E2574C', blue: '#2F7FC1',
};
const FONT = "Fredoka, Inter, sans-serif";
const GRADE = 600, PX0 = 120, PX1 = 600, PBOT = 1080, BED = 1160;

// ---------- math ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, b) => b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeIn = x => x * x * x;
const easeInOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const backOut = x => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const f1 = n => Math.round(n * 10) / 10;
function hex2rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(a, b, p) { const A = hex2rgb(a), B = hex2rgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(p)))).join(',')})`; }
function rnd(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
function track(t, ks) { // [[time, value, ease?], ...]
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 0; i < ks.length - 1; i++) {
    const [ta, va] = ks[i], [tb, vb, e] = ks[i + 1];
    if (t <= tb) return lerp(va, vb, (e || easeInOut)(prog(t, ta, tb)));
  }
  return ks[ks.length - 1][1];
}
const mctx = document.createElement('canvas').getContext('2d');
function tw(text, size, weight = 600) { mctx.font = `${weight} ${size}px Fredoka`; return mctx.measureText(text).width; }
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function text(x, y, str, { size = 30, weight = 600, fill = C.ink, anchor = 'middle', opacity = 1, stroke = '', sw = 0 } = {}) {
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"` : '';
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fill}" opacity="${opacity}"${st}>${esc(str)}</text>`;
}

// ---------- timeline from the voice-over ----------
const VO = window.VO || [];
const LEAD = 0.35, GAP = 0.25;
const S = []; let acc = LEAD;
VO.forEach(l => { S.push(acc); acc += l.dur + GAP + l.extra; });
const VDUR = acc + 0.1;
const SE = i => (i + 1 < S.length ? S[i + 1] : VDUR);
const T = (i, f = 0) => S[i] + f * (SE(i) - S[i]);

// ---------- state tracks ----------
const TR = {
  crane: [[0, 0], [T(1, 0), 0], [T(1, .1), 1], [T(2, .3), 1], [T(2, .45), 0], [T(4, 0), 0], [T(4, .12), 1], [T(5, .3), 1], [T(5, .45), 0]],
  hbPre: [[0, GRADE], [T(1, .1), GRADE], [T(1, .28), 470], [T(2, 0), 470], [T(2, .28), 650], [T(2, .4), 656, easeOut], [T(2, .95), PBOT - 2], [T(4, .12), PBOT - 2], [T(4, .45), 440], [T(5, 0), 440], [T(5, .3), 610]],
  pit: [[T(1, .28), 0], [T(1, .62), 1]],
  water: [[0, PBOT], [T(1, .6), PBOT], [T(1, .95), 640], [T(10, .3), 640], [T(10, .55), 592], [T(10, .8), 660], [T(10, 1), 640],
    [T(11, .3), 640], [T(11, .56), 585], [T(11, .9), 585], [T(12, .15), 640], [T(12, .3), 640], [T(12, .55), 585], [T(12, .85), 640],
    [T(13, .08), 640], [T(13, 1), 400, x => x], [T(14, .5), 380], [T(15, 1), 380]],
  build: [[T(4, .45), 0], [T(4, .92), 1]],
  arrA: [[T(3, 0), 0], [T(3, .12), 1], [T(3, .9), 1], [T(4, .06), 0]],
  arrB: [[T(5, .45), 0], [T(5, .55), 1], [T(5, .95), 1], [T(6, .05), 0]],
  gather: [[T(6, .12), 0], [T(6, .55), 1]],
  tilt: [[T(6, .35), 0], [T(6, .85), -6.5], [T(7, .3), -6.5], [T(7, .88), 0]],
  tanks: [[T(7, 0), 0], [T(7, .18), 1]],
  lvlL: [[T(7, .3), .45], [T(7, .88), .14]],
  lvlR: [[T(7, .3), .45], [T(7, .88), .76]],
  drift: [[T(8, .25), 0], [T(8, .62), 64, easeIn], [T(8, .7), 54, easeOut], [T(8, .8), 62], [T(9, .05), 62], [T(9, .3), 0]],
  post: [[T(9, .2), -260], [T(9, .42), 700, easeOut], [T(9, .5), 700], [T(9, .62), 1040, easeOut], [T(9, .7), 1040], [T(9, .85), 1290, easeOut]],
  rings: [[T(10, 0), 0], [T(10, .2), 1, backOut]],
  pipes: [[T(11, 0), 0], [T(11, .15), 1]],
  coil: [[T(12, .12), 0], [T(12, .28), 1]],
  storm: [[T(13, 0), 0], [T(13, .2), 1], [T(14, .75), 1], [T(15, .35), 0]],
};
const T_SNAP = T(11, .5), T_FLOAT = T(5, .3), T_PUMP = [T(7, .3), T(7, .88)];
const CAM = [ // per scene: cx, cy, zoom
  [360, 440, 1.0], [360, 620, .8], [360, 700, .82], [360, 800, .95], [360, 600, .8], [360, 590, .95], [360, 500, 1.2], [360, 650, 1.35],
  [400, 600, .95], [360, 720, .6], [360, 620, .92], [480, 640, 1.25], [480, 640, 1.25], [360, 520, .78], [360, 420, .84], [360, 430, .88],
];
function state(t) {
  const s = {};
  for (const k in TR) s[k] = track(t, TR[k]);
  // once afloat, the house rides the water
  if (t < T_FLOAT) s.hb = s.hbPre;
  else {
    const dt = t - T_FLOAT;
    s.hb = s.water - 30 + 16 * Math.exp(-dt * 2.2) * Math.sin(dt * 7) + 2.5 * Math.sin(t * 1.6);
  }
  s.tilt += t > T(7, .88) ? .6 * Math.sin(t * 1.3) : 0;
  s.drift += (t > T(10, .6) && t < T(10, .95)) ? 3 * Math.sin(t * 18) * Math.sin(Math.PI * prog(t, T(10, .6), T(10, .95))) : 0;
  s.pumping = t > T_PUMP[0] && t < T_PUMP[1];
  s.snapped = t >= T_SNAP && t < T(12, .15);
  s.pipeOn = s.pipes > 0 && t < T(12, .15);
  // camera: ease into each scene's framing
  let i = 0; while (i + 1 < S.length && t >= S[i + 1]) i++;
  const prev = CAM[Math.max(0, i - 1)], cur = CAM[i];
  const p = i === 0 ? prog(t, 0, SE(0)) : easeInOut(prog(t, S[i], S[i] + Math.min(1.1, .4 * (SE(i) - S[i]))));
  s.cam = cur.map((v, k) => lerp(i === 0 ? [360, 450, 1.08][k] : prev[k], v, p));
  if (i === 13) s.cam[1] = lerp(560, 440, prog(t, T(13, .1), T(13, 1)));
  s.scene = i;
  return s;
}

// ---------- sound cues (mixed by audio.py) ----------
const SFX = [];
for (let i = 1; i < S.length; i++) SFX.push([S[i], 'whoosh']);
SFX.push([T(1, 0), 'crane'], [T(2, .3), 'crane'], [T(4, 0), 'crane'], [T(5, .3), 'crane']);
for (let k = 0; k < 6; k++) SFX.push([T(1, .3 + k * .05), 'dig']);
SFX.push([T(1, .6), 'pour'], [T(2, .28), 'splash'], [T(2, .45), 'bubbles'], [T(2, .93), 'thud']);
SFX.push([T(3, .08), 'pop'], [T(4, .3), 'drip']);
for (let k = 0; k < 4; k++) SFX.push([T(4, .5 + k * .11), 'thunk']);
SFX.push([T(5, .28), 'splash'], [T(5, .5), 'pop'], [T(6, .15), 'steps'], [T(6, .4), 'creak'], [T(7, .05), 'pop'], [T_PUMP[0], 'pump'], [T(7, .8), 'creak']);
SFX.push([T(8, .2), 'wind'], [T(8, .62), 'thud'], [T(9, .42), 'clang'], [T(9, .62), 'clang'], [T(9, .85), 'clang']);
SFX.push([T(10, .1), 'ring'], [T(10, .16), 'ring'], [T(10, .6), 'wind'], [T(11, .05), 'pop'], [T_SNAP, 'snap'], [T_SNAP + .05, 'spray']);
SFX.push([T(12, .15), 'boing'], [T(13, 0), 'rainIn'], [T(13, .3), 'thunder'], [T(14, .2), 'thunder'], [T(15, .45), 'pop'], [T(15, .3), 'chime']);
window.SFX = SFX.sort((a, b) => a[0] - b[0]);
window.cues = () => ({
  dur: VDUR, sfx: SFX.map(([t, k]) => [+t.toFixed(3), k]),
  vo: VO.map((l, i) => ({ t: +S[i].toFixed(3), dur: l.dur, file: l.file, text: l.text })),
  storm: [T(13, 0), T(13, .2), T(14, .75), T(15, .35)], pump: T_PUMP,
});

// ---------- screen space: rain, captions, end card ----------
function rainSVG(st, t) {
  if (st.storm <= .01) return '';
  const R8 = rnd(17);
  let s = `<rect width="720" height="1280" fill="#1E2A36" opacity="${(st.storm * .18).toFixed(3)}"/>`;
  for (let i = 0; i < 130; i++) {
    const x = R8() * 820 - 60, sp = 900 + R8() * 500, y = ((R8() * 1280 + t * sp) % 1380) - 60;
    s += `<path d="M${f1(x)} ${f1(y)} l-10 30" stroke="#D9ECF7" stroke-width="2.5" stroke-linecap="round" opacity="${(st.storm * .75).toFixed(2)}"/>`;
  }
  const fl = Math.max(0, 1 - Math.abs(t - T(13, .3)) * 7) + Math.max(0, 1 - Math.abs(t - T(14, .2)) * 7) * .7;
  if (fl > 0) s += `<rect width="720" height="1280" fill="#fff" opacity="${(fl * .55).toFixed(2)}"/>`;
  return s;
}
const KEY = new Set(['float', 'flood', 'pit', 'water', 'sinks', 'heavy', 'weight', 'concrete', 'hollow', 'air', 'floats', 'tip', 'tanks', 'pump', 'level', 'sideways', 'bank', 'posts', 'bedrock', 'rings', 'never', 'snap', 'coiled', 'stretch', 'rises', 'safely', 'netherlands', 'follow']);
function captionSVG(t) {
  for (let i = 0; i < VO.length; i++) {
    const ws = VO[i].words, t0 = S[i];
    if (t < t0 || t > t0 + VO[i].dur + .25) continue;
    let k = -1; for (let j = 0; j < ws.length; j++) if (t >= t0 + ws[j].s) k = j;
    if (k < 0) return '';
    const w = ws[k].w.replace(/[.,!?:;]+$/, '').replace(/\.\.\.$/, '');
    const pop = prog(t, t0 + ws[k].s, t0 + ws[k].s + .12);
    const sc = 1.18 - .18 * easeOut(pop);
    const key = KEY.has(w.toLowerCase().replace(/[^a-z]/g, ''));
    let size = 78; while (tw(w, size, 700) > 640 && size > 40) size -= 2;
    return `<g transform="translate(360 262) scale(${sc.toFixed(3)})">
      ${text(0, 6, w, { size, weight: 700, fill: 'rgba(0,0,0,.35)', stroke: 'rgba(0,0,0,.35)', sw: 14 })}
      ${text(0, 0, w, { size, weight: 700, fill: key ? '#FFD34D' : '#FFFFFF', stroke: C.ink, sw: 12 })}</g>`;
  }
  return '';
}
function endCard(t) {
  const p = prog(t, T(15, .5), T(15, .58));
  if (p <= 0) return '';
  const sc = .6 + .4 * backOut(p), str = 'Follow for more', size = 40, w = tw(str, size) + 56 + 50, h = 72;
  return `<g transform="translate(360 1150) scale(${sc.toFixed(3)})">
    <rect x="${-w / 2}" y="${-h / 2 + 6}" width="${w}" height="${h}" rx="30" fill="rgba(0,0,0,.25)"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#2A2D34"/>
    <circle cx="${-w / 2 + 46}" cy="0" r="20" fill="#FFD34D"/><path d="M${-w / 2 + 36} 0 h20 M${-w / 2 + 46} -10 v20" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    ${text(24, 14, str, { size, fill: '#fff' })}</g>`;
}

window.TL = { state, S, T, SE, VDUR, VO, TR, CAM, T_SNAP, T_FLOAT, captionSVG, endCard, rainSVG, cues: window.cues };
