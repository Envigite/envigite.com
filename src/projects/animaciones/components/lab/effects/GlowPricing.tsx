'use client';
import { useEffect, useRef } from 'react';
import styles from '@/projects/animaciones/components/lab/css/interactive-pricing.module.css';

const plans = [
  {
    title: 'Basic',
    price: '$9.99',
    features: ['Access to standard workouts', 'Email support'],
    ctaText: 'Get Started',
    href: '#basic',
  },
  {
    title: 'Pro',
    price: '$19.99',
    features: ['Advanced workouts', 'Priority Email support', 'Live Q&A'],
    ctaText: 'Upgrade to Pro',
    href: '#pro',
  },
  {
    title: 'Ultimate',
    price: '$29.99',
    features: [
      'All premium workouts',
      '24/7 Priority support',
      '1-on-1 coaching',
    ],
    ctaText: 'Go Ultimate',
    href: '#ultimate',
  },
];

const GlowPricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Aplicar variables directamente al elemento overlay
      overlay.style.setProperty('--opacity', '1');
      overlay.style.setProperty('--x', `${x}px`);
      overlay.style.setProperty('--y', `${y}px`);
    };

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
        if (index !== -1 && overlay.children[index]) {
          const target = overlay.children[index] as HTMLElement;
          target.style.width = `${entry.borderBoxSize[0].inlineSize}px`;
          target.style.height = `${entry.borderBoxSize[0].blockSize}px`;
        }
      });
    });

    cardsRef.current.forEach((card) => card && observer.observe(card));

    // El evento debe estar en el contenedor para capturar el movimiento sobre las cartas
    container.addEventListener('pointermove', handlePointerMove);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.pricingWrapper}>
      <h1 className={styles.mainHeading}>Pricing</h1>

      <div className={styles.cardsContainer} ref={containerRef}>
        <div className={`${styles.cardsInner} ${styles.baseCards}`}>
          {plans.map((plan, i) => (
            <div
              key={plan.title}
              className={`${styles.card} ${styles.flow}`}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <h2 className={styles.cardHeading}>{plan.title}</h2>
              <p className={styles.cardPrice}>{plan.price}</p>
              <ul
                className={`${styles.cardBullets} ${styles.flow}`}
                role="list"
              >
                {plan.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <a href={plan.href} className={styles.cta}>
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>

        <div
          className={`${styles.overlay} ${styles.cardsInner}`}
          ref={overlayRef}
        >
          {plans.map((plan) => (
            <div
              key={`glow-${plan.title}`}
              className={styles.card}
              aria-hidden="true"
            >
              <div className={styles.cta}>{plan.ctaText}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlowPricing;
