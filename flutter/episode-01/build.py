#!/usr/bin/env python3
"""Build the FLUTTER Episode 1 storyboard from shots.py.

Writes, next to this file:
  storyboard-sheet.html  the storyboard sheet (panels, timeline, locks, copyable Flow prompts)
  storyboard.md          the same storyboard as Markdown, for reading on GitHub
  flow-prompts.md        paste-ready Google Flow prompts, hero frames first
  shot-list.csv          one row per shot
  shots.json             the expanded shot data

Frames: put chosen Flow images in frames/ named by shot ID (SC06C.png / .jpg / .jpeg / .webp).
They are embedded in the sheet and linked from the Markdown automatically.

Usage: python3 flutter/episode-01/build.py
"""
import base64
import csv
import html
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import shots as D  # noqa: E402

FRAMES = HERE / "frames"
REFERENCE = HERE.parent / "reference" / "protagonist-C01-C03.webp"

PARTS = [  # (label, first scene, last scene)
    ("Open", "SC00", "SC00"),
    ("I · The World", "SC01", "SC07"),
    ("II · The Room", "SC08", "SC13"),
    ("III · Birth", "SC14", "SC17"),
    ("Tag", "SC18", "SC18"),
]

ATTACH = {
    "C01-C03": "DP reference: reference/DP-C01.png + DP-C03.png (add DP-C02.png for three-quarter angles)",
    "CONSUMER-MASK": "Crescent-respirator crowd reference (flow-guide §1.1 lift test)",
    "CREATURE-G1": "Creature G1 (flow-guide §1.2)",
    "CHRYSALIS": "Chrysalis (flow-guide §1.3)",
    "PU-7": "Pollination unit (flow-guide §1.4)",
    "TIN": "Tin and diagram (flow-guide §1.4)",
    "DIAGRAM": "Tin and diagram (flow-guide §1.4)",
    "PET": "Pet (flow-guide §1.5)",
    "DRONE": "Drone (flow-guide §1.5)",
}
PLATES = {"APARTMENT", "HABITAT", "LIFT", "CITY", "BRIDGE", "AG-FLOOR"}

SIZES = {
    "EWS": "Extreme wide", "WS": "Wide", "MS": "Medium", "MCU": "Medium close-up", "CU": "Close-up",
    "ECU": "Extreme close-up", "INSERT": "Insert", "MACRO": "Macro", "OTS": "Over the shoulder", "TITLE": "Title / black",
}


def tc(seconds):
    s = round(seconds, 1)
    m, r = divmod(s, 60)
    return f"{int(m)}:{r:04.1f}" if r % 1 else f"{int(m)}:{int(r):02d}"


def esc(x):
    return html.escape(str(x), quote=True)


def expand(shot):
    if shot["size"] == "TITLE" or shot["prompt"].startswith("Pure black"):
        return shot["prompt"]
    body = shot["prompt"].format_map(D.BLOCKS).strip()
    style = D.STYLE + ("." if shot["motes"] else "." + D.STYLE_CLEAN_AIR)
    return f"{body} {style}"


def attach_list(refs):
    out = []
    for tag in refs:
        item = ATTACH.get(tag) or (f"{tag} plate (flow-guide §1.6)" if tag in PLATES else None)
        if item and item not in out:
            out.append(item)
    return out


def frame_file(shot_id):
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = FRAMES / f"{shot_id}.{ext}"
        if p.exists():
            return p
    return None


def data_uri(path):
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "webp": "image/webp"}[path.suffix[1:].lower()]
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def prepare():
    scenes = {sc: dict(id=sc, title=t, slug=slug, beat=b, shots=[]) for sc, t, slug, b in D.SCENES}
    t = 0.0
    rows = []
    for s in D.SHOTS:
        s = dict(s)
        s["start"], s["end"] = t, t + s["dur"]
        s["full_prompt"] = expand(s)
        s["attach"] = attach_list(s["refs"])
        s["frame"] = frame_file(s["id"])
        t += s["dur"]
        scenes[s["scene"]]["shots"].append(s)
        rows.append(s)
    for sc in scenes.values():
        sc["start"] = sc["shots"][0]["start"]
        sc["dur"] = sum(x["dur"] for x in sc["shots"])
    return [scenes[sc] for sc, *_ in D.SCENES], rows, t


