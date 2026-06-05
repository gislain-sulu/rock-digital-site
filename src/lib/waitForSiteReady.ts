import { HOME_PRELOAD_ASSETS } from '@/lib/homePreloadAssets';

const HOME_BOOT_MIN_MS = 500;
const HOME_BOOT_MAX_MS = 8000;
const HOME_BOOT_STORAGE_KEY = 'rock-home-boot';

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => {
      window.setTimeout(() => resolve(fallback), ms);
    }),
  ]);
}

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
    const timer = window.setTimeout(() => resolve(), 4000);

    const finish = () => {
      window.clearTimeout(timer);
      resolve();
    };

    img.onload = finish;
    img.onerror = finish;
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

  try {
    await withTimeout(
      Promise.all([
        withTimeout(document.fonts.ready, 3000, undefined),
        waitForWindowLoad(),
        ...HOME_PRELOAD_ASSETS.map((src) => preloadAsset(src)),
      ]),
      HOME_BOOT_MAX_MS,
      undefined
    );
  } catch {
    // Ne jamais bloquer l'accueil sur une erreur de préchargement.
  }

  const elapsed = performance.now() - startedAt;
  if (elapsed < HOME_BOOT_MIN_MS) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, HOME_BOOT_MIN_MS - elapsed);
    });
  }
}
