import type { Metadata } from 'next';

import { createMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles chez Rock Digital.',
  path: '/politique-confidentialite',
});

export default function PrivacyPage() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p>Dernière mise à jour : 22 mai 2026.</p>

      <p>
        Rock Digital attache une grande importance à la protection de vos
        données personnelles. Cette politique décrit les informations que nous
        collectons, comment nous les utilisons et vos droits.
      </p>

      <h2>Données collectées</h2>
      <p>
        Lorsque vous utilisez ce site, nous pouvons collecter :
      </p>
      <ul>
        <li>les informations que vous nous transmettez via le formulaire de contact (nom, email, entreprise, message) ;</li>
        <li>les informations techniques liées à votre navigation (cookies analytiques, anonymisés) ;</li>
        <li>les données nécessaires à l'envoi de notre newsletter (email).</li>
      </ul>

      <h2>Finalités</h2>
      <p>Vos données sont traitées pour :</p>
      <ul>
        <li>répondre à vos demandes et établir des propositions commerciales ;</li>
        <li>améliorer le site et son contenu ;</li>
        <li>vous envoyer des communications marketing si vous y avez consenti.</li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        Nous conservons vos données pendant une durée de 3 ans après le dernier
        contact, ou jusqu'à votre demande de suppression.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de
        rectification, de suppression et d'opposition au traitement de vos
        données. Pour exercer ces droits, contactez-nous à{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site utilise uniquement des cookies techniques nécessaires à son
        fonctionnement. Aucun cookie publicitaire n'est déposé sans votre
        consentement explicite.
      </p>
    </>
  );
}
