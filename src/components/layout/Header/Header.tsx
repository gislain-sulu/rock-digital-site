'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { primaryNav } from '@/lib/navigation';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { cn } from '@/utils/cn';

import { HeaderMobileMenu } from './HeaderMobileMenu';
import styles from './Header.module.scss';

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      registerGsap();
      const header = headerRef.current;
      if (!header || document.body.classList.contains('home-gsap-active')) return;

      gsap.from(header, {
        y: -24,
        autoAlpha: 0,
        duration: 0.85,
        ease: GSAP_EASE.out,
        delay: 0.05,
      });
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(styles.header, scrolled && styles['header--scrolled'])}
        data-layout="site-header"
      >
        <div className={styles.header__inner}>
          <Link
            href="/"
            className={cn(styles.header__brand, 'header__brand', 'navbar__brand')}
            aria-label="Rock Digital — Retour à l'accueil"
          >
            <Image
              src="/logo-rock-digital-color-v3.png"
              alt="Rock Digital"
              className={styles.header__logo}
              width={314}
              height={187}
              priority
            />
          </Link>

          <nav className={styles.header__nav} aria-label="Navigation principale">
            <ul className={styles.header__navList}>
              {primaryNav.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.header__navLink,
                        'header__navLink',
                        'navbar__navLink',
                        active && styles['header__navLink--active']
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={cn(styles.header__actions, 'header__actions', 'navbar__actions')}
          >
            <RockDigitalButton
              href="/contact"
              className={cn(styles.header__cta, 'header__cta', 'navbar__cta')}
            >
              Nous contacter
            </RockDigitalButton>
            <button
              type="button"
              className={cn(styles.header__burger, 'header__burger', 'navbar__burger')}
              aria-expanded={menuOpen}
              aria-controls="header-mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  styles.header__burgerBar,
                  menuOpen && styles['header__burgerBar--open-1']
                )}
              />
              <span
                className={cn(
                  styles.header__burgerBar,
                  menuOpen && styles['header__burgerBar--open-2']
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <HeaderMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
