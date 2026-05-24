'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type StaggerGroupProps = {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'ul' | 'ol' | 'header';
  once?: boolean;
};

export function StaggerGroup({
  children,
  stagger = 0.1,
  delay = 0,
  className,
  as = 'div',
  once = true,
}: StaggerGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={false}
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
  y?: number;
};

export function StaggerItem({
  children,
  className,
  as = 'div',
  y = 24,
}: StaggerItemProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={variants} initial={false}>
      {children}
    </MotionTag>
  );
}
