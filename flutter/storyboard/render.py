#!/usr/bin/env python3
"""Render the FLUTTER storyboard from data/*.json.

Writes:
  - S*.md          storyboard pages (shot index + shot cards, with frames embedded when present)
  - flow/*.md      paste-ready Google Flow prompt pages, plus flow/README.md with the hero frames
  - shot-list.csv  every shot in one sheet
  - README.md      storyboard index

Frames: put chosen images in frames/ named by shot ID (B07-A.png / .jpg / .jpeg / .webp).

Usage: python3 flutter/storyboard/render.py
"""
import csv
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
FRAMES = HERE / "frames"
FLOW = HERE / "flow"

SEQUENCES = [
    ("S1-the-world", "S1", "Part I — The World", "1–7", "0:00"),
    ("S2-the-room", "S2", "Part II — The Room", "8–13", "3:00"),
    ("S3-birth", "S3", "Part III — Birth", "14–17", "5:30"),
    ("S4-discovery", "S4", "Part IV — Discovery", "18–25", "8:30"),
    ("S5-hunt-and-ending", "S5", "Part V — The Hunt + Ending", "26–39", "11:45"),
]

# Beats whose key frame should be generated first in Flow, and why.
HERO_BEATS = {
    4: "City reveal",
    9: "The habitat revealed",
    12: "Last try",
    14: "Chrysalis discovered",
    16: "Emergence",
    17: "First flight: the first visible light beam",
    19: "Pollination",
    22: "The bud: pollen in the light",
    28: "Silence",
    32: "The refusal",
    33: "Entry",
    36: "Two butterflies in one frame",
}

FIELDS = [
    "id", "beat", "title", "duration_s", "shot_size", "angle", "lens_mm", "camera",
    "frame", "action", "light_colour", "sound", "text_on_screen", "transition",
    "keyframe_prompt", "motion_prompt", "refs", "notes",
]

# Reference tag -> what to attach in Flow (sections refer to flow-guide.md).
ATTACH = {
    "C01-C03": "DP: C01 + C03 crops of the reference sheet (add C02 for three-quarter angles)",
    "HOME-WARDROBE": "DP home-wardrobe test image (guide §1.1)",
    "CONSUMER-MASK": "DP lift test image or LIFT plate, for the crescent respirators (guide §1.1, §1.6)",
    "CREATURE-G1": "Creature G1 (guide §1.2)",
    "CREATURE-G2": "Creature G2 (guide §1.3)",
    "CHRYSALIS": "Chrysalis (guide §1.3)",
    "PU-7": "Pollination unit (guide §1.4)",
    "TIN": "Tin and diagram (guide §1.4)",
    "DIAGRAM": "Tin and diagram (guide §1.4)",
    "PET": "Pet (guide §1.5)",
    "OFFICERS": "Officers (guide §1.5)",
    "DRONE": "Drone (guide §1.5)",
}
PLATES = {"APARTMENT", "HABITAT", "LIFT", "CITY", "BRIDGE", "AG-FLOOR", "OPS-ROOM", "CODA-APT"}

FLOW_ASPECT = "16:9 frame with the key action kept inside a central 2.39:1 band"


def to_seconds(stamp):
    m, s = stamp.split(":")
    return int(m) * 60 + int(s)


def timecode(seconds):
    seconds = round(seconds)
    return f"{seconds // 60}:{seconds % 60:02d}"


def short(text, limit=140):
    text = str(text)
    return text if len(text) <= limit else text[: limit - 1].rsplit(" ", 1)[0] + "…"


def cell(text):
    return str(text).replace("|", "\\|").replace("\n", " ")


def frame_for(shot_id):
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = FRAMES / f"{shot_id}.{ext}"
        if p.exists():
            return p.name
    return None


def attach_list(refs):
    out = []
    for tag in refs or []:
        if tag in ATTACH:
            item = ATTACH[tag]
        elif tag in PLATES:
            item = f"{tag} plate (guide §1.6)"
        else:
            continue
        if item not in out:
            out.append(item)
    return out


def flow_prompt(shot):
    prompt = shot["keyframe_prompt"].strip()
    prompt = prompt.replace("2.39:1 composition", FLOW_ASPECT)
    if FLOW_ASPECT not in prompt:
        prompt = prompt.rstrip(".") + f". {FLOW_ASPECT}."
    if "C01-C03" in (shot.get("refs") or []) and not prompt.lower().startswith("the man in the reference"):
        prompt = "The man in the reference images is DP. " + prompt
    return prompt


