'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ProjectMockup } from '@/components/brand/ProjectMockup';
import { Tag } from '@/components/ui/Tag';
import { projects } from '@/lib/content';
import { cn } from '@/utils/cn';

import styles from './portfolio.module.scss';

type Filter = 'all' | string;

export function PortfolioGrid() {
  const categories = useMemo(() => {
    const uniques = Array.from(new Set(projects.map((p) => p.category)));
    return ['all', ...uniques] as Filter[];
  }, []);

  const [filter, setFilter] = useState<Filter>('all');
  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter]
  );

  return (
    <div className={styles.grid}>
      <div
        className={styles.grid__filters}
        role="tablist"
        aria-label="Filtrer les projets par catégorie"
      >
        {categories.map((category) => {
          const isActive = category === filter;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(category)}
              className={cn(
                styles.grid__filter,
                isActive && styles['grid__filter--active']
              )}
            >
              {category === 'all' ? 'Tous les projets' : category}
            </button>
          );
        })}
      </div>

      <motion.div className={styles.grid__items} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              className={styles.grid__card}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`#${project.id}`}
                id={project.id}
                className={styles.grid__cardLink}
              >
                <div className={styles.grid__cardVisual}>
                  <ProjectMockup
                    accent={project.accent}
                    label={project.title}
                    category={project.category}
                  />
                </div>
                <div className={styles.grid__cardBody}>
                  <div className={styles.grid__cardMeta}>
                    <span className={styles.grid__cardCategory}>
                      {project.category}
                    </span>
                    <span className={styles.grid__cardYear}>{project.year}</span>
                  </div>
                  <h3 className={styles.grid__cardTitle}>{project.title}</h3>
                  <p className={styles.grid__cardDescription}>
                    {project.description}
                  </p>
                  <ul className={styles.grid__cardTags}>
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
