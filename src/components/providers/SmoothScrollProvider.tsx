'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { type ReactNode, useEffect } from 'react';

import { useMotionReady } from '@/hooks/useMotionReady';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { attachLenisScrollTrigger, detachLenisScrollTrigger } from '@/lib/gsap/attachLenisScrollTrigger';
import { registerGsap } from '@/lib/gsap/registerGsap';

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useMotionReady();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    attachLenisScrollTrigger(lenis);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('lenis');

    return () => {
      gsap.ticker.remove(onTick);
      detachLenisScrollTrigger(lenis);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
