import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';

import styles from './ServicesFaq.module.scss';

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
      "Notre équipe est principalement à distance, avec des temps présentiels stratégiques (ateliers, démos majeures). Nous travaillons sereinement avec des clients en France, en Europe et en Afrique.",
  },
  {
    question: 'Quels sont vos tarifs ?',
    answer:
      "Nos missions démarrent à 12 000 € pour un site vitrine premium, 45 000 € pour un MVP SaaS. Nous co-construisons la solution la plus adaptée à votre budget lors d'un premier échange.",
  },
];

export function ServicesFaq() {
  return (
    <Section tone="subtle" size="lg" id="faq" className={styles.servicesFaq}>
      <Container>
        <div className={styles.servicesFaq__layout}>
          <header className={styles.servicesFaq__header}>
            <SectionSubTitle>Questions fréquentes</SectionSubTitle>
            <h2 className={styles.servicesFaq__title}>
              Tout ce que vous voulez savoir{' '}
              <span>avant de démarrer.</span>
            </h2>
            <div className={styles.servicesFaq__imageWrap}>
              <Image
                src="/faq.png"
                alt="Consultants Rock Digital en session de travail"
                width={640}
                height={420}
                className={styles.servicesFaq__image}
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </div>
          </header>

          <div className={`${styles.servicesFaq__tabContent} tab_content`} id="tab1">
            <div className={`${styles.servicesFaq__list} accordion`}>
            {faqs.map((item, idx) => (
              <details
                key={item.question}
                className={`${styles.servicesFaq__card} card`}
                open={idx === 0}
              >
                <summary className={`${styles.servicesFaq__cardHeader} card-header`}>
                  <span className={styles.servicesFaq__question}>{item.question}</span>
                </summary>
                <div className={`${styles.servicesFaq__cardBody} card-body`}>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
