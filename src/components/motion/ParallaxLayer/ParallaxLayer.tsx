'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  axis?: 'y' | 'x';
};

export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
  axis = 'y',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = 100 * speed;
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [range, -range]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={axis === 'y' ? { y: translate } : { x: translate }}
    >
      {children}
    </motion.div>
  );
}
