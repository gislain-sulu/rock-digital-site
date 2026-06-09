import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GSAP_EASE } from './constants';
import { type GsapRoot, q, qa } from './dom';
import {
  buildDataRevealAnimations,
  initNavLinkHover,
  initPremiumCardHovers,
  initStickyHeaderTransition,
  revealFadeUp,
} from './effects';
const CARD_HOVER_SELECTORS = [
  '[data-service-box]',
  '[class*="testimonialSingleBox"]',
  '[class*="grid__card"]',
  '[class*="aboutHistory__card"]',
  '[class*="aboutValues__card"]',
  '[data-team-card]',
].join(', ');

export type GlobalAnimationsCleanup = () => void;


export function buildGlobalAnimations(root: GsapRoot): GlobalAnimationsCleanup {
  buildDataRevealAnimations(root);
  initStickyHeaderTransition(root);

  const navHoverCleanup = initNavLinkHover(root);
  const cardHoverCleanup = initPremiumCardHovers(root, CARD_HOVER_SELECTORS);

  
  const footer = q(root, '[data-layout="site-footer"]');
  if (footer) {
    const columns = qa(footer, '[class*="footer__brand"], [class*="footer__widget"]');
    revealFadeUp(columns, { trigger: footer, start: 'top 92%' }, { stagger: 0.12, y: 36 });

    const socials = qa(footer, '[class*="footer__socialLink"]');
    socials.forEach((link, i) => {
      gsap.from(link, {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.5,
        delay: i * 0.06,
        ease: GSAP_EASE.out,
        scrollTrigger: {
          trigger: footer,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }

  return () => {
    navHoverCleanup();
    cardHoverCleanup();
  };
}
