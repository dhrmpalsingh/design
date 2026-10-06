"""FLUTTER — Episode 1 ("Birth"): storyboard shot data.

Edit this file, then run:  python3 flutter/episode-01/build.py

Prompts use {BLOCK}, placeholders. build.py expands them from BLOCKS, so the
character, the creature and the look are worded identically in every shot.
"""

EPISODE = {
    "title": "FLUTTER",
    "episode": "Episode 1 — Birth",
    "runtime_s": 600,
    "covers": "Story beats 1–17 (The World, The Room, Birth), plus a cold open and an end tag",
}

# The character must match reference sheet C01–C03 exactly, in every scene.
_DP_FACE = (
    "the man from character reference images C01-C03 (match his face exactly): early 30s, warm brown skin, "
    "thick curly dark hair with shorter faded sides, full short neatly trimmed black beard and moustache, "
    "small dark mark at the outer corner of his left eye"
)

BLOCKS = {
    "DP_FACE": _DP_FACE,
    "DP_MASKED": _DP_FACE + (
        "; dusty faded charcoal-black canvas work jacket open over a heather-grey crew-neck T-shirt, dusty dark-grey "
        "cargo work trousers, scuffed brown leather lace-up work boots; grey twin-cartridge half-face respirator over "
        "his nose and mouth, black corrugated hose over his left shoulder to a compact grey belt unit at his left hip"
    ),
    "DP_WORK": _DP_FACE + (
        "; dusty faded charcoal-black canvas work jacket open over a heather-grey crew-neck T-shirt, dusty dark-grey "
        "cargo work trousers, scuffed brown leather lace-up work boots; his grey twin-cartridge half-face respirator "
        "hanging at his chest from its black corrugated hose, which runs to a compact grey belt unit at his left hip"
    ),
    "DP_HOME": _DP_FACE + (
        "; wearing his heather-grey crew-neck T-shirt and dark-grey cargo work trousers, barefoot, no jacket"
    ),
    "CROWD": (
        "elegant residents in pale, immaculate, well-tailored clothes, each wearing a slim champagne-metal crescent "
        "respirator along the jaw with a near-invisible clear seal over the nose and mouth"
    ),
    "APT": (
        "a technically perfect small luxury apartment on the 786th floor: warm ivory walls, pale stone floor, warm "
        "composite wood, frosted glass, a sealed floor-to-ceiling window onto a rose-amber hazy sky and colossal "
        "towers; spotless, minimal, emotionally sterile"
    ),
    "BAY": (
        "a small open wall cavity at floor level lit by a tiny warm lamp: a shallow tray holding a handful of dry "
        "soil, one struggling wild strawberry plant with three leaves (one greying) and one tired white flower, a "
        "thumb-sized patch of half-grey moss on a stone, a small glass jar of water; almost pathetic"
    ),
    "CITY": (
        "a beautiful vertical megacity: colossal elegant towers a thousand floors tall rising into a permanent "
        "rose-amber haze with a pale sun disc, connected by curved glass aerial bridges and transport tubes, quiet "
        "flying commuter vehicles moving in orderly lanes; luxurious and efficient, no neon, no grime, no birds"
    ),
    "PET": (
        "a bio-synthetic companion animal in a cat shape: soft short pale-grey coat, slightly too-perfect proportions "
        "and posture, calm glassy eyes, a tiny soft licence light at its collar"
    ),
    "PU7": (
        "a damaged insect-scale pollination drone: a bee-sized bio-synthetic body of pale engineered tissue over a "
        "micro-segmented graphite spine, thin carbon-fibre wing spars, the right forewing spar visibly bent"
    ),
    "CHRYSALIS": (
        "a 3.5 cm chrysalis hanging under a greying wild-strawberry leaf: translucent wet organic tissue like grape "
        "skin held to light, fine uneven metallic threads running beneath it like veins or wiring, an anchoring silk "
        "pad of part organic thread and part frayed filament, condensation beads, no glow, it looks like it might be "
        "rotting"
    ),
    "CREATURE": (
        "a fragile hybrid butterfly, 10 cm wingspan: translucent, wet, smoky wing membranes with visible branching "
        "pale-amber veins, supported by a few hair-thin matte carbon-fibre spars running alongside the veins; the "
        "right forewing slightly shorter with a kinked spar and a crease; soft pale cream segmented organic abdomen, "
        "slightly translucent; thin thorax with tiny graphite vertebrae visible beneath thin organic tissue like a "
        "fish skeleton through skin; dark organic compound eyes, uneven antennae; moisture beads on the body; no glow, "
        "no lights, no visible electronics; faint rose-gold iridescence only at angles; delicate, imperfect, almost "
        "accidental"
    ),
}

STYLE = (
    "Cinematic film still, 16:9 frame with the key action kept inside a central 2.39:1 band, large-format digital "
    "cinema camera, clean-dystopia production design, photoreal, subtle film grain, no neon, no text"
)
STYLE_CLEAN_AIR = " The air is perfectly filtered: no dust motes, no visible light beams."

SCENES = [
    # id, title, slug, story beat
    ("SC00", "Cold open", "INT. DP'S APARTMENT — THE BAY — NIGHT", "Teaser of Beat 16"),
    ("SC01", "Wake", "INT. DP'S APARTMENT — MORNING (DAY 0)", "Beat 1"),
    ("SC02", "Morning", "INT. DP'S APARTMENT — KITCHEN WALL — MORNING", "Beat 2"),
    ("SC03", "The click", "INT. DP'S APARTMENT — FRONT DOOR / CORRIDOR", "Beat 3"),
    ("SC04", "The lift", "INT. GLASS EXPRESS LIFT — TOWER 41 — DAY", "Beat 4"),
    ("SC05", "Commute", "EXT. AERIAL BRIDGE AND PLAZA — DAY", "Beat 5"),
    ("SC06", "Work", "INT. CONTAINED AGRICULTURAL FLOOR — DAY", "Beat 6"),
    ("SC07", "Return", "EXT. TOWER 41 — FLOOR 786 — NIGHT", "Beat 7"),
    ("SC08", "Home", "INT. DP'S APARTMENT — ENTRY — NIGHT", "Beat 8"),
    ("SC09", "The bay", "INT. DP'S APARTMENT — LOW WALL PANEL — NIGHT", "Beat 9"),
    ("SC10", "The record", "INT. DP'S APARTMENT — THE BAY — NIGHT", "Beat 10"),
    ("SC11", "The breath line", "INT. DP'S APARTMENT — THE BAY — NIGHT", "Beat 11"),
    ("SC12", "Last try", "INT. DP'S APARTMENT — THE BAY — NIGHT", "Beat 12"),
    ("SC13", "Time", "MONTAGE — DAYS 1–8", "Beat 13"),
    ("SC14", "Giving up", "INT. DP'S APARTMENT — THE BAY — EVENING (DAY 9)", "Beat 14"),
    ("SC15", "The pet turns", "INT. DP'S APARTMENT — NIGHT (DAY 13)", "Beat 15"),
    ("SC16", "Emergence", "INT. DP'S APARTMENT — THE BAY — NIGHT", "Beat 16"),
    ("SC17", "First flight", "INT. DP'S APARTMENT — NIGHT", "Beat 17"),
    ("SC18", "Flagged", "INT. DP'S APARTMENT — NIGHT", "End tag (new)"),
]