def render_shot(shot, start):
    refs = ", ".join(shot.get("refs") or [])
    lines = [f'<a id="{shot["id"].lower()}"></a>', ""]
    lines += [f"### {shot['id']} · {shot['shot_size']} · {shot['duration_s']:g} s · *{shot['title']}*", ""]
    img = frame_for(shot["id"])
    if img:
        lines += [f"![{shot['id']}](frames/{img})", ""]
    lines += [
        f"`{timecode(start)}` · {shot['lens_mm']} mm · {shot['angle']} · {shot['camera']} · out: **{shot['transition']}**",
        "",
        f"**Frame:** {shot['frame']}",
        "",
        f"**Action:** {shot['action']}",
        "",
        f"**Light / colour:** {shot['light_colour']}",
        "",
        f"**Sound:** {shot['sound']}",
        "",
    ]
    if shot.get("text_on_screen"):
        lines += [f"**On screen (added in post):** `{shot['text_on_screen']}`", ""]
    if refs:
        lines += [f"**Refs:** {refs}", ""]
    if shot.get("notes"):
        lines += [f"**Notes:** {shot['notes']}", ""]
    lines += [
        "<details><summary>Generation prompts</summary>",
        "",
        f"**Keyframe:** {shot['keyframe_prompt']}",
        "",
        f"**Motion:** {shot['motion_prompt']}",
        "",
        "</details>",
        "",
    ]
    return "\n".join(lines)


def render_flow_shot(shot, hero=False):
    attach = attach_list(shot.get("refs"))
    img = frame_for(shot["id"])
    lines = [f'<a id="{shot["id"].lower()}"></a>', ""]
    lines += [f"### {'⭐ ' if hero else ''}{shot['id']} · {shot['shot_size']} · *{shot['title']}*", ""]
    if img:
        lines += [f"✅ Frame saved: `frames/{img}`", ""]
    lines += [f"{short(shot['action'], 220)}", ""]
    lines += ["**Attach:** " + ("; ".join(attach) if attach else "nothing (text only)"), ""]
    lines += ["**Settings:** Nano Banana Pro · 16:9 · 4 outputs", ""]
    lines += ["**Image prompt:**", "", "```", flow_prompt(shot), "```", ""]
    lines += ["**Motion prompt** (Frames to Video, start frame = the chosen image):", "", "```", shot["motion_prompt"].strip(), "```", ""]
    lines += [f"**Save as:** `{shot['id']}.png`", ""]
    return "\n".join(lines)


def pick_heroes(all_shots):
    heroes = []
    for beat, why in HERO_BEATS.items():
        in_beat = [s for s in all_shots if s["beat"] == beat]
        if not in_beat:
            continue
        best = max(in_beat, key=lambda s: (s["duration_s"], -in_beat.index(s)))
        heroes.append((best, why))
    return heroes


