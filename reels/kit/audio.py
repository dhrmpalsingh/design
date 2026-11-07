"""Soundtrack for a puzzle reel: voice-over, a music bed (cues["music"]: mystery or bright) and effects.

Reads cues.json (written by render.js), mixes vo/*.wav on top with the music ducked under
the voice, and writes soundtrack.wav.
"""
import json
import sys
import wave

import numpy as np

SR = 44100
CUES = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'cues.json'))
DUR = CUES['dur']
N = int(SR * DUR)
tt = np.arange(N) / SR
rng = np.random.default_rng(5)


def env(n, attack=.004, decay=.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / attack) * np.exp(-t / decay)


def tone(freq, dur, decay, partials=((1, 1.0),)):
    n = int(SR * dur)
    t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * freq * m * t) * np.exp(-t / (decay / m ** .7)) for m, a in partials) * np.minimum(1, t / .003)


def noise(n):
    return rng.uniform(-1, 1, n)


def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode='same')


def hp(x, k):
    return x - lp(x, k)


def plus(*xs):
    n = max(len(x) for x in xs)
    return sum(np.pad(x, (0, n - len(x))) for x in xs)


def seq(*parts):
    return np.concatenate(parts)


def sweep(f0, f1, dur, decay):
    n = int(SR * dur)
    return np.sin(2 * np.pi * np.cumsum(np.linspace(f0, f1, n)) / SR) * env(n, .002, decay)


def swell(dur):
    return np.sin(np.linspace(0, np.pi, int(SR * dur))) ** 2


def add(buf, start, clip, gain):
    i = int(start * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i] * gain


# ---------- music ----------
music = np.zeros(N)
NOTE = {'D2': 73.42, 'A1': 55.0, 'Bb1': 58.27, 'C2': 65.41, 'D4': 293.66, 'F4': 349.23, 'A4': 440.0, 'E4': 329.63, 'G4': 392.0,
        'Bb3': 233.08, 'C4': 261.63, 'D5': 587.33, 'C5': 523.25, 'A3': 220.0, 'F2': 87.31, 'G2': 98.0, 'C3': 130.81, 'A2': 110.0,
        'B4': 493.88, 'E5': 659.25, 'G5': 783.99, 'F5': 698.46}
if CUES.get('music') == 'space':    # wide pads, slow pulse and a crystal arpeggio
    pads = [[65.41, 98.0, 130.81, 196.0, 329.63], [55.0, 82.41, 110.0, 164.81, 261.63], [43.65, 65.41, 87.31, 130.81, 220.0], [49.0, 73.42, 98.0, 146.83, 246.94]]
    t, k = 0.0, 0
    while t < DUR:
        n = int(SR * 9.5); tt_ = np.arange(n) / SR; envp = np.minimum(1, tt_ / 2.0) * np.minimum(1, (9.5 - tt_) / 2.5)
        chord = sum(np.sin(2 * np.pi * f * tt_ + .4 * np.sin(2 * np.pi * .15 * tt_ + j)) * (1 if j < 2 else .45) for j, f in enumerate(pads[k % 4]))
        add(music, t, chord * envp, .09)
        for b in range(16):
            add(music, t + b * .5, tone(pads[k % 4][2] * 4 * [1, 1.5, 2, 1.5][b % 4], .6, .25, ((1, 1), (3, .08))), .05)
            if b % 2 == 0: add(music, t + b * .5, sweep(70, 40, .3, .12), .18)
        t += 8.0; k += 1
    chords = None
elif CUES.get('music') == 'deep':     # slow ambient pads + underwater rumble
    pads = [[110.0, 164.81, 220.0, 261.63], [87.31, 130.81, 174.61, 220.0], [98.0, 146.83, 196.0, 246.94], [82.41, 123.47, 164.81, 207.65]]
    t, k = 0.0, 0
    while t < DUR:
        n = int(SR * 9.5); tt_ = np.arange(n) / SR; envp = np.minimum(1, tt_ / 2.5) * np.minimum(1, (9.5 - tt_) / 2.5)
        chord = sum(np.sin(2 * np.pi * f * tt_ + .3 * np.sin(2 * np.pi * .2 * tt_)) * (1 if j == 0 else .5) for j, f in enumerate(pads[k % 4]))
        add(music, t, chord * envp, .1)
        t += 8.0; k += 1
    music += lp(rng.uniform(-1, 1, N), 400) * 2.5   # deep water rumble
    for b in np.arange(0, DUR, 1.7):
        add(music, b + rng.uniform(0, 1.2), sweep(500 + rng.uniform(0, 500), 1400, .06, .02), .05)
    chords = None
elif CUES.get('music') == 'bright':   # bouncy major loop
    chords = [('C3', ['C4', 'E4', 'G4', 'C5', 'E5', 'C5', 'G4', 'E4']), ('A2', ['A3', 'C4', 'E4', 'A4', 'C5', 'A4', 'E4', 'C4']),
              ('F2', ['F4', 'A4', 'C5', 'F5', 'C5', 'A4', 'F4', 'C4']), ('G2', ['G4', 'B4', 'D5', 'G5', 'D5', 'B4', 'G4', 'D4'])]
    beat, pl, pdec = 60 / 112, .55, .14
