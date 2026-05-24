import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.loading__label}>Chargement…</span>
      <div className={styles.loading__bar} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
