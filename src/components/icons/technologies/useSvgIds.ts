import { useId } from 'react';


export function useSvgIds(prefix: string) {
  const base = useId().replace(/:/g, '');
  return (name: string) => `${prefix}-${base}-${name}`;
}
