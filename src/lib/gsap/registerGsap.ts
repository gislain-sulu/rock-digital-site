import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;


export function registerGsap(): void {
  if (registered || typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}
