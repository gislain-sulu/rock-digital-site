import Image from 'next/image';

import styles from './HeroVisual.module.scss';

export function HeroVisual() {
  return (
    <div className={styles.visual}>
      <span className={styles.visual__glow} aria-hidden="true" />
      <div className={styles.visual__figure}>
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
          src="/about-thumb.png"
          alt="Expert Rock Digital consultant une tablette"
          fill
          priority
          sizes="(max-width: 767px) 72vw, (max-width: 1279px) 40vw, 420px"
          className={styles.visual__image}
        />
      </div>
    </div>
  );
}
