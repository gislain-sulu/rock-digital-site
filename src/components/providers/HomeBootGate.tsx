'use client';

import { type ReactNode, useLayoutEffect, useState } from 'react';

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

const BOOT_FAILSAFE_MS = 3500;
const ENTRANCE_FAILSAFE_MS = 3200;

export function HomeBootGate({ children }: HomeBootGateProps) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [domStable, setDomStable] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

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

    const hardFailSafe = window.setTimeout(reveal, BOOT_FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(hardFailSafe);
    };
  }, [mounted]);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
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
    }, ENTRANCE_FAILSAFE_MS);

    return () => {
      clearTimeout(failSafe);
      if (!document.body.classList.contains('home-hero-entered')) {
        document.body.classList.remove('home-gsap-active', 'home-hero-entered');
      }
    };
  }, [ready, domStable]);

  const showLoader = mounted && !ready;

  useLayoutEffect(() => {
    if (!mounted) return undefined;

    if (showLoader) {
      document.body.classList.add('home-boot-loading');
    } else {
      document.body.classList.remove('home-boot-loading');
    }

    return () => {
      document.body.classList.remove('home-boot-loading');
    };
  }, [mounted, showLoader]);

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
