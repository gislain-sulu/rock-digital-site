import Link from 'next/link';

import { ServiceIcon } from '@/components/icons/ServiceIcons';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { services } from '@/lib/content';

import styles from './Services.module.scss';

export function Services() {
  return (
    <Section tone="subtle" size="lg" id="services">
      <Container>
        <SectionHeading
          kicker="Nos services"
          title={
            <>
              Un partenaire complet pour
              <br />
              chaque étape de votre{' '}
              <span className="u-text-gradient-blue">croissance</span>
            </>
          }
          description="Du conseil stratégique au développement, en passant par le design et l'automatisation, Rock Digital couvre l'ensemble de votre chaîne de valeur digitale."
          align="left"
          className={styles.services__heading}
        />

        <StaggerGroup className={styles.services__grid} stagger={0.07}>
          {services.map((service) => (
            <StaggerItem
              key={service.id}
              as="article"
              className={styles.services__card}
            >
              <div className={styles.services__cardInner}>
                <div className={styles.services__top}>
                  <span className={styles.services__number}>
                    {service.number}
                  </span>
                  <span className={styles.services__iconWrap} aria-hidden="true">
                    <ServiceIcon
                      name={service.icon}
                      className={styles.services__icon}
                    />
                  </span>
                </div>
                <div className={styles.services__body}>
                  <h3 className={styles.services__title}>{service.title}</h3>
                  <p className={styles.services__description}>
                    {service.description}
                  </p>
                  <ul className={styles.services__bullets}>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span aria-hidden="true">→</span> {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/services#${service.id}`}
                  className={styles.services__link}
                  aria-label={`En savoir plus sur ${service.title}`}
                >
                  En savoir plus
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
