'use client';

import { type FormEvent, useState } from 'react';

import styles from './NewsletterForm.module.scss';

type Status = 'idle' | 'submitting' | 'success' | 'error';

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
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className={styles.form__label}>
        Adresse e-mail
      </label>
      <div className={styles.form__row}>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="vous@entreprise.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.form__input}
          aria-invalid={status === 'error' ? 'true' : undefined}
          aria-describedby="newsletter-status"
        />
        <button
          type="submit"
          className={styles.form__submit}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? '...' : "S'abonner"}
        </button>
      </div>
      <p
        id="newsletter-status"
        className={styles.form__status}
        data-status={status}
        role={status === 'error' ? 'alert' : 'status'}
      >
        {message}
      </p>
    </form>
  );
}
