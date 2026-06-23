import gsap from 'gsap';

import { HERO_ENTRANCE_TARGETS, HERO_SELECTORS } from './heroSelectors';

const EASE_OUT = 'power3.out';
const EASE_EXPO = 'expo.out';
const EASE_SMOOTH = 'power2.inOut';

const FADE_FROM = {
  autoAlpha: 0,
  y: 28,
  filter: 'blur(12px)',
};

const FADE_TO = {
  autoAlpha: 1,
  y: 0,
  filter: 'blur(0px)',
  clearProps: 'filter',
};

type HomeRoot = ParentNode & {
  querySelector: Document['querySelector'];
  querySelectorAll: Document['querySelectorAll'];
};

function q<T extends Element>(root: HomeRoot, selector: string): T | null {
  return root.querySelector(selector) as T | null;
}

function qa(root: HomeRoot, selector: string): Element[] {
  return Array.from(root.querySelectorAll(selector));
}


function fadeInUp(
  tl: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  position: gsap.Position,
  vars: gsap.TweenVars = {}
) {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

  tl.fromTo(
    targets,
    { ...FADE_FROM },
    {
      ...FADE_TO,
      duration: 0.9,
      ease: EASE_OUT,
      ...vars,
    },
    position
  );
}


function revealTitleLine(
  tl: gsap.core.Timeline,
  line: Element,
  position: gsap.Position
) {
  gsap.set(line, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });

  tl.to(
    line,
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.75,
      ease: EASE_SMOOTH,
    },
    position
  );
}


