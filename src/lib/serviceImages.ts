import type { Service } from '@/lib/content';

export const SERVICE_IMAGES: Record<Service['id'], string> = {
  web: '/service1.png',
  mobile: '/service2.png',
  design: '/service3.png',
  saas: '/service4.png',
  transformation: '/service5.png',
  automatisation: '/service5.png',
  branding: '/service4.png',
};

export function getServiceImage(id: Service['id']): string {
  return SERVICE_IMAGES[id] ?? '/service1.png';
}