SHOTS = []


def S(id, size, lens, angle, move, dur, action, prompt, motion, sound="", text="", trans="CUT",
      refs=(), hero=False, motes=False):
    SHOTS.append(dict(
        id=id, scene=id[:4], size=size, lens=lens, angle=angle, move=move, dur=dur, action=action,
        prompt=prompt, motion=motion, sound=sound, text=text, trans=trans, refs=list(refs), hero=hero, motes=motes,
    ))


# ── SC00 COLD OPEN · 0:00–0:30 ─────────────────────────────────────────────
S("SC00A", "MACRO", 100, "eye level", "locked off", 8,
  "Black. A warm glow fades up on a wet, translucent surface with metallic threads beneath it. We can't tell what it is.",
  "Extreme macro of a wet translucent organic surface like grape skin, fine uneven metallic threads running beneath it, "
  "condensation beads, lit by a single tiny warm lamp from below, deep darkness around; abstract and unidentifiable.",
  "Locked off. The surface swells almost imperceptibly once, like a slow breath.",
  sound="Silence, then one slow breath through a respirator valve.", refs=["CHRYSALIS"])
S("SC00B", "MACRO", 100, "eye level", "slow push in", 7,
  "The surface pulses once. A bead of condensation slides down.",
  "Extreme macro of {CHRYSALIS}, framed so tightly it is abstract; a single bead of condensation on the surface, warm lamp light, "
  "black background.",
  "Very slow push in. One drop of condensation slides down the surface.",
  sound="A faint wet creak.", refs=["CHRYSALIS"])
S("SC00C", "ECU", 85, "eye level", "locked off", 5,
  "An eye in the dark, the lamp reflected in it. Unblinking.",
  "Extreme close-up of one eye of {DP_FACE}, in near darkness, a tiny warm lamp reflected in the iris, watching something "
  "below frame, utterly still.",
  "Locked off. He doesn't blink. The lamp reflection trembles slightly.",
  sound="His held breath.", refs=["C01-C03"])
S("SC00D", "INSERT", 0, "—", "—", 4,
  "Black. A tiny organic crack.",
  "Pure black frame.", "Hold on black.", sound="A small, wet crack. Silence.", trans="HARD CUT")
S("SC00E", "TITLE", 0, "—", "—", 6,
  "Title card: FLUTTER. White on black, opacity rising and falling like a breath.",
  "Pure black frame (title added in post).", "Hold on black; the title breathes in post.",
  sound="One long exhale.", text="FLUTTER", trans="CUT")

# ── SC01 WAKE · 0:30–0:55 ──────────────────────────────────────────────────
S("SC01A", "WS", 24, "eye level", "locked off", 8,
  "Artificial daylight swells through the apartment on schedule. DP asleep in a low bed.",
  "Wide shot of {APT}, at dawn: soft artificial daylight rising through the frosted ceiling panels, a low minimal bed where "
  "{DP_HOME}, lies asleep, a softly glowing wall panel, the sealed window showing rose-amber haze.",
  "Locked off. The light rises smoothly from dim to bright over 8 seconds.",
  sound="A soft two-note chime. The ventilation hum starts and stays under every interior shot.",
  refs=["APARTMENT", "C01-C03"], hero=True)
S("SC01B", "MCU", 50, "eye level", "locked off", 4,
  "DP opens his eyes.",
  "Medium close-up of {DP_FACE}, lying on a pale pillow in soft artificial morning light, eyes just opening, calm, unhurried.",
  "Locked off. His eyes open; nothing else moves.", refs=["C01-C03"])
S("SC01C", "MS", 50, "low", "locked off", 6,
  "At the foot of the bed, the pet wakes at exactly the same moment and stretches in a perfectly symmetrical motion.",
  "Medium shot of {PET}, at the foot of a pale bed in {APT}, mid-stretch, the stretch unnaturally symmetrical and smooth.",
  "Locked off. The pet stretches in one perfectly smooth, mechanical-feeling arc, then settles exactly back into place.",
  refs=["PET", "APARTMENT"])
S("SC01D", "INSERT", 65, "eye level", "locked off", 4,
  "The home panel's morning readout.",
  "Close insert of a softly glowing wall interface panel in pale stone and frosted glass, minimal and elegant (readout added in post).",
  "Locked off. The panel brightens gently.", text="O₂ 21.0% · RH 45.0% · 22.0°C", refs=["APARTMENT"])
S("SC01E", "WS", 32, "eye level", "locked off", 3,
  "DP sits up. Behind him, the sealed window and the amber sky.",
  "Wide shot from the side of {DP_HOME}, sitting up on the edge of a low bed in {APT}; behind him the sealed floor-to-ceiling "
  "window full of rose-amber haze and distant towers.",
  "Locked off. He sits up and rests his forearms on his knees.", refs=["C01-C03", "APARTMENT"])

# ── SC02 MORNING · 0:55–1:30 ───────────────────────────────────────────────
S("SC02A", "CU", 85, "eye level", "locked off", 5,
  "The wall dispenser extrudes a pale protein \"strawberry\" into a dish.",
  "Close-up of an elegant wall food dispenser in brushed champagne metal extruding a pale, slightly translucent protein food "
  "moulded into the perfect shape of a strawberry onto a white dish; clinical and beautiful.",
  "Locked off. The 'strawberry' finishes forming and settles onto the dish.",
  sound="A soft dispenser whir.", refs=["APARTMENT"])
