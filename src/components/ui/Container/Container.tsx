import { type ElementType, forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import styles from './Container.module.scss';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid';

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: ContainerSize;
};

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Component = 'div', size = '2xl', className, children, ...rest },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(styles.container, styles[`container--${size}`], className)}
      {...rest}
    >
      {children}
    </Component>
  );
});
