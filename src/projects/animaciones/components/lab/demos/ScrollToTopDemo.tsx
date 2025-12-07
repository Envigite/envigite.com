'use client';

import { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ScrollToTopDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsVisible(scrollRef.current.scrollTop > 100);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="relative h-[400px] w-full overflow-y-auto rounded-lg border border-white/10 bg-zinc-950"
    >
      <button
        onClick={scrollToTop}
        className={cn(
          'sticky right-6 bottom-6 z-50 float-right m-6 cursor-pointer rounded-full p-3 shadow-lg transition-all duration-300',
          'bg-purple-600 text-white hover:scale-110 hover:bg-purple-700',
          'top-[85%]',
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <div className="flex flex-col items-center gap-4 p-8 pt-20">
        <p className="mb-10 text-zinc-500">
          Baja para ver el botón aparecer 👇
        </p>

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex h-32 w-full max-w-xs items-center justify-center rounded-lg border border-white/5 bg-zinc-800/50 text-2xl font-bold text-zinc-700"
          >
            {i + 1}
          </div>
        ))}

        <p className="mt-10 text-zinc-500">¡Llegaste al final!</p>
      </div>
    </div>
  );
};
