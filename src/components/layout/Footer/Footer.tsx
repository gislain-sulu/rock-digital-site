import Image from 'next/image';
import Link from 'next/link';

import { AddressIcon, EmailIcon, PhoneIcon } from '@/components/icons/ContactIcons';
import { contactInfo, contactLinks } from '@/lib/contact';
import { footerCompany, footerServices } from '@/lib/navigation';
import { siteConfig } from '@/lib/seo';

import { NewsletterForm } from './NewsletterForm';
import styles from './Footer.module.scss';

const socials = [
  {
    name: 'LinkedIn',
    href: siteConfig.socials.linkedin,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 0h24v24H0z" fill="none" />
        <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0">
          <animate fill="freeze" attributeName="opacity" dur="0.2s" to="1" />
        </circle>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        >
          <g strokeDasharray="12" strokeDashoffset="12">
            <path d="M4 10v10">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                to="0"
              />
            </path>
            <path d="M10 10v10">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.5s"
                dur="0.2s"
                to="0"
              />
            </path>
          </g>
          <path
            strokeDasharray="24"
            strokeDashoffset="24"
            d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.7s"
              dur="0.3s"
              to="0"
            />
          </path>
        </g>
      </svg>
    ),
  },
  {
    name: 'X',
    href: siteConfig.socials.twitter,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
        />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: siteConfig.socials.facebook,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="currentColor"
          d="M14.5 2.75c-2.861 0-5.25 2.389-5.25 5.25v1.75H6.5a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25h2.75V21c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-6.75h2.75a.25.25 0 0 0 .242-.19l1-4a.25.25 0 0 0-.242-.31h-3.75V8a.76.76 0 0 1 .75-.75h3a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25z"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className={styles.footer}
      data-layout="site-footer"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className={styles.footer__srTitle}>
        Pied de page
      </h2>

      <div className={styles.footer__shape} aria-hidden="true">
        <Image
          src="/footer-shape.png"
          alt=""
          width={1920}
          height={600}
          className={styles.footer__shapeImg}
          sizes="100vw"
        />
      </div>

      <div className={styles.footer__earth} aria-hidden="true">
        <Image
          src="/earth-footer.png"
          alt=""
          width={520}
          height={520}
          className={styles.footer__earthImg}
        />
      </div>

      <div className={styles.footer__top}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__grid}>
            <div className={styles.footer__brand}>
              <Link href="/" aria-label="Rock Digital — Accueil">
                <Image
                  src="/logo-rock-digital-white.png"
                  alt="Rock Digital"
                  className={styles.footer__logo}
                  width={314}
                  height={187}
                />
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

            <nav aria-label="Services" className={styles.footer__widget}>
              <h3 className={styles.footer__heading}>Services</h3>
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

            <nav aria-label="Entreprise" className={styles.footer__widget}>
              <h3 className={styles.footer__heading}>Entreprise</h3>
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

            <div className={styles.footer__widget}>
              <h3 className={styles.footer__heading}>Restez informé</h3>
              <p className={styles.footer__copy}>
                Recevez nos analyses sur le digital et les tendances tech, une
                fois par mois.
              </p>
              <NewsletterForm />
              <div className={styles.footer__contact}>
                <div className={styles.footer__contactItem}>
                  <span className={styles.footer__contactIcon} aria-hidden="true">
                    <EmailIcon />
                  </span>
                  <a href={contactLinks.email}>{contactInfo.email}</a>
                </div>
                <div className={styles.footer__contactItem}>
                  <span className={styles.footer__contactIcon} aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <a href={contactLinks.phone}>{contactInfo.phone}</a>
                </div>
                <div className={styles.footer__contactItem}>
                  <span className={styles.footer__contactIcon} aria-hidden="true">
                    <AddressIcon />
                  </span>
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__bottomRule} aria-hidden="true" />
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
