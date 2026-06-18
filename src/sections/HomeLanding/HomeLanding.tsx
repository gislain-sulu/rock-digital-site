import type { ReactNode } from 'react';

import styles from './HomeLanding.module.scss';

type HomeLandingProps = {
  children: ReactNode;
};

export function HomeLanding({ children }: HomeLandingProps) {
  return (
    <div className={styles.homeLanding} data-home-landing>
      {children}
    </div>
  );
}
