export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Réalisations', href: '/portfolio' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerServices: NavItem[] = [
  { label: 'Sites Web', href: '/services#web' },
  { label: 'Applications Mobiles', href: '/services#mobile' },
  { label: 'UI / UX Design', href: '/services#design' },
  { label: 'Plateformes SaaS', href: '/services#saas' },
  { label: 'Transformation Digitale', href: '/services#transformation' },
  { label: 'Automatisation', href: '/services#automatisation' },
  { label: 'Branding Digital', href: '/services#branding' },
];

export const footerCompany: NavItem[] = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Notre approche', href: '/a-propos#approche' },
  { label: 'Carrières', href: '/a-propos#carrieres' },
  { label: 'Réalisations', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
