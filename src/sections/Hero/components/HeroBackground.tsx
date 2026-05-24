'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type RefObject } from 'react';

import styles from '../Hero.module.scss';

type HeroBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function HeroBackground({ sectionRef }: HeroBackgroundProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <motion.div className={styles.hero__media} aria-hidden="true">
      <motion.div className={styles.hero__imageWrap} style={{ y: imageY }}>
        <Image
          src="/background-hero.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.hero__image}
        />
      </motion.div>
      <div className={styles.hero__overlay} />
      <div className={styles.hero__overlayBottom} />
      <motion.div
        className={styles.hero__glow}
        initial={false}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
