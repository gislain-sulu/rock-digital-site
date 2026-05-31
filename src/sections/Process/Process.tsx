'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  buildProcessScrollCarousel,
  resetProcessCarouselProgress,
} from '@/lib/gsap/processScrollCarousel';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { processSteps } from '@/lib/content';
import { cn } from '@/utils/cn';

import styles from './Process.module.scss';
import { ProcessStep } from './ProcessStep';

const STEP_COUNT = processSteps.length;

export function Process() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);

  const handleProgress = useCallback((_progress: number, index: number) => {
    setActiveIndex(index);
  }, []);

  useGSAP(
    () => {
      registerGsap();

      const scroll = scrollRef.current;
      const sticky = stickyRef.current;
      const viewport = viewportRef.current;
      const list = listRef.current;
      const progress = progressRef.current;
      const orb = orbRef.current;

      if (!scroll || !sticky || !viewport || !list || !progress || !orb) return;

      const els = { scroll, sticky, viewport, list, progress, orb };
      const callbacks = { onProgress: handleProgress };

      if (reducedMotion) {
        resetProcessCarouselProgress(els, callbacks);
        return;
      }

      let cleanup: (() => void) | undefined;
      let cancelled = false;

      void buildProcessScrollCarousel(els, callbacks).then((dispose) => {
        if (cancelled) {
          dispose();
          return;
        }
        cleanup = dispose;
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('resize', refresh);
      window.addEventListener('load', refresh);
      scroll.querySelectorAll('img').forEach((img) => {
        if (img.complete) return;
        img.addEventListener('load', refresh, { once: true });
      });

      return () => {
        cancelled = true;
        window.removeEventListener('resize', refresh);
        window.removeEventListener('load', refresh);
        cleanup?.();
      };
    },
    { dependencies: [reducedMotion, handleProgress], scope: scrollRef }
  );

  return (
    <Section
      tone="light"
      size="lg"
      id="process"
      className={styles.processSection}
    >
      <div className={styles.processSection__ambient} aria-hidden="true">
        <span className={styles.processSection__orb} />
        <span
          className={cn(
            styles.processSection__orb,
            styles['processSection__orb--accent']
          )}
        />
        <span className={styles.processSection__grid} />
        <span className={styles.processSection__noise} />
      </div>

      <Container className={styles.processSection__container}>
        <div className={styles.processSection__header}>
          <SectionSubTitle>Notre méthode</SectionSubTitle>
          <SectionHeading
            title={
              <>
                Une approche éprouvée,{' '}
                <span className="u-text-gradient-blue">six étapes claires.</span>
              </>
            }
            description="De la découverte à l'optimisation continue, nous structurons chaque mission pour livrer un produit solide, mesurable et désirable."
            align="left"
            className={styles.processSection__heading}
          />
        </div>
      </Container>

      <div className={styles.processSection__timeline}>
        <div
          ref={scrollRef}
          className={styles.process__scroll}
          aria-label="Notre processus en six étapes"
        >
          <div ref={stickyRef} className={styles.process__sticky}>
            <div className={styles.process__meta}>
              <div className={styles.process__rail} aria-hidden="true">
                <span className={styles.process__railLine} />
                <div ref={progressRef} className={styles.process__progress} />
                <span ref={orbRef} className={styles.process__progressOrb} />
              </div>

              <p className={styles.process__counter} aria-live="polite">
                <span className={styles.process__counterCurrent}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className={styles.process__counterSep}>/</span>
                <span className={styles.process__counterTotal}>
                  {String(STEP_COUNT).padStart(2, '0')}
                </span>
              </p>
            </div>

            <div
              ref={viewportRef}
              className={styles.process__viewport}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label={`Étape ${activeIndex + 1} sur ${STEP_COUNT} : ${processSteps[activeIndex]?.title ?? ''}`}
            >
              <ol ref={listRef} className={styles.process__list}>
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={step.number}
                    step={step}
                    index={index}
                    reducedMotion={reducedMotion}
                    isActive={activeIndex === index}
                  />
                ))}
              </ol>
            </div>

            <p className={styles.process__hint} aria-hidden="true">
              <span className={styles.process__hintDesktop}>
                Continuez à défiler pour parcourir les étapes
              </span>
              <span className={styles.process__hintMobile}>
                Glissez pour voir toutes les étapes
              </span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
