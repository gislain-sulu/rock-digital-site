import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { siteConfig, createMetadata } from '@/lib/seo';

import { ContactForm } from './ContactForm';
import styles from './contact.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    "Échangeons sur votre projet digital. L'équipe Rock Digital répond sous 24h ouvrées.",
  path: '/contact',
});

const reasons = [
  {
    title: 'Réponse rapide',
    description: 'Notre équipe revient vers vous sous 24h ouvrées maximum.',
  },
  {
    title: 'Premier appel offert',
    description: '30 minutes d\u2019échange pour cadrer ensemble votre besoin.',
  },
  {
    title: 'Confidentialité',
    description: "NDA possible dès la première discussion. Vos infos restent privées.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Parlons de votre prochain projet digital."
        description="Un projet à lancer, une question, une transformation à entreprendre ? Quelques lignes suffisent pour démarrer."
      />

      <Section tone="light" size="lg">
        <Container>
          <div className={styles.contact}>
            <aside className={styles.contact__aside}>
              <div className={styles.contact__panel}>
                <p className={styles.contact__kicker}>Coordonnées</p>
                <ul className={styles.contact__list}>
                  <li>
                    <span>Email</span>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </li>
                  <li>
                    <span>Téléphone</span>
                    <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li>
                    <span>Localisation</span>
                    <p>{siteConfig.address}</p>
                  </li>
                </ul>
              </div>

              <ul className={styles.contact__reasons}>
                {reasons.map((reason, idx) => (
                  <li key={reason.title}>
                    <span className={styles.contact__reasonNum}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <div className={styles.contact__formWrap}>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
