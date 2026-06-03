'use client';

import { createContext, useContext, type ReactNode } from 'react';

const SiteGsapContext = createContext(false);

type SiteGsapProviderProps = {
  children: ReactNode;
};

/** Indique que les animations scroll sont gérées par GSAP (pages internes). */
export function SiteGsapProvider({ children }: SiteGsapProviderProps) {
  return <SiteGsapContext.Provider value>{children}</SiteGsapContext.Provider>;
}

export function useSiteGsapManaged(): boolean {
  return useContext(SiteGsapContext);
}
