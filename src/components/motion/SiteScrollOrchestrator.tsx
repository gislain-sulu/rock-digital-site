'use client';

import { useGsapPage } from '@/hooks/useGsapPage';

/**
 * Orchestrateur GSAP — pages internes (hors accueil).
 * L'accueil est géré par {@link HomeScrollOrchestrator}.
 */
export function SiteScrollOrchestrator() {
  useGsapPage({ skipOnHome: true });
  return null;
}
