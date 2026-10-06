#!/usr/bin/env python3
"""Render the FLUTTER storyboard from data/*.json into Markdown pages and a CSV shot list.

Usage: python3 flutter/storyboard/render.py
"""
import csv
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"

SEQUENCES = [
    ("S1-the-world", "S1", "Part I — The World", "1–7", "0:00"),
    ("S2-the-room", "S2", "Part II — The Room", "8–13", "3:00"),
    ("S3-birth", "S3", "Part III — Birth", "14–17", "5:30"),
    ("S4-discovery", "S4", "Part IV — Discovery", "18–25", "8:30"),
    ("S5-hunt-and-ending", "S5", "Part V — The Hunt + Ending", "26–39", "11:45"),
]

FIELDS = [
    "id", "beat", "title", "duration_s", "shot_size", "angle", "lens_mm", "camera",
    "frame", "action", "light_colour", "sound", "text_on_screen", "transition",
    "keyframe_prompt", "motion_prompt", "refs", "notes",
]


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


def render_shot(shot, start):
    refs = ", ".join(shot.get("refs") or [])
    lines = [
        f'<a id="{shot["id"].lower()}"></a>',
        "",
        f"### {shot['id']} · {shot['shot_size']} · {shot['duration_s']:g} s · *{shot['title']}*",
        "",
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


def main():
    overview = []
    all_rows = []
    for file, key, title, beats, start_stamp in SEQUENCES:
        path = DATA / f"{file}.json"
        if not path.exists():
            overview.append((key, title, beats, None, None, file))
            continue
        shots = json.loads(path.read_text())
        shots.sort(key=lambda s: (s["beat"], s["id"]))
        t = to_seconds(start_stamp)
        total = sum(s["duration_s"] for s in shots)

        index = [
            "| Shot | Beat | Time | Size | Dur | Action |",
            "|---|---|---|---|---|---|",
        ]
        body = []
        for s in shots:
            index.append(
                f"| [{s['id']}](#{s['id'].lower()}) | {s['beat']} | {timecode(t)} | {s['shot_size']} "
                f"| {s['duration_s']:g} s | {cell(short(s['action']))} |"
            )
            body.append(render_shot(s, t))
            row = {k: s.get(k, "") for k in FIELDS}
            row["refs"] = ", ".join(s.get("refs") or [])
            row["start"] = timecode(t)
            row["sequence"] = key
            all_rows.append(row)
            t += s["duration_s"]

        page = [
            f"# FLUTTER Storyboard — {key}: {title}",
            "",
            f"Beats {beats} · starts {start_stamp} · {len(shots)} shots · {timecode(total)} screen time",
            "",
            "← [Storyboard index](README.md)",
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
        overview.append((key, title, beats, len(shots), total, file))

    with open(HERE / "shot-list.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["sequence", "start"] + FIELDS)
        writer.writeheader()
        writer.writerows(all_rows)

    total_shots = sum(o[3] or 0 for o in overview)
    total_time = sum(o[4] or 0 for o in overview)
    readme = [
        "# FLUTTER — Storyboard",
        "",
        "Shot-by-shot storyboard built from the locked [story beats](../04-story-beats.md). Every shot has a "
        "self-contained **keyframe prompt** (for a still image) and a **motion prompt** (for image-to-video), "
        "ready for Google Flow, Higgsfield or similar tools. Interface text is always added in post.",
        "",
        "The protagonist is called **DP** throughout. He is played by Dharampal; attach the character reference "
        "sheet [`../reference/protagonist-C01-C03.webp`](../reference/protagonist-C01-C03.webp) to every shot "
        "tagged `C01-C03`.",
        "",
        f"**{total_shots} shots · {timecode(total_time)} total**",
        "",
        "| Sequence | Part | Beats | Shots | Screen time |",
        "|---|---|---|---|---|",
    ]
    for key, title, beats, n, total, file in overview:
        if n is None:
            readme.append(f"| {key} | {title} | {beats} | — | *missing* |")
        else:
            readme.append(f"| [{key}]({file}.md) | {title} | {beats} | {n} | {timecode(total)} |")
    readme += [
        "",
        "## Files",
        "",
        "- `S1…S5 *.md`: the storyboard pages, with a shot index then full shot cards",
        "- [`shot-list.csv`](shot-list.csv): every shot in one sheet, for scheduling or bulk generation",
        "- `data/*.json`: the source shot data; edit these, then run `python3 flutter/storyboard/render.py`",
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
        "| `APARTMENT`, `LIFT`, `CITY`, `BRIDGE`, `AG-FLOOR`, `OPS-ROOM`, `OFFICERS`, `DRONE`, `CODA-APT` | Environment and prop locks still to be generated |",
        "",
    ]
    (HERE / "README.md").write_text("\n".join(readme))
    print(f"{total_shots} shots, {timecode(total_time)}")


if __name__ == "__main__":
    main()
