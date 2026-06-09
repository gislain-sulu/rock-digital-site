import gsap from 'gsap';


export function animateCountersInScope(
  scope: Element,
  selector = '[data-gsap-counter]'
): void {
  const counters = scope.querySelectorAll(selector);

  counters.forEach((el) => {
    const to = Number(el.getAttribute('data-gsap-counter-to') ?? 0);
    const suffix = el.getAttribute('data-gsap-counter-suffix') ?? '';
    const prefix = el.getAttribute('data-gsap-counter-prefix') ?? '';
    const from = Number(el.getAttribute('data-gsap-counter-from') ?? 0);
    const state = { value: from };

    gsap.to(state, {
      value: to,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(state.value).toLocaleString('fr-FR')}${suffix}`;
      },
    });
  });
}
