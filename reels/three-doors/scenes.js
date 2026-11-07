// The Three Doors: scenes for ../kit/kit.js (a generic game show; original host, goats and car)
const P = (t, i, a, b) => prog(t, T(i, a), T(i, b));
const DX = [130, 360, 590], DY = 470, DW = 190, DH = 340, DCOL = ['#2F7FC1', '#D24B3E', '#3E9E62'];
const HOST = { body: '#C9A227', bodyD: '#A0801A', leg: '#2B2430', leg2: '#211C26', skin: SK[2], hair: HR[0], hs: 'short', tie: '#6B2E8E' };
const YOU = { body: '#3473D1', bodyD: '#285CA6', leg: '#2B3245', skin: SK[4], hair: HR[3], hs: 'bun' };
function goat(x, y, s = 1, t = 0) {
  const chew = Math.sin(t * 8) * 3;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <path d="M-40 10 v46 M-18 14 v42 M20 14 v42 M42 10 v46" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M-40 10 v46 M-18 14 v42 M20 14 v42 M42 10 v46" stroke="#E9E4DA" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="0" cy="0" rx="62" ry="34" fill="#F4F0E8" stroke="${C.ink}" stroke-width="4"/><path d="M-62 -6 q-16 -6 -14 -20" stroke="${C.ink}" stroke-width="4" fill="none"/>
    <g transform="translate(52 -34)"><path d="M-6 -22 q-6 -26 -26 -30 M10 -22 q2 -26 18 -32" stroke="#8A7A62" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="6" cy="0" rx="26" ry="32" fill="#F4F0E8" stroke="${C.ink}" stroke-width="4"/><ellipse cx="-20" cy="-8" rx="12" ry="6" fill="#E8DCCB" stroke="${C.ink}" stroke-width="3"/><ellipse cx="32" cy="-8" rx="12" ry="6" fill="#E8DCCB" stroke="${C.ink}" stroke-width="3"/>
      <circle cx="-2" cy="-6" r="4" fill="${C.ink}"/><circle cx="14" cy="-6" r="4" fill="${C.ink}"/><path d="M0 ${f1(16 + chew)} q6 4 12 0" stroke="${C.ink}" stroke-width="3" fill="none"/><path d="M2 30 l4 22 l4 -22" fill="#D9D2C4" stroke="${C.ink}" stroke-width="3"/></g></g>`;
}
function car(x, y, s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <path d="M-110 20 Q -108 -10 -70 -16 L-40 -48 Q -20 -60 30 -58 Q 60 -56 80 -20 L104 -14 Q 120 -8 118 20 Z" fill="#E2453B" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M-34 -44 L-10 -50 L-10 -20 L-58 -20 Z M2 -50 L28 -50 Q 50 -48 64 -20 L2 -20 Z" fill="#BFE6F5" stroke="${C.ink}" stroke-width="4"/>
    <circle cx="-62" cy="22" r="22" fill="#2A2730" stroke="${C.ink}" stroke-width="4"/><circle cx="-62" cy="22" r="9" fill="#C9CDD6"/><circle cx="70" cy="22" r="22" fill="#2A2730" stroke="${C.ink}" stroke-width="4"/><circle cx="70" cy="22" r="9" fill="#C9CDD6"/>
    <rect x="104" y="-8" width="12" height="10" rx="3" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2"/><path d="M-90 -2 h40" stroke="#fff" stroke-width="4" opacity=".5" stroke-linecap="round"/></g>`;
}
function stageBG(t) {
  let s = `<rect width="720" height="1280" fill="#2A1B3D"/>`;
  for (let k = 0; k < 5; k++) { const x = 70 + k * 145, sw = Math.sin(t * .8 + k) * 40; s += `<path d="M${x} 0 L${x - 110 + sw} 1060 H${x + 110 + sw} Z" fill="#FFF3C4" opacity=".05"/>`; }
  s += `<path d="M0 0 H70 Q 60 400 40 1060 H0 Z" fill="#8E1F2F" stroke="${C.ink}" stroke-width="4"/><path d="M720 0 H650 Q 660 400 680 1060 H720 Z" fill="#8E1F2F" stroke="${C.ink}" stroke-width="4"/>`;
  s += `<rect y="1060" width="720" height="220" fill="#3B2752"/><path d="M0 1060 H720" stroke="${C.ink}" stroke-width="5"/><ellipse cx="360" cy="1150" rx="300" ry="50" fill="#FFF3C4" opacity=".08"/>`;
  for (let k = 0; k < 18; k++) s += `<circle cx="${30 + k * 39}" cy="40" r="7" fill="${(Math.floor(t * 4) + k) % 2 ? '#FFE27A' : '#8A6A2A'}"/>`;
  return s;
}
function door(k, { open = 0, behind = null, hi = 0, label = null, t = 0, dim = false } = {}) {
  const x = DX[k] - DW / 2, y = DY;
  let s = `<g opacity="${dim ? .35 : 1}">`;
  if (hi > 0) s += `<rect x="${x - 14}" y="${y - 14}" width="${DW + 28}" height="${DH + 28}" rx="14" fill="none" stroke="${C.yellow}" stroke-width="10" opacity="${hi.toFixed(2)}"/>`;
  s += `<rect x="${x - 10}" y="${y - 10}" width="${DW + 20}" height="${DH + 20}" rx="10" fill="#4B3466" stroke="${C.ink}" stroke-width="5"/><rect x="${x}" y="${y}" width="${DW}" height="${DH}" fill="#170F22"/>`;
  if (open > 0 && behind) { s += `<rect x="${x}" y="${y}" width="${DW}" height="${DH}" fill="url(#gWarm)" opacity="${open}"/>`; s += behind === 'car' ? car(DX[k], y + DH - 70, .8) : goat(DX[k] - 6, y + DH - 90, .9, t); }
  const w = DW * (1 - .85 * open);
  s += `<rect x="${x}" y="${y}" width="${f1(w)}" height="${DH}" fill="${DCOL[k]}" stroke="${C.ink}" stroke-width="5"/><rect x="${x + w * .12}" y="${y + 30}" width="${f1(w * .76)}" height="120" rx="8" fill="none" stroke="${mix(DCOL[k], '#000000', .25)}" stroke-width="5"/><rect x="${x + w * .12}" y="${y + 180}" width="${f1(w * .76)}" height="130" rx="8" fill="none" stroke="${mix(DCOL[k], '#000000', .25)}" stroke-width="5"/>`;
  if (open < .9) s += `<circle cx="${f1(x + w - 22)}" cy="${y + 175}" r="9" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;
  s += `<circle cx="${DX[k]}" cy="${y - 44}" r="34" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/>` + text(DX[k], y - 30, String(k + 1), { size: 40, weight: 700 });
  if (label) s += chip(label[0], DX[k], y + DH + 70, label[1], { bg: label[2] || C.card, size: 30 });
  return s + '</g>';
}
function people(t, { hostX = 600, hostFront = null, youFront = null, youExpr = 'neutral', hostWalk = 0 } = {}) {
  return person({ ...YOU, x: 110, y: 1210, s: .62, expr: youExpr, front: youFront }) + person({ ...HOST, x: hostX, y: 1210, s: .64, dir: -1, walk: hostWalk, phase: t * 9, expr: 'happy', front: hostFront || { to: [hostX - 50, 1000], amt: 1 } }) + `<rect x="${f1(hostX - 60)}" y="970" width="14" height="40" rx="6" fill="#333" stroke="${C.ink}" stroke-width="2" transform="rotate(-20 ${f1(hostX - 53)} 990)"/>`;
}
function bracket(x0, x1, y, str, p, col = C.green) {
  if (p <= 0) return '';
  return `<g opacity="${clamp(p * 2)}"><path d="M${x0} ${y} v-24 H${x1} v24" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` + chip(str, (x0 + x1) / 2, y - 64, p, { bg: col, fg: '#fff', size: 40 });
}
// simulate 1,000 games with a fixed seed (stay vs switch)
const SIM = (() => { const R = rnd(2024), out = []; let st = 0, sw = 0; for (let g = 0; g < 1000; g++) { const car_ = Math.floor(R() * 3), pick = Math.floor(R() * 3); if (pick === car_) st++; else sw++; out.push([st, sw]); } return out; })();
const SCENES = [
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { t })); s += popIn(P(t, 0, .3, .42), car(0, 0, .5), 230, 330) + popIn(P(t, 0, .55, .65), goat(0, 0, .45, t), 400, 330) + popIn(P(t, 0, .62, .72), goat(0, 0, .45, t), 520, 330); return s + people(t); },
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? P(t, 1, .2, .35) : 0, label: k === 0 ? ['YOUR PICK', P(t, 1, .3, .45)] : null, t })); return s + people(t, { youFront: { to: [200, 860], amt: easeOut(P(t, 1, .1, .3)) }, youExpr: 'happy' }); },
  t => { const w = P(t, 2, .05, .3); let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? 1 : 0, open: k === 2 ? easeOut(P(t, 2, .5, .7)) : 0, behind: 'goat', t })); return s + people(t, { hostX: lerp(600, 600, w), hostFront: { to: [560, 820], amt: easeOut(P(t, 2, .3, .5)) } }); },
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? 1 : 0, open: k === 2 ? 1 : 0, behind: 'goat', t })); s += `<path d="M${DX[0] + 40} 440 Q 245 360 ${DX[1] - 40} 440" stroke="${C.yellow}" stroke-width="8" fill="none" stroke-dasharray="${f1(300 * P(t, 3, .3, .5))} 999"/>`; return s + people(t) + bubble(470, 880, ['Switch to door 2?'], P(t, 3, .1, .2), { size: 36, tx: 100 }); },
  t => countdownCard(t, T(4) + .5, 'Stay or switch?', [[`<rect x="-54" y="-50" width="30" height="74" fill="${DCOL[0]}" stroke="${C.ink}" stroke-width="3"/><rect x="-15" y="-50" width="30" height="74" fill="${DCOL[1]}" stroke="${C.ink}" stroke-width="3"/><rect x="24" y="-50" width="30" height="74" fill="${DCOL[2]}" stroke="${C.ink}" stroke-width="3"/>`, '3 doors'], [goat(0, 10, .55, t), 'goat shown'], [text(0, 26, '?', { size: 90, weight: 700, fill: C.red }), 'matter?']], 'Comment your answer'),
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 1 ? 1 : 0, open: k === 2 ? 1 : 0, behind: 'goat', t })); s += popIn(P(t, 5, .05, .2), text(0, 0, 'SWITCH!', { size: 110, weight: 700, fill: C.yellow, stroke: C.ink, sw: 10 }), 360, 340); return s + people(t, { youExpr: 'happy' }) + chip('wins 2 out of 3', 360, 900, P(t, 5, .45, .55), { bg: C.green, fg: '#fff', size: 40 }); },
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? 1 : 0, label: k === 0 ? ['1/3', P(t, 6, .3, .45), C.card] : null, t })); return s + people(t); },
  t => { let s = stageBG(t); [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? 1 : 0, label: k === 0 ? ['1/3', 1, C.card] : null, t })); return s + bracket(DX[1] - 100, DX[2] + 100, 400, '2/3', P(t, 7, .3, .5)) + people(t); },
  t => {
    let s = stageBG(t); const op = easeOut(P(t, 8, .2, .35)), mv = P(t, 8, .55, .8);
    [0, 1, 2].forEach(k => s += door(k, { hi: k === 0 ? 1 : 0, open: k === 2 ? op : 0, behind: 'goat', label: k === 0 ? ['1/3', 1, C.card] : k === 1 ? ['2/3', mv, C.green] : null, t }));
    if (mv < 1) s += bracket(DX[1] - 100, lerp(DX[2] + 100, DX[1] + 100, mv), 400, '2/3', 1 - mv * .99);
    return s + people(t, { hostFront: { to: [560, 820], amt: easeOut(P(t, 8, .1, .25)) } });
  },
  t => { let s = stageBG(t); for (let k = 0; k < 100; k++) { const x = 60 + (k % 10) * 66, y = 330 + Math.floor(k / 10) * 74, p = P(t, 9, .05 + k * .004, .12 + k * .004); if (p <= 0) continue; s += `<g opacity="${p}"><rect x="${x - 24}" y="${y - 30}" width="48" height="62" rx="4" fill="${DCOL[k % 3]}" stroke="${C.ink}" stroke-width="2.5"/>${text(x, y + 8, String(k + 1), { size: 18, weight: 700, fill: '#fff' })}${k === 0 && t > T(9, .6) ? `<rect x="${x - 30}" y="${y - 36}" width="60" height="74" rx="6" fill="none" stroke="${C.yellow}" stroke-width="6"/>` : ''}</g>`; } return s; },
  t => {
    let s = stageBG(t); const keep = 56;
    for (let k = 0; k < 100; k++) {
      const x = 60 + (k % 10) * 66, y = 330 + Math.floor(k / 10) * 74, opened = k !== 0 && k !== keep && t > T(10, .05 + (k / 100) * .45);
      if (opened) s += `<rect x="${x - 24}" y="${y - 30}" width="48" height="62" rx="4" fill="#170F22" stroke="${C.ink}" stroke-width="2.5"/>` + goat(x, y + 14, .16, t + k);
      else s += `<rect x="${x - 24}" y="${y - 30}" width="48" height="62" rx="4" fill="${DCOL[k % 3]}" stroke="${C.ink}" stroke-width="2.5"/>${text(x, y + 8, String(k + 1), { size: 18, weight: 700, fill: '#fff' })}`;
      if (k === 0) s += `<rect x="${x - 30}" y="${y - 36}" width="60" height="74" rx="6" fill="none" stroke="${C.yellow}" stroke-width="6"/>`;
      if (k === keep && t > T(10, .55)) s += `<rect x="${x - 30}" y="${y - 36}" width="60" height="74" rx="6" fill="none" stroke="${C.green}" stroke-width="6"/>`;
    }
    return s + chip('stay on #1, or switch to #57?', 360, 1120, P(t, 10, .6, .7), { size: 34 });
  },
  t => {
    let s = stageBG(t) + `<rect width="720" height="1280" fill="#000" opacity=".35"/>`;
    const g = Math.min(999, Math.floor(1000 * easeInOut(P(t, 11, .05, .7)))), [st, sw] = SIM[g];
    s += text(360, 380, `games played: ${g + 1}`, { size: 40, weight: 600, fill: '#fff' });
    [[st, 'STAY', '#8A7AA6', 200], [sw, 'SWITCH', C.green, 520]].forEach(([v, lab, col, x]) => { const h = v * .9; s += `<rect x="${x - 90}" y="${f1(1060 - h)}" width="180" height="${f1(h)}" rx="12" fill="${col}" stroke="${C.ink}" stroke-width="5"/>` + text(x, 1110, lab, { size: 40, weight: 700, fill: '#fff' }) + text(x, f1(1040 - h), String(v), { size: 52, weight: 700, fill: '#fff', stroke: C.ink, sw: 6 }); });
    s += chip(`switching won ${Math.round(SIM[999][1] / 10)}%`, 360, 1180, P(t, 11, .8, .9), { bg: C.green, fg: '#fff', size: 36 });
    return s;
  },
  t => { let s = stageBG(t) + car(430, 900, 1.5) + person({ ...YOU, x: 170, y: 1210, s: .66, expr: 'happy', front: { to: [250 + Math.sin(t * 9) * 16, 760], amt: easeOut(P(t, 12, .05, .2)) } }); return s + confetti(t, T(12, 0), 50) + followPill(t, T(12, .45)); },
];
const SFX = [];
VO.forEach((l, i) => { if (i !== 4) SFX.push([S[i] + .05, 'pop']); if (i > 0) SFX.push([S[i], 'whoosh']); });
SFX.push([T(0, .3), 'horn'], [T(0, .55), 'goat'], [T(1, .3), 'pop'], [T(2, .5), 'door'], [T(2, .62), 'goat'], [T(3, .1), 'pop'], [T(3, .4), 'drum']);
for (let k = 0; k < 10; k++) SFX.push([T(4) + .5 + k, k === 9 ? 'tickHi' : 'tick']);
SFX.push([T(4) + 10.5, 'ding'], [T(5, .05), 'chime'], [T(5, .45), 'win'], [T(6, .3), 'pop'], [T(7, .3), 'pop'], [T(8, .2), 'door'], [T(8, .3), 'goat'], [T(8, .6), 'chime']);
for (let k = 0; k < 100; k += 5) SFX.push([T(9, .05 + k * .004), 'tick']);
for (let k = 0; k < 100; k += 4) SFX.push([T(10, .05 + (k / 100) * .45), 'tick']);
SFX.push([T(10, .4), 'goat'], [T(10, .6), 'pop'], [T(11, .05), 'roll'], [T(11, .8), 'win'], [T(12, 0), 'horn'], [T(12, .05), 'cheer'], [T(12, .45), 'pop']);
startReel({ cd: 4, noCap: [4], music: 'bright' });
