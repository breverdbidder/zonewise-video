import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { ZoneWiseHook } from "./scenes/Scene1Hook";
import { TheProblem } from "./scenes/Scene2Problem";
import { PipelineScene } from "./scenes/Scene3Pipeline";
import { ProductDemo } from "./scenes/Scene4Demo";
import { TheMoat } from "./scenes/Scene5Moat";
import { CTAScene } from "./scenes/Scene6CTA";

// Total: 5400 frames @ 30fps = 180 seconds
// Scene 1: 450  (0-14s)
// Scene 2: 900  (15-44s)
// Scene 3: 1350 (45-89s)
// Scene 4: 1200 (90-129s) — wait, spec says 2700-3900 = 1200 frames
// Scene 5: 1050 (130-164s)
// Scene 6: 450  (165-179s)
// Total: 450+900+1350+1200+1050+450 = 5400 ✓

export const ZoneWiseDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        <Series.Sequence durationInFrames={450}>
          <ZoneWiseHook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={900}>
          <TheProblem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={1350}>
          <PipelineScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={1200}>
          <ProductDemo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={1050}>
          <TheMoat />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
