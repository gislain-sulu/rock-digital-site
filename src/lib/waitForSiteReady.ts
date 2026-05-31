import { HOME_PRELOAD_ASSETS } from '@/lib/homePreloadAssets';

const HOME_BOOT_MIN_MS = 500;
const HOME_BOOT_STORAGE_KEY = 'rock-home-boot';

export function isHomeBootComplete(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(HOME_BOOT_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function markHomeBootComplete(): void {
  try {
    sessionStorage.setItem(HOME_BOOT_STORAGE_KEY, '1');
  } catch {
    // sessionStorage indisponible (mode privé strict, etc.)
  }
}

function preloadAsset(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function waitForWindowLoad(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (document.readyState === 'complete') return Promise.resolve();

  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

/** Attend polices, images d'accueil et fin de chargement document avant affichage. */
export async function waitForHomeSiteReady(): Promise<void> {
  const startedAt = performance.now();

  await Promise.all([
    document.fonts.ready,
    waitForWindowLoad(),
    ...HOME_PRELOAD_ASSETS.map((src) => preloadAsset(src)),
  ]);

  const elapsed = performance.now() - startedAt;
  if (elapsed < HOME_BOOT_MIN_MS) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, HOME_BOOT_MIN_MS - elapsed);
    });
  }
}
