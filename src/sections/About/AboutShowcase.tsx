import Image from 'next/image';
import { type ReactNode } from 'react';

import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Section } from '@/components/ui/Section';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

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
};

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
}: AboutShowcaseProps) {
  return (
    <Section tone="light" size="lg" id={sectionId} className={styles.aboutShowcase}>
      <div className={styles.aboutShowcase__inner}>
        <StaggerGroup className={styles.aboutShowcase__layout} stagger={0.08}>
          <StaggerItem as="div" className={styles.aboutShowcase__media}>
            <div className={styles.aboutShowcase__thumb}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={640}
                height={640}
                className={styles.aboutShowcase__thumbImage}
              />
              <span className={styles.aboutShowcase__shape} aria-hidden="true" />
              {imageBadge && (
                <p className={styles.aboutShowcase__badge}>{imageBadge}</p>
              )}
            </div>
          </StaggerItem>

          <StaggerItem as="div" className={styles.aboutShowcase__content}>
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
                <RockDigitalButton href={ctaHref}>{ctaLabel}</RockDigitalButton>
              </div>
            )}
          </StaggerItem>
        </StaggerGroup>
      </div>
    </Section>
  );
}
