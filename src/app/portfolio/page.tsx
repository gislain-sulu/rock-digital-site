import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CTA } from '@/sections/CTA';
import { createMetadata } from '@/lib/seo';

import { PortfolioGrid } from './PortfolioGrid';
import styles from './portfolio.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'Réalisations',
  description:
    'Découvrez les projets digitaux que nous avons conçus et développés pour nos clients : sites web, applications mobiles, plateformes SaaS et transformations digitales.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        kicker="Réalisations"
        title="Des projets pensés pour durer, livrés avec soin."
        description="Une sélection de produits digitaux conçus avec nos clients. Filtrer par catégorie pour explorer notre savoir-faire."
      />

      <Section tone="light" size="lg">
        <Container>
          <PortfolioGrid />
        </Container>
      </Section>

      <Section tone="subtle" size="md">
        <Container>
          <div className={styles.testimonialsLine}>
            <p className={styles.testimonialsLine__kicker}>Approche</p>
            <p className={styles.testimonialsLine__quote}>
              Chaque projet commence par une promesse simple :{' '}
              <span>livrer un produit dont nous sommes fiers</span>, en
              respectant le budget, le délai et l'ambition.
            </p>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
