# Rock Digital — Site Web Premium

> _Des fondations solides pour votre transformation digitale._

Site web officiel de **Rock Digital**, agence digitale spécialisée dans la création de sites web, applications mobiles, plateformes SaaS et transformation digitale.

Construit en respect strict de la charte graphique officielle Rock Digital (v2 - mai 2026) : palette `#2E6EBB` / `#F59E0B` / `#231F20`, typographies Montserrat / Open Sans / Inter, motifs pixels en décomposition et facettes de montagne.

---

## Stack technique

| Catégorie       | Technologie                                  |
| --------------- | -------------------------------------------- |
| Framework       | [Next.js 15](https://nextjs.org/) (App Router) |
| Langage         | TypeScript (strict)                          |
| Styling         | Sass / SCSS Modules — convention BEM         |
| Animations      | [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll   | [Lenis](https://github.com/darkroomengineering/lenis) |
| Fonts           | `next/font/google` — Montserrat, Open Sans, Inter |
| Validation      | [Zod](https://zod.dev/)                      |
| Linting         | ESLint (`next/core-web-vitals`, `next/typescript`) |

**Pas** de Tailwind CSS. **Pas** de styles inline. **Pas** de composants géants non maintenables.

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer le build de production en local
npm start

# Vérifier les types TypeScript
npm run typecheck

# Vérifier le linting
npm run lint
```

Ouvrir [http://localhost:3000](http://localhost:3000) après le `npm run dev`.

---

## Architecture du projet

```text
src/
├── app/                              # App Router (Next.js 15)
│   ├── (legal)/                      # Group de routes — pages légales
│   │   ├── mentions-legales/
│   │   ├── politique-confidentialite/
│   │   └── cgu/
│   ├── a-propos/                     # Page À propos
│   ├── blog/                         # Page Blog (placeholder)
│   ├── contact/                      # Page Contact + Server Action
│   ├── portfolio/                    # Page Portfolio + grille filtrable
│   ├── services/                     # Page Services + FAQ
│   ├── layout.tsx                    # Root layout (fonts, SEO, providers)
│   ├── template.tsx                  # Transition de page (Framer Motion)
│   ├── page.tsx                      # Landing
│   ├── loading.tsx                   # UI de chargement
│   ├── not-found.tsx                 # 404
│   ├── error.tsx                     # Boundary erreurs
│   ├── sitemap.ts                    # sitemap.xml
│   ├── robots.ts                     # robots.txt
│   ├── manifest.ts                   # Web App Manifest
│   ├── opengraph-image.tsx           # OG image dynamique
│   └── icon.tsx                      # Favicon dynamique
│
├── sections/                         # Sections de la landing
│   ├── Hero/                         # Hero spectaculaire
│   ├── ValueProps/                   # 4 piliers
│   ├── Services/                     # 7 services
│   ├── Process/                      # Timeline 6 étapes
│   ├── Portfolio/                    # Projets
│   ├── Technologies/                 # Marquee + grille
│   ├── Stats/                        # Compteurs animés (fond bleu)
│   ├── Testimonials/                 # Slider témoignages
│   └── CTA/                          # CTA final (fond noir)
│
├── components/
│   ├── brand/                        # Identité Rock Digital
│   │   ├── Logo/                     # 6 variantes SVG
│   │   ├── MountainFacets/           # Montagne facettée
│   │   ├── PixelGrid/                # Pixels en décomposition
│   │   └── ProjectMockup/            # Mockup de projet
│   ├── ui/                           # Primitives UI
│   │   ├── Button/
│   │   ├── Container/
│   │   ├── Section/
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── Tag/
│   │   ├── Input/
│   │   ├── Textarea/
│   │   └── SectionHeading/
│   ├── layout/                       # Header, Footer, PageHeader, ScrollProgress
│   ├── motion/                       # Composants motion réutilisables
│   │   ├── FadeIn/
│   │   ├── StaggerGroup/
│   │   ├── SplitText/
│   │   ├── ParallaxLayer/
│   │   ├── Counter/
│   │   └── MagneticButton/
│   ├── icons/                        # SVG iconographie
│   └── providers/                    # SmoothScrollProvider (Lenis)
│
├── animations/                       # Variants Framer Motion partagés
├── hooks/                            # useReducedMotion, useMediaQuery
├── lib/                              # seo.ts, navigation.ts, content.ts
├── utils/                            # cn (clsx)
├── styles/                           # Design tokens & globals
│   ├── _tokens.scss                  # Palette, typographies, espacements
│   ├── _mixins.scss                  # h1, h2, container, glass, etc.
│   ├── _breakpoints.scss             # Media queries mobile-first
│   ├── _typography.scss              # Base typographique
│   ├── _reset.scss                   # Reset moderne
│   └── globals.scss                  # Styles globaux + custom props
└── types/                            # Types TypeScript partagés (extensible)
```

### Conventions

- **Un composant = un dossier** (`Component.tsx` + `Component.module.scss` + `index.ts`).
- **BEM** dans les `.module.scss` : `.card`, `.card__title`, `.card--featured`.
- **Tokens** centralisés dans `_tokens.scss` + CSS custom properties pour les valeurs runtime.
- **Mobile-first** : tous les styles partent du mobile, on monte via `@include bp-up(...)`.

---

## Direction artistique

### Palette officielle (charte v2)

| Token              | HEX       | Usage                          |
| ------------------ | --------- | ------------------------------ |
| Bleu principal     | `#2E6EBB` | Liens, éléments interactifs    |
| Orange principal   | `#F59E0B` | CTA, accents, indicateurs      |
| Noir profond       | `#231F20` | Textes principaux, fonds dark  |
| Gris foncé         | `#4D4D4D` | Textes secondaires             |
| Bleu marine deep   | `#1E4FA1` | Sections d'accent (Stats)      |
| Bleu clair (soft)  | `#E6F0FF` | Backgrounds doux, badges       |
| Orange soft        | `#FFF4E0` | Backgrounds doux, badges       |
| Vert succès        | `#22C55E` | Messages de validation         |

### Dégradés

- **Bleu** : `#1E4FA1 → #2E6EBB`
- **Orange** : `#F59E0B → #FDBA3A`

### Typographies

- **Titres** : Montserrat (ExtraBold 48–80px, Bold 28–40px, SemiBold 20–24px)
- **Corps** : Open Sans (Regular 16–18px)
- **UI / CTA** : Inter (Medium 14–16px)

### Univers visuel

- **Pixels en décomposition** — motif iconique inspiré du logo (composant `PixelGrid`).
- **Facettes de montagne** — formes angulaires bleues (composant `MountainFacets`).
- **Minimalisme géométrique** — espace négatif, lignes épurées.

---

## Animations

Toutes les animations sont **élégantes, naturelles et premium**. Pas d'effets agressifs ni de clignotements (interdits par la charte).

- Smooth scroll global via **Lenis** (`SmoothScrollProvider`)
- Reveal au scroll via Framer Motion (`FadeIn`, `StaggerGroup`)
- Animations de texte (`SplitText` — masque + reveal)
- Parallaxe légère sur images & pixels (`ParallaxLayer`)
- Boutons magnétiques (`MagneticButton`)
- Compteurs animés (`Counter`)
- Page transitions via `template.tsx` (fade + y léger)

### Accessibilité

- `prefers-reduced-motion` respecté partout (`useReducedMotion`)
- Quand l'utilisateur préfère moins de mouvement : pas de smooth scroll, pas de split text, pas de parallaxe

---

## SEO & Performance

- ✅ **Metadata API** par route (title, description, OG, Twitter)
- ✅ **sitemap.xml** dynamique
- ✅ **robots.txt** dynamique
- ✅ **OG image** générée dynamiquement (Edge runtime)
- ✅ **Favicon** SVG généré dynamiquement
- ✅ **Manifest** Web App
- ✅ **JSON-LD** (`Organization`, `WebSite`) dans le layout root
- ✅ **next/font** pour Montserrat / Open Sans / Inter (zéro CLS)
- ✅ **next/image** prêt à l'emploi (formats AVIF / WebP)
- ✅ Optimisation `optimizePackageImports` (Framer Motion, Lenis)

### Cible Lighthouse : **95+** sur toutes les métriques.

---

## Accessibilité

- Landmarks HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`)
- `aria-label`, `aria-current`, `aria-expanded`, `aria-controls` partout
- Skip link `Aller au contenu principal`
- Focus visible (outline orange `#F59E0B`)
- Ratios de contraste WCAG AA respectés
- Navigation clavier complète (menu mobile, slider témoignages, formulaires)
- `prefers-reduced-motion` désactive parallaxe et split text

---

## Pages

| Route                       | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `/`                         | Landing (10 sections cinématographiques)        |
| `/services`                 | Détails des 7 services + FAQ                    |
| `/portfolio`                | Grille filtrable des projets                    |
| `/a-propos`                 | Histoire, valeurs, équipe, carrières            |
| `/contact`                  | Formulaire (Server Action + Zod)                |
| `/blog`                     | Blog placeholder (3 articles fictifs)           |
| `/mentions-legales`         | Mentions légales                                |
| `/politique-confidentialite`| Politique de confidentialité (RGPD)             |
| `/cgu`                      | Conditions générales d'utilisation              |

---

## Responsive

Mobile-first, breakpoints :

```scss
$bp-sm: 480px;
$bp-md: 768px;
$bp-lg: 1024px;
$bp-xl: 1280px;
$bp-2xl: 1536px;
$bp-3xl: 1920px;
```

Typo fluide via `clamp()` pour tous les titres majeurs.

---

## Scripts disponibles

| Commande           | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Serveur de développement (port 3000)         |
| `npm run build`    | Build de production                          |
| `npm start`        | Démarrer le build de production              |
| `npm run lint`     | Vérification ESLint                          |
| `npm run typecheck`| Vérification TypeScript stricte              |

---

## Crédits

- **Direction artistique** : conforme à la charte graphique officielle Rock Digital (v2 - mai 2026)
- **Typographies** : Montserrat, Open Sans, Inter via [Google Fonts](https://fonts.google.com/)
- **Smooth scroll** : [Lenis](https://github.com/darkroomengineering/lenis)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)

---

© Rock Digital · _Innovation · Expertise · Performance_
