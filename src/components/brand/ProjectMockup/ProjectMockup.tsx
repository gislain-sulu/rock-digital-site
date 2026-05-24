import { cn } from '@/utils/cn';

import styles from './ProjectMockup.module.scss';

type ProjectMockupProps = {
  accent?: 'blue' | 'orange' | 'dark';
  label?: string;
  category?: string;
  className?: string;
};

export function ProjectMockup({
  accent = 'blue',
  label = 'Rock Digital',
  category = 'Projet',
  className,
}: ProjectMockupProps) {
  return (
    <div
      className={cn(styles.mock, styles[`mock--${accent}`], className)}
      aria-hidden="true"
    >
      <div className={styles.mock__chrome}>
        <span className={styles.mock__dot} />
        <span className={styles.mock__dot} />
        <span className={styles.mock__dot} />
        <span className={styles.mock__url}>rockdigital.com</span>
      </div>
      <div className={styles.mock__viewport}>
        <div className={styles.mock__pattern} />
        <div className={styles.mock__content}>
          <span className={styles.mock__category}>{category}</span>
          <span className={styles.mock__label}>{label}</span>
          <div className={styles.mock__bars}>
            <span style={{ width: '60%' }} />
            <span style={{ width: '88%' }} />
            <span style={{ width: '42%' }} />
          </div>
          <div className={styles.mock__cards}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={styles.mock__shape} />
      </div>
    </div>
  );
}
