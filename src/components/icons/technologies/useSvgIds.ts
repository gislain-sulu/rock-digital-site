import { useId } from 'react';

/** Préfixe unique pour les ids SVG (gradients, masks) afin d'éviter les collisions dans le marquee. */
export function useSvgIds(prefix: string) {
  const base = useId().replace(/:/g, '');
  return (name: string) => `${prefix}-${base}-${name}`;
}
