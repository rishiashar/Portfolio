// Tiny WAV synthesizer that writes mono 16-bit PCM @ 44.1kHz files into
// public/sounds/ for the Remotion <Audio> component to pick up. No external
// dependencies — keeps the launch reel self-contained.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SAMPLE_RATE = 44100;
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "public", "sounds");
mkdirSync(outDir, { recursive: true });

const writeWav = (name, samples) => {
  const numSamples = samples.length;
  const dataSize = numSamples * 2; // 16-bit mono
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // fmt chunk size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // byte rate
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  const path = resolve(outDir, name);
  writeFileSync(path, buffer);
  console.log(`+ ${path} (${(buffer.length / 1024).toFixed(1)} kB)`);
};

const seconds = (s) => Math.floor(s * SAMPLE_RATE);

// ── 1. tick — a short, percussive UI click (square + envelope) ──
{
  const len = seconds(0.06);
  const samples = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    // High frequency square fading fast
    const env = Math.exp(-t * 90);
    const sq = Math.sign(Math.sin(2 * Math.PI * 1800 * t));
    const noise = (Math.random() * 2 - 1) * 0.4;
    samples[i] = (sq * 0.4 + noise * 0.5) * env * 0.6;
  }
  writeWav("tick.wav", samples);
}

// ── 2. whoosh — filtered noise sweep, wide stereo feel via amp envelope ──
{
  const len = seconds(0.32);
  const samples = new Float32Array(len);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / 0.32; // 0..1 progress
    const env = Math.sin(Math.PI * p) ** 1.5; // hump envelope
    // Lowpass-ish noise that opens up over time
    const cutoff = 0.04 + p * 0.65;
    const n = Math.random() * 2 - 1;
    last = last + cutoff * (n - last);
    samples[i] = last * env * 0.55;
  }
  writeWav("whoosh.wav", samples);
}

// ── 3. impact — low bass thump with brief noise transient ──
{
  const len = seconds(0.5);
  const samples = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    // Sub-bass sine that falls in pitch
    const freq = 70 - t * 40; // 70Hz → 30Hz
    const env = Math.exp(-t * 5);
    const sub = Math.sin(2 * Math.PI * freq * t) * env * 0.85;
    // Click transient at the very start
    const click = t < 0.012 ? (Math.random() * 2 - 1) * (1 - t / 0.012) * 0.4 : 0;
    samples[i] = sub + click;
  }
  writeWav("impact.wav", samples);
}

// ── 4. chime — ascending bell-like reveal, two harmonics with decay ──
{
  const len = seconds(1.1);
  const samples = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 2.4);
    // Two sine partials a perfect fifth apart for a friendly bell
    const f1 = 880;
    const f2 = 1320;
    const f3 = 1760;
    const s =
      Math.sin(2 * Math.PI * f1 * t) * 0.5 +
      Math.sin(2 * Math.PI * f2 * t) * 0.28 +
      Math.sin(2 * Math.PI * f3 * t) * 0.16;
    // Subtle attack rise
    const attack = Math.min(1, t / 0.01);
    samples[i] = s * env * attack * 0.55;
  }
  writeWav("chime.wav", samples);
}

// ── 5. swoosh-up — short rising tone, used for the rainbow gradient pop ──
{
  const len = seconds(0.4);
  const samples = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / 0.4;
    // Frequency rises 200 → 1200 Hz
    const freq = 200 + p * 1000;
    const env = Math.sin(Math.PI * p) ** 1.8;
    const tone = Math.sin(2 * Math.PI * freq * t);
    const air = (Math.random() * 2 - 1) * 0.18 * env;
    samples[i] = (tone * 0.45 + air) * env * 0.6;
  }
  writeWav("pop.wav", samples);
}

console.log("done");
