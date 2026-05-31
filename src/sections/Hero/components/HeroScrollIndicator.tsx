import styles from '../Hero.module.scss';

export function HeroScrollIndicator() {
  return (
    <a
      href="#services"
      className={styles.hero__scroll}
      aria-label="Faire défiler vers les services"
    >
      <span className={styles.hero__scrollLabel}>Scroll</span>
      <span className={styles.hero__scrollTrack} aria-hidden="true">
        <span className={styles.hero__scrollFill} />
      </span>
    </a>
  );
}
