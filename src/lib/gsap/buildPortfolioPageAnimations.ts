import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GSAP_EASE } from './constants';
import { type GsapRoot, q, qa } from './dom';
import { revealFadeUp } from './effects';

export function buildPortfolioPageAnimations(root: GsapRoot): void {
  const main = q(root, '#main');
  if (!main) return;

  const pageHeader = q(main, '[class*="header"]');
  if (pageHeader) {
    revealFadeUp(
      qa(pageHeader, '[class*="header__kicker"], [class*="header__title"], [class*="header__description"]'),
      { trigger: pageHeader, start: 'top 88%' },
      { stagger: 0.12 }
    );
  }

  const grid = q(main, '[class*="grid"]');
  if (!grid) return;

  const filters = qa(grid, '[class*="grid__filter"]');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      gsap.fromTo(
        btn,
        { scale: 0.94 },
        { scale: 1, duration: 0.45, ease: 'back.out(2)' }
      );
    });
  });

  const cards = qa(grid, '[class*="grid__card"]');
  ScrollTrigger.batch(cards, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => {
      gsap.from(batch, {
        autoAlpha: 0,
        y: 48,
        scale: 0.94,
        duration: 0.9,
        stagger: 0.08,
        ease: GSAP_EASE.out,
        clearProps: 'transform',
      });
    },
  });

  const quote = q(main, '[class*="testimonialsLine"]');
  if (quote) {
    revealFadeUp(quote, { trigger: quote, start: 'top 88%' });
  }
}
