import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { Section } from '@/components/ui/Section';
import { ServiceSingleBox } from '@/components/ui/ServiceSingleBox';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { services, type Service } from '@/lib/content';

import styles from './ITServices.module.scss';

const serviceImages: Record<Service['id'], string> = {
  web: '/service1.png',
  mobile: '/service2.png',
  design: '/service3.png',
  saas: '/service4.png',
  transformation: '/service5.png',
  automatisation: '/service5.png',
  branding: '/service4.png',
};

export function ITServices() {
  return (
    <Section tone="light" size="lg" id="it-services" className={styles.itServices}>
      <span className={styles.itServices__shapeLeft} aria-hidden="true" />
      <span className={styles.itServices__shapeRight} aria-hidden="true" />

      <div className={styles.itServices__inner}>
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

        <StaggerGroup className={styles.itServices__grid} stagger={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceSingleBox
                title={service.title}
                description={service.description}
                bullets={service.bullets}
                href={`/services#${service.id}`}
                image={serviceImages[service.id]}
                imageAlt={service.title}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
