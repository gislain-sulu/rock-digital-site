import { AddressIcon, PhoneIcon } from '@/components/icons/ContactIcons';
import { RockDigitalButton } from '@/components/ui/RockDigitalButton';
import { Container } from '@/components/ui/Container';
import { contactInfo, contactLinks } from '@/lib/contact';

import styles from './ContactAddressBar.module.scss';

export function ContactAddressBar() {
  return (
    <section className={styles.addressArea} aria-label="Coordonnées rapides">
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
