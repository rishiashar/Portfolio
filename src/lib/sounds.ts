import type { SoundDefinition } from "@web-kits/audio"

// Soft airy whoosh + mechanical click tail — fires on WorkCard hover.
//
// Layer 1: white noise through an ascending bandpass sweep (the "whoosh")
// Layer 2: sine+FM descending sweep delayed 98 ms (the "click" lands as
//          the whoosh peaks). Total duration ≈ 136 ms.
const cardHoverDef: SoundDefinition = {
  layers: [
    {
      source: { type: "noise", color: "white" },
      filter: {
        type: "bandpass",
        frequency: 700,
        resonance: 1.2,
        envelope: { attack: 0.015, peak: 3000, decay: 0.095 },
      },
      envelope: { attack: 0.008, decay: 0.115, sustain: 0, release: 0.012 },
      gain: 0.10,
    },
    {
      source: {
        type: "sine",
        frequency: { start: 1900, end: 820 },
        fm: { ratio: 0.5, depth: 75 },
      },
      envelope: { attack: 0, decay: 0.022, sustain: 0, release: 0.006 },
      gain: 0.13,
      delay: 0.098,
    },
  ],
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
