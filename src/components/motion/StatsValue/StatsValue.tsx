'use client';

import { Counter } from '@/components/motion/Counter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type StatsValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};




export function StatsValue({ value, prefix = '', suffix = '', className }: StatsValueProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {prefix}
        {value.toLocaleString('fr-FR')}
        {suffix}
      </span>
    );
  }

  return (
    <span
      className={className}
      data-gsap-counter
      data-gsap-counter-from="0"
      data-gsap-counter-to={String(value)}
      data-gsap-counter-prefix={prefix}
      data-gsap-counter-suffix={suffix}
    >
      {prefix}0{suffix}
    </span>
  );
}


export function StatsValueAnimated(props: StatsValueProps) {
  return (
    <Counter
      to={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      className={props.className}
    />
  );
}
