'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { AddressIcon, PhoneIcon } from '@/components/icons/ContactIcons';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Container } from '@/components/ui/Container';
import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { contactInfo, contactLinks } from '@/lib/contact';

import styles from './ContactAddressBar.module.scss';

export function ContactAddressBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      registerGsap();

      if (prefersReducedMotion()) return;

      const boxes = section.querySelectorAll('[class*="addressArea__box"]');
      const icons = section.querySelectorAll('[class*="addressArea__icon"]');

      if (boxes.length) {
        gsap.from(boxes, {
          y: 48,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.16,
          ease: GSAP_EASE.out,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      icons.forEach((icon, index) => {
        gsap.from(icon, {
          scale: 0.75,
          autoAlpha: 0,
          duration: 0.55,
          delay: index * 0.08,
          ease: 'back.out(1.8)',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.addressArea}
      aria-label="Coordonnées rapides"
      data-page-section="contact-address"
    >
      <Container>
        <div className={styles.addressArea__row}>
          <div className={styles.addressArea__box}>
            <span className={styles.addressArea__icon} aria-hidden="true">
              <AddressIcon />
            </span>
            <h2 className={styles.addressArea__title}>
              Des fondations solides pour votre transformation digitale.
            </h2>
          </div>

          <div className={styles.addressArea__box}>
            <span className={styles.addressArea__icon} aria-hidden="true">
              <PhoneIcon />
            </span>
            <RockDigitalButton
              href={contactLinks.phone}
              variant="dark"
              className={styles.addressArea__cta}
            >
              {contactInfo.phone}
            </RockDigitalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