S("SC02B", "MS", 40, "eye level", "locked off", 7,
  "DP eats standing at the counter. The pet sits beside him, too still.",
  "Medium shot of {DP_HOME}, standing at a pale stone kitchen counter eating the pale protein strawberry, {PET}, sitting "
  "on the counter beside him in a perfectly upright pose, inside {APT}.",
  "Locked off. He eats one bite; the pet doesn't move at all.", refs=["C01-C03", "PET", "APARTMENT"])
S("SC02C", "INSERT", 85, "eye level", "locked off", 4,
  "In the panel's corner, a number nobody looks at.",
  "Close insert of the corner of a softly glowing wall interface panel, minimal, pale stone surround (readout added in post).",
  "Locked off.", text="BIOLOGICAL VARIANCE 0.001% — WITHIN TOLERANCE", refs=["APARTMENT"])
S("SC02D", "CU", 65, "high", "locked off", 5,
  "A crumb goes into the sterilisation port. A flash. Nothing left.",
  "Close-up from above of a small round wall hatch in brushed champagne metal, open, a fingertip dropping a pale crumb into it; "
  "a soft white-blue flash of light inside.",
  "Locked off. The crumb drops, the hatch flashes white, it is empty.",
  sound="A soft 'fft'.", refs=["APARTMENT"])
S("SC02E", "CU", 85, "eye level", "locked off", 4,
  "DP's eyes flick, for half a second, to a low wall panel. Then away.",
  "Close-up of {DP_FACE}, in soft morning light, his eyes glancing down and to the side toward something low on the wall, then away.",
  "Locked off. A brief downward glance and back.", refs=["C01-C03"])
S("SC02F", "INSERT", 50, "low", "locked off", 4,
  "The low wall panel near the floor: flush, seamless, ordinary.",
  "Low-angle insert of a flush, seamless pale wall panel near the floor of {APT}; perfectly ordinary, nothing to see.",
  "Locked off.", refs=["APARTMENT"])
S("SC02G", "MS", 35, "eye level", "locked off", 6,
  "By the door he pulls on the dusty work jacket. The only dirt in the apartment.",
  "Medium shot of {DP_WORK}, by the front door of {APT}, shrugging on the dusty jacket; the dust on it is the only "
  "imperfection in the spotless room.",
  "Locked off. He pulls the jacket on in one practised move.", refs=["C01-C03", "APARTMENT"])

# ── SC03 THE CLICK · 1:30–1:42 ─────────────────────────────────────────────
S("SC03A", "ECU", 65, "eye level", "locked off", 4,
  "The half-mask goes onto his face. Click. Seal tone.",
  "Extreme close-up of the grey twin-cartridge half-face respirator being pressed onto the face of {DP_FACE}; his eyes "
  "above it, practised and calm.",
  "Locked off. The mask seats against his face in one firm motion.",
  sound="CLICK + seal tone (motif).", refs=["C01-C03"])
S("SC03B", "INSERT", 85, "eye level", "locked off", 3,
  "He clips the hose to the belt unit. Its light goes white.",
  "Insert of a black corrugated respirator hose clicking into a compact grey belt unit on dusty dark-grey cargo trousers; a small "
  "status light on the unit glowing white.",
  "Locked off. The hose clicks in; the light turns white.", text="ALLOCATION 100%", refs=["C01-C03"])
S("SC03C", "MS", 32, "eye level", "locked off", 5,
  "The door slides open. DP steps out into the pale corridor.",
  "Medium shot from a pristine pale-stone corridor as an apartment door slides silently open and {DP_MASKED}, steps out.",
  "Locked off. The door slides open; he walks out past camera.", sound="A soft door glide.",
  refs=["C01-C03"])

# ── SC04 THE LIFT · 1:42–2:20 ──────────────────────────────────────────────
S("SC04A", "INSERT", 85, "eye level", "locked off", 3,
  "The floor counter falls from 786.",
  "Insert of an elegant brushed-champagne lift floor indicator, softly lit (numbers added in post).",
  "Locked off.", text="786 → 520", sound="A low lift hum.", refs=["LIFT"])
S("SC04B", "MS", 32, "eye level", "locked off", 7,
  "Inside the glass lift: DP among immaculate residents. He's the only one with dust on him, and the only one in a work mask.",
  "Medium shot inside a spotless glass-walled express lift: {DP_MASKED}, standing among {CROWD}; he is the only person with "
  "dusty clothes and the only one in a heavy work mask.",
  "Locked off. Nobody moves; the city drifts past the glass behind them.", refs=["C01-C03", "CONSUMER-MASK", "LIFT"])
S("SC04C", "MCU", 50, "eye level", "locked off", 6,
  "A six-year-old girl attaches her own crescent respirator in one practised movement. Her mother doesn't look.",
  "Medium close-up inside a glass lift of a six-year-old girl in pale clothes fitting a small slim champagne-metal crescent "
  "respirator to her own jaw with practised ease; her elegant mother beside her, looking ahead, not helping.",
  "Locked off. The girl clicks the respirator on in one fluid motion.", sound="A small click.",
  refs=["CONSUMER-MASK", "LIFT"])
S("SC04D", "MS", 50, "low", "locked off", 4,
  "A licensed dog sits in a too-regular rhythm, its collar tag glowing.",
  "Medium shot of a bio-synthetic dog with a soft glowing licence tag on its collar sitting in a glass lift, its posture "
  "and tail movement unnaturally regular.",
  "Locked off. Its tail sweeps in a perfectly even metronome rhythm.", refs=["LIFT"])
S("SC04E", "OTS", 35, "eye level", "slow push in", 8,
  "Over DP's shoulder: the lift leaves the tower core and the city opens up beyond the glass.",
  "Over-the-shoulder shot from behind {DP_MASKED}, looking out through the glass wall of the lift as it emerges from the tower "
  "core into {CITY}.",
  "Slow push in past his shoulder toward the glass as the city is revealed.", refs=["C01-C03", "LIFT", "CITY"])
S("SC04F", "EWS", 18, "eye level", "slow drift", 10,
  "The city: colossal towers in rose-amber haze, glass bridges, flying commuters in silent lanes. No birds.",
  "Extreme wide shot of {CITY}; a single glass lift capsule travelling down the face of one tower in the foreground.",
  "Slow lateral drift. Flying commuters glide in silent lanes; nothing else moves in the sky.",
  sound="Wind against glass, very distant.", refs=["CITY"], hero=True)

