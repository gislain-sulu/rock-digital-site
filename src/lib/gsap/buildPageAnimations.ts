import { type GsapRoot } from './dom';
import { buildPortfolioPageAnimations } from './buildPortfolioPageAnimations';
import { buildDataRevealAnimations } from './effects';

const CLIENT_ANIMATED_ROUTES = ['/services', '/a-propos', '/contact'] as const;


export function buildPageAnimations(pathname: string, root: GsapRoot): void {
  if (CLIENT_ANIMATED_ROUTES.some((route) => pathname.startsWith(route))) {
    return;
  }
  if (pathname.startsWith('/portfolio')) {
    buildPortfolioPageAnimations(root);
    return;
  }

  
  buildDataRevealAnimations(root);
}
