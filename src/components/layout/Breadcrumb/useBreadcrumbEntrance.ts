import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { type RefObject } from 'react';

import { GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

function q<T extends Element>(root: Element, selector: string): T | null {
  return root.querySelector(selector) as T | null;
}

/** Animation titre + fil d'Ariane (client uniquement, post-hydratation). */
export function useBreadcrumbEntrance(
  contentRef: RefObject<HTMLDivElement | null>,
  ready: boolean
): void {
  useGSAP(
    () => {
      const content = contentRef.current;
      if (!ready || !content) return;

      registerGsap();

      if (prefersReducedMotion()) {
        gsap.set(content.children, { clearProps: 'all' });
        return;
      }

      const title = q<HTMLElement>(content, '[class*="breadcrumbArea__title"]');
      const list = q(content, '[class*="breadcrumbArea__list"]');

      const tl = gsap.timeline({
        delay: 0.05,
        defaults: { ease: GSAP_EASE.expo },
      });

      if (title) {
        tl.fromTo(
          title,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power2.inOut' },
          0
        );
      }

      if (list) {
        tl.from(
          list,
          { autoAlpha: 0, y: 20, duration: 0.75, ease: GSAP_EASE.out },
          0.22
        );
      }
    },
    { scope: contentRef, dependencies: [ready], revertOnUpdate: true }
  );
}
