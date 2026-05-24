'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

import styles from './SplitText.module.scss';

type SplitTextProps = {
  text: string;
  className?: string;
  splitBy?: 'word' | 'char';
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  once?: boolean;
};

export function SplitText({
  text,
  className,
  splitBy = 'word',
  stagger = 0.04,
  delay = 0,
  duration = 0.85,
  as: Tag = 'span',
  once = true,
}: SplitTextProps) {
  const reduced = useReducedMotion();

  const tokens = useMemo(() => {
    if (splitBy === 'char') return [...text];
    return text.split(/(\s+)/);
  }, [text, splitBy]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(styles.split, className)} aria-label={text}>
      {tokens.map((token, idx) => {
        const isSpace = /^\s+$/.test(token);
        if (isSpace) {
          return (
            <span key={`s-${idx}`} className={styles.split__space}>
              {token}
            </span>
          );
        }
        return (
          <span key={`w-${idx}-${token}`} className={styles.split__mask}>
            <motion.span
              className={styles.split__token}
              initial={false}
              whileInView={{ y: '0%' }}
              viewport={{ once, margin: '-10%' }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + idx * stagger,
              }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
