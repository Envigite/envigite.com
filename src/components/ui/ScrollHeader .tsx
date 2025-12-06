'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const ScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-400 ease-in-out',
        isScrolled ? 'bg-black py-4 shadow-md' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 text-white">
        <span className="text-xl font-bold">Logo</span>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
        </nav>
      </div>
    </header>
  );
};
