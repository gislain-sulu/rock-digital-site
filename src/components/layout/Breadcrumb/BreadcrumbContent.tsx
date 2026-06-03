'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import type { BreadcrumbItem } from './Breadcrumb';
import { useBreadcrumbEntrance } from './useBreadcrumbEntrance';
import styles from './Breadcrumb.module.scss';

type BreadcrumbContentProps = {
  title: string;
  items: BreadcrumbItem[];
};

export function BreadcrumbContent({ title, items }: BreadcrumbContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(true);
  }, []);

  useBreadcrumbEntrance(contentRef, ready);

  return (
    <div ref={contentRef} className={styles.breadcrumbArea__content}>
      <h1
        className={styles.breadcrumbArea__title}
        suppressHydrationWarning
      >
        {title}
      </h1>
      <nav aria-label="Fil d'Ariane">
        <ol className={styles.breadcrumbArea__list} suppressHydrationWarning>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <span className={styles.breadcrumbArea__sep} aria-hidden="true">
                  &lt;
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
