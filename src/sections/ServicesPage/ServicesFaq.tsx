'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

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
  const layoutRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      const layout = layoutRef.current;
      if (!layout) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const header = layout.querySelector('[class*="servicesFaq__header"]');
      const imageWrap = layout.querySelector('[class*="servicesFaq__imageWrap"]');
      const cards = layout.querySelectorAll('[class*="servicesFaq__card"], details');

      if (header) {
        gsap.from(header, {
          y: 36,
          autoAlpha: 0,
          duration: 0.95,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: layout,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      if (imageWrap) {
        gsap.from(imageWrap, {
          clipPath: 'inset(0 100% 0 0)',
          autoAlpha: 0,
          duration: 1.05,
          ease: GSAP_EASE.expo,
          clearProps: 'clip-path,opacity,visibility',
          scrollTrigger: {
            trigger: layout,
            start: 'top 82%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: layout,
            start: 'top 82%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: layoutRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <Section tone="subtle" size="lg" id="faq" className={styles.servicesFaq}>
      <Container>
        <div ref={layoutRef} className={styles.servicesFaq__layout}>
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
                  open={openIndex === idx}
                >
                  <summary
                    className={`${styles.servicesFaq__cardHeader} card-header`}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenIndex((current) => (current === idx ? null : idx));
                    }}
                  >
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
