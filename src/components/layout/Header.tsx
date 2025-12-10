'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HamburgerButton } from '@/components/ui/HamburgerButton';
import { NAV_LINKS } from '@/config/site';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinksDesktop = NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="group relative px-1 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:scale-105 hover:text-white"
    >
      <span>{link.name}</span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ));

  const navLinksMobile = NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setIsOpen(false)}
      className="group flex w-full items-center justify-between border-b border-white/10 py-6 text-xl font-medium text-gray-300 transition-all duration-200 active:scale-[0.98] active:text-purple-400"
    >
      <span>{link.name}</span>
      <ChevronRight className="h-5 w-5 text-gray-600 transition-all duration-200 group-active:translate-x-1 group-active:text-purple-500" />
    </Link>
  ));

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 w-full border-b border-transparent',
        isOpen
          ? 'border-transparent bg-neutral-950 py-3'
          : isScrolled
            ? 'border-white/5 bg-neutral-950/80 py-3 shadow-2xl shadow-black/50 backdrop-blur-md'
            : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 text-white">
        <Link
          href="/"
          className="group relative"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl font-bold tracking-tighter transition-opacity group-hover:opacity-80">
            Envigite<span className="text-purple-500">.dev</span>
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {navLinksDesktop}
        </nav>
        <div className="relative z-60 flex md:hidden">
          <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 flex w-3/4 max-w-sm flex-col items-start justify-start gap-2 border-l border-white/10 bg-neutral-950 px-8 pt-24 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="mb-4 text-xs font-bold tracking-widest text-purple-500 uppercase">
          Menu
        </div>
        {navLinksMobile}
      </div>
    </header>
  );
};
