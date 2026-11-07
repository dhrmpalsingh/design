// The Bridge at Night: scenes for ../kit/kit.js
const P = (t, i, a, b) => prog(t, T(i, a), T(i, b));
const CL = 200, CR = 520, CY = 840;               // cliff edges and ground level
const bridgeY = x => CY + 46 * Math.sin(Math.PI * clamp((x - CL) / (CR - CL)));
const footY = x => (x > CL && x < CR) ? bridgeY(x) : CY;
const HK = {
  1: { body: '#2F7FC1', bodyD: '#235F91', leg: '#22314A', skin: SK[1], hair: HR[0], hs: 'short', num: '1' },
  2: { body: '#3E8E5A', bodyD: '#2E6B44', leg: '#2F3547', skin: SK[4], hair: HR[3], hs: 'bun', num: '2' },
  5: { body: '#D24B3E', bodyD: '#A3392F', leg: '#3A2F35', skin: SK[3], hair: HR[2], hs: 'curly', num: '5' },
  10: { body: '#7A5AA6', bodyD: '#5D4384', leg: '#3B3346', skin: SK[0], hair: HR[4], hs: 'short', num: '10', beard: .35, grey: 1, cane: true },
};
const IDS = [1, 2, 5, 10], LX = { 1: 32, 2: 78, 5: 124, 10: 170 }, RX = { 1: 552, 2: 598, 5: 644, 10: 690 }, HS = .54;
const STARS = (() => { const R = rnd(9); return Array.from({ length: 90 }, () => [R() * 720, R() * 640, .6 + R() * 1.8]); })();
function nightBG(t) {
  let s = `<defs><linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1028"/><stop offset="1" stop-color="#2A3160"/></linearGradient>
    <linearGradient id="gChasm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B1F38"/><stop offset="1" stop-color="#05060D"/></linearGradient></defs>
    <rect width="720" height="1280" fill="url(#gNight)"/>`;
  STARS.forEach(([x, y, r], k) => s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="#fff" opacity="${(.5 + .5 * Math.sin(t * 2 + k)).toFixed(2)}"/>`);
  s += `<circle cx="590" cy="150" r="56" fill="#F3EBC8"/><circle cx="572" cy="138" r="10" fill="#E2D8B0"/><circle cx="604" cy="170" r="7" fill="#E2D8B0"/>`;
  s += `<path d="M0 620 L90 540 L170 600 L260 520 L360 610 L470 530 L560 600 L640 540 L720 590 V1280 H0 Z" fill="#1C2244" opacity=".8"/>`;
  s += `<rect x="${CL}" y="${CY}" width="${CR - CL}" height="440" fill="url(#gChasm)"/>`;
  s += `<path d="M0 ${CY} H${CL} L${CL + 18} ${CY + 120} L${CL - 10} ${CY + 260} L${CL + 24} 1280 H0 Z" fill="#3C3550" stroke="${C.ink}" stroke-width="5"/><path d="M720 ${CY} H${CR} L${CR - 22} ${CY + 140} L${CR + 8} ${CY + 280} L${CR - 18} 1280 H720 Z" fill="#3C3550" stroke="${C.ink}" stroke-width="5"/>`;
  s += `<rect x="0" y="${CY - 8}" width="${CL}" height="14" fill="#4B6A4A"/><rect x="${CR}" y="${CY - 8}" width="${720 - CR}" height="14" fill="#4B6A4A"/>`;
  return s;
}
function bridgeSVG(t, fall = -1) {
  let s = '', planks = '';
  const n = 18;
  for (let k = 0; k < n; k++) {
    const x = CL + 8 + k * (CR - CL - 16) / (n - 1), y = bridgeY(x), ang = Math.atan2(bridgeY(x + 1) - y, 1) * 180 / Math.PI;
    let dy = 0, rot = ang;
    if (fall >= 0) { const d = Math.max(0, fall - Math.abs(k - n / 2) * .05); dy = 900 * d * d; rot += d * 300 * (k % 2 ? 1 : -1); }
    planks += `<rect x="${f1(x - 9)}" y="${f1(y - 4 + dy)}" width="18" height="12" rx="2" fill="#8A6440" stroke="${C.ink}" stroke-width="2.5" transform="rotate(${f1(rot)} ${f1(x)} ${f1(y + dy)})"/>`;
  }
  if (fall < 0 || fall < .05) { let d1 = '', d2 = ''; for (let x = CL; x <= CR; x += 10) { d1 += (x === CL ? 'M' : 'L') + x + ' ' + f1(bridgeY(x)); d2 += (x === CL ? 'M' : 'L') + x + ' ' + f1(bridgeY(x) - 64 + 10 * Math.sin(Math.PI * (x - CL) / (CR - CL))); } s += `<path d="${d2}" stroke="#C9A877" stroke-width="5" fill="none"/><path d="${d1}" stroke="#C9A877" stroke-width="4" fill="none"/>`; for (let x = CL + 20; x < CR; x += 40) s += `<path d="M${x} ${f1(bridgeY(x))} L${x} ${f1(bridgeY(x) - 58 + 10 * Math.sin(Math.PI * (x - CL) / (CR - CL)))}" stroke="#C9A877" stroke-width="3"/>`; }
  s += planks + `<rect x="${CL - 10}" y="${CY - 80}" width="14" height="86" fill="#6E4E34" stroke="${C.ink}" stroke-width="3"/><rect x="${CR - 4}" y="${CY - 80}" width="14" height="86" fill="#6E4E34" stroke="${C.ink}" stroke-width="3"/>`;
  return s;
}
function torch(x, y, t, s = 1) {
  const fl = 1 + .12 * Math.sin(t * 23) + .08 * Math.sin(t * 37);
  return `<circle cx="${f1(x)}" cy="${f1(y - 20)}" r="${f1(170 * s)}" fill="url(#gWarm)" opacity=".9"/><path d="M${f1(x)} ${f1(y)} l-4 ${f1(60 * s)}" stroke="#6E4E34" stroke-width="${f1(9 * s)}" stroke-linecap="round"/>
    <path d="M${f1(x - 13 * s)} ${f1(y)} q${f1(13 * s)} ${f1(-48 * s * fl)} ${f1(26 * s)} 0 z" fill="#FFB347" stroke="${C.ink}" stroke-width="3"/><path d="M${f1(x - 6 * s)} ${f1(y - 2)} q${f1(6 * s)} ${f1(-24 * s * fl)} ${f1(12 * s)} 0 z" fill="#FFF2A8"/>`;
}
// where everyone is: [{id, x, walking, phase}] plus who holds the torch
const MOVES = [[9, [1, 2], 'R'], [10, [1], 'L'], [11, [5, 10], 'R'], [12, [2], 'L'], [13, [1, 2], 'R']];
function positions(t) {
  const side = { 1: 'L', 2: 'L', 5: 'L', 10: 'L' }; let holder = 1;
  const out = {};
  IDS.forEach(id => out[id] = { x: LX[id], walk: 0, dir: 1 });
  for (const [i, who, to] of MOVES) {
    if (t < T(i, .12)) break;
    const p = easeInOut(P(t, i, .12, .82));
    who.forEach((id, j) => { const x0 = side[id] === 'L' ? LX[id] : RX[id], x1 = to === 'R' ? RX[id] : LX[id]; out[id] = { x: lerp(x0, x1, p) + (p > 0 && p < 1 ? j * -26 : 0), walk: p > 0 && p < 1 ? 1 : 0, dir: to === 'R' ? 1 : -1, phase: t * 8 }; });
    holder = who[0];
    if (p >= 1) { who.forEach(id => { side[id] = to; out[id] = { x: to === 'R' ? RX[id] : LX[id], walk: 0, dir: to === 'R' ? -1 : 1 }; }); }
  }
  return { pos: out, holder };
}
function hikers(t, { pos = null, holder = 1, tags = 0, happy = false, wave = false } = {}) {
  const P0 = pos || Object.fromEntries(IDS.map(id => [id, { x: LX[id], walk: 0, dir: 1 }]));
  let s = '', torchSVG = '';
  IDS.slice().reverse().forEach(id => {
    const p = P0[id], y = footY(p.x), hold = id === holder;
    const hx = p.x + p.dir * 70 * HS, hy = y - 360 * HS;
    s += person({ ...HK[id], x: p.x, y, s: HS, dir: p.dir, walk: p.walk, phase: p.phase || 0, expr: happy ? 'happy' : 'neutral', front: hold ? { to: [hx, hy], amt: 1 } : (wave ? { to: [p.x + p.dir * 20 + Math.sin(t * 9 + id) * 12, y - 520 * HS], amt: 1 } : null) });
    if (hold) torchSVG = torch(hx, hy - 10, t, .8);
    if (tags > 0) s += popIn(clamp(tags * 4 - IDS.indexOf(id)), `<rect x="-27" y="-27" width="54" height="54" rx="27" fill="${HK[id].body}" stroke="${C.ink}" stroke-width="3.5"/>${text(0, 11, String(id), { size: 30, weight: 700, fill: '#fff' })}`, p.x + 4, y - 540 * HS);
  });
  return s + torchSVG;
}
function timerBadge(min, sc = 1, ok = null) {
  const str = `${min} / 17 min`, w = tw(str, 40, 700) + 120, col = ok === true ? C.green : ok === false ? C.red : C.card;
  return `<g transform="translate(360 78) scale(${sc.toFixed(3)})"><rect x="${-w / 2}" y="-34" width="${w}" height="72" rx="20" fill="rgba(0,0,0,.35)"/><rect x="${-w / 2}" y="-38" width="${w}" height="72" rx="20" fill="${col}" stroke="${C.ink}" stroke-width="4"/>
    <circle cx="${-w / 2 + 44}" cy="-2" r="22" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M${-w / 2 + 44} -2 V-14 M${-w / 2 + 44} -2 H${-w / 2 + 54}" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    ${text(28, 13, str, { size: 40, weight: 700, fill: ok == null ? C.ink : '#fff' })}</g>`;
}
function timeline(t, i, segs, total, bad) {
  let s = '', x = 70; const sc = 560 / 19;
  segs.forEach(([m, label, who], k) => {
    const p = P(t, i, .05 + k * .15, .15 + k * .15); if (p <= 0) return;
    const w = m * sc * easeOut(p);
    s += `<rect x="${f1(x)}" y="500" width="${f1(w)}" height="130" rx="12" fill="${['#2F7FC1', '#E2574C', '#F4B740', '#7CBF5A', '#7A5AA6'][k]}" stroke="${C.ink}" stroke-width="4"/>` + (w > 24 ? text(x + w / 2, 582, String(m), { size: 46, weight: 700, fill: '#fff', stroke: C.ink, sw: 6 }) : '');
    s += text(x + w / 2, 672 + (k % 2) * 30, label, { size: 24, weight: 600, fill: '#C9CCE0' });
    x += m * sc;
  });
  s += `<path d="M${70 + 17 * sc} 470 V650" stroke="${C.yellow}" stroke-width="6" stroke-dasharray="12 8"/>` + text(70 + 17 * sc, 452, '17 min', { size: 34, weight: 700, fill: C.yellow });
  return s;
}
const SCENES = [
  t => nightBG(t) + bridgeSVG(t) + hikers(t),
  t => nightBG(t) + bridgeSVG(t) + hikers(t) + popIn(P(t, 1, .15, .25), `<rect x="-6" y="0" width="12" height="90" fill="#6E4E34"/><rect x="-62" y="-60" width="124" height="66" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="4"/>${text(0, -16, 'MAX 2', { size: 32, weight: 700 })}`, CL + 40, CY - 260),
  t => { let s = nightBG(t) + bridgeSVG(t) + hikers(t); const p = P(t, 2, .2, .45); if (p > 0) s += `<path d="M${CL + 30} ${CY - 170} Q 360 ${CY - 300} ${CR - 30} ${CY - 170}" stroke="${C.yellow}" stroke-width="6" fill="none" stroke-dasharray="${f1(500 * p)} 999"/><path d="M${CR - 30} ${CY - 130} Q 360 ${CY - 220} ${CL + 30} ${CY - 130}" stroke="#FFB347" stroke-width="6" fill="none" stroke-dasharray="${f1(500 * P(t, 2, .45, .7))} 999"/>` + popIn(P(t, 2, .5, .6), torch(0, 0, t, .9), 360, CY - 330); return s; },
  t => nightBG(t) + bridgeSVG(t) + hikers(t, { tags: P(t, 3, .05, .35) }) + chip('2 + 10 together → 10 min', 360, 460, P(t, 3, .62, .72), { size: 30 }),
  t => nightBG(t) + bridgeSVG(t) + hikers(t, { tags: 1 }) + popIn(P(t, 4, .1, .25), text(0, 0, '17:00', { size: 130, weight: 700, fill: C.red, stroke: C.ink, sw: 10 }), 360, 470),
  t => countdownCard(t, T(5) + .5, 'Can they make it?', [[IDS.map((id, k) => `<circle cx="${-48 + k * 32}" cy="0" r="16" fill="${HK[id].body}" stroke="${C.ink}" stroke-width="3"/>${text(-48 + k * 32, 44, String(id), { size: 22, weight: 700 })}`).join(''), 'minutes'], [torch(0, 20, t, .8), '1 torch'], [text(0, 24, '17', { size: 80, weight: 700, fill: C.red }), 'minutes max']], 'Comment your plan'),
  t => `<rect width="720" height="1280" fill="#151A33"/>` + timeline(t, 6, [[10, '1+10 →', 0], [1, '1 ←'], [5, '1+5 →'], [1, '1 ←'], [2, '1+2 →']], 19, true),
  t => { let s = `<rect width="720" height="1280" fill="#151A33"/>` + timeline(t, 7, [[10, '1+10 →'], [1, '1 ←'], [5, '1+5 →'], [1, '1 ←'], [2, '1+2 →']], 19, true); s += popIn(P(t, 7, .7, .8), text(0, 0, '= 19 min', { size: 90, weight: 700, fill: '#fff' }), 360, 820); s += markAt(600, 820, false, P(t, 7, .8, .88), 44); return s; },
  t => { let s = nightBG(t) + bridgeSVG(t); [5, 10].forEach((id, j) => s += person({ ...HK[id], x: 300 + j * 120, y: footY(300 + j * 120), s: .55, phase: t * 8, walk: 1 })); s += chip('5 and 10 → just 10 min', 360, 480, P(t, 8, .4, .5), { bg: '#D8F0DD', size: 34 }); return s; },
  ...[9, 10, 11, 12, 13].map(i => t => { const { pos, holder } = positions(t); return nightBG(t) + bridgeSVG(t) + hikers(t, { pos, holder, tags: 1 }); }),
  t => { const { pos } = positions(SE(13) - .01); const f = P(t, 14, .15, .9); return nightBG(t) + bridgeSVG(t, f) + hikers(t, { pos, holder: 1, happy: true, wave: t > T(14, .4) }) + confetti(t, T(14, .45), 40); },
  t => { const { pos } = positions(SE(13) - .01); return nightBG(t) + bridgeSVG(t, 1) + hikers(t, { pos, holder: 1, happy: true, wave: true }) + followPill(t, T(15, .45)); },
];
const TIMER = [[9, 0, 2], [10, 2, 3], [11, 3, 13], [12, 13, 15], [13, 15, 17]];
function overlay(t, i) {
  if (i < 4 || i === 5 || i === 6 || i === 7 || i === 8 || i > 14) return '';
  let m = 0;
  for (const [k, a, b] of TIMER) { if (i === k) m = Math.round(lerp(a, b, P(t, k, .12, .82))); else if (i > k) m = b; }
  return timerBadge(m, i === 4 ? .6 + .4 * backOut(P(t, 4, .1, .25)) : 1, i >= 13 && m === 17 ? true : null);
}
const SFX = [];
VO.forEach((l, i) => { if (i !== 5) SFX.push([S[i] + .05, 'pop']); if (i > 0) SFX.push([S[i], 'whoosh']); });
SFX.push([T(0, .1), 'fire'], [T(1, .15), 'pop'], [T(1, .4), 'door'], [T(2, .5), 'fire'], [T(3, .05), 'pop'], [T(3, .62), 'pop'], [T(4, .1), 'drum']);
for (let k = 0; k < 10; k++) SFX.push([T(5) + .5 + k, k === 9 ? 'tickHi' : 'tick']);
SFX.push([T(5) + 10.5, 'ding']);
for (let k = 0; k < 5; k++) SFX.push([T(6, .05 + k * .15), 'tick'], [T(7, .05 + k * .15), 'tick']);
SFX.push([T(7, .7), 'pop'], [T(7, .8), 'buzz'], [T(8, .4), 'chime']);
MOVES.forEach(([i]) => { for (let x = T(i, .14); x < T(i, .82); x += .3) SFX.push([x, 'step']); SFX.push([T(i, .82), 'tick']); });
SFX.push([T(13, .85), 'win'], [T(14, .15), 'crack'], [T(14, .3), 'crash'], [T(14, .45), 'cheer'], [T(15, .45), 'pop']);
startReel({ cd: 5, noCap: [5], music: 'mystery', overlay });
