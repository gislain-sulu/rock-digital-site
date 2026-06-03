# Animations GSAP — Rock Digital

## Architecture

| Fichier | Rôle |
|---------|------|
| `constants.ts` | Easings & durées partagés |
| `dom.ts` | Helpers `q` / `qa` |
| `motion.ts` | `prefers-reduced-motion`, reset |
| `effects.ts` | Effets réutilisables (reveal, parallax, hovers, compteurs) |
| `buildGlobalAnimations.ts` | Header, footer, hovers cartes, `data-gsap-*` |
| `buildPageAnimations.ts` | Route → builder page |
| `BreadcrumbContent` / `BreadcrumbBackground` | Entrée breadcrumb (client) |
| `ContactArea` / `ContactAddressBar` | Animations contact (client, post-hydratation) |
| `AboutPage/*` + `AboutShowcase` (`motion="gsap"`) + `Stats` (`motion="gsap"`) | Animations À propos (client, post-hydratation) |
| `ServicesIntro` / `ServicesFaq` / `ITServices` | Animations Services + grille offres (client, post-hydratation) |
| `build*Portfolio*` | Animations portfolio (orchestrateur) |
| `homeHeroEntrance.ts` | Entrée cinématique hero (accueil) |
| `homeScrollAnimations.ts` | Scroll sections accueil |

## Orchestrateurs React

- **Accueil** : `HomeScrollOrchestrator` (après boot loader)
- **Pages internes** : `SiteScrollOrchestrator` via `AppMotionProvider` dans `layout.tsx`
- **Hook** : `useGsapPage()` — `gsap.context().revert()` au changement de route

## Attributs data

- `data-gsap-region="breadcrumb"` — bandeau page interne
- `data-gsap-reveal` — fade-up au scroll
- `data-gsap-reveal="stagger"` — enfants en cascade
- `data-gsap-reveal="mask"` — révélation clip-path (images)
- `data-gsap-counter` + `data-gsap-counter-to` — compteurs KPI
- `data-about-enter` — entrée intro À propos (CSS `--enterPending` + timeline GSAP)
- `data-services-enter` — entrée intro Services (même pattern)

## Performance

- Propriétés GPU : `transform`, `opacity`, `clipPath`
- `clearProps` après reveals
- `prefers-reduced-motion` : reset immédiat, pas de ScrollTrigger actif
- Lenis synchronisé via `attachLenisScrollTrigger`
