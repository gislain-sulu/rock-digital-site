import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rock Digital',
    short_name: 'Rock Digital',
    description:
      'Rock Digital — Des fondations solides pour votre transformation digitale.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2e6ebb',
    icons: [
      {
        src: '/rockdigital-favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
