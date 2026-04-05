let audioCtx: AudioContext | null = null;
let muted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  volume = 0.12,
  delay = 0,
): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const start = ctx.currentTime + delay;
  osc.start(start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.stop(start + duration + 0.01);
}

function playNotes(
  notes: number[],
  noteDur: number,
  type: OscillatorType = "square",
  volume = 0.1,
): void {
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], noteDur, type, volume, i * noteDur * 0.8);
  }
}

export function playEat(): void {
  playTone(587, 0.06, "square", 0.1);
  playTone(784, 0.06, "square", 0.1, 0.05);
}

export function playPowerUp(): void {
  playNotes([523, 659, 784, 1047], 0.07, "square", 0.1);
}

export function playGameOver(): void {
  const notes = [392, 330, 262, 196];
  for (let i = 0; i < notes.length; i++) {
    playTone(notes[i], 0.25, "triangle", 0.12, i * 0.2);
  }
}

export function playLevelUp(): void {
  playNotes([523, 659, 784, 1047, 784, 1047], 0.08, "square", 0.1);
}

export function playStart(): void {
  playNotes([262, 330, 392, 523], 0.1, "square", 0.1);
}

export function playMove(): void {
  playTone(200, 0.02, "sine", 0.03);
}

export function setMuted(value: boolean): void {
  muted = value;
}

export function isMuted(): boolean {
  return muted;
}

export function toggleMute(): boolean {
  muted = !muted;
  return muted;
}
