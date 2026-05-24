import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#231f20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 160"
          width={44}
          height={44}
        >
          <path
            d="M22 140 L22 24 L84 24 L120 76 L70 76 L100 140 Z"
            fill="#f59e0b"
          />
          <circle
            cx="148"
            cy="76"
            r="42"
            fill="none"
            stroke="#2e6ebb"
            strokeWidth="10"
            strokeDasharray="225 90"
            transform="rotate(-25 148 76)"
          />
          <g fill="#2e6ebb" transform="translate(128,52)">
            <rect x="0" y="0" width="6" height="6" />
            <rect x="10" y="-4" width="5" height="5" />
            <rect x="18" y="3" width="4" height="4" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
