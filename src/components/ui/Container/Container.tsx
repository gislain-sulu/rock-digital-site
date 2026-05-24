import { type ElementType, type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Container.module.scss';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid';

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: ContainerSize;
};

export function Container({
  as: Component = 'div',
  size = '2xl',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cn(styles.container, styles[`container--${size}`], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
