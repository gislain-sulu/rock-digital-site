import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './RockDigitalButton.module.scss';

type RockDigitalButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  linkClassName?: string;
  variant?: 'default' | 'dark' | 'outline' | 'plain';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
};

export function RockDigitalButton({
  href,
  children,
  className,
  linkClassName,
  variant = 'default',
  icon,
  iconPosition = 'right',
}: RockDigitalButtonProps) {
  const withOverlay = variant === 'default' || variant === 'dark';

  return (
    <div className={cn(styles.solutekBtn, className)}>
      <Link
        href={href}
        className={cn(
          styles.solutekBtn__link,
          styles[`solutekBtn__link--${variant}`],
          linkClassName
        )}
      >
        {icon && iconPosition === 'left' && (
          <span className={styles.solutekBtn__icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.solutekBtn__label}>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className={styles.solutekBtn__icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {withOverlay && (
          <>
            <div className={`${styles.solutekHoverBtn} ${styles.hoverBx}`} aria-hidden="true" />
            <div className={`${styles.solutekHoverBtn} ${styles.hoverBx2}`} aria-hidden="true" />
            <div className={`${styles.solutekHoverBtn} ${styles.hoverBx3}`} aria-hidden="true" />
            <div className={`${styles.solutekHoverBtn} ${styles.hoverBx4}`} aria-hidden="true" />
          </>
        )}
      </Link>
    </div>
  );
}
