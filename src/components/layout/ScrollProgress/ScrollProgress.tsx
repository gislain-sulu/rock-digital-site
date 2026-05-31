'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

import styles from './ScrollProgress.module.scss';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles['scroll-progress']}
      data-layout="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