else:                                # pizzicato mystery loop in D minor
    chords = [('D2', ['D4', 'F4', 'A4', 'F4', 'D5', 'A4', 'F4', 'A4']), ('Bb1', ['Bb3', 'D4', 'F4', 'D4', 'Bb3', 'F4', 'D4', 'F4']),
              ('C2', ['C4', 'E4', 'G4', 'E4', 'C5', 'G4', 'E4', 'G4']), ('A1', ['A3', 'C4', 'E4', 'C4', 'A4', 'E4', 'C4', 'E4'])]
    beat, pl, pdec = 60 / 100, .5, .09
t, k = 0.0, 0
while chords and t < DUR:
    bass, arp = chords[k % 4]
    add(music, t, tone(NOTE[bass], 2.4, .9, ((1, 1), (2, .4), (3, .15))), .34)
    for i, nm in enumerate(arp):
        add(music, t + i * beat / 2, tone(NOTE[nm], pl, pdec, ((1, 1), (2, .2), (4, .05))), .16 if i % 2 == 0 else .1)
    for i in range(4):
        add(music, t + i * beat + beat / 2, hp(noise(int(SR * .03)), 5) * env(int(SR * .03), .001, .008), .05)
        if CUES.get('music') == 'bright':
            add(music, t + i * beat, sweep(110, 45, .16, .06), .2 if i % 2 == 0 else .1)
    t += beat * 4
    k += 1
c0, c1, c2, c3 = CUES['countdown']
music *= np.clip(tt / .8, 0, 1) * np.clip((DUR - tt) / 2.5, 0, 1)
music *= np.interp(tt, [0, c0, c1, c2, c3, DUR], [1, 1, .45, .45, 1, 1])

