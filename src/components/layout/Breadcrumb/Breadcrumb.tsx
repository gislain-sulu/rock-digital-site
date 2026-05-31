import Link from 'next/link';

import { Container } from '@/components/ui/Container';

import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  title: string;
  items: BreadcrumbItem[];
};

export function Breadcrumb({ title, items }: BreadcrumbProps) {
  return (
    <section className={styles.breadcrumbArea} aria-label="Fil d'Ariane">
      <Container>
        <div className={styles.breadcrumbArea__content}>
          <h1 className={styles.breadcrumbArea__title}>{title}</h1>
          <nav aria-label="Fil d'Ariane">
            <ol className={styles.breadcrumbArea__list}>
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
      </Container>
    </section>
  );
}
