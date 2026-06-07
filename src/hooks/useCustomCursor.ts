'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import {
  CURSOR_DOT_HOVER_SCALE,
  CURSOR_INTERACTIVE_SELECTOR,
  CURSOR_LERP,
  CURSOR_RING_HOVER_SCALE,
} from '@/lib/cursor/constants';
import { GSAP_DURATION, GSAP_EASE } from '@/lib/gsap/constants';
import { prefersReducedMotion } from '@/lib/gsap/motion';
import { registerGsap } from '@/lib/gsap/registerGsap';

import cursorStyles from '@/components/ui/CustomCursor/CustomCursor.module.scss';

const ringHoverClass = cursorStyles['customCursor__ring--hover'] as string;

function isTouchEnvironment(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export function useCustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!isTouchEnvironment() && !prefersReducedMotion());
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;

      registerGsap();

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const mouse = { x: -100, y: -100 };
      const ringPos = { x: -100, y: -100 };
      let rafId = 0;
      let hovering = false;
      let pressing = false;

      gsap.set([dot, ring], {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
        autoAlpha: 0,
        scale: 1,
      });

      const dotQuickX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: GSAP_EASE.out });
      const dotQuickY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: GSAP_EASE.out });
      const ringScale = gsap.quickTo(ring, 'scale', {
        duration: GSAP_DURATION.cardHover,
        ease: GSAP_EASE.out,
      });
      const dotScale = gsap.quickTo(dot, 'scale', {
        duration: GSAP_DURATION.cardHover,
        ease: GSAP_EASE.out,
      });

      const applyHoverScale = () => {
        if (pressing) return;
        ringScale(hovering ? CURSOR_RING_HOVER_SCALE : 1);
        dotScale(hovering ? CURSOR_DOT_HOVER_SCALE : 1);
      };

      const setHover = (active: boolean) => {
        if (hovering === active) return;
        hovering = active;
        ring.classList.toggle(ringHoverClass, active);
        applyHoverScale();
      };

      const tick = () => {
        ringPos.x += (mouse.x - ringPos.x) * CURSOR_LERP;
        ringPos.y += (mouse.y - ringPos.y) * CURSOR_LERP;
        gsap.set(ring, { x: ringPos.x, y: ringPos.y });
        rafId = requestAnimationFrame(tick);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        dotQuickX(event.clientX);
        dotQuickY(event.clientY);

        gsap.to([dot, ring], {
          autoAlpha: 1,
          duration: 0.18,
          ease: GSAP_EASE.out,
          overwrite: 'auto',
        });

        const target = event.target;
        if (target instanceof Element) {
          setHover(Boolean(target.closest(CURSOR_INTERACTIVE_SELECTOR)));
        }
      };

      const onPointerLeave = () => {
        gsap.to([dot, ring], {
          autoAlpha: 0,
          duration: 0.25,
          ease: GSAP_EASE.out,
        });
      };

      const onPointerEnter = () => {
        gsap.to([dot, ring], {
          autoAlpha: 1,
          duration: 0.25,
          ease: GSAP_EASE.out,
        });
      };

      const onPointerDown = () => {
        pressing = true;
        gsap.to(ring, {
          scale: hovering ? 1.55 : 0.88,
          duration: 0.18,
          ease: GSAP_EASE.out,
          overwrite: true,
        });
        gsap.to(dot, {
          scale: hovering ? 1 : 0.82,
          duration: 0.18,
          ease: GSAP_EASE.out,
          overwrite: true,
        });
      };

      const onPointerUp = () => {
        pressing = false;
        applyHoverScale();
      };

      rafId = requestAnimationFrame(tick);

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
      document.documentElement.addEventListener('pointerenter', onPointerEnter);
      window.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointerup', onPointerUp);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('pointerleave', onPointerLeave);
        document.documentElement.removeEventListener('pointerenter', onPointerEnter);
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerup', onPointerUp);
        ring.classList.remove(ringHoverClass);
      };
    },
    { scope: containerRef, dependencies: [enabled], revertOnUpdate: true }
  );

  return {
    containerRef,
    dotRef,
    ringRef,
    enabled,
  };
}
