import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EASE_OUT = 'power3.out';
const EASE_EXPO = 'expo.out';

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

function revealOnScroll(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  scrollVars: ScrollTrigger.Vars
) {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

  gsap.from(targets, {
    autoAlpha: 0,
    y: 56,
    scale: 0.98,
    duration: 1.05,
    ease: EASE_OUT,
    stagger: 0.12,
    clearProps: 'transform',
    scrollTrigger: {
      toggleActions: 'play none none none',
      once: true,
      ...scrollVars,
    },
    ...vars,
  });
}

function parallaxY(
  target: Element | null,
  amount: number,
  trigger: Element | string,
  start = 'top bottom',
  end = 'bottom top'
) {
  if (!target) return;

  gsap.fromTo(
    target,
    { y: -amount * 0.35 },
    {
      y: amount * 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: 1.2,
      },
    }
  );
}

/** Animations scroll immersives — page d'accueil uniquement. */
export function buildHomeScrollAnimations(root: HomeRoot): void {
  const hero = q(root, '#hero');
  const values = q(root, '#values');
  const about = q(root, '#about');
  const itServices = q(root, '#it-services');
  const process = q(root, '#process');
  const projects = q(root, '#recent-projects');
  const technologies = q(root, '#technologies');
  const testimonials = q(root, '#testimonials');
  const contact = q(root, '#contact');

  // —— Hero : parallax scroll (entrée gérée par homeHeroEntrance) ——
  if (hero) {
    const heroMedia = q(hero, '.hero__media');
    const heroImageWrap = q(hero, '.hero__imageWrap');
    const heroVisual = q(hero, '.hero__visualCol');
    const heroLayout = q(hero, '.hero__layout');

    parallaxY(heroMedia, 80, hero, 'top top', 'bottom top');

    if (heroImageWrap) {
      gsap.fromTo(
        heroImageWrap,
        { y: '0%' },
        {
          y: '14%',
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }

    if (heroLayout) {
      gsap.fromTo(
        heroLayout,
        { y: 0 },
        {
          y: -34,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        heroLayout,
        { autoAlpha: 1 },
        {
          autoAlpha: 0.84,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      );
    }

    if (heroVisual) {
      gsap.fromTo(
        heroVisual,
        { y: 0, scale: 1 },
        {
          y: -40,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }
  }

  // —— Value props — cartes en cascade ——
  if (values) {
    const cards = qa(values, 'article');
    revealOnScroll(cards, { y: 48, stagger: 0.1 }, { trigger: values, start: 'top 82%' });
  }

  // —— About : split média / contenu ——
  if (about) {
    const media = q(about, '[class*="aboutShowcase__media"]');
    const content = q(about, '[class*="aboutShowcase__content"]');

    if (media) {
      gsap.from(media, {
        autoAlpha: 0,
        x: -72,
        scale: 0.94,
        duration: 1.15,
        ease: EASE_EXPO,
        scrollTrigger: { trigger: about, start: 'top 78%', toggleActions: 'play none none none', once: true },
      });
    }
    if (content) {
      gsap.from(content, {
        autoAlpha: 0,
        x: 72,
        duration: 1.15,
        ease: EASE_EXPO,
        delay: 0.08,
        scrollTrigger: { trigger: about, start: 'top 78%', toggleActions: 'play none none none', once: true },
      });
    }
  }

  // —— IT Services ——
  if (itServices) {
    const heading = q(itServices, '[class*="itServices__heading"]');
    const cards = qa(itServices, '.serviceSingleBox');

    if (heading) {
      revealOnScroll(
        qa(heading, 'h2, [class*="SectionSubTitle"], [class*="sectionSubTitle"]'),
        { y: 40, stagger: 0.08 },
        { trigger: itServices, start: 'top 85%' }
      );
    }
    if (cards.length) {
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 64,
            scale: 0.96,
            duration: 0.95,
            stagger: 0.09,
            ease: EASE_OUT,
            clearProps: 'transform',
          });
        },
      });
    }
  }

  // —— Process — en-tête + léger lift de la timeline ——
  if (process) {
    const header = q(process, '[class*="processSection__header"]');

    if (header) {
      revealOnScroll(header, { y: 44 }, { trigger: process, start: 'top 84%' });
    }
  }

  // —— Projets récents ——
  if (projects) {
    const intro = q(projects, '[class*="projectArea__headerIntro"]');
    const aside = q(projects, '[class*="projectArea__headerAside"]');
    const carousel = q(projects, '[class*="projectArea__carouselRow"]');

    if (intro) {
      gsap.from(intro, {
        autoAlpha: 0,
        x: -48,
        duration: 1,
        ease: EASE_OUT,
        scrollTrigger: { trigger: projects, start: 'top 80%', once: true },
      });
    }
    if (aside) {
      gsap.from(aside, {
        autoAlpha: 0,
        x: 48,
        duration: 1,
        ease: EASE_OUT,
        delay: 0.06,
        scrollTrigger: { trigger: projects, start: 'top 80%', once: true },
      });
    }
    if (carousel) {
      gsap.from(carousel, {
        autoAlpha: 0,
        y: 72,
        scale: 0.94,
        duration: 1.2,
        ease: EASE_EXPO,
        scrollTrigger: { trigger: carousel, start: 'top 88%', once: true },
      });
    }

    parallaxY(projects, 50, projects);
  }

  // —— Technologies ——
  if (technologies) {
    const heading = q(technologies, '.heading');
    const kicker = q(technologies, '[class*="tech__kicker"]');
    revealOnScroll(
      [kicker, heading].filter(Boolean) as Element[],
      { y: 36, stagger: 0.1 },
      { trigger: technologies, start: 'top 82%' }
    );
    const marquee = q(technologies, '[class*="tech__marqueeWrap"]');
    if (marquee) {
      gsap.from(marquee, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: EASE_OUT,
        scrollTrigger: { trigger: marquee, start: 'top 90%', once: true },
      });
    }
  }

  // —— Témoignages ——
  if (testimonials) {
    const titleBlock = q(testimonials, '[class*="testimonialArea__sectionTitle"]');
    const viewport = q(testimonials, '[class*="testimonialArea__viewport"]');

    if (titleBlock) {
      revealOnScroll(
        qa(titleBlock, 'h2, [class*="SectionSubTitle"]'),
        { y: 40, stagger: 0.12 },
        { trigger: testimonials, start: 'top 82%' }
      );
    }

    if (viewport) {
      gsap.from(viewport, {
        autoAlpha: 0,
        y: 56,
        scale: 0.97,
        duration: 1.1,
        ease: EASE_EXPO,
        scrollTrigger: { trigger: testimonials, start: 'top 85%', once: true },
      });
    }
  }

  // —— CTA contact — split dramatique ——
  if (contact) {
    const main = q(contact, '[class*="ctaSection__main"]');
    const visual = q(contact, '[class*="ctaSection__visualCol"]');
    const meta = q(contact, '[class*="ctaSection__meta"]');

    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: contact,
        start: 'top 78%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    if (main) {
      ctaTl.from(
        main,
        { autoAlpha: 0, x: -64, duration: 1.1, ease: EASE_EXPO },
        0
      );
    }
    if (visual) {
      ctaTl.from(
        visual,
        { autoAlpha: 0, x: 64, scale: 0.92, duration: 1.15, ease: EASE_EXPO },
        0.06
      );
      parallaxY(visual, 36, contact, 'top bottom', 'bottom top');
    }
    if (meta) {
      ctaTl.from(
        meta,
        { autoAlpha: 0, y: 48, scale: 0.9, duration: 1.05, ease: EASE_OUT },
        0.18
      );
    }
  }

  // —— Sections : lift global très subtil ——
  const sectionIds = [
    '#values',
    '#about',
    '#it-services',
    '#process',
    '#technologies',
    '#testimonials',
  ];

  sectionIds.forEach((id) => {
    const el = q(root, id);
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 12 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 98%',
          end: 'top 70%',
          scrub: 2,
        },
      }
    );
  });
}

