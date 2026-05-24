import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './CTAButton.module.scss';

type CTAButtonProps = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export function CTAButton({
  href,
  variant = 'primary',
  children,
  className,
  showArrow = variant === 'primary',
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(styles.cta, styles[`cta--${variant}`], className)}
    >
      <span>{children}</span>
      {showArrow && <span className={styles.cta__icon}>{arrowIcon}</span>}
    </Link>
  );
}
