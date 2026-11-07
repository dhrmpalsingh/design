// ---------------------------------------------------------------------------
// Shared kit for the puzzle reels: drawing helpers, characters, timeline from vo.js,
// captions, countdown and the frame/player loop. A reel's scenes.js defines SCENES and SFX
// and calls startReel().
// ---------------------------------------------------------------------------
const W = 720, H = 1280;
const C = {
  ink: '#1A1822', wall: '#2E3448', wall2: '#283044', brick: '#363D55', floor: '#1C2030', floorLine: '#272C3E',
  bars: '#B4BCCB', cellBack: '#3A4159', jump: '#E8873A', jumpDark: '#C46B24', warden: '#2F4E73', wardenDark: '#22394F',
  yellow: '#F4B740', red: '#E2574C', green: '#43B067', pill: '#14161F', cream: '#F7EFE1', card: '#FFFDF7',
  board: '#2F4A3C', boardEdge: '#8A6440', chalk: '#ECEBE2', muted: '#6E655A', warm: '#FFD27A',
};
const SK = ['#F2C49E', '#D9A27A', '#B07A52', '#8A5A3C', '#F5D2B0'];
const HR = ['#2B2420', '#5A3A22', '#1E1A18', '#8A6A3A', '#C9C3BA'];
const FONT = "Fredoka, Inter, sans-serif";
const HATC = { r: '#D9443B', b: '#3473D1' };

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
function mix(a, b, p) { const A = hex2rgb(a), B = hex2rgb(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(p))).toString(16).padStart(2, '0')).join(''); }
function rnd(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
const fmt = n => Math.round(n).toLocaleString('en-US');

// ---------- text ----------
const mctx = document.createElement('canvas').getContext('2d');
function tw(text, size, weight = 600) { mctx.font = `${weight} ${size}px Fredoka`; return mctx.measureText(text).width; }
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function text(x, y, str, { size = 30, weight = 600, fill = C.ink, anchor = 'middle', opacity = 1, stroke = '', sw = 0 } = {}) {
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"` : '';
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fill}" opacity="${opacity}"${st}>${esc(str)}</text>`;
}
function pill(str, cx, cy, { size = 36, bg = C.pill, fg = '#fff', scale = 1, opacity = 1, weight = 600, maxW = 650, icon = '' } = {}) {
  const iconW = icon ? size * 1.25 : 0;
  let w = tw(str, size, weight);
  while (w + iconW > maxW - 56 && size > 20) { size -= 1; w = tw(str, size, weight); }
  const ph = size * 1.8, pw = w + 56 + iconW, r = ph / 2.4;
  let ic = '';
  if (icon === 'plus') { const ix = -pw / 2 + 28 + size * .45; ic = `<circle cx="${ix}" cy="0" r="${size * .5}" fill="${C.yellow}"/><path d="M${ix - size * .24} 0H${ix + size * .24}M${ix} ${-size * .24}V${size * .24}" stroke="${C.ink}" stroke-width="${size * .13}" stroke-linecap="round"/>`; }
  if (icon === 'check') { const ix = -pw / 2 + 28 + size * .45; ic = `<circle cx="${ix}" cy="0" r="${size * .5}" fill="#fff"/><path d="M${ix - size * .22} 0 l${size * .16} ${size * .16} l${size * .28} ${-size * .3}" stroke="${bg}" stroke-width="${size * .13}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${scale.toFixed(3)})" opacity="${opacity.toFixed(3)}">
    <rect x="${-pw / 2}" y="${-ph / 2 + 6}" width="${pw}" height="${ph}" rx="${r}" fill="rgba(0,0,0,.3)"/>
    <rect x="${-pw / 2}" y="${-ph / 2}" width="${pw}" height="${ph}" rx="${r}" fill="${bg}"/>${ic}
    <text x="${iconW / 2}" y="${size * .35}" text-anchor="middle" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fg}">${esc(str)}</text></g>`;
}
function popAnim(t, a, b, inDur = .3) {
  if (t < a || t > b) return null;
  const p = prog(t, a, a + inDur), q = prog(t, b - .18, b);
  return { scale: (0.6 + 0.4 * backOut(p)) * (1 - 0.08 * q), opacity: Math.min(1, p * 3) * (1 - q) };
}
function popIn(p, inner, cx, cy) { if (p <= 0) return ''; const sc = .3 + .7 * backOut(clamp(p)); return `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${sc.toFixed(3)})" opacity="${Math.min(1, p * 3).toFixed(2)}">${inner}</g>`; }

// ---------- timeline from the voice-over ----------
const VO = window.VO || [];
const LEAD = 0.35, GAP = 0.25;
const S = []; let acc = LEAD;
VO.forEach(l => { S.push(acc); acc += l.dur + GAP + l.extra; });
const VDUR = acc + 0.1;
const SE = i => (i + 1 < S.length ? S[i + 1] : VDUR);
const T = (i, f = 0) => S[i] + f * (SE(i) - S[i]);

// ---------- character (side view, facing right; origin at the feet) ----------
function ik(sx, sy, tx, ty, l1, l2) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy); const max = l1 + l2 - .5;
  if (d > max) { tx = sx + dx / d * max; ty = sy + dy / d * max; d = max; }
  if (d < 1) d = 1;
  const a = Math.atan2(ty - sy, tx - sx), cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const ang = a + Math.acos(cosA);
  return { ex: sx + Math.cos(ang) * l1, ey: sy + Math.sin(ang) * l1, hx: tx, hy: ty };
}
function limb(pts, col, w) {
  const d = 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
  return `<path d="${d}" stroke="${C.ink}" stroke-width="${w + 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function person(o) {
  const { x, y, s = 1, dir = 1, phase = 0, walk = 0, expr = 'neutral', kind = 'prisoner', skin = SK[0], hair = HR[0], hs = 'short', beard = 0, grey = 0, num = '', sash = false, cane = false } = o;
  const toLocal = ([wx, wy]) => [(wx - x) / (dir * s), (wy - y) / s];
  const bob = -Math.abs(Math.sin(phase)) * 7 * walk, swing = Math.sin(phase) * walk, hipY = -165 + bob;
  const war = kind === 'warden';
  const cust = !!o.body;
  const body = o.body || (war ? C.warden : C.jump), bodyD = o.bodyD || (war ? C.wardenDark : C.jumpDark), legC = o.leg || (war ? '#252A3A' : cust ? '#2F3547' : C.jump), legC2 = o.leg2 || (war ? '#1B1F2C' : cust ? '#262B3A' : C.jumpDark);
  const hairC = mix(hair, '#DEDBD5', grey);
  const leg = (ang, col) => { const fx = Math.sin(ang) * 168, fy = hipY + Math.cos(ang) * 168; return limb([[0, hipY], [fx, fy - 6]], col, 30) + `<ellipse cx="${f1(fx + 12)}" cy="${f1(fy + 2)}" rx="25" ry="12" fill="#22202A"/>`; };
  const arm = (sx, sy, rest, spec, col) => {
    let tgt = rest;
    if (spec && spec.amt > 0) { const L = toLocal(spec.to); tgt = [lerp(rest[0], L[0], spec.amt), lerp(rest[1], L[1], spec.amt)]; }
    const e = ik(sx, sy, tgt[0], tgt[1], 80, 80);
    return limb([[sx, sy], [e.ex, e.ey], [e.hx, e.hy]], col, 24) + `<circle cx="${f1(e.hx)}" cy="${f1(e.hy)}" r="15" fill="${skin}" stroke="${C.ink}" stroke-width="3.5"/>`;
  };
  const sy = -330 + bob;
  let g = `<g transform="translate(${f1(x)} ${f1(y)}) scale(${dir * s} ${s})"><ellipse cx="6" cy="4" rx="78" ry="12" fill="rgba(0,0,0,.25)"/>`;
  if (cane) g += `<path d="M70 0 L64 -150 q-2 -16 14 -16" stroke="#6E4E34" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  g += arm(-8, sy, [-6 - swing * 42, sy + 156], o.back, bodyD);
  g += leg(-swing * .4 - .07 * (1 - walk), legC2) + leg(swing * .4 + .07 * (1 - walk), legC);
  g += `<rect x="-47" y="${-352 + bob}" width="94" height="196" rx="34" fill="${body}" stroke="${C.ink}" stroke-width="3.5"/>`;
  if (!war) {
    if (!cust) g += `<path d="M-30 ${-352 + bob} L0 ${-318 + bob} L30 ${-352 + bob}" stroke="${bodyD}" stroke-width="5" fill="none"/>`;
    if (o.tie) g += `<path d="M-18 ${-352 + bob} L0 ${-326 + bob} L18 ${-352 + bob}" fill="#fff" stroke="${C.ink}" stroke-width="3"/><path d="M0 ${-330 + bob} l-9 14 l9 64 l9 -64 z" fill="${o.tie}" stroke="${C.ink}" stroke-width="3"/>`;
    if (o.buttons) for (let k = 0; k < 3; k++) g += `<circle cx="0" cy="${-320 + k * 40 + bob}" r="5" fill="${o.buttons}" stroke="${C.ink}" stroke-width="2"/>`;
    if (sash) g += `<path d="M-44 ${-330 + bob} L40 ${-190 + bob}" stroke="${C.ink}" stroke-width="27"/><path d="M-44 ${-330 + bob} L40 ${-190 + bob}" stroke="${C.yellow}" stroke-width="20"/>`;
    if (num) g += `<g transform="translate(14 ${-262 + bob}) scale(${dir} 1)"><rect x="-26" y="-18" width="52" height="34" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="3"/>${text(0, 10, num, { size: 24, weight: 700 })}</g>`;
  } else {
    g += `<rect x="-45" y="${-200 + bob}" width="90" height="14" fill="#1A1C24"/><circle cx="22" cy="${-193 + bob}" r="6" fill="${C.yellow}"/>
      <path d="M10 ${-300 + bob} l6 -12 l6 12 l-12 -7 h12 z" fill="${C.yellow}"/>
      <circle cx="-34" cy="${-170 + bob}" r="12" fill="none" stroke="#C9CDD6" stroke-width="4"/><path d="M-34 ${-158 + bob} v14" stroke="#C9CDD6" stroke-width="4"/>`;
  }
  const hy = -414 + bob, ex = 38, ey = hy;
  g += `<rect x="-2" y="${hy + 40}" width="22" height="26" fill="${mix(skin, '#000000', .12)}"/>`;
  if (hs === 'bun') g += `<circle cx="-50" cy="${hy - 46}" r="23" fill="${hairC}" stroke="${C.ink}" stroke-width="3.5"/>`;
  if (hs === 'curly') [[-40, -40], [-10, -58], [22, -52], [-50, -8]].forEach(([a, b]) => g += `<circle cx="${a}" cy="${hy + b}" r="24" fill="${hairC}" stroke="${C.ink}" stroke-width="3.5"/>`);
  if (hs !== 'bald') g += `<circle cx="-2" cy="${hy - 6}" r="57" fill="${hairC}" stroke="${C.ink}" stroke-width="3.5"/>`;
  g += `<circle cx="12" cy="${hy + 4}" r="50" fill="${skin}" stroke="${C.ink}" stroke-width="3.5"/>`;
  if (hs !== 'bald') g += `<path d="M-38 ${hy - 26} Q 6 ${hy - 82} 62 ${hy - 16} Q 34 ${hy - 40} -4 ${hy - 30} Q -20 ${hy - 6} -30 ${hy + 10} Z" fill="${hairC}"/>`;
  g += `<circle cx="-2" cy="${hy + 8}" r="11" fill="${mix(skin, '#000000', .12)}" stroke="${C.ink}" stroke-width="3"/>`;
  if (beard > 0) g += `<path d="M-6 ${hy + 18} Q 0 ${hy + 50 + 70 * beard} 34 ${hy + 52 + 74 * beard} Q 66 ${hy + 46 + 50 * beard} 60 ${hy + 22} Q 40 ${hy + 34} 12 ${hy + 28} Z" fill="${hairC}" stroke="${C.ink}" stroke-width="3"/>`;
  g += `<circle cx="60" cy="${hy + 12}" r="9" fill="${skin}" stroke="${C.ink}" stroke-width="3"/>`;
  if (expr === 'ouch') g += `<path d="M${ex - 8} ${ey - 8} L${ex + 4} ${ey} L${ex - 8} ${ey + 8}" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  else g += `<circle cx="${ex}" cy="${ey}" r="6.5" fill="${C.ink}"/>`;
  if (beard < .35) {
    if (expr === 'happy') g += `<path d="M${ex - 6} ${ey + 22} Q ${ex + 8} ${ey + 38} ${ex + 18} ${ey + 20}" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    else if (expr === 'think') g += `<path d="M${ex - 2} ${ey + 28} Q ${ex + 6} ${ey + 24} ${ex + 14} ${ey + 30}" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    else g += `<path d="M${ex} ${ey + 27} L${ex + 14} ${ey + 26}" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`;
  }
  const browLift = expr === 'think' ? -8 : expr === 'happy' ? -4 : 0;
  g += `<path d="M${ex - 12} ${ey - 18 + browLift} L${ex + 10} ${ey - 20 + browLift * 1.6}" stroke="${hairC}" stroke-width="5" stroke-linecap="round"/>`;
  if (war) g += `<path d="M-48 ${hy - 30} Q 6 ${hy - 82} 64 ${hy - 28} L 64 ${hy - 20} L -48 ${hy - 20} Z" fill="${C.warden}" stroke="${C.ink}" stroke-width="3.5"/><path d="M30 ${hy - 22} L92 ${hy - 14}" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><circle cx="8" cy="${hy - 46}" r="7" fill="${C.yellow}"/>`;
  if (o.crown) g += `<path d="M-34 ${hy - 44} L-34 ${hy - 96} L-14 ${hy - 70} L8 ${hy - 104} L30 ${hy - 70} L50 ${hy - 96} L50 ${hy - 44} Z" fill="#F4C542" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="8" cy="${hy - 60}" r="7" fill="${C.red}"/>`;
  if (o.cap) g += `<rect x="-24" y="${hy - 84}" width="70" height="40" rx="8" fill="${o.cap}" stroke="${C.ink}" stroke-width="3.5"/><rect x="-28" y="${hy - 52}" width="78" height="10" rx="4" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5"/>`;
  if (o.tongue) g += `<ellipse cx="${ex + 10}" cy="${ey + 34}" rx="11" ry="9" fill="${o.tongue}" stroke="${C.ink}" stroke-width="3"/>`;
  if (o.hat) { const hc = HATC[o.hat] || o.hat, hd = mix(hc, '#000000', .25);
    g += `<path d="M-46 ${hy - 6} Q -44 ${hy - 74} 12 ${hy - 76} Q 66 ${hy - 74} 68 ${hy - 6} Z" fill="${hc}" stroke="${C.ink}" stroke-width="3.5"/>
      <rect x="-50" y="${hy - 22}" width="122" height="22" rx="10" fill="${hd}" stroke="${C.ink}" stroke-width="3.5"/><circle cx="12" cy="${hy - 80}" r="13" fill="${hd}" stroke="${C.ink}" stroke-width="3.5"/>`; }
  g += arm(8, sy, [24 + swing * 42, sy + 155], o.front, body);
  return g + '</g>';
}
// front-facing bust (crowds)
function bust(x, y, s, skin, hair, back = false, sash = false) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <path d="M-46 60 Q -46 6 0 6 Q 46 6 46 60 Z" fill="${C.jump}" stroke="${C.ink}" stroke-width="3.5"/>
    ${sash ? `<path d="M-30 14 L36 58" stroke="${C.yellow}" stroke-width="12"/>` : ''}
    <circle cx="0" cy="-22" r="27" fill="${back ? hair : skin}" stroke="${C.ink}" stroke-width="3.5"/>
    ${back ? '' : `<path d="M-27 -26 Q 0 -60 27 -26 Q 14 -40 0 -38 Q -14 -40 -27 -26 Z" fill="${hair}"/><circle cx="-9" cy="-20" r="3.5" fill="${C.ink}"/><circle cx="9" cy="-20" r="3.5" fill="${C.ink}"/><path d="M-7 -6 Q 0 -1 7 -6" stroke="${C.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`}
  </g>`;
}

// ---------- props ----------
function bulbSVG(cx, cy, r, on, glow = 1) {
  const k = r / 50;
  let s = '';
  if (on > 0) s += `<circle cx="${cx}" cy="${cy}" r="${r * 5}" fill="url(#gWarm)" opacity="${(on * glow).toFixed(2)}"/>`;
  s += `<rect x="${cx - 20 * k}" y="${cy - 72 * k}" width="${40 * k}" height="${32 * k}" rx="${6 * k}" fill="#8E89A3" stroke="${C.ink}" stroke-width="${3.5 * k}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${mix('#CFCBD8', '#FFE27A', on)}" stroke="${C.ink}" stroke-width="${4 * k}"/>
    <path d="M${cx - 10 * k} ${cy - 40 * k} V${cy - 6 * k} l${5 * k} ${8 * k} l${5 * k} ${-8 * k} l${5 * k} ${8 * k} l${5 * k} ${-8 * k} V${cy - 40 * k}" stroke="${mix('#8E879E', '#E39A1C', on)}" stroke-width="${3.5 * k}" fill="none" stroke-linejoin="round"/>
    <path d="M${cx - r * .55} ${cy + r * .1} Q ${cx - r * .55} ${cy - r * .5} ${cx - r * .15} ${cy - r * .62}" stroke="#fff" stroke-width="${5 * k}" fill="none" stroke-linecap="round" opacity=".55"/>`;
  if (on > .5) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; s += `<path d="M${f1(cx + Math.cos(a) * r * 1.3)} ${f1(cy + Math.sin(a) * r * 1.3)} L${f1(cx + Math.cos(a) * r * 1.65)} ${f1(cy + Math.sin(a) * r * 1.65)}" stroke="${C.yellow}" stroke-width="${6 * k}" stroke-linecap="round" opacity="${((on - .5) * 2).toFixed(2)}"/>`; }
  return s;
}
function switchSVG(x, y, on, sc = 1) {
  const ly = y + (on ? -20 : 8) * sc;
  return `<rect x="${x - 34 * sc}" y="${y - 54 * sc}" width="${68 * sc}" height="${108 * sc}" rx="${12 * sc}" fill="#EDE8DD" stroke="${C.ink}" stroke-width="${4 * sc}"/>
    <rect x="${x - 14 * sc}" y="${y - 32 * sc}" width="${28 * sc}" height="${64 * sc}" rx="${7 * sc}" fill="#C9C1B2" stroke="${C.ink}" stroke-width="${3 * sc}"/>
    <rect x="${x - 11 * sc}" y="${f1(ly - 10 * sc)}" width="${22 * sc}" height="${30 * sc}" rx="${6 * sc}" fill="#fff" stroke="${C.ink}" stroke-width="${3 * sc}"/>`;
}
function bubble(cx, cy, lines, p, { tail = 'down', size = 34, bg = '#fff', fg = C.ink, tx = 0 } = {}) {
  if (p <= 0) return '';
  const w = Math.max(...lines.map(l => tw(l, size))) + 60, h = lines.length * size * 1.25 + 36;
  const tl = tail === 'down' ? `<path d="M${tx - 18} ${h / 2 - 3} L${tx - 30} ${h / 2 + 34} L${tx + 18} ${h / 2 - 3} Z" fill="${bg}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>` : '';
  const inner = `<rect x="${-w / 2}" y="${-h / 2 + 6}" width="${w}" height="${h}" rx="26" fill="rgba(0,0,0,.25)"/>${tl}<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26" fill="${bg}" stroke="${C.ink}" stroke-width="4"/>
    ${tail === 'down' ? `<path d="M${tx - 15} ${h / 2 - 4} L${tx + 15} ${h / 2 - 4}" stroke="${bg}" stroke-width="6"/>` : ''}
    ${lines.map((l, i) => text(0, -h / 2 + 18 + size * (i + 1) * 1.15, l, { size, fill: fg })).join('')}`;
  return popIn(p, inner, cx, cy);
}
function thought(cx, cy, lines, p, side = -1, size = 30) {
  if (p <= 0) return '';
  const w = Math.max(...lines.map(l => tw(l, size))) + 56, h = lines.length * size * 1.25 + 34;
  const inner = `<circle cx="${side * (w / 2 - 30)}" cy="${h / 2 + 30}" r="11" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/><circle cx="${side * (w / 2 - 50)}" cy="${h / 2 + 8}" r="16" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
    ${lines.map((l, i) => text(0, -h / 2 + 16 + size * (i + 1) * 1.15, l, { size })).join('')}`;
  return popIn(p, inner, cx, cy);
}
function dayBadge(n, sc = 1) {
  const str = typeof n === 'string' ? n : fmt(n), w = tw(str, 40, 700) + 150;
  return `<g transform="translate(360 78) scale(${sc.toFixed(3)})">
    <rect x="${-w / 2}" y="-34" width="${w}" height="72" rx="20" fill="rgba(0,0,0,.35)"/>
    <rect x="${-w / 2}" y="-38" width="${w}" height="72" rx="20" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/>
    <rect x="${-w / 2 + 10}" y="-28" width="92" height="52" rx="12" fill="${C.red}"/>
    ${text(-w / 2 + 56, 10, 'DAY', { size: 30, weight: 700, fill: '#fff' })}
    ${text(-w / 2 + 112 + (w - 122) / 2, 13, str, { size: 40, weight: 700 })}</g>`;
}

