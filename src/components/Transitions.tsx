/**
 * Transitions — cinematic between-scene overlays
 *
 *  FadeWhiteTransition  — fade through white (scene 1→2)
 *  CurtainSplitTransition — two panels slide apart (scene 2→3)
 *  ZoomMapTransition    — zoom + white flash (scene 3→4)
 *  SlideLeftTransition  — horizontal navy wipe (scene 4→5, 5→6, 6→7)
 *
 * Each plays over 60 frames: first 30 = close (fade IN), last 30 = open (fade OUT).
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

/** Full white flash through mid-point */
export const FadeWhiteTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = frame < 30
    ? interpolate(frame, [0, 30], [0, 1])
    : interpolate(frame, [30, 60], [1, 0]);

  return (
    <AbsoluteFill style={{background: '#FFFFFF', opacity, zIndex: 50, pointerEvents: 'none'}} />
  );
};

/** Two navy curtain panels meet in center then split apart */
export const CurtainSplitTransition: React.FC = () => {
  const frame = useCurrentFrame();

  // Close: panels slide from sides to center (0→30)
  // Open: panels slide back out (30→60)
  const leftX = frame < 30
    ? interpolate(frame, [0, 30], [-100, 0])      // slides in from left
    : interpolate(frame, [30, 60], [0, -100]);     // slides back out

  const rightX = frame < 30
    ? interpolate(frame, [0, 30], [100, 0])
    : interpolate(frame, [30, 60], [0, 100]);

  // Orange center seam line
  const seamOp = frame < 30
    ? interpolate(frame, [20, 30], [0, 1])
    : interpolate(frame, [30, 40], [1, 0]);

  return (
    <AbsoluteFill style={{zIndex: 50, pointerEvents: 'none'}}>
      {/* Left panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: 0, width: '50%',
          background: NAVY,
          transform: `translateX(${leftX}%)`,
        }}
      />
      {/* Right panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          right: 0, width: '50%',
          background: NAVY,
          transform: `translateX(${rightX}%)`,
        }}
      />
      {/* Center seam */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%',
          width: 4,
          background: ORANGE,
          opacity: seamOp,
          transform: 'translateX(-50%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Scale up + white flash for "zooming into the map" feel */
export const ZoomMapTransition: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 60], [1, 1.15], {extrapolateRight: 'clamp'});
  const whiteOp = frame < 30
    ? interpolate(frame, [0, 30], [0, 0.9])
    : interpolate(frame, [30, 60], [0.9, 0]);

  return (
    <AbsoluteFill style={{zIndex: 50, pointerEvents: 'none'}}>
      {/* Scale ring — subtle dark vignette that grows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)`,
          transform: `scale(${scale})`,
          opacity: interpolate(frame, [0, 15, 30, 60], [0, 0.6, 0.6, 0]),
        }}
      />
      {/* White flash */}
      <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', opacity: whiteOp}} />
    </AbsoluteFill>
  );
};

/** Horizontal navy wipe — slides from right to left over the cut */
export const SlideLeftTransition: React.FC = () => {
  const frame = useCurrentFrame();

  // A navy bar slides from right to left (0→30), then exits left (30→60)
  const x = frame < 30
    ? interpolate(frame, [0, 30], [100, 0])
    : interpolate(frame, [30, 60], [0, -100]);

  return (
    <AbsoluteFill style={{zIndex: 50, pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: NAVY,
          transform: `translateX(${x}%)`,
        }}
      />
      {/* Orange leading edge */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          width: 6,
          background: ORANGE,
          left: `${x + (frame < 30 ? 0 : -0)}%`,
          // Position at leading edge of the sliding panel
          transform: frame < 30
            ? `translateX(calc(${x}vw - 6px))`
            : `translateX(calc(${x}vw))`,
          opacity: interpolate(frame, [0, 8, 52, 60], [0, 1, 1, 0]),
        }}
      />
    </AbsoluteFill>
  );
};
