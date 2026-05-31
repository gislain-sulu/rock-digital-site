import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { aboutMilestones } from '@/lib/aboutPageContent';

import styles from './AboutHistory.module.scss';

export function AboutHistory() {
  return (
    <Section tone="light" size="lg" id="histoire" className={styles.aboutHistory}>
      <Container>
        <header className={styles.aboutHistory__header}>
          <SectionSubTitle>Notre histoire</SectionSubTitle>
          <h2 className={styles.aboutHistory__title}>
            Dix années d&apos;innovations,{' '}
            <span>une trajectoire claire.</span>
          </h2>
        </header>

        <StaggerGroup className={styles.aboutHistory__grid} stagger={0.07}>
          {aboutMilestones.map((step) => (
            <StaggerItem key={step.year} as="article" className={styles.aboutHistory__card}>
              <span className={styles.aboutHistory__year}>{step.year}</span>
              <h3 className={styles.aboutHistory__cardTitle}>{step.title}</h3>
              <p className={styles.aboutHistory__cardText}>{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
