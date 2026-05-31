'use client';

import { type FormEvent, useState } from 'react';

import styles from './NewsletterForm.module.scss';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const sendIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m2.6 10.42l7.64 3.34l3.34 7.64c.16.37.52.6.92.6h.05a1 1 0 0 0 .9-.69l5.5-17a.988.988 0 0 0-1.25-1.25L2.69 8.55c-.4.13-.67.49-.69.9s.22.8.6.97"
    />
  </svg>
);

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus('error');
      setMessage('Adresse e-mail invalide.');
      return;
    }
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus('success');
    setMessage('Merci ! Vous êtes désormais abonné.');
    setEmail('');
  }

  return (
    <div className={styles.subscribeForm2}>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="newsletter-email" className={styles.subscribeForm2__label}>
          Adresse e-mail
        </label>
        <div className={styles.formField2}>
          <input
            id="newsletter-email"
            type="email"
            name="EMAIL"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.formField2__input}
            aria-invalid={status === 'error' ? 'true' : undefined}
            aria-describedby="newsletter-status"
          />
          <button
            type="submit"
            className={styles.formField2__button}
            disabled={status === 'submitting'}
            aria-label="S'abonner à la newsletter"
          >
            {status === 'submitting' ? (
              <span className={styles.formField2__loading} aria-hidden="true">
                …
              </span>
            ) : (
              sendIcon
            )}
          </button>
        </div>
      </form>
      <p
        id="newsletter-status"
        className={styles.subscribeForm2__status}
        data-status={status}
        role={status === 'error' ? 'alert' : 'status'}
      >
        {message}
      </p>
    </div>
  );
}