# ── SC05 COMMUTE · 2:20–2:58 ───────────────────────────────────────────────
S("SC05A", "WS", 28, "eye level", "locked off", 6,
  "A transit concourse. DP crosses through the pale crowd.",
  "Wide shot of a vast transit concourse of pale stone and frosted glass, soft light, {CROWD}, moving calmly; {DP_MASKED} "
  "crossing through them.", "Locked off. The crowd flows; he cuts across it.",
  refs=["C01-C03", "CONSUMER-MASK", "BRIDGE"])
S("SC05B", "EWS", 24, "low", "locked off", 7,
  "A curved glass bridge between two towers; flying commuters pass beneath it.",
  "Extreme wide low-angle shot of a curved glass aerial bridge between two colossal towers in {CITY}; small figures crossing "
  "inside it, quiet flying commuter vehicles passing beneath.",
  "Locked off. Two commuter vehicles glide under the bridge.", refs=["BRIDGE", "CITY"])
S("SC05C", "MS", 35, "eye level", "tracking with DP", 7,
  "A plaza of perfect projected trees. DP walks beneath them. Nobody looks up.",
  "Medium shot of {DP_MASKED}, walking through an indoor plaza of perfect projected and synthetic trees with flawless "
  "green leaves; {CROWD}, passing, none of them looking up.",
  "Tracking alongside him. The synthetic leaves sway in a too-regular rhythm.",
  refs=["C01-C03", "CONSUMER-MASK", "BRIDGE"])
S("SC05D", "CU", 85, "low", "locked off", 5,
  "The first drops of warm amber rain hit the glass roof.",
  "Close-up looking up at a clear glass roof as the first drops of warm, faintly amber rain land and streak across it, rose-amber sky beyond.",
  "Locked off. Amber drops land and run down the glass.", sound="Rain on glass.", refs=["BRIDGE"])
S("SC05E", "WS", 28, "eye level", "locked off", 7,
  "An open section of the bridge seals itself with a sliding glass panel. Commuters hurry.",
  "Wide shot of an open-air section of a glass aerial bridge as a curved glass panel slides closed over it; {CROWD}, hurrying "
  "inside out of the amber rain.",
  "Locked off. The glass panel slides shut; people quicken their steps.", sound="A soft bridge announcement chime.",
  refs=["BRIDGE", "CONSUMER-MASK"])
S("SC05F", "MS", 40, "eye level", "locked off", 6,
  "A small white drone rinses the walkway behind them.",
  "Medium shot of a small rounded white appliance-like drone hovering low over a pale stone walkway, spraying a fine clean rinse.",
  "Locked off. The drone glides across frame, rinsing.", refs=["DRONE", "BRIDGE"])

# ── SC06 WORK · 2:58–3:38 ──────────────────────────────────────────────────
S("SC06A", "WS", 28, "eye level", "locked off", 8,
  "A sealed agricultural floor. Real crops behind glass, pollination units flying in perfect grids. DP services a regulator in the foreground.",
  "Wide shot of a sealed agricultural floor: perfect rows of real green crops under even white light behind floor-to-ceiling "
  "glass, tiny insect-scale pollination drones flying above them in an exact grid; in the foreground {DP_WORK}, kneels at an "
  "open humidity-regulator panel.",
  "Locked off. The drones move in precise grid lines; he works.", sound="A thin, high grid-flight whine.",
  refs=["AG-FLOOR", "C01-C03", "PU-7"])
S("SC06B", "MACRO", 100, "eye level", "locked off", 5,
  "Pollination units in exact formation over the leaves.",
  "Macro shot of several insect-scale pollination drones hovering in an exact grid formation just above green crop leaves, "
  "clinical white light.", "Locked off. The drones step sideways in perfect unison.", refs=["PU-7", "AG-FLOOR"])
S("SC06C", "CU", 100, "eye level", "locked off", 4,
  "One unit clips another and falls, its right wing spar bent.",
  "Close-up of {PU7}, tumbling out of a formation of identical drones after a collision, falling past green leaves.",
  "Locked off. One drone clips another and drops out of frame, spinning.", refs=["PU-7", "AG-FLOOR"], hero=True)
S("SC06D", "MS", 50, "high", "locked off", 4,
  "A robot arm sweeps it into a white disposal tray.",
  "Medium high-angle shot of a slim white robotic arm sweeping a broken insect-sized drone into a white disposal tray "
  "holding a few other broken drones.", "Locked off. The arm sweeps once and retracts.", refs=["PU-7", "AG-FLOOR"])
S("SC06E", "INSERT", 65, "high", "locked off", 4,
  "His work tablet pings an unrelated notice.",
  "Insert over the shoulder of a slim work tablet in a hand with a dusty charcoal canvas sleeve, the screen softly glowing (text added in post).",
  "Locked off.", text="UNIT 41-602-07 — MICROBIAL BLOOM (food residue) — NOTICE ISSUED", sound="A tablet ping.",
  refs=["C01-C03"])
S("SC06F", "CU", 85, "eye level", "locked off", 3,
  "Above the mask, his eyes flick to a camera dome on the ceiling.",
  "Close-up of {DP_FACE}, wearing a grey twin-cartridge half-face respirator, his eyes flicking up toward the ceiling.",
  "Locked off. His eyes go up, then down.", refs=["C01-C03"])
S("SC06G", "MS", 40, "eye level", "locked off", 5,
  "He shifts his body to block the dome's view, and his hand goes into the tray.",
  "Medium shot of {DP_WORK}, turning his back to a small white ceiling camera dome, his body screening his hand as it reaches "
  "into a white disposal tray.", "Locked off. He turns casually; his hand dips into the tray.",
  refs=["C01-C03", "AG-FLOOR"])
S("SC06H", "INSERT", 85, "eye level", "locked off", 4,
  "The damaged unit slides into a cargo pocket.",
  "Insert of a hand slipping {PU7}, into the side cargo pocket of dusty dark-grey cargo trousers.",
  "Locked off. The drone disappears into the pocket; the flap falls closed.", refs=["PU-7", "C01-C03"])
S("SC06I", "MCU", 50, "eye level", "locked off", 3,
  "He straightens up. Breath steady through the mask. His first transgression.",
  "Medium close-up of {DP_MASKED}, straightening up from a kneeling position, eyes calm, breathing steadily.",
  "Locked off. He rises into frame and holds still.", sound="His steady breath through the valve.", refs=["C01-C03"])

