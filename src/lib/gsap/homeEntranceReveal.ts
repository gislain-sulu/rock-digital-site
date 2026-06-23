import gsap from 'gsap';

import { HERO_ENTRANCE_TARGETS } from './heroSelectors';

const HEADER_ENTRANCE_SELECTORS =
  '[data-layout="site-header"] [class*="header__brand"], [data-layout="site-header"] [class*="header__navLink"], [data-layout="site-header"] [class*="header__cta"], [data-layout="site-header"] [class*="header__burger"], [data-layout="site-header"] [class*="header__actions"], [data-layout="site-header"] [class*="navbar__brand"], [data-layout="site-header"] [class*="navbar__navLink"], [data-layout="site-header"] [class*="navbar__cta"], [data-layout="site-header"] [class*="navbar__burger"], [data-layout="site-header"] [class*="navbar__actions"]';


const HERO_LAYOUT_LOCK_SELECTORS =
  '#hero [class*="hero__visualCol"], #hero [data-hero-visual], #hero [class*="hero__media"]';


export function forceRevealHomeEntrance(root: Element): void {
  const layoutLocked = Array.from(root.querySelectorAll(HERO_LAYOUT_LOCK_SELECTORS));
  const layoutLockedSet = new Set(layoutLocked);

  const targets = [
    ...Array.from(root.querySelectorAll(HERO_ENTRANCE_TARGETS)),
    ...Array.from(root.querySelectorAll('#hero [data-hero-digital]')),
    ...Array.from(document.querySelectorAll(HEADER_ENTRANCE_SELECTORS)),
  ].filter((el) => !layoutLockedSet.has(el));

  if (layoutLocked.length) {
    gsap.set(layoutLocked, {
      autoAlpha: 1,
      visibility: 'visible',
      clearProps: 'opacity,visibility,filter',
    });
  }

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
