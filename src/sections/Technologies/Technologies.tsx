'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import {
  hasTechnologyIcon,
  TechnologyIcon,
} from '@/components/icons/TechnologyIcons';
import { technologies, type Technology } from '@/lib/content';

import styles from './Technologies.module.scss';

const MARQUEE_ROW_COUNT = 3;
const MIDDLE_MARQUEE_ROW_INDEX = Math.floor(MARQUEE_ROW_COUNT / 2);

const technologiesWithIcons = technologies.filter((tech) =>
  hasTechnologyIcon(tech.name)
);

function buildMarqueeRowItems(rowIndex: number): Technology[] {
  const offset = rowIndex % technologiesWithIcons.length;
  const rotated = [
    ...technologiesWithIcons.slice(offset),
    ...technologiesWithIcons.slice(0, offset),
  ];
  return [...rotated, ...rotated];
}

export function Technologies() {
  const marqueeRows = useMemo(
    () =>
      Array.from({ length: MARQUEE_ROW_COUNT }, (_, rowIndex) =>
        buildMarqueeRowItems(rowIndex)
      ),
    []
  );

  return (
    <Section tone="subtle" size="lg" id="technologies" className={styles.techSection}>
      <Container>
        <SectionSubTitle className={styles.tech__kicker}>
          Stack technique
        </SectionSubTitle>
        <SectionHeading
          title={
            <>
              Des technologies modernes,{' '}
              <span className="u-text-gradient-blue">choisies avec soin.</span>
            </>
          }
          description="Nous sélectionnons un stack pragmatique, éprouvé en production, optimisé pour la performance, la maintenabilité et la scalabilité."
          align="center"
        />
      </Container>

      <div className={styles.tech__marqueeWrap} aria-hidden="true">
        {marqueeRows.map((rowItems, rowIndex) => {
          const reverse = rowIndex === MIDDLE_MARQUEE_ROW_INDEX;
          const duration = 30 + (rowIndex % 7) * 2;

          return (
            <div key={`marquee-row-${rowIndex}`} className={styles.tech__marquee}>
              <motion.ul
                className={styles.tech__track}
                animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
                transition={{ ease: 'linear', duration, repeat: Infinity }}
              >
                {rowItems.map((tech, idx) => (
                  <li
                    key={`${rowIndex}-${tech.name}-${idx}`}
                    className={styles.tech__item}
                    title={tech.name}
                  >
                    <TechnologyIcon
                      name={tech.name}
                      className={styles.tech__icon}
                    />
                  </li>
                ))}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
