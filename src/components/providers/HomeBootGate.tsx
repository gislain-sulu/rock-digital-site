'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { HomeScrollOrchestrator } from '@/components/motion/HomeScrollOrchestrator';
import { PageLoader } from '@/components/ui/PageLoader';
import { HomeGsapProvider } from '@/contexts/HomeGsapContext';
import {
  isHomeBootComplete,
  markHomeBootComplete,
  waitForHomeSiteReady,
} from '@/lib/waitForSiteReady';

type HomeBootGateProps = {
  children: ReactNode;
};

export function HomeBootGate({ children }: HomeBootGateProps) {
  const [ready, setReady] = useState(false);
  const [domStable, setDomStable] = useState(false);

  useEffect(() => {
    if (isHomeBootComplete()) {
      setReady(true);
      return;
    }

    let cancelled = false;

    void waitForHomeSiteReady().then(() => {
      if (cancelled) return;
      markHomeBootComplete();
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      setDomStable(false);
      return;
    }

    let cancelled = false;
    let frame2 = 0;

    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (!cancelled) setDomStable(true);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      setDomStable(false);
    };
  }, [ready]);

  useEffect(() => {
    if (ready && domStable) {
      document.body.classList.add('home-gsap-active');
      return () => {
        document.body.classList.remove('home-gsap-active', 'home-hero-entered');
      };
    }
    document.body.classList.remove('home-gsap-active', 'home-hero-entered');
    return undefined;
  }, [ready, domStable]);

  const showLoader = !ready;

  return (
    <>
      {showLoader && (
        <div data-home-boot-screen data-page-loading>
          <PageLoader overlay />
        </div>
      )}
      {ready && domStable && <HomeScrollOrchestrator />}
      <HomeGsapProvider active={ready && domStable}>
        <div data-home-boot-content aria-hidden={showLoader}>
          {children}
        </div>
      </HomeGsapProvider>
    </>
  );
}