export function buildHomeHeroEntrance(root: HomeRoot): gsap.core.Timeline {
  const hero = q<HTMLElement>(root, '#hero');
  const siteHeader = document.querySelector('[data-layout="site-header"]');

  const titleLines = hero ? qa(hero, HERO_SELECTORS.titleLine) : [];
  const words = hero
    ? qa(hero, HERO_SELECTORS.word).filter((el) => !el.closest('[data-hero-digital]'))
    : [];
  const leadChunks = hero ? qa(hero, HERO_SELECTORS.leadChunk) : [];
  const lead = hero ? q(hero, HERO_SELECTORS.lead) : null;
  const actions = hero ? qa(hero, HERO_SELECTORS.actionsChild) : [];
  const visualCol = hero ? q(hero, HERO_SELECTORS.visualCol) : null;
  const scrollIndicator = hero ? q(hero, HERO_SELECTORS.scroll) : null;
  const heroMedia = hero ? q(hero, HERO_SELECTORS.media) : null;
  const heroImageWrap = hero ? q(hero, HERO_SELECTORS.imageWrap) : null;
  const heroGlow = hero ? q(hero, HERO_SELECTORS.glow) : null;
  const visualFigure = hero ? q(hero, '[class*="visual__figure"]') : null;
  const digitalWord = hero
    ? q(hero, `[data-hero-digital], ${HERO_SELECTORS.titleHighlight}`)
    : null;

  const navBrand = siteHeader?.querySelector(
    '[class*="header__brand"], [class*="navbar__brand"]'
  );
  const navLinks = siteHeader
    ? Array.from(
        siteHeader.querySelectorAll('[class*="header__navLink"], [class*="navbar__navLink"]')
      )
    : [];
  const navActions = siteHeader?.querySelector(
    '[class*="header__actions"], [class*="navbar__actions"]'
  );
  const navCta = siteHeader?.querySelector('[class*="header__cta"], [class*="navbar__cta"]');
  const navBurger = siteHeader?.querySelector(
    '[class*="header__burger"], [class*="navbar__burger"]'
  );
  const headerHalo = siteHeader?.querySelector('[class*="header__halo"]');

  const entranceTargets = [
    headerHalo,
    navBrand,
    ...navLinks,
    navCta,
    navBurger,
    navActions,
    heroMedia,
    ...titleLines,
    ...words,
    digitalWord,
    ...leadChunks,
    lead,
    ...actions,
    visualCol,
    scrollIndicator,
  ].filter(Boolean) as Element[];

  gsap.set(entranceTargets, { autoAlpha: 0, visibility: 'hidden' });

  if (titleLines.length) {
    gsap.set(titleLines, { clipPath: 'inset(100% 0% 0% 0%)' });
  }
  if (words.length) {
    gsap.set(words, { ...FADE_FROM, y: 36 });
  }
  if (digitalWord) {
    gsap.set(digitalWord, { autoAlpha: 0, y: 14, scale: 0.92 });
  }
  if (leadChunks.length) {
    gsap.set(leadChunks, { ...FADE_FROM, y: 24 });
  }
  if (actions.length) {
    gsap.set(actions, { autoAlpha: 0, y: 20, scale: 0.97, filter: 'blur(8px)' });
  }
  if (visualCol) {
    gsap.set(visualCol, { autoAlpha: 0, x: 56, scale: 0.94, filter: 'blur(14px)', y: 0 });
  }
  if (scrollIndicator) {
    gsap.set(scrollIndicator, { autoAlpha: 0, y: 16, filter: 'blur(6px)' });
  }
  if (heroMedia) {
    gsap.set(heroMedia, { autoAlpha: 0, scale: 1.08 });
  }
  if (heroImageWrap) {
    gsap.set(heroImageWrap, { y: '5%' });
  }
  if (navBrand) {
    gsap.set(navBrand, { autoAlpha: 0, y: -14, filter: 'blur(8px)' });
  }
  if (navLinks.length) {
    gsap.set(navLinks, { autoAlpha: 0, y: -10, filter: 'blur(6px)' });
  }
  if (navCta) {
    gsap.set(navCta, { autoAlpha: 0, scale: 0.94, filter: 'blur(6px)' });
  }
  if (navBurger) {
    gsap.set(navBurger, { autoAlpha: 0, scale: 0.92 });
  }
  if (navActions) {
    gsap.set(navActions, { autoAlpha: 0, y: -8 });
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE_EXPO },
    paused: true,
    delay: 0.08,
    onStart: () => {
      gsap.set(entranceTargets, { visibility: 'visible' });
    },
  });

  if (headerHalo) {
    fadeInUp(tl, headerHalo, 0, { duration: 0.85, y: 0, filter: 'blur(0px)' });
  }
  if (navBrand) {
    fadeInUp(tl, navBrand, 0.05, { duration: 0.8, y: 0 });
  }
  if (navLinks.length) {
    fadeInUp(tl, navLinks, 0.14, { duration: 0.7, stagger: 0.05, y: 0 });
  }
  if (navCta) {
    fadeInUp(tl, navCta, 0.28, { duration: 0.75, scale: 1, y: 0 });
  }
  if (navBurger) {
    fadeInUp(tl, navBurger, 0.32, { duration: 0.55, scale: 1, y: 0 });
  }
  if (navActions) {
    fadeInUp(tl, navActions, 0.26, { duration: 0.65, y: 0 });
  }

  if (heroMedia) {
    tl.to(
      heroMedia,
      { autoAlpha: 1, scale: 1, duration: 1.2, ease: EASE_SMOOTH },
      0.08
    );
  }

  const titleStart = 0.32;

  titleLines.forEach((line, index) => {
    const lineWords = Array.from(line.querySelectorAll(HERO_SELECTORS.word)).filter(
      (el) => !el.closest('[data-hero-digital]')
    );
    const lineTime = titleStart + index * 0.28;

    revealTitleLine(tl, line, lineTime);

    if (lineWords.length) {
      fadeInUp(tl, lineWords, lineTime + 0.14, {
        duration: 0.88,
        stagger: 0.09,
        y: 0,
      });
    }
  });

  if (digitalWord) {
    tl.fromTo(
      digitalWord,
      { scale: 0.9, y: 14, autoAlpha: 0.4 },
      {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        filter: 'none',
        duration: 0.78,
        ease: 'back.out(1.35)',
        clearProps: 'transform,filter',
      },
      titleStart + 0.58
    );
  }

  if (leadChunks.length) {
    fadeInUp(tl, leadChunks, titleStart + 0.48, {
      duration: 1,
      stagger: 0.18,
      y: 0,
    });
  } else if (lead) {
    fadeInUp(tl, lead, titleStart + 0.48, { duration: 1, y: 0 });
  }

  if (visualCol) {
    tl.fromTo(
      visualCol,
      { autoAlpha: 0, x: 56, scale: 0.94, filter: 'blur(14px)' },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: EASE_OUT,
        clearProps: 'filter',
      },
      titleStart + 0.38
    );
  }

  if (actions.length) {
    fadeInUp(tl, actions, titleStart + 0.72, {
      duration: 0.85,
      stagger: 0.12,
      scale: 1,
      y: 0,
      clearProps: 'transform',
    });
  }

  if (scrollIndicator) {
    fadeInUp(tl, scrollIndicator, titleStart + 0.95, { duration: 0.7, y: 0 });

    gsap.to(scrollIndicator, {
      autoAlpha: 0.65,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: titleStart + 1.15,
    });
  }

  if (heroGlow) {
    gsap.set(heroGlow, { autoAlpha: 1 });
    gsap.to(heroGlow, {
      opacity: 0.5,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.2,
    });
  }

  if (visualFigure) {
    gsap.to(visualFigure, {
      y: -10,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.4,
    });
  }

  return tl;
}

export function buildHomeHeroEntranceReduced(root: HomeRoot): void {
  const hero = q(root, '#hero');
  const siteHeader = document.querySelector('[data-layout="site-header"]');

  const targets = [
    ...(hero ? qa(hero, HERO_ENTRANCE_TARGETS) : []),
    ...(hero ? qa(hero, `#hero ${HERO_SELECTORS.layout}`) : []),
    ...(siteHeader
      ? Array.from(
          siteHeader.querySelectorAll(
            '[class*="header__halo"], [class*="navbar__brand"], [class*="navbar__navLink"], [class*="navbar__cta"], [class*="navbar__burger"], [class*="navbar__actions"]'
          )
        )
      : []),
  ];

  gsap.set(targets, {
    autoAlpha: 1,
    visibility: 'visible',
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    clipPath: 'none',
    filter: 'none',
    clearProps: 'all',
  });
}
