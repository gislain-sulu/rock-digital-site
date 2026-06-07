import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { processSteps } from '@/lib/content';

export type ProcessCarouselElements = {
  /** Colonne de scroll (hauteur = défilement horizontal + zone sticky) */
  scroll: HTMLElement;
  /** Panneau sticky — reste visible pendant le parcours */
  sticky: HTMLElement;
  viewport: HTMLElement;
  list: HTMLElement;
  progress: HTMLElement;
  orb: HTMLElement;
};

export type ProcessCarouselCallbacks = {
  onProgress?: (progress: number, activeIndex: number) => void;
};

const STEP_COUNT = processSteps.length;

function getScrollDistance(viewport: HTMLElement, list: HTMLElement): number {
  return Math.max(0, list.scrollWidth - viewport.clientWidth);
}

function setProgress(
  progress: number,
  progressEl: HTMLElement,
  orbEl: HTMLElement
): void {
  const p = Math.min(1, Math.max(0, progress));
  progressEl.style.transform = `scaleX(${p})`;
  orbEl.style.left = `calc(${p * 100}% - 7px)`;
}

function progressToActiveIndex(progress: number): number {
  if (STEP_COUNT <= 1) return 0;
  return Math.min(STEP_COUNT - 1, Math.round(progress * (STEP_COUNT - 1)));
}

function notifyProgress(
  progress: number,
  els: ProcessCarouselElements,
  callbacks?: ProcessCarouselCallbacks
): void {
  const p = Math.min(1, Math.max(0, progress));
  setProgress(p, els.progress, els.orb);
  callbacks?.onProgress?.(p, progressToActiveIndex(p));
}

function waitForLayoutReady(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();

  const ready =
    !document.body.classList.contains('home-gsap-active') ||
    document.body.classList.contains('home-hero-entered');

  if (ready) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  }

  return new Promise((resolve) => {
    const finish = () => {
      observer.disconnect();
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    };

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('home-hero-entered')) finish();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.setTimeout(finish, 4500);
  });
}

/**
 * Pattern « horizontal scroll » (sticky + scrub) — standard sur les sites premium,
 * compatible Lenis (pas de pin GSAP).
 */
function buildStickyHorizontalScroll(
  els: ProcessCarouselElements,
  callbacks?: ProcessCarouselCallbacks
): () => void {
  const syncScrollHeight = () => {
    const travel = getScrollDistance(els.viewport, els.list);
    const panelHeight = els.sticky.offsetHeight;
    els.scroll.style.height = `${travel + panelHeight}px`;
  };

  const tween = gsap.to(els.list, {
    x: () => -getScrollDistance(els.viewport, els.list),
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: els.scroll,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => notifyProgress(self.progress, els, callbacks),
    },
  });

  syncScrollHeight();
  notifyProgress(0, els, callbacks);

  const ro = new ResizeObserver(() => {
    syncScrollHeight();
    ScrollTrigger.refresh();
  });
  ro.observe(els.list);
  ro.observe(els.viewport);
  ro.observe(els.sticky);

  return () => {
    ro.disconnect();
    tween.scrollTrigger?.kill();
    tween.kill();
    els.scroll.style.removeProperty('height');
    gsap.set(els.list, { clearProps: 'transform' });
  };
}

/** Mobile — swipe horizontal natif, pas de capture du scroll vertical. */
function buildNativeCarousel(
  els: ProcessCarouselElements,
  callbacks?: ProcessCarouselCallbacks
): () => void {
  els.scroll.style.removeProperty('height');
  gsap.set(els.list, { clearProps: 'transform' });

  const scroller = els.viewport;

  const update = () => {
    const max = getScrollDistance(els.viewport, els.list);
    const p = max > 0 ? scroller.scrollLeft / max : 0;
    notifyProgress(p, els, callbacks);
  };

  scroller.addEventListener('scroll', update, { passive: true });
  update();

  const ro = new ResizeObserver(update);
  ro.observe(scroller);
  ro.observe(els.list);

  return () => {
    scroller.removeEventListener('scroll', update);
    ro.disconnect();
  };
}

export async function buildProcessScrollCarousel(
  els: ProcessCarouselElements,
  callbacks?: ProcessCarouselCallbacks
): Promise<() => void> {
  await waitForLayoutReady();

  const mm = gsap.matchMedia();
  let disposeDesktop: (() => void) | null = null;
  let disposeMobile: (() => void) | null = null;

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    disposeDesktop = buildStickyHorizontalScroll(els, callbacks);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      disposeDesktop?.();
      disposeDesktop = null;
    };
  });

  mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
    disposeMobile = buildNativeCarousel(els, callbacks);

    return () => {
      disposeMobile?.();
      disposeMobile = null;
    };
  });

  ScrollTrigger.refresh();

  return () => {
    mm.revert();
    disposeDesktop = null;
    disposeMobile = null;
  };
}

export function resetProcessCarouselProgress(
  els: ProcessCarouselElements,
  callbacks?: ProcessCarouselCallbacks
): void {
  gsap.set(els.list, { clearProps: 'transform' });
  els.scroll.style.removeProperty('height');
  if (els.viewport.scrollLeft > 0) {
    els.viewport.scrollLeft = 0;
  }
  notifyProgress(0, els, callbacks);
  ScrollTrigger.refresh();
}
