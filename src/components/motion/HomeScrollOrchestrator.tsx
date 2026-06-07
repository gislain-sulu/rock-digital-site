'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  buildHomeHeroEntrance,
  buildHomeHeroEntranceReduced,
} from '@/lib/gsap/homeHeroEntrance';
import { buildGlobalAnimations } from '@/lib/gsap/buildGlobalAnimations';
import {
  forceRevealHomeEntrance,
  markHomeHeroEntered,
} from '@/lib/gsap/homeEntranceReveal';
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

export function HomeScrollOrchestrator() {
  useGSAP(
    () => {
      registerGsap();

      let cancelled = false;
      let entranceTimeline: gsap.core.Timeline | null = null;
      let safetyTimer: number | null = null;
      let globalCleanup: (() => void) | null = null;

      const finishScrollSetup = (root: Element) => {
        try {
          buildHomeScrollAnimations(root);
          globalCleanup = buildGlobalAnimations(document);
          ScrollTrigger.refresh();
        } catch (error) {
          console.error('[HomeScrollOrchestrator] scroll setup failed:', error);
        }
      };

      const run = async () => {
        try {
          const root = await waitForHomeEntranceDom();
          if (cancelled || !root) return;

          if (document.body.classList.contains('home-hero-entered')) {
            finishScrollSetup(root);
            return;
          }

          document.body.classList.add('home-gsap-active');

          if (prefersReducedMotion()) {
            buildHomeHeroEntranceReduced(root);
            buildHomeReducedMotion(root);
            markHomeHeroEntered(root);
            finishScrollSetup(root);
            return;
          }

          entranceTimeline = buildHomeHeroEntrance(root);

          entranceTimeline.eventCallback('onComplete', () => {
            if (cancelled) return;
            if (safetyTimer) clearTimeout(safetyTimer);
            markHomeHeroEntered(root);
            finishScrollSetup(root);
          });

          entranceTimeline.play(0);

          safetyTimer = window.setTimeout(() => {
            if (cancelled || document.body.classList.contains('home-hero-entered')) return;
            entranceTimeline?.progress(1);
            markHomeHeroEntered(root);
            finishScrollSetup(root);
          }, 2500);
        } catch (error) {
          console.error('[HomeScrollOrchestrator] entrance failed:', error);
          const root = document.querySelector('[data-home-boot-content]');
          if (root && !cancelled) {
            markHomeHeroEntered(root);
          }
        }
      };

      void run();

      const onLoadRefresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoadRefresh, { once: true });

      return () => {
        cancelled = true;
        if (safetyTimer) clearTimeout(safetyTimer);
        window.removeEventListener('load', onLoadRefresh);
        entranceTimeline?.kill();
        globalCleanup?.();
        globalCleanup = null;

        const root = document.querySelector('[data-home-boot-content]');
        if (root) forceRevealHomeEntrance(root);

        const entranceDone = document.body.classList.contains('home-hero-entered');
        if (!entranceDone) {
          document.body.classList.remove('home-gsap-active', 'home-hero-entered');
        }
      };
    },
    { dependencies: [], revertOnUpdate: false }
  );

  return null;
}
