import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Open_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { GoTopButton } from '@/components/layout/GoTopButton';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { AppMotionProvider } from '@/components/providers/AppMotionProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { createMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo';

import '@/styles/globals.scss';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ui',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1b3a' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${openSans.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        <SmoothScrollProvider>
          <AppMotionProvider>
            <ScrollProgress />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <GoTopButton />
          </AppMotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
