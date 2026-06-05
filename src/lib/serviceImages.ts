import type { Service } from '@/lib/content';

export const SERVICE_THUMB_IMAGES: Record<Service['id'], string> = {
  web: '/services/developpement-web.png',
  mobile: '/services/mobile-app.png',
  design: '/services/ux-ui-design.png',
  saas: '/services/sass-platform.png',
  transformation: '/services/transformation-digitale.png',
  automatisation: '/services/ia-automatisation.png',
  branding: '/services/branding-digital.png',
};

export function getServiceThumbImage(id: Service['id']): string {
  return SERVICE_THUMB_IMAGES[id] ?? '/services/developpement-web.png';
}
