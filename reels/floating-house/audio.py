"""Soundtrack for the Floating House reel: voice-over, a light music bed, effects and rain.

Reads cues.json (written by render.js), mixes vo/*.wav on top with the music ducked
under the voice, and writes soundtrack.wav.
"""
import json
import sys
import wave

import numpy as np

SR = 44100
CUES = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'cues.json'))
DUR = CUES['dur']
N = int(SR * DUR)
rng = np.random.default_rng(3)
tt = np.arange(N) / SR


def env(n, attack=0.004, decay=0.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / attack) * np.exp(-t / decay)


def tone(freq, dur, decay, partials=((1, 1.0),)):
    n = int(SR * dur)
    t = np.arange(n) / SR
    y = sum(a * np.sin(2 * np.pi * freq * m * t) * np.exp(-t / (decay / m ** 0.7)) for m, a in partials)
    return y * np.minimum(1, t / 0.003)


def noise(n):
    return rng.uniform(-1, 1, n)


def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode='same')


def hp(x, k):
    return x - lp(x, k)


def add(buf, start, clip, gain):
    i = int(start * SR)
    if i >= len(buf) or i + len(clip) <= 0:
        return
    a = max(0, -i)
    j = min(len(buf), i + len(clip))
    buf[max(0, i):j] += clip[a: j - i] * gain


def sweep(f0, f1, dur, decay):
    n = int(SR * dur)
    f = np.linspace(f0, f1, n)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, decay)


def plus(*xs):
    n = max(len(x) for x in xs)
    return sum(np.pad(x, (0, n - len(x))) for x in xs)


def swell(dur):
    n = int(SR * dur)
    return np.sin(np.linspace(0, np.pi, n)) ** 2


# ---------- music: a light, curious pluck loop ----------
music = np.zeros(N)
NOTE = {'A2': 110.0, 'F2': 87.31, 'C3': 130.81, 'G2': 98.0, 'A3': 220.0, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63,
        'F4': 349.23, 'G4': 392.0, 'A4': 440.0, 'B4': 493.88, 'C5': 523.25, 'E5': 659.25}
chords = [('A2', ['A3', 'E4', 'A4', 'C5', 'A4', 'E4', 'C5', 'E5']), ('F2', ['F4', 'A4', 'C5', 'A4', 'F4', 'C5', 'A4', 'C4']),
          ('C3', ['C4', 'G4', 'C5', 'E5', 'C5', 'G4', 'E4', 'G4']), ('G2', ['G4', 'B4', 'D4', 'G4', 'B4', 'D4', 'G4', 'B4'])]
beat = 60 / 96
t, k = 0.0, 0
while t < DUR:
    bass, arp = chords[k % 4]
    add(music, t, tone(NOTE[bass], 2.2, .8, ((1, 1), (2, .3))), .32)
    for i, nm in enumerate(arp):
        add(music, t + i * beat / 2, tone(NOTE[nm], .7, .18, ((1, 1), (3, .12), (5, .04))), .13 if i % 2 == 0 else .09)
    for i in range(4):  # soft kick + hat
        add(music, t + i * beat, sweep(110, 45, .18, .07), .25 if i % 2 == 0 else .12)
        hh = hp(noise(int(SR * .04)), 6) * env(int(SR * .04), .001, .01)
        add(music, t + i * beat + beat / 2, hh, .06)
    t += beat * 4
    k += 1
s0, s1, s2, s3 = CUES['storm']
music *= np.clip(tt / .8, 0, 1) * np.clip((DUR - tt) / 2.0, 0, 1)
music *= np.interp(tt, [0, s0, s1, s2, s3, DUR], [1, 1, .7, .7, 1, 1])

