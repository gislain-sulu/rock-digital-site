import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './RockDigitalButton.module.scss';

type RockDigitalButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  linkClassName?: string;
  variant?: 'default' | 'dark' | 'outline' | 'plain';
  hoverEffect?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

export function RockDigitalButton({
  href,
  children,
  className,
  linkClassName,
  variant = 'default',
  hoverEffect = true,
  icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  onClick,
}: RockDigitalButtonProps) {
  const withOverlay = hoverEffect && (variant === 'default' || variant === 'dark');
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={styles['rock-digital-btn__icon']} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles['rock-digital-btn__label']}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles['rock-digital-btn__icon']} aria-hidden="true">
          {icon}
        </span>
      )}
      {withOverlay && (
        <>
          <div className={`${styles['rock-digital-hover-btn']} ${styles.hoverBx}`} aria-hidden="true" />
          <div className={`${styles['rock-digital-hover-btn']} ${styles.hoverBx2}`} aria-hidden="true" />
          <div className={`${styles['rock-digital-hover-btn']} ${styles.hoverBx3}`} aria-hidden="true" />
          <div className={`${styles['rock-digital-hover-btn']} ${styles.hoverBx4}`} aria-hidden="true" />
        </>
      )}
    </>
  );

  return (
    <div className={cn(styles['rock-digital-btn'], className)}>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className={cn(
            styles['rock-digital-btn__link'],
            styles[`rock-digital-btn__link--${variant}`],
            !hoverEffect && styles['rock-digital-btn__link--noHoverFx'],
            linkClassName
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={cn(
            styles['rock-digital-btn__link'],
            styles[`rock-digital-btn__link--${variant}`],
            !hoverEffect && styles['rock-digital-btn__link--noHoverFx'],
            linkClassName
          )}
        >
          {content}
        </button>
      )}
    </div>
  );
}
