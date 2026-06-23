'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import {
  HERO_HIGHLIGHT_DEFAULT,
  HERO_HIGHLIGHT_MIN_CH,
  HERO_HIGHLIGHT_PHRASES,
} from '../lib/heroHighlightPhrases';
import styles from '../Hero.module.scss';

const TYPE_SPEED = 0.05;
const CURSOR_HOLD = 2;
const PHRASE_HOLD = 3;
const SCRAMBLE_DURATION = 0.45;
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@&%';

function waitForHomeHeroEntered(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (document.body.classList.contains('home-hero-entered')) return Promise.resolve();

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('home-hero-entered')) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  });
}

function scrambleText(
  element: HTMLElement,
  fromText: string,
  toText: string,
  duration: number
): gsap.core.Tween {
  const proxy = { progress: 0 };
  const maxLen = Math.max(fromText.length, toText.length);

  return gsap.to(proxy, {
    progress: 1,
    duration,
    ease: 'none',
    onUpdate: () => {
      const p = proxy.progress;
      let output = '';

      for (let i = 0; i < maxLen; i += 1) {
        const targetChar = toText[i];
        if (!targetChar) continue;

        if (p >= (i + 1) / maxLen) {
          output += targetChar;
        } else if (fromText[i] && p < 0.2) {
          output += fromText[i];
        } else {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      element.textContent = output;
    },
    onComplete: () => {
      element.textContent = toText;
    },
  });
}

function typewriter(element: HTMLElement, text: string, speed: number): gsap.core.Tween {
  const state = { index: 0 };

  return gsap.to(state, {
    index: text.length,
    duration: text.length * speed,
    ease: 'none',
    onUpdate: () => {
      element.textContent = text.slice(0, Math.round(state.index));
    },
    onComplete: () => {
      element.textContent = text;
    },
  });
}

export function HeroAnimatedHighlight() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = prefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      registerGsap();

      const wrap = wrapRef.current;
      const textEl = textRef.current;
      const cursorEl = cursorRef.current;
      if (!wrap || !textEl || !cursorEl) return;

      const isHomeLanding = Boolean(wrap.closest('[data-home-landing]'));
      let cancelled = false;
      const masterRef = { current: null as gsap.core.Timeline | null };

      const run = async () => {
        if (isHomeLanding) {
          await waitForHomeHeroEntered();
          if (cancelled) return;
        }

        textEl.textContent = '';
        cursorEl.classList.remove(styles['hero__titleCursor--hidden']);

        const firstPhrase = HERO_HIGHLIGHT_PHRASES[0];
        const typeDuration = firstPhrase.length * TYPE_SPEED;
        masterRef.current = gsap.timeline();
        const master = masterRef.current;

        master.add(typewriter(textEl, firstPhrase, TYPE_SPEED));
        master.to({}, { duration: typeDuration + CURSOR_HOLD });
        master.call(() => {
          cursorEl.classList.add(styles['hero__titleCursor--hidden']);
        });
        master.to({}, { duration: PHRASE_HOLD });

        const cycle = gsap.timeline({ repeat: -1 });
        const phraseCount = HERO_HIGHLIGHT_PHRASES.length;

        for (let i = 0; i < phraseCount; i += 1) {
          const current = HERO_HIGHLIGHT_PHRASES[i];
          const next = HERO_HIGHLIGHT_PHRASES[(i + 1) % phraseCount];

          cycle.add(scrambleText(textEl, current, next, SCRAMBLE_DURATION));
          cycle.to({}, { duration: PHRASE_HOLD });
        }

        master.add(cycle);
      };

      void run();

      return () => {
        cancelled = true;
        masterRef.current?.kill();
      };
    },
    { scope: wrapRef, dependencies: [reducedMotion] }
  );

  if (reducedMotion) {
    return (
      <span
        className={styles.hero__titleHighlightWrap}
        data-hero-digital
        style={{ minWidth: `${HERO_HIGHLIGHT_MIN_CH}ch` }}
      >
        <span className={styles.hero__titleHighlight}>{HERO_HIGHLIGHT_DEFAULT}</span>
      </span>
    );
  }

  return (
    <span
      ref={wrapRef}
      className={styles.hero__titleHighlightWrap}
      data-hero-digital
      style={{ minWidth: `${HERO_HIGHLIGHT_MIN_CH}ch` }}
    >
      <span
        ref={textRef}
        className={styles.hero__titleHighlight}
        aria-live="polite"
        aria-atomic="true"
      />
      <span ref={cursorRef} className={styles.hero__titleCursor} aria-hidden="true" />
    </span>
  );
}
