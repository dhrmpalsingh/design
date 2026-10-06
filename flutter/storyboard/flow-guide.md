# FLUTTER — Google Flow Production Guide

How to turn this storyboard into images (and then video) in **Google Flow**.

Flow generates stills with Google's **Nano Banana** image models and animates them with **Veo**. The stills can then become start frames ("Frames to Video") or consistent references ("Ingredients to Video"). Flow's button labels change often, so treat the UI names below as approximate.

**The rule that makes or breaks this film: build the references (ingredients) first, lock them, then generate shots.** A storyboard with a different face or a different butterfly in every frame is worse than no storyboard.

---

## 0. Project settings

| Setting | Use |
|---|---|
| Project | One Flow project called **FLUTTER**, so all ingredients stay together |
| Image model | **Nano Banana Pro** for final keyframes (best detail and consistency). A faster Nano Banana model is fine for rough exploration. |
| Aspect ratio | **16:9.** The film is framed for 2.39:1, so keep the key action inside the central band and letterbox in the edit. The prompts in [`flow/`](flow/) already say this. |
| Outputs per prompt | **4.** Pick the best, and regenerate rather than settle. |
| File naming | Download each chosen frame and name it with its **shot ID**, for example `B07-A.png` |

---

## 1. Build the ingredients (in this order)

Generate each one, pick the best, and keep it in the Flow project as a reusable reference. **Don't start shot frames until 1.1–1.3 are locked.**

### 1.1 DP (the protagonist)

1. Use the prepared crops of the reference sheet, with the label badges removed so Flow doesn't copy them: [`DP-C01.png`](../reference/DP-C01.png) (front face), [`DP-C02.png`](../reference/DP-C02.png) (three-quarter) and [`DP-C03.png`](../reference/DP-C03.png) (full body, masked).
2. Upload them to Flow and use them as DP's reference every time he's in a shot.
3. **Consistency test:** before any storyboard frame, generate these four test images with C01 + C03 attached. Check the curly hair with faded sides, the trimmed beard, and **the small mark at the outer corner of his left eye**.

```
The man in the reference images, standing in a bright minimal luxury apartment of warm ivory walls, pale stone and frosted glass, wearing exactly his reference outfit without the jacket and boots: heather-grey crew-neck T-shirt and dusty dark-grey cargo trousers, barefoot, relaxed. Full body, eye level, soft shadowless daylight. Cinematic film still, 16:9, photoreal, subtle film grain, no text.
```

```
The man in the reference images, wearing his dusty charcoal canvas work jacket, grey T-shirt, dusty cargo trousers and brown work boots, with a grey twin-cartridge half-face respirator over his nose and mouth and a black corrugated hose over his left shoulder to a grey belt unit at his left hip. He stands inside a spotless glass elevator among elegantly dressed people in pale clothes wearing slim champagne-metal crescent respirators. Rose-amber hazy city of colossal towers beyond the glass. Medium shot. Cinematic film still, 16:9, photoreal, no text.
```

```
Close-up of the man in the reference images, unmasked, sitting on a warm composite floor in soft lamp light, looking down at something small in his cupped hands with quiet wonder. Warm, tired dark-brown eyes. Shallow depth of field. Cinematic film still, 16:9, photoreal, subtle film grain, no text.
```

```
The man in the reference images in his dusty charcoal work jacket and grey twin-cartridge half-face respirator with hose, kneeling at a low open wall panel in a pristine apartment, lit by a small warm lamp from inside the panel. Three-quarter view. Cinematic film still, 16:9, photoreal, no text.
```

If his face drifts, regenerate with **C01 only** attached and start the prompt with "The same man as the reference image".

### 1.2 The creature (Generation 1): the most important design in the film

Generate many variations, choose **one**, then make a turnaround using the chosen image as the reference.

