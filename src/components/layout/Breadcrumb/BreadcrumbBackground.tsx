'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { GSAP_EASE } from '@/lib/gsap/constants';
import { parallaxY } from '@/lib/gsap/effects';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import styles from './Breadcrumb.module.scss';

type BreadcrumbBackgroundProps = {
  src: string;
};

/**
 * Fond breadcrumb — animation GSAP scopée au client (évite l'hydratation).
 */
export function BreadcrumbBackground({ src }: BreadcrumbBackgroundProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    sectionRef.current = mediaRef.current?.closest('[data-gsap-region="breadcrumb"]') ?? null;
    setReady(true);
  }, []);

  useGSAP(
    () => {
      if (!ready || !mediaRef.current) return;

      registerGsap();

      if (prefersReducedMotion()) {
        gsap.set(mediaRef.current, { clearProps: 'all' });
        return;
      }

      const area = sectionRef.current;
      const media = mediaRef.current;

      gsap.fromTo(
        media,
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 1.2, ease: GSAP_EASE.out }
      );

      if (area) {
        parallaxY(media, 40, area, 'top bottom', 'bottom top');
      }
    },
    { scope: mediaRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <>
      <div
        ref={mediaRef}
        className={styles.breadcrumbArea__media}
        aria-hidden="true"
        data-breadcrumb-media
        suppressHydrationWarning
      >
        {ready ? (
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.breadcrumbArea__mediaImage}
          />
        ) : null}
      </div>
      <div className={styles.breadcrumbArea__overlay} aria-hidden="true" />
    </>
  );
}
