'use client';

import { createContext, useContext, type ReactNode } from 'react';

const HomeGsapContext = createContext(false);

type HomeGsapProviderProps = {
  active: boolean;
  children: ReactNode;
};

export function HomeGsapProvider({ active, children }: HomeGsapProviderProps) {
  return (
    <HomeGsapContext.Provider value={active}>{children}</HomeGsapContext.Provider>
  );
}

export function useHomeGsapManaged(): boolean {
  return useContext(HomeGsapContext);
}
