import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';

import styles from './AboutCareers.module.scss';

export function AboutCareers() {
  return (
    <Section tone="light" size="md" id="carrieres" className={styles.aboutCareers}>
      <Container>
        <div className={styles.aboutCareers__panel}>
          <div className={styles.aboutCareers__content}>
            <SectionSubTitle>Carrières</SectionSubTitle>
            <h2 className={styles.aboutCareers__title}>
              Vous voulez <span>construire avec nous ?</span>
            </h2>
            <p className={styles.aboutCareers__lead}>
              Nous recrutons en permanence des designers, ingénieurs et stratèges
              seniors qui aiment construire des produits soignés.
            </p>
          </div>

          <RockDigitalButton href="mailto:careers@rockdigital.com">
            Voir les opportunités
          </RockDigitalButton>
        </div>
      </Container>
    </Section>
  );
}
