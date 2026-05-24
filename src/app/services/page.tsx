import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';
import { ServiceIcon } from '@/components/icons/ServiceIcons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FadeIn } from '@/components/motion/FadeIn';
import { CTA } from '@/sections/CTA';
import { Process } from '@/sections/Process';
import { services } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

import styles from './services.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'Services',
  description:
    'Conseil, design, développement, SaaS, transformation digitale, automatisation, branding — découvrez l\u2019ensemble des services de Rock Digital.',
  path: '/services',
});

const faqs = [
  {
    question: 'Quel est le délai moyen pour un projet ?',
    answer:
      "Selon la complexité, comptez 4 à 12 semaines pour un site, 3 à 6 mois pour une application SaaS ou mobile. Nous calons précisément le planning lors de la phase Découverte.",
  },
  {
    question: 'Comment se déroule la collaboration ?',
    answer:
      "Vous avez un interlocuteur dédié et une équipe pluridisciplinaire (stratégie, design, ingénierie). Sprints courts, démos hebdomadaires, transparence totale via vos outils ou les nôtres.",
  },
  {
    question: 'Travaillez-vous avec des startups ou uniquement des grands comptes ?',
    answer:
      "Les deux. Nos missions vont du MVP startup à la transformation de groupes industriels. Nous adaptons l'engagement et la gouvernance à votre contexte.",
  },
  {
    question: 'Proposez-vous de la maintenance après livraison ?',
    answer:
      "Oui. Nous proposons des contrats de maintenance évolutive (corrective + roadmap) avec SLA, monitoring et reporting mensuel.",
  },
  {
    question: 'Travaillez-vous à distance ou en présentiel ?',
    answer:
      "Notre équipe est principalement à distance, avec des temps présentiels stratégiques (ateliers, démos majeures). Nous travaillons sereinement avec des clients en France, en Europe et en Amérique du Nord.",
  },
  {
    question: 'Quels sont vos tarifs ?',
    answer:
      "Nos missions démarrent à 12 000 € pour un site vitrine premium, 45 000 € pour un MVP SaaS. Nous co-construisons la solution la plus adaptée à votre budget lors d'un premier échange.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Nos services"
        title="L'expertise complète d'une agence digitale premium."
        description="Du conseil au développement, du design au déploiement. Sept domaines d'expertise, une seule équipe, une approche cohérente."
      >
        <div className={styles.services__heroActions}>
          <Button href="/contact" variant="primary" size="md">
            Discuter de votre projet
          </Button>
          <Button href="#offer-list" variant="ghost" size="md">
            Voir les services
          </Button>
        </div>
      </PageHeader>

      <Section tone="light" size="lg" id="offer-list">
        <Container>
          <div className={styles.services__list}>
            {services.map((service, idx) => (
              <FadeIn key={service.id} delay={(idx % 3) * 0.08}>
                <article
                  id={service.id}
                  className={styles.services__row}
                  data-reverse={idx % 2 === 1}
                >
                  <div className={styles.services__rowMedia} aria-hidden="true">
                    <div className={styles.services__iconCard}>
                      <ServiceIcon
                        name={service.icon}
                        className={styles.services__rowIcon}
                      />
                      <span className={styles.services__rowNumber}>
                        {service.number}
                      </span>
                    </div>
                  </div>
                  <div className={styles.services__rowBody}>
                    <Badge tone="blue">{`Service ${service.number}`}</Badge>
                    <h2 className={styles.services__rowTitle}>
                      {service.title}
                    </h2>
                    <p className={styles.services__rowDescription}>
                      {service.description}
                    </p>
                    <ul className={styles.services__rowBullets}>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>
                          <span aria-hidden="true">→</span> {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.services__rowActions}>
                      <Button
                        href="/contact"
                        size="sm"
                        variant="ghost"
                      >
                        Démarrer ce service
                      </Button>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Process />

      <Section tone="subtle" size="lg" id="faq">
        <Container>
          <div className={styles.faq}>
            <header className={styles.faq__header}>
              <p className={styles.faq__kicker}>Questions fréquentes</p>
              <h2 className={styles.faq__title}>
                Tout ce que vous voulez savoir{' '}
                <span className="u-text-gradient-blue">avant de démarrer.</span>
              </h2>
            </header>
            <div className={styles.faq__list}>
              {faqs.map((item, idx) => (
                <details
                  key={item.question}
                  className={styles.faq__item}
                  open={idx === 0}
                >
                  <summary className={styles.faq__summary}>
                    <span>{item.question}</span>
                    <span className={styles.faq__icon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles.faq__body}>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
