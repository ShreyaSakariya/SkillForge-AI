'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedCountUpProps {
  end: number;
  duration?: number; // duration in seconds
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCountUp: React.FC<AnimatedCountUpProps> = ({
  end,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const endValue = Math.max(0, end);
    const durationMs = duration * 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);

      // Ease out cubic function for natural slowdown
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * endValue);

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};
