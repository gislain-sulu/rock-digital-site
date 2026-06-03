import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GSAP_DURATION, GSAP_EASE } from './constants';
import { type GsapRoot, q, qa } from './dom';

/** ScrollTrigger : joue l'animation si l'élément est déjà visible au chargement. */
export function scrollVarsWithInViewFix(scrollVars: ScrollTrigger.Vars): ScrollTrigger.Vars {
  const userOnRefresh = scrollVars.onRefresh;

  return {
    ...scrollVars,
    onRefresh(self) {
      if (self.progress > 0 && self.animation && !self.animation.isActive()) {
        self.animation.progress(1);
      }
      if (typeof userOnRefresh === 'function') {
        userOnRefresh(self);
      }
    },
  };
}

/** Rafraîchit ScrollTrigger après layout. */
export function refreshScrollAnimations(): void {
  ScrollTrigger.refresh(true);
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  scrollVars: ScrollTrigger.Vars = {}
): gsap.core.Tween | void {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

  return gsap.from(targets, {
    autoAlpha: 0,
    y: 56,
    scale: 0.98,
    duration: GSAP_DURATION.reveal,
    ease: GSAP_EASE.out,
    stagger: GSAP_DURATION.stagger,
    clearProps: 'transform',
    scrollTrigger: scrollVarsWithInViewFix({
      toggleActions: 'play none none none',
      once: true,
      ...scrollVars,
    }),
    ...vars,
  });
}

export function revealFadeUp(
  targets: gsap.TweenTarget,
  scrollVars: ScrollTrigger.Vars,
  vars: gsap.TweenVars = {}
): gsap.core.Tween | void {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

  return gsap.from(targets, {
    autoAlpha: 0,
    y: 40,
    filter: 'blur(8px)',
    duration: GSAP_DURATION.revealFast,
    ease: GSAP_EASE.out,
    stagger: 0.08,
    clearProps: 'filter,transform',
    scrollTrigger: scrollVarsWithInViewFix({
      toggleActions: 'play none none none',
      once: true,
      ...scrollVars,
    }),
    ...vars,
  });
}

export function revealMask(
  target: Element | null,
  scrollVars: ScrollTrigger.Vars
): gsap.core.Tween | void {
  if (!target) return;

  gsap.set(target, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 });

  return gsap.to(target, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.1,
    ease: GSAP_EASE.smooth,
    clearProps: 'clipPath',
    scrollTrigger: scrollVarsWithInViewFix({
      toggleActions: 'play none none none',
      once: true,
      ...scrollVars,
    }),
  });
}

export function parallaxY(
  target: Element | null,
  amount: number,
  trigger: Element | string,
  start = 'top bottom',
  end = 'bottom top'
): ScrollTrigger | void {
  if (!target) return;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: 1.2,
    animation: gsap.fromTo(
      target,
      { y: -amount * 0.35 },
      { y: amount * 0.35, ease: 'none' }
    ),
  });
}

export function staggerChildrenOnScroll(
  parent: Element | null,
  childSelector: string,
  scrollVars: ScrollTrigger.Vars
): gsap.core.Tween | void {
  if (!parent) return;
  const children = qa(parent, childSelector);
  if (!children.length) return;

  return gsap.from(children, {
    autoAlpha: 0,
    y: 48,
    duration: 0.95,
    stagger: 0.09,
    ease: GSAP_EASE.out,
    clearProps: 'transform',
    scrollTrigger: scrollVarsWithInViewFix({
      toggleActions: 'play none none none',
      once: true,
      ...scrollVars,
    }),
  });
}

/** Compteurs numériques déclenchés au scroll (stats, KPI). */
export function animateCountersInView(
  root: GsapRoot,
  selector = '[data-gsap-counter]'
): void {
  const counters = qa(root, selector);
  counters.forEach((el) => {
    const to = Number(el.getAttribute('data-gsap-counter-to') ?? el.textContent?.replace(/\D/g, '') ?? 0);
    const suffix = el.getAttribute('data-gsap-counter-suffix') ?? '';
    const prefix = el.getAttribute('data-gsap-counter-prefix') ?? '';
    const from = Number(el.getAttribute('data-gsap-counter-from') ?? 0);

    const state = { value: from };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          value: to,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.value).toLocaleString('fr-FR')}${suffix}`;
          },
        });
      },
    });
  });
}

/** Scan `[data-gsap-reveal]` — fade-up au scroll. */
export function buildDataRevealAnimations(root: GsapRoot): void {
  const singles = qa(root, '[data-gsap-reveal]:not([data-gsap-reveal="stagger"])');
  singles.forEach((el) => {
    revealFadeUp(el, { trigger: el, start: 'top 88%' });
  });

  const staggerParents = qa(root, '[data-gsap-reveal="stagger"]');
  staggerParents.forEach((parent) => {
    const children = Array.from(parent.children) as Element[];
    if (!children.length) return;
    revealFadeUp(children, { trigger: parent, start: 'top 85%' }, { stagger: 0.1 });
  });

  const masks = qa(root, '[data-gsap-reveal="mask"]');
  masks.forEach((el) => {
    revealMask(el, { trigger: el, start: 'top 85%' });
  });
}

type CardHoverCleanup = () => void;

/** Hover premium — transform GPU, zoom image léger. */
export function initPremiumCardHovers(
  root: GsapRoot,
  selector: string
): CardHoverCleanup {
  const cards = qa(root, selector);
  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    const visual = card.querySelector(
      'img, [class*="__image"], [class*="__visual"], [class*="__media"], [class*="__cardVisual"]'
    );
    const icon = card.querySelector('[class*="__icon"]');

    const hoverTl = gsap.timeline({ paused: true, defaults: { ease: GSAP_EASE.out } });
    hoverTl.to(card, { y: -8, scale: 1.02, duration: GSAP_DURATION.cardHover }, 0);
    if (visual) hoverTl.to(visual, { scale: 1.06, duration: 0.5 }, 0);
    if (icon) hoverTl.to(icon, { rotate: 8, scale: 1.08, duration: 0.4 }, 0);

    const onEnter = () => hoverTl.play();
    const onLeave = () => hoverTl.reverse();

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      hoverTl.kill();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function initNavLinkHover(root: GsapRoot): CardHoverCleanup {
  const links = qa(root, '[data-layout="site-header"] .navbar__navLink');
  const cleanups: Array<() => void> = [];

  links.forEach((link) => {
    const onEnter = () => {
      gsap.to(link, { y: -2, duration: 0.25, ease: GSAP_EASE.out });
    };
    const onLeave = () => {
      gsap.to(link, { y: 0, duration: 0.3, ease: GSAP_EASE.out });
    };
    link.addEventListener('mouseenter', onEnter);
    link.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      link.removeEventListener('mouseenter', onEnter);
      link.removeEventListener('mouseleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function initStickyHeaderTransition(root: GsapRoot): ScrollTrigger | void {
  const header = q<HTMLElement>(root, '[data-layout="site-header"] .navbar');
  const inner = q<HTMLElement>(root, '[data-layout="site-header"] .navbar__inner');
  if (!header || !inner) return;

  return ScrollTrigger.create({
    start: 0,
    end: 120,
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set(inner, {
        y: gsap.utils.interpolate(0, -2, p),
        scale: gsap.utils.interpolate(1, 0.995, p),
      });
    },
  });
}
