// The Potion and 1,000 Bottles: scenes for ../kit/kit.js
const P = (t, i, a, b) => prog(t, T(i, a), T(i, b));
const GLASS = ['#2F5D46', '#7A4A22', '#4F3468', '#24506B'];
const GREEN = '#57D163';
function bottle(x, y, s, n, { col = GLASS[0], glow = 0, dim = false, label = true } = {}) {
  let g = `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" opacity="${dim ? .35 : 1}">`;
  if (glow > 0) g += `<circle cy="-60" r="110" fill="${GREEN}" opacity="${(glow * .35).toFixed(2)}"/>`;
  g += `<path d="M-30 0 V-92 Q -30 -120 -12 -130 V-168 H12 V-130 Q 30 -120 30 -92 V0 Z" fill="${glow > .5 ? mix(col, GREEN, .6) : col}" stroke="${C.ink}" stroke-width="5"/>
    <rect x="-14" y="-186" width="28" height="22" rx="4" fill="#B98A5A" stroke="${C.ink}" stroke-width="4"/>
    <path d="M-18 -96 V-20" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".25"/>`;
  if (label && n != null) g += `<rect x="-24" y="-80" width="48" height="40" rx="6" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/>` + text(0, -50, String(n), { size: n > 99 ? 20 : 26, weight: 700 });
  return g + '</g>';
}
function hallBG() {
  let s = `<rect width="720" height="1060" fill="#4F4140"/>`;
  for (let y = 10, r = 0; y < 1040; y += 64, r++) for (let x = r % 2 ? -50 : 0; x < 720; x += 110) s += `<rect x="${x + 4}" y="${y}" width="100" height="56" rx="10" fill="#5B4B49" stroke="#463837" stroke-width="3"/>`;
  [[110, '#A3343A'], [610, '#2F5E8C']].forEach(([x, c]) => s += `<path d="M${x - 55} 60 H${x + 55} V330 L${x} 290 L${x - 55} 330 Z" fill="${c}" stroke="${C.ink}" stroke-width="4"/><circle cx="${x}" cy="170" r="30" fill="#F4C542" stroke="${C.ink}" stroke-width="3"/><path d="M${x - 14} 170 l14 -18 l14 18 l-14 18 z" fill="${c}"/>`);
  [250, 470].forEach(x => s += `<rect x="${x - 8}" y="210" width="16" height="50" fill="#6E5A3E" stroke="${C.ink}" stroke-width="3"/><path d="M${x} 170 q-16 22 0 40 q16 -18 0 -40" fill="#FFB347" stroke="${C.ink}" stroke-width="3"/><circle cx="${x}" cy="200" r="60" fill="url(#gWarm)" opacity=".6"/>`);
  s += `<rect y="1060" width="720" height="220" fill="#3A2E2C"/><path d="M0 1060 H720" stroke="${C.ink}" stroke-width="5"/>`;
  for (let x = 0; x < 720; x += 90) s += `<path d="M${x} 1060 L${x - 60} 1280" stroke="#2F2523" stroke-width="4"/>`;
  return s;
}
const KING = { body: '#6B3FA0', bodyD: '#52307D', leg: '#3B2A55', leg2: '#2E2144', crown: true, beard: .45, grey: .3, hair: HR[1], skin: SK[0], buttons: '#F4C542' };
const TC = [SK[1], SK[3], SK[0], SK[2], SK[4]], THR = [HR[0], HR[2], HR[3], HR[1], HR[4]], THS = ['short', 'curly', 'bun', 'bald', 'short'];
const taster = (k, v, extra = {}) => ({ body: '#3E8E5A', bodyD: '#2E6B44', leg: '#2F3547', skin: TC[k % 5], hair: THR[k % 5], hs: THS[k % 5], num: String(v), ...extra });
const VALUES = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
function rack(t, i, n = 200) {
  let s = '';
  for (let k = 0; k < n; k++) { const r = Math.floor(k / 20), c = k % 20, p = i == null ? 1 : P(t, i, .03 + k * .002, .1 + k * .002); if (p > 0) s += popIn(p, bottle(0, 0, .2, null, { col: GLASS[(k * 7) % 4], label: false }), 46 + c * 33, 420 + r * 50); }
  return s;
}
function clock(x, y, r, p, label = '24h') {
  const a = p * Math.PI * 2;
  return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M0 0 L${f1(Math.sin(a) * r * .7)} ${f1(-Math.cos(a) * r * .7)}" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><path d="M0 0 L${f1(Math.sin(a * 12) * r * .5)} ${f1(-Math.cos(a * 12) * r * .5)}" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/><circle r="7" fill="${C.ink}"/>${text(0, r + 44, label, { size: 34, weight: 700, fill: '#fff', stroke: C.ink, sw: 6 })}</g>`;
}
const D7X = n => 70 + (n - 1) * 96, D7Y = 640, DTX = [150, 360, 570], DTV = [1, 2, 4];
function sipLines(t, i, which, p) { // lines from taster k to bottles that use its value
  let s = '';
  which.forEach(k => { const v = DTV[k]; for (let n = 1; n <= 7; n++) if (n & v) s += `<path d="M${DTX[k]} 840 L${D7X(n)} ${D7Y + 10}" stroke="${['#E2574C', '#3473D1', '#F4B740'][k]}" stroke-width="5" opacity="${(p * .85).toFixed(2)}" stroke-dasharray="10 8"/>`; });
  return s;
}
function demo(t, { lines = [], lp = 1, green = [], hiBottle = 0, sums = 0 } = {}) {
  let s = hallBG() + sipLines(t, 0, lines, lp);
  for (let n = 1; n <= 7; n++) s += bottle(D7X(n), D7Y, .62, n, { col: GLASS[n % 4], glow: n === 5 ? hiBottle : 0, dim: hiBottle > .5 && n !== 5 });
  if (sums > 0) [[5, '4+1'], [6, '4+2'], [7, '4+2+1']].forEach(([n, str], j) => s += chip(str, D7X(n), D7Y + 60, clamp(sums * 3 - j), { size: 24 }));
  DTV.forEach((v, k) => { if (green.includes(v)) s += `<circle cx="${DTX[k] - 2}" cy="950" r="95" fill="${GREEN}" opacity=".3"/>`; });
  DTV.forEach((v, k) => s += person({ ...taster(k, v), x: DTX[k] - 10, y: 1240, s: .62, tongue: green.includes(v) ? GREEN : null, expr: green.includes(v) ? 'ouch' : 'neutral' }));
  return s;
}
const SCENES = [
  // 0: a thousand bottles, one potion
  t => hallBG() + rack(t, 0) + text(360, 980, '× 5 more racks = 1,000', { size: 30, fill: '#E9DCCB', opacity: P(t, 0, .5, .6) }) + person({ ...KING, x: 600, y: 1260, s: .6, dir: -1 }),
  // 1: green tongue, one day later
  t => {
    const u = P(t, 1, .1, .7), green = t > T(1, .7);
    let s = hallBG() + person({ ...taster(0, '?'), num: '', x: 260, y: 1220, s: .9, expr: green ? 'ouch' : 'neutral', tongue: green ? GREEN : null, front: { to: [330, 700], amt: 1 - P(t, 1, .2, .3) } });
    if (t < T(1, .3)) s += bottle(340, 720, .6, null, { col: GLASS[2], label: false });
    s += clock(530, 470, 90, u, green ? '1 day later' : '24h');
    if (green) s += popIn(P(t, 1, .7, .8), `<circle r="70" fill="${GREEN}" opacity=".35"/>`, 320, 830);
    return s;
  },
  // 2: 24 hours, 10 tasters
  t => { let s = hallBG() + clock(360, 470, 100, P(t, 2, 0, 1) * .25); for (let k = 0; k < 10; k++) s += popIn(P(t, 2, .4 + k * .04, .5 + k * .04), person({ ...taster(k, ''), num: '', x: 0, y: 0, s: .38 }), 40 + k * 71, 1230); return s; },
  // 3: one round only
  t => {
    let s = hallBG() + person({ ...taster(2, ''), num: '', x: 180, y: 1220, s: .8, front: { to: [300, 820], amt: 1 } });
    for (let k = 0; k < 8; k++) { const p = P(t, 3, .1 + k * .08, .16 + k * .08); s += bottle(330 + (k % 4) * 95, 760 + Math.floor(k / 4) * 230, .5, null, { col: GLASS[k % 4], label: false, glow: p > 0 && p < 1 ? .3 : 0 }); }
    return s + chip('one round only', 520, 420, P(t, 3, .6, .7), { bg: '#F6D6D3', size: 34 });
  },
  // 4: how?
  t => { let s = hallBG() + rack(t, null, 100); s += person({ ...KING, x: 360, y: 1250, s: .75, expr: 'think' }); return s + bubble(360, 700, ['Which one is it?'], P(t, 4, .1, .2), { size: 40 }); },
  // 5: countdown
  t => countdownCard(t, T(5) + .5, 'How do they find it?', [[bottle(0, 70, .55, null, { label: false }), '1,000 bottles'], [person({ ...taster(0, ''), num: '', x: 0, y: 80, s: .3 }), '10 tasters'], [clock(0, -10, 50, .1, ''), '1 day']], 'Comment your plan'),
  // 6: tasters get values
  t => { let s = hallBG(); VALUES.forEach((v, k) => { s += popIn(P(t, 6, .25 + k * .055, .33 + k * .055), person({ ...taster(k, ''), num: '', x: 0, y: 0, s: .38 }), 40 + k * 71, 1230); s += numBadge(40 + k * 71, 980, v, P(t, 6, .25 + k * .055, .33 + k * .055), { r: 30, size: v > 99 ? 20 : 26 }); }); s += popIn(P(t, 6, .05, .15), text(0, 0, '1 0 1 1 0', { size: 90, weight: 700, fill: C.yellow, stroke: C.ink, sw: 8 }), 360, 560); return s; },
  // 7: every number is a sum
  t => {
    let s = hallBG() + bottle(360, 640, 1, 1000, { col: GLASS[1] });
    const on = [512, 256, 128, 64, 32, 8];
    VALUES.slice().reverse().forEach((v, k) => { const lit = on.includes(v); s += popIn(P(t, 7, .3 + k * .04, .38 + k * .04), `<circle r="30" fill="${lit ? C.yellow : '#4A3C3A'}" stroke="${C.ink}" stroke-width="4"/>${text(0, 8, String(v), { size: v > 99 ? 20 : 24, weight: 700, fill: lit ? C.ink : '#8A7A70' })}`, 52 + k * 68, 840); });
    return s + chip('1000 = 512+256+128+64+32+8', 360, 960, P(t, 7, .75, .85), { size: 30 });
  },
  // 8: sip the bottles that use your value
  t => {
    let s = hallBG();
    for (let n = 1; n <= 15; n++) { const x = 80 + ((n - 1) % 5) * 140, y = 470 + Math.floor((n - 1) / 5) * 200, uses = (n & 4) > 0; s += bottle(x, y, .48, n, { col: GLASS[n % 4], glow: uses ? P(t, 8, .3 + n * .02, .4 + n * .02) * .7 : 0, dim: !uses && t > T(8, .3) }); }
    return s + person({ ...taster(2, 4), x: 360, y: 1260, s: .55, front: { to: [440, 1000], amt: 1 } }) + numBadge(372, 920, 4, 1);
  },
  // 9-11: worked example
  t => demo(t),
  t => demo(t, { lines: [0, 1, 2], lp: P(t, 10, .05, .3), sums: P(t, 10, .3, .7) }),
  t => { let s = demo(t, { green: t > T(11, .15) ? [1, 4] : [], hiBottle: P(t, 11, .55, .7) }); s += chip('24 hours later...', 360, 420, P(t, 11, 0, .1) * (1 - P(t, 11, .4, .5)), { size: 32 }); s += chip('4 + 1 = 5', 360, 420, P(t, 11, .45, .55), { bg: '#D8F0DD', size: 40 }); return s; },
  // 12: ten tasters, any bottle up to 1,023
  t => {
    let s = hallBG(); const green = [512, 64, 32, 4, 1];
    VALUES.forEach((v, k) => { const g = green.includes(v) && t > T(12, .2); if (g) s += `<circle cx="${42 + k * 71}" cy="1080" r="52" fill="${GREEN}" opacity=".35"/>`; s += person({ ...taster(k, ''), num: '', x: 40 + k * 71, y: 1230, s: .38, tongue: g ? GREEN : null, expr: g ? 'ouch' : 'neutral' }); s += numBadge(40 + k * 71, 980, v, 1, { r: 30, size: v > 99 ? 20 : 26, bg: g ? GREEN : '#8A7A70' }); });
    s += chip('512 + 64 + 32 + 4 + 1', 360, 560, P(t, 12, .35, .45), { size: 36 });
    s += popIn(P(t, 12, .55, .65), bottle(0, 120, .9, 613, { col: GLASS[3], glow: 1 }), 360, 640);
    return s;
  },
  // 13: feast saved
  t => {
    let s = hallBG() + person({ ...KING, x: 360, y: 1060, s: .7, expr: 'happy', front: { to: [440, 560], amt: easeOut(P(t, 13, .1, .25)) } });
    s += `<rect x="40" y="900" width="640" height="40" rx="8" fill="#8A5A3A" stroke="${C.ink}" stroke-width="4"/><rect x="40" y="938" width="640" height="122" fill="#6E4A30" stroke="${C.ink}" stroke-width="4"/>`;
    [[140, '#E2574C'], [260, '#F4B740'], [460, '#7CBF5A'], [580, '#C46B24']].forEach(([x, c]) => s += `<ellipse cx="${x}" cy="890" rx="56" ry="18" fill="#fff" stroke="${C.ink}" stroke-width="3"/><circle cx="${x}" cy="866" r="26" fill="${c}" stroke="${C.ink}" stroke-width="3"/>`);
    s += bottle(620, 760, .5, 613, { col: GLASS[3] }) + `<path d="M580 600 L660 780 M660 600 L580 780" stroke="${C.red}" stroke-width="12" stroke-linecap="round" opacity="${P(t, 13, .3, .4)}"/>`;
    return s + confetti(t, T(13, .2));
  },
  // 14: end
  t => hallBG() + person({ ...KING, x: 360, y: 1180, s: .72, expr: 'happy', front: { to: [460 + Math.sin(t * 9) * 20, 640], amt: easeOut(P(t, 14, .05, .2)) } }) + followPill(t, T(14, .45)),
];
const SFX = [];
VO.forEach((l, i) => { if (i !== 5) SFX.push([S[i] + .05, 'pop']); if (i > 0) SFX.push([S[i], 'whoosh']); });
for (let k = 0; k < 200; k += 10) SFX.push([T(0, .03 + k * .002), 'tick']);
SFX.push([T(1, .2), 'gulp'], [T(1, .7), 'chime'], [T(2, 0), 'tick']);
for (let k = 0; k < 10; k++) SFX.push([T(2, .4 + k * .04), 'step']);
for (let k = 0; k < 8; k++) SFX.push([T(3, .1 + k * .08), 'gulp']);
SFX.push([T(3, .6), 'buzz']);
for (let k = 0; k < 10; k++) SFX.push([T(5) + .5 + k, k === 9 ? 'tickHi' : 'tick']);
SFX.push([T(5) + 10.5, 'ding'], [T(6, .05), 'chime']);
for (let k = 0; k < 10; k++) SFX.push([T(6, .25 + k * .055), 'pop']);
for (let k = 0; k < 10; k++) SFX.push([T(7, .3 + k * .04), 'tick']);
SFX.push([T(7, .75), 'pop'], [T(8, .3), 'gulp'], [T(10, .05), 'paper'], [T(10, .3), 'pop'], [T(10, .45), 'pop'], [T(10, .6), 'pop']);
SFX.push([T(11, .15), 'chime'], [T(11, .45), 'pop'], [T(11, .55), 'win'], [T(12, .2), 'chime'], [T(12, .35), 'pop'], [T(12, .55), 'win'], [T(13, .2), 'cheer'], [T(14, .45), 'pop']);
startReel({ cd: 5, noCap: [5], music: 'mystery' });
