'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { primaryNav } from '@/lib/navigation';
import { siteConfig } from '@/lib/seo';
import { cn } from '@/utils/cn';

import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname();
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className={styles.menu}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.menu__inner}>
        <motion.nav
          className={styles.menu__nav}
          aria-label="Navigation mobile"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          <ul>
            {primaryNav.map((item, idx) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      styles.menu__link,
                      active && styles['menu__link--active']
                    )}
                  >
                    <span className={styles.menu__linkNum}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.menu__linkLabel}>{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>

        <motion.div
          className={styles.menu__cta}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="/contact" variant="primary" size="lg" fullWidth onClick={onClose}>
            Démarrer un projet
          </Button>
          <div className={styles.menu__contact}>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>
              {siteConfig.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
