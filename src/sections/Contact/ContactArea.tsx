'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { cn } from '@/utils/cn';

import { ContactForm } from './ContactForm';
import styles from './ContactArea.module.scss';

export function ContactArea() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animatedRef.current) return;

      registerGsap();
      animatedRef.current = true;

      if (prefersReducedMotion()) {
        section.classList.remove(styles.contactArea_enterPending);
        return;
      }

      const headerEls = section.querySelectorAll<HTMLElement>(
        '[data-contact-enter]'
      );
      const formWrap = section.querySelector('[class*="contactArea__formWrap"]');
      const fields = section.querySelectorAll('[class*="contactArea__formBox"]');
      const media = section.querySelector('[class*="contactArea__media"]');
      const image = section.querySelector('[class*="contactArea__image"]');
      const quote = section.querySelector('[class*="contactArea__quote"]');

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.expo },
        onStart: () => {
          section.classList.remove(styles.contactArea_enterPending);
        },
      });

      if (headerEls.length) {
        tl.from(
          headerEls,
          {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0
        );
      }

      if (media) {
        tl.from(
          media,
          {
            x: 48,
            autoAlpha: 0,
            scale: 0.96,
            duration: 1.05,
            ease: GSAP_EASE.expo,
            clearProps: 'transform,opacity,visibility',
          },
          0.08
        );
      }

      if (image) {
        tl.from(
          image,
          { scale: 1.06, duration: 1.1, ease: GSAP_EASE.out, clearProps: 'transform' },
          0.14
        );
      }

      if (formWrap) {
        tl.from(
          formWrap,
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.95,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0.22
        );
      }

      if (fields.length) {
        tl.from(
          fields,
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0.34
        );
      }

      if (quote) {
        tl.from(
          quote,
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.85,
            ease: GSAP_EASE.out,
            clearProps: 'transform,opacity,visibility',
          },
          0.46
        );
      }

      return () => {
        animatedRef.current = false;
        section.classList.remove(styles.contactArea_enterPending);
      };
    },
    { scope: sectionRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(styles.contactArea, styles.contactArea_enterPending)}
      id="contact-form"
      data-page-section="contact"
    >
      <Container>
        <div className={styles.contactArea__layout}>
          <div className={styles.contactArea__main}>
            <div className={styles.contactArea__header}>
              <SectionSubTitle data-contact-enter>Contactez-nous</SectionSubTitle>
              <h2 className={styles.contactArea__title} data-contact-enter>
                Prenez rendez-vous en ligne
              </h2>
              <p className={styles.contactArea__titleLine} data-contact-enter>
                pour votre projet digital.
              </p>
            </div>

            <ContactForm />

            <blockquote className={styles.contactArea__quote} data-contact-enter>
              <p className={styles.contactArea__quoteText}>
                « Chaque projet digital commence par une conversation sincère. Nous
                sommes là pour écouter, structurer et bâtir avec vous une solution
                solide, utile et faite pour durer. »
              </p>
              <footer className={styles.contactArea__quoteAuthor}>
                <cite className={styles.contactArea__quoteName}>Yassine M.</cite>
                <span className={styles.contactArea__quoteRole}>
                  Account Manager — Rock Digital
                </span>
              </footer>
            </blockquote>
          </div>

          <aside
            className={styles.contactArea__media}
            aria-label="Illustration Rock Digital"
            data-contact-enter
          >
            <Image
              src="/contact-image-rock-digital.png"
              alt="Rock Digital — accompagnement digital"
              width={640}
              height={640}
              className={styles.contactArea__image}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </aside>
        </div>
      </Container>
    </section>
  );
}
