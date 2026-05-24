import { type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './SectionSubTitle.module.scss';

type SectionSubTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function SectionSubTitle({
  className,
  children,
  ...rest
}: SectionSubTitleProps) {
  return (
    <h5 className={cn(styles.sectionSubTitle, className)} {...rest}>
      {children}
    </h5>
  );
}
