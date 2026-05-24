import { type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Tag.module.scss';

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'blue' | 'orange' | 'neutral' | 'success';
};

export function Tag({ tone = 'neutral', className, children, ...rest }: TagProps) {
  return (
    <span
      className={cn(styles.tag, styles[`tag--${tone}`], className)}
      {...rest}
    >
      {children}
    </span>
  );
}
