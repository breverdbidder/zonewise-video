import React from "react";
import { Composition } from "remotion";
import { ZoneWiseDemo } from "./ZoneWiseDemo";
import { ZoneWiseHook } from "./scenes/Scene1Hook";

// 180s × 30fps = 5400 frames total
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ZoneWiseDemo"
        component={ZoneWiseDemo}
        durationInFrames={5400}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ZoneWiseHook"
        component={ZoneWiseHook}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
