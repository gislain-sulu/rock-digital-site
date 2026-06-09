import Image from 'next/image';
import Link from 'next/link';
import { type ElementType } from 'react';

import { ServiceIcon } from '@/components/icons/ServiceIcons';
import type { Service } from '@/lib/content';
import { cn } from '@/utils/cn';

import styles from './ServiceSingleBox.module.scss';

export type ServiceSingleBoxVariant = 'with-bullets' | 'without-bullets';

export type ServiceSingleBoxProps = {
  icon: Service['icon'];
  title: string;
  description: string;
  href: string;
  thumbSrc: string;
  thumbAlt: string;
  bullets?: string[];
  variant?: ServiceSingleBoxVariant;
  className?: string;
  as?: ElementType;
  id?: string;
};

export function ServiceSingleBox({
  icon,
  title,
  description,
  href,
  thumbSrc,
  thumbAlt,
  bullets = [],
  variant = 'without-bullets',
  className,
  as: Component = 'article',
  id,
}: ServiceSingleBoxProps) {
  const shouldRenderBullets = variant === 'with-bullets' && bullets.length > 0;

  return (
    <Component
      id={id}
      data-service-box
      className={cn(styles.serviceSingleBox, className)}
    >
      <Link href={href} className={styles.serviceSingleBox__inner} aria-label={title}>
        <div className={styles.serviceSingleBox__content}>
          <h4 className={styles.serviceSingleBox__title}>{title}</h4>

          <div className={styles.serviceSingleBox__icon}>
            <ServiceIcon name={icon} className={styles.serviceSingleBox__iconSvg} />
          </div>
        </div>

        <div className={styles.serviceSingleBox__hoverOverlay}>
          <p className={styles.serviceSingleBox__description}>{description}</p>

          {shouldRenderBullets && (
            <ul className={styles.serviceSingleBox__bullets}>
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true">→</span> {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.serviceSingleBox__thumb} aria-hidden="true">
          <Image
            className={styles.serviceSingleBox__thumbImg}
            src={thumbSrc}
            alt={thumbAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </Link>
    </Component>
  );
}

export function ServiceSingleBoxWithBullets(props: ServiceSingleBoxProps) {
  return <ServiceSingleBox {...props} variant="with-bullets" />;
}

export function ServiceSingleBoxWithoutBullets(props: ServiceSingleBoxProps) {
  return <ServiceSingleBox {...props} variant="without-bullets" />;
}
