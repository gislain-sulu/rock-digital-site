'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { scrollVarsWithInViewFix } from '@/lib/gsap/effects';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import styles from './ValueProps.module.scss';

type Value = {
  title: string;
  description: string;
  icon: ReactNode;
};

const values: Value[] = [
  {
    title: 'Solidité',
    description:
      'Une architecture pensée pour durer. Tests, monitoring, sécurité — fondations sans compromis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21V9l9-6 9 6v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description:
      'Veille permanente, expérimentations maîtrisées. Nous adoptons ce qui rend votre produit meilleur.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v3M4.93 4.93l2.12 2.12M2 12h3M4.93 19.07l2.12-2.12M12 22v-3M19.07 19.07l-2.12-2.12M22 12h-3M19.07 4.93l-2.12 2.12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    description:
      'Du temps de chargement aux conversions : nous mesurons, nous itérons, nous accélérons votre produit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 1 18 0" strokeLinecap="round" />
        <path d="M12 12L8 8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Expertise',
    description:
      'Designers, ingénieurs, stratèges. Une équipe senior intégrée, sans intermédiaires.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
];

const VALUE_CARD_SELECTOR = '[data-value-card]';

export function ValueProps() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const cards = grid.querySelectorAll<HTMLElement>(VALUE_CARD_SELECTOR);

      if (!cards.length) return;

      const cardsTween = gsap.from(cards, {
        autoAlpha: 0,
        y: 48,
        scale: 0.94,
        duration: 0.95,
        stagger: 0.1,
        ease: GSAP_EASE.out,
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: scrollVarsWithInViewFix({
          trigger: grid,
          start: 'top 82%',
          once: true,
          toggleActions: 'play none none none',
        }),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cardsTween.scrollTrigger?.kill();
        cardsTween.kill?.();
      };
    },
    { scope: gridRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <Section tone="light" size="md" id="values" className={styles.valuesSection}>
      <Container>
        <div ref={gridRef} className={styles.values}>
          {values.map((value) => (
            <article
              key={value.title}
              data-value-card
              className={styles.values__card}
              tabIndex={0}
            >
              <span className={styles.values__icon} aria-hidden="true">
                {value.icon}
              </span>
              <h3 className={styles.values__title}>{value.title}</h3>
              <p className={styles.values__description}>{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