# ── SC07 RETURN · 3:38–3:45 ────────────────────────────────────────────────
S("SC07A", "EWS", 35, "eye level", "slow drift", 7,
  "Night. The city lit like jewellery. A commuter vehicle slides past a lit window on Floor 786 as a figure enters.",
  "Extreme wide night shot of {CITY}, lit like jewellery, warm window lights stacked into the haze; a quiet flying commuter "
  "slides past one lit window high on a tower where a small figure is entering an apartment.",
  "Slow drift. The vehicle passes the window; the figure inside closes the door.", refs=["CITY"])

# ── SC08 HOME · 3:45–4:05 ──────────────────────────────────────────────────
S("SC08A", "MS", 32, "eye level", "locked off", 6,
  "DP comes home, lets the mask hang, hangs the dusty jacket by the door.",
  "Medium shot of {DP_WORK}, stepping into {APT}, at night and hanging the dusty charcoal jacket on a hook by the door.",
  "Locked off. He hangs up the jacket and lets out a breath.", sound="Click off. The hum.", refs=["C01-C03", "APARTMENT"])
S("SC08B", "INSERT", 85, "high", "locked off", 4,
  "He unclips the condensation canister from his belt unit.",
  "Insert of a hand unclipping a small clear condensation canister from a compact grey respirator belt unit at the hip of "
  "dark-grey cargo trousers; a little water inside.", "Locked off. The canister clicks free.", refs=["C01-C03"])
S("SC08C", "CU", 85, "eye level", "locked off", 5,
  "He empties it into a small glass jar, not the drain.",
  "Close-up of water from a small clear canister being poured into a small glass jar on a pale stone counter, a spotless sink "
  "visible and unused beside it.", "Locked off. A thin stream fills the jar.", sound="Drip.", refs=["APARTMENT"])
S("SC08D", "MS", 40, "low", "locked off", 5,
  "The pet greets him on schedule, a perfect head-bump. He rests a hand on its back.",
  "Medium low shot of {PET}, pressing its head against the shin of {DP_HOME}, in a perfectly timed greeting; his hand resting on its back.",
  "Locked off. The pet bumps his leg exactly once; his hand settles on it.", refs=["PET", "C01-C03", "APARTMENT"])

# ── SC09 THE BAY · 4:05–4:35 ───────────────────────────────────────────────
S("SC09A", "CU", 65, "low", "locked off", 3,
  "He glances up at the ceiling sensor dome.",
  "Close-up from below of {DP_FACE}, glancing up at a small white sensor dome on a pale ceiling, at night.",
  "Locked off. A quick glance up.", refs=["C01-C03"])
S("SC09B", "MS", 35, "low", "locked off", 5,
  "He kneels and presses the low wall panel. It releases.",
  "Medium low shot of {DP_HOME}, kneeling at a flush pale wall panel near the floor of {APT}, and pressing it; it springs open a few centimetres.",
  "Locked off. The panel releases with a soft click and swings open.", sound="A soft latch.",
  refs=["C01-C03", "APARTMENT", "HABITAT"])
S("SC09C", "INSERT", 85, "eye level", "locked off", 4,
  "A small lamp inside clicks on: warmer than anything we've seen.",
  "Insert inside a dark wall cavity as a tiny warm lamp switches on, the warmest light in an otherwise cool, clean apartment.",
  "Locked off. The lamp flickers on and settles.", sound="A tiny click.", refs=["HABITAT"])
S("SC09D", "CU", 50, "eye level", "slow push in", 10,
  "The habitat revealed. Almost pathetic.",
  "Close-up of {BAY}.",
  "Very slow push in toward the struggling strawberry plant.", sound="The hum drops slightly: a dead zone.",
  refs=["HABITAT"], hero=True)
S("SC09E", "MCU", 50, "low", "locked off", 8,
  "His face, lit warm from below by the lamp. Quiet devotion.",
  "Medium close-up of {DP_FACE}, kneeling, his face lit warm from below by a tiny lamp inside a wall cavity, looking at it with quiet devotion.",
  "Locked off. He breathes slowly; nothing else moves.", refs=["C01-C03"])

# ── SC10 THE RECORD · 4:35–5:05 ────────────────────────────────────────────
S("SC10A", "INSERT", 65, "top-down", "locked off", 8,
  "A paper notebook: a record of failure in neat handwriting.",
  "Top-down insert of an open paper notebook on a pale stone floor in warm lamp light, pages of neat handwritten entries, "
  "many crossed out (handwriting legible text added in post).",
  "Locked off. A page turns.", text="Seed 7 — no germination. / Fungal culture — collapsed day 4. / Moss — grey. Watering?",
  sound="Paper.", refs=["LOG"])
S("SC10B", "INSERT", 85, "top-down", "locked off", 6,
  "More entries, struck through.",
  "Top-down close insert of handwritten notebook entries struck through with single neat lines, warm lamp light.",
  "Locked off.", text="Leaf 2 — grey.", sound="A pencil.", refs=["LOG"])
S("SC10C", "INSERT", 65, "eye level", "slow push in", 10,
  "The handwritten diagram taped inside the panel door. The butterfly is circled: \"impossible.\"",
  "Insert of a faded hand-drawn ink diagram taped inside a small open wall-panel door: a life cycle of sun, plant, butterfly, "
  "seed, soil and water joined by arrows; the butterfly circled in newer pen with a short handwritten word beside it.",
  "Slow push in to the circled butterfly.", text="impossible", refs=["DIAGRAM"], hero=True)
S("SC10D", "CU", 85, "eye level", "locked off", 6,
  "His fingertip touches the circled butterfly.",
  "Close-up of a fingertip touching a small hand-drawn butterfly circled in pen on a faded paper diagram, warm lamp light.",
  "Locked off. The fingertip rests on the drawing.", refs=["DIAGRAM"])

# ── SC11 THE BREATH LINE · 5:05–5:30 ───────────────────────────────────────
S("SC11A", "MS", 40, "eye level", "locked off", 8,
  "He puts the mask back on, unclips the hose from the belt unit and feeds it into the bay.",
  "Medium shot of {DP_HOME}, wearing his grey twin-cartridge half-face respirator, unclipping its black corrugated hose from the "
  "grey belt unit at his hip and feeding the end into {BAY}.",
  "Locked off. He threads the hose into the cavity.", refs=["C01-C03", "HABITAT"])
