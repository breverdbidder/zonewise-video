/**
 * SceneBackground — photorealistic backdrop with cinematic post-processing:
 *  • Ken Burns slow zoom (spring-eased scale transform)
 *  • Film grain (SVG feTurbulence noise, 7% opacity)
 *  • Dark overlay (navy-tinted, configurable opacity)
 *  • Vignette (radial-gradient, edges darkened)
 *  • CSS filter: contrast(1.05) saturate(1.1)
 */
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type KenBurnsMode = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'zoom-in-pan-left' | 'zoom-out-pan-right';

interface SceneBackgroundProps {
  /** Filename without extension, relative to public/images/ */
  imageName: string;
  /** Scene length in frames (used to drive Ken Burns easing) */
  durationInFrames: number;
  /** Ken Burns movement direction */
  kenBurns?: KenBurnsMode;
  /** Darkness of navy overlay (0–1). Default 0.52 */
  overlayOpacity?: number;
  /** Vignette strength (0–1). Default 0.6 */
  vignetteOpacity?: number;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  imageName,
  durationInFrames,
  kenBurns = 'zoom-in',
  overlayOpacity = 0.52,
  vignetteOpacity = 0.6,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Smooth progress over full scene (spring eased for organic feel)
  const sp = spring({
    frame,
    fps,
    config: {stiffness: 6, damping: 200},
    durationInFrames,
  });
  const p = Math.min(sp, 1);

  // Ken Burns transform
  let scale = 1;
  let tx = 0; // percent
  let ty = 0;

  switch (kenBurns) {
    case 'zoom-in':
      scale = interpolate(p, [0, 1], [1.0, 1.09]);
      break;
    case 'zoom-out':
      scale = interpolate(p, [0, 1], [1.09, 1.0]);
      break;
    case 'pan-left':
      scale = 1.07;
      tx = interpolate(p, [0, 1], [0, -3]);
      break;
    case 'pan-right':
      scale = 1.07;
      tx = interpolate(p, [0, 1], [0, 3]);
      break;
    case 'zoom-in-pan-left':
      scale = interpolate(p, [0, 1], [1.0, 1.08]);
      tx = interpolate(p, [0, 1], [0, -2]);
      break;
    case 'zoom-out-pan-right':
      scale = interpolate(p, [0, 1], [1.08, 1.0]);
      tx = interpolate(p, [0, 1], [2, 0]);
      break;
  }

  // Quick image fade-in over first 20 frames
  const imgOpacity = Math.min(frame / 20, 1);

  // Unique filter ID to avoid conflicts between scenes
  const filterId = `grain-${imageName.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      {/* ── Photo layer ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: imgOpacity,
        }}
      >
        <Img
          src={staticFile(`images/${imageName}.jpg`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale}) translate(${tx}%, ${ty}%)`,
            transformOrigin: 'center center',
            filter: 'contrast(1.05) saturate(1.1)',
          }}
        />
      </div>

      {/* ── Navy-tinted dark overlay ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(8, 18, 38, ${overlayOpacity})`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Vignette ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Film grain (SVG noise) ───────────────────────────────────── */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.07,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.88"
              numOctaves="4"
              seed={Math.floor((frame / 2) % 256)}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </>
  );
};
