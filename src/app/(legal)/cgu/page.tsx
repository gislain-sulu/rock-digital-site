import type { Metadata } from 'next';

import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site Rock Digital.",
  path: '/cgu',
});

export default function CGUPage() {
  return (
    <>
      <h1>Conditions générales d'utilisation</h1>
      <p>Dernière mise à jour : 22 mai 2026.</p>

      <h2>Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation (CGU) régissent
        l'utilisation du site Rock Digital et l'ensemble des services qui y
        sont proposés.
      </p>

      <h2>Acceptation</h2>
      <p>
        L'utilisation du site implique l'acceptation pleine et entière des
        présentes CGU. Si vous n'acceptez pas ces conditions, nous vous
        invitons à ne pas utiliser le site.
      </p>

      <h2>Accès au site</h2>
      <p>
        L'accès au site est gratuit. Tous les frais nécessaires à cet accès
        (équipement informatique, connexion internet) sont à votre charge.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Tous les éléments présents sur le site (textes, images, vidéos, logos,
        code source) sont protégés par le droit de la propriété intellectuelle.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Rock Digital met tout en œuvre pour assurer la disponibilité et la
        qualité du site, mais ne saurait être tenu responsable des interruptions
        de service ou erreurs de contenu.
      </p>

      <h2>Modifications</h2>
      <p>
        Rock Digital se réserve le droit de modifier les présentes CGU à tout
        moment. Les modifications entrent en vigueur dès leur publication sur
        le site.
      </p>
    </>
  );
}
