import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, hideLabel = false, className, id, required, ...rest },
  ref
) {
  const inputId =
    id ??
    `input-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn(styles.field, error && styles['field--error'], className)}>
      <label
        htmlFor={inputId}
        className={cn(styles.field__label, hideLabel && styles['field__label--hidden'])}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={styles.field__input}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        required={required}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className={styles.field__hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.field__error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