S("SC11B", "WS", 28, "eye level", "locked off", 10,
  "He sits against the wall beside the open bay, breathing slowly. The habitat runs on his breath.",
  "Wide shot of {DP_HOME}, sitting on the floor with his back against the wall of {APT}, wearing his half-face respirator, its hose "
  "running into a small lamp-lit wall cavity beside him; everything else dim and spotless.",
  "Locked off. His chest rises and falls slowly.", sound="His breathing, close and real: the first un-designed sound.",
  refs=["C01-C03", "APARTMENT", "HABITAT"])
S("SC11C", "CU", 100, "eye level", "locked off", 7,
  "The greying leaf trembles faintly in his breath.",
  "Close-up of a greying wild-strawberry leaf in a lamp-lit wall cavity, the end of a black corrugated hose resting near it.",
  "Locked off. The leaf trembles faintly with each breath.", refs=["HABITAT"])

# ── SC12 LAST TRY · 5:30–6:00 ──────────────────────────────────────────────
S("SC12A", "INSERT", 50, "top-down", "locked off", 5,
  "Grandmother's dented tin, opened: empty seed envelopes, a sealed vial.",
  "Top-down insert of a small dented old metal tin opened on a pale stone floor: empty paper seed envelopes and a sealed glass "
  "vial in old cryo-wrap, warm lamp light.", "Locked off. A hand lifts out the vial.", refs=["TIN"])
S("SC12B", "MACRO", 100, "eye level", "locked off", 4,
  "The vial's label: old handwriting and a tiny drawn butterfly. He doesn't notice. We do.",
  "Macro of a sealed glass vial's yellowed paper label with faded old handwriting and a tiny hand-drawn butterfly in the corner.",
  "Locked off. The vial turns slightly in his fingers.", refs=["TIN"])
S("SC12C", "CU", 85, "high", "locked off", 5,
  "He cracks the damaged unit open. Clear repair gel.",
  "Close-up of hands cracking open the casing of {PU7}, with a small tool, clear glossy repair gel welling out.",
  "Locked off. The casing splits; gel beads out.", sound="Snap of the casing.", refs=["PU-7"])
S("SC12D", "CU", 85, "high", "locked off", 6,
  "Gel squeezed into the soil; the vial emptied over it.",
  "Close-up from above of clear gel being squeezed from a broken insect-sized drone into a handful of dry soil in a shallow tray, "
  "a small glass vial tipped beside it; warm lamp light.", "Locked off. Gel, then the vial's contents, into the soil.",
  refs=["PU-7", "HABITAT", "TIN"], hero=True)
S("SC12E", "CU", 85, "high", "locked off", 5,
  "His fingers bury both and pat the soil flat.",
  "Close-up of fingertips burying a broken insect-sized drone in a shallow tray of soil and patting it flat beside a struggling "
  "wild strawberry plant, warm lamp light.", "Locked off. Fingers press the soil smooth.", refs=["HABITAT"])
S("SC12F", "INSERT", 65, "top-down", "locked off", 5,
  "The log: \"Day 0 — last try.\" The panel closes.",
  "Top-down insert of a pencil finishing a short handwritten line in a paper notebook on a pale stone floor, warm lamp light "
  "(handwriting added in post).", "Locked off. The pencil lifts; the light goes out as the panel closes.",
  text="Day 0 — last try.", trans="CUT", refs=["LOG"])

# ── SC13 TIME · 6:00–6:15 (echoes of SC01–SC04, shortening) ────────────────
S("SC13A", "WS", 24, "eye level", "locked off", 3,
  "Echo of SC01A: the light rises on schedule. DP wakes.",
  "Wide shot of {APT}, at dawn: soft artificial daylight rising, a low minimal bed where {DP_HOME}, lies awake.",
  "Locked off. The light rises fast.", sound="Chime.", refs=["APARTMENT", "C01-C03"])
S("SC13B", "CU", 85, "eye level", "locked off", 2.5,
  "Echo of SC02A: the protein strawberry.",
  "Close-up of an elegant wall food dispenser in brushed champagne metal extruding a pale protein food moulded into the shape "
  "of a strawberry onto a white dish.", "Locked off.", sound="Whir.", refs=["APARTMENT"])
S("SC13C", "ECU", 65, "eye level", "locked off", 2,
  "Echo of SC03A: the click.",
  "Extreme close-up of the grey twin-cartridge half-face respirator being pressed onto the face of {DP_FACE}.",
  "Locked off.", sound="Click.", refs=["C01-C03"])
S("SC13D", "INSERT", 85, "eye level", "locked off", 2,
  "Echo of SC04A: the counter falls.",
  "Insert of an elegant brushed-champagne lift floor indicator, softly lit (numbers added in post).",
  "Locked off.", text="786", refs=["LIFT"])
S("SC13E", "INSERT", 50, "low", "locked off", 2.5,
  "The low wall panel, closed. He doesn't open it. He has given up.",
  "Low-angle insert of a flush pale wall panel near the floor of {APT}, closed, in flat daylight.",
  "Locked off.", refs=["APARTMENT"])
S("SC13F", "INSERT", 85, "eye level", "locked off", 3,
  "The number creeps.",
  "Close insert of the corner of a softly glowing wall interface panel (readout added in post).",
  "Locked off.", text="BIOLOGICAL VARIANCE 0.003% — WITHIN TOLERANCE", refs=["APARTMENT"])

# ── SC14 GIVING UP · 6:15–7:05 ─────────────────────────────────────────────
S("SC14A", "MS", 35, "low", "locked off", 6,
  "Day 9. He kneels at the bay with a waste bag, to clear it out and end it.",
  "Medium low shot of {DP_HOME}, kneeling at a flush wall panel near the floor of {APT}, in evening light, a folded white waste "
  "bag in one hand, opening the panel.", "Locked off. The panel opens; lamp light spills onto him.",
  refs=["C01-C03", "APARTMENT", "HABITAT"])
S("SC14B", "CU", 65, "eye level", "locked off", 5,
  "The strawberry is alive. Barely.",
  "Close-up of a struggling wild strawberry plant in a shallow tray of soil in a lamp-lit wall cavity, alive but barely.",
  "Locked off.", refs=["HABITAT"])
S("SC14C", "MACRO", 100, "eye level", "slow push in", 6,
  "Chewed edges on a leaf, and a faint silvery trail on the stem. He reads it as rot.",
  "Macro of a wild strawberry leaf with small chewed, scalloped edges and a faint silvery trail along its stem, warm lamp light.",
  "Slow push in along the silvery trail.", refs=["HABITAT"])