# ── HTML ────────────────────────────────────────────────────────────────────
CSS = """
/* Layout: production storyboard sheet. Header + to-scale episode timeline, two lock cards,
   then scene slug strips over a responsive panel grid (3-up desktop, 1-up phone). Each panel is a
   16:9 frame with 2.39:1 frame lines, notes beneath, Flow prompts folded away. */
:root {
  --paper: #eceeea; --sheet: #f6f7f4; --ink: #1d2221; --muted: #5d6662; --rule: #cdd3cd;
  --frame: #dde2dc; --frame-ink: #8a948f; --amber: #a8681c; --amber-soft: #f3e3c8; --link: #2c5b68;
  --black: #0d0f0f;
  --display: "Barlow Condensed", "Arial Narrow", "Roboto Condensed", sans-serif;
  --body: "Source Sans 3", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --paper: #121514; --sheet: #191d1c; --ink: #e4e8e4; --muted: #9aa49f; --rule: #2c3331;
  --frame: #222826; --frame-ink: #6f7a75; --amber: #e2a650; --amber-soft: #3a2d18; --link: #86bfcc;
  --black: #050606; color-scheme: dark; } }
:root[data-theme="dark"] {
  --paper: #121514; --sheet: #191d1c; --ink: #e4e8e4; --muted: #9aa49f; --rule: #2c3331;
  --frame: #222826; --frame-ink: #6f7a75; --amber: #e2a650; --amber-soft: #3a2d18; --link: #86bfcc;
  --black: #050606; color-scheme: dark; }
* { box-sizing: border-box; }
body { background: var(--paper); color: var(--ink); font: 15px/1.5 var(--body); margin: 0; }
.wrap { max-width: 1280px; margin: 0 auto; padding-inline: 16px; padding-block: 28px 64px; }
h1, h2, h3 { font-family: var(--display); font-weight: 600; text-wrap: balance; margin: 0; }
a { color: var(--link); }
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; }
.eyebrow { font-family: var(--display); text-transform: uppercase; letter-spacing: .14em; font-size: 13px; color: var(--muted); }

.masthead { display: grid; gap: 6px; border-bottom: 2px solid var(--ink); padding-bottom: 14px; }
.masthead h1 { font-size: clamp(44px, 8vw, 84px); letter-spacing: .32em; line-height: .95; font-weight: 500; }
.masthead .ep { font-family: var(--display); font-size: 24px; letter-spacing: .04em; }
.facts { display: flex; flex-wrap: wrap; gap: 6px 22px; color: var(--muted); font-size: 14px; }
.facts b { color: var(--ink); font-weight: 600; }

.timeline { margin-top: 22px; }
.bar { display: flex; height: 34px; border: 1px solid var(--ink); background: var(--sheet); }
.bar a { display: block; height: 100%; border-right: 1px solid var(--rule); text-decoration: none; position: relative; }
.bar a:last-child { border-right: 0; }
.bar a:nth-child(odd) { background: var(--frame); }
.bar a:hover, .bar a:focus-visible { background: var(--amber-soft); outline: none; }
.bar a span { position: absolute; inset: 0; display: grid; place-items: center; font: 600 11px var(--display); color: var(--muted); overflow: hidden; }
.ticks { position: relative; height: 18px; font: 11px var(--mono); color: var(--muted); }
.ticks span { position: absolute; transform: translateX(-50%); top: 2px; }
.ticks span:first-child { transform: none; } .ticks span:last-child { transform: translateX(-100%); }
.parts { display: flex; margin-top: 4px; }
.parts div { border-top: 3px solid var(--ink); padding-top: 4px; font: 600 13px var(--display); letter-spacing: .06em; text-transform: uppercase; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-right: 6px; }
.parts div:nth-child(even) { border-top-color: var(--amber); }

.locks { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 28px; }
.lock { background: var(--sheet); border: 1px solid var(--rule); padding: 16px; display: grid; gap: 10px; min-width: 0; align-content: start; }
.lock h2 { font-size: 22px; }
.lock img { width: 100%; height: auto; display: block; border: 1px solid var(--rule); }
.lock ul { margin: 0; padding-left: 18px; display: grid; gap: 4px; }
.lock p { margin: 0; }
.lock .rule { font-size: 14px; color: var(--muted); }

.controls { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center;
  background: var(--paper); border-bottom: 1px solid var(--rule); padding-block: 10px; margin-top: 28px; }
.controls label { display: inline-flex; gap: 6px; align-items: center; font-size: 14px; cursor: pointer; }
.controls .count { margin-left: auto; color: var(--muted); font-size: 13px; }

.scene { margin-top: 34px; scroll-margin-top: 64px; }
.slug { display: grid; grid-template-columns: auto 1fr auto; gap: 4px 14px; align-items: baseline; border-top: 2px solid var(--ink); padding-top: 8px; }
.slug .num { font: 500 22px var(--mono); }
.slug h2 { font-size: 22px; font-weight: 500; letter-spacing: .03em; text-transform: uppercase; min-width: 0; }
.slug .when { font-size: 13px; color: var(--muted); text-align: right; }
.slug .sub { grid-column: 2 / 4; color: var(--muted); font-size: 14px; }
@media (max-width: 560px) { .slug { grid-template-columns: auto 1fr; } .slug .when { grid-column: 1 / 3; text-align: left; } .slug .sub { grid-column: 1 / 3; } }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 18px; margin-top: 14px; }
.shot { background: var(--sheet); border: 1px solid var(--rule); display: flex; flex-direction: column; min-width: 0; }
.shot.hero { border-color: var(--amber); }
.frame { position: relative; aspect-ratio: 16 / 9; max-width: 100%; background: var(--frame); overflow: hidden; border-bottom: 1px solid var(--rule); }
.frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.frame .lb { position: absolute; left: 0; right: 0; height: 12.8%; background: color-mix(in srgb, var(--ink) 9%, transparent); border-color: var(--frame-ink); border-style: dashed; border-width: 0; }
.frame .lb.top { top: 0; border-bottom-width: 1px; } .frame .lb.bot { bottom: 0; border-top-width: 1px; }
.frame .ph { position: absolute; inset: 12.8% 0; display: grid; place-content: center; text-align: center; color: var(--frame-ink); gap: 2px; padding: 8px; }
.frame .ph b { font: 600 34px var(--display); letter-spacing: .06em; color: var(--frame-ink); }
.frame .ph small { font: 12px var(--mono); }
.frame.black { background: var(--black); }
.frame.black .ph, .frame.black .ph b { color: #d9dcd8; }
.frame.black .lb { display: none; }
.frame .tag { position: absolute; top: 8px; left: 8px; font: 600 12px var(--display); letter-spacing: .08em; background: var(--amber); color: var(--sheet); padding: 1px 7px; }
.notes { padding: 10px 12px 12px; display: grid; gap: 6px; flex: 1; align-content: start; }
.head { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; }
.head .id { font: 600 16px var(--mono); }
.head .t { font-size: 12px; color: var(--muted); margin-left: auto; }
.cam { font: 12px var(--mono); color: var(--muted); margin: 0; }
.action { margin: 0; }
.sound { margin: 0; font-size: 13px; color: var(--muted); }
.sound b, .ost b { font-weight: 600; color: var(--ink); }
.ost { margin: 0; font: 12px var(--mono); background: var(--amber-soft); padding: 3px 6px; overflow-wrap: anywhere; }
.trans { font: 600 12px var(--display); letter-spacing: .1em; color: var(--muted); text-align: right; border-top: 1px dashed var(--rule); padding-top: 6px; margin-top: 2px; }
details.prompt { border-top: 1px solid var(--rule); padding: 8px 12px 10px; font-size: 13px; }
details.prompt summary { cursor: pointer; font: 600 13px var(--display); letter-spacing: .08em; text-transform: uppercase; color: var(--link); }
details.prompt p { margin: 8px 0 4px; overflow-wrap: anywhere; }
details.prompt .lbl { font: 600 11px var(--display); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-top: 10px; }
button.copy { font: 600 12px var(--display); letter-spacing: .08em; text-transform: uppercase; background: transparent; color: var(--link); border: 1px solid var(--link); padding: 4px 10px; cursor: pointer; }
button.copy:hover { background: var(--link); color: var(--sheet); }
button:focus-visible, summary:focus-visible, input:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
body.hero-only .shot:not(.hero), body.hero-only .scene.no-hero { display: none; }
body.hide-prompts details.prompt { display: none; }

.legend { margin-top: 48px; border-top: 2px solid var(--ink); padding-top: 12px; display: grid; gap: 10px; color: var(--muted); font-size: 14px; }
.legend dl { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 4px 18px; margin: 0; }
.legend dt { font: 600 13px var(--display); letter-spacing: .06em; color: var(--ink); display: inline; }
.legend dd { display: inline; margin: 0 0 0 6px; }
@media (prefers-reduced-motion: no-preference) { .bar a { transition: background .15s; } }
"""

