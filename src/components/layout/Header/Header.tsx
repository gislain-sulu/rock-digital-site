'use client';

import { Navbar } from '../Navbar';
import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.header} data-layout="site-header">
      <span className={styles.header__halo} aria-hidden />
      <Navbar />
    </div>
  );
}
