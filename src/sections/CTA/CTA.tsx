import { MountainFacets } from '@/components/brand/MountainFacets';
import { PixelGrid } from '@/components/brand/PixelGrid';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FadeIn } from '@/components/motion/FadeIn';
import { siteConfig } from '@/lib/seo';

import styles from './CTA.module.scss';

export function CTA() {
  return (
    <Section tone="dark" size="lg" className={styles.cta} id="cta">
      <div className={styles.cta__bg} aria-hidden="true">
        <PixelGrid variant="dark" density="high" />
        <div className={styles.cta__mountain}>
          <MountainFacets variant="dark" animated={false} />
        </div>
      </div>

      <Container>
        <div className={styles.cta__inner}>
          <FadeIn>
            <p className={styles.cta__kicker}>
              <span aria-hidden="true">★</span> Prêt à construire votre prochain produit ?
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className={styles.cta__title}>
              Construisons ensemble{' '}
              <span className={styles.cta__titleAccent}>
                la fondation digitale de demain.
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className={styles.cta__lead}>
              Un projet ? Une idée ? Une transformation à entreprendre ?
              Échangeons 30 minutes pour évaluer ensemble la meilleure voie.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className={styles.cta__actions}>
              <Button href="/contact" variant="primary" size="lg">
                Démarrer un projet
              </Button>
              <Button
                href={`mailto:${siteConfig.email}`}
                external
                variant="light"
                size="lg"
              >
                Écrire à l'équipe
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className={styles.cta__meta}>
              <div>
                <span className={styles.cta__metaLabel}>Email</span>
                <a
                  className={styles.cta__metaValue}
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <span className={styles.cta__metaLabel}>Téléphone</span>
                <a
                  className={styles.cta__metaValue}
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <span className={styles.cta__metaLabel}>Localisation</span>
                <span className={styles.cta__metaValue}>
                  {siteConfig.address}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
