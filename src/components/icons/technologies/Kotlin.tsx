import type { SVGProps } from 'react';

import { useSvgIds } from './useSvgIds';

export function Kotlin(props: SVGProps<SVGSVGElement>) {
  const id = useSvgIds('kotlin');

  return (
    <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
      <defs>
        <linearGradient x1="99.991%" y1="-.011%" x2=".01%" y2="100.01%" id={id('a')}>
          <stop stopColor="#E44857" offset=".344%" />
          <stop stopColor="#C711E1" offset="46.89%" />
          <stop stopColor="#7F52FF" offset="100%" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id('a')})`} d="M256 256H0V0h256L128 127.949z" />
    </svg>
  );
}
