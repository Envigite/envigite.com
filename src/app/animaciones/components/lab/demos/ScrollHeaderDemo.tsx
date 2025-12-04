import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export const HeaderDemo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 50);
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="relative h-[50vh] w-[85vw] max-w-full overflow-y-auto rounded-lg border border-white/10 bg-zinc-950 md:w-[900px]"
    >
      <header
        className={cn(
          'sticky top-0 right-0 left-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-400 ease-in-out',
          isScrolled ? 'bg-black py-4 shadow-md' : 'bg-transparent py-4'
        )}
      >
        <span className="font-bold text-white drop-shadow-md">Logo</span>
        <div className="flex gap-2">
          <div className="h-2 w-8 rounded-full bg-white/40 backdrop-blur-sm"></div>
          <div className="h-2 w-8 rounded-full bg-white/40 backdrop-blur-sm"></div>
        </div>
      </header>

      <div className="-mt-14 h-[800px] w-full">
        <div className="flex h-[350px] w-full items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-black">
          <p className="text-sm font-medium text-white/70">
            Haz scroll aquí dentro 👇
          </p>
        </div>
        <div className="space-y-4 bg-zinc-950 p-10">
          <div className="h-4 w-full rounded bg-zinc-800"></div>
          <div className="h-4 w-3/4 rounded bg-zinc-800"></div>
          <div className="h-32 w-full rounded bg-zinc-800/50"></div>
        </div>
      </div>
    </div>
  );
};
