import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { aboutTeam } from '@/lib/aboutPageContent';

import styles from './AboutTeam.module.scss';

export function AboutTeam() {
  return (
    <Section tone="subtle" size="lg" id="equipe" className={styles.aboutTeam}>
      <Container>
        <header className={styles.aboutTeam__header}>
          <SectionSubTitle>Notre équipe</SectionSubTitle>
          <h2 className={styles.aboutTeam__title}>
            Une équipe senior,{' '}
            <span>intégrée, sans intermédiaires.</span>
          </h2>
        </header>

        <StaggerGroup className={styles.aboutTeam__grid} stagger={0.06}>
          {aboutTeam.map((member) => (
            <StaggerItem key={member.name} as="article" className={styles.aboutTeam__card}>
              <span className={styles.aboutTeam__avatar} aria-hidden="true">
                {member.initials}
              </span>
              <h3 className={styles.aboutTeam__name}>{member.name}</h3>
              <p className={styles.aboutTeam__role}>{member.role}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
