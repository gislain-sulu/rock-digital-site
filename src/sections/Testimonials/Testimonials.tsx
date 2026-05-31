'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { testimonials } from '@/lib/content';

import { TestimonialSingleBox } from './TestimonialSingleBox';
import styles from './Testimonials.module.scss';

const AUTOPLAY_MS = 3200;
const TRANSITION_MS = 1500;
const GAP = 30;

function getVisibleCount(viewportWidth: number) {
  if (viewportWidth >= 1200) return 3;
  if (viewportWidth >= 768) return 2;
  return 1;
}

export function Testimonials() {
  const reducedMotion = useReducedMotion();
  const count = testimonials.length;
  const loopItems = useMemo(
    () => (count > 0 ? [...testimonials, ...testimonials, ...testimonials] : []),
    [count]
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const slideWidth =
    viewportWidth > 0
      ? (viewportWidth - GAP * (visibleCount - 1)) / visibleCount
      : 0;

  const offset = index * (slideWidth + GAP);

  useEffect(() => {
    if (count === 0) return;
    setIndex(count);
    setAnimate(false);
  }, [count]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const measure = () => {
      setViewportWidth(node.clientWidth);
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const goNext = useCallback(() => {
    setAnimate(!reducedMotion);
    setIndex((current) => current + 1);
  }, [reducedMotion]);

  useEffect(() => {
    if (paused || reducedMotion || count === 0) return;
    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, count, goNext]);

  const handleTransitionEnd = useCallback(() => {
    if (count === 0) return;

    if (index >= count * 2) {
      setAnimate(false);
      setIndex(count);
    } else if (index < count) {
      setAnimate(false);
      setIndex(count * 2 - 1);
    }
  }, [count, index]);

  if (count === 0) return null;

  return (
    <Section tone="light" size="lg" id="testimonials" className={styles.testimonialArea}>
      <Container size="fluid" className={styles.testimonialArea__container}>
        <div className={styles.testimonialArea__row}>
          <div className={styles.testimonialArea__colFull}>
            <div className={styles.testimonialArea__sectionTitle}>
              <SectionSubTitle>TÉMOIGNAGES</SectionSubTitle>
              <h2 className={styles.testimonialArea__mainTitle}>
                Ce que disent nos <span>clients</span>
              </h2>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.testimonialArea__carousel}>
        <div className={styles.testimonialArea__carouselInner}>
          <div className={styles.testimonialArea__rowInner}>
            <div
              className={styles.testimonialArea__list}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              role="region"
              aria-roledescription="carousel"
              aria-label="Témoignages clients"
            >
              <div ref={viewportRef} className={styles.testimonialArea__viewport}>
                <div
                  className={styles.testimonialArea__track}
                  style={{
                    gap: `${GAP}px`,
                    transform: `translate3d(-${offset}px, 0, 0)`,
                    transition:
                      animate && !reducedMotion
                        ? `transform ${TRANSITION_MS}ms ease`
                        : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {loopItems.map((item, itemIdx) => (
                    <article
                      key={`${item.author}-${itemIdx}`}
                      className={styles.testimonialArea__item}
                      style={
                        slideWidth > 0
                          ? { flex: `0 0 ${slideWidth}px`, width: slideWidth }
                          : undefined
                      }
                    >
                      <TestimonialSingleBox
                        quote={item.quote}
                        author={item.author}
                        role={item.role}
                        rating={item.rating}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
