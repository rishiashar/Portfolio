import type { SoundDefinition } from "@web-kits/audio"

// Warm, low-gain hover cue for WorkCard previews.
const cardHoverDef: SoundDefinition = {
  source: {
    type: "triangle",
    frequency: { start: 620, end: 760 },
  },
  envelope: { attack: 0.004, decay: 0.038, sustain: 0, release: 0.014 },
  filter: { type: "lowpass", frequency: 1800, resonance: 0.55 },
  gain: 0.048,
}

// Singleton play function, lazily bound on first browser hover.
let _playCardHover: (() => void) | null = null

export function playCardHover(): void {
  if (typeof window === "undefined") return
  if (_playCardHover) {
    _playCardHover()
    return
  }
  // First call: dynamically import the runtime (avoids SSR bundle issues)
  // and immediately trigger so there's no perceptible delay.
  import("@web-kits/audio")
    .then(({ defineSound }) => {
      _playCardHover = () => defineSound(cardHoverDef)()
      _playCardHover()
    })
    .catch(() => {
      // Audio not available — fail silently.
    })
}
