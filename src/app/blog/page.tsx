import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { FadeIn } from '@/components/motion/FadeIn';
import { CTA } from '@/sections/CTA';
import { createMetadata } from '@/lib/seo';

import styles from './blog.module.scss';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description:
    "Analyses, retours d'expérience et tendances digitales par l'équipe Rock Digital.",
  path: '/blog',
});

type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

const articles: Article[] = [
  {
    slug: 'design-system-saas',
    category: 'Design',
    title: 'Concevoir un design system qui survit aux refontes.',
    excerpt:
      "Un design system n'est pas un livrable, c'est un produit. Voici les principes que nous appliquons pour qu'il dure au-delà des refontes.",
    date: '12 mai 2026',
    readTime: '8 min',
    tags: ['Design System', 'UI/UX'],
  },
  {
    slug: 'next-15-app-router',
    category: 'Ingénierie',
    title: "Next.js 15 : ce qui change vraiment pour les produits en production.",
    excerpt:
      'App Router, Server Actions, caching repensé. Notre retour d\u2019expérience après un an de production sur Next.js 14/15.',
    date: '28 avril 2026',
    readTime: '10 min',
    tags: ['Next.js', 'Performance'],
  },
  {
    slug: 'mvp-saas-90-jours',
    category: 'Stratégie',
    title: 'Sortir un MVP SaaS en 90 jours : notre playbook.',
    excerpt:
      'Du wireframe au lancement, voici notre méthodologie pour livrer un MVP solide en trois mois, sans compromettre la qualité.',
    date: '15 avril 2026',
    readTime: '12 min',
    tags: ['SaaS', 'Méthodologie'],
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        kicker="Le journal"
        title="Analyses, retours d'expérience, tendances."
        description="L'équipe Rock Digital partage régulièrement ses réflexions sur le design, l'ingénierie et la stratégie produit."
      />

      <Section tone="light" size="lg">
        <Container>
          <div className={styles.blog__notice}>
            <Badge tone="orange">Bientôt</Badge>
            <p>
              Notre blog ouvre prochainement. En attendant, découvrez nos premiers
              articles ci-dessous — et abonnez-vous à notre newsletter en bas
              de page pour être alerté des nouvelles publications.
            </p>
          </div>

          <div className={styles.blog__grid}>
            {articles.map((article, idx) => (
              <FadeIn key={article.slug} delay={idx * 0.08}>
                <article className={styles.blog__card}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className={styles.blog__cardLink}
                    aria-label={`Lire l'article : ${article.title}`}
                  >
                    <div className={styles.blog__cardCover} aria-hidden="true">
                      <span className={styles.blog__cardCategory}>
                        {article.category}
                      </span>
                      <span className={styles.blog__cardCoverPattern} />
                    </div>
                    <div className={styles.blog__cardBody}>
                      <div className={styles.blog__cardMeta}>
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime} de lecture</span>
                      </div>
                      <h2 className={styles.blog__cardTitle}>{article.title}</h2>
                      <p className={styles.blog__cardExcerpt}>{article.excerpt}</p>
                      <ul className={styles.blog__cardTags}>
                        {article.tags.map((tag) => (
                          <li key={tag}>
                            <Tag tone="neutral">{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                      <span className={styles.blog__cardCta}>
                        Lire l'article
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
