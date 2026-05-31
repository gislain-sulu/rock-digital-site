'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  useCallback,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import { Badge } from '@/components/ui/Badge';
import type { ProcessStep as ProcessStepData } from '@/lib/content';
import { getProcessStepBackground } from '@/lib/processStepImages';
import { cn } from '@/utils/cn';

import styles from './Process.module.scss';

type ProcessStepProps = {
  step: ProcessStepData;
  index: number;
  reducedMotion: boolean;
  isActive: boolean;
};

export function ProcessStep({
  step,
  reducedMotion,
  isActive,
}: ProcessStepProps) {
  const backgroundImage = getProcessStepBackground(step.number);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        x: y * -5,
        y: x * 5,
      });
    },
    [reducedMotion]
  );

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.currentTarget.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    },
    [reducedMotion]
  );

  const cardMotion = reducedMotion
    ? {}
    : {
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 900,
      };

  return (
    <li
      className={cn(
        styles.process__item,
        isActive && styles['process__item--active']
      )}
      data-active={isActive ? 'true' : 'false'}
      aria-current={isActive ? 'step' : undefined}
    >
      <div
        className={cn(
          styles.process__node,
          isActive && styles['process__node--active']
        )}
        aria-hidden="true"
      >
        <span className={styles.process__nodeRing} />
        <span className={styles.process__nodePulse} />
        <span className={styles.process__nodeInner}>{step.number}</span>
      </div>

      <span className={styles.process__connector} aria-hidden="true" />

      <article
        className={styles.process__card}
        tabIndex={0}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        onBlur={resetTilt}
        onKeyDown={handleCardKeyDown}
        aria-label={`${step.number} — ${step.title}`}
      >
        {backgroundImage && (
          <div className={styles.process__cardMedia} aria-hidden="true">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="(max-width: 767px) 85vw, (max-width: 1199px) 42vw, 280px"
              className={styles.process__cardMediaImage}
            />
            <span className={styles.process__cardMediaOverlay} />
          </div>
        )}

        <span className={styles.process__cardGlow} aria-hidden="true" />
        <span className={styles.process__cardBorder} aria-hidden="true" />

        <motion.div
          className={cn(
            styles.process__cardBody,
            backgroundImage && styles['process__cardBody--withMedia']
          )}
          style={cardMotion}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 260, damping: 26 }
          }
        >
          <div
            className={cn(
              styles.process__cardContent,
              backgroundImage && styles['process__cardContent--withMedia']
            )}
          >
            <Badge tone="blue" showDot={false} className={styles.process__stepLabel}>
              Étape {step.number}
            </Badge>
            <h3 className={styles.process__title}>{step.title}</h3>
            <p className={styles.process__description}>{step.description}</p>
          </div>
        </motion.div>
      </article>
    </li>
  );
}
