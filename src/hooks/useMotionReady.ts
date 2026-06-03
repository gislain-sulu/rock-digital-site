'use client';

import { useLayoutEffect, useState } from 'react';

/** True après montage client — évite de masquer le contenu côté SSR. */
export function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add('motion-hydrated');
    setReady(true);
  }, []);

  return ready;
}
