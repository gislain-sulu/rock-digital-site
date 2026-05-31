import gsap from 'gsap';

const EASE_OUT = 'power3.out';
const EASE_EXPO = 'expo.out';

const INTRO_PENDING = 'home-gsap-intro-pending';

function q<T extends Element>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector(selector) as T | null;
}

function qa(selector: string, root: ParentNode = document): Element[] {
  return Array.from(root.querySelectorAll(selector));
}

/** Timeline d'entrée cinématique — Hero + header (page d'accueil). */
export function buildHeroIntroAnimations(root: ParentNode): gsap.core.Timeline | null {
  const hero = q('#hero', root);
  if (!hero) return null;

  document.body.classList.add(INTRO_PENDING);

  const header = q('[data-layout="site-header"]');
  const headerInner = q('[data-layout="site-header"] .navbar__inner');
  const brand = q('[data-layout="site-header"] [data-header-intro="brand"]');
  const navItems = qa('[data-layout="site-header"] [data-header-intro="nav"]');
  const headerCta = q('[data-layout="site-header"] [data-header-intro="cta"]');
  const headerBurger = q('[data-layout="site-header"] [data-header-intro="burger"]');

  const heroMedia = q('.hero__media', hero);
  const heroImageWrap = q('.hero__imageWrap', hero);
  const heroGlow = q('.hero__glow', hero);
  const titleWords = qa('[data-hero-intro="word"]', hero);
  const heroLead = q('[data-hero-intro="lead"]', hero);
  const heroActions = q('[data-hero-intro="actions"]', hero);
  const heroButtons = heroActions ? qa('a, button', heroActions) : [];
  const heroVisual = q('[data-hero-intro="visual"]', hero);
  const heroVisualFigure = q('.visual__figure', hero);
  const scrollIndicator = q('[data-hero-intro="scroll"]', hero);

  gsap.set(
    [
      header,
      headerInner,
      brand,
      ...navItems,
      headerCta,
      headerBurger,
      heroMedia,
      heroImageWrap,
      heroGlow,
      ...titleWords,
      heroLead,
      heroActions,
      ...heroButtons,
      heroVisual,
      scrollIndicator,
    ].filter(Boolean),
    { autoAlpha: 0 }
  );

  if (titleWords.length) {
    gsap.set(titleWords, { y: 56, rotateX: 18, transformOrigin: '50% 100%' });
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE_EXPO },
    delay: 0.12,
    onComplete: () => {
      document.body.classList.remove(INTRO_PENDING);
    },
  });

  // —— Header ——
  if (header) {
    tl.to(header, { autoAlpha: 1, duration: 0.5 }, 0);
  }
  if (headerInner) {
    tl.fromTo(headerInner, { y: -28 }, { y: 0, duration: 0.95, ease: EASE_OUT }, 0.05);
  }
  if (brand) {
    tl.fromTo(brand, { x: -36, scale: 0.92 }, { x: 0, scale: 1, autoAlpha: 1, duration: 0.9 }, 0.12);
  }
  if (navItems.length) {
    tl.fromTo(
      navItems,
      { y: -18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.07, ease: EASE_OUT },
      0.22
    );
  }
  if (headerCta) {
    tl.fromTo(
      headerCta,
      { y: -14, scale: 0.88, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: EASE_OUT },
      0.38
    );
  }
  if (headerBurger) {
    tl.fromTo(
      headerBurger,
      { scale: 0.6, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.55, ease: EASE_OUT },
      0.42
    );
  }

  // —— Fond Hero ——
  if (heroMedia) {
    tl.fromTo(
      heroMedia,
      { scale: 1.12, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 1.35, ease: EASE_OUT },
      0.08
    );
  }
  if (heroImageWrap) {
    tl.fromTo(heroImageWrap, { scale: 1.08 }, { scale: 1, duration: 1.5, ease: EASE_OUT }, 0.1);
  }
  if (heroGlow) {
    tl.to(heroGlow, { autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' }, 0.35);
  }

  // —— Titre mot par mot ——
  if (titleWords.length) {
    tl.to(
      titleWords,
      {
        y: 0,
        rotateX: 0,
        autoAlpha: 1,
        duration: 0.95,
        stagger: 0.055,
        ease: EASE_OUT,
      },
      0.28
    );
  }

  // —— Accroche ——
  if (heroLead) {
    tl.fromTo(
      heroLead,
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.05, ease: EASE_OUT },
      0.62
    );
  }

  // —— Boutons ——
  if (heroButtons.length) {
    tl.fromTo(
      heroButtons,
      { y: 28, autoAlpha: 0, scale: 0.9 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: EASE_OUT },
      0.78
    );
  } else if (heroActions) {
    tl.fromTo(
      heroActions,
      { y: 28, autoAlpha: 0, scale: 0.92 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: EASE_OUT },
      0.78
    );
  }

  // —— Visuel droit ——
  if (heroVisual) {
    tl.fromTo(
      heroVisual,
      { x: 72, autoAlpha: 0, scale: 0.86 },
      { x: 0, autoAlpha: 1, scale: 1, duration: 1.15, ease: EASE_EXPO },
      0.48
    );
  }

  // —— Indicateur scroll ——
  if (scrollIndicator) {
    tl.fromTo(
      scrollIndicator,
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.75, ease: EASE_OUT },
      1.05
    );
  }

  // Flottement visuel (après l'entrée)
  if (heroVisualFigure) {
    tl.add(() => {
      gsap.to(heroVisualFigure, {
        y: -8,
        duration: 2.75,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, 1.15);
  }

  // Pulsation glow hero
  if (heroGlow) {
    tl.add(() => {
      gsap.to(heroGlow, {
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, 1);
  }

  return tl;
}

export function buildHeroIntroReducedMotion(root: ParentNode): void {
  document.body.classList.remove(INTRO_PENDING);

  const targets = [
    ...qa('[data-layout="site-header"] [data-header-intro]'),
    q('[data-layout="site-header"]'),
    ...qa('#hero [data-hero-intro]'),
    ...qa('#hero .hero__media, #hero .hero__imageWrap, #hero .hero__glow'),
    q('#hero', root) ? qa('[data-hero-intro="word"]', q('#hero', root)!) : [],
  ].filter(Boolean) as Element[];

  gsap.set(targets, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotateX: 0, filter: 'none', clearProps: 'all' });
}