# ---------- effects ----------
fx = np.zeros(N)
SOUNDS = {
    'pop': (lambda: sweep(420, 980, .09, .03), .18),
    'whoosh': (lambda: lp(noise(int(SR * .32)), 14) * swell(.32), .14),
    'tick': (lambda: tone(1250, .12, .025, ((1, 1), (2.3, .4))), .3),
    'tickHi': (lambda: tone(1650, .12, .03, ((1, 1), (2.3, .4))), .35),
    'ding': (lambda: plus(tone(880, 1.6, .7, ((1, 1), (2.76, .25))), tone(1318.5, 1.6, .7, ((1, 1), (2.76, .2))) * .6), .22),
    'chime': (lambda: plus(*[np.pad(tone(f, 1.4, .45, ((1, 1), (2.76, .2))), (int(i * .08 * SR), 0)) for i, f in enumerate((784, 988, 1175, 1568))]), .14),
    'win': (lambda: plus(*[np.pad(tone(f, 1.2, .4, ((1, 1), (2, .3))), (int(i * .1 * SR), 0)) for i, f in enumerate((523, 659, 784, 1046))]), .16),
    'buzz': (lambda: (np.sign(np.sin(2 * np.pi * 110 * np.arange(int(SR * .5)) / SR)) * .5 + np.sin(2 * np.pi * 116 * np.arange(int(SR * .5)) / SR) * .5) * env(int(SR * .5), .005, .25), .12),
    'clang': (lambda: plus(tone(196, 1.5, .5, ((1, 1), (2.41, .6), (4.3, .35), (6.9, .2))), lp(noise(int(SR * 1.5)), 2) * env(int(SR * 1.5), .001, .012) * .5), .3),
    'click': (lambda: plus(noise(int(SR * .012)) * env(int(SR * .012), .0005, .003), tone(1900, .012, .006) * .5), .5),
    'card': (lambda: lp(noise(int(SR * .16)), 6) * env(int(SR * .16), .01, .05), .3),
    'chalk': (lambda: hp(noise(int(SR * .35)), 3) * swell(.35) * (1 + .6 * np.sin(np.arange(int(SR * .35)) / SR * 2 * np.pi * 38)), .16),
    'chalkS': (lambda: hp(noise(int(SR * .12)), 3) * swell(.12), .08),
    'cheer': (lambda: lp(noise(int(SR * 3.0)), 9) * np.minimum(1, np.arange(int(SR * 3.0)) / (SR * .4)) * np.exp(-np.arange(int(SR * 3.0)) / (SR * 1.8)) * (1 + .4 * np.sin(np.arange(int(SR * 3.0)) / SR * 2 * np.pi * 5.5)), .5),
    'roll': (lambda: seq(*[np.pad(tone(1000 + 40 * i, .03, .01), (0, int(SR * .045))) for i in range(30)]), .1),
    'step': (lambda: lp(noise(int(SR * .05)), 18) * env(int(SR * .05), .002, .012), .45),
    'laser': (lambda: (np.sin(2 * np.pi * np.cumsum(np.linspace(300, 1600, int(SR * .6))) / SR) * .6 + np.sin(2 * np.pi * 220 * np.arange(int(SR * .6)) / SR) * .3) * swell(.6), .12),
    'alarm': (lambda: seq(*[np.pad(tone(f, .16, .1, ((1, 1), (2, .3))), (0, int(SR * .06))) for f in (988, 740, 988, 740, 988, 740)]), .14),
    'sonar': (lambda: plus(tone(1180, 2.4, .9, ((1, 1), (2, .15))), np.pad(tone(1180, 2.0, .7, ((1, 1),)), (int(SR * .45), 0)) * .25), .16),
    'splash': (lambda: plus(lp(noise(int(SR * 1.0)), 5) * env(int(SR * 1.0), .004, .22), sweep(160, 50, .5, .18) * .8), .55),
    'bubbles': (lambda: seq(*[np.pad(sweep(300 + 70 * (i % 7), 900 + 90 * (i % 5), .05, .02), (0, int(SR * (.03 + .03 * (i % 3))))) for i in range(26)]), .14),
    'thud': (lambda: plus(sweep(90, 35, .5, .18), lp(noise(int(SR * .5)), 25) * env(int(SR * .5), .002, .08)), .7),
    'flood': (lambda: lp(noise(int(SR * 3.0)), 6) * np.minimum(1, np.arange(int(SR * 3.0)) / (SR * .3)) * np.exp(-np.arange(int(SR * 3.0)) / (SR * 1.6)) * (1 + .4 * np.sin(np.arange(int(SR * 3.0)) / SR * 2 * np.pi * 7)), .6),
    'pump': (lambda: sum(np.sin(2 * np.pi * f * np.arange(int(SR * 2.6)) / SR) * a for f, a in ((90, 1), (180, .5), (270, .25))) * (.8 + .2 * np.sin(np.arange(int(SR * 2.6)) / SR * 2 * np.pi * 10)) * swell(2.6), .08),
    'creak': (lambda: np.sin(2 * np.pi * np.cumsum(np.linspace(150, 95, int(SR * 1.3)) + 22 * np.sin(np.arange(int(SR * 1.3)) / SR * 2 * np.pi * 23)) / SR) * swell(1.3), .1),
    'hiss': (lambda: hp(noise(int(SR * 2.4)), 3) * swell(2.4), .1),
    'hum': (lambda: sum(np.sin(2 * np.pi * f * np.arange(int(SR * 2.0)) / SR) * a for f, a in ((120, 1), (240, .4))) * np.minimum(1, np.arange(int(SR * 2.0)) / (SR * .05)) * np.exp(-np.arange(int(SR * 2.0)) / (SR * 1.2)), .06),
    'coin': (lambda: plus(tone(1975, .5, .12, ((1, 1), (1.5, .4))), np.pad(tone(2637, .5, .15, ((1, 1),)), (int(SR * .06), 0))), .12),
    'paper': (lambda: hp(noise(int(SR * .18)), 4) * swell(.18), .18),
    'door': (lambda: plus(np.sin(2 * np.pi * np.cumsum(np.linspace(160, 110, int(SR * .7)) + 20 * np.sin(np.arange(int(SR * .7)) / SR * 2 * np.pi * 27)) / SR) * swell(.7) * .4, np.pad(sweep(90, 40, .3, .1), (int(SR * .55), 0))), .25),
    'goat': (lambda: np.sin(2 * np.pi * np.cumsum(np.full(int(SR * .7), 330.0) * (1 + .06 * np.sign(np.sin(np.arange(int(SR * .7)) / SR * 2 * np.pi * 18)))) / SR) * swell(.7) * (1 + .5 * np.sin(np.arange(int(SR * .7)) / SR * 2 * np.pi * 18)), .12),
    'horn': (lambda: seq(*[np.pad((np.sign(np.sin(2 * np.pi * 440 * np.arange(int(SR * .18)) / SR)) * .3 + np.sin(2 * np.pi * 554 * np.arange(int(SR * .18)) / SR)) * env(int(SR * .18), .01, .2), (0, int(SR * .06))) for _ in range(2)]), .12),
    'gulp': (lambda: sweep(500, 180, .18, .07), .25),
    'crack': (lambda: plus(hp(noise(int(SR * .3)), 3) * env(int(SR * .3), .0005, .04), sweep(160, 50, .4, .15)), .5),
    'crash': (lambda: plus(lp(noise(int(SR * 1.6)), 6) * env(int(SR * 1.6), .002, .4), sweep(80, 30, 1.0, .35)), .6),
    'fire': (lambda: hp(noise(int(SR * 1.2)), 2) * (rng.uniform(0, 1, int(SR * 1.2)) > .995) * 3 * swell(1.2), .25),
    'drum': (lambda: seq(*[np.pad(lp(noise(int(SR * .04)), 3) * env(int(SR * .04), .001, .012) * (.4 + .6 * i / 40), (0, int(SR * .02))) for i in range(40)]), .4),
}
for t0, kind in CUES['sfx']:
    make, g = SOUNDS[kind]
    add(fx, t0, make(), g)

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
