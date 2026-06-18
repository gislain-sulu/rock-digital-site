'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { primaryNav } from '@/lib/navigation';
import { siteConfig } from '@/lib/seo';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { cn } from '@/utils/cn';

import styles from './HeaderMobileMenu.module.scss';

type HeaderMobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function HeaderMobileMenu({ open, onClose }: HeaderMobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!open) return;
      registerGsap();

      const panel = panelRef.current;
      if (!panel) return;

      const links = panel.querySelectorAll('[data-mobile-nav-link]');
      const tl = gsap.timeline();

      tl.fromTo(
        panel,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: GSAP_EASE.expo }
      ).from(
        links,
        {
          y: 28,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: GSAP_EASE.out,
        },
        '-=0.25'
      );

      return () => {
        tl.kill();
      };
    },
    { dependencies: [open], scope: panelRef }
  );

  if (!open) return null;

  return (
    <div
      id="header-mobile-menu"
      ref={panelRef}
      className={styles.mobileMenu}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <div className={styles.mobileMenu__inner}>
        <nav className={styles.mobileMenu__nav} aria-label="Navigation mobile">
          <ul>
            {primaryNav.map((item, index) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-mobile-nav-link
                    onClick={onClose}
                    className={cn(
                      styles.mobileMenu__link,
                      active && styles['mobileMenu__link--active']
                    )}
                  >
                    <span className={styles.mobileMenu__index}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.mobileMenu__footer}>
          <RockDigitalButton href="/contact" onClick={onClose}>
            Nous contacter
          </RockDigitalButton>
          <a href={`mailto:${siteConfig.email}`} className={styles.mobileMenu__contact}>
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}
