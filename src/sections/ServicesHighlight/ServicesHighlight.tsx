'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { serviceHighlights } from '@/lib/homeLandingContent';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { scrollVarsWithInViewFix } from '@/lib/gsap/effects';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import styles from './ServicesHighlight.module.scss';

export function ServicesHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      if (prefersReducedMotion()) return;

      const cards = grid.querySelectorAll('[data-service-highlight-card]');
      const isAboveFold = Boolean(section.closest('[data-home-landing]'));

      if (isAboveFold) {
        gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' });
        return;
      }

      gsap.from(cards, {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: GSAP_EASE.out,
        clearProps: 'transform',
        scrollTrigger: scrollVarsWithInViewFix({
          trigger: section,
          start: 'top 82%',
          once: true,
        }),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.servicesHighlight}
      aria-labelledby="services-highlight-title"
    >
      <Container size="fluid" className={styles.servicesHighlight__container}>
        <h2 id="services-highlight-title" className={styles.servicesHighlight__srTitle}>
          Nos expertises
        </h2>

        <div ref={gridRef} className={styles.servicesHighlight__grid}>
          {serviceHighlights.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={styles.servicesHighlight__card}
                data-service-highlight-card
              >
                <div className={styles.servicesHighlight__iconWrap} aria-hidden="true">
                  <Icon className={styles.servicesHighlight__icon} strokeWidth={1.75} />
                </div>
                <h3 className={styles.servicesHighlight__cardTitle}>{service.title}</h3>
                <p className={styles.servicesHighlight__cardText}>{service.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
