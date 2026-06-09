'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { type ReactNode, useRef } from 'react';

import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { cn } from '@/utils/cn';

import styles from './AboutShowcase.module.scss';

export type AboutShowcaseProps = {
  sectionId?: string;
  kicker: string;
  title: ReactNode;
  lead: string;
  body?: string;
  featureTitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageBadge?: string;
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
  
  motion?: 'framer' | 'gsap';
  sectionTone?: 'light' | 'subtle' | 'soft' | 'deep' | 'dark';
};

function ShowcaseMedia({
  imageSrc,
  imageAlt,
  imageBadge,
}: Pick<AboutShowcaseProps, 'imageSrc' | 'imageAlt' | 'imageBadge'>) {
  return (
    <div className={styles.aboutShowcase__thumb}>
      <Image
        src={imageSrc!}
        alt={imageAlt!}
        width={640}
        height={640}
        className={styles.aboutShowcase__thumbImage}
      />
      <span className={styles.aboutShowcase__shape} aria-hidden="true" />
      {imageBadge && <p className={styles.aboutShowcase__badge}>{imageBadge}</p>}
    </div>
  );
}

function ShowcaseContent({
  kicker,
  title,
  lead,
  body,
  featureTitle,
  showCta,
  ctaHref,
  ctaLabel,
}: Pick<
  AboutShowcaseProps,
  | 'kicker'
  | 'title'
  | 'lead'
  | 'body'
  | 'featureTitle'
  | 'showCta'
  | 'ctaHref'
  | 'ctaLabel'
>) {
  return (
    <>
      <header className={styles.aboutShowcase__heading}>
        <SectionSubTitle>{kicker}</SectionSubTitle>
        <h2 className={styles.aboutShowcase__mainTitle}>{title}</h2>
        <p className={styles.aboutShowcase__lead}>{lead}</p>
      </header>

      {featureTitle && (
        <div className={styles.aboutShowcase__feature}>
          <span className={styles.aboutShowcase__featureIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 17.5V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8.5" />
              <path d="M3 17.5h18" />
              <path
                d="M9.5 13.2l2 2 3-3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className={styles.aboutShowcase__featureTitle}>{featureTitle}</h3>
        </div>
      )}

      {body && <p className={styles.aboutShowcase__text}>{body}</p>}

      {showCta && (
        <div className={styles.aboutShowcase__actions}>
          <RockDigitalButton href={ctaHref!}>{ctaLabel}</RockDigitalButton>
        </div>
      )}
    </>
  );
}

export function AboutShowcase({
  sectionId = 'about',
  kicker,
  title,
  lead,
  body,
  featureTitle,
  imageSrc = '/about-thumb.png',
  imageAlt = 'Rock Digital',
  imageBadge,
  ctaHref = '/a-propos',
  ctaLabel = 'En savoir plus',
  showCta = true,
  motion = 'framer',
  sectionTone = 'light',
}: AboutShowcaseProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      if (motion !== 'gsap') return;

      const root = innerRef.current;
      if (!root || animatedRef.current) return;

      registerGsap();
      animatedRef.current = true;

      if (prefersReducedMotion()) return;

      const media = root.querySelector('[class*="aboutShowcase__media"]');
      const content = root.querySelector('[class*="aboutShowcase__content"]');

      if (media) {
        gsap.from(media, {
          clipPath: 'inset(0 100% 0 0)',
          autoAlpha: 0,
          duration: 1.1,
          ease: GSAP_EASE.expo,
          clearProps: 'clip-path,opacity,visibility',
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      if (content) {
        gsap.from(content, {
          x: 48,
          autoAlpha: 0,
          duration: 1,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      return () => {
        animatedRef.current = false;
      };
    },
    { scope: innerRef, dependencies: [motion], revertOnUpdate: true }
  );

  const mediaBlock = (
    <div className={styles.aboutShowcase__media}>
      <ShowcaseMedia imageSrc={imageSrc} imageAlt={imageAlt} imageBadge={imageBadge} />
    </div>
  );

  const contentBlock = (
    <div className={styles.aboutShowcase__content}>
      <ShowcaseContent
        kicker={kicker}
        title={title}
        lead={lead}
        body={body}
        featureTitle={featureTitle}
        showCta={showCta}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
      />
    </div>
  );

  return (
    <Section
      tone={sectionTone}
      size="lg"
      id={sectionId}
      className={cn(
        styles.aboutShowcase,
        sectionTone === 'soft' && styles['aboutShowcase--soft']
      )}
    >
      <div ref={innerRef} className={styles.aboutShowcase__inner}>
        {motion === 'framer' ? (
          <StaggerGroup className={styles.aboutShowcase__layout} stagger={0.08}>
            <StaggerItem as="div" className={styles.aboutShowcase__media}>
              <ShowcaseMedia
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                imageBadge={imageBadge}
              />
            </StaggerItem>
            <StaggerItem as="div" className={styles.aboutShowcase__content}>
              <ShowcaseContent
                kicker={kicker}
                title={title}
                lead={lead}
                body={body}
                featureTitle={featureTitle}
                showCta={showCta}
                ctaHref={ctaHref}
                ctaLabel={ctaLabel}
              />
            </StaggerItem>
          </StaggerGroup>
        ) : (
          <div className={styles.aboutShowcase__layout}>
            {mediaBlock}
            {contentBlock}
          </div>
        )}
      </div>
    </Section>
  );
}
