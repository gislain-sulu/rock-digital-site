import { AboutShowcase } from './AboutShowcase';

export function About() {
  return (
    <AboutShowcase
      kicker="À propos"
      title={
        <>
          Des solutions IT essentielles pour
          <br />
          les <span>entreprises modernes.</span>
        </>
      }
      lead="Nous concevons des infrastructures fiables et évolutives pour soutenir votre croissance digitale avec une exécution premium."
      featureTitle="Solution basée sur le cloud"
      body="De la stratégie au déploiement, nous unifions conseil, design et développement pour livrer des produits performants et durables."
      imageBadge="Meilleure solution IT"
      ctaHref="/a-propos"
      ctaLabel="En savoir plus"
      imageAlt="Équipe Rock Digital en action"
    />
  );
}
