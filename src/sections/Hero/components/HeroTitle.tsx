import styles from '../Hero.module.scss';




export function HeroTitle() {
  return (
    <h1 id="hero-title" className={styles.hero__title}>
      <span className={styles.hero__titleLine} data-hero-title-line>
        <span className={`${styles.hero__word} ${styles.hero__wordAmbient}`}>
          Construisons{' '}
        </span>
        <span className={`${styles.hero__word} ${styles.hero__wordAmbient}`}>
          aujourd&apos;hui
        </span>
      </span>

      <span className={styles.hero__titleLine} data-hero-title-line>
        <span className={`${styles.hero__word} ${styles.hero__wordAmbient}`}>le</span>
        {' '}
        <span className={styles.hero__titleHighlightWrap}>
          <span className={styles.hero__titleHighlight} data-hero-digital>
            digital
            <span className={styles.hero__titleHighlightShimmer} aria-hidden="true" />
            <span className={styles.hero__titleHighlightAura} aria-hidden="true" />
          </span>
        </span>

        <span
          className={`${styles.hero__titleAccent} ${styles.hero__word} ${styles.hero__wordAmbient}`}
        >
          {' '}
          de demain.
        </span>
      </span>
    </h1>
  );
}
