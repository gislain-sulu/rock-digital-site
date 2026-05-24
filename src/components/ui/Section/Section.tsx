import { type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Section.module.scss';

type SectionTone = 'light' | 'subtle' | 'soft' | 'deep' | 'dark';
type SectionSize = 'sm' | 'md' | 'lg';

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
  size?: SectionSize;
  id?: string;
};

export function Section({
  tone = 'light',
  size = 'md',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        styles.section,
        styles[`section--tone-${tone}`],
        styles[`section--size-${size}`],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
