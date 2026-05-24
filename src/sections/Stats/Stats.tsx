import { PixelGrid } from '@/components/brand/PixelGrid';
import { Counter } from '@/components/motion/Counter';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { stats } from '@/lib/content';

import styles from './Stats.module.scss';

export function Stats() {
  return (
    <Section tone="deep" size="lg" id="stats" className={styles.stats}>
      <div className={styles.stats__bg} aria-hidden="true">
        <PixelGrid variant="blue" density="medium" />
      </div>

      <Container>
        <SectionHeading
          kicker="Des résultats concrets"
          title={
            <>
              Une croissance mesurée,{' '}
              <span className={styles.stats__titleAccent}>une confiance bâtie.</span>
            </>
          }
          description="Dix ans d'expertise, des dizaines de partenaires, des produits utilisés au quotidien. Voici ce que nos chiffres racontent."
          tone="dark"
          align="left"
        />

        <StaggerGroup className={styles.stats__grid} stagger={0.1}>
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              as="div"
              className={styles.stats__card}
            >
              <p className={styles.stats__value}>
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className={styles.stats__label}>{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
