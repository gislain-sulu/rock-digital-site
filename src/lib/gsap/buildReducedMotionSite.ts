import { type GsapRoot, qa } from './dom';
import { resetGsapTargets } from './motion';

/** Affichage immédiat sans motion — pages internes + globales. */
export function buildReducedMotionSite(root: GsapRoot): void {
  resetGsapTargets([
    ...qa(root, '[data-gsap-region="breadcrumb"] *'),
    ...qa(root, '[data-gsap-reveal], [data-gsap-reveal] *'),
    ...qa(root, '#main section, #main article'),
    ...qa(root, '[data-layout="site-footer"] *'),
    ...qa(root, '[data-service-box]'),
    ...qa(root, '[data-gsap-counter]'),
    ...qa(root, '[data-page-section="contact"] [data-contact-enter]'),
    ...qa(root, '[data-page-section="contact-address"] *'),
    ...qa(root, '[data-page-section="about-intro"] [data-about-enter]'),
    ...qa(root, '[data-about-enter]'),
    ...qa(root, '[data-page-section="services-intro"] [data-services-enter]'),
    ...qa(root, '[data-services-enter]'),
    ...qa(root, '[data-value-card]'),
  ]);
}
