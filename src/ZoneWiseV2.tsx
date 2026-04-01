import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';

// Total: 5400 frames @ 30fps = 180s
// Scene 1:   0 – 899   (900 frames = 30s)  Founder's Story
// Scene 2: 900 – 1649  (750 frames = 25s)  Two Codes Locked
// Scene 3:1650 – 2099  (450 frames = 15s)  Both Codes Cracked
// Scene 4:2100 – 3299 (1200 frames = 40s)  12-Step Pipeline
// Scene 5:3300 – 4199  (900 frames = 30s)  For Everyone
// Scene 6:4200 – 4799  (600 frames = 20s)  The Moat
// Scene 7:4800 – 5399  (600 frames = 20s)  CTA

export const ZoneWiseV2: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#FFFFFF'}}>
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
    </AbsoluteFill>
  );
};
