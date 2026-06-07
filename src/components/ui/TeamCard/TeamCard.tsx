'use client';

import Image from 'next/image';
import {
  type ElementType,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils/cn';

import styles from './TeamCard.module.scss';

export type TeamCardSocials = {
  facebook?: string;
  github?: string;
  twitter?: string;
};

export type TeamCardProps = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt?: string;
  socials?: TeamCardSocials;
  className?: string;
  as?: ElementType;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8 15.8 7.2M8.2 13.2l7.6 3.6" strokeLinecap="round" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 2.75c-2.861 0-5.25 2.389-5.25 5.25v1.75H6.5a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25h2.75V21c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-6.75h2.75a.25.25 0 0 0 .242-.19l1-4a.25.25 0 0 0-.242-.31h-3.75V8a.76.76 0 0 1 .75-.75h3a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.162 19.488c.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.001 10.001 0 0 0 12 2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13.081 10.712-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576 6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576 5.842-6.962m-8.004 9.538L5.077 20.25"
      />
    </svg>
  );
}

const socialItems = [
  { key: 'facebook' as const, label: 'Facebook', Icon: FacebookIcon },
  { key: 'github' as const, label: 'GitHub', Icon: GithubIcon },
  { key: 'twitter' as const, label: 'Twitter', Icon: TwitterIcon },
];

export function TeamCard({
  name,
  role,
  imageSrc,
  imageAlt,
  socials,
  className,
  as: Component = 'article',
}: TeamCardProps) {
  const menuId = useId();
  const shareRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const links = socialItems
    .map(({ key, label, Icon }) => ({
      key,
      label,
      Icon,
      href: socials?.[key],
    }))
    .filter((item): item is typeof item & { href: string } => Boolean(item.href));

  const hasSocials = links.length > 0;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!shareRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <Component data-team-card className={cn(styles.teamCard, className)}>
      <div className={styles.teamCard__image}>
        <Image
          src={imageSrc}
          alt={imageAlt ?? name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.teamCard__imageEl}
        />
      </div>

      <div className={styles.teamCard__meta}>
        <div className={styles.teamCard__info}>
          <h3 className={styles.teamCard__name}>{name}</h3>
          <p className={styles.teamCard__role}>{role}</p>
        </div>

        {hasSocials && (
          <div
            ref={shareRef}
            className={cn(styles.teamCard__shareWrap, open && styles['teamCard__shareWrap--open'])}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              className={styles.teamCard__share}
              aria-label={`Réseaux sociaux de ${name}`}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((current) => !current)}
            >
              <ShareIcon />
            </button>

            <ul id={menuId} className={styles.teamCard__socials} role="menu">
              {links.map(({ key, label, Icon, href }) => (
                <li key={key} role="none">
                  <a
                    href={href}
                    className={styles.teamCard__socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    aria-label={`${label} de ${name}`}
                    onClick={() => setOpen(false)}
                  >
                    <Icon />
                    <span className={styles.teamCard__socialLabel}>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Component>
  );
}
