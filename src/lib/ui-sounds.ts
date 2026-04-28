type AudioContextConstructor = typeof AudioContext

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: AudioContextConstructor
  }

type Frequency = number | { start: number; end: number }

type SoundLayer = {
  source: {
    type: OscillatorType
    frequency: Frequency
    fm?: {
      ratio: number
      depth: number
    }
  }
  envelope: {
    attack?: number
    decay: number
    sustain?: number
    release?: number
  }
  filter?: {
    type: BiquadFilterType
    frequency: number
    resonance?: number
  }
  gain: number
  delay?: number
}

type SoundDefinition = SoundLayer | { layers: SoundLayer[] }

let audioContext: AudioContext | null = null

const minimalistClick: SoundDefinition = {
  source: {
    type: "sine",
    frequency: { start: 960, end: 1240 },
    fm: { ratio: 0.5, depth: 24 },
  },
  envelope: { attack: 0, decay: 0.028, sustain: 0, release: 0.008 },
  filter: { type: "lowpass", frequency: 4200, resonance: 0.7 },
  gain: 0.07,
}

const themeToggleToLight: SoundDefinition = {
  layers: [
    {
      source: { type: "sine", frequency: 1046 },
      envelope: { attack: 0, decay: 0.045, sustain: 0, release: 0.012 },
      gain: 0.055,
    },
    {
      source: { type: "sine", frequency: 1568 },
      envelope: { attack: 0, decay: 0.045, sustain: 0, release: 0.012 },
      filter: { type: "lowpass", frequency: 5200, resonance: 0.6 },
      gain: 0.048,
      delay: 0.025,
    },
  ],
}

const themeToggleToDark: SoundDefinition = {
  layers: [
    {
      source: { type: "sine", frequency: 1568 },
      envelope: { attack: 0, decay: 0.045, sustain: 0, release: 0.012 },
      filter: { type: "lowpass", frequency: 4200, resonance: 0.6 },
      gain: 0.05,
    },
    {
      source: { type: "sine", frequency: 1046 },
      envelope: { attack: 0, decay: 0.045, sustain: 0, release: 0.012 },
      gain: 0.052,
      delay: 0.025,
    },
  ],
}

const minimalHover: SoundDefinition = {
  source: {
    type: "sine",
    frequency: 1320,
  },
  envelope: { attack: 0, decay: 0.018, sustain: 0, release: 0.006 },
  filter: { type: "lowpass", frequency: 3600, resonance: 0.4 },
  gain: 0.028,
}

const caseStudyNavHover: SoundDefinition = {
  source: {
    type: "sine",
    frequency: { start: 920, end: 1220 },
    fm: { ratio: 0.5, depth: 16 },
  },
  envelope: { attack: 0, decay: 0.024, sustain: 0, release: 0.008 },
  filter: { type: "lowpass", frequency: 2800, resonance: 0.55 },
  gain: 0.032,
}

const royalWelcome: SoundDefinition = {
  layers: [
    {
      source: { type: "triangle", frequency: 523.25 },
      envelope: { attack: 0.006, decay: 0.18, sustain: 0, release: 0.08 },
      filter: { type: "lowpass", frequency: 3600, resonance: 0.75 },
      gain: 0.055,
    },
    {
      source: { type: "sine", frequency: 659.25, fm: { ratio: 1.5, depth: 18 } },
      envelope: { attack: 0.004, decay: 0.2, sustain: 0, release: 0.09 },
      filter: { type: "lowpass", frequency: 4600, resonance: 0.7 },
      gain: 0.052,
      delay: 0.06,
    },
    {
      source: { type: "sine", frequency: 783.99, fm: { ratio: 1.5, depth: 20 } },
      envelope: { attack: 0.004, decay: 0.22, sustain: 0, release: 0.1 },
      filter: { type: "lowpass", frequency: 5200, resonance: 0.7 },
      gain: 0.05,
      delay: 0.12,
    },
    {
      source: { type: "sine", frequency: { start: 1046.5, end: 1174.66 } },
      envelope: { attack: 0.006, decay: 0.24, sustain: 0, release: 0.12 },
      filter: { type: "lowpass", frequency: 5600, resonance: 0.65 },
      gain: 0.044,
      delay: 0.18,
    },
  ],
}

