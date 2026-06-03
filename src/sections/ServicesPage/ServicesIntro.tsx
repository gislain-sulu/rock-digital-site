'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { cn } from '@/utils/cn';

import styles from './ServicesIntro.module.scss';

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animatedRef.current) return;

      registerGsap();
      animatedRef.current = true;

      if (prefersReducedMotion()) {
        section.classList.remove(styles['servicesIntro--enterPending']);
        return;
      }

      const enterEls = section.querySelectorAll('[data-services-enter]');
      const actions = section.querySelector(`.${styles.servicesIntro__actions}`);

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.expo },
        onStart: () =>
          section.classList.remove(styles['servicesIntro--enterPending']),
      });

      if (enterEls.length) {
        tl.from(
          enterEls,
          {
            y: 32,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0
        );
      }

      if (actions) {
        tl.from(
          actions,
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0.28
        );
      }

      return () => {
        animatedRef.current = false;
        section.classList.remove(styles['servicesIntro--enterPending']);
      };
    },
    { scope: sectionRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(styles.servicesIntro, styles['servicesIntro--enterPending'])}
      aria-labelledby="services-intro-title"
      data-page-section="services-intro"
    >
      <Container>
        <div className={styles.servicesIntro__inner}>
          <header className={styles.servicesIntro__header}>
            <SectionSubTitle data-services-enter>Nos services</SectionSubTitle>
            <h2
              id="services-intro-title"
              className={styles.servicesIntro__title}
              data-services-enter
            >
              L&apos;expertise complète d&apos;une agence{' '}
              <span>digitale premium.</span>
            </h2>
            <p className={styles.servicesIntro__lead} data-services-enter>
              Du conseil au développement, du design au déploiement — sept domaines
              d&apos;expertise, une seule équipe, une approche cohérente de bout en
              bout.
            </p>
          </header>

          <div className={styles.servicesIntro__actions}>
            <RockDigitalButton href="/contact" icon={arrowIcon} iconPosition="right">
              Discuter de votre projet
            </RockDigitalButton>
            <RockDigitalButton href="#offer-list" variant="outline">
              Voir les offres
            </RockDigitalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
