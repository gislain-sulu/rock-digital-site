import type { Metadata } from 'next';

import { HomeBootGate } from '@/components/providers/HomeBootGate';
import { About } from '@/sections/About';
import { CTA } from '@/sections/CTA';
import { HeroSection } from '@/sections/Hero';
import { HomeLanding } from '@/sections/HomeLanding';
import { ITServices } from '@/sections/ITServices';
import { RecentProjects } from '@/sections/RecentProjects';
import { ServicesHighlight } from '@/sections/ServicesHighlight';
import { Technologies } from '@/sections/Technologies';
import { Testimonials } from '@/sections/Testimonials';

export const metadata: Metadata = {
  title: 'Rock Digital | Agence Web & Transformation Digitale',
  description:
    'Rock Digital accompagne les entreprises dans leur transformation digitale grâce à des solutions web, mobile et UX/UI performantes.',
};

export default function HomePage() {
  return (
    <HomeBootGate>
      <HomeLanding>
        <HeroSection />
        <ServicesHighlight />
      </HomeLanding>
      <About />
      <ITServices />
      <RecentProjects auto />
      <Technologies />
      <Testimonials />
      <CTA />
    </HomeBootGate>
  );
}
