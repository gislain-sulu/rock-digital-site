'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { aboutMilestones } from '@/lib/aboutPageContent';

import styles from './AboutHistory.module.scss';

export function AboutHistory() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const cards = grid.querySelectorAll('[class*="aboutHistory__card"]');

      cards.forEach((card, index) => {
        gsap.from(card, {
          autoAlpha: 0,
          x: index % 2 === 0 ? -48 : 48,
          y: 24,
          duration: 0.95,
          ease: GSAP_EASE.expo,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: gridRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <section className={styles.aboutHistory} data-page-section="about-history">
      <Container>
        <header className={styles.aboutHistory__header}>
          <SectionSubTitle>Notre histoire</SectionSubTitle>
          <h2 className={styles.aboutHistory__title}>
            Dix années d&apos;innovations,{' '}
            <span>une trajectoire claire.</span>
          </h2>
        </header>

        <div ref={gridRef} className={styles.aboutHistory__grid}>
          {aboutMilestones.map((step) => (
            <article key={step.year} className={styles.aboutHistory__card}>
              <span className={styles.aboutHistory__year}>{step.year}</span>
              <h3 className={styles.aboutHistory__cardTitle}>{step.title}</h3>
              <p className={styles.aboutHistory__cardText}>{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