export function buildHomeReducedMotion(root: HomeRoot): void {
  gsap.set(
    [
      ...qa(root, '#hero .hero__titleLine, #hero .hero__word, #hero .hero__leadChunk, #hero .hero__lead, #hero .hero__actions > *, #hero .hero__visualCol, #hero .hero__scroll, #hero .hero__media'),
      ...qa(
        document.body,
        '[data-layout="site-header"] .navbar, [data-layout="site-header"] .header__halo, [data-layout="site-header"] .navbar__brand, [data-layout="site-header"] .navbar__navLink, [data-layout="site-header"] .navbar__cta, [data-layout="site-header"] .navbar__burger'
      ),
      ...qa(root, '#values article'),
      ...qa(root, '#about [class*="aboutShowcase__media"], #about [class*="aboutShowcase__content"]'),
      ...qa(root, '#it-services .serviceSingleBox, #it-services [class*="itServices__heading"] *'),
      ...qa(root, '#process [class*="processSection__header"]'),
      ...qa(root, '#recent-projects [class*="projectArea__headerIntro"], #recent-projects [class*="projectArea__headerAside"], #recent-projects [class*="projectArea__carouselRow"]'),
      ...qa(root, '#technologies [class*="tech__kicker"], #technologies .heading'),
      ...qa(root, '#testimonials [class*="testimonialArea__sectionTitle"] *, #testimonials [class*="testimonialArea__viewport"]'),
      ...qa(root, '#contact [class*="ctaSection__main"], #contact [class*="ctaSection__visualCol"], #contact [class*="ctaSection__meta"]'),
    ],
    { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: 'all' }
  );
}
