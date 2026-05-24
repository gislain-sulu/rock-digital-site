'use client';

import { useEffect, useState } from 'react';

/** True after client mount — use to avoid SSR/hydration hiding content via motion initial states. */
export function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    document.documentElement.classList.add('motion-hydrated');
  }, []);

  return ready;
}
