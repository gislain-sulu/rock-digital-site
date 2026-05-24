import { type ReactNode } from 'react';

import { PixelGrid } from '@/components/brand/PixelGrid';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { SplitText } from '@/components/motion/SplitText';

import styles from './PageHeader.module.scss';

type PageHeaderProps = {
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({
  kicker,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className={styles.header} aria-labelledby="page-title">
      <div className={styles.header__bg} aria-hidden="true">
        <PixelGrid variant="mixed" density="low" />
        <div className={styles.header__gradient} />
      </div>
      <Container>
        <div className={styles.header__inner}>
          {kicker && (
            <FadeIn>
              <p className={styles.header__kicker}>
                <span aria-hidden="true" /> {kicker}
              </p>
            </FadeIn>
          )}
          <h1 id="page-title" className={styles.header__title}>
            <SplitText text={title} splitBy="word" stagger={0.04} delay={0.05} />
          </h1>
          {description && (
            <FadeIn delay={0.25}>
              <p className={styles.header__description}>{description}</p>
            </FadeIn>
          )}
          {children && <div className={styles.header__extra}>{children}</div>}
        </div>
      </Container>
    </section>
  );
}
