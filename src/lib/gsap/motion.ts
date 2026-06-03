import gsap from 'gsap';

/** Détection `prefers-reduced-motion` (sync, hors React). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Réinitialise les propriétés animées pour l'accessibilité. */
export function resetGsapTargets(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: 'all' }
): void {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return;
  gsap.set(targets, vars);
}
