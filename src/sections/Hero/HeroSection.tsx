'use client';

import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';

import { HeroBackground } from './components/HeroBackground';
import { HeroScrollIndicator } from './components/HeroScrollIndicator';
import { HeroTitle } from './components/HeroTitle';
import { HeroVisual } from './components/HeroVisual';
import styles from './Hero.module.scss';

export function HeroSection() {
  return (
    <section
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-home-hero
    >
      <HeroBackground />

      <Container className={styles.hero__container}>
        <div className={styles.hero__layout}>
          <div className={styles.hero__main}>
            <HeroTitle />

            <p className={styles.hero__lead}>
              <span className={styles.hero__leadChunk}>
                Rock Digital conçoit des sites, applications mobiles, plateformes SaaS
                et expériences digitales conçues pour durer.
              </span>
              <span className={styles.hero__leadChunk}>
                Stratégie, design et ingénierie réunis dans une approche premium.
              </span>
            </p>

            <div className={styles.hero__actions}>
              <RockDigitalButton
                href="/contact"
                variant="default"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                }
                iconPosition="right"
              >
                Démarrer un projet
              </RockDigitalButton>
            </div>
          </div>

          <div className={styles.hero__visualCol}>
            <HeroVisual />
          </div>
        </div>
      </Container>

      <HeroScrollIndicator />
    </section>
  );
}
