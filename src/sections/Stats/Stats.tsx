'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { PixelGrid } from '@/components/brand/PixelGrid';
import { StatsValue } from '@/components/motion/StatsValue';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { stats } from '@/lib/content';

import { animateCountersInScope } from '@/sections/AboutPage/aboutGsap';

import styles from './Stats.module.scss';

type StatsProps = {
  
  motion?: 'framer' | 'gsap';
};

export function Stats({ motion = 'framer' }: StatsProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (motion !== 'gsap') return;

      const section = innerRef.current;
      if (!section) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const heading = section.querySelector('[class*="SectionHeading"]');
      const cards = section.querySelectorAll('[class*="stats__card"]');

      if (heading) {
        gsap.from(heading, {
          y: 36,
          autoAlpha: 0,
          duration: 0.95,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      animateCountersInScope(section);
    },
    { scope: innerRef, dependencies: [motion], revertOnUpdate: true }
  );

  const grid = (
    <div className={styles.stats__grid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stats__card}>
          <p className={styles.stats__value}>
            <StatsValue
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
            />
          </p>
          <p className={styles.stats__label}>{stat.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Section
      tone="deep"
      size="lg"
      id="stats"
      className={styles.stats}
      data-page-section="about-stats"
    >
      <div className={styles.stats__bg} aria-hidden="true">
        <PixelGrid variant="blue" density="medium" />
      </div>

      <Container ref={innerRef}>
        <SectionHeading
          kicker="Des résultats concrets"
          title={
            <>
              Une croissance mesurée,{' '}
              <span className={styles.stats__titleAccent}>une confiance bâtie.</span>
            </>
          }
          description="Dix ans d'expertise, des dizaines de partenaires, des produits utilisés au quotidien. Voici ce que nos chiffres racontent."
          tone="dark"
          align="left"
        />

        {motion === 'framer' ? (
          <StaggerGroup className={styles.stats__grid} stagger={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} as="div" className={styles.stats__card}>
                <p className={styles.stats__value}>
                  <StatsValue
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </p>
                <p className={styles.stats__label}>{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          grid
        )}
      </Container>
    </Section>
  );
}
