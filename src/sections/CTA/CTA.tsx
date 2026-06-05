'use client';

import { AddressIcon, EmailIcon, PhoneIcon } from '@/components/icons/ContactIcons';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { Container } from '@/components/ui/Container';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { contactInfo, contactLinks } from '@/lib/contact';

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

const metaItems = [
  {
    icon: PhoneIcon,
    label: 'Téléphone',
    value: contactInfo.phone,
    href: contactLinks.phone,
  },
  {
    icon: EmailIcon,
    label: 'Email',
    value: contactInfo.email,
    href: contactLinks.email,
  },
  {
    icon: AddressIcon,
    label: 'Adresse',
    value: contactInfo.address,
  },
] as const;

export function CTA() {
  return (
    <Section tone="light" size="lg" id="contact" className={styles.ctaSection}>
      <Container className={styles.ctaSection__layout}>
        <StaggerGroup className={styles.ctaSection__mainGroup} stagger={0.12}>
          <StaggerItem className={styles.ctaSection__main}>
            <SectionSubTitle className={styles.ctaSection__eyebrow}>
              Contact
            </SectionSubTitle>

            <h2 className={styles.ctaSection__title}>
              Construisons ensemble la{' '}
              <span className="u-text-gradient-blue">fondation digitale</span>{' '}
              de demain.
            </h2>

            <p className={styles.ctaSection__lead}>
              Parlons de votre site, application ou plateforme. Deux parcours :
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

        <FadeIn y={32} delay={0.1} className={styles.ctaSection__metaWrap}>
          <aside className={styles.ctaSection__meta} aria-label="Coordonnées">
            <h3 className={styles.ctaSection__metaTitle}>Contact</h3>

            <div className={styles.ctaSection__metaList}>
              {metaItems.map(({ icon: Icon, label, value, ...rest }) => (
                <div key={label} className={styles.ctaSection__metaItem}>
                  <span
                    className={styles.ctaSection__metaIcon}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                  <div className={styles.ctaSection__metaContent}>
                    <span className={styles.ctaSection__metaLabel}>{label}</span>
                    {'href' in rest && rest.href ? (
                      <a href={rest.href} className={styles.ctaSection__metaValue}>
                        {value}
                      </a>
                    ) : (
                      <span className={styles.ctaSection__metaValue}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </FadeIn>
      </Container>
    </Section>
  );
}
