import gsap from 'gsap';

import { HERO_ENTRANCE_TARGETS } from './heroSelectors';

const HEADER_ENTRANCE_SELECTORS =
  '[data-layout="site-header"] [class*="header__halo"], [data-layout="site-header"] [class*="navbar__brand"], [data-layout="site-header"] [class*="navbar__navLink"], [data-layout="site-header"] [class*="navbar__cta"], [data-layout="site-header"] [class*="navbar__burger"], [data-layout="site-header"] [class*="navbar__actions"]';

/** Annule les `gsap.set` d'entrée (évite un hero invisible après unmount Strict Mode). */
export function forceRevealHomeEntrance(root: Element): void {
  const targets = [
    ...Array.from(root.querySelectorAll(HERO_ENTRANCE_TARGETS)),
    ...Array.from(root.querySelectorAll('#hero [data-hero-digital]')),
    ...Array.from(root.querySelectorAll('#hero [data-hero-visual], #hero [data-hero-visual] img')),
    ...Array.from(document.querySelectorAll(HEADER_ENTRANCE_SELECTORS)),
  ];

  if (targets.length === 0) return;

  gsap.set(targets, {
    autoAlpha: 1,
    visibility: 'visible',
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    clipPath: 'none',
    filter: 'none',
    clearProps: 'opacity,visibility,transform,filter,clip-path',
  });
}

export function markHomeHeroEntered(root: Element): void {
  document.body.classList.add('home-hero-entered');
  forceRevealHomeEntrance(root);
}
