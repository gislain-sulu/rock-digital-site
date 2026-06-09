'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import {
  ServiceSingleBox,
  ServiceSingleBoxWithBullets,
} from '@/components/ui/ServiceSingleBox';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { scrollVarsWithInViewFix } from '@/lib/gsap/effects';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { services } from '@/lib/content';
import { getServiceThumbImage } from '@/lib/serviceImages';

import styles from './ITServices.module.scss';

export type ITServicesProps = {
  showHeading?: boolean;
  withBullets?: boolean;
  
  ctaHref?: string;
  ctaLabel?: string;
  sectionId?: string;
};

const SERVICE_BOX_SELECTOR = '[data-service-box]';

const defaultServiceHref = () => '/contact';

export function ITServices({
  showHeading = true,
  withBullets = false,
  ctaHref,
  ctaLabel = 'En savoir plus',
  sectionId = 'it-services',
}: ITServicesProps = {}) {
  const hrefFor = () => ctaHref ?? defaultServiceHref();
  const rootRef = useRef<HTMLDivElement>(null);
  const Box = withBullets ? ServiceSingleBoxWithBullets : ServiceSingleBox;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const triggers: ScrollTrigger[] = [];
      const shapes = root.querySelectorAll('[class*="itServices__shape"]');
      const heading = root.querySelector('[class*="itServices__heading"]');
      const headingEls = heading
        ? heading.querySelectorAll(
            '[class*="SectionSubTitle"], [class*="sectionSubTitle"], h2, p'
          )
        : [];
      const grid = root.querySelector('[class*="itServices__grid"]');
      const cards = root.querySelectorAll<HTMLElement>(SERVICE_BOX_SELECTOR);

      if (shapes.length) {
        gsap.from(shapes, {
          autoAlpha: 0,
          x: (index) => (index === 0 ? -56 : 56),
          scale: 0.92,
          duration: 1.1,
          stagger: 0.14,
          ease: GSAP_EASE.expo,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: scrollVarsWithInViewFix({
            trigger: root,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          }),
        });
      }

      if (headingEls.length) {
        gsap.from(headingEls, {
          y: 40,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: scrollVarsWithInViewFix({
            trigger: root,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          }),
        });
      }

      if (cards.length && grid) {
        const cardsTween = gsap.from(cards, {
          autoAlpha: 0,
          y: 64,
          scale: 0.96,
          duration: 0.95,
          stagger: 0.09,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: scrollVarsWithInViewFix({
            trigger: grid,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          }),
        });
        const st = cardsTween.scrollTrigger;
        if (st) triggers.push(st);

        cards.forEach((card) => {
          const shadowSt = ScrollTrigger.create({
            trigger: card,
            start: 'top 72%',
            end: 'bottom 28%',
            onToggle: (self) => {
              gsap.to(card, {
                boxShadow: self.isActive
                  ? '0 24px 48px rgba(15, 23, 42, 0.14)'
                  : '0 0 30px rgba(15, 23, 42, 0.08)',
                duration: 0.4,
                ease: GSAP_EASE.out,
              });
            },
          });
          triggers.push(shadowSt);
        });
      }

      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener('load', refresh);

      return () => {
        triggers.forEach((st) => st.kill());
        window.removeEventListener('load', refresh);
      };
    },
    { scope: rootRef, dependencies: [showHeading], revertOnUpdate: true }
  );

  return (
    <Section tone="light" size="lg" id={sectionId} className={styles.itServices}>
      <div ref={rootRef} className={styles.itServices__root}>
        <span className={styles.itServices__shapeLeft} aria-hidden="true" />
        <span className={styles.itServices__shapeRight} aria-hidden="true" />

        <div className={styles.itServices__inner}>
          {showHeading && (
            <header className={styles.itServices__heading}>
              <SectionSubTitle>Services</SectionSubTitle>
              <h2 className={styles.itServices__title}>
                Un partenaire complet pour
                <br />
                chaque étape de votre <span>croissance</span>
              </h2>
              <p className={styles.itServices__lead}>
                Du conseil stratégique au développement, en passant par le design et
                l&apos;automatisation, Rock Digital couvre l&apos;ensemble de votre
                chaîne de valeur digitale.
              </p>
            </header>
          )}

          <div className={styles.itServices__grid}>
            {services.map((service) => (
              <Box
                key={service.id}
                id={withBullets ? service.id : undefined}
                title={service.title}
                description={service.description}
                bullets={service.bullets}
                href={hrefFor()}
                icon={service.icon}
                thumbSrc={getServiceThumbImage(service.id)}
                thumbAlt={service.title}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
