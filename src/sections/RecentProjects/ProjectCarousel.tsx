'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

import styles from './RecentProjects.module.scss';

/** Owl Carousel SoluTek — project_list */
const CAROUSEL_GAP = 30;
const AUTOPLAY_MS = 2800;
const TRANSITION_MS = 1500;

export type ProjectCarouselSlide = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
};

type ProjectCarouselProps = {
  slides: ProjectCarouselSlide[];
  auto?: boolean;
  paused?: boolean;
};

function getVisibleCount(viewportWidth: number): number {
  if (viewportWidth >= 1920) return 5;
  if (viewportWidth >= 1000) return 3;
  if (viewportWidth >= 768) return 2;
  return 1;
}

export function ProjectCarousel({
  slides,
  auto = true,
  paused = false,
}: ProjectCarouselProps) {
  const reducedMotion = useReducedMotion();
  const count = slides.length;
  const loopSlides = useMemo(
    () => (count > 0 ? [...slides, ...slides, ...slides] : []),
    [slides, count]
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);

  const slideWidth =
    viewportWidth > 0
      ? (viewportWidth - CAROUSEL_GAP * (visibleCount - 1)) / visibleCount
      : 0;

  const offset = index * (slideWidth + CAROUSEL_GAP);

  const activeDot =
    count > 0 ? (((index - count) % count) + count) % count : 0;

  useEffect(() => {
    if (count === 0) return;
    setIndex(count);
    setAnimate(false);
  }, [count]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.clientWidth;
      setViewportWidth(width);
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

  const goTo = useCallback(
    (targetIndex: number, withAnimation = true) => {
      if (count === 0) return;
      setAnimate(withAnimation && !reducedMotion);
      setIndex(count + targetIndex);
    },
    [count, reducedMotion]
  );

  const goNext = useCallback(() => {
    setAnimate(!reducedMotion);
    setIndex((current) => current + 1);
  }, [reducedMotion]);

  const handleTransitionEnd = useCallback(() => {
    if (count === 0) return;

    if (index >= count * 2) {
      setAnimate(false);
      setIndex(count);
      return;
    }

    if (index < count) {
      setAnimate(false);
      setIndex(count * 2 - 1);
    }
  }, [count, index]);

  useEffect(() => {
    if (!auto || paused || reducedMotion || count === 0) return;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [auto, paused, reducedMotion, count, goNext]);

  if (count === 0) return null;

  return (
    <div
      className={styles.projectArea__carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projets récents"
    >
      <div ref={viewportRef} className={styles.projectArea__viewport}>
        <div
          className={styles.projectArea__track}
          style={{
            gap: `${CAROUSEL_GAP}px`,
            transform: `translate3d(-${offset}px, 0, 0)`,
            transition:
              animate && !reducedMotion
                ? `transform ${TRANSITION_MS}ms ease`
                : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopSlides.map((project, slideIndex) => (
            <article
              key={`${project.id}-${slideIndex}`}
              className={styles.projectArea__card}
              style={
                slideWidth > 0
                  ? { flex: `0 0 ${slideWidth}px`, width: slideWidth }
                  : undefined
              }

            >
              <Link
                href={project.href}
                className={styles.projectArea__cardLink}
                aria-label={`Voir le projet ${project.title}`}
                tabIndex={slideIndex >= count && slideIndex < count * 2 ? 0 : -1}
              >
                <div className={styles.projectArea__thumb}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className={styles.projectArea__image}
                    sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 20vw"
                  />
                </div>
                <div className={styles.projectArea__content}>
                  <h3 className={styles.projectArea__cardTitle}>{project.title}</h3>
                  <p className={styles.projectArea__tag}>{project.category}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div
        className={styles.projectArea__dots}
        role="tablist"
        aria-label="Navigation du carousel projets"
      >
        {slides.map((project, dotIndex) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            className={cn(
              styles.projectArea__dot,
              dotIndex === activeDot && styles['projectArea__dot--active']
            )}
            aria-label={`Afficher le projet ${project.title}`}
            aria-selected={dotIndex === activeDot}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
