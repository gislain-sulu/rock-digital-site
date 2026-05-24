'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MobileMenu } from '@/components/layout/Header/MobileMenu';
import { primaryNav } from '@/lib/navigation';
import { cn } from '@/utils/cn';

import styles from './Navbar.module.scss';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isHome = pathname === '/';
  const heroMode = isHome && !scrolled;

  return (
    <>
      <motion.header
        className={cn(
          styles.navbar,
          scrolled && styles['navbar--scrolled'],
          heroMode && styles['navbar--hero']
        )}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.navbar__ambientGlow} aria-hidden />
        <motion.div className={styles.navbar__inner}>
          <Link
            href="/"
            className={styles.navbar__brand}
            aria-label="Rock Digital — Retour à l'accueil"
          >
            <Image
              src={
                heroMode
                  ? '/logo-rock-digital-blanc-v1.svg'
                  : '/logo-rock-digital-color-v1.svg'
              }
              alt="Rock Digital"
              className={styles.navbar__logo}
              width={314}
              height={187}
              priority
            />
          </Link>

          <nav className={styles.navbar__nav} aria-label="Navigation principale">
            <ul className={styles.navbar__navList}>
              {primaryNav.slice(0, -1).map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.navbar__navLink,
                        active && styles['navbar__navLink--active']
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

          <motion.div className={styles.navbar__actions}>
            <Link
              href="/contact"
              className={cn(
                styles.navbar__cta,
                heroMode && styles['navbar__cta--hero']
              )}
            >
              <span className={styles.navbar__ctaLabel}>Démarrer un projet</span>
              <span className={styles.navbar__ctaIcon} aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <button
              type="button"
              className={styles.navbar__burger}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  styles.navbar__burgerBar,
                  menuOpen && styles['navbar__burgerBar--open-1']
                )}
              />
              <span
                className={cn(
                  styles.navbar__burgerBar,
                  menuOpen && styles['navbar__burgerBar--open-2']
                )}
              />
            </button>
          </motion.div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
