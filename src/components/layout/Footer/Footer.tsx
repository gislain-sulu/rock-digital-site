import Link from 'next/link';

import { Logo } from '@/components/brand/Logo';
import { footerCompany, footerServices } from '@/lib/navigation';
import { siteConfig } from '@/lib/seo';

import { NewsletterForm } from './NewsletterForm';
import styles from './Footer.module.scss';

const socials = [
  {
    name: 'LinkedIn',
    href: siteConfig.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v14H.22V8zm7.55 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 7v8.44h-4.56v-7.49c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.95-2.87 3.96V22H7.77V8z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: siteConfig.socials.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: siteConfig.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 01-1.38-.9 3.71 3.71 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.14 0-3.51.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.46-1.35.87a3.66 3.66 0 00-.87 1.35c-.16.41-.35 1.03-.4 2.17C2.41 9.49 2.4 9.86 2.4 13s.01 3.51.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.46.94.87 1.35.41.41.8.66 1.35.87.41.16 1.03.35 2.17.4 1.23.06 1.6.07 4.74.07s3.51-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.46 1.35-.87a3.66 3.66 0 00.87-1.35c.16-.41.35-1.03.4-2.17.06-1.23.07-1.6.07-4.74s-.01-3.51-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.66 3.66 0 00-.87-1.35 3.66 3.66 0 00-1.35-.87c-.41-.16-1.03-.35-2.17-.4-1.23-.06-1.6-.07-4.74-.07zm0 2.76A6.46 6.46 0 1112 19a6.46 6.46 0 010-12.92zm0 1.62a4.84 4.84 0 100 9.68 4.84 4.84 0 000-9.68zm6.64-2.04a1.51 1.51 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: siteConfig.socials.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.79 8.43-4.93 8.43-9.93z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className={styles.footer__srTitle}>
        Pied de page
      </h2>

      <div className={styles.footer__top}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__grid}>
            <div className={styles.footer__brand}>
              <Link href="/" aria-label="Rock Digital — Accueil">
                <Logo variant="blanc" className={styles.footer__logo} />
              </Link>
              <p className={styles.footer__tagline}>
                Des fondations solides pour votre transformation digitale.
                Conseil, design, développement et performance — tout-en-un.
              </p>
              <ul className={styles.footer__socials} aria-label="Réseaux sociaux">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={styles.footer__socialLink}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Services" className={styles.footer__col}>
              <p className={styles.footer__heading}>Services</p>
              <ul className={styles.footer__list}>
                {footerServices.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.footer__link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Entreprise" className={styles.footer__col}>
              <p className={styles.footer__heading}>Entreprise</p>
              <ul className={styles.footer__list}>
                {footerCompany.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.footer__link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.footer__col}>
              <p className={styles.footer__heading}>Restez informé</p>
              <p className={styles.footer__copy}>
                Recevez nos analyses sur le digital et les tendances tech, une
                fois par mois.
              </p>
              <NewsletterForm />
              <div className={styles.footer__contact}>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>
                  {siteConfig.phone}
                </a>
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__bottomRow}>
            <p>
              © {year} Rock Digital. Tous droits réservés.
            </p>
            <ul className={styles.footer__legal}>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/politique-confidentialite">Confidentialité</Link>
              </li>
              <li>
                <Link href="/cgu">CGU</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
