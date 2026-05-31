import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './Badge.module.scss';

type BadgeTone = 'blue' | 'orange' | 'dark' | 'light' | 'outline';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  icon?: ReactNode;
  showDot?: boolean;
};

export function Badge({
  tone = 'blue',
  icon,
  showDot = true,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(styles.badge, styles[`badge--${tone}`], className)}
      {...rest}
    >
      {icon && (
        <span className={styles.badge__icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {showDot && <span className={styles.badge__dot} aria-hidden="true" />}
      <span className={styles.badge__label}>{children}</span>
    </span>
  );
}
