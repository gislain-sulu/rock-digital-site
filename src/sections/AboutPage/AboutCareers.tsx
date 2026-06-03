'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import styles from './AboutCareers.module.scss';

export function AboutCareers() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const content = panel.querySelector('[class*="aboutCareers__content"]');
      const cta = panel.querySelector('a, button');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      if (content) {
        tl.from(
          content,
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.95,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0
        );
      }

      if (cta) {
        tl.from(
          cta,
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0.2
        );
      }
    },
    { scope: panelRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <Section tone="light" size="md" id="carrieres" className={styles.aboutCareers}>
      <Container>
        <div ref={panelRef} className={styles.aboutCareers__panel}>
          <div className={styles.aboutCareers__content}>
            <SectionSubTitle>Carrières</SectionSubTitle>
            <h2 className={styles.aboutCareers__title}>
              Vous voulez <span>construire avec nous ?</span>
            </h2>
            <p className={styles.aboutCareers__lead}>
              Nous recrutons en permanence des designers, ingénieurs et stratèges
              seniors qui aiment construire des produits soignés.
            </p>
          </div>

          <RockDigitalButton href="mailto:careers@rockdigital.com">
            Voir les opportunités
          </RockDigitalButton>
        </div>
      </Container>
    </Section>
  );
}