```
Macro photograph of a fragile hybrid butterfly, 10 cm wingspan, resting on a fingertip against a soft dark background: translucent, wet, smoky wing membranes with visible branching pale-amber veins, supported by a few hair-thin matte carbon-fibre spars running alongside the veins; the right forewing slightly shorter with a kinked spar and a crease; soft pale cream segmented organic abdomen, slightly translucent; thin thorax with tiny graphite vertebrae visible beneath thin organic tissue like a fish skeleton through skin; dark organic compound eyes, uneven antennae; moisture beads on the body; no glow, no lights, no visible electronics; faint rose-gold iridescence only at angles; delicate, imperfect, almost accidental — nature and machinery coexisting. Photoreal, 16:9, no text.
```

**Reject any result that** glows, has visible circuitry or screws on the surface, is perfectly symmetrical, or looks like a product. See [03-creature.md §10](../03-creature.md).

**Turnaround** (attach the chosen creature image): *"The same creature as the reference image, shown from the [front / side / top with wings open / side with wings closed], on a neutral grey background, macro, photoreal."*

### 1.3 Chrysalis and Generation 2

Attach the chosen creature image when generating both.

```
Macro photograph of a 3.5 cm chrysalis hanging under a greying wild-strawberry leaf: translucent wet organic tissue like grape skin held to light, fine uneven metallic threads running beneath it like veins or wiring, an anchoring silk pad of part organic thread and part frayed filament, condensation beads, no glow, it looks like it might be rotting. Warm lamp light, dark background. Photoreal, 16:9, no text.
```

```
A smaller descendant of the creature in the reference image: a fragile butterfly, 7 cm wingspan, fully organic veins with no carbon spars, only two or three tiny graphite flecks along the thorax, a faint dusk-blue pigment at the wing edges, a slight right-wing asymmetry, no glow. Resting beside an air vent grille in a clean apartment. Macro, photoreal, 16:9, no text.
```

### 1.4 Props

```
Macro photograph of a damaged insect-scale pollination drone lying in a white disposal tray: a bee-sized bio-synthetic body of pale engineered tissue over a micro-segmented graphite spine, thin carbon-fibre wing spars with the right forewing spar visibly bent, a cracked casing leaking clear repair gel. Clinical white light. Photoreal, 16:9, no text.
```

```
A small dented old metal tin opened on a pale stone floor: empty paper seed envelopes, a faded hand-drawn ink diagram of a life cycle (sun, plant, butterfly, seed, soil, water) with the butterfly circled in newer pen, and a sealed glass vial in old cryo-wrap with a handwritten label and a tiny hand-drawn butterfly. Warm lamp light. Top-down, photoreal, 16:9, no text.
```

### 1.5 Other characters

```
A bio-synthetic companion animal in a cat shape, resting on a minimal ivory sofa: soft short pale-grey coat, slightly too-perfect proportions and posture, calm glassy eyes, a tiny soft licence light at its collar. Bright luxury apartment. Photoreal, 16:9, no text.
```

```
Two Preservation officers in white fully sealed suits with soft rounded clear visors, standing calmly in a pristine pale-stone corridor, gloved hands relaxed, carrying a small clear specimen case. Clinical, gentle, no weapons, no insignia except a small seed-in-a-circle emblem. Photoreal, 16:9, no text.
```

```
A small quiet surveillance drone hovering in a pristine corridor: smooth rounded body of white and pale stone, appliance-like, no visible propellers, a soft diffuse light ring. Clean, calm, unthreatening design. Photoreal, 16:9, no text.
```

### 1.6 Locations

Generate each location as an **empty plate** first, then keep the best one as a reference for every shot set there.

