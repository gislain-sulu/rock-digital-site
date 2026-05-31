'use client';

import { partnerBrands } from '@/lib/content';
import { cn } from '@/utils/cn';

import styles from './RecentProjects.module.scss';

type PartnerMarqueeProps = {
  auto?: boolean;
  paused?: boolean;
};

const MARQUEE_BRANDS = [...partnerBrands, ...partnerBrands];

export function PartnerMarquee({
  auto = true,
  paused = false,
}: PartnerMarqueeProps) {
  const isRunning = auto && !paused;

  return (
    <aside
      className={styles.projectArea__bandeau}
      aria-label="Partenaires et clients"
    >
      <div className={styles.projectArea__bandeauViewport}>
        <div
          className={cn(
            styles.projectArea__bandeauTrack,
            isRunning && styles['projectArea__bandeauTrack--auto']
          )}
          data-paused={paused ? 'true' : 'false'}
        >
          <ul className={styles.projectArea__bandeauList}>
            {MARQUEE_BRANDS.map((brand, index) => (
              <li
                key={`${brand}-${index}`}
                className={styles.projectArea__bandeauBrand}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
