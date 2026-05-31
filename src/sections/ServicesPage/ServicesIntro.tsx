import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';

import styles from './ServicesIntro.module.scss';

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export function ServicesIntro() {
  return (
    <section className={styles.servicesIntro} aria-labelledby="services-intro-title">
      <Container>
        <div className={styles.servicesIntro__inner}>
          <header className={styles.servicesIntro__header}>
            <SectionSubTitle>Nos services</SectionSubTitle>
            <h2 id="services-intro-title" className={styles.servicesIntro__title}>
              L&apos;expertise complète d&apos;une agence{' '}
              <span>digitale premium.</span>
            </h2>
            <p className={styles.servicesIntro__lead}>
              Du conseil au développement, du design au déploiement — sept domaines
              d&apos;expertise, une seule équipe, une approche cohérente de bout en
              bout.
            </p>
          </header>

          <div className={styles.servicesIntro__actions}>
            <RockDigitalButton href="/contact" icon={arrowIcon} iconPosition="right">
              Discuter de votre projet
            </RockDigitalButton>
            <RockDigitalButton href="#offer-list" variant="outline">
              Voir les offres
            </RockDigitalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
