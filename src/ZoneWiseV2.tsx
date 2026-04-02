import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';
import {
  FadeWhiteTransition,
  CurtainSplitTransition,
  ZoomMapTransition,
  SlideLeftTransition,
} from './components/Transitions';

// Total: 5400 frames @ 30fps = 180s
// Scene 1:   0 – 899   (900 frames = 30s)  Founder's Story        bg: hero-property-golden-hour
// Scene 2: 900 – 1649  (750 frames = 25s)  Two Codes Locked       bg: messy-desk-spreadsheets
// Scene 3:1650 – 2099  (450 frames = 15s)  Both Codes Cracked     bg: us-map-florida-highlighted
// Scene 4:2100 – 3299 (1200 frames = 40s)  12-Step Pipeline       bg: data-command-center
// Scene 5:3300 – 4199  (900 frames = 30s)  For Everyone           bg: per-persona cycling
// Scene 6:4200 – 4799  (600 frames = 20s)  The Moat               bg: pyramid-data-layers
// Scene 7:4800 – 5399  (600 frames = 20s)  CTA                    bg: sold-home-palm-trees
//
// Transitions (60 frames each, centred on the cut):
//   S1→S2 @ frame 900:  fade-through-white  (870–930)
//   S2→S3 @ frame 1650: curtain-split       (1620–1680)
//   S3→S4 @ frame 2100: zoom-into-map       (2070–2130)
//   S4→S5 @ frame 3300: slide-left          (3270–3330)
//   S5→S6 @ frame 4200: slide-left          (4170–4230)
//   S6→S7 @ frame 4800: slide-left          (4770–4830)

export const ZoneWiseV2: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000000'}}>
      {/* ── Scenes ────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={900}>
        <Scene1 />
      </Sequence>
      <Sequence from={900} durationInFrames={750}>
        <Scene2 />
      </Sequence>
      <Sequence from={1650} durationInFrames={450}>
        <Scene3 />
      </Sequence>
      <Sequence from={2100} durationInFrames={1200}>
        <Scene4 />
      </Sequence>
      <Sequence from={3300} durationInFrames={900}>
        <Scene5 />
      </Sequence>
      <Sequence from={4200} durationInFrames={600}>
        <Scene6 />
      </Sequence>
      <Sequence from={4800} durationInFrames={600}>
        <Scene7 />
      </Sequence>

      {/* ── Transitions (overlap both adjacent scenes) ──────────── */}

      {/* S1 → S2: fade through white */}
      <Sequence from={870} durationInFrames={60}>
        <FadeWhiteTransition />
      </Sequence>

      {/* S2 → S3: curtain split */}
      <Sequence from={1620} durationInFrames={60}>
        <CurtainSplitTransition />
      </Sequence>

      {/* S3 → S4: zoom into map */}
      <Sequence from={2070} durationInFrames={60}>
        <ZoomMapTransition />
      </Sequence>

      {/* S4 → S5: slide left */}
      <Sequence from={3270} durationInFrames={60}>
        <SlideLeftTransition />
      </Sequence>

      {/* S5 → S6: slide left */}
      <Sequence from={4170} durationInFrames={60}>
        <SlideLeftTransition />
      </Sequence>

      {/* S6 → S7: slide left */}
      <Sequence from={4770} durationInFrames={60}>
        <SlideLeftTransition />
      </Sequence>
    </AbsoluteFill>
  );
};