S("SC14D", "MCU", 50, "eye level", "locked off", 4,
  "He frowns, and reaches in to clear it.",
  "Medium close-up of {DP_FACE}, lit by a warm lamp from a wall cavity, frowning, reaching forward.",
  "Locked off. A small frown; his arm moves forward.", refs=["C01-C03"])
S("SC14E", "MACRO", 100, "low", "locked off", 8,
  "His finger lifts a leaf. Underneath: the chrysalis.",
  "Macro from below: a fingertip lifting a greying wild-strawberry leaf to reveal {CHRYSALIS}.",
  "Locked off. The leaf lifts slowly; the chrysalis sways once.", sound="Silence except his breath and the hum.",
  refs=["CHRYSALIS", "HABITAT"], hero=True)
S("SC14F", "ECU", 85, "eye level", "locked off", 4,
  "He leans in. His eyes narrow.",
  "Extreme close-up of the eyes of {DP_FACE}, warm lamp light, narrowing as he leans closer to something tiny.",
  "Locked off. He leans in a centimetre.", refs=["C01-C03"])
S("SC14G", "MACRO", 100, "eye level", "locked off", 6,
  "Metallic threads under translucent tissue. Condensation. To him it looks like mould fused with drone parts. A failure.",
  "Extreme macro of {CHRYSALIS}, showing the metallic threads beneath the translucent tissue and the frayed filament pad.",
  "Locked off. A condensation bead slides.", refs=["CHRYSALIS"])
S("SC14H", "MS", 40, "eye level", "locked off", 5,
  "The waste bag hovers over the habitat.",
  "Medium shot of a hand holding an open white waste bag hovering over {BAY}, the lamp light on it.",
  "Locked off. The bag hangs in the air.", refs=["HABITAT"])
S("SC14I", "CU", 50, "eye level", "locked off", 4,
  "He lowers the bag. He closes the panel.",
  "Close-up of {DP_FACE}, lowering a white waste bag and quietly closing a small lamp-lit wall panel.",
  "Locked off. The bag drops to his side; the panel closes and the light goes.", refs=["C01-C03"])
S("SC14J", "INSERT", 85, "eye level", "locked off", 2,
  "The number.",
  "Close insert of the corner of a softly glowing wall interface panel (readout added in post).",
  "Locked off.", text="BIOLOGICAL VARIANCE 0.006% — WITHIN TOLERANCE", refs=["APARTMENT"])

# ── SC15 THE PET TURNS · 7:05–7:35 ─────────────────────────────────────────
S("SC15A", "WS", 24, "eye level", "locked off", 6,
  "Night 13. The dark apartment. DP asleep; the pet asleep at his feet.",
  "Wide night shot of {APT}, in darkness, faint rose-amber city glow through the sealed window, {DP_HOME}, asleep in a low bed, "
  "{PET}, asleep at its foot.", "Locked off. Stillness.", refs=["APARTMENT", "C01-C03", "PET"])
S("SC15B", "MCU", 65, "low", "locked off", 6,
  "The pet lifts its head off schedule and turns toward the low wall panel.",
  "Medium close-up of {PET}, in near darkness lifting its head and turning it toward something low on the far wall.",
  "Locked off. The head lifts and turns in one smooth, slightly mechanical move.",
  sound="A faint organic crack from inside the wall.", refs=["PET"])
S("SC15C", "ECU", 100, "eye level", "locked off", 5,
  "Its eye: the classification loop flickers and freezes. It doesn't know what it's looking at.",
  "Extreme close-up of the glassy eye of a bio-synthetic cat in darkness, a faint ring pattern in the iris flickering as if "
  "searching, then freezing.", "Locked off. The iris pattern flickers, cycles, then stops dead.",
  refs=["PET"], hero=True)
S("SC15D", "CU", 50, "eye level", "locked off", 5,
  "DP wakes, because the pet has never done anything unscheduled before.",
  "Close-up of {DP_FACE}, waking in a dark room, faint city glow, looking toward the foot of the bed with confusion.",
  "Locked off. His eyes open and find the pet.", refs=["C01-C03"])
S("SC15E", "MS", 35, "floor level", "locked off", 5,
  "The low wall panel in darkness. Another faint crack.",
  "Medium floor-level shot of a flush pale wall panel near the floor in a dark apartment, a hairline of warm light at its edge.",
  "Locked off. The hairline of light flickers faintly.", sound="A faint crack.", refs=["APARTMENT"])
S("SC15F", "INSERT", 85, "eye level", "locked off", 3,
  "The number.",
  "Close insert of the corner of a softly glowing wall interface panel in a dark room (readout added in post).",
  "Locked off.", text="BIOLOGICAL VARIANCE 0.009% — WITHIN TOLERANCE", refs=["APARTMENT"])

# ── SC16 EMERGENCE · 7:35–8:30 ─────────────────────────────────────────────
S("SC16A", "MS", 35, "low", "locked off", 5,
  "He kneels and opens the bay. Lamp on.",
  "Medium low shot of {DP_HOME}, kneeling in a dark apartment and opening a small wall panel; warm lamp light spills over him.",
  "Locked off. Light floods his face.", refs=["C01-C03", "HABITAT"])
S("SC16B", "MACRO", 100, "eye level", "locked off", 8,
  "The chrysalis splits along an uneven seam.",
  "Extreme macro of {CHRYSALIS}, splitting open along an uneven seam, tissue tearing, a metallic filament snapping.",
  "Locked off. The seam opens slowly from top to bottom.", sound="Tearing tissue, a snapped filament.",
  refs=["CHRYSALIS"])
S("SC16C", "MACRO", 100, "eye level", "locked off", 8,
  "The creature pulls itself out: wet, crumpled, wings folded.",
  "Extreme macro of a wet, crumpled newborn hybrid butterfly pulling itself out of a split translucent chrysalis under a "
  "strawberry leaf; wings still folded and soft. It is {CREATURE}, newly emerged.",
  "Locked off. Legs grip, the body slides free, it hangs.", refs=["CREATURE-G1", "CHRYSALIS"])
