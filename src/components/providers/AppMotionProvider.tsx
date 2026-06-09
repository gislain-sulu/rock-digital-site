'use client';

import { type ReactNode } from 'react';

import { SiteScrollOrchestrator } from '@/components/motion/SiteScrollOrchestrator';
import { SiteGsapProvider } from '@/contexts/SiteGsapContext';

type AppMotionProviderProps = {
  children: ReactNode;
};


export function AppMotionProvider({ children }: AppMotionProviderProps) {
  return (
    <SiteGsapProvider>
      <SiteScrollOrchestrator />
      {children}
    </SiteGsapProvider>
  );
}