JS = """
(function () {
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var hero = document.getElementById('f-hero'), prompts = document.getElementById('f-prompts');
  function apply() {
    document.body.classList.toggle('hero-only', hero.checked);
    document.body.classList.toggle('hide-prompts', !prompts.checked);
    store('fl-ep1-hero', hero.checked ? '1' : '0'); store('fl-ep1-prompts', prompts.checked ? '1' : '0');
  }
  if (store('fl-ep1-hero') === '1') hero.checked = true;
  if (store('fl-ep1-prompts') === '0') prompts.checked = false;
  hero.addEventListener('change', apply); prompts.addEventListener('change', apply); apply();
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button.copy'); if (!b) return;
    var el = document.getElementById(b.getAttribute('data-src')); var text = el.textContent;
    function done(msg) { var o = b.textContent; b.textContent = msg; setTimeout(function () { b.textContent = o; }, 1400); }
    function fallback() { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); done('Selected: press Ctrl/Cmd+C'); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Copied'); }, fallback);
    else fallback();
  });
})();
"""


def panel_html(s):
    sid = s["id"].lower()
    black = s["size"] == "TITLE" or s["prompt"].startswith("Pure black")
    if s["frame"]:
        inner = f'<img src="{data_uri(s["frame"])}" alt="{esc(s["id"])}: {esc(s["action"])}">'
    elif black:
        inner = f'<div class="ph"><b>{esc(s["text"] or "BLACK")}</b><small>{esc(s["dur"])} s</small></div>'
    else:
        lens = f'{s["lens"]} mm · ' if s["lens"] else ""
        inner = (f'<div class="lb top"></div><div class="lb bot"></div>'
                 f'<div class="ph"><b>{esc(s["size"])}</b><small>{lens}{esc(s["move"])}</small><small>frame pending</small></div>')
    tag = '<span class="tag">HERO</span>' if s["hero"] else ""
    cam = " · ".join(x for x in [SIZES.get(s["size"], s["size"]), f'{s["lens"]} mm' if s["lens"] else "", s["angle"] if s["angle"] != "—" else "", s["move"] if s["move"] != "—" else ""] if x)
    parts = [
        f'<article class="shot{" hero" if s["hero"] else ""}" id="{sid}">',
        f'<div class="frame{" black" if black and not s["frame"] else ""}">{inner}{tag}</div>',
        '<div class="notes">',
        f'<div class="head"><span class="id">{esc(s["id"])}</span><span class="mono">{s["dur"]:g} s</span>'
        f'<span class="t mono">{tc(s["start"])}–{tc(s["end"])}</span></div>',
        f'<p class="cam">{esc(cam)}</p>',
        f'<p class="action">{esc(s["action"])}</p>',
    ]
    if s["sound"]:
        parts.append(f'<p class="sound"><b>Sound</b> {esc(s["sound"])}</p>')
    if s["text"]:
        parts.append(f'<p class="ost"><b>On screen</b> {esc(s["text"])}</p>')
    parts.append(f'<div class="trans">→ {esc(s["trans"])}</div></div>')
    if not black:
        attach = "; ".join(s["attach"]) or "Nothing (text only)"
        parts += [
            '<details class="prompt"><summary>Flow prompt</summary>',
            f'<div class="lbl">Attach</div><p>{esc(attach)}</p>',
            '<div class="lbl">Settings</div><p>Nano Banana Pro · 16:9 · 4 outputs · save as '
            f'<span class="mono">{esc(s["id"])}.png</span></p>',
            f'<div class="lbl">Image prompt</div><p id="{sid}-p">{esc(s["full_prompt"])}</p>',
            f'<button class="copy" type="button" data-src="{sid}-p">Copy image prompt</button>',
            f'<div class="lbl">Motion prompt</div><p id="{sid}-m">{esc(s["motion"])}</p>',
            f'<button class="copy" type="button" data-src="{sid}-m">Copy motion prompt</button>',
            '</details>',
        ]
    parts.append("</article>")
    return "".join(parts)


