'use client';

import Image from 'next/image';

import styles from '../Hero.module.scss';

export function HeroBackground() {
  return (
    <div className={styles.hero__media} aria-hidden="true">
      <div className={styles.hero__imageWrap}>
        <Image
          src="/background-hero.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.hero__image}
        />
      </div>
      <div className={styles.hero__overlay} />
      <div className={styles.hero__overlayBottom} />
      <div className={styles.hero__glow} />
    </div>
  );
}
