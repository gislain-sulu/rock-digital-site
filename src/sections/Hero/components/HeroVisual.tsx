'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import styles from './HeroVisual.module.scss';

export function HeroVisual() {
  return (
    <motion.div
      className={styles.visual}
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      <span className={styles.visual__glow} aria-hidden="true" />
      <motion.div
        className={styles.visual__figure}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.visual__rock} aria-hidden="true">
          <Image
            src="/rock-2.png"
            alt=""
            fill
            sizes="(max-width: 767px) 80vw, (max-width: 1279px) 44vw, 480px"
            className={styles.visual__rockImage}
          />
        </div>
        <Image
          src="/hero-thumb.png"
          alt="Expert Rock Digital consultant une tablette"
          fill
          priority
          sizes="(max-width: 767px) 72vw, (max-width: 1279px) 40vw, 420px"
          className={styles.visual__image}
        />
      </motion.div>
    </motion.div>
  );
}
