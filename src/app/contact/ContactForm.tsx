'use client';

import { useActionState } from 'react';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

import { contactAction, type ContactState } from './actions';
import styles from './contact.module.scss';

const initialState: ContactState = { status: 'idle' };

const budgets = [
  '< 10 000 €',
  '10 000 € – 30 000 €',
  '30 000 € – 80 000 €',
  '80 000 € +',
  'À discuter',
];

const subjects = [
  'Site web',
  'Application mobile',
  'Plateforme SaaS',
  'Transformation digitale',
  'Design UI/UX',
  'Branding digital',
  'Autre',
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    contactAction,
    initialState
  );

  return (
    <form action={formAction} className={styles.form} noValidate>
      <div className={styles.form__row}>
        <Input
          label="Nom complet"
          name="name"
          autoComplete="name"
          required
          error={state.errors?.name}
          placeholder="Jean Dupont"
        />
        <Input
          label="Email professionnel"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={state.errors?.email}
          placeholder="vous@entreprise.com"
        />
      </div>

      <div className={styles.form__row}>
        <Input
          label="Entreprise"
          name="company"
          autoComplete="organization"
          error={state.errors?.company}
          placeholder="Acme Inc."
        />
        <div className={styles.form__field}>
          <label htmlFor="subject" className={styles.form__label}>
            Objet de votre demande <span aria-hidden="true">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            aria-invalid={state.errors?.subject ? 'true' : undefined}
            className={styles.form__select}
          >
            <option value="" disabled>
              Choisissez un sujet
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {state.errors?.subject && (
            <p role="alert" className={styles.form__error}>
              {state.errors.subject}
            </p>
          )}
        </div>
      </div>

      <div className={styles.form__field}>
        <label htmlFor="budget" className={styles.form__label}>
          Budget indicatif
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={styles.form__select}
        >
          <option value="">Préférez ne pas le préciser</option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <Textarea
        label="Votre message"
        name="message"
        required
        error={state.errors?.message}
        placeholder="Parlez-nous de votre projet, vos objectifs, vos contraintes..."
      />

      <div className={styles.form__checkbox}>
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">
          J'accepte que mes informations soient traitées conformément à la{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a>.
        </label>
      </div>
      {state.errors?.consent && (
        <p role="alert" className={styles.form__error}>
          {state.errors.consent}
        </p>
      )}

      <button
        type="submit"
        className={styles.form__submit}
        disabled={isPending}
      >
        {isPending ? 'Envoi en cours…' : 'Envoyer mon message'}
      </button>

      {state.status === 'success' && state.message && (
        <p className={styles.form__success} role="status">
          {state.message}
        </p>
      )}
      {state.status === 'error' && state.message && (
        <p className={styles.form__alert} role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
