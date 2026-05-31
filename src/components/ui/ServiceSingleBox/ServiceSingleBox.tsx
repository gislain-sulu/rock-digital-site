import Link from 'next/link';
import { type CSSProperties, type ElementType } from 'react';

import { cn } from '@/utils/cn';

import styles from './ServiceSingleBox.module.scss';

export type ServiceSingleBoxVariant = 'with-bullets' | 'without-bullets';

export type ServiceSingleBoxProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  bullets?: string[];
  variant?: ServiceSingleBoxVariant;
  ctaLabel?: string;
  hoverBackgroundImage?: string;
  className?: string;
  as?: ElementType;
  id?: string;
};

const DEFAULT_HOVER_BG = '/service6.png';

export function ServiceSingleBox({
  title,
  description,
  href,
  image,
  imageAlt,
  bullets = [],
  variant = 'without-bullets',
  ctaLabel = 'En savoir plus',
  hoverBackgroundImage = DEFAULT_HOVER_BG,
  className,
  as: Component = 'article',
  id,
}: ServiceSingleBoxProps) {
  const boxStyle = {
    '--service-hover-bg': `url(${hoverBackgroundImage})`,
  } as CSSProperties;

  const shouldRenderBullets = variant === 'with-bullets' && bullets.length > 0;

  return (
    <Component
      id={id}
      className={cn(styles.serviceSingleBox, className)}
      style={boxStyle}
    >
      <div className={styles.serviceSingleBox__icon}>
        <img src={image} alt={imageAlt} />
      </div>

      <div className={styles.serviceSingleBox__content}>
        <h3 className={styles.serviceSingleBox__title}>{title}</h3>
        <p className={styles.serviceSingleBox__text}>{description}</p>

        {shouldRenderBullets && (
          <ul className={styles.serviceSingleBox__bullets}>
            {bullets.map((bullet) => (
              <li key={bullet}>
                <span aria-hidden="true">→</span> {bullet}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.serviceSingleBox__btn}>
          <Link href={href} className={styles.serviceSingleBox__btnLink}>
            <span className={styles.serviceSingleBox__btnIcon} aria-hidden="true">
              +
            </span>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </Component>
  );
}

export function ServiceSingleBoxWithBullets(props: ServiceSingleBoxProps) {
  return <ServiceSingleBox {...props} variant="with-bullets" />;
}

export function ServiceSingleBoxWithoutBullets(props: ServiceSingleBoxProps) {
  return <ServiceSingleBox {...props} variant="without-bullets" />;
}
