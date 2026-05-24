import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Textarea.module.scss';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, error, hideLabel = false, className, id, required, ...rest },
    ref
  ) {
    const inputId =
      id ??
      `textarea-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div
        className={cn(styles.field, error && styles['field--error'], className)}
      >
        <label
          htmlFor={inputId}
          className={cn(
            styles.field__label,
            hideLabel && styles['field__label--hidden']
          )}
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={styles.field__input}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(' ') || undefined
          }
          required={required}
          rows={5}
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
  }
);
