'use client';

import { cn } from '@/utils/cn';
import { useCustomCursor } from '@/hooks/useCustomCursor';

import styles from './CustomCursor.module.scss';

export function CustomCursor() {
  const { containerRef, dotRef, ringRef, enabled } = useCustomCursor();

  return (
    <div
      ref={containerRef}
      className={cn(styles.customCursor, !enabled && styles['customCursor--disabled'])}
      aria-hidden="true"
      data-custom-cursor=""
    >
      <div ref={dotRef} className={styles.customCursor__dot} />
      <div ref={ringRef} className={styles.customCursor__ring} />
    </div>
  );
}