def build_html(scenes, rows, total):
    by_id = {sc["id"]: sc for sc in scenes}
    bar = "".join(
        f'<a href="#{sc["id"].lower()}" style="width:{sc["dur"] / total * 100:.3f}%" '
        f'title="{esc(sc["id"])} {esc(sc["title"])} · {tc(sc["start"])}"><span>{esc(sc["id"][2:])}</span></a>'
        for sc in scenes)
    ticks = "".join(f'<span style="left:{m * 60 / total * 100:.3f}%">{m}:00</span>' for m in range(0, int(total // 60) + 1))
    parts_row = ""
    for label, a, b in PARTS:
        dur = sum(sc["dur"] for sc in scenes if a <= sc["id"] <= b)
        parts_row += f'<div style="width:{dur / total * 100:.3f}%" title="{esc(label)}">{esc(label)}</div>'
    heroes = sum(1 for r in rows if r["hero"])
    framed = sum(1 for r in rows if r["frame"])
    ref_img = f'<img src="{data_uri(REFERENCE)}" alt="Character reference sheet C01 to C03">' if REFERENCE.exists() else ""

    out = [
        "<title>FLUTTER Episode 1 Storyboard</title>",
        '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Source+Sans+3:wght@400;600&display=swap">',
        f"<style>{CSS}</style>",
        '<div class="wrap">',
        '<header class="masthead">',
        '<div class="eyebrow">Storyboard sheet · draft v0.1</div>',
        f'<h1>{esc(D.EPISODE["title"])}</h1>',
        f'<div class="ep">{esc(D.EPISODE["episode"])}</div>',
        f'<div class="facts"><span><b class="mono">{tc(total)}</b> runtime</span><span><b>{len(scenes)}</b> scenes</span>'
        f'<span><b>{len(rows)}</b> shots</span><span><b>{heroes}</b> hero frames</span><span><b>{framed}/{len(rows)}</b> frames generated</span>'
        f'<span>No dialogue · composed for 2.39:1 inside 16:9</span></div>',
        f'<p class="facts" style="margin:4px 0 0">{esc(D.EPISODE["covers"])}.</p>',
        "</header>",
        '<section class="timeline" aria-label="Episode timeline, to scale">',
        f'<div class="bar">{bar}</div><div class="ticks">{ticks}</div><div class="parts">{parts_row}</div>',
        "</section>",
        '<section class="locks">',
        '<div class="lock"><div class="eyebrow">Character lock</div><h2>DP · follow the reference strictly</h2>',
        ref_img,
        '<ul><li><b>Every frame:</b> attach C01 + C03. Match the face, curly hair with faded sides, trimmed beard and the mark by his left eye.</li>'
        '<li><b>Out of the apartment:</b> dusty charcoal jacket, grey T-shirt, dusty cargo trousers, brown boots, grey half-mask with hose to the belt unit.</li>'
        '<li><b>At home:</b> the same T-shirt and cargo trousers, no jacket, barefoot. No other wardrobe.</li>'
        '<li><b>Everyone else</b> wears pale clothes and slim crescent respirators. Only DP has dust on him.</li></ul>'
        '<p class="rule">Working name DP; the final name is decided later. The story is universal, with no national or cultural markers.</p></div>',
        '<div class="lock"><div class="eyebrow">Creature lock</div><h2>Generation 1</h2>',
        f'<p>{esc(D.BLOCKS["CREATURE"][0].upper() + D.BLOCKS["CREATURE"][1:])}.</p>',
        '<ul><li><b>Never</b> glows, never symmetrical, never looks like a gadget.</li>'
        '<li><b>Right forewing</b> is kinked, so its flight always dips to the right.</li>'
        '<li><b>The light rule:</b> no dust or visible beams in any shot until SC17E, when its scales make the first beam visible.</li></ul></div>',
        "</section>",
        '<div class="controls" role="group" aria-label="View options">',
        '<label for="f-hero"><input type="checkbox" id="f-hero"> Hero frames only</label>',
        '<label for="f-prompts"><input type="checkbox" id="f-prompts" checked> Show Flow prompts</label>',
        '<span class="count">Generate hero frames first, then fill in the rest.</span>',
        "</div>",
    ]
    for sc in scenes:
        has_hero = any(s["hero"] for s in sc["shots"])
        out.append(f'<section class="scene{"" if has_hero else " no-hero"}" id="{sc["id"].lower()}">')
        out.append(
            f'<div class="slug"><span class="num">{esc(sc["id"])}</span><h2>{esc(sc["slug"])}</h2>'
            f'<span class="when mono">{tc(sc["start"])}–{tc(sc["start"] + sc["dur"])} · {sc["dur"]:g} s</span>'
            f'<span class="sub">{esc(sc["title"])} · {esc(sc["beat"])} · {len(sc["shots"])} shots</span></div>')
        out.append('<div class="grid">' + "".join(panel_html(s) for s in sc["shots"]) + "</div></section>")
    legend = "".join(f"<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>" for k, v in SIZES.items())
    out += [
        '<footer class="legend"><div class="eyebrow">Legend</div>',
        f"<dl>{legend}</dl>",
        "<p>Dashed lines inside each frame mark the 2.39:1 extraction from the 16:9 generation. On-screen text is "
        "always added in post, never generated. Timecodes are episode time.</p>",
        "<p>Built from <span class=\"mono\">flutter/episode-01/shots.py</span>. Put chosen Flow images in "
        "<span class=\"mono\">flutter/episode-01/frames/</span> named by shot ID and rebuild to place them in the panels.</p>",
        "</footer>",
        "</div>",
        f"<script>{JS}</script>",
    ]
    return "\n".join(out)


# ── Markdown / CSV / JSON ───────────────────────────────────────────────────
def build_md(scenes, rows, total):
    out = [
        f"# {D.EPISODE['title']} — {D.EPISODE['episode']}: Storyboard",
        "",
        f"**{tc(total)}** · {len(scenes)} scenes · {len(rows)} shots · {sum(r['hero'] for r in rows)} hero frames · no dialogue",
        "",
        f"{D.EPISODE['covers']}. The visual sheet is [`storyboard-sheet.html`](storyboard-sheet.html); "
        "paste-ready prompts are in [`flow-prompts.md`](flow-prompts.md).",
        "",
        "**Character:** DP (working name), played by Dharampal. Follow [`../reference/protagonist-C01-C03.webp`]"
        "(../reference/protagonist-C01-C03.webp) strictly in every frame. **Universal story:** no national or cultural markers.",
        "",
        "| Scene | Slug | Time | Shots |",
        "|---|---|---|---|",
    ]
    for sc in scenes:
        out.append(f"| [{sc['id']}](#{sc['id'].lower()}) | {sc['slug']} | {tc(sc['start'])}–{tc(sc['start'] + sc['dur'])} | {len(sc['shots'])} |")
    for sc in scenes:
        out += ["", f'<a id="{sc["id"].lower()}"></a>', "",
                f"## {sc['id']} · {sc['title']}", "",
                f"**{sc['slug']}** · {tc(sc['start'])}–{tc(sc['start'] + sc['dur'])} · {sc['beat']}", "",
                "| Shot | Frame | Time | Size / lens / move | Action | Sound · On screen | Out |",
                "|---|---|---|---|---|---|---|"]
        for s in sc["shots"]:
            img = f'<img src="frames/{s["frame"].name}" width="160">' if s["frame"] else "—"
            star = " ⭐" if s["hero"] else ""
            cam = f"{s['size']} · {s['lens']} mm · {s['move']}" if s["lens"] else s["size"]
            extra = " · ".join(x for x in [s["sound"], f"`{s['text']}`" if s["text"] else ""] if x)
            out.append(f"| **{s['id']}**{star} | {img} | {tc(s['start'])} ({s['dur']:g} s) | {cam} | "
                       f"{s['action'].replace('|', '/')} | {extra.replace('|', '/')} | {s['trans']} |")
    return "\n".join(out) + "\n"


def build_flow_md(rows):
    heroes = [r for r in rows if r["hero"]]
    out = [
        "# FLUTTER Episode 1 — Google Flow prompts",
        "",
        "Build the ingredients first ([`../storyboard/flow-guide.md`](../storyboard/flow-guide.md) §1), then generate "
        "frames here. **Settings for every shot:** Nano Banana Pro · 16:9 · 4 outputs. Save each chosen image as "
        "`frames/<SHOT>.png` and run `python3 flutter/episode-01/build.py`.",
        "",
        "## ⭐ Hero frames first",
        "",
    ]
    out += [f"{i}. [{r['id']}](#{r['id'].lower()}): {r['action']}" for i, r in enumerate(heroes, 1)]
    out += ["", "## All shots", ""]
    for r in rows:
        if r["size"] == "TITLE" or r["prompt"].startswith("Pure black"):
            continue
        out += [f'<a id="{r["id"].lower()}"></a>', "",
                f"### {'⭐ ' if r['hero'] else ''}{r['id']} · {r['size']} · {tc(r['start'])}", "",
                r["action"], "",
                "**Attach:** " + ("; ".join(r["attach"]) or "nothing (text only)"), "",
                "**Image prompt:**", "", "```", r["full_prompt"], "```", "",
                "**Motion prompt** (Frames to Video):", "", "```", r["motion"], "```", ""]
    return "\n".join(out)


def main():
    scenes, rows, total = prepare()
    (HERE / "storyboard-sheet.html").write_text(build_html(scenes, rows, total))
    (HERE / "storyboard.md").write_text(build_md(scenes, rows, total))
    (HERE / "flow-prompts.md").write_text(build_flow_md(rows))
    fields = ["id", "scene", "start", "dur", "size", "lens", "angle", "move", "action", "sound", "text", "trans",
              "hero", "refs", "attach", "full_prompt", "motion", "frame"]
    with open(HERE / "shot-list.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in rows:
            w.writerow({k: (tc(r[k]) if k == "start" else "; ".join(r[k]) if isinstance(r[k], list)
                            else (r[k].name if k == "frame" and r[k] else ("" if r[k] is None else r[k]))) for k in fields})
    (HERE / "shots.json").write_text(json.dumps(
        [{k: (r[k].name if k == "frame" and r[k] else r[k]) for k in fields + ["end", "prompt", "motes"]} for r in rows],
        indent=1, ensure_ascii=False))
    print(f"{len(rows)} shots · {tc(total)} · frames {sum(1 for r in rows if r['frame'])}/{len(rows)}")


if __name__ == "__main__":
    main()
