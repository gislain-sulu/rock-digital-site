'use client';

import { useCallback, useEffect, useState } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

import styles from './GoTopButton.module.scss';

const SCROLL_THRESHOLD = 300;
const SCROLL_DURATION_MS = 1200;

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12 19V5M5 12l7-7 7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GoTopButton() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setActive(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    if (reducedMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const start = window.scrollY;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [reducedMotion]);

  return (
    <div className={styles.scrollArea} data-layout="go-top" aria-hidden={!active}>
      <div className={styles.topWrap}>
        <div className={styles.goTopBtnWraper}>
          <button
            type="button"
            className={cn(
              styles.goTop,
              styles.goTopButton,
              active && styles['goTop--active']
            )}
            onClick={scrollToTop}
            aria-label="Retour en haut de la page"
            tabIndex={active ? 0 : -1}
          >
            <span className={styles.icon}>
              <ArrowUpIcon />
            </span>
            <span className={styles.icon}>
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
