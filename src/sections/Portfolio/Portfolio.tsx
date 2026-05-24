'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ProjectMockup } from '@/components/brand/ProjectMockup';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { projects } from '@/lib/content';

import styles from './Portfolio.module.scss';

export function Portfolio() {
  return (
    <Section tone="light" size="lg" id="portfolio">
      <Container>
        <div className={styles.portfolio__header}>
          <SectionHeading
            kicker="Réalisations"
            title={
              <>
                Des projets que nous aimons,{' '}
                <span className="u-text-gradient-blue">livrés avec rigueur.</span>
              </>
            }
            description="Une sélection de produits digitaux conçus avec nos clients, du conseil stratégique à la mise en production."
            align="left"
          />
          <Button href="/portfolio" variant="ghost" size="sm">
            Voir tous les projets
          </Button>
        </div>

        <div className={styles.portfolio__grid}>
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              className={styles.portfolio__card}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.8,
                delay: (idx % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/portfolio#${project.id}`}
                className={styles.portfolio__link}
                aria-label={`Découvrir le projet ${project.title}`}
              >
                <div className={styles.portfolio__visual}>
                  <ProjectMockup
                    accent={project.accent}
                    category={project.category}
                    label={project.title}
                  />
                  <div className={styles.portfolio__overlay}>
                    <span className={styles.portfolio__overlayCta}>
                      Voir le projet
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className={styles.portfolio__meta}>
                  <div className={styles.portfolio__metaTop}>
                    <span className={styles.portfolio__category}>
                      {project.category}
                    </span>
                    <span className={styles.portfolio__year}>{project.year}</span>
                  </div>
                  <h3 className={styles.portfolio__title}>{project.title}</h3>
                  <p className={styles.portfolio__description}>
                    {project.description}
                  </p>
                  <ul className={styles.portfolio__tags}>
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag tone="neutral">{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
