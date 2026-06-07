import Image from 'next/image';

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
      <div className={styles.pageLoader__logoWrap}>
        <Image
          src="/rockdigital-logo-.svg"
          alt="Rock Digital"
          className={styles.pageLoader__logo}
          width={252}
          height={115}
          priority
        />
      </div>
      <span className={styles.pageLoader__label}>Chargement…</span>
      <div className={styles.pageLoader__bar} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
