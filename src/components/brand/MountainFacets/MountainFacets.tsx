'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

import styles from './MountainFacets.module.scss';

type MountainFacetsProps = {
  variant?: 'light' | 'dark';
  animated?: boolean;
  className?: string;
};

export function MountainFacets({
  variant = 'light',
  animated = true,
  className,
}: MountainFacetsProps) {
  const stroke = variant === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(46,110,187,0.18)';

  const facets = [
    { points: '120,420 220,200 290,300 360,420', delay: 0.05, key: 'f1', fill: 'a' },
    { points: '290,300 360,420 460,420', delay: 0.1, key: 'f2', fill: 'b' },
    { points: '220,200 290,300 380,160 460,300', delay: 0.15, key: 'f3', fill: 'c' },
    { points: '380,160 460,300 540,180 620,300', delay: 0.2, key: 'f4', fill: 'b' },
    { points: '540,180 620,300 700,420', delay: 0.25, key: 'f5', fill: 'd' },
    { points: '460,420 620,300 700,420', delay: 0.3, key: 'f6', fill: 'a' },
    { points: '460,300 540,180 540,260', delay: 0.18, key: 'f7', fill: 'e' },
    { points: '290,300 380,160 360,260', delay: 0.13, key: 'f8', fill: 'e' },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 480"
      role="presentation"
      aria-hidden="true"
      className={cn(styles.facets, styles[`facets--${variant}`], className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`mf-a-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={variant === 'dark' ? '#2e6ebb' : '#2e6ebb'} stopOpacity="0.9" />
          <stop offset="100%" stopColor={variant === 'dark' ? '#0b1b3a' : '#1e4fa1'} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`mf-b-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e4fa1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0b1b3a" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`mf-c-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#334155" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`mf-d-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#231f20" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`mf-e-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {facets.map((facet) =>
        animated ? (
          <motion.polygon
            key={facet.key}
            points={facet.points}
            fill={`url(#mf-${facet.fill}-${variant})`}
            stroke={stroke}
            strokeWidth={1}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.9,
              delay: facet.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ) : (
          <polygon
            key={facet.key}
            points={facet.points}
            fill={`url(#mf-${facet.fill}-${variant})`}
            stroke={stroke}
            strokeWidth={1}
          />
        )
      )}
    </svg>
  );
}
