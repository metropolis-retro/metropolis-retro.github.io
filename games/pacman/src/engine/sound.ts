let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioContextClass =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    ctx = new AudioContextClass();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  volume = 0.15,
  delay = 0,
) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(ac.destination);

  const start = ac.currentTime + delay;
  osc.start(start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.stop(start + duration + 0.01);
}

function playNotes(
  notes: number[],
  noteDur: number,
  type: OscillatorType = "square",
  volume = 0.12,
) {
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], noteDur, type, volume, i * noteDur * 0.8);
  }
}

export function playEatPellet(): void {
  playTone(587, 0.07, "square", 0.1);
  playTone(784, 0.07, "square", 0.1, 0.06);
}

export function playEatPower(): void {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, ac.currentTime);
  osc.frequency.linearRampToValueAtTime(880, ac.currentTime + 0.15);
  osc.frequency.linearRampToValueAtTime(440, ac.currentTime + 0.3);

  gain.gain.setValueAtTime(0.15, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.36);
}

export function playEatGhost(): void {
  playNotes([523, 659, 784, 1047], 0.08, "square", 0.12);
}

export function playDeath(): void {
  const notes = [784, 698, 622, 523, 466, 392, 330, 262];
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], 0.15, "triangle", 0.13, i * 0.12);
  }
}

export function playGameStart(): void {
  playNotes([262, 330, 392, 523], 0.12, "square", 0.13);
}

export function playGameOver(): void {
  const notes = [392, 330, 262, 196];
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], 0.3, "triangle", 0.13, i * 0.25);
  }
}

export function playWin(): void {
  const notes = [523, 659, 784, 1047, 784, 1047];
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], 0.15, "square", 0.14, i * 0.12);
  }
}
