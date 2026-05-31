import { AboutShowcase } from '@/sections/About/AboutShowcase';

export function AboutVision() {
  return (
    <AboutShowcase
      sectionId="approche"
      kicker="Notre vision"
      title={
        <>
          Nous concevons la fondation digitale des{' '}
          <span>entreprises ambitieuses.</span>
        </>
      }
      lead="Le digital n'est plus un canal, c'est la colonne vertébrale de votre activité. Nous unissons stratégie, design et ingénierie pour bâtir des produits qui supportent votre croissance pendant des années — pas seulement quelques mois."
      body="Notre nom dit ce que nous sommes : un rocher, une fondation solide sur laquelle vos équipes peuvent construire en toute confiance."
      featureTitle="Fondations solides & durables"
      imageBadge="Rock Digital"
      showCta={false}
      imageAlt="Vision Rock Digital — transformation digitale"
    />
  );
}
