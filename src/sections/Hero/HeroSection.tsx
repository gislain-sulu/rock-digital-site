'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import styles from './Hero.module.scss';

const PARTICLES = [
  { top: '8%', left: '62%', size: 10, tone: 'blue', delay: 0 },
  { top: '14%', left: '72%', size: 14, tone: 'orange', delay: 0.2 },
  { top: '20%', left: '68%', size: 8, tone: 'blue', delay: 0.35 },
  { top: '10%', left: '78%', size: 12, tone: 'blue', delay: 0.5 },
  { top: '18%', left: '84%', size: 9, tone: 'orange', delay: 0.15 },
  { top: '6%', left: '88%', size: 11, tone: 'blue', delay: 0.4 },
] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || document.body.classList.contains('home-gsap-active')) {
        return;
      }

      registerGsap();
      const visual = visualRef.current;
      const section = sectionRef.current;
      if (!visual || !section) return;

      if (section.closest('[data-home-landing]')) return;

      gsap.to(visual, {
        y: -12,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      const particles = visual.querySelectorAll('[data-hero-particle]');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: '+=14',
          x: index % 2 === 0 ? '+=6' : '-=6',
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 3 + index * 0.25,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-home-hero
    >
      <Container className={styles.hero__container}>
        <div className={styles.hero__columns}>
          <div className={styles.hero__content}>
            <h1 id="hero-title" className={styles.hero__title}>
              <span className={styles.hero__titleLine}>
                <span className={styles.hero__word}>
                  Nous concevons des solutions digitales performantes pour{' '}
                </span>
                <span
                  className={styles.hero__titleHighlight}
                  data-hero-digital
                >
                  accélérer votre croissance.
                </span>
              </span>
            </h1>

            <p className={styles.hero__lead}>
              <span className={styles.hero__leadChunk}>
                Développement web &amp; mobile, transformation digitale et stratégie
                sur-mesure.
              </span>
            </p>

            <div className={styles.hero__actions}>
              <RockDigitalButton href="/services" hoverEffect={false}>
                Découvrir nos services
              </RockDigitalButton>
            </div>
          </div>

          <div className={styles.hero__visualCol} ref={visualRef}>
            <div className={styles.hero__visual} data-hero-visual>
              <div className={styles.hero__media}>
                <Image
                  src="/bg-hero-2.png"
                  alt="Illustration géométrique de montagnes digitales Rock Digital"
                  className={styles.hero__image}
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 50vw"
                />
              </div>

              <div className={styles.hero__particles} aria-hidden="true">
                {PARTICLES.map((particle) => (
                  <span
                    key={`${particle.top}-${particle.left}`}
                    data-hero-particle
                    className={styles[`hero__particle--${particle.tone}`]}
                    style={{
                      top: particle.top,
                      left: particle.left,
                      width: particle.size,
                      height: particle.size,
                      animationDelay: `${particle.delay}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
