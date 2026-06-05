export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  icon: 'web' | 'mobile' | 'design' | 'saas' | 'transformation' | 'automation' | 'branding';
};

export const services: Service[] = [
  {
    id: 'web',
    number: '01',
    title: 'Développement Web',
    description:
      'Sites vitrines, sites e-commerce, plateformes éditoriales. Architecture moderne, performance maximale, expérience irréprochable.',
    bullets: [
      'Next.js, React, TypeScript',
      'Performance Lighthouse 95+',
      'SEO technique avancé',
    ],
    icon: 'web',
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Applications Mobiles',
    description:
      'Applications natives et cross-platform pour iOS et Android. Une seule équipe, une seule vision, une expérience cohérente.',
    bullets: [
      'Flutter, React Native',
      'Notifications push, offline-first',
      'Publication sur les stores',
    ],
    icon: 'mobile',
  },
  {
    id: 'design',
    number: '03',
    title: 'UI / UX Design',
    description:
      'De la recherche utilisateur à la livraison du design system, nous créons des interfaces lisibles, performantes et désirables.',
    bullets: [
      'Recherche & wireframing',
      'Design system scalable',
      'Prototypes haute-fidélité',
    ],
    icon: 'design',
  },
  {
    id: 'saas',
    number: '04',
    title: 'Plateformes SaaS',
    description:
      "De l'idée au scale. Architecture multi-tenant, billing, dashboards, intégrations. Construit pour la croissance.",
    bullets: [
      'Architecture multi-tenant',
      'Billing & abonnements',
      'Intégrations API tierces',
    ],
    icon: 'saas',
  },
  {
    id: 'transformation',
    number: '05',
    title: 'Transformation Digitale',
    description:
      'Audit, stratégie, conduite du changement. Nous accompagnons votre entreprise à chaque étape de sa modernisation.',
    bullets: [
      'Audit & roadmap',
      'Migration progressive',
      'Formation des équipes',
    ],
    icon: 'transformation',
  },
  {
    id: 'automatisation',
    number: '06',
    title: 'IA & automatisation',
    description:
      'Workflows internes, intégrations métiers, pipelines de données. Reprenez le contrôle de votre productivité.',
    bullets: [
      'Workflows métiers sur mesure',
      'Intégrations API & ETL',
      'IA générative appliquée',
    ],
    icon: 'automation',
  },
  {
    id: 'branding',
    number: '07',
    title: 'Branding Digital',
    description:
      'Identité visuelle, chartes graphiques, design systems. Une marque solide se construit avec méthode et durabilité.',
    bullets: [
      'Logo & identité visuelle',
      'Charte graphique complète',
      'Guidelines digitales',
    ],
    icon: 'branding',
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Découverte',
    description:
      'Compréhension de vos enjeux, audit, ateliers avec vos équipes. Nous posons les fondations de la collaboration.',
  },
  {
    number: '02',
    title: 'Stratégie',
    description:
      "Roadmap, KPIs, architecture cible. Nous définissons un plan d'action clair et mesurable.",
  },
  {
    number: '03',
    title: 'Design',
    description:
      "Wireframes, prototypes, design system. L'expérience utilisateur prend forme.",
  },
  {
    number: '04',
    title: 'Développement',
    description:
      'Sprints courts, démos régulières, code review. Nous construisons vite, propre et durable.',
  },
  {
    number: '05',
    title: 'Déploiement',
    description:
      'Mise en production sécurisée, monitoring, formation. Tout est prêt pour passer à l\u2019échelle.',
  },
  {
    number: '06',
    title: 'Optimisation',
    description:
      'Mesure, analyse, itération continue. Votre produit évolue avec vos utilisateurs.',
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  year: string;
  accent: 'blue' | 'orange' | 'dark';
};

export const projects: Project[] = [
  {
    id: 'fintech-platform',
    title: 'Plateforme Fintech B2B',
    category: 'SaaS',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    description:
      "Plateforme de gestion financière temps réel pour PME. Tableau de bord, facturation, reporting et intégrations bancaires.",
    year: '2025',
    accent: 'blue',
  },
  {
    id: 'health-app',
    title: 'Application Santé Mobile',
    category: 'Mobile',
    tags: ['Flutter', 'Firebase', 'HIPAA'],
    description:
      "Application de suivi médical pour patients et praticiens, synchronisation cross-device et notifications intelligentes.",
    year: '2025',
    accent: 'orange',
  },
  {
    id: 'ecommerce-luxe',
    title: 'E-commerce Maison de Luxe',
    category: 'E-commerce',
    tags: ['Shopify', 'Next.js', 'GSAP'],
    description:
      "Refonte premium d'un site e-commerce, expérience cinématographique, conversion +42% en 3 mois.",
    year: '2024',
    accent: 'dark',
  },
  {
    id: 'edu-saas',
    title: 'EdTech Cloud',
    category: 'SaaS',
    tags: ['Laravel', 'Vue.js', 'AWS'],
    description:
      "Plateforme d'apprentissage hybride pour 30 000 étudiants. LMS, classes virtuelles, analytics pédagogiques.",
    year: '2024',
    accent: 'blue',
  },
  {
    id: 'logistics-dashboard',
    title: 'Dashboard Logistique',
    category: 'Transformation',
    tags: ['React', 'Node.js', 'Docker'],
    description:
      "Tour de contrôle temps réel pour groupe industriel : tracking, prévisions, intégrations ERP.",
    year: '2024',
    accent: 'orange',
  },
  {
    id: 'creative-agency',
    title: 'Site Agence Créative',
    category: 'Site Web',
    tags: ['Next.js', 'Framer Motion', 'CMS'],
    description:
      "Site immersif pour une agence créative parisienne. Animations sur-mesure, contenu géré via CMS headless.",
    year: '2025',
    accent: 'dark',
  },
];

export const partnerBrands = [
  'AROUNDS',
  'Technology',
  'Grameen',
  'Walmart',
  'Deluxon',
] as const;

/** Jeux de logos synchronisés avec chaque slide du carousel projets (page d'accueil). */
export const recentProjectPartnerSlides: readonly (readonly string[])[] = [
  ['AROUNDS', 'Technology', 'Grameen', 'Walmart', 'Deluxon'],
  ['Technology', 'Grameen', 'Walmart', 'Deluxon', 'AROUNDS'],
  ['Grameen', 'Walmart', 'Deluxon', 'AROUNDS', 'Technology'],
  ['Walmart', 'Deluxon', 'AROUNDS', 'Technology', 'Grameen'],
  ['Deluxon', 'AROUNDS', 'Technology', 'Grameen', 'Walmart'],
  ['AROUNDS', 'Grameen', 'Deluxon', 'Technology', 'Walmart'],
];

/** Vignettes carousel project-area (SoluTek project1–5.png) */
export const recentProjectImages: Record<string, string> = {
  'fintech-platform': '/project1.png',
  'health-app': '/project2.png',
  'ecommerce-luxe': '/project3.png',
  'edu-saas': '/project4.png',
  'logistics-dashboard': '/project5.png',
  'creative-agency': '/project1.png',
};

export type Technology = {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'data';
};

export const technologies: Technology[] = [
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Go', category: 'backend' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MongoDB', category: 'data' },
  { name: 'Redis', category: 'data' },
  { name: 'Docker', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'AWS', category: 'devops' },
  { name: 'Vercel', category: 'devops' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'React Native', category: 'mobile' },
  { name: 'Swift', category: 'mobile' },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Rock Digital a transformé notre plateforme en profondeur. Performances doublées, expérience radicalement améliorée, équipe impeccable.",
    author: 'Sarah Lemoine',
    role: 'CPO',
    company: 'Vantio SaaS',
    rating: 5,
  },
  {
    quote:
      "Une approche stratégique et un sens du détail rares. Notre lancement s\u2019est déroulé sans aucun incident et avec un design d\u2019exception.",
    author: 'Karim Bennani',
    role: 'CEO',
    company: 'Atlas Health',
    rating: 4,
  },
  {
    quote:
      "Du conseil au code, ils ont porté notre vision. Nous avons enfin une fondation digitale solide pour scaler sereinement.",
    author: 'Léa Martin',
    role: 'Directrice Marketing',
    company: 'Maison Vertal',
    rating: 5,
  },
  {
    quote:
      "Ce qui distingue Rock Digital, c\u2019est leur exigence. Chaque détail est pensé. Chaque interaction est polie. Du grand art.",
    author: 'Antoine Dubois',
    role: 'Fondateur',
    company: 'Studio Orbe',
    rating: 4,
  },
];

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export const stats: Stat[] = [
  { label: 'Projets livrés', value: 150, suffix: '+' },
  { label: 'Clients satisfaits', value: 98, suffix: '%' },
  { label: 'Experts passionnés', value: 20, suffix: '+' },
  { label: 'Années d\u2019expertise', value: 10 },
];
