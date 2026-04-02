/**
 * Scene 4 — 12-STEP PIPELINE (2100–3299 frames = 40s)
 * Background: data-command-center.jpg — zoom-in-pan-left
 * Navy cards spring in over dark cinematic backdrop. Patent stamp.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

const STEPS = [
  {num: '01', title: 'Discovery', desc: 'County auction calendar ingestion'},
  {num: '02', title: 'Data', desc: 'Tax records + deed history pull'},
  {num: '03', title: 'Title', desc: 'Chain-of-title automated search'},
  {num: '04', title: 'Lien', desc: 'Federal + state lien detection'},
  {num: '05', title: 'Tax', desc: 'Delinquency status + redemption window'},
  {num: '06', title: 'Demographics', desc: 'Neighborhood trend scoring'},
  {num: '07', title: 'ML', desc: 'Comparable sale + ARV prediction'},
  {num: '08', title: 'Max Bid', desc: 'Risk-adjusted bid ceiling calc'},
  {num: '09', title: 'Decision', desc: 'Go / No-go + confidence score'},
  {num: '10', title: 'Reports', desc: 'One-click investor package PDF'},
  {num: '11', title: 'Price Monitor', desc: 'Post-purchase value tracking'},
  {num: '12', title: 'Compounding', desc: 'Portfolio intelligence grows over time'},
];

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const cardEntries = STEPS.map((_, i) => {
    const startFrame = 40 + i * 40;
    return spring({frame: Math.max(0, frame - startFrame), fps, config: {stiffness: 120, damping: 20, mass: 0.8}});
  });

  const stampFrame = 520;
  const stampSpring = spring({frame: Math.max(0, frame - stampFrame), fps, config: {stiffness: 200, damping: 15, mass: 0.5}});
  const stampScale = interpolate(stampSpring, [0, 1], [0, 1]);
  const stampRotate = interpolate(stampSpring, [0, 1], [-15, -8]);

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '40px 72px',
      }}
    >
      <SceneBackground
        imageName="data-command-center"
        durationInFrames={1200}
        kenBurns="zoom-in-pan-left"
        overlayOpacity={0.65}
      />

      {/* Title */}
      <FrostedCard
        style={{
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 32,
          padding: '20px 56px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 12, fontWeight: 700, letterSpacing: 4, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8}}>
          The Pipeline
        </div>
        <div style={{fontSize: 48, fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', ...headlineShadow}}>
          12 Steps. Zero Guesswork.
        </div>
      </FrostedCard>

      {/* Grid: 4 cols × 3 rows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 1480,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {STEPS.map((step, i) => {
          const sp = cardEntries[i];
          const translateY = interpolate(sp, [0, 1], [40, 0]);
          const opacity = interpolate(sp, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

          return (
            <div
              key={i}
              style={{
                background: NAVY,
                borderRadius: 14,
                padding: '20px 20px',
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{position: 'absolute', top: 0, right: 0, width: 44, height: 44, background: `${ORANGE}15`, borderBottomLeftRadius: 22}} />
              <div style={{fontSize: 28, fontWeight: 800, color: ORANGE, lineHeight: 1, fontVariantNumeric: 'tabular-nums'}}>
                {step.num}
              </div>
              <div style={{fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginTop: 2}}>{step.title}</div>
              <div style={{fontSize: 12, color: '#94A3B8', lineHeight: 1.4}}>{step.desc}</div>
            </div>
          );
        })}

        {/* PATENT PENDING stamp */}
        <div
          style={{
            position: 'absolute',
            right: -16,
            bottom: -8,
            transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
            transformOrigin: 'center center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              border: `4px solid ${ORANGE}`,
              borderRadius: 8,
              padding: '12px 22px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: `0 0 0 2px ${ORANGE}40, 0 8px 24px rgba(0,0,0,0.3)`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{fontSize: 20, fontWeight: 900, color: ORANGE, letterSpacing: 3, textTransform: 'uppercase'}}>PATENT PENDING</div>
            <div style={{fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: 2, marginTop: 4}}>12 CLAIMS</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
