import { HomeBootGate } from '@/components/providers/HomeBootGate';
import { About } from '@/sections/About';
import { CTA } from '@/sections/CTA';
import { Hero } from '@/sections/Hero';
import { ITServices } from '@/sections/ITServices';
import { Portfolio } from '@/sections/Portfolio';

import { RecentProjects } from '@/sections/RecentProjects';

import { Stats } from '@/sections/Stats';
import { Technologies } from '@/sections/Technologies';
import { Testimonials } from '@/sections/Testimonials';
import { ValueProps } from '@/sections/ValueProps';

export default function HomePage() {
  return (
    <HomeBootGate>
      <Hero />
      <ValueProps />
      <About />
      <ITServices />
      {}
      {}
      <RecentProjects auto />
      {}
      <Technologies />
      {}
      <Testimonials />
      <CTA />
    </HomeBootGate>
  );
}
