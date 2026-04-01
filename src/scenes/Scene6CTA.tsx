/**
 * Scene 6: CTA (2:45-3:00 = 450 frames local)
 * - 3D house returns, "FOR AUCTION" sign morphs to "INTELLIGENCE DELIVERED"
 * - ParticleButton burst effect
 * - Large text: "Start Free — zonewise.ai"
 * - "67 Counties. Real-Time Data. AI-Powered."
 * - Navy background, Orange CTA box
 * - Fade to black with logo
 */
import React, { Suspense } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Canvas } from "@react-three/fiber";

// ─── Particles ────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

function generateParticles(seed: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    const speed = 2 + ((seed * i * 7) % 100) / 30;
    particles.push({
      x: 960,
      y: 540,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 3 + (i % 4),
      color: i % 3 === 0 ? "#F59E0B" : i % 3 === 1 ? "#ffffff" : "#1E3A5F",
      opacity: 1,
    });
  }
  return particles;
}

const PARTICLES = generateParticles(42);

const ParticleBurst: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1920 1080"
    >
      {PARTICLES.map((p, i) => {
        const t = elapsed / 60;
        const x = p.x + p.vx * t * 60;
        const y = p.y + p.vy * t * 60 + 0.5 * 0.3 * t * t * 60 * 60;
        const opacity = Math.max(0, 1 - t * 1.2);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={p.size}
            fill={p.color}
            opacity={opacity * p.opacity}
          />
        );
      })}
    </svg>
  );
};

// ─── Mini 3D House (same as Scene 1 but smaller) ─────────────────────────────
const MiniHouse: React.FC<{ rotation: number }> = ({ rotation }) => (
  <group rotation={[0, rotation, 0]} position={[0, -0.3, 0]} scale={[0.8, 0.8, 0.8]}>
    {/* Body */}
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[3, 2, 2.5]} />
      <meshStandardMaterial color="#1E3A5F" />
    </mesh>
    {/* Roof */}
    <mesh position={[0, 1.8, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[2.3, 1.2, 4]} />
      <meshStandardMaterial color="#0f1f33" />
    </mesh>
    {/* Door */}
    <mesh position={[0, 0.2, 1.26]}>
      <boxGeometry args={[0.5, 1, 0.05]} />
      <meshStandardMaterial color="#0d1520" />
    </mesh>
    {/* Windows */}
    <mesh position={[-0.9, 0.7, 1.26]}>
      <boxGeometry args={[0.5, 0.4, 0.05]} />
      <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} />
    </mesh>
    <mesh position={[0.9, 0.7, 1.26]}>
      <boxGeometry args={[0.5, 0.4, 0.05]} />
      <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} />
    </mesh>
  </group>
);

// ─── Main Scene ──────────────────────────────────────────────────────────────
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // House slides up (0-60)
  const houseProgress = spring({
    frame,
    fps,
    config: { damping: 15, mass: 1, stiffness: 80 },
    durationInFrames: 60,
  });
  const houseOpacity = interpolate(houseProgress, [0, 1], [0, 1]);

  // "INTELLIGENCE DELIVERED" (60-150)
  const signOpacity = interpolate(frame, [60, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const signScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 120 },
  });

  // Particle burst at frame 120
  // CTA text (140-220)
  const ctaOpacity = interpolate(frame, [140, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, mass: 1, stiffness: 90 },
  });

  // Tagline (220-310)
  const taglineOpacity = interpolate(frame, [220, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade to black (380-450)
  const fadeToBlack = interpolate(frame, [380, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera orbit
  const rotation = (frame / 450) * Math.PI * 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* 3D canvas — upper half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "55%",
          opacity: houseOpacity,
        }}
      >
        <Canvas camera={{ position: [3, 1.5, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-2, 2, 2]} intensity={1} color="#F59E0B" />
          <Suspense fallback={null}>
            <MiniHouse rotation={rotation} />
          </Suspense>
        </Canvas>
      </div>

      {/* Particle burst */}
      <ParticleBurst frame={frame} startFrame={120} />

      {/* "INTELLIGENCE DELIVERED" sign */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${signScale})`,
          opacity: signOpacity,
          backgroundColor: "#1E3A5F",
          border: "2px solid #F59E0B",
          padding: "10px 40px",
          borderRadius: 6,
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 28,
          color: "#F59E0B",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          boxShadow: "0 4px 30px rgba(245,158,11,0.4)",
          whiteSpace: "nowrap",
          zIndex: 20,
        }}
      >
        Intelligence Delivered
      </div>

      {/* CTA block */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "50%",
          transform: `translateX(-50%) scale(${ctaScale})`,
          opacity: ctaOpacity,
          textAlign: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#F59E0B",
            padding: "20px 60px",
            borderRadius: 8,
            marginBottom: 16,
            boxShadow: "0 8px 40px rgba(245,158,11,0.5)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: 40,
              color: "#020617",
              letterSpacing: "-0.01em",
            }}
          >
            Start Free — zonewise.ai
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 22,
            color: "#94a3b8",
            opacity: taglineOpacity,
            letterSpacing: "0.02em",
          }}
        >
          67 Counties. Real-Time Data.{" "}
          <span style={{ color: "#F59E0B" }}>AI-Powered.</span>
        </div>
      </div>

      {/* Logo mark in corner */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          opacity: taglineOpacity * 0.5,
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 18,
          color: "#1E3A5F",
          letterSpacing: "0.1em",
        }}
      >
        ZoneWise.AI
      </div>

      {/* Fade to black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: fadeToBlack,
          zIndex: 50,
        }}
      />

      {/* Logo on black */}
      {frame > 400 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            opacity: interpolate(frame, [400, 440], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: 80,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Zone<span style={{ color: "#F59E0B" }}>Wise</span>
            <span style={{ color: "#1E3A5F" }}>.AI</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
