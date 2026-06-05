import type { Service } from '@/lib/content';

export const SERVICE_IMAGES: Record<Service['id'], string> = {
  web: '/icones/web-developpement.png',
  mobile: '/icones/mobile-developpement.png',
  design: '/icones/ux-ui.png',
  saas: '/icones/sass-plateforme.png',
  transformation: '/icones/digital-transformation.png',
  automatisation: '/icones/automatisation_Plan.png',
  branding: '/icones/brading-digital.png',
};

export function getServiceImage(id: Service['id']): string {
  return SERVICE_IMAGES[id] ?? '/icones/web-developpement.png';
}