// ---------- sets ----------
function brickWall(y0, y1, col = C.wall, brick = C.brick) {
  let s = `<rect x="0" y="${y0}" width="720" height="${y1 - y0}" fill="${col}"/>`;
  for (let y = y0 + 8, r = 0; y < y1 - 20; y += 46, r++) for (let x = (r % 2 ? -40 : 0); x < 720; x += 96) s += `<rect x="${x + 4}" y="${y}" width="88" height="38" rx="5" fill="${brick}" opacity=".55"/>`;
  return s;
}
function floorSVG(y0, col = C.floor) {
  let s = `<rect x="0" y="${y0}" width="720" height="${1280 - y0}" fill="${col}"/><path d="M0 ${y0} H720" stroke="${C.ink}" stroke-width="5"/>`;
  for (let k = 0; k < 4; k++) s += `<path d="M0 ${y0 + 50 + k * 70} H720" stroke="${C.floorLine}" stroke-width="4"/>`;
  return s;
}
function corridorBG() {
  let s = brickWall(0, 1040) + floorSVG(1040);
  [130, 360, 590].forEach(x => s += `<path d="M${x} 0 V120" stroke="#15131C" stroke-width="4"/><path d="M${x - 40} 120 h80 l-14 -22 h-52 z" fill="#555B70" stroke="${C.ink}" stroke-width="3"/><path d="M${x - 40} 122 L${x - 120} 470 H${x + 120} L${x + 40} 122 Z" fill="${C.warm}" opacity=".07"/>`);
  return s;
}
const CELLS = [[20, '14'], [260, '23'], [500, '71']];
function cellBack(x, y = 470, w = 200, h = 520, glow = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.cellBack}" stroke="${C.ink}" stroke-width="5"/>
    <rect x="${x + w / 2 - 34}" y="${y + 40}" width="68" height="52" fill="#20263A" stroke="${C.ink}" stroke-width="3"/><path d="M${x + w / 2 - 12} ${y + 40} v52 M${x + w / 2 + 12} ${y + 40} v52" stroke="${C.bars}" stroke-width="4"/>
    <rect x="${x + 10}" y="${y + h - 130}" width="${w * .6}" height="34" rx="6" fill="#59607A" stroke="${C.ink}" stroke-width="3"/><rect x="${x + 14}" y="${y + h - 96}" width="10" height="92" fill="#454B62"/><rect x="${x + w * .6 - 4}" y="${y + h - 96}" width="10" height="92" fill="#454B62"/>
    ${glow > 0 ? `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="none" stroke="${C.yellow}" stroke-width="10" opacity="${glow.toFixed(2)}"/>` : ''}`;
}
function cellBars(x, num, open = 0, y = 470, w = 200, h = 520) {
  let s = `<g transform="translate(0 ${f1(-open * (h - 30))})">`;
  for (let bx = x + 18; bx < x + w - 6; bx += 26) s += `<path d="M${bx} ${y} V${y + h}" stroke="${C.ink}" stroke-width="12"/><path d="M${bx} ${y} V${y + h}" stroke="${C.bars}" stroke-width="7"/>`;
  s += `<rect x="${x}" y="${y + h * .42}" width="${w}" height="14" fill="${C.bars}" stroke="${C.ink}" stroke-width="3"/></g>`;
  s += `<rect x="${x - 4}" y="${y - 16}" width="${w + 8}" height="22" fill="#4A5068" stroke="${C.ink}" stroke-width="4"/>
    <rect x="${x + w / 2 - 36}" y="${y - 58}" width="72" height="38" rx="8" fill="${C.card}" stroke="${C.ink}" stroke-width="3.5"/>${text(x + w / 2, y - 29, '#' + num, { size: 26, weight: 700 })}`;
  return s;
}
function bulbRoom(o) {
  const lit = o.lit || 0, sw = o.sw ?? (lit > .5 ? 1 : 0), t = o.t || 0;
  let s = brickWall(0, 1010, mix('#2E3448', '#6A5F63', lit), mix(C.brick, '#7C6E6C', lit)) + floorSVG(1010, mix(C.floor, '#3A3540', lit));
  if (lit > 0) s += `<path d="M300 560 L120 1280 H600 L420 560 Z" fill="${C.warm}" opacity="${(lit * .12).toFixed(2)}"/><ellipse cx="360" cy="1110" rx="250" ry="40" fill="${C.warm}" opacity="${(lit * .2).toFixed(2)}"/>`;
  // steel door (left)
  s += `<rect x="30" y="610" width="170" height="400" fill="#5A6078" stroke="${C.ink}" stroke-width="5"/><rect x="74" y="650" width="82" height="70" fill="#1E2230" stroke="${C.ink}" stroke-width="3"/>
    <path d="M94 650 v70 M115 650 v70 M136 650 v70" stroke="${C.bars}" stroke-width="4"/><circle cx="180" cy="820" r="9" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;
  // hanging bulb + switch
  s += `<path d="M360 0 V470" stroke="#15131C" stroke-width="5"/>` + bulbSVG(360, 540, 52, lit) + switchSVG(612, 720, sw);
  s += text(612, 810, sw > .5 ? 'ON' : 'OFF', { size: 26, weight: 700, fill: sw > .5 ? C.yellow : '#9AA0B4' });
  return s;
}
function meetingRoom(board = 'PLAN?', skip = -1) {
  let s = brickWall(0, 1280, '#2B3145', '#333A50');
  s += `<rect x="96" y="318" width="528" height="316" rx="10" fill="${C.boardEdge}" stroke="${C.ink}" stroke-width="5"/><rect x="114" y="336" width="492" height="280" fill="${C.board}"/>
    <path d="M150 598 h60" stroke="${C.chalk}" stroke-width="6" opacity=".5"/>` + text(360, 520, board, { size: 110, weight: 700, fill: C.chalk, opacity: .92 });
  const R = rnd(8);
  [[860, 6, .9], [990, 7, 1.05], [1130, 8, 1.2]].forEach(([y, n, sc], r) => {
    for (let k = 0; k < n; k++) { const x = 360 + (k - (n - 1) / 2) * (640 / n); if (r === 2 && k === skip) continue; s += bust(x, y, sc, SK[Math.floor(R() * 5)], HR[Math.floor(R() * 5)], true); }
  });
  return s;
}
function tallies(n, x0, y0, sc = 1, hiLast = false) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), k = i % 5, gx = x0 + (g % 5) * 118 * sc, gy = y0 + Math.floor(g / 5) * 132 * sc;
    const col = hiLast && i === n - 1 ? C.yellow : C.chalk;
    if (k < 4) s += `<path d="M${f1(gx + k * 20 * sc)} ${f1(gy)} l${f1(3 * sc)} ${f1(96 * sc)}" stroke="${col}" stroke-width="${f1(7 * sc)}" stroke-linecap="round"/>`;
    else s += `<path d="M${f1(gx - 12 * sc)} ${f1(gy + 74 * sc)} L${f1(gx + 76 * sc)} ${f1(gy + 18 * sc)}" stroke="${col}" stroke-width="${f1(7 * sc)}" stroke-linecap="round"/>`;
  }
  return s;
}
function slate(n, p) { // small "counter's wall" inset
  if (p <= 0) return '';
  const inner = `<rect x="-130" y="-74" width="260" height="160" rx="14" fill="${C.board}" stroke="${C.boardEdge}" stroke-width="8"/>
    ${text(0, -42, "Counter's wall", { size: 22, fill: C.chalk, opacity: .8 })}${tallies(n, -100, -18, .55)}${text(100, 70, String(n), { size: 30, weight: 700, fill: C.yellow, anchor: 'end' })}`;
  return popIn(p, inner, 560, 330);
}