async function getAudioContext() {
  if (typeof window === "undefined") return null

  const AudioContextClass =
    window.AudioContext ??
    (window as AudioContextWindow).webkitAudioContext

  if (!AudioContextClass) return null

  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioContextClass()
  }

  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume()
    } catch {
      return null
    }
  }

  return audioContext
}

function getFrequencyStart(frequency: Frequency) {
  return typeof frequency === "number" ? frequency : frequency.start
}

function applyFrequencySweep(
  param: AudioParam,
  frequency: Frequency,
  start: number,
  end: number
) {
  if (typeof frequency === "number") {
    param.setValueAtTime(frequency, start)
    return
  }

  param.setValueAtTime(frequency.start, start)
  param.exponentialRampToValueAtTime(frequency.end, end)
}

function scheduleLayer(context: AudioContext, layer: SoundLayer) {
  const start = context.currentTime + 0.006 + (layer.delay ?? 0)
  const attack = layer.envelope.attack ?? 0
  const decay = layer.envelope.decay
  const sustain = layer.envelope.sustain ?? 0
  const release = layer.envelope.release ?? 0.006
  const peakAt = start + Math.max(attack, 0.001)
  const decayEnd = peakAt + decay
  const stopAt = decayEnd + release + 0.024

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const filter = layer.filter ? context.createBiquadFilter() : null

  oscillator.type = layer.source.type
  applyFrequencySweep(oscillator.frequency, layer.source.frequency, start, stopAt)

  gain.gain.cancelScheduledValues(start)
  gain.gain.setValueAtTime(0.0001, start)

  if (attack > 0) {
    gain.gain.linearRampToValueAtTime(layer.gain, peakAt)
  } else {
    gain.gain.setValueAtTime(layer.gain, start)
  }

  gain.gain.exponentialRampToValueAtTime(
    Math.max(layer.gain * sustain, 0.0001),
    decayEnd
  )
  gain.gain.exponentialRampToValueAtTime(0.0001, stopAt)

  if (filter && layer.filter) {
    filter.type = layer.filter.type
    filter.frequency.setValueAtTime(layer.filter.frequency, start)
    filter.Q.setValueAtTime(layer.filter.resonance ?? 0.7, start)
    oscillator.connect(filter)
    filter.connect(gain)
  } else {
    oscillator.connect(gain)
  }

  gain.connect(context.destination)

  if (layer.source.fm) {
    const modulator = context.createOscillator()
    const modulatorGain = context.createGain()

    modulator.type = "sine"
    modulator.frequency.setValueAtTime(
      getFrequencyStart(layer.source.frequency) * layer.source.fm.ratio,
      start
    )
    modulatorGain.gain.setValueAtTime(layer.source.fm.depth, start)
    modulator.connect(modulatorGain)
    modulatorGain.connect(oscillator.frequency)
    modulator.start(start)
    modulator.stop(stopAt)
  }

  oscillator.start(start)
  oscillator.stop(stopAt)
}

async function playSound(sound: SoundDefinition) {
  const context = await getAudioContext()

  if (!context) return

  const layers = "layers" in sound ? sound.layers : [sound]
  layers.forEach((layer) => scheduleLayer(context, layer))
}

export function playHeaderClickSound() {
  return playSound(minimalistClick)
}

export function playThemeToggleSound(nextTheme: "light" | "dark") {
  return playSound(nextTheme === "light" ? themeToggleToLight : themeToggleToDark)
}

export function playRoyalWelcomeSound() {
  return playSound(royalWelcome)
}

let lastCaseStudyNavHoverAt = 0

export function playToolHoverSound() {
  return playSound(minimalHover)
}

export function playCaseStudyNavHoverSound() {
  const now = typeof window === "undefined" ? 0 : window.performance.now()

  if (now - lastCaseStudyNavHoverAt < 45) {
    return
  }

  lastCaseStudyNavHoverAt = now
  return playSound(caseStudyNavHover)
}
