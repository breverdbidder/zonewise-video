/**
 * Scene 7 — CTA (4800–5399 frames = 20s)
 * "I fought in the trenches for 20 years so you don't have to."
 * "Revolution evolved."
 * "ZoneWise.AI — For everyone. Everywhere."
 * Two CTA buttons. Logo. Fade to white.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Line 1 — personal story callback
  const line1Spring = spring({frame: Math.max(0, frame - 20), fps, config: {stiffness: 80, damping: 20}});
  const line1Op = interpolate(line1Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);

  // "Revolution evolved." — stamp-style
  const revSpring = spring({frame: Math.max(0, frame - 90), fps, config: {stiffness: 200, damping: 18, mass: 0.6}});
  const revScale = interpolate(revSpring, [0, 1], [0.6, 1]);
  const revOp = interpolate(revSpring, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

  // Tagline
  const tagOp = interpolate(frame, [150, 190], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagY = interpolate(frame, [150, 190], [20, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Stats badges
  const stats1Op = interpolate(frame, [200, 240], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const stats2Op = interpolate(frame, [240, 280], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const stats3Op = interpolate(frame, [280, 320], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Buttons spring in
  const btn1Spring = spring({frame: Math.max(0, frame - 330), fps, config: {stiffness: 120, damping: 18}});
  const btn2Spring = spring({frame: Math.max(0, frame - 370), fps, config: {stiffness: 120, damping: 18}});
  const btn1Op = interpolate(btn1Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const btn2Op = interpolate(btn2Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const btn1Y = interpolate(btn1Spring, [0, 1], [24, 0]);
  const btn2Y = interpolate(btn2Spring, [0, 1], [24, 0]);

  // Fade to white at end (frame 540–600)
  const fadeOut = interpolate(frame, [510, 590], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px',
        textAlign: 'center',
      }}
    >
      {/* Founder quote */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 400,
          color: '#64748B',
          lineHeight: 1.5,
          maxWidth: 900,
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          marginBottom: 40,
          fontStyle: 'italic',
        }}
      >
        "I fought in the trenches for 20 years so you don't have to."
        <div style={{marginTop: 8, fontSize: 16, fontStyle: 'normal', fontWeight: 600, color: '#94A3B8'}}>
          — Ariel Ben David, Founder
        </div>
      </div>

      {/* "Revolution evolved." */}
      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: NAVY,
          letterSpacing: '-2px',
          lineHeight: 1,
          transform: `scale(${revScale})`,
          opacity: revOp,
          marginBottom: 20,
        }}
      >
        Revolution <span style={{color: ORANGE}}>evolved.</span>
      </div>

      {/* Brand tagline */}
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: NAVY,
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
          marginBottom: 40,
          letterSpacing: '-0.5px',
        }}
      >
        ZoneWise.AI — For everyone.{' '}
        <span style={{color: ORANGE}}>Everywhere.</span>
      </div>

      {/* Stat badges */}
      <div style={{display: 'flex', gap: 20, marginBottom: 48}}>
        {[
          {text: '67 Counties Live', op: stats1Op},
          {text: 'All 50 States Planned', op: stats2Op},
          {text: 'Patent Pending — 12 Claims', op: stats3Op},
        ].map(({text, op}) => (
          <div
            key={text}
            style={{
              background: `${NAVY}0F`,
              border: `1.5px solid ${NAVY}20`,
              borderRadius: 24,
              padding: '8px 20px',
              fontSize: 15,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: 0.5,
              opacity: op,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{display: 'flex', gap: 24}}>
        <div
          style={{
            background: '#F8FAFC',
            border: `2px solid ${NAVY}`,
            borderRadius: 16,
            padding: '20px 48px',
            fontSize: 22,
            fontWeight: 700,
            color: NAVY,
            opacity: btn1Op,
            transform: `translateY(${btn1Y}px)`,
            cursor: 'pointer',
          }}
        >
          Explore Free
        </div>
        <div
          style={{
            background: ORANGE,
            borderRadius: 16,
            padding: '20px 48px',
            fontSize: 22,
            fontWeight: 700,
            color: '#FFFFFF',
            opacity: btn2Op,
            transform: `translateY(${btn2Y}px)`,
            cursor: 'pointer',
            boxShadow: `0 8px 32px ${ORANGE}50`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>Start Pro</span>
          <span style={{fontSize: 14, fontWeight: 400, opacity: 0.85}}>$99/mo · Cancel anytime</span>
        </div>
      </div>

      {/* Logo mark */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: interpolate(frame, [440, 480], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: NAVY,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{color: ORANGE, fontWeight: 900, fontSize: 20}}>Z</span>
        </div>
        <span style={{fontSize: 20, fontWeight: 800, color: NAVY, letterSpacing: 1}}>ZoneWise.AI</span>
      </div>

      {/* Fade to white overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFFFF',
          opacity: fadeOut,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
