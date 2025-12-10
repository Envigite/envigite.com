'use client';

import { useState } from 'react';
import { DashboardHeader, SectionId } from './layout/Header';
import GeneralSummary from './sections/GeneralSummary';
import Recepciones from './sections/Recepciones';
import Embalaje from './sections/Embalaje';
import Productos from './sections/Productos';
import Categorias from './sections/Categorias';
import Exportacion from './sections/Exportacion';
import Desviaciones from './sections/Desviaciones';

export default function DashboardContainer() {
  const [activeSection, setActiveSection] = useState<SectionId>('resumen');

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return <GeneralSummary />;
      case 'recepciones':
        return <Recepciones />;
      case 'embalaje':
        return <Embalaje />;
      case 'productos':
        return <Productos />;
      case 'categorias':
        return <Categorias />;
      case 'exportacion':
        return <Exportacion />;
      case 'desviaciones':
        return <Desviaciones />;
      default:
        return <GeneralSummary />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f8fafc] pt-16 font-sans text-slate-900 selection:bg-blue-100">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(56,189,248,0.15)_0px,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_100%_0%,rgba(99,102,241,0.15)_0px,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(16,185,129,0.1)_0px,transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <DashboardHeader
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">{renderContent()}</div>
        </main>

        <footer className="mt-auto border-t border-slate-200/60 py-8 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} Antarcold - Dashboard de Cierre de
              Temporada
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
