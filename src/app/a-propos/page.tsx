import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  AboutCareers,
  AboutHistory,
  AboutIntro,
  AboutTeam,
  AboutValues,
  AboutVision,
} from '@/sections/AboutPage';
import { CTA } from '@/sections/CTA';
import { Stats } from '@/sections/Stats';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'À propos',
  description:
    "Découvrez Rock Digital : notre histoire, notre approche, nos valeurs et l\u2019équipe qui accompagne les entreprises dans leur transformation digitale.",
  path: '/a-propos',
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        title="À propos"
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'À propos' },
        ]}
      />
      <AboutIntro />
      <AboutVision />
      <AboutValues />
      <Stats />
      <AboutHistory />
      <AboutTeam />
      <AboutCareers />
      <CTA />
    </>
  );
}
