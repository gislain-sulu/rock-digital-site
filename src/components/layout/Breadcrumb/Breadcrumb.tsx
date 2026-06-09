import { Container } from '@/components/ui/Container';

import { BreadcrumbBackground } from './BreadcrumbBackground';
import { BreadcrumbContent } from './BreadcrumbContent';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  title: string;
  items: BreadcrumbItem[];
  
  backgroundImage?: string;
};

export function Breadcrumb({ title, items, backgroundImage }: BreadcrumbProps) {
  const areaClassName = backgroundImage
    ? `${styles.breadcrumbArea} ${styles.breadcrumbArea_hasImage}`
    : styles.breadcrumbArea;

  return (
    <section
      className={areaClassName}
      aria-label="Fil d'Ariane"
      data-gsap-region="breadcrumb"
    >
      {backgroundImage ? <BreadcrumbBackground src={backgroundImage} /> : null}

      <Container className={styles.breadcrumbArea__container}>
        <BreadcrumbContent title={title} items={items} />
      </Container>
    </section>
  );
}
