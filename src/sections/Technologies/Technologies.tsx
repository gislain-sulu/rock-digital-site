'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { technologies } from '@/lib/content';

import styles from './Technologies.module.scss';

export function Technologies() {
  const marqueeItems = useMemo(() => [...technologies, ...technologies], []);

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
        <div className={styles.tech__marquee}>
          <motion.ul
            className={styles.tech__track}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 36, repeat: Infinity }}
          >
            {marqueeItems.map((tech, idx) => (
              <li key={`${tech.name}-${idx}`} className={styles.tech__item}>
                <span className={styles.tech__dot} />
                {tech.name}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}
