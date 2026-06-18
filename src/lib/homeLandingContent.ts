import type { LucideIcon } from 'lucide-react';
import { Code2, Lightbulb, Palette, Settings } from 'lucide-react';

export type ServiceHighlightItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const serviceHighlights: ServiceHighlightItem[] = [
  {
    title: 'Conseil & Stratégie',
    description: 'Nous vous accompagnons dans vos projets digitaux.',
    icon: Lightbulb,
  },
  {
    title: 'Développement',
    description: 'Des solutions web et mobile robustes et évolutives.',
    icon: Code2,
  },
  {
    title: 'Design UI/UX',
    description: 'Des interfaces intuitives pour une meilleure expérience.',
    icon: Palette,
  },
  {
    title: 'Support & Maintenance',
    description: 'Nous assurons la performance et la sécurité de vos solutions.',
    icon: Settings,
  },
];