// ---------- generic helpers ----------
function chip(str, cx, cy, p, { bg = C.card, fg = C.ink, size = 30 } = {}) {
  if (p <= 0) return '';
  const w = tw(str, size) + 44;
  return popIn(p, `<rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="18" fill="rgba(0,0,0,.3)" transform="translate(0 5)"/><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="18" fill="${bg}" stroke="${C.ink}" stroke-width="3.5"/>${text(0, size * .35, str, { size, fill: fg })}`, cx, cy);
}
function markAt(x, y, ok, p, r = 26) {
  if (p <= 0) return '';
  const inner = ok ? `<circle r="${r}" fill="${C.green}" stroke="${C.ink}" stroke-width="4"/><path d="M${-r * .45} 0 l${r * .3} ${r * .35} l${r * .62} ${-r * .7}" stroke="#fff" stroke-width="${r * .27}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<circle r="${r}" fill="${C.red}" stroke="${C.ink}" stroke-width="4"/><path d="M${-r * .38} ${-r * .38} L${r * .38} ${r * .38} M${r * .38} ${-r * .38} L${-r * .38} ${r * .38}" stroke="#fff" stroke-width="${r * .27}" stroke-linecap="round"/>`;
  return popIn(p, inner, x, y);
}
function numBadge(x, y, n, p, { bg = C.yellow, r = 28, size = 36 } = {}) { return popIn(p, `<circle r="${r}" fill="${bg}" stroke="${C.ink}" stroke-width="4"/>${text(0, size * .36, String(n), { size, weight: 700 })}`, x, y); }
function confetti(t, t0, n = 60, seed = 14) {
  if (t < t0) return '';
  const R = rnd(seed); let s = '';
  for (let k = 0; k < n; k++) { const x = R() * 720, sp = 200 + R() * 220, y = ((t - t0) * sp + R() * 300) % 1400 - 100, c = [C.yellow, C.red, C.green, '#5AA9E6', '#fff'][k % 5]; s += `<rect x="${f1(x)}" y="${f1(y)}" width="12" height="20" fill="${c}" transform="rotate(${f1((t * 200 + k * 37) % 360)} ${f1(x + 6)} ${f1(y + 10)})"/>`; }
  return s;
}
function creamBG() {
  let s = `<rect width="720" height="1280" fill="${C.cream}"/>`;
  for (let y = 40; y < 1280; y += 64) for (let x = (y / 64) % 2 ? 40 : 72; x < 720; x += 64) s += `<circle cx="${x}" cy="${y}" r="3" fill="#E9DDC8"/>`;
  return s;
}
// the 10-second "comment your answer" card; icons: [[svgCenteredAt0, label], x3]
function countdownCard(t, cd0, title, icons, prompt = 'Comment your answer') {
  let s = creamBG() + pill(title, 360, 190, { size: 44 });
  s += `<rect x="40" y="296" width="640" height="300" rx="36" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/>`;
  icons.forEach(([svgI, label], k) => { const x = [155, 360, 566][k]; s += `<g transform="translate(${x} 425)">${svgI}</g>` + text(x, 552, label, { size: 28, weight: 500 }); });
  const rem = clamp((cd0 + 10 - t) / 10), r = 118, circ = 2 * Math.PI * r, n = clamp(Math.ceil(cd0 + 10 - t), 1, 10);
  const f = t >= cd0 ? (t - cd0) % 1 : 1, pulse = 1 + .16 * Math.max(0, 1 - f * 5);
  s += `<g transform="translate(360 840)"><circle r="${r + 26}" fill="${C.card}" stroke="${C.ink}" stroke-width="4"/><circle r="${r}" fill="none" stroke="#EADFCB" stroke-width="20"/>
    <circle r="${r}" fill="none" stroke="${C.red}" stroke-width="20" stroke-linecap="round" stroke-dasharray="${f1(circ * rem)} ${f1(circ)}" transform="rotate(-90)"/>
    <g transform="scale(${pulse.toFixed(3)})">${text(0, 48, String(n), { size: 140, weight: 700 })}</g></g>`;
  s += `<path d="M168 1030 h52 a14 14 0 0 1 14 14 v28 a14 14 0 0 1 -14 14 h-30 l-16 14 v-14 h-6 a14 14 0 0 1 -14 -14 v-28 a14 14 0 0 1 14 -14 z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3.5"/>` + text(254, 1066, prompt, { size: 40, anchor: 'start' });
  return s;
}
function followPill(t, t0) { return pill('Follow for more puzzles', 360, 1180, { ...(popAnim(t, t0, VDUR + 1) || { scale: 0, opacity: 0 }), icon: 'plus', size: 38 }); }
const anOr0 = a => a || { scale: 0, opacity: 0 };

