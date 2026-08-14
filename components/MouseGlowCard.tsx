'use client';

import React, { useRef } from 'react';

interface MouseGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const MouseGlowCard: React.FC<MouseGlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(124, 58, 237, 0.12)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-violet-300 ${className}`}
      {...props}
    >
      {/* Radial Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
