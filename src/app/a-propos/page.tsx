import type { Metadata } from 'next';

import { MountainFacets } from '@/components/brand/MountainFacets';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FadeIn } from '@/components/motion/FadeIn';
import { CTA } from '@/sections/CTA';
import { Stats } from '@/sections/Stats';
import { createMetadata } from '@/lib/seo';

import styles from './about.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'À propos',
  description:
    "Découvrez Rock Digital : notre histoire, notre approche, nos valeurs et l\u2019équipe qui accompagne les entreprises dans leur transformation digitale.",
  path: '/a-propos',
});

const values = [
  {
    title: 'Solidité',
    description:
      "Nous ne construisons rien qui ne dure. Sécurité, maintenabilité, scalabilité — chaque ligne de code est un investissement.",
  },
  {
    title: 'Transparence',
    description:
      "Vous savez en permanence où nous en sommes. Reporting clair, démos régulières, accès aux outils. Pas de zone d'ombre.",
  },
  {
    title: 'Exigence',
    description:
      "Le détail fait la différence. Du micro-spacing à l'API la plus complexe, nous polissons jusqu'au dernier kilomètre.",
  },
  {
    title: 'Partenariat',
    description:
      "Nous ne livrons pas pour disparaître. Nous restons à vos côtés pour itérer, mesurer et faire grandir le produit.",
  },
];

const team = [
  { name: 'Yassine M.', role: 'Co-fondateur · CEO', initials: 'YM' },
  { name: 'Camille R.', role: 'Co-fondatrice · CTO', initials: 'CR' },
  { name: 'Thomas L.', role: 'Lead Designer', initials: 'TL' },
  { name: 'Imane B.', role: 'Lead Engineer', initials: 'IB' },
  { name: 'Hugo P.', role: 'Architecte Cloud', initials: 'HP' },
  { name: 'Sara D.', role: 'Product Strategist', initials: 'SD' },
];

const milestones = [
  { year: '2016', title: 'Naissance de Rock Digital', desc: 'Deux fondateurs, une conviction : bâtir des produits digitaux durables.' },
  { year: '2019', title: 'Premier produit SaaS', desc: 'Lancement d\u2019une plateforme utilisée par plus de 10 000 PME en Europe.' },
  { year: '2022', title: 'Expansion internationale', desc: 'Missions menées au Maroc, en France, en Belgique, au Canada.' },
  { year: '2026', title: 'Une équipe de 20+ experts', desc: 'Design, ingénierie, produit, conseil. Une équipe senior intégrée.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="À propos"
        title="Une équipe d'artisans du digital, passionnée par l'impact."
        description="Depuis 10 ans, nous accompagnons des entreprises ambitieuses dans la conception et le développement de produits digitaux solides, élégants et performants."
      >
        <div className={styles.about__heroActions}>
          <Button href="/contact" variant="primary" size="md">
            Travaillons ensemble
          </Button>
          <Button href="#carrieres" variant="ghost" size="md">
            Nous rejoindre
          </Button>
        </div>
      </PageHeader>

      <Section tone="light" size="lg" id="approche">
        <Container>
          <div className={styles.about__intro}>
            <div className={styles.about__introText}>
              <Badge tone="blue">Notre vision</Badge>
              <h2 className={styles.about__sectionTitle}>
                Nous concevons la fondation digitale{' '}
                <span className="u-text-gradient-blue">des entreprises ambitieuses.</span>
              </h2>
              <p className={styles.about__lead}>
                Le digital n'est plus un canal, c'est la colonne vertébrale de
                votre activité. Nous unissons stratégie, design et ingénierie
                pour bâtir des produits qui supportent votre croissance pendant
                des années — pas seulement quelques mois.
              </p>
              <p className={styles.about__lead}>
                Notre nom dit ce que nous sommes : un rocher, une fondation
                solide sur laquelle vos équipes peuvent construire en toute
                confiance.
              </p>
            </div>
            <div className={styles.about__introVisual}>
              <MountainFacets variant="light" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" size="lg" id="valeurs">
        <Container>
          <div className={styles.about__valuesHeading}>
            <Badge tone="orange">Nos valeurs</Badge>
            <h2 className={styles.about__sectionTitle}>
              Quatre principes qui guident{' '}
              <span className="u-text-gradient-blue">chacune de nos missions.</span>
            </h2>
          </div>
          <div className={styles.about__values}>
            {values.map((value, idx) => (
              <FadeIn key={value.title} delay={idx * 0.05}>
                <article className={styles.about__valueCard}>
                  <span className={styles.about__valueNumber}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.about__valueTitle}>{value.title}</h3>
                  <p className={styles.about__valueDesc}>{value.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Stats />

      <Section tone="light" size="lg" id="histoire">
        <Container>
          <div className={styles.about__milestonesHeading}>
            <Badge tone="blue">Notre histoire</Badge>
            <h2 className={styles.about__sectionTitle}>
              Dix années d'innovations,{' '}
              <span className="u-text-gradient-blue">une trajectoire claire.</span>
            </h2>
          </div>
          <div className={styles.about__milestones}>
            {milestones.map((step, idx) => (
              <FadeIn key={step.year} delay={idx * 0.06}>
                <article className={styles.about__milestone}>
                  <span className={styles.about__milestoneYear}>{step.year}</span>
                  <h3 className={styles.about__milestoneTitle}>{step.title}</h3>
                  <p className={styles.about__milestoneDesc}>{step.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="subtle" size="lg" id="equipe">
        <Container>
          <div className={styles.about__teamHeading}>
            <Badge tone="orange">Notre équipe</Badge>
            <h2 className={styles.about__sectionTitle}>
              Une équipe senior,{' '}
              <span className="u-text-gradient-blue">intégrée, sans intermédiaires.</span>
            </h2>
          </div>
          <div className={styles.about__team}>
            {team.map((member, idx) => (
              <FadeIn key={member.name} delay={(idx % 3) * 0.05}>
                <article className={styles.about__teamCard}>
                  <span className={styles.about__teamAvatar}>
                    {member.initials}
                  </span>
                  <span className={styles.about__teamName}>{member.name}</span>
                  <span className={styles.about__teamRole}>{member.role}</span>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light" size="md" id="carrieres">
        <Container>
          <div className={styles.about__careers}>
            <div>
              <Badge tone="blue">Carrières</Badge>
              <h2 className={styles.about__sectionTitle}>
                Vous voulez{' '}
                <span className="u-text-gradient-blue">construire avec nous ?</span>
              </h2>
              <p className={styles.about__lead}>
                Nous recrutons en permanence des designers, ingénieurs et
                stratèges seniors qui aiment construire des produits soignés.
              </p>
            </div>
            <Button href="mailto:careers@rockdigital.com" external variant="primary" size="lg">
              Voir les opportunités
            </Button>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
