import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { aboutWhyChooseItems } from '@/lib/aboutPageContent';
import { cn } from '@/utils/cn';

import styles from './AboutValues.module.scss';

function FeatureIcon({
  variant,
  tone,
}: {
  variant: 'design' | 'tech' | 'team' | 'support';
  tone: 'blue' | 'orange';
}) {
  const className = cn(
    styles.aboutValues__featureIcon,
    tone === 'blue' && styles['aboutValues__featureIcon--blue'],
    tone === 'orange' && styles['aboutValues__featureIcon--orange']
  );

  const icons = {
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 20h16M12 4l6 6-8 8H8v-4l8-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tech: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    team: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" strokeLinecap="round" />
      </svg>
    ),
    support: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 14a8 8 0 0 1 16 0v3a2 2 0 0 1-2 2h-1v-4" strokeLinecap="round" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span className={className} aria-hidden="true">
      {icons[variant]}
    </span>
  );
}

export function AboutValues() {
  return (
    <Section tone="subtle" size="lg" id="valeurs" className={styles.aboutValues}>
      <Container>
        <div className={styles.aboutValues__shell}>
          <aside className={styles.aboutValues__panel} aria-labelledby="about-why-title">
            <p className={styles.aboutValues__kicker}>Pourquoi nous choisir ?</p>
            <h2 id="about-why-title" className={styles.aboutValues__panelTitle}>
              Votre succès, notre mission
            </h2>
            <span className={styles.aboutValues__accentLine} aria-hidden="true" />
            <p className={styles.aboutValues__panelLead}>
              Nous combinons créativité, technologie et stratégie pour livrer des
              solutions digitales qui génèrent des résultats concrets.
            </p>
            <span className={styles.aboutValues__panelDecor} aria-hidden="true" />
          </aside>

          <div className={styles.aboutValues__grid}>
            {aboutWhyChooseItems.map((item) => (
              <article key={item.title} className={styles.aboutValues__feature}>
                <FeatureIcon variant={item.icon} tone={item.tone} />
                <div className={styles.aboutValues__featureBody}>
                  <h3 className={styles.aboutValues__featureTitle}>{item.title}</h3>
                  <p className={styles.aboutValues__featureText}>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
