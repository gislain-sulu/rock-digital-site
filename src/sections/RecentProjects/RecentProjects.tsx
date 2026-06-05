'use client';

import { useMemo, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import headingStyles from '@/components/ui/SectionHeading/SectionHeading.module.scss';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { projects } from '@/lib/content';

import { PartnerMarquee } from './PartnerMarquee';
import { ProjectCarousel } from './ProjectCarousel';
import styles from './RecentProjects.module.scss';

/** Images SoluTek project-area (project1.png … project5.png) */
const PROJECT_IMAGE_PATHS = [
  '/project1.png',
  '/project2.png',
  '/project3.png',
  '/project4.png',
  '/project5.png',
] as const;

const CAROUSEL_PROJECTS = projects.slice(0, PROJECT_IMAGE_PATHS.length);

export type RecentProjectsProps = {
  auto?: boolean;
};

export function RecentProjects({ auto = true }: RecentProjectsProps) {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const carouselSlides = useMemo(
    () =>
      CAROUSEL_PROJECTS.map((project, index) => ({
        id: project.id,
        title: project.title,
        category: project.category,
        image: PROJECT_IMAGE_PATHS[index] ?? PROJECT_IMAGE_PATHS[0],
        href: `/portfolio#${project.id}`,
      })),
    []
  );

  return (
    <>
      <section className={styles.projectArea} id="recent-projects">
        <Container size="fluid" className={styles.projectArea__container}>
          <div className={styles.projectArea__projectRow}>
            <div className={styles.projectArea__projectCol}>
              <div className={styles.projectArea__headerIntro}>
                <SectionSubTitle>Réalisations</SectionSubTitle>
                <h2 className={styles.projectArea__title}>
                  Des projets que nous aimons, <span>livrés avec rigueur.</span>
                </h2>
                <p className={headingStyles.heading__description}>
                  Une sélection de produits digitaux conçus avec nos clients, du
                  conseil stratégique à la mise en production.
                </p>
              </div>
            </div>

            <div className={styles.projectArea__projectCol}>
              <div className={styles.projectArea__headerAside}>
                <RockDigitalButton
                  href="/contact"
                  className={styles.projectArea__cta}
                >
                  Démarrer un projet
                </RockDigitalButton>
              </div>
            </div>
          </div>

          <div className={styles.projectArea__carouselRow}>
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <ProjectCarousel
                slides={carouselSlides}
                auto={auto}
                paused={paused}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.brandArea} aria-label="Brand area">
        <Container>
          <div className={styles.brandArea__row}>
            <PartnerMarquee auto={auto && !reducedMotion} paused={paused} />
          </div>
        </Container>
      </section>
    </>
  );
}
