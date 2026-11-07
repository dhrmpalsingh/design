// 100 Prisoners and 100 Boxes: scenes for ../kit/kit.js
const P = (t, i, a, b) => prog(t, T(i, a), T(i, b));
const BOX = '#C99A62', BOXD = '#A97C48', BOXL = '#DDB27A';
function box(x, y, w, n, { open = 0, slip = null, hi = 0, dim = false, numSize = null } = {}) {
  const h = w * .8, ns = numSize || w * .36;
  let s = `<g transform="translate(${f1(x)} ${f1(y)})" opacity="${dim ? .4 : 1}">`;
  if (hi > 0) s += `<rect x="${-w / 2 - 8}" y="${-h / 2 - 8}" width="${w + 16}" height="${h + 16}" rx="10" fill="none" stroke="${C.yellow}" stroke-width="${w * .1}" opacity="${hi.toFixed(2)}"/>`;
  if (open > 0 && slip != null) {
    const sy = -h / 2 - open * h * .62;
    s += `<rect x="${-w * .3}" y="${f1(sy)}" width="${w * .6}" height="${w * .56}" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="${Math.max(2, w * .035)}"/>` + text(0, sy + w * .4, String(slip), { size: w * .34, weight: 700, fill: '#B23A30' });
  }
  s += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * .06}" fill="${BOX}" stroke="${C.ink}" stroke-width="${Math.max(2, w * .045)}"/>`;
  s += `<rect x="${-w * .28}" y="${-h * .12}" width="${w * .56}" height="${h * .48}" rx="${w * .05}" fill="${C.card}" stroke="${C.ink}" stroke-width="${Math.max(1.5, w * .03)}"/>` + text(0, h * .26, String(n), { size: ns, weight: 700 });
  const la = -open * 70;
  s += `<g transform="rotate(${la.toFixed(1)} ${-w / 2} ${-h / 2})"><rect x="${-w / 2 - w * .04}" y="${-h / 2 - w * .16}" width="${w * 1.08}" height="${w * .2}" rx="${w * .05}" fill="${BOXL}" stroke="${C.ink}" stroke-width="${Math.max(2, w * .045)}"/></g>`;
  return s + '</g>';
}
const G = n => [75 + ((n - 1) % 10) * 63, 360 + Math.floor((n - 1) / 10) * 63];
// a fixed shuffle so the 100-box scenes are consistent
const PERM = (() => { const R = rnd(31), a = Array.from({ length: 100 }, (_, i) => i + 1); for (let i = 99; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
const CHAIN = [37, 12, 81, 54]; // the story chain shown for prisoner 37 (drawn, not taken from PERM)
function grid(t, { openSet = {}, hiSet = {}, dimAll = false } = {}) {
  let s = '';
  for (let n = 1; n <= 100; n++) { const [x, y] = G(n); s += box(x, y, 54, n, { open: openSet[n] || 0, slip: openSet[n] ? (CHAIN.includes(n) ? CHAIN[(CHAIN.indexOf(n) + 1) % 4] : PERM[n - 1]) : null, hi: hiSet[n] || 0, dim: dimAll && !hiSet[n] }); }
  return s;
}
function roomBG() { return brickWall(0, 1040, '#353B50', '#3E4560') + floorSVG(1040, '#262A38'); }
function arrowLine(a, b, p, col = C.yellow) {
  if (p <= 0) return '';
  const x = lerp(a[0], b[0], p), y = lerp(a[1], b[1], p), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  return `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(x)} ${f1(y)}" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M${f1(a[0])} ${f1(a[1])} L${f1(x)} ${f1(y)}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
    <path d="M${f1(x + Math.cos(ang) * 14)} ${f1(y + Math.sin(ang) * 14)} L${f1(x + Math.cos(ang + 2.5) * 16)} ${f1(y + Math.sin(ang + 2.5) * 16)} L${f1(x + Math.cos(ang - 2.5) * 16)} ${f1(y + Math.sin(ang - 2.5) * 16)} Z" fill="${col}" stroke="${C.ink}" stroke-width="3"/>`;
}
function loopRing(cx, cy, r, nums, p, { col = C.green, label = '', bad = false } = {}) {
  if (p <= 0) return '';
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-dasharray="${f1(2 * Math.PI * r * p)} 9999" transform="rotate(-90 ${cx} ${cy})" opacity=".9"/>`;
  nums.forEach((n, k) => {
    const a = -Math.PI / 2 + k / nums.length * Math.PI * 2, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    s += popIn(clamp(p * nums.length - k), box(0, 0, 84, n, { numSize: 34 }), x, y);
  });
  if (label) s += chip(label, cx, cy + r + 62, clamp(p * 1.5 - .5), { bg: bad ? '#F6D6D3' : '#D8F0DD', size: 26 });
  return s;
}
const ME = { skin: SK[1], hair: HR[0], hs: 'short' };
const SCENES = [
  // 0: a hundred boxes
  t => { let s = roomBG(); for (let n = 1; n <= 100; n++) { const p = P(t, 0, .02 + n * .004, .1 + n * .004); if (p > 0) { const [x, y] = G(n); s += `<g transform="translate(${x} ${y}) scale(${(.4 + .6 * backOut(p)).toFixed(3)}) translate(${-x} ${-y})">${box(x, y, 54, n)}</g>`; } } for (let k = 0; k < 7; k++) s += bust(70 + k * 97, 1150, 1, SK[k % 5], HR[(k + 1) % 5]); return s; },
  // 1: numbers hidden inside, shuffled
  t => { const os = {}; [5, 23, 48, 66, 91].forEach((n, k) => os[n] = P(t, 1, .2 + k * .1, .3 + k * .1) * (1 - P(t, 1, .8, .95))); return roomBG() + grid(t, { openSet: os }); },
  // 2: open up to fifty
  t => {
    const os = {}, R = rnd(5); let tries = 0;
    for (let k = 0; k < 14; k++) { const n = 1 + Math.floor(R() * 100), a = .2 + k * .05; const p = P(t, 2, a, a + .04) * (1 - P(t, 2, a + .08, a + .12)); if (p > 0) os[n] = p; if (t > T(2, a)) tries = Math.round(1 + k * 49 / 13); }
    return roomBG() + grid(t, { openSet: os }) + person({ ...ME, num: '37', x: 120, y: 1240, s: .62, front: { to: [200, 1000], amt: 1 } }) + chip(`tries: ${tries} / 50`, 470, 1110, P(t, 2, .1, .2), { size: 34 });
  },
  // 3: closed again, no signals
  t => { let s = roomBG() + grid(t); s += bubble(380, 1110, ['psst... box 12!'], P(t, 3, .25, .35), { size: 34 }); const np = P(t, 3, .5, .6); if (np > 0) s += popIn(np, `<circle r="80" fill="none" stroke="${C.red}" stroke-width="16"/><path d="M-57 -57 L57 57" stroke="${C.red}" stroke-width="16" stroke-linecap="round"/>`, 380, 1110); return s; },
  // 4: all must succeed
  t => {
    let s = `<rect width="720" height="1280" fill="#171A26"/>`;
    const a = P(t, 4, .02, .14), b = P(t, 4, .55, .67);
    if (a > 0) { let g = `<rect x="-320" y="-200" width="640" height="400" rx="30" fill="#1F4A33" stroke="${C.ink}" stroke-width="5"/>`; for (let k = 0; k < 10; k++) g += markAt(-252 + k * 56, 40, true, clamp(P(t, 4, .1, .45) * 10 - k), 22); g += text(0, 120, 'all 100 found it', { size: 34, fill: '#fff' }) + pill('EVERYONE FREE', 0, -150, { bg: C.green, size: 34, icon: 'check' }); s += popIn(a, g, 360, 520); }
    if (b > 0) { let g = `<rect x="-320" y="-200" width="640" height="400" rx="30" fill="#4A1E24" stroke="${C.ink}" stroke-width="5"/>`; for (let k = 0; k < 10; k++) g += markAt(-252 + k * 56, 40, k !== 6, 1, 22); g += text(0, 120, 'just one missed', { size: 34, fill: '#fff' }) + pill('NOBODY FREE', 0, -150, { bg: C.red, size: 34 }); s += popIn(b, g, 360, 1010); }
    return s;
  },
  // 5: random chance
  t => {
    let s = `<rect width="720" height="1280" fill="#171A26"/>`;
    s += popIn(P(t, 5, .05, .2), text(0, 0, '(½)¹⁰⁰', { size: 120, weight: 700, fill: '#fff' }), 360, 520);
    s += popIn(P(t, 5, .3, .45), text(0, 0, '= 1 in', { size: 46, fill: '#9AA0B4' }) + text(0, 70, '1,267,650,600,228,', { size: 44, weight: 700, fill: C.yellow }) + text(0, 124, '229,401,496,703,205,376', { size: 44, weight: 700, fill: C.yellow }), 360, 640);
    s += pill('basically 0%', 360, 980, { ...anOr0(popAnim(t, T(5, .65), SE(5) + .2)), bg: C.red, size: 44, weight: 700 });
    return s;
  },
  // 6: countdown
  t => countdownCard(t, T(6) + .5, 'Is there a better plan?', [[box(0, 0, 90, 37), '100 boxes'], [text(0, 22, '50', { size: 76, weight: 700, fill: C.red }), '50 tries each'], [`<circle r="48" fill="none" stroke="${C.red}" stroke-width="10"/><path d="M-34 -34 L34 34" stroke="${C.red}" stroke-width="10" stroke-linecap="round"/>${text(0, 12, 'psst', { size: 26, weight: 700 })}`, 'no signals']], 'Comment your plan'),
  // 7: start with your own number
  t => { const hi = {}; hi[37] = P(t, 7, .35, .5); return roomBG() + grid(t, { hiSet: hi, dimAll: t > T(7, .35) }) + person({ ...ME, num: '37', x: 120, y: 1240, s: .62, expr: 'think' }) + bubble(330, 1080, ['My number is 37...'], P(t, 7, .1, .2), { size: 32, tx: -120 }); },
  // 8: follow the chain
  t => {
    const os = {}, hi = {}; let s = roomBG();
    CHAIN.forEach((n, k) => { const a = .1 + k * .2; os[n] = P(t, 8, a, a + .07); hi[n] = 1; });
    s += grid(t, { openSet: os, hiSet: hi, dimAll: true });
    for (let k = 0; k < 3; k++) { const a = .17 + k * .2; s += arrowLine(G(CHAIN[k]), G(CHAIN[k + 1]), P(t, 8, a, a + .1)); }
    return s + person({ ...ME, num: '37', x: 120, y: 1240, s: .62, expr: 'think' });
  },
  // 9: it loops back
  t => {
    const os = {}, hi = {}; let s = roomBG(); CHAIN.forEach(n => { os[n] = 1; hi[n] = 1; });
    s += grid(t, { openSet: os, hiSet: hi, dimAll: true });
    for (let k = 0; k < 3; k++) s += arrowLine(G(CHAIN[k]), G(CHAIN[k + 1]), 1);
    s += arrowLine(G(CHAIN[3]), G(CHAIN[0]), P(t, 9, .25, .45), C.green) + markAt(G(37)[0], G(37)[1] - 60, true, P(t, 9, .5, .6));
    return s + chip('54 → 37: back to the start!', 360, 1110, P(t, 9, .55, .65), { bg: '#D8F0DD' });
  },
  // 10: eight boxes, four tries
  t => { let s = roomBG(); for (let n = 1; n <= 8; n++) { const p = P(t, 10, .05 + n * .04, .15 + n * .04); s += popIn(p, box(0, 0, 120, n), 150 + ((n - 1) % 4) * 140, 470 + Math.floor((n - 1) / 4) * 190); } return s + person({ ...ME, num: '3', x: 120, y: 1250, s: .62 }) + chip('4 tries', 470, 1110, P(t, 10, .5, .6), { size: 34 }); },
  // 11: 3 -> 6 -> 1 -> 3
  t => demo8(t),
  // 12: loop of three, and the other loops
  t => {
    let s = roomBG();
    s += loopRing(360, 560, 150, [3, 6, 1], P(t, 12, .05, .35), { label: 'loop of 3 → 3 tries ✓' });
    s += loopRing(170, 960, 85, [2, 5], P(t, 12, .5, .7), { label: '2 ✓' }) + loopRing(520, 960, 100, [4, 8, 7], P(t, 12, .6, .8), { label: '3 ✓' });
    return s;
  },
  // 13: when it fails
  t => roomBG() + loopRing(360, 640, 220, [3, 6, 1, 8, 2, 5], P(t, 13, .1, .5), { col: C.red, label: 'loop of 6 > 4 tries ✗', bad: true }),
  // 14: 31 percent
  t => {
    let s = `<rect width="720" height="1280" fill="#171A26"/>`;
    const p = easeOut(P(t, 14, .2, .7)), pct = 31.2 * p, r = 190, circ = 2 * Math.PI * r;
    s += `<circle cx="360" cy="640" r="${r}" fill="none" stroke="#2C3044" stroke-width="60"/><circle cx="360" cy="640" r="${r}" fill="none" stroke="${C.green}" stroke-width="60" stroke-dasharray="${f1(circ * pct / 100)} ${f1(circ)}" transform="rotate(-90 360 640)"/>`;
    s += text(360, 670, `${pct.toFixed(0)}%`, { size: 110, weight: 700, fill: '#fff' }) + text(360, 940, 'no loop longer than 50', { size: 36, fill: '#9AA0B4' });
    return s;
  },
  // 15: from zero to 31%
  t => {
    let s = `<rect width="720" height="1280" fill="#171A26"/>`;
    s += popIn(P(t, 15, .02, .15), text(0, 0, '≈ 0%', { size: 110, weight: 700, fill: '#9AA0B4' }) + `<path d="M-150 -30 L150 -30" stroke="${C.red}" stroke-width="12" stroke-linecap="round" opacity="${P(t, 15, .3, .4)}"/>`, 360, 470);
    s += popIn(P(t, 15, .4, .55), text(0, 0, '31%', { size: 200, weight: 700, fill: C.green, stroke: C.ink, sw: 10 }), 360, 760);
    return s + confetti(t, T(15, .45));
  },
  // 16: end
  t => roomBG() + grid(t, { dimAll: true }) + person({ ...ME, num: '37', x: 360, y: 1210, s: .7, expr: 'happy', front: { to: [460 + Math.sin(t * 9) * 20, 760], amt: easeOut(P(t, 16, .05, .2)) } }) + followPill(t, T(16, .45)),
];
function demo8(t) {
  let s = roomBG();
  const seq = [[3, 6, .14], [6, 1, .36], [1, 3, .58]], pos = n => [150 + ((n - 1) % 4) * 140, 470 + Math.floor((n - 1) / 4) * 190];
  const opened = {};
  seq.forEach(([n, slip, a]) => { opened[n] = [slip, P(t, 11, a, a + .07)]; });
  for (let n = 1; n <= 8; n++) { const o = opened[n]; s += box(...pos(n), 120, n, { open: o ? o[1] : 0, slip: o ? o[0] : null, hi: o && o[1] > 0 ? 1 : 0, numSize: 46 }); }
  s += arrowLine(pos(3), pos(6), P(t, 11, .25, .33)) + arrowLine(pos(6), pos(1), P(t, 11, .47, .55)) + arrowLine(pos(1), pos(3), P(t, 11, .7, .78), C.green);
  const tries = t > T(11, .58) ? 3 : t > T(11, .36) ? 2 : t > T(11, .14) ? 1 : 0;
  s += chip(`tries: ${tries} / 4`, 470, 1110, 1, { size: 34 }) + markAt(pos(1)[0], pos(1)[1] - 150, true, P(t, 11, .8, .88));
  return s + person({ ...ME, num: '3', x: 120, y: 1250, s: .62, expr: t > T(11, .8) ? 'happy' : 'think' });
}
const SFX = [];
VO.forEach((l, i) => { if (i !== 6) SFX.push([S[i] + .05, 'pop']); if (i > 0) SFX.push([S[i], 'whoosh']); });
for (let n = 1; n <= 100; n += 5) SFX.push([T(0, .02 + n * .004), 'tick']);
[5, 23, 48, 66, 91].forEach((n, k) => SFX.push([T(1, .2 + k * .1), 'paper']));
for (let k = 0; k < 14; k++) SFX.push([T(2, .2 + k * .05), 'paper']);
SFX.push([T(3, .5), 'buzz'], [T(4, .1), 'win'], [T(4, .6), 'buzz'], [T(5, .3), 'roll'], [T(5, .65), 'buzz']);
for (let k = 0; k < 10; k++) SFX.push([T(6) + .5 + k, k === 9 ? 'tickHi' : 'tick']);
SFX.push([T(6) + 10.5, 'ding'], [T(7, 0), 'chime'], [T(7, .35), 'pop']);
for (let k = 0; k < 4; k++) SFX.push([T(8, .1 + k * .2), 'paper']);
SFX.push([T(9, .25), 'tick'], [T(9, .5), 'win']);
for (let n = 1; n <= 8; n++) SFX.push([T(10, .05 + n * .04), 'pop']);
SFX.push([T(11, .14), 'paper'], [T(11, .36), 'paper'], [T(11, .58), 'paper'], [T(11, .8), 'win'], [T(12, .05), 'chime'], [T(12, .5), 'pop'], [T(12, .6), 'pop'], [T(13, .1), 'buzz']);
SFX.push([T(14, .2), 'roll'], [T(15, .3), 'buzz'], [T(15, .4), 'cheer'], [T(16, .45), 'pop']);
startReel({ cd: 6, noCap: [6], music: 'mystery' });
