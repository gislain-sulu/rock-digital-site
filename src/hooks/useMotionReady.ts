'use client';

import { useLayoutEffect, useState } from 'react';


export function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add('motion-hydrated');
    setReady(true);
  }, []);

  return ready;
}
