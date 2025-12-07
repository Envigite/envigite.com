'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfiniteCarouselProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const InfiniteCarousel = ({
  items,
  speed = 20,
  direction = 'left',
  className,
}: InfiniteCarouselProps) => {
  return (
    <div
      className={cn(
        'mask-gradient-x relative flex w-full overflow-hidden',
        className
      )}
    >
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 bg-linear-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-linear-to-l from-neutral-950 to-transparent" />

      <motion.div
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex min-w-full shrink-0 gap-8 py-4"
      >
        {items.map((item, idx) => (
          <div
            key={`original-${idx}`}
            className="flex shrink-0 items-center justify-center"
          >
            {item}
          </div>
        ))}

        {items.map((item, idx) => (
          <div
            key={`duplicate-${idx}`}
            className="flex shrink-0 items-center justify-center"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
