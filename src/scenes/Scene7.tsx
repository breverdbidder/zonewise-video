/**
 * Scene 7 — CTA (4800–5399 frames = 20s)
 * Background: sold-home-palm-trees.jpg — zoom-in Ken Burns
 * Frosted glass cards. "Revolution evolved." Buttons. Fade to white.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const line1Spring = spring({frame: Math.max(0, frame - 20), fps, config: {stiffness: 80, damping: 20}});
  const line1Op = interpolate(line1Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);

  const revSpring = spring({frame: Math.max(0, frame - 90), fps, config: {stiffness: 200, damping: 18, mass: 0.6}});
  const revScale = interpolate(revSpring, [0, 1], [0.6, 1]);
  const revOp = interpolate(revSpring, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

  const tagOp = interpolate(frame, [150, 190], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagY = interpolate(frame, [150, 190], [20, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const stats1Op = interpolate(frame, [200, 240], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const stats2Op = interpolate(frame, [240, 280], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const stats3Op = interpolate(frame, [280, 320], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const btn1Spring = spring({frame: Math.max(0, frame - 330), fps, config: {stiffness: 120, damping: 18}});
  const btn2Spring = spring({frame: Math.max(0, frame - 370), fps, config: {stiffness: 120, damping: 18}});
  const btn1Op = interpolate(btn1Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const btn2Op = interpolate(btn2Spring, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const btn1Y = interpolate(btn1Spring, [0, 1], [24, 0]);
  const btn2Y = interpolate(btn2Spring, [0, 1], [24, 0]);

  const fadeOut = interpolate(frame, [510, 590], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px',
        textAlign: 'center',
      }}
    >
      <SceneBackground
        imageName="sold-home-palm-trees"
        durationInFrames={600}
        kenBurns="zoom-in"
        overlayOpacity={0.5}
      />

      {/* Founder quote */}
      <FrostedCard
        style={{
          maxWidth: 900,
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          marginBottom: 28,
          padding: '24px 48px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 28, fontWeight: 400, color: '#64748B', lineHeight: 1.5, fontStyle: 'italic'}}>
          "I fought in the trenches for 20 years so you don't have to."
        </div>
        <div style={{marginTop: 8, fontSize: 15, fontStyle: 'normal', fontWeight: 600, color: '#94A3B8'}}>
          — Ariel Ben David, Founder
        </div>
      </FrostedCard>

      {/* "Revolution evolved." */}
      <FrostedCard
        style={{
          transform: `scale(${revScale})`,
          opacity: revOp,
          marginBottom: 16,
          padding: '20px 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 76, fontWeight: 900, color: NAVY, letterSpacing: '-2px', lineHeight: 1, ...headlineShadow}}>
          Revolution <span style={{color: ORANGE}}>evolved.</span>
        </div>
      </FrostedCard>

      {/* Brand tagline */}
      <FrostedCard
        style={{
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
          marginBottom: 28,
          padding: '14px 48px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 34, fontWeight: 700, color: NAVY, letterSpacing: '-0.5px', ...headlineShadow}}>
          ZoneWise.AI — For everyone.{' '}
          <span style={{color: ORANGE}}>Everywhere.</span>
        </div>
      </FrostedCard>

      {/* Stat badges */}
      <div style={{display: 'flex', gap: 16, marginBottom: 36, position: 'relative', zIndex: 1}}>
        {[
          {text: '67 Counties Live', op: stats1Op},
          {text: 'All 50 States Planned', op: stats2Op},
          {text: 'Patent Pending — 12 Claims', op: stats3Op},
        ].map(({text, op}) => (
          <FrostedCard
            key={text}
            style={{
              padding: '8px 20px',
              opacity: op,
            }}
          >
            <div style={{fontSize: 14, fontWeight: 700, color: NAVY, letterSpacing: 0.5}}>{text}</div>
          </FrostedCard>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{display: 'flex', gap: 20, position: 'relative', zIndex: 1}}>
        <FrostedCard
          style={{
            border: `2px solid ${NAVY}`,
            padding: '18px 44px',
            opacity: btn1Op,
            transform: `translateY(${btn1Y}px)`,
            cursor: 'pointer',
          }}
        >
          <div style={{fontSize: 20, fontWeight: 700, color: NAVY}}>Explore Free</div>
        </FrostedCard>

        <div
          style={{
            background: ORANGE,
            borderRadius: 20,
            padding: '18px 44px',
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            opacity: btn2Op,
            transform: `translateY(${btn2Y}px)`,
            cursor: 'pointer',
            boxShadow: `0 8px 32px ${ORANGE}60`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>Start Pro</span>
          <span style={{fontSize: 13, fontWeight: 400, opacity: 0.85}}>$99/mo · Cancel anytime</span>
        </div>
      </div>

      {/* Logo mark */}
      <FrostedCard
        style={{
          position: 'absolute',
          bottom: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: interpolate(frame, [440, 480], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
          padding: '12px 20px',
          zIndex: 1,
        }}
      >
        <div style={{width: 36, height: 36, background: NAVY, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: ORANGE, fontWeight: 900, fontSize: 18}}>Z</span>
        </div>
        <span style={{fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: 1}}>ZoneWise.AI</span>
      </FrostedCard>

      {/* Fade to white overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFFFF',
          opacity: fadeOut,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
    </AbsoluteFill>
  );
};
