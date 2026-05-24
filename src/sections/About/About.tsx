import Image from 'next/image';

import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

import styles from './About.module.scss';

export function About() {
  return (
    <Section tone="light" size="lg" id="about" className={styles.about}>
      <div className={styles.about__inner}>
        <StaggerGroup className={styles.about__layout} stagger={0.08}>
          <StaggerItem as="div" className={styles.about__media}>
            <div className={styles.about__thumb}>
              <Image
                src="/about-thumb.png"
                alt="Equipe Rock Digital en action"
                width={640}
                height={640}
                className={styles.about__thumbImage}
              />
              <span className={styles.about__shape} aria-hidden="true" />
              <h4 className={styles.about__title}>Meilleure solution IT</h4>
            </div>
          </StaggerItem>

          <StaggerItem as="div" className={styles.about__content}>
            <header className={styles.about__heading}>
              <SectionSubTitle>Entreprise Solutek</SectionSubTitle>
              <h2 className={styles.about__mainTitle}>
                Des solutions IT essentielles pour
                <br />
                les <span>entreprises modernes.</span>
              </h2>
              <p className={styles.about__lead}>
                Nous concevons des infrastructures fiables et evolutives pour
                soutenir votre croissance digitale avec une execution premium.
              </p>
            </header>

            <div className={styles.about__feature}>
              <span className={styles.about__featureIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 17.5V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8.5" />
                  <path d="M3 17.5h18" />
                  <path d="M9.5 13.2l2 2 3-3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className={styles.about__featureTitle}>Solution basee sur le cloud</h3>
            </div>

            <p className={styles.about__text}>
              De la strategie au deploiement, nous unifions conseil, design et
              developpement pour livrer des produits performants et durables.
            </p>

            <div className={styles.about__actions}>
              <RockDigitalButton href="/about-us">En savoir plus</RockDigitalButton>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </Section>
  );
}
