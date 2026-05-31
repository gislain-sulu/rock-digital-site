'use client';

import { useActionState } from 'react';

import { RockDigitalButton } from '@/components/ui/RockDigitalButton';

import { contactAction, type ContactState } from './actions';
import styles from './ContactArea.module.scss';

const initialState: ContactState = { status: 'idle' };

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
};

function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required,
  error,
}: FieldProps) {
  return (
    <div className={styles.contactArea__formBox}>
      <label htmlFor={name} className={styles.contactArea__srOnly}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className={styles.contactArea__fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(contactAction, initialState);

  return (
    <div className={styles.contactArea__formWrap}>
      <form action={formAction} className={styles.contactArea__form} noValidate>
        <div className={styles.contactArea__formGrid}>
          <FormField
            name="name"
            label="Nom"
            placeholder="Votre nom *"
            required
            error={state.errors?.name}
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Votre e-mail *"
            required
            error={state.errors?.email}
          />
          <FormField
            name="subject"
            label="Objet"
            placeholder="Objet *"
            required
            error={state.errors?.subject}
          />
          <FormField
            name="phone"
            label="Téléphone"
            type="tel"
            placeholder="Téléphone *"
            required
            error={state.errors?.phone}
          />
          <div
            className={`${styles.contactArea__formBox} ${styles['contactArea__formBox--full']}`}
          >
            <label htmlFor="message" className={styles.contactArea__srOnly}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Message"
              required
              aria-invalid={state.errors?.message ? 'true' : undefined}
            />
            {state.errors?.message && (
              <p role="alert" className={styles.contactArea__fieldError}>
                {state.errors.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.contactArea__consent}>
          <input id="consent" name="consent" type="checkbox" required />
          <label htmlFor="consent">
            J&apos;accepte que mes informations soient traitées conformément à la{' '}
            <a href="/politique-confidentialite">politique de confidentialité</a>.
          </label>
        </div>
        {state.errors?.consent && (
          <p role="alert" className={styles.contactArea__fieldError}>
            {state.errors.consent}
          </p>
        )}

        <div className={styles.contactArea__submitWrap}>
          <RockDigitalButton
            variant="default"
            type="submit"
            disabled={isPending}
            icon={!isPending ? arrowIcon : undefined}
            iconPosition="right"
            linkClassName={styles.contactArea__submit}
          >
            {isPending ? 'Envoi…' : 'Envoyer'}
          </RockDigitalButton>
        </div>

        {state.status === 'success' && state.message && (
          <p className={styles.contactArea__formSuccess} role="status">
            {state.message}
          </p>
        )}
        {state.status === 'error' && state.message && (
          <p className={styles.contactArea__formAlert} role="alert">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
