import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { SectionSubTitle } from '@/components/ui/SectionSubTitle';

import { ContactForm } from './ContactForm';
import styles from './ContactArea.module.scss';

export function ContactArea() {
  return (
    <section className={styles.contactArea} id="contact-form">
      <Container>
        <div className={styles.contactArea__layout}>
          <div className={styles.contactArea__main}>
            <div className={styles.contactArea__header}>
              <SectionSubTitle>Contactez-nous</SectionSubTitle>
              <h2 className={styles.contactArea__title}>
                Prenez rendez-vous en ligne
              </h2>
              <p className={styles.contactArea__titleLine}>
                pour votre projet digital.
              </p>
            </div>
            <ContactForm />

            <blockquote className={styles.contactArea__quote}>
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

          <aside className={styles.contactArea__media} aria-label="Illustration Rock Digital">
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
