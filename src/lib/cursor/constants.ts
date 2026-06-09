
export const CURSOR_INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]:not([aria-disabled="true"])',
  'input:not([type="hidden"]):not(:disabled)',
  'textarea:not(:disabled)',
  'select:not(:disabled)',
  'label[for]',
  'summary',
  '[data-cursor="interactive"]',
  '[data-team-card]',
  '[data-service-box]',
  'article[class*="__card"]',
].join(', ');

export const CURSOR_LERP = 0.14;

export const CURSOR_RING_HOVER_SCALE = 1.85;

export const CURSOR_DOT_HOVER_SCALE = 1.2;
