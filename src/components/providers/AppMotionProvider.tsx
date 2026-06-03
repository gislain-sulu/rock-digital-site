'use client';

import { type ReactNode } from 'react';

import { SiteScrollOrchestrator } from '@/components/motion/SiteScrollOrchestrator';
import { SiteGsapProvider } from '@/contexts/SiteGsapContext';

type AppMotionProviderProps = {
  children: ReactNode;
};

/** Provider motion global — GSAP pages internes + Lenis (via SmoothScrollProvider). */
export function AppMotionProvider({ children }: AppMotionProviderProps) {
  return (
    <SiteGsapProvider>
      <SiteScrollOrchestrator />
      {children}
    </SiteGsapProvider>
  );
}
