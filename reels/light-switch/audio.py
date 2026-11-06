"""Builds the reel soundtrack: voice-over, a soft mallet loop and synthesized sound effects.

Reads cues.json (written by render.js: video duration, effect cues, voice-over line
times), mixes the vo/*.wav lines on top with the music ducked under them, and writes
soundtrack.wav.
"""
import json
import sys
import wave

import numpy as np

SR = 44100
CUES = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'cues.json'))
DUR = CUES['dur']
N = int(SR * DUR)
rng = np.random.default_rng(7)


def env(n, attack=0.004, decay=0.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / attack) * np.exp(-t / decay)


def tone(freq, dur, decay, partials=((1, 1.0),)):
    n = int(SR * dur)
    t = np.arange(n) / SR
    y = sum(a * np.sin(2 * np.pi * freq * m * t) * np.exp(-t / (decay / m ** 0.7)) for m, a in partials)
    return y * np.minimum(1, t / 0.003)


def mallet(freq, dur=0.9):
    return tone(freq, dur, 0.32, ((1, 1.0), (4.0, 0.18), (2.0, 0.12)))


def noise(n):
    return rng.uniform(-1, 1, n)


def lowpass(x, k):
    return np.convolve(x, np.ones(k) / k, mode='same')


def add(buf, start, clip, gain):
    i = int(start * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i] * gain


# ---------- music ----------
music = np.zeros(N)
NOTE = {'C3': 130.81, 'F2': 87.31, 'G2': 98.0, 'A2': 110.0, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.0, 'A4': 440.0, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99}
chords = [  # (bass, arpeggio)
    ('C3', ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'G4', 'E5']),
    ('A2', ['A4', 'C5', 'E5', 'A4', 'E4', 'C5', 'E4', 'A4']),
    ('F2', ['F4', 'A4', 'C5', 'F4', 'C5', 'A4', 'F4', 'A4']),
    ('G2', ['G4', 'B4', 'D5', 'G5', 'D5', 'B4', 'G4', 'D4']),
]
beat = 60 / 104
eighth = beat / 2
bar = beat * 4
t = 0.0
k = 0
while t < DUR:
    bass, arp = chords[k % 4]
    add(music, t, tone(NOTE[bass], 1.6, 0.6, ((1, 1.0), (2, 0.25))), 0.30)
    add(music, t + beat * 2, tone(NOTE[bass], 1.2, 0.5, ((1, 1.0), (2, 0.25))), 0.20)
    for i, nm in enumerate(arp):
        add(music, t + i * eighth, mallet(NOTE[nm]), 0.16 if i % 2 == 0 else 0.11)
    # light shaker on the off-beats
    for i in range(8):
        if i % 2:
            sh = lowpass(noise(int(SR * 0.05)), 2) * env(int(SR * 0.05), 0.002, 0.012)
            add(music, t + i * eighth, sh - lowpass(sh, 8), 0.05)
    t += bar
    k += 1

# duck the music under the countdown and fade in/out
gain = np.ones(N)
tt = np.arange(N) / SR
gain *= np.clip(tt / 0.6, 0, 1)
gain *= np.clip((DUR - tt) / 2.0, 0, 1)
c0, c1, c2, c3 = CUES['countdown']
duck = np.interp(tt, [0, c0, c1, c2, c3, DUR], [1, 1, 0.45, 0.45, 1, 1])
music *= gain * duck

# ---------- effects ----------
fx = np.zeros(N)


def sweep(f0, f1, dur, decay):
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = np.linspace(f0, f1, n)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, decay)


def bell(freqs, spacing=0.0, decay=0.9):
    out = np.zeros(int(SR * (2 + spacing * len(freqs))))
    for i, f in enumerate(freqs):
        c = tone(f, 1.8, decay, ((1, 1.0), (2.76, 0.25), (5.4, 0.08)))
        s = int(i * spacing * SR)
        out[s:s + len(c)] += c
    return out


SOUNDS = {
    'pop': (lambda: sweep(420, 980, 0.09, 0.03), 0.22),
    'click': (lambda: np.concatenate([(noise(int(SR * .012)) * env(int(SR * .012), .0005, .003))]) * 0.8
              + np.pad(tone(1900, .03, .006), (0, 0))[: int(SR * .012)] * 0.5, 0.55),
    'tick': (lambda: tone(1250, 0.12, 0.025, ((1, 1.0), (2.3, 0.4))), 0.40),
    'tickHi': (lambda: tone(1650, 0.12, 0.03, ((1, 1.0), (2.3, 0.4))), 0.45),
    'ding': (lambda: bell([880, 1318.5], 0.0, 0.8), 0.25),
    'idea': (lambda: bell([1046.5, 1318.5, 1568], 0.07, 0.5), 0.18),
    'chime': (lambda: bell([1046.5, 1318.5, 1568, 2093], 0.08, 0.6), 0.18),
    'blip': (lambda: np.concatenate([tone(660, .07, .03), tone(990, .12, .05)]), 0.20),
    'blipDown': (lambda: np.concatenate([tone(880, .07, .03), tone(587, .14, .06)]), 0.22),
    'whoosh': (lambda: lowpass(noise(int(SR * .7)), 30) * np.sin(np.linspace(0, np.pi, int(SR * .7))) ** 2, 0.9),
    'cut': (lambda: lowpass(noise(int(SR * .18)), 12) * np.sin(np.linspace(0, np.pi, int(SR * .18))) ** 2, 0.35),
    'ff': (lambda: np.concatenate([sweep(300 + 40 * i, 900 + 60 * i, .1, .05) for i in range(24)]), 0.06),
    'ouch': (lambda: sweep(900, 380, .25, .12), 0.20),
    'card': (lambda: lowpass(noise(int(SR * .16)), 6) * env(int(SR * .16), .01, .05), 0.30),
    'step': (lambda: lowpass(noise(int(SR * .06)), 20) * env(int(SR * .06), .002, .015), 0.55),
}

for t0, kind in CUES['sfx']:
    make, g = SOUNDS[kind]
    add(fx, t0, make(), g * 0.8)

# ---------- voice-over ----------
vo = np.zeros(N)
for line in CUES['vo']:
    with wave.open(line['file'], 'rb') as w:
        assert w.getframerate() == SR and w.getnchannels() == 1
        y = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float64) / 32768
    add(vo, line['t'], y, 1.0)

# duck music (and soften effects) while someone is speaking
active = np.zeros(N)
for line in CUES['vo']:
    a, b = int((line['t'] - .12) * SR), int((line['t'] + line['dur'] + .2) * SR)
    active[max(0, a):min(N, b)] = 1
k = int(SR * .12)
active = np.convolve(active, np.ones(k) / k, mode='same')
music *= 1 - 0.55 * active
fx *= 1 - 0.3 * active

mix = vo * 1.0 + music * 0.75 + fx
peak = np.max(np.abs(mix))
mix = np.tanh(mix / peak * 1.1) * 0.89  # gentle limiting
stereo = np.stack([mix, mix], axis=1)
with wave.open('soundtrack.wav', 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((stereo * 32767).astype('<i2').tobytes())
print('wrote soundtrack.wav:', len(CUES['sfx']), 'effects,', len(CUES['vo']), 'voice lines,', f'{DUR:.2f}s')