# ---------- effects ----------
fx = np.zeros(N)
SOUNDS = {
    'whoosh': (lambda: lp(noise(int(SR * .35)), 14) * swell(.35), .16),
    'pop': (lambda: sweep(420, 980, .09, .03), .2),
    'crane': (lambda: (np.sign(np.sin(2 * np.pi * 55 * np.arange(int(SR * 1.1)) / SR)) * .3 + lp(noise(int(SR * 1.1)), 30)) * swell(1.1) * (1 + .3 * np.sin(np.arange(int(SR * 1.1)) / SR * 2 * np.pi * 9)), .10),
    'dig': (lambda: lp(noise(int(SR * .22)), 9) * env(int(SR * .22), .005, .06), .5),
    'pour': (lambda: lp(noise(int(SR * 2.2)), 7) * swell(2.2) * (1 + .4 * np.sin(np.arange(int(SR * 2.2)) / SR * 2 * np.pi * 6)), .35),
    'splash': (lambda: plus(lp(noise(int(SR * .9)), 5) * env(int(SR * .9), .004, .18), sweep(160, 50, .4, .15) * .8), .55),
    'bubbles': (lambda: np.concatenate([np.pad(sweep(300 + 60 * (i % 7), 900 + 80 * (i % 5), .05, .02), (0, int(SR * .04))) for i in range(22)]), .12),
    'thud': (lambda: plus(sweep(90, 38, .35, .12), lp(noise(int(SR * .35)), 25) * env(int(SR * .35), .002, .05)), .6),
    'drip': (lambda: np.concatenate([np.pad(sweep(900 + 140 * (i % 4), 1700, .03, .01), (0, int(SR * (.09 + .05 * (i % 3))))) for i in range(10)]), .12),
    'thunk': (lambda: plus(sweep(120, 60, .3, .09), lp(noise(int(SR * .3)), 12) * env(int(SR * .3), .002, .04) * .6), .5),
    'steps': (lambda: np.concatenate([np.pad(lp(noise(int(SR * .05)), 18) * env(int(SR * .05), .002, .012), (0, int(SR * .14))) for _ in range(8)]), .5),
    'creak': (lambda: np.sin(2 * np.pi * np.cumsum(np.linspace(190, 140, int(SR * .9)) + 25 * np.sin(np.arange(int(SR * .9)) / SR * 2 * np.pi * 31)) / SR) * swell(.9), .07),
    'pump': (lambda: sum(np.sin(2 * np.pi * f * np.arange(int(SR * 2.4)) / SR) * a for f, a in ((100, 1), (200, .5), (300, .25))) * (.8 + .2 * np.sin(np.arange(int(SR * 2.4)) / SR * 2 * np.pi * 12)) * np.minimum(1, np.minimum(np.arange(int(SR * 2.4)), int(SR * 2.4) - np.arange(int(SR * 2.4))) / (SR * .15)), .07),
    'wind': (lambda: lp(noise(int(SR * 2.4)), 40) * swell(2.4) * (1 + .5 * np.sin(np.arange(int(SR * 2.4)) / SR * 2 * np.pi * .9)), .9),
    'clang': (lambda: plus(tone(523, 1.4, .55, ((1, 1), (2.41, .6), (4.3, .35), (7.1, .2))), lp(noise(int(SR * 1.4)), 2) * env(int(SR * 1.4), .001, .01) * .5), .28),
    'ring': (lambda: tone(1760, .4, .12, ((1, 1), (2.7, .4))), .16),
    'snap': (lambda: plus(hp(noise(int(SR * .25)), 4) * env(int(SR * .25), .0005, .03), sweep(140, 50, .25, .08) * .6), .7),
    'spray': (lambda: hp(noise(int(SR * 1.8)), 3) * env(int(SR * 1.8), .01, .6), .18),
    'boing': (lambda: np.sin(2 * np.pi * np.cumsum(np.linspace(180, 420, int(SR * .7)) * (1 + .15 * np.sin(np.arange(int(SR * .7)) / SR * 2 * np.pi * 14))) / SR) * env(int(SR * .7), .005, .25), .22),
    'thunder': (lambda: lp(noise(int(SR * 3.0)), 90) * env(int(SR * 3.0), .05, 1.0) * (1 + .6 * np.sin(np.arange(int(SR * 3.0)) / SR * 2 * np.pi * 3.3)), 2.2),
    'chime': (lambda: plus(*[np.pad(tone(f, 1.6, .5, ((1, 1), (2.76, .2))), (int(i * .08 * SR), 0)) for i, f in enumerate((784, 988, 1175, 1568))]), .14),
    'rainIn': (lambda: np.zeros(1), 0),
}
for t0, kind in CUES['sfx']:
    make, g = SOUNDS[kind]
    add(fx, t0, make(), g)

# rain bed follows the storm
rain = hp(noise(N), 3) * .5 + lp(noise(N), 6) * .5
fx += rain * np.interp(tt, [0, s0, s1, s2, s3, DUR], [0, 0, 1, 1, 0, 0]) * .12

# ---------- voice-over ----------
vo = np.zeros(N)
active = np.zeros(N)
for line in CUES['vo']:
    with wave.open(line['file'], 'rb') as w:
        assert w.getframerate() == SR and w.getnchannels() == 1
        y = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float64) / 32768
    add(vo, line['t'], y, 1.0)
    a, b = int((line['t'] - .12) * SR), int((line['t'] + line['dur'] + .2) * SR)
    active[max(0, a):min(N, b)] = 1
kk = int(SR * .15)
active = np.convolve(active, np.ones(kk) / kk, mode='same')
music *= 1 - .55 * active
fx *= 1 - .25 * active

mix = vo + music * .7 + fx
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.15) * .89
st = np.stack([mix, mix], axis=1)
with wave.open('soundtrack.wav', 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
db = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
m = active > .9
print(f'wrote soundtrack.wav {DUR:.2f}s; during speech: voice {db(vo[m]):.1f} dB, music {db(music[m] * .7):.1f} dB, fx {db(fx[m]):.1f} dB')
