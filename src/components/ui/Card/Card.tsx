import {
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '@/utils/cn';

import styles from './Card.module.scss';

type CardTone = 'light' | 'dark' | 'soft' | 'outline';

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tone?: CardTone;
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Component = 'div',
  tone = 'light',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        styles.card,
        styles[`card--${tone}`],
        interactive && styles['card--interactive'],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
