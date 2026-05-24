'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

import { fadeUp } from '@/animations/variants';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'header' | 'footer';
  once?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className,
  as = 'div',
  once = true,
}: FadeInProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={false}
      whileInView="visible"
      viewport={{ once, margin: '-12%' }}
    >
      {children}
    </MotionTag>
  );
}

export { fadeUp };
