import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

import styles from './legal.module.scss';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section tone="light" size="lg" className={styles.legal}>
      <Container size="lg">
        <article className={styles.legal__article}>{children}</article>
      </Container>
    </Section>
  );
}
