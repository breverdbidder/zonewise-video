import React from 'react';
import {Composition} from 'remotion';
import {ZoneWiseV2} from './ZoneWiseV2';

export const Root: React.FC = () => {
  return (
    <Composition
      id="ZoneWiseV2"
      component={ZoneWiseV2}
      durationInFrames={5400}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
