import { cn } from '@/utils/cn';

import styles from './Logo.module.scss';

export type LogoVariant =
  | 'principal'
  | 'horizontal'
  | 'symbol'
  | 'monochrome'
  | 'noir'
  | 'blanc';

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
};

export function Logo({
  variant = 'principal',
  className,
  width,
  height,
  ariaLabel = 'Rock Digital',
}: LogoProps) {
  const palette = getPalette(variant);
  const showDigital = variant !== 'symbol';
  const isHorizontal = variant === 'horizontal';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={
        variant === 'symbol'
          ? '0 0 220 160'
          : isHorizontal
            ? '0 0 540 130'
            : '0 0 420 200'
      }
      role="img"
      aria-label={ariaLabel}
      className={cn(styles.logo, styles[`logo--${variant}`], className)}
      style={{ width, height }}
    >
      <defs>
        <linearGradient id={`mountain-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.mountainTop} />
          <stop offset="100%" stopColor={palette.mountainBottom} />
        </linearGradient>
      </defs>

      <g transform="translate(0,10)">
        <path
          d="M28 130 L28 28 L100 28 L142 80 L82 80 L120 130 Z"
          fill={palette.orange}
        />

        <circle
          cx="180"
          cy="78"
          r="50"
          fill="none"
          stroke={palette.blue}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="270 100"
          transform="rotate(-25 180 78)"
        />

        <g transform="translate(160,55)" fill={palette.blue} opacity="0.95">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="10" y="-4" width="5" height="5" />
          <rect x="18" y="3" width="4" height="4" />
          <rect x="22" y="-2" width="3" height="3" opacity="0.6" />
          <rect x="28" y="0" width="4" height="4" opacity="0.7" />
          <rect x="-6" y="10" width="3" height="3" opacity="0.5" />
        </g>

        <g transform="translate(155,60)">
          <polygon
            points="0,40 18,12 30,28 42,4 60,40"
            fill={`url(#mountain-${variant})`}
          />
          <polygon points="18,12 24,22 30,28" fill={palette.mountainHighlight} />
          <polygon points="42,4 50,22 60,40" fill={palette.mountainShadow} />
        </g>

        <path
          d="M232 28 L262 28 L262 50 L282 50 L282 28 L312 28 L312 130 L282 130 L282 100 L262 100 L262 130 L232 130 Z"
          fill={palette.black}
        />

        <path
          d="M328 28 L328 130 L358 130 L358 92 L388 130 L420 130 L380 78 L420 28 L388 28 L358 64 L358 28 Z"
          fill={palette.black}
        />

        {showDigital && !isHorizontal && (
          <g transform="translate(0, 150)">
            <text
              x="210"
              y="0"
              textAnchor="middle"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="700"
              fontSize="38"
              letterSpacing="14"
              fill={palette.digital}
            >
              DIGITAL
            </text>
          </g>
        )}

        {isHorizontal && (
          <g transform="translate(440, 95)">
            <text
              x="0"
              y="0"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="600"
              fontSize="32"
              letterSpacing="10"
              fill={palette.digital}
            >
              DIGITAL
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}

type Palette = {
  orange: string;
  blue: string;
  black: string;
  digital: string;
  mountainTop: string;
  mountainBottom: string;
  mountainHighlight: string;
  mountainShadow: string;
};

function getPalette(variant: LogoVariant): Palette {
  switch (variant) {
    case 'monochrome':
      return {
        orange: '#4d4d4d',
        blue: '#4d4d4d',
        black: '#231f20',
        digital: '#4d4d4d',
        mountainTop: '#4d4d4d',
        mountainBottom: '#231f20',
        mountainHighlight: '#7a7a7a',
        mountainShadow: '#1a1818',
      };
    case 'noir':
      return {
        orange: '#231f20',
        blue: '#231f20',
        black: '#231f20',
        digital: '#231f20',
        mountainTop: '#231f20',
        mountainBottom: '#000000',
        mountainHighlight: '#3a3434',
        mountainShadow: '#000000',
      };
    case 'blanc':
      return {
        orange: '#ffffff',
        blue: '#ffffff',
        black: '#ffffff',
        digital: '#ffffff',
        mountainTop: '#ffffff',
        mountainBottom: '#e5e7eb',
        mountainHighlight: '#ffffff',
        mountainShadow: '#cbd5e1',
      };
    case 'principal':
    case 'horizontal':
    case 'symbol':
    default:
      return {
        orange: '#f59e0b',
        blue: '#2e6ebb',
        black: '#231f20',
        digital: '#231f20',
        mountainTop: '#2e6ebb',
        mountainBottom: '#1e4fa1',
        mountainHighlight: '#64748b',
        mountainShadow: '#0b1b3a',
      };
  }
}
