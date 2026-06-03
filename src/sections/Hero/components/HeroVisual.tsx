import Image from 'next/image';

import styles from './HeroVisual.module.scss';

export function HeroVisual() {
  return (
    <div className={styles.visual} data-hero-visual>
      <span className={styles.visual__glow} aria-hidden="true" />
      <div className={styles.visual__figure}>
        <Image
          src="/bg-hero.png"
          alt="Équipe Rock Digital et interfaces digitales"
          fill
          priority
          sizes="(max-width: 767px) 92vw, (max-width: 1279px) 58vw, 960px"
          className={styles.visual__image}
        />
      </div>
    </div>
  );
}
