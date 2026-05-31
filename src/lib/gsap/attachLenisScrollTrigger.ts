import type Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let attachedLenis: Lenis | null = null;

/**
 * Synchronise ScrollTrigger avec Lenis pour des triggers précis au scroll fluide.
 */
export function attachLenisScrollTrigger(lenis: Lenis): void {
  if (attachedLenis === lenis) return;
  attachedLenis = lenis;

  const root = document.documentElement;

  ScrollTrigger.scrollerProxy(root, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener('refresh', () => {
    lenis.resize();
  });

  lenis.on('scroll', ScrollTrigger.update);
}

export function detachLenisScrollTrigger(lenis: Lenis): void {
  if (attachedLenis !== lenis) return;
  attachedLenis = null;
  lenis.off('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.documentElement, {});
}
