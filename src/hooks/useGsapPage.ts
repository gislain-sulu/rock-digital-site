'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { buildGlobalAnimations } from '@/lib/gsap/buildGlobalAnimations';
import { buildPageAnimations } from '@/lib/gsap/buildPageAnimations';
import { buildReducedMotionSite } from '@/lib/gsap/buildReducedMotionSite';
import { registerGsap } from '@/lib/gsap/registerGsap';
import { prefersReducedMotion } from '@/lib/gsap/motion';

type UseGsapPageOptions = {
  
  skipOnHome?: boolean;
};




export function useGsapPage(options: UseGsapPageOptions = { skipOnHome: true }) {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const main = document.getElementById('main');
    html.classList.add('motion-hydrated');

    const isInnerPage = pathname !== '/';
    main?.classList.toggle('gsap-inner-active', isInnerPage);

    registerGsap();

    if (options.skipOnHome && pathname === '/') {
      main?.classList.add('gsap-page-ready');
      return;
    }

    if (prefersReducedMotion()) {
      buildReducedMotionSite(document);
      main?.classList.add('gsap-page-ready');
      return () => {
        main?.classList.remove('gsap-page-ready', 'gsap-inner-active');
      };
    }

    const ctx = gsap.context(() => {
      cleanupRef.current = buildGlobalAnimations(document);
      buildPageAnimations(pathname, document);
    });

    main?.classList.add('gsap-page-ready');
    ScrollTrigger.refresh(true);

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener('load', onLoad, { once: true });

    return () => {
      window.removeEventListener('load', onLoad);
      cleanupRef.current?.();
      cleanupRef.current = null;
      ctx.revert();
      main?.classList.remove('gsap-page-ready', 'gsap-inner-active');
    };
  }, [pathname, options.skipOnHome]);
}
