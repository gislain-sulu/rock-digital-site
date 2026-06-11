'use client';

import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import styles from './CTA.module.scss';

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export function CTA() {
  return (
    <Section tone="light" size="lg" id="contact" className={styles.ctaSection}>
      <Container className={styles.ctaSection__layout}>
        <StaggerGroup className={styles.ctaSection__mainGroup} stagger={0.12}>
          <StaggerItem className={styles.ctaSection__main}>
            <h2 className={styles.ctaSection__title}>
              Construisons ensemble la{' '}
              <span className="u-text-gradient-blue">fondation digitale</span>{' '}
              de demain.
            </h2>

            <p className={styles.ctaSection__lead}>
              Parlons de votre site web ou application mobile, application ou plateforme. Deux parcours :
              une demande de devis structurée ou une discussion directe avec
              l&apos;équipe.
            </p>

            <div className={styles.ctaSection__actions}>
              <RockDigitalButton
                href="/contact"
                variant="default"
                icon={arrowIcon}
                iconPosition="right"
              >
                Démarrer un projet
              </RockDigitalButton>
              <RockDigitalButton href="/contact#devis" variant="outline">
                Demander un devis
              </RockDigitalButton>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </Section>
  );
}
