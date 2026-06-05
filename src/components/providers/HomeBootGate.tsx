'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { HomeScrollOrchestrator } from '@/components/motion/HomeScrollOrchestrator';
import { PageLoader } from '@/components/ui/PageLoader';
import { HomeGsapProvider } from '@/contexts/HomeGsapContext';
import { markHomeHeroEntered } from '@/lib/gsap/homeEntranceReveal';
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

    const reveal = () => {
      if (cancelled) return;
      markHomeBootComplete();
      setReady(true);
    };

    void waitForHomeSiteReady().then(reveal).catch(reveal);

    const hardFailSafe = window.setTimeout(reveal, 10000);

    return () => {
      cancelled = true;
      window.clearTimeout(hardFailSafe);
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
    if (!ready || !domStable) {
      document.body.classList.remove('home-gsap-active', 'home-hero-entered');
      return undefined;
    }

    document.body.classList.add('home-gsap-active');

    const failSafe = window.setTimeout(() => {
      if (
        document.body.classList.contains('home-gsap-active') &&
        !document.body.classList.contains('home-hero-entered')
      ) {
        const root = document.querySelector('[data-home-boot-content]');
        if (root) markHomeHeroEntered(root);
      }
    }, 3200);

    return () => {
      clearTimeout(failSafe);
      if (!document.body.classList.contains('home-hero-entered')) {
        document.body.classList.remove('home-gsap-active', 'home-hero-entered');
      }
    };
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
