import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';

import styles from './AboutIntro.module.scss';

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

export function AboutIntro() {
  return (
    <section className={styles.aboutIntro} aria-labelledby="about-intro-title">
      <Container>
        <div className={styles.aboutIntro__inner}>
          <header className={styles.aboutIntro__header}>
            <SectionSubTitle>À propos</SectionSubTitle>
            <h2 id="about-intro-title" className={styles.aboutIntro__title}>
              Une équipe d&apos;artisans du digital,{' '}
              <span>passionnée par l&apos;impact.</span>
            </h2>
            <p className={styles.aboutIntro__lead}>
              Depuis 10 ans, nous accompagnons des entreprises ambitieuses dans la
              conception et le développement de produits digitaux solides,
              élégants et performants.
            </p>
          </header>

          <div className={styles.aboutIntro__actions}>
            <RockDigitalButton href="/contact" icon={arrowIcon} iconPosition="right">
              Travaillons ensemble
            </RockDigitalButton>
            <RockDigitalButton href="#carrieres" variant="outline">
              Nous rejoindre
            </RockDigitalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
