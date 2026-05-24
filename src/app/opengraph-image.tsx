import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/seo';

export const runtime = 'edge';
export const alt = 'Rock Digital — Des fondations solides pour votre transformation digitale.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(ellipse at 80% 100%, rgba(245,158,11,0.18) 0%, transparent 55%), radial-gradient(ellipse at 0% 0%, rgba(46,110,187,0.3) 0%, transparent 55%), #0b1b3a',
          color: 'white',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              background: '#f59e0b',
              borderRadius: 999,
            }}
          />
          Rock Digital
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          }}
        >
          <span>Des fondations solides</span>
          <span style={{ color: '#f59e0b' }}>
            pour votre transformation digitale.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <span>{siteConfig.url.replace('https://', '')}</span>
          <span>Innovation · Expertise · Performance</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
