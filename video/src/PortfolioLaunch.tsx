import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { GLIMPSE_TOTAL, GlimpseMontage } from "./scenes/GlimpseMontage";
import { HeroPunch } from "./scenes/HeroPunch";
import { TitleReveal } from "./scenes/TitleReveal";
import { CTA } from "./scenes/CTA";
import { colors } from "./theme";

export const SCENE_FRAMES = {
  glimpse: GLIMPSE_TOTAL, // 84 — six 14-frame cuts
  hero: 110, // ~3.7s
  title: 110, // ~3.7s
  cta: 70, // ~2.3s
} as const;

// Series with small overlaps for crossfades; total ≈ 12.5s @ 30fps.
const OVERLAP = 6;
export const TOTAL_FRAMES =
  SCENE_FRAMES.glimpse +
  SCENE_FRAMES.hero +
  SCENE_FRAMES.title +
  SCENE_FRAMES.cta -
  OVERLAP * 3;

export const PortfolioLaunch: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.frameBg }}>
      <Series>
        <Series.Sequence
          durationInFrames={SCENE_FRAMES.glimpse}
          name="Glimpses"
        >
          <GlimpseMontage />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={SCENE_FRAMES.hero}
          name="Hero Punch"
          offset={-OVERLAP}
        >
          <HeroPunch />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={SCENE_FRAMES.title}
          name="Title Reveal"
          offset={-OVERLAP}
        >
          <TitleReveal />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={SCENE_FRAMES.cta}
          name="CTA"
          offset={-OVERLAP}
        >
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
