'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  buildHomeHeroEntrance,
  buildHomeHeroEntranceReduced,
} from '@/lib/gsap/homeHeroEntrance';
import {
  buildHomeReducedMotion,
  buildHomeScrollAnimations,
} from '@/lib/gsap/homeScrollAnimations';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { waitForHomeEntranceDom } from '@/lib/gsap/waitForHomeEntranceDom';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function forceRevealHomeEntrance(root: Element): void {
  const heroSelectors =
    '#hero .hero__titleLine, #hero .hero__word, #hero .hero__leadChunk, #hero .hero__lead, #hero .hero__actions > *, #hero .hero__visualCol, #hero .hero__scroll, #hero .hero__media';
  const headerSelectors =
    '[data-layout="site-header"] .header__halo, [data-layout="site-header"] .navbar__brand, [data-layout="site-header"] .navbar__navLink, [data-layout="site-header"] .navbar__cta, [data-layout="site-header"] .navbar__burger, [data-layout="site-header"] .navbar__actions';

  const targets = [
    ...Array.from(root.querySelectorAll(heroSelectors)),
    ...Array.from(document.querySelectorAll(headerSelectors)),
  ];

  gsap.set(targets, {
    autoAlpha: 1,
    visibility: 'visible',
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    clearProps: 'transform',
  });
}

export function HomeScrollOrchestrator() {
  useGSAP(
    () => {
      registerGsap();

      let cancelled = false;
      let entranceTimeline: gsap.core.Timeline | null = null;
      let safetyTimer: ReturnType<typeof setTimeout> | null = null;

      const finishScrollSetup = (root: Element) => {
        buildHomeScrollAnimations(root);
        ScrollTrigger.refresh();
      };

      const run = async () => {
        const root = await waitForHomeEntranceDom();
        if (cancelled || !root) return;

        document.body.classList.add('home-gsap-active');

        if (prefersReducedMotion()) {
          buildHomeHeroEntranceReduced(root);
          buildHomeReducedMotion(root);
          document.body.classList.add('home-hero-entered');
          finishScrollSetup(root);
          return;
        }

        entranceTimeline = buildHomeHeroEntrance(root);

        entranceTimeline.eventCallback('onComplete', () => {
          if (cancelled) return;
          if (safetyTimer) clearTimeout(safetyTimer);
          document.body.classList.add('home-hero-entered');
          finishScrollSetup(root);
        });

        entranceTimeline.play(0);

        safetyTimer = window.setTimeout(() => {
          if (cancelled || document.body.classList.contains('home-hero-entered')) return;
          entranceTimeline?.progress(1);
          forceRevealHomeEntrance(root);
          document.body.classList.add('home-hero-entered');
          finishScrollSetup(root);
        }, 4000);

        ScrollTrigger.refresh();
      };

      void run();

      const onLoadRefresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoadRefresh, { once: true });

      return () => {
        cancelled = true;
        if (safetyTimer) clearTimeout(safetyTimer);
        window.removeEventListener('load', onLoadRefresh);
        entranceTimeline?.kill();
        document.body.classList.remove('home-gsap-active', 'home-hero-entered');
      };
    },
    { dependencies: [], revertOnUpdate: false }
  );

  return null;
}