S("SC16D", "MACRO", 100, "eye level", "locked off", 12,
  "It hangs and pumps fluid into its wings. The veins fill. The wings slowly open.",
  "Extreme macro of {CREATURE}, hanging beneath an empty split chrysalis as its wings expand, pale-amber fluid visibly "
  "filling the veins, wings half-open.",
  "Locked off, time-compressed. Veins fill and the wings unfold and flatten over the clip; chain two clips.",
  refs=["CREATURE-G1"], hero=True)
S("SC16E", "ECU", 100, "eye level", "locked off", 5,
  "The right wing doesn't fully flatten. The kink stays.",
  "Extreme close-up of the right forewing of {CREATURE}: a kinked carbon-fibre spar and a crease that will not flatten.",
  "Locked off. The wing strains to flatten and stops short.", refs=["CREATURE-G1"])
S("SC16F", "MACRO", 100, "eye level", "locked off", 6,
  "Moisture beads along its body. The abdomen breathes.",
  "Extreme macro of the body of {CREATURE}, moisture beads along the thorax, the soft cream abdomen visibly expanding and contracting.",
  "Locked off. The abdomen rises and falls.", refs=["CREATURE-G1"])
S("SC16G", "CU", 65, "eye level", "locked off", 6,
  "DP's face. He has stopped breathing.",
  "Close-up of {DP_FACE}, lit warm from below by a tiny lamp, completely still, holding his breath, eyes wide.",
  "Locked off. Nothing moves.", sound="Near silence.", refs=["C01-C03"])
S("SC16H", "MACRO", 100, "eye level", "rack focus", 5,
  "The creature in the foreground. His face, soft behind it.",
  "Macro two-shot: {CREATURE}, sharp in the foreground under a strawberry leaf, and behind it the soft-focus face of "
  "{DP_FACE}, lamp-lit.", "Rack focus from the creature to his eyes and back.",
  refs=["CREATURE-G1", "C01-C03"])

# ── SC17 FIRST FLIGHT · 8:30–9:40 ──────────────────────────────────────────
S("SC17A", "MACRO", 100, "eye level", "locked off", 4,
  "It launches, and crashes into the bay wall.",
  "Macro of {CREATURE}, launching clumsily from a strawberry leaf and bumping into the pale wall of a lamp-lit cavity.",
  "Locked off. It lifts, veers right, bumps the wall and drops.", sound="A tiny tap.", refs=["CREATURE-G1"])
S("SC17B", "MACRO", 100, "eye level", "locked off", 5,
  "A wing sticks to the wet jar. It tugs free.",
  "Macro of {CREATURE}, one wet wing stuck to the side of a small glass jar of water, pulling free.",
  "Locked off. The wing peels off the glass.", refs=["CREATURE-G1", "HABITAT"])
S("SC17C", "CU", 85, "eye level", "locked off", 6,
  "It rests on his sleeve, trembling.",
  "Close-up of {CREATURE}, resting on the heather-grey T-shirt sleeve of a man's arm, wings trembling, warm lamp light.",
  "Locked off. The wings tremble and settle.", refs=["CREATURE-G1", "C01-C03"])
S("SC17D", "MS", 50, "eye level", "locked off", 5,
  "It flutters up, dipping to the right, out of the bay.",
  "Medium shot of {CREATURE}, fluttering up out of a small lamp-lit wall cavity into a dark apartment, dipping to the right.",
  "Locked off. Uneven flutter, a dip to the right, up and out of frame.", sound="Wings: the first un-designed sound.",
  refs=["CREATURE-G1", "HABITAT"])
S("SC17E", "WS", 32, "eye level", "locked off", 10,
  "It flies through the lamp's beam, and shed scales make the light beam visible for the first time in the film.",
  "Wide shot of a dark, spotless apartment: {CREATURE}, flying through the warm light spilling from a small open wall cavity; "
  "tiny shed scales drift in the light, making a soft beam visible in the air for the first time.",
  "Locked off. The creature crosses the light; glittering scales hang and drift in the beam.",
  refs=["CREATURE-G1", "APARTMENT", "HABITAT"], hero=True, motes=True)
S("SC17F", "CU", 65, "eye level", "locked off", 30,
  "The long hold. DP sitting on the floor, watching it. He has never seen anything that wasn't programmed to behave.",
  "Close-up of {DP_HOME}, sitting on the floor in a dark apartment, lit warm by a small lamp, watching something flutter "
  "above him with quiet, overwhelmed wonder; a few drifting scales glinting in the air between him and the lamp.",
  "Locked off. Only his eyes move, following it. Build the 30 s by chaining four clips from each clip's last frame.",
  sound="No music. Wings, his breathing, the hum.", refs=["C01-C03"], hero=True, motes=True)
S("SC17G", "WS", 28, "eye level", "locked off", 10,
  "The creature loops imperfectly in the warm beam above him. In the shadows, the pet watches.",
  "Wide shot of a dark apartment: {DP_HOME}, sitting on the floor beside a small lamp-lit wall cavity, {CREATURE}, looping "
  "unevenly in the warm beam above him, and {PET}, in the shadows watching.",
  "Locked off. The creature loops and dips right; the pet's head follows it smoothly.",
  refs=["C01-C03", "CREATURE-G1", "PET", "APARTMENT"], motes=True)

# ── SC18 FLAGGED (end tag) · 9:40–10:00 ────────────────────────────────────
S("SC18A", "INSERT", 85, "eye level", "locked off", 8,
  "The home panel in the dark. The number ticks over, and the line changes colour.",
  "Close insert of the corner of a softly glowing wall interface panel in a dark room, a faint warm glow from off-screen "
  "(readout added in post).", "Locked off. The panel's glow shifts from neutral to a soft amber.",
  text="0.009% → 0.010% — WITHIN TOLERANCE → FLAGGED FOR REVIEW", sound="One polite interface tone.",
  refs=["APARTMENT"], hero=True)
S("SC18B", "ECU", 100, "eye level", "locked off", 5,
  "The pet's eye in the dark, reflecting the fluttering creature. Its licence light blinks.",
  "Extreme close-up of the glassy eye of a bio-synthetic cat in the dark, a tiny fluttering winged shape reflected in it, a "
  "small licence light blinking at the edge of frame.", "Locked off. The reflection flutters; the light blinks once.",
  refs=["PET"])
S("SC18C", "TITLE", 0, "—", "—", 7,
  "Black. Wings and breath. End card.",
  "Pure black frame (end card added in post).", "Hold on black.",
  sound="Fluttering wings + one human breath. Silence.", text="FLUTTER — Episode 1", trans="FADE OUT")
