'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { NAV_LINKS } from '@/config/site';
import { cn } from '@/lib/utils';
import { HamburgerButton } from '@/components/ui/HamburgerButton'; // <--- Importamos el nuevo botón

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'border-b border-white/10 bg-black/80 py-4 shadow-md backdrop-blur-md'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* LOGO */}
        <Link
          href="#home"
          className="group relative z-50 flex items-center gap-2" // z-50 para que el logo sobresalga si quieres
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="rounded-lg bg-purple-600 p-2 transition-colors group-hover:bg-purple-500">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Envigite<span className="text-purple-500">.dev</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-purple-400"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-purple-700"
          >
            Contáctame
          </Link>
        </nav>

        {/* MOBILE TOGGLE (Tu animación antigua) */}
        <div className="flex items-center md:hidden">
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* MOBILE NAV OVERLAY (SIDEBAR) */}
      {/* 1. backdrop-blur en todo el fondo para oscurecer la web detrás.
         2. El menú en sí es un div a la derecha (right-0) con un ancho fijo (w-3/4 max-w-sm).
      */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMobileMenuOpen(false)} // Cierra si clickeas afuera
      />

      <div
        className={cn(
          'fixed top-0 right-0 z-40 flex h-full w-3/4 max-w-sm flex-col items-center justify-center gap-8 border-l border-white/10 bg-zinc-950 shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-bold text-gray-300 transition-colors hover:text-purple-500"
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 rounded-full bg-purple-600 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-purple-900/50"
        >
          Contáctame
        </Link>
      </div>
    </header>
  );
};
