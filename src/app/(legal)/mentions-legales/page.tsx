import type { Metadata } from 'next';

import { createMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales et informations relatives à l\u2019éditeur du site Rock Digital.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <h1>Mentions légales</h1>
      <p>
        Dernière mise à jour : 22 mai 2026.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>{siteConfig.url}</strong> est édité par Rock Digital,
        société spécialisée dans la conception et le développement de produits
        digitaux.
      </p>
      <ul>
        <li>Dénomination : Rock Digital</li>
        <li>Adresse : {siteConfig.address}</li>
        <li>Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Téléphone : {siteConfig.phone}</li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>Le directeur de la publication est le représentant légal de Rock Digital.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur le site (textes, images, vidéos,
        logos, marques, code source) sont la propriété exclusive de Rock Digital
        ou de ses partenaires. Toute reproduction est interdite sans
        autorisation préalable.
      </p>

      <h2>Crédits</h2>
      <p>
        Design et développement réalisés par Rock Digital. Typographies :
        Montserrat, Open Sans, Inter — Google Fonts.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question concernant le site, vous pouvez nous contacter à{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </>
  );
}
