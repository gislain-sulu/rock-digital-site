import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './SectionHeading.module.scss';

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        styles.heading,
        styles[`heading--align-${align}`],
        styles[`heading--tone-${tone}`],
        className
      )}
    >
      {kicker && (
        <p className={styles.heading__kicker}>
          <span className={styles.heading__kickerDot} aria-hidden="true" />
          {kicker}
        </p>
      )}
      <Tag className={styles.heading__title}>{title}</Tag>
      {description && (
        <p className={styles.heading__description}>{description}</p>
      )}
    </header>
  );
}
