'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { cn } from '@/utils/cn';

import styles from './PixelGrid.module.scss';

type PixelGridProps = {
  variant?: 'mixed' | 'orange' | 'blue' | 'dark';
  density?: 'low' | 'medium' | 'high';
  size?: number;
  className?: string;
  animated?: boolean;
  decorative?: boolean;
};

const COLORS_MIXED = ['#2e6ebb', '#f59e0b', '#231f20', '#64748b', '#e5e7eb'];
const COLORS_ORANGE = ['#f59e0b', '#fdba3a', '#f59e0b', '#231f20', '#4d4d4d'];
const COLORS_BLUE = ['#2e6ebb', '#1e4fa1', '#64748b', '#e5e7eb', '#334155'];
const COLORS_DARK = ['#f59e0b', '#2e6ebb', '#64748b', '#334155', '#1e4fa1'];

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export function PixelGrid({
  variant = 'mixed',
  density = 'medium',
  size = 14,
  className,
  animated = true,
  decorative = true,
}: PixelGridProps) {
  const palette =
    variant === 'orange'
      ? COLORS_ORANGE
      : variant === 'blue'
        ? COLORS_BLUE
        : variant === 'dark'
          ? COLORS_DARK
          : COLORS_MIXED;

  const count = density === 'high' ? 48 : density === 'low' ? 18 : 30;

  const pixels = useMemo(() => {
    const rand = seededRandom(count + size + palette.length);
    return Array.from({ length: count }, (_, i) => {
      const px = rand();
      const py = rand();
      const sizeFactor = 0.5 + rand() * 0.9;
      const colorIdx = Math.floor(rand() * palette.length);
      const opacity = 0.4 + rand() * 0.6;
      const delay = rand() * 0.8;
      return {
        id: i,
        x: px * 100,
        y: py * 100,
        size: size * sizeFactor,
        color: palette[colorIdx] ?? palette[0]!,
        opacity,
        delay,
      };
    });
  }, [count, size, palette]);

  return (
    <div
      className={cn(styles['pixel-grid'], className)}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {pixels.map((pixel) =>
        animated ? (
          <motion.span
            key={pixel.id}
            className={styles['pixel-grid__pixel']}
            style={{
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              width: pixel.size,
              height: pixel.size,
              backgroundColor: pixel.color,
            }}
            initial={false}
            whileInView={{ opacity: pixel.opacity, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.7,
              delay: pixel.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ) : (
          <span
            key={pixel.id}
            className={styles['pixel-grid__pixel']}
            style={{
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              width: pixel.size,
              height: pixel.size,
              backgroundColor: pixel.color,
              opacity: pixel.opacity,
            }}
          />
        )
      )}
    </div>
  );
}
