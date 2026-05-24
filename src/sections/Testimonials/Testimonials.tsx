'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { testimonials } from '@/lib/content';
import { cn } from '@/utils/cn';

import styles from './Testimonials.module.scss';

const AUTOPLAY_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduced, next]);

  const current = testimonials[index];
  if (!current) return null;

  return (
    <Section tone="light" size="lg" id="testimonials">
      <Container>
        <SectionHeading
          kicker="Témoignages"
          title={
            <>
              La voix de nos clients,{' '}
              <span className="u-text-gradient-blue">notre meilleure preuve.</span>
            </>
          }
          description="Ils nous ont confié leur transformation digitale. Voici ce qu'ils en disent."
          align="left"
        />

        <div
          className={styles.testimonials}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Témoignages clients"
        >
          <div className={styles.testimonials__viewport}>
            <AnimatePresence initial={false} mode="wait">
              <motion.blockquote
                key={index}
                className={styles.testimonials__quote}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <svg
                  className={styles.testimonials__mark}
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 10c-5 2-9 7-9 14v14h14V24h-9c0-6 4-10 8-12l-4-2zm22 0c-5 2-9 7-9 14v14h14V24h-9c0-6 4-10 8-12l-4-2z" />
                </svg>
                <p className={styles.testimonials__text}>{current.quote}</p>
                <footer className={styles.testimonials__author}>
                  <span className={styles.testimonials__avatar}>
                    {current.author
                      .split(' ')
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <span>
                    <span className={styles.testimonials__name}>
                      {current.author}
                    </span>
                    <span className={styles.testimonials__role}>
                      {current.role} · {current.company}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className={styles.testimonials__controls}>
            <button
              type="button"
              onClick={prev}
              className={styles.testimonials__btn}
              aria-label="Témoignage précédent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={styles.testimonials__dots}
              role="tablist"
              aria-label="Sélectionner un témoignage"
            >
              {testimonials.map((testimonial, idx) => (
                <button
                  key={testimonial.author}
                  type="button"
                  role="tab"
                  aria-selected={idx === index}
                  aria-label={`Témoignage ${idx + 1} sur ${testimonials.length}`}
                  className={cn(
                    styles.testimonials__dot,
                    idx === index && styles['testimonials__dot--active']
                  )}
                  onClick={() => setIndex(idx)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className={styles.testimonials__btn}
              aria-label="Témoignage suivant"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