def main():
    FLOW.mkdir(exist_ok=True)
    overview = []
    all_rows = []
    all_shots = []
    seq_of = {}
    loaded = []
    rendered = {}
    for file, key, title, beats, start_stamp in SEQUENCES:
        path = DATA / f"{file}.json"
        if not path.exists():
            continue
        shots = json.loads(path.read_text())
        shots.sort(key=lambda s: (s["beat"], s["id"]))
        loaded.append((file, key, title, beats, start_stamp, shots))
        all_shots += shots
        for s in shots:
            seq_of[s["id"]] = file

    hero_ids = {s["id"] for s, _ in pick_heroes(all_shots)}

    for file, key, title, beats, start_stamp, shots in loaded:
        t = to_seconds(start_stamp)
        total = sum(s["duration_s"] for s in shots)
        index = ["| Shot | Frame | Beat | Time | Size | Dur | Action |", "|---|---|---|---|---|---|---|"]
        body, flow_body = [], []
        for s in shots:
            img = frame_for(s["id"])
            thumb = f'<img src="frames/{img}" width="120">' if img else "—"
            index.append(
                f"| [{s['id']}](#{s['id'].lower()}) | {thumb} | {s['beat']} | {timecode(t)} | {s['shot_size']} "
                f"| {s['duration_s']:g} s | {cell(short(s['action']))} |"
            )
            body.append(render_shot(s, t))
            flow_body.append(render_flow_shot(s, hero=s["id"] in hero_ids))
            row = {k: s.get(k, "") for k in FIELDS}
            row["refs"] = ", ".join(s.get("refs") or [])
            row["start"] = timecode(t)
            row["sequence"] = key
            all_rows.append(row)
            t += s["duration_s"]

        done = sum(1 for s in shots if frame_for(s["id"]))
        page = [
            f"# FLUTTER Storyboard — {key}: {title}",
            "",
            f"Beats {beats} · starts {start_stamp} · {len(shots)} shots · {timecode(total)} screen time · "
            f"frames {done}/{len(shots)}",
            "",
            f"← [Storyboard index](README.md) · [Google Flow prompts for this sequence](flow/{file}.md)",
            "",
            "## Shot index",
            "",
            *index,
            "",
            "## Shots",
            "",
            *body,
        ]
        (HERE / f"{file}.md").write_text("\n".join(page))

        flow_page = [
            f"# Google Flow prompts — {key}: {title}",
            "",
            f"{len(shots)} shots · ⭐ = hero frame (generate first) · How to use: [flow-guide.md](../flow-guide.md)",
            "",
            f"← [Flow index](README.md) · [Storyboard page](../{file}.md)",
            "",
            *flow_body,
        ]
        (FLOW / f"{file}.md").write_text("\n".join(flow_page))
        rendered[file] = (len(shots), total)

    for file, key, title, beats, _ in SEQUENCES:
        n, total = rendered.get(file, (None, None))
        overview.append((key, title, beats, n, total, file))

    with open(HERE / "shot-list.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["sequence", "start"] + FIELDS)
        writer.writeheader()
        writer.writerows(all_rows)

    total_shots = sum(o[3] or 0 for o in overview)
    total_time = sum(o[4] or 0 for o in overview)
    total_frames = sum(1 for s in all_shots if frame_for(s["id"]))

    flow_index = [
        "# Google Flow prompts",
        "",
        "Paste-ready image and motion prompts for every shot. Read [flow-guide.md](../flow-guide.md) first, and "
        "**build the ingredients (DP, the creature, the locations) before any shot.**",
        "",
        "## ⭐ Hero frames: generate these first",
        "",
        "One key frame per turning point. If these work, the look of the film works.",
        "",
        "| # | Shot | Moment | Frame |",
        "|---|---|---|---|",
    ]
    for i, (s, why) in enumerate(pick_heroes(all_shots), 1):
        file = seq_of[s["id"]]
        mark = "✅" if frame_for(s["id"]) else "—"
        flow_index.append(f"| {i} | [{s['id']}]({file}.md#{s['id'].lower()}) | {why} | {mark} |")
    flow_index += ["", "## By sequence", "", "| Sequence | Part | Shots |", "|---|---|---|"]
    for key, title, beats, n, total, file in overview:
        flow_index.append(f"| [{key}]({file}.md) | {title} | {n if n is not None else '—'} |" if n is not None
                          else f"| {key} | {title} | *missing* |")
    flow_index.append("")
    (FLOW / "README.md").write_text("\n".join(flow_index))

    readme = [
        "# FLUTTER — Storyboard",
        "",
        "Shot-by-shot storyboard built from the locked [story beats](../04-story-beats.md). Every shot has a "
        "self-contained **image prompt** (for a keyframe) and a **motion prompt** (for image-to-video). "
        "Interface text is always added in post.",
        "",
        "**Making the images:** they're generated in **Google Flow**. Start with the [Flow guide](flow-guide.md), "
        "then work through the [Flow prompt pages](flow/README.md), hero frames first.",
        "",
        "The protagonist is called **DP** throughout. He is played by Dharampal; attach the character reference "
        "sheet [`../reference/protagonist-C01-C03.webp`](../reference/protagonist-C01-C03.webp) to every shot "
        "tagged `C01-C03`.",
        "",
        f"**{total_shots} shots · {timecode(total_time)} total · frames {total_frames}/{total_shots}**",
        "",
        "| Sequence | Part | Beats | Shots | Screen time | Flow prompts |",
        "|---|---|---|---|---|---|",
    ]
    for key, title, beats, n, total, file in overview:
        if n is None:
            readme.append(f"| {key} | {title} | {beats} | — | *missing* | — |")
        else:
            readme.append(f"| [{key}]({file}.md) | {title} | {beats} | {n} | {timecode(total)} | [prompts](flow/{file}.md) |")
    readme += [
        "",
        "## Files",
        "",
        "- [`flow-guide.md`](flow-guide.md): how to make the frames in Google Flow, with ingredient prompts",
        "- [`flow/`](flow/README.md): paste-ready Flow prompts per sequence, with the hero-frame list",
        "- `S1…S5 *.md`: the storyboard pages, with a shot index then full shot cards",
        "- [`frames/`](frames/): your chosen Flow images, named by shot ID; they appear in the pages automatically",
        "- [`shot-list.csv`](shot-list.csv): every shot in one sheet",
        "- `data/*.json`: the source shot data; edit it, then run `python3 flutter/storyboard/render.py`",
        "",
        "## Reference tags",
        "",
        "| Tag | Use |",
        "|---|---|",
        "| `C01-C03` | DP's character reference sheet (work wardrobe and respirator) |",
        "| `HOME-WARDROBE` | DP at home: clean T-shirt and soft trousers, barefoot, mask pressure line |",
        "| `CONSUMER-MASK` | Everyone else's slim crescent respirator |",
        "| `CREATURE-G1` / `CREATURE-G2` / `CHRYSALIS` | Canonical creature text in [03-creature.md](../03-creature.md) §11 |",
        "| `PU-7` | The damaged pollination unit (bent right wing spar) |",
        "| `PET` | The feline-pattern bio-synthetic companion |",
        "| `HABITAT`, `TIN`, `DIAGRAM`, `LOG` | The hidden bay and its contents ([02-protagonist.md](../02-protagonist.md)) |",
        "| `APARTMENT`, `LIFT`, `CITY`, `BRIDGE`, `AG-FLOOR`, `OPS-ROOM`, `OFFICERS`, `DRONE`, `CODA-APT` | Location and character plates ([flow-guide.md](flow-guide.md) §1.5–1.6) |",
        "",
    ]
    (HERE / "README.md").write_text("\n".join(readme))
    print(f"{total_shots} shots, {timecode(total_time)}, frames {total_frames}/{total_shots}")


if __name__ == "__main__":
    main()
