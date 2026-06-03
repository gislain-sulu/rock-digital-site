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

import styles from './AboutIntro.module.scss';

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

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animatedRef.current) return;

      registerGsap();
      animatedRef.current = true;

      if (prefersReducedMotion()) {
        section.classList.remove(styles['aboutIntro--enterPending']);
        return;
      }

      const enterEls = section.querySelectorAll('[data-about-enter]');
      const actions = section.querySelector(`.${styles.aboutIntro__actions}`);

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.expo },
        onStart: () =>
          section.classList.remove(styles['aboutIntro--enterPending']),
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
        section.classList.remove(styles['aboutIntro--enterPending']);
      };
    },
    { scope: sectionRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(styles.aboutIntro, styles['aboutIntro--enterPending'])}
      aria-labelledby="about-intro-title"
      data-page-section="about-intro"
    >
      <Container>
        <div className={styles.aboutIntro__inner}>
          <header className={styles.aboutIntro__header}>
            <SectionSubTitle data-about-enter>À propos</SectionSubTitle>
            <h2 id="about-intro-title" className={styles.aboutIntro__title} data-about-enter>
              Une équipe d&apos;artisans du digital,{' '}
              <span>passionnée par l&apos;impact.</span>
            </h2>
            <p className={styles.aboutIntro__lead} data-about-enter>
              Depuis 10 ans, nous accompagnons des entreprises ambitieuses dans la
              conception et le développement de produits digitaux solides,
              élégants et performants.
            </p>
          </header>

          <div className={styles.aboutIntro__actions}>
            <RockDigitalButton href="/contact" icon={arrowIcon} iconPosition="right">
              Travaillons ensemble
            </RockDigitalButton>
            <RockDigitalButton href="#carrieres" variant="outline">
              Nous rejoindre
            </RockDigitalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
