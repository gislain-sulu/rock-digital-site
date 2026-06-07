import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Rock Digital',
  tagline: 'Des fondations solides pour votre transformation digitale.',
  description:
    'Rock Digital — Agence digitale spécialisée dans la création de sites web, applications mobiles, plateformes SaaS et transformation digitale. Innovation, expertise, performance.',
  url: 'https://www.rockdigital.com',
  ogImage: '/og-default.png',
  locale: 'fr_FR',
  email: 'contact@rockdigital.com',
  phone: '+212 600 000 000',
  address: 'Casablanca, Maroc',
  socials: {
    linkedin: 'https://www.linkedin.com/company/rockdigital',
    twitter: 'https://twitter.com/rockdigital',
    instagram: 'https://www.instagram.com/rockdigital',
    facebook: 'https://www.facebook.com/rockdigital',
  },
} as const;

type CreateMetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataParams = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@rockdigital',
    },
    icons: {
      icon: '/rockdigital-favicon.svg',
      shortcut: '/rockdigital-favicon.svg',
      apple: '/rockdigital-favicon.svg',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    sameAs: Object.values(siteConfig.socials),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'fr',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
