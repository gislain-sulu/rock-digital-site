import type { Metadata } from 'next';

import { MountainFacets } from '@/components/brand/MountainFacets';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { createMetadata } from '@/lib/seo';

import styles from './not-found.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'Page introuvable',
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <Container>
        <div className={styles.notFound__inner}>
          <p className={styles.notFound__kicker}>Erreur 404</p>
          <h1 className={styles.notFound__title}>
            Cette page s'est égarée{' '}
            <span className="u-text-gradient-blue">dans la montagne.</span>
          </h1>
          <p className={styles.notFound__lead}>
            Le contenu que vous recherchez est introuvable ou a été déplacé.
            Revenons à votre fondation digitale.
          </p>
          <div className={styles.notFound__actions}>
            <Button href="/" variant="primary" size="lg">
              Retour à l'accueil
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Nous contacter
            </Button>
          </div>
        </div>
        <div className={styles.notFound__visual} aria-hidden="true">
          <MountainFacets variant="light" />
        </div>
      </Container>
    </section>
  );
}
