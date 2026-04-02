/**
 * FrostedCard — frosted glass panel for placing text over photo backgrounds.
 *  background: rgba(255,255,255,0.85)
 *  backdrop-filter: blur(12px)
 *  border-radius: 16px
 */
import React from 'react';

interface FrostedCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  dark?: boolean; // navy-tinted glass variant
}

export const FrostedCard: React.FC<FrostedCardProps> = ({children, style, dark = false}) => (
  <div
    style={{
      background: dark ? 'rgba(15, 30, 60, 0.82)' : 'rgba(255, 255, 255, 0.87)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 20,
      border: dark
        ? '1px solid rgba(255,255,255,0.12)'
        : '1px solid rgba(255,255,255,0.65)',
      boxShadow: dark
        ? '0 8px 40px rgba(0,0,0,0.4)'
        : '0 8px 40px rgba(0,0,0,0.18)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Headline text style with readability shadow */
export const headlineShadow: React.CSSProperties = {
  textShadow: '0 2px 8px rgba(0,0,0,0.12)',
};

/** Text shadow for text directly on photo (no frosted card) */
export const photoTextShadow: React.CSSProperties = {
  textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)',
};
