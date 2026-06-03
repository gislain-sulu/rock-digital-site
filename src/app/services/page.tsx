import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTA } from '@/sections/CTA';
import { ITServices } from '@/sections/ITServices';
import { Process } from '@/sections/Process';
import { ServicesFaq, ServicesIntro } from '@/sections/ServicesPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Services',
  description:
    'Conseil, design, développement, SaaS, transformation digitale, automatisation, branding — découvrez l\u2019ensemble des services de Rock Digital.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb
        title="Services"
        backgroundImage="/bg-services-rock-digital.png"
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Services' },
        ]}
      />
      <ServicesIntro />
      <ITServices
        sectionId="offer-list"
        showHeading={false}
        withBullets
        ctaHref="/contact"
        ctaLabel="Démarrer ce service"
      />
      <Process />
      <ServicesFaq />
      <CTA />
    </>
  );
}
