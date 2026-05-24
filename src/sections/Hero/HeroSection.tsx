/**
 * HeroSection — refonte complète (Rock Digital)
 *
 * Corrections appliquées :
 * 1. Navbar extraite (Navbar.tsx) — flex justify-between, logo/nav/CTA sans chevauchement
 * 2. Espace mort titre/description — SplitText retiré, reveal Framer Motion inline
 * 3. CTAButton dédiés — dégradé bleu + outline avec hover/glow explicites
 * 4. Typo premium — gradient cyan sur « solides », titre en clamp() responsive
 * 5. Indicateur scroll à droite — ligne animée + label
 * 6. Toast « 1 Issue » — overlay Next.js dev (non modifiable côté app)
 */
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

import { CTAButton } from './components/CTAButton';
import { HeroBackground } from './components/HeroBackground';
import { HeroVisual } from './components/HeroVisual';
import { HeroScrollIndicator } from './components/HeroScrollIndicator';
import styles from './Hero.module.scss';

const fadeUp = {
  initial: false as const,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.12 },
  },
};

const titleWord = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <HeroBackground sectionRef={sectionRef} />

      <Container className={styles.hero__container}>
        <motion.div
          className={styles.hero__layout}
          initial={false}
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className={styles.hero__main}>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
              <Badge tone="light" className={styles.hero__badge}>
                Innovation • Expertise • Performance
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-title"
              className={styles.hero__title}
              variants={titleContainer}
              initial={false}
              animate="visible"
            >
              <span className={styles.hero__titleLine}>
                <motion.span variants={titleWord} className={styles.hero__word}>
                  Des{' '}
                </motion.span>
                <motion.span variants={titleWord} className={styles.hero__word}>
                  fondations{' '}
                </motion.span>
                <motion.span
                  variants={titleWord}
                  className={styles.hero__titleHighlight}
                >
                  solides
                </motion.span>
              </span>
              <span className={styles.hero__titleLine}>
                <motion.span
                  variants={titleWord}
                  className={styles.hero__titleAccent}
                >
                  pour votre transformation digitale.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className={styles.hero__lead}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.42 }}
            >
              Rock Digital conçoit des sites, applications mobiles, plateformes
              SaaS et expériences digitales conçues pour durer. Stratégie, design
              et ingénierie réunis dans une approche premium.
            </motion.p>

            <motion.div
              className={styles.hero__actions}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.58 }}
            >
              <CTAButton href="/contact" variant="primary">
                Démarrer un projet
              </CTAButton>
              <CTAButton href="/portfolio" variant="secondary" showArrow={false}>
                Voir nos réalisations
              </CTAButton>
            </motion.div>
          </div>

          <HeroVisual />
        </motion.div>
      </Container>

      <HeroScrollIndicator />
    </section>
  );
}
