/** Sélecteurs Hero compatibles CSS Modules (`Hero_hero__*` dans le DOM). */
export const HERO_SELECTORS = {
  titleLine: '[class*="hero__titleLine"]',
  word: '[class*="hero__word"]',
  leadChunk: '[class*="hero__leadChunk"]',
  lead: '[class*="hero__lead"]:not([class*="hero__leadChunk"])',
  actionsChild: '[class*="hero__actions"] > *',
  visualCol: '[class*="hero__visualCol"]',
  scroll: '[class*="hero__scroll"]',
  media: '[class*="hero__media"]',
  imageWrap: '[class*="hero__imageWrap"]',
  glow: '[class*="hero__glow"]',
  layout: '[class*="hero__layout"]',
  titleHighlight: '[class*="hero__titleHighlight"]',
} as const;

export const HERO_ENTRANCE_TARGETS = `#hero ${HERO_SELECTORS.titleLine}, #hero ${HERO_SELECTORS.word}, #hero ${HERO_SELECTORS.leadChunk}, #hero ${HERO_SELECTORS.lead}, #hero ${HERO_SELECTORS.actionsChild}, #hero ${HERO_SELECTORS.visualCol}, #hero [data-hero-visual], #hero [data-hero-visual] img, #hero ${HERO_SELECTORS.scroll}, #hero ${HERO_SELECTORS.media}`;
