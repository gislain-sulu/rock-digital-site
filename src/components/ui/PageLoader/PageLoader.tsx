import { cn } from '@/utils/cn';

import styles from './PageLoader.module.scss';

type PageLoaderProps = {
  overlay?: boolean;
  className?: string;
};

export function PageLoader({ overlay = false, className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        styles.pageLoader,
        overlay && styles['pageLoader--overlay'],
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles.pageLoader__label}>Chargement…</span>
      <div className={styles.pageLoader__bar} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
