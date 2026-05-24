import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

import styles from './ValueProps.module.scss';

type Value = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const values: Value[] = [
  {
    title: 'Solidité',
    description:
      'Une architecture pensée pour durer. Tests, monitoring, sécurité — fondations sans compromis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21V9l9-6 9 6v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description:
      'Veille permanente, expérimentations maîtrisées. Nous adoptons ce qui rend votre produit meilleur.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v3M4.93 4.93l2.12 2.12M2 12h3M4.93 19.07l2.12-2.12M12 22v-3M19.07 19.07l-2.12-2.12M22 12h-3M19.07 4.93l-2.12 2.12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    description:
      'Du temps de chargement aux conversions : nous mesurons, nous itérons, nous accélérons votre produit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 1 18 0" strokeLinecap="round" />
        <path d="M12 12L8 8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Expertise',
    description:
      'Designers, ingénieurs, stratèges. Une équipe senior intégrée, sans intermédiaires.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ValueProps() {
  return (
    <Section tone="light" size="md" id="values" className={styles.valuesSection}>
      <Container>
        <StaggerGroup className={styles.values} stagger={0.08}>
          {values.map((value) => (
            <StaggerItem key={value.title} as="article" className={styles.values__card}>
              <span className={styles.values__icon} aria-hidden="true">
                {value.icon}
              </span>
              <h3 className={styles.values__title}>{value.title}</h3>
              <p className={styles.values__description}>{value.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
