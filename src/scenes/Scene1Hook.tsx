/**
 * Scene 1: HOOK (0:00-0:15 = frames 0-450)
 * - Dark background #020617
 * - 3D house fades in (Three.js procedural: BoxGeometry walls + ConeGeometry roof)
 * - "FOR AUCTION" sign animates in Orange #F59E0B
 * - Text overlay: "ZoneWise.AI" Inter Bold, Navy on white card
 * - Subtitle: "Patent Pending — 12 Claims" fades in
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
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── 3D House ───────────────────────────────────────────────────────────────
const House3D: React.FC<{ progress: number }> = ({ progress }) => {
  const wallColor = "#1E3A5F";
  const roofColor = "#0f1f33";
  const doorColor = "#0d1520";
  const windowColor = "#F59E0B";

  const scale = interpolate(progress, [0, 1], [0.1, 1]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <group scale={[scale, scale, scale]} position={[0, -0.5, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[3, 2, 2.5]} />
        <meshStandardMaterial color={wallColor} opacity={opacity} transparent />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.3, 1.2, 4]} />
        <meshStandardMaterial color={roofColor} opacity={opacity} transparent />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.2, 1.26]}>
        <boxGeometry args={[0.5, 1, 0.05]} />
        <meshStandardMaterial color={doorColor} opacity={opacity} transparent />
      </mesh>

      {/* Left window */}
      <mesh position={[-0.9, 0.7, 1.26]}>
        <boxGeometry args={[0.5, 0.4, 0.05]} />
        <meshStandardMaterial
          color={windowColor}
          emissive={windowColor}
          emissiveIntensity={0.5}
          opacity={opacity}
          transparent
        />
      </mesh>

      {/* Right window */}
      <mesh position={[0.9, 0.7, 1.26]}>
        <boxGeometry args={[0.5, 0.4, 0.05]} />
        <meshStandardMaterial
          color={windowColor}
          emissive={windowColor}
          emissiveIntensity={0.5}
          opacity={opacity}
          transparent
        />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.8, 2.1, 0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color={roofColor} opacity={opacity} transparent />
      </mesh>
    </group>
  );
};

// ─── FOR AUCTION Sign ───────────────────────────────────────────────────────
const ForAuctionSign: React.FC<{ opacity: number; scale: number }> = ({
  opacity,
  scale,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        backgroundColor: "#F59E0B",
        padding: "12px 40px",
        borderRadius: 4,
        fontFamily: "Inter, sans-serif",
        fontWeight: 900,
        fontSize: 36,
        color: "#020617",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        boxShadow: "0 4px 30px rgba(245,158,11,0.6)",
        zIndex: 20,
      }}
    >
      FOR AUCTION
    </div>
  );
};

// ─── Main Scene ─────────────────────────────────────────────────────────────
export const ZoneWiseHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // House emerges: frames 0-120
  const houseProgress = spring({
    frame,
    fps,
    config: { damping: 15, mass: 1, stiffness: 80 },
    durationInFrames: 120,
  });

  // FOR AUCTION sign: frames 90-180
  const signOpacity = interpolate(frame, [90, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const signScale = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  // Title card: frames 150-260
  const titleOpacity = interpolate(frame, [150, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [150, 220], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle: frames 240-340
  const subtitleOpacity = interpolate(frame, [240, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow camera rotation: constant
  const cameraAngle = (frame / 450) * Math.PI * 0.25;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* 3D Canvas */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Canvas
          camera={{ position: [4, 2, 6], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            color="#ffffff"
          />
          <pointLight position={[-3, 2, -3]} intensity={0.6} color="#1E3A5F" />
          <pointLight position={[3, 1, 3]} intensity={0.8} color="#F59E0B" />

          <Suspense fallback={null}>
            <group rotation={[0, cameraAngle, 0]}>
              <House3D progress={houseProgress} />
            </group>
          </Suspense>

          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0a0f1a" />
          </mesh>
        </Canvas>
      </div>

      {/* FOR AUCTION sign overlay */}
      <ForAuctionSign opacity={signOpacity} scale={signScale} />

      {/* Title card */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: `translateX(-50%) translateY(${titleY}px)`,
          opacity: titleOpacity,
          backgroundColor: "white",
          padding: "24px 64px",
          borderRadius: 8,
          textAlign: "center",
          boxShadow: "0 8px 60px rgba(30,58,95,0.4)",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 64,
            color: "#1E3A5F",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          ZoneWise.AI
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: subtitleOpacity,
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 28,
          color: "#F59E0B",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          zIndex: 30,
        }}
      >
        Patent Pending — 12 Claims
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
