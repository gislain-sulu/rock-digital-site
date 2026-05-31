import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { Section } from '@/components/ui/Section';
import {
  ServiceSingleBox,
  ServiceSingleBoxWithBullets,
} from '@/components/ui/ServiceSingleBox';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { services } from '@/lib/content';
import { getServiceImage } from '@/lib/serviceImages';

import styles from './ITServices.module.scss';

export type ITServicesProps = {
  showHeading?: boolean;
  withBullets?: boolean;
  getHref?: (serviceId: string) => string;
  ctaLabel?: string;
  sectionId?: string;
};

const defaultGetHref = (serviceId: string) => `/services#${serviceId}`;

export function ITServices({
  showHeading = true,
  withBullets = false,
  getHref = defaultGetHref,
  ctaLabel = 'En savoir plus',
  sectionId = 'it-services',
}: ITServicesProps = {}) {
  const Box = withBullets ? ServiceSingleBoxWithBullets : ServiceSingleBox;

  return (
    <Section tone="light" size="lg" id={sectionId} className={styles.itServices}>
      <span className={styles.itServices__shapeLeft} aria-hidden="true" />
      <span className={styles.itServices__shapeRight} aria-hidden="true" />

      <div className={styles.itServices__inner}>
        {showHeading && (
          <header className={styles.itServices__heading}>
            <SectionSubTitle>Services</SectionSubTitle>
            <h2 className={styles.itServices__title}>
              Un partenaire complet pour
              <br />
              chaque étape de votre <span>croissance</span>
            </h2>
            <p className={styles.itServices__lead}>
              Du conseil stratégique au développement, en passant par le design et
              l&apos;automatisation, Rock Digital couvre l&apos;ensemble de votre
              chaîne de valeur digitale.
            </p>
          </header>
        )}

        <StaggerGroup className={styles.itServices__grid} stagger={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <Box
                id={withBullets ? service.id : undefined}
                title={service.title}
                description={service.description}
                bullets={service.bullets}
                href={getHref(service.id)}
                image={getServiceImage(service.id)}
                imageAlt={service.title}
                ctaLabel={ctaLabel}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
