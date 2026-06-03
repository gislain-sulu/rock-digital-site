const ROOT_SELECTOR = '[data-home-boot-content]';
const MAX_WAIT_MS = 4000;

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function hasEntranceTargets(root: Element): boolean {
  const hero = root.querySelector('#hero');
  const header = document.querySelector('[data-layout="site-header"] .navbar');
  const words = root.querySelectorAll('#hero [class*="hero__word"]');
  const leadChunks = root.querySelectorAll('#hero [class*="hero__leadChunk"]');

  return Boolean(hero && header && words.length > 0 && leadChunks.length > 0);
}

/**
 * Attend que le Hero et le header soient dans le DOM et peints
 * (évite les courses après le PageLoader / hydration).
 */
export async function waitForHomeEntranceDom(): Promise<Element | null> {
  if (typeof window === 'undefined') return null;

  const started = performance.now();

  while (performance.now() - started < MAX_WAIT_MS) {
    const root = document.querySelector(ROOT_SELECTOR);
    if (root && hasEntranceTargets(root)) {
      await nextFrame();
      await nextFrame();
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        await document.fonts.ready;
      }
      await nextFrame();
      return root;
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  return document.querySelector(ROOT_SELECTOR);
}