// ---------- frame + player ----------
const DEFS = `<defs><radialGradient id="gWarm"><stop offset="0" stop-color="#FFD98A" stop-opacity=".75"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>
  <radialGradient id="gVig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>`;
function startReel(cfg = {}) {
  const svg = document.getElementById('svg'), noCap = new Set(cfg.noCap || []);
  function renderAt(t) {
    t = clamp(t, 0, VDUR - 1e-4);
    let i = 0; while (i + 1 < S.length && t >= S[i + 1]) i++;
    const punch = 1 + .04 * (1 - easeOut(prog(t, S[i], S[i] + .3)));
    let s = DEFS + `<g transform="translate(360 640) scale(${punch.toFixed(4)}) translate(-360 -640)">${SCENES[i](t)}</g><rect width="720" height="1280" fill="url(#gVig)"/>`;
    if (cfg.overlay) s += cfg.overlay(t, i);
    if (!noCap.has(i)) { const an = popAnim(t, S[i] + .05, SE(i) - .05); if (an) s += pill(VO[i].cap, 360, 205, an); }
    svg.innerHTML = s;
  }
  const cd = cfg.cd;
  window.renderAt = renderAt; window.DUR = VDUR;
  window.cues = () => ({ dur: VDUR, music: cfg.music || 'mystery', sfx: SFX.slice().sort((a, b) => a[0] - b[0]).map(([t, k]) => [+t.toFixed(3), k]),
    vo: VO.map((l, i) => ({ t: +S[i].toFixed(3), dur: l.dur, file: l.file, text: l.text })),
    countdown: cd != null ? [T(cd) + .1, T(cd) + .5, T(cd) + 10.5, T(cd) + 11] : [0, .001, .002, .003] });
  const params = new URLSearchParams(location.search);
  window.ready = document.fonts.load('700 60px Fredoka').then(() => document.fonts.ready).then(() => {
    if (params.has('render')) { document.body.classList.add('render'); renderAt(+params.get('t') || 0); return; }
    const stage = document.getElementById('stage');
    const fit = () => { const k = Math.min(innerWidth / W, (innerHeight - 40) / H); stage.style.transform = `scale(${k})`; };
    addEventListener('resize', fit); fit();
    let playing = true, t0 = performance.now(), cur = 0;
    const tick = now => { if (playing) { cur = ((now - t0) / 1000) % VDUR; renderAt(cur); } requestAnimationFrame(tick); };
    const toggle = () => { playing = !playing; t0 = performance.now() - cur * 1000; };
    stage.addEventListener('click', toggle);
    addEventListener('keydown', e => {
      if (e.code === 'Space') { e.preventDefault(); toggle(); }
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') { cur = clamp(cur + (e.code === 'ArrowRight' ? 1 : -1), 0, VDUR - .01); t0 = performance.now() - cur * 1000; renderAt(cur); }
    });
    requestAnimationFrame(tick);
  });
}
