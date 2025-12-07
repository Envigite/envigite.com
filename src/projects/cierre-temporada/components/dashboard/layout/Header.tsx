'use client';

import { useState } from 'react';
import {
  Menu,
  X,
  BarChart3,
  Package,
  Truck,
  AlertCircle,
  FileText,
  Factory,
  LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SectionId =
  | 'resumen'
  | 'recepciones'
  | 'embalaje'
  | 'productos'
  | 'categorias'
  | 'exportacion'
  | 'desviaciones';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

interface NavigationItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'resumen', label: 'Resumen', icon: BarChart3 },
  { id: 'recepciones', label: 'Despezonado', icon: Factory },
  { id: 'embalaje', label: 'Embalaje', icon: Package },
  { id: 'productos', label: 'Productos', icon: FileText },
  { id: 'categorias', label: 'Categorías', icon: Package },
  { id: 'exportacion', label: 'Exportación', icon: Truck },
  { id: 'desviaciones', label: 'Desviaciones', icon: AlertCircle },
];

export const DashboardHeader = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-linear-to-r from-blue-900 via-blue-700 to-sky-600 py-2 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-2 shadow-inner backdrop-blur-md">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl leading-tight font-bold tracking-tight drop-shadow-sm">
                Cierre de Temporada
              </h1>
              <span className="text-xs font-medium tracking-wide text-blue-200 uppercase opacity-90">
                2024 - 2025 | Ultra Berries
              </span>
            </div>
          </div>

          <nav className="hidden space-x-1 xl:flex">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                  activeSection === item.id
                    ? 'border border-white/10 bg-white/20 text-white shadow-inner'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                } // Estado Inactivo: Sutil`}
              >
                <item.icon
                  className={`h-4 w-4 ${
                    activeSection === item.id ? 'text-sky-200' : ''
                  }`}
                />
                {item.label}

                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.8)]"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-blue-100 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-blue-700 bg-blue-800 xl:hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 shadow-inner">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'border-l-4 border-sky-400 bg-blue-900/50 text-white'
                        : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                    } `}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-sky-400' : 'text-blue-300'
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
