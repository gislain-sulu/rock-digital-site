import Image from 'next/image';

import styles from './Testimonials.module.scss';

type TestimonialSingleBoxProps = {
  quote: string;
  author: string;
  role: string;
  rating: 3 | 4 | 5;
};

export function TestimonialSingleBox({
  quote,
  author,
  role,
  rating,
}: TestimonialSingleBoxProps) {
  return (
    <div className={styles.testimonialArea__box}>
      <div className={styles.testimonialArea__singleBox}>
        <div className={styles.testimonialArea__icon} aria-hidden="true">
          <Image src="/testi1.png" alt="" width={28} height={28} />
        </div>
        <div className={styles.testimonialArea__content}>
          <p className={styles.testimonialArea__text}>{quote}</p>
          <div className={styles.testimonialArea__rating} aria-label={`${rating} stars`}>
            {Array.from({ length: rating }).map((_, starIdx) => (
              <svg
                key={starIdx}
                xmlns="http:
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.123 3.572l1.241 5.313L12 16.102z"
                />
              </svg>
            ))}
          </div>
          <h3 className={styles.testimonialArea__title}>
            {author} <span>{role.toUpperCase()}</span>
          </h3>
        </div>
      </div>
      <div className={styles.testimonialArea__author}>
        {author
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')}
      </div>
    </div>
  );
}