| Tag | Prompt |
|---|---|
| `APARTMENT` | *A technically perfect small luxury apartment on the 786th floor: warm ivory walls, pale stone floor, warm composite wood, frosted glass, a single sealed floor-to-ceiling window onto a rose-amber hazy sky with a pale sun disc and colossal towers, a wall food dispenser, a small round sterilisation hatch, a softly glowing home panel, a low wall panel near the floor. Spotless, emotionally sterile, shadowless artificial daylight. Wide, eye level, photoreal, 16:9, no text.* |
| `HABITAT` | *A small open wall cavity at floor level, 60 cm wide, lit by a tiny warm lamp: a shallow tray holding a handful of dry soil, one struggling wild strawberry plant with three leaves, one greying, and one tired white flower, a thumb-sized patch of half-grey moss on a stone, a small jar of water. A faded handwritten diagram taped inside the open panel door. Almost pathetic. Photoreal, 16:9, no text.* |
| `LIFT` | *Interior of a spotless glass-walled express elevator high in a vertical megacity: brushed champagne metal, frosted glass, soft light, elegantly dressed passengers in pale clothes wearing slim crescent respirators, a vast rose-amber hazy city of towers and glass sky-bridges beyond the glass, silent flying commuter vehicles in lanes. No birds. Photoreal, 16:9, no text.* |
| `CITY` | *A beautiful vertical megacity: colossal elegant towers 1000 floors tall rising into a permanent rose-amber haze with a pale sun disc, connected by curved glass aerial bridges and transport tubes, quiet flying commuter vehicles moving in orderly lanes, soft gradients, glints of glass. Luxurious, efficient, desirable, no neon, no grime, no birds. Extreme wide, photoreal, 16:9, no text.* |
| `BRIDGE` | *A curved glass aerial bridge between towers, a plaza of perfect projected synthetic trees, commuters in pale clothes with slim crescent respirators; warm faintly amber rain streaking the glass roof. Photoreal, 16:9, no text.* |
| `AG-FLOOR` | *A sealed agricultural floor behind floor-to-ceiling glass: perfect rows of real green crops under even white light, tiny insect-scale pollination drones flying in exact grid patterns above them, a robotic arm and a white disposal tray. Clinical and immaculate. Photoreal, 16:9, no text.* |
| `OPS-ROOM` | *A calm white operations room of the Biological Preservation Authority: soft curved desks, pale stone and frosted glass, technicians in pale uniforms at quiet softly glowing screens, white sealed suits hanging ready on a rack. Photoreal, 16:9, no text.* |
| `CODA-APT` | *A smaller, simpler apartment lower in another tower: clean but modest, a wall air vent grille near the floor, a kitchen counter with a water filter, a child's toys. Soft artificial light. Photoreal, 16:9, no text.* |

---

## 2. Generate the storyboard frames

1. Open the sequence page in [`flow/`](flow/).
2. For each shot: **attach the listed references**, paste the **image prompt**, generate 4, and pick the best.
3. Download it and name it with the shot ID (`B07-A.png`).

**Do the hero frames first** (listed at the top of [`flow/README.md`](flow/README.md)). They show you whether the look works before you spend time on coverage.

---

## 3. Animate

- **Frames to Video:** use the chosen keyframe as the start frame and paste the shot's **motion prompt**. Keep each clip to 8 seconds or less.
- **Ingredients to Video:** use this for shots where DP or the creature must stay consistent through movement. Attach the DP and/or creature references.
- Long holds (for example, the ~30-second emergence hold in Beat 17) are built by chaining clips from each clip's last frame.

---

## 4. Getting frames back into the storyboard

Put the chosen images in [`frames/`](frames/), named by shot ID (`.png`, `.jpg` or `.webp`), then run:

```
python3 flutter/storyboard/render.py
```

Each frame then appears in its shot card and as a thumbnail in the shot index. Or just send the images to me in chat and I'll add them.

---

## 5. Consistency checklist (every frame)

- [ ] DP's references attached, with the left-eye mark, beard and curly hair matching
- [ ] DP has dust **only on his workwear**; nobody else has dust or a work-tier mask
- [ ] No floating dust and no visible light beams before Beat 17
- [ ] Creature: no glow, right-wing kink, wet and imperfect
- [ ] No neon, no grime in the city, no birds or insects (except the creature)
- [ ] Windows closed; rain is amber
- [ ] No text in the image (interface text is added in post)
