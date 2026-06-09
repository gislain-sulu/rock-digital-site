'use client';

import { useGsapPage } from '@/hooks/useGsapPage';





export function SiteScrollOrchestrator() {
  useGsapPage({ skipOnHome: true });
  return null;
}
