'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { processSteps } from '@/lib/content';

import styles from './Process.module.scss';

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 40%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section tone="light" size="lg" id="process">
      <Container>
        <div className={styles.process__header}>
          <SectionSubTitle>Notre méthode</SectionSubTitle>
          <SectionHeading
            title={
              <>
                Une approche éprouvée,{' '}
                <span className="u-text-gradient-blue">six étapes claires.</span>
              </>
            }
            description="De la découverte à l'optimisation continue, nous structurons chaque mission pour livrer un produit solide, mesurable et désirable."
            align="left"
            className={styles.process__heading}
          />
        </div>

        <div className={styles.process} ref={ref}>
          <div className={styles.process__rail} aria-hidden="true">
            <motion.div
              className={styles.process__progress}
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol className={styles.process__list}>
            {processSteps.map((step, idx) => (
              <motion.li
                key={step.number}
                className={styles.process__item}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.process__node} aria-hidden="true">
                  <span className={styles.process__nodeInner}>
                    {step.number}
                  </span>
                </div>
                <article className={styles.process__card}>
                  <h3 className={styles.process__title}>{step.title}</h3>
                  <p className={styles.process__description}>
                    {step.description}
                  </p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
