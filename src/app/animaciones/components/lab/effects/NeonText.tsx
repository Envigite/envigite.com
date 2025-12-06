'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonText = ({ children, className }: NeonTextProps) => {
  return (
    <h1
      className={cn(
        'relative w-full text-center leading-[0.70em] font-bold uppercase outline-none',
        'animate-neon-flicker box-reflect',
        'text-5xl sm:tracking-[17px] md:text-7xl xl:text-8xl',
        className
      )}
    >
      {children}
    </h1>
  );
};
