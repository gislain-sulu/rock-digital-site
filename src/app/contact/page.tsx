import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactAddressBar, ContactArea } from '@/sections/Contact';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    "Prenez rendez-vous avec Rock Digital. Formulaire en ligne et coordonnées à Kinshasa.",
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="Contact"
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Contact' },
        ]}
      />
      <ContactArea />
      <ContactAddressBar />
    </>
  );
}
