'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { TeamCard } from '@/components/ui/TeamCard';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { aboutTeam } from '@/lib/aboutPageContent';

import styles from './AboutTeam.module.scss';

export function AboutTeam() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const cards = grid.querySelectorAll('[data-team-card]');

      if (cards.length) {
        gsap.from(cards, {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: gridRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <Section tone="subtle" size="lg" id="equipe" className={styles.aboutTeam}>
      <Container>
        <header className={styles.aboutTeam__header}>
          <SectionSubTitle>Notre équipe</SectionSubTitle>
          <h2 className={styles.aboutTeam__title}>
            Une équipe senior,{' '}
            <span>intégrée, sans intermédiaires.</span>
          </h2>
        </header>

        <div ref={gridRef} className={styles.aboutTeam__grid}>
          {aboutTeam.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              imageSrc={member.image}
              socials={member.socials}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
