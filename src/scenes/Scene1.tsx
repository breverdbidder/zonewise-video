/**
 * Scene 1 — FOUNDER'S STORY (0–899 frames = 30s)
 * White bg. Ariel's voice. Navy text fades in.
 * Orange scramble decode on "I cracked the code".
 */
import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const CHARS = '!@#$%&?0123456789ABCDEFGHIJKLMNOP';

function scramble(target: string, progress: number, frame: number): string {
  const settled = Math.floor(target.length * progress);
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ' || target[i] === '.' || target[i] === "'") {
      out += target[i];
    } else if (i < settled) {
      out += target[i];
    } else {
      const idx = Math.floor(random(`s1-${frame}-${i}`) * CHARS.length);
      out += CHARS[idx];
    }
  }
  return out;
}

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Line 1: "20 years in the trenches." fades in at frame 30
  const line1Opacity = interpolate(frame, [30, 60], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const line1Y = interpolate(frame, [30, 60], [30, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Line 2: orange scramble decode, starts at frame 120, decodes over 90 frames
  const line2Opacity = interpolate(frame, [120, 140], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const scramblingProgress = interpolate(frame, [140, 230], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const line2Text = frame < 140
    ? '???? ??????? ??? ???? ?? ????????? ??????.'
    : scramble('I cracked the code of distressed assets.', scramblingProgress, frame);

  // Line 3: fades in at frame 300
  const line3Opacity = interpolate(frame, [300, 360], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const line3Y = interpolate(frame, [300, 360], [30, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Accent bar under line 2
  const barScale = interpolate(frame, [230, 280], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Subtle background grid fades in
  const gridOpacity = interpolate(frame, [0, 60], [0, 0.04], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Ariel signature (founder identity) slides in at frame 500
  const sigOpacity = interpolate(frame, [500, 560], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const sigY = interpolate(frame, [500, 560], [20, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Background dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #1E3A5F 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: gridOpacity,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          maxWidth: 1200,
          textAlign: 'center',
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: NAVY,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          20 years in the trenches.
        </div>

        {/* Line 2 — scramble decode */}
        <div
          style={{
            opacity: line2Opacity,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: ORANGE,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.5px',
              lineHeight: 1.15,
            }}
          >
            {line2Text}
          </div>
          {/* Underline bar */}
          <div
            style={{
              height: 4,
              background: ORANGE,
              borderRadius: 2,
              transformOrigin: 'left center',
              transform: `scaleX(${barScale})`,
              marginTop: 8,
            }}
          />
        </div>

        {/* Line 3 */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 400,
            color: '#334155',
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            lineHeight: 1.4,
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          Now you don't have to fight the same battles I did.
        </div>
      </div>

      {/* Ariel's signature */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: sigOpacity,
          transform: `translateY(${sigY}px)`,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: NAVY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 800,
            color: '#FFFFFF',
          }}
        >
          A
        </div>
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: NAVY}}>Ariel Ben David</div>
          <div style={{fontSize: 15, fontWeight: 400, color: '#64748B'}}>Founder, ZoneWise.AI · 20 years in distressed real estate</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
