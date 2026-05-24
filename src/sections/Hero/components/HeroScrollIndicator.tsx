'use client';

import { motion } from 'framer-motion';

import styles from '../Hero.module.scss';

export function HeroScrollIndicator() {
  return (
    <motion.a
      href="#services"
      className={styles.hero__scroll}
      aria-label="Faire défiler vers les services"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.35 }}
    >
      <span className={styles.hero__scrollLabel}>Scroll</span>
      <span className={styles.hero__scrollTrack} aria-hidden="true">
        <span className={styles.hero__scrollFill} />
      </span>
    </motion.a>
  );
}
