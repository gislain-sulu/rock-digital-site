'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

import styles from './not-found.module.scss';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('App error:', error);
    }
  }, [error]);

  return (
    <section className={styles.notFound}>
      <Container>
        <div className={styles.notFound__inner}>
          <p className={styles.notFound__kicker}>Erreur inattendue</p>
          <h1 className={styles.notFound__title}>
            Quelque chose s'est{' '}
            <span className="u-text-gradient-blue">légèrement effondré.</span>
          </h1>
          <p className={styles.notFound__lead}>
            Notre équipe a été notifiée. Réessayez ou contactez-nous si le
            problème persiste.
          </p>
          <div className={styles.notFound__actions}>
            <Button onClick={reset} variant="primary" size="lg">
              Réessayer
            </Button>
            <Button href="/" variant="ghost" size="lg">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
