import { CTA } from '@/sections/CTA';
import { Hero } from '@/sections/Hero';
import { Portfolio } from '@/sections/Portfolio';
import { Process } from '@/sections/Process';
import { Services } from '@/sections/Services';
import { Stats } from '@/sections/Stats';
import { Technologies } from '@/sections/Technologies';
import { Testimonials } from '@/sections/Testimonials';
import { ValueProps } from '@/sections/ValueProps';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <Services />
      <Process />
      <Portfolio />
      <Technologies />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
