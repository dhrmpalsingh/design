// The Missing Dollar: scenes for ../kit/kit.js
const P = (t, i, a, b) => prog(t, T(i, a), T(i, b));
const FR = [
  { body: '#3473D1', bodyD: '#285CA6', leg: '#2B3245', skin: SK[1], hair: HR[0], hs: 'short' },
  { body: '#E07B47', bodyD: '#B85E30', leg: '#3A2F35', skin: SK[4], hair: HR[3], hs: 'bun' },
  { body: '#4CA867', bodyD: '#378050', leg: '#2F3547', skin: SK[3], hair: HR[2], hs: 'curly' },
];
const FX = [96, 206, 316], FY = 1200, FS = .6;
const MGR = { body: '#2E3442', bodyD: '#22273A', leg: '#22273A', skin: SK[0], hair: HR[1], hs: 'short', tie: '#C0392B' };
const BELL = { body: '#B83A3A', bodyD: '#8E2B2B', leg: '#2A2430', skin: SK[2], hair: HR[0], hs: 'short', cap: '#B83A3A', buttons: '#F4C542' };
function bill(x, y, v, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})"><rect x="-46" y="-24" width="92" height="48" rx="6" fill="#7DBE7A" stroke="${C.ink}" stroke-width="3.5"/><rect x="-38" y="-16" width="76" height="32" rx="4" fill="none" stroke="#4E8E4C" stroke-width="2"/><circle r="11" fill="#A8D8A2" stroke="#4E8E4C" stroke-width="2"/>${text(-24, 8, '$' + v, { size: 18, weight: 700, fill: '#24532A' })}${text(26, 8, String(v), { size: 16, weight: 700, fill: '#24532A' })}</g>`;
}
function fly(t, a, b, from, to, v, s = 1) { // a bill flying in an arc between a and b (times)
  const p = prog(t, a, b); if (p <= 0 || p >= 1) return '';
  const e = easeInOut(p), x = lerp(from[0], to[0], e), y = lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * 160;
  return bill(x, y, v, s, (1 - e) * -30 + e * 10);
}
function lobbyBG() {
  let s = `<rect width="720" height="1060" fill="#EADBC4"/>`;
  for (let x = 0; x < 720; x += 60) s += `<rect x="${x}" y="0" width="28" height="700" fill="#E1CFB4"/>`;
  s += `<rect y="700" width="720" height="360" fill="#7A4E36"/><rect y="700" width="720" height="18" fill="#5E3A26"/>`;
  for (let x = 20; x < 720; x += 140) s += `<rect x="${x}" y="740" width="110" height="280" rx="6" fill="none" stroke="#5E3A26" stroke-width="4"/>`;
  s += `<rect x="60" y="300" width="220" height="80" rx="10" fill="#5E3A26" stroke="${C.ink}" stroke-width="4"/>` + text(170, 355, 'HOTEL', { size: 46, weight: 700, fill: '#F4C542' });
  // key rack
  s += `<rect x="520" y="430" width="170" height="150" rx="8" fill="#8A5A3A" stroke="${C.ink}" stroke-width="4"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += `<circle cx="${545 + c * 40}" cy="${460 + r * 45}" r="5" fill="${C.ink}"/><path d="M${545 + c * 40} ${465 + r * 45} v16" stroke="#F4C542" stroke-width="5"/>`;
  // plant
  s += `<rect x="30" y="860" width="80" height="90" rx="8" fill="#B5654A" stroke="${C.ink}" stroke-width="4"/>`;
  [[50, 820], [90, 800], [70, 770], [40, 790], [100, 840]].forEach(([x, y]) => s += `<ellipse cx="${x}" cy="${y}" rx="26" ry="40" fill="#5C9A4C" stroke="${C.ink}" stroke-width="3" transform="rotate(${x - 70} ${x} ${y})"/>`);
  s += `<rect y="1060" width="720" height="220" fill="#8E2E35"/><path d="M0 1060 H720" stroke="${C.ink}" stroke-width="5"/>`;
  for (let x = -40; x < 760; x += 80) s += `<path d="M${x} 1100 l20 20 l-20 20 l-20 -20 z" fill="#B0434B"/>`;
  return s;
}
function desk() { return `<rect x="430" y="880" width="290" height="180" fill="#6E4630" stroke="${C.ink}" stroke-width="5"/><rect x="420" y="862" width="310" height="26" rx="6" fill="#8A5A3A" stroke="${C.ink}" stroke-width="4"/><path d="M470 920 h220 M470 1000 h220" stroke="#5A3826" stroke-width="4"/>
  <path d="M640 862 a24 24 0 0 1 48 0 z" fill="#E8C35A" stroke="${C.ink}" stroke-width="3"/><circle cx="664" cy="834" r="5" fill="#E8C35A" stroke="${C.ink}" stroke-width="2"/>`; }
function priceTag(v, strike = 0, nv = null, p = 1) {
  if (p <= 0) return '';
  let g = `<rect x="-70" y="-40" width="140" height="80" rx="12" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/>` + text(0, 16, '$' + v, { size: 48, weight: 700 });
  if (strike > 0) g += `<path d="M-56 0 L${f1(-56 + 112 * strike)} 0" stroke="${C.red}" stroke-width="8" stroke-linecap="round"/>`;
  if (nv) g += `<g transform="translate(0 -70) scale(${(.5 + .5 * backOut(clamp(strike))).toFixed(3)})"><rect x="-56" y="-30" width="112" height="60" rx="12" fill="${C.yellow}" stroke="${C.ink}" stroke-width="4"/>${text(0, 13, '$' + nv, { size: 40, weight: 700 })}</g>`;
  return popIn(p, g, 500, 800);
}
function scene(t, { mgr = true, bell = null, friends = 'stand', extra = '' } = {}) {
  let s = lobbyBG();
  if (mgr) s += person({ ...MGR, x: 650, y: 1060, s: .62, dir: -1, expr: mgr === 'think' ? 'think' : 'neutral', front: mgr.front || null });
  s += desk() + extra;
  if (bell) s += person({ ...BELL, s: .6, dir: -1, ...bell });
  FR.forEach((f, k) => s += person({ ...f, x: FX[k], y: FY, s: FS, expr: friends === 'think' ? 'think' : friends === 'happy' ? 'happy' : 'neutral', front: friends === 'wave' ? { to: [FX[k] + 40 + Math.sin(t * 9 + k) * 12, FY - 330], amt: 1 } : null }));
  return s;
}
const HAND = k => [FX[k] + 40, FY - 190];
function ledger(rows, p, y0 = 420) {
  if (p <= 0) return '';
  let g = `<rect x="-300" y="-30" width="600" height="${rows.length * 92 + 60}" rx="30" fill="${C.card}" stroke="${C.ink}" stroke-width="5"/>`;
  rows.forEach(([str, col, rp, strike], k) => {
    if (rp <= 0) return;
    g += `<g opacity="${clamp(rp * 2).toFixed(2)}">${text(0, 44 + k * 92, str, { size: 50, weight: 700, fill: col || C.ink })}</g>`;
    if (strike) g += `<path d="M-230 ${30 + k * 92} L${f1(-230 + 460 * strike)} ${30 + k * 92}" stroke="${C.red}" stroke-width="8" stroke-linecap="round"/>`;
  });
  return popIn(p, g, 360, y0);
}
function moneyBar(t, segs, p, y = 860) { // segs: [[value, color, label, appearP]]
  if (p <= 0) return '';
  let s = `<g opacity="${clamp(p * 2)}"><rect x="58" y="${y - 6}" width="604" height="112" rx="16" fill="#2A2D34"/>`; let x = 60;
  segs.forEach(([v, col, label, ap]) => { const w = v * 20 * easeOut(clamp(ap)); if (w > 0) { s += `<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="100" fill="${col}" stroke="${C.ink}" stroke-width="3"/>`; if (w > 30) s += text(x + w / 2, y + 48, '$' + v, { size: 36, weight: 700, fill: '#fff', stroke: C.ink, sw: 5 }) + text(x + w / 2, y + 84, label, { size: 20, weight: 600, fill: '#fff' }); } x += v * 20; });
  return s + text(360, y + 150, 'the $30 they first paid', { size: 26, fill: '#6E655A' }) + '</g>';
}
const SCENES = [
  t => { const w = P(t, 0, 0, .35); let s = lobbyBG() + person({ ...MGR, x: 650, y: 1060, s: .62, dir: -1 }) + desk(); FR.forEach((f, k) => s += person({ ...f, x: lerp(-120 - k * 60, FX[k], easeOut(w)), y: FY, s: FS, walk: w < 1 ? 1 : 0, phase: t * 9 })); return s + priceTag(30, 0, null, P(t, 0, .4, .5)); },
  t => scene(t, { extra: priceTag(30) + FR.map((f, k) => fly(t, T(1, .15 + k * .17), T(1, .35 + k * .17), HAND(k), [560 - 30 + k * 30, 850], 10)).join('') + (t > T(1, .75) ? [0, 1, 2].map(k => bill(530 + k * 30, 850 - k * 6, 10, .9, -6 + k * 6)).join('') : '') }),
  t => scene(t, { mgr: 'think', extra: priceTag(30, P(t, 2, .45, .6), 25) + [0, 1, 2].map(k => bill(530 + k * 30, 850 - k * 6, 10, .9)).join('') }),
  t => { const hp = P(t, 3, .3, .7); return scene(t, { extra: priceTag(30, 1, 25) + fly(t, T(3, .3), T(3, .7), [560, 850], [430, 840], 5), bell: { x: lerp(780, 420, easeOut(P(t, 3, 0, .3))), y: 1180, walk: P(t, 3, 0, .3) < 1 ? 1 : 0, phase: t * 9, front: { to: [470, 900], amt: hp >= 1 ? 1 : 0 } } }) + (hp >= 1 ? bill(462, 880, 5, .9) : ''); },
  t => {
    const bx = lerp(420, 420, 1), keepP = P(t, 4, .2, .35);
    let extra = priceTag(30, 1, 25);
    let s = scene(t, { extra, bell: { x: bx, y: 1180, expr: 'happy', front: { to: [470, 900], amt: 1 } } });
    if (t < T(4, .2)) s += bill(462, 880, 5, .9);
    if (keepP > 0 && keepP < 1) s += bill(lerp(462, 400, keepP), lerp(880, 980, keepP), 1, .8 * (1 - keepP * .5)) + bill(lerp(470, 405, keepP), lerp(870, 990, keepP), 1, .8 * (1 - keepP * .5));
    s += chip('keeps $2', 420, 760, P(t, 4, .3, .4), { bg: '#F6D6D3', size: 30 });
    FR.forEach((f, k) => { s += fly(t, T(4, .5 + k * .12), T(4, .66 + k * .12), [462, 880], HAND(k), 1, .8); if (t > T(4, .66 + k * .12)) s += bill(HAND(k)[0], HAND(k)[1], 1, .7, 10); });
    return s;
  },
  t => scene(t, { bell: { x: 420, y: 1180 }, friends: 'think' }) + `<rect width="720" height="1280" fill="#000" opacity=".45"/>` + ledger([['3 × $9 = $27', null, P(t, 5, .15, .3)], ['+ $2 bellhop', C.red, P(t, 5, .55, .7)], ['= $29 ?', C.red, P(t, 5, .8, .9)]], P(t, 5, .05, .15)),
  t => scene(t, { bell: { x: 420, y: 1180 }, friends: 'think' }) + popIn(P(t, 6, .1, .25), text(0, 0, '$29 ≠ $30', { size: 96, weight: 700, fill: '#fff', stroke: C.ink, sw: 10 }), 360, 460) + popIn(P(t, 6, .45, .6), bill(0, 0, 1, 2.2, -8) + text(0, 120, '?', { size: 120, weight: 700, fill: C.red, stroke: C.ink, sw: 8 }), 360, 640),
  t => countdownCard(t, T(7) + .5, "Where's the missing $1?", [[[0, 1, 2].map(k => bill(-20 + k * 20, -10 + k * 6, 10, .8, -6 + k * 6)).join(''), 'paid $30'], [`<rect x="-70" y="-40" width="140" height="80" rx="12" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/>` + text(0, 16, '$25', { size: 48, weight: 700 }), 'room $25'], [bill(-30, 0, 2, .7) + bill(30, 0, 3, .7), '$2 kept · $3 back']], 'Comment your answer'),
  t => scene(t, { friends: 'think', bell: { x: 420, y: 1180 } }) + `<rect width="720" height="1280" fill="#000" opacity=".45"/>` + popIn(P(t, 8, .1, .25), `<circle r="120" fill="${C.green}" stroke="${C.ink}" stroke-width="8"/><path d="M-52 0 l36 38 l70 -76" stroke="#fff" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 360, 560) + popIn(P(t, 8, .4, .55), text(0, 0, 'nothing is missing', { size: 56, weight: 700, fill: '#fff', stroke: C.ink, sw: 8 }), 360, 780),
  t => creamBG() + ledger([['friends paid $27', null, 1]], P(t, 9, .05, .15), 420) + moneyBar(t, [[25, '#3473D1', 'hotel', P(t, 9, .3, .45)], [2, C.red, 'bell', P(t, 9, .5, .6)]], P(t, 9, .25, .3)),
  t => creamBG() + ledger([['$25 + $2 = $27', null, 1]], 1, 420) + moneyBar(t, [[25, '#3473D1', 'hotel', 1], [2, C.red, 'bell', 1]], 1) + chip('the $27 IS the hotel + the bellhop', 360, 640, P(t, 10, .45, .55), { size: 28 }),
  t => creamBG() + ledger([['$27 + $2 = $29', C.red, 1, P(t, 11, .5, .7)]], 1, 420) + moneyBar(t, [[25, '#3473D1', 'hotel', 1], [2, C.red, 'bell', 1]], 1) + chip('the $2 is already inside the $27', 360, 640, P(t, 11, .2, .3), { bg: '#F6D6D3', size: 28 }) + markAt(620, 450, false, P(t, 11, .7, .8), 36),
  t => creamBG() + ledger([['$27 + $3 = $30', C.green, 1]], P(t, 12, .02, .12), 420) + moneyBar(t, [[25, '#3473D1', 'hotel', 1], [2, C.red, 'bell', 1], [3, C.green, 'back', P(t, 12, .35, .5)]], 1) + markAt(620, 450, true, P(t, 12, .7, .8), 36) + confetti(t, T(12, .75), 40),
  t => scene(t, { friends: 'wave', bell: { x: 420, y: 1180, expr: 'happy' } }) + followPill(t, T(13, .45)),
];
const SFX = [];
VO.forEach((l, i) => { if (i !== 7) SFX.push([S[i] + .05, 'pop']); if (i > 0) SFX.push([S[i], 'whoosh']); });
for (let x = T(0, 0); x < T(0, .35); x += .33) SFX.push([x, 'step']);
SFX.push([T(0, .4), 'pop']);
for (let k = 0; k < 3; k++) SFX.push([T(1, .15 + k * .17), 'paper'], [T(1, .35 + k * .17), 'coin']);
SFX.push([T(2, .45), 'buzz'], [T(2, .55), 'pop']);
for (let x = T(3, 0); x < T(3, .3); x += .33) SFX.push([x, 'step']);
SFX.push([T(3, .3), 'paper'], [T(4, .2), 'paper'], [T(4, .3), 'coin']);
for (let k = 0; k < 3; k++) SFX.push([T(4, .5 + k * .12), 'paper'], [T(4, .66 + k * .12), 'coin']);
SFX.push([T(5, .15), 'pop'], [T(5, .55), 'pop'], [T(5, .8), 'buzz'], [T(6, .1), 'pop'], [T(6, .45), 'drum']);
for (let k = 0; k < 10; k++) SFX.push([T(7) + .5 + k, k === 9 ? 'tickHi' : 'tick']);
SFX.push([T(7) + 10.5, 'ding'], [T(8, .1), 'chime'], [T(9, .3), 'pop'], [T(9, .5), 'pop'], [T(10, .45), 'pop'], [T(11, .2), 'pop'], [T(11, .5), 'buzz'], [T(12, .35), 'coin'], [T(12, .7), 'win'], [T(12, .75), 'cheer'], [T(13, .45), 'pop']);
startReel({ cd: 7, noCap: [7], music: 'bright' });
