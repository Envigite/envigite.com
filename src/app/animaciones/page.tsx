'use client';

import { ComponentShowcase } from '@/components/ui/ComponentShowcase';
import { HeaderDemo } from './components/lab/demos/ScrollHeaderDemo';
import { HamburgerDemo } from './components/lab/demos/HamburgerDemo';
import { TextParallaxDemo } from './components/lab/demos/TextParallaxDemo';
import {
  HAMBURGER_TSX,
  HAMBURGER_CSS,
  HEADER_TSX,
  HEADER_CSS,
  PARALLAX_TSX,
  PARALLAX_USAGE,
} from './snippets';
import { ComponentItem } from '@/lib/types';

const COMPONENT_REGISTRY: { category: string; items: ComponentItem[] }[] = [
  {
    category: 'Botones e Interactividad',
    items: [
      {
        id: 'hamburger-btn',
        title: 'Botón Hamburguesa Animado',
        description:
          "Micro-interacción clásica de menú con transformación suave a 'X'.",
        component: <HamburgerDemo />,
        tsxCode: HAMBURGER_TSX,
        cssCode: HAMBURGER_CSS,
        usage: "Importa el componente y controla el estado 'isOpen'.",
        dependencies: 'clsx tailwind-merge',
        requiresUtils: true,
      },
    ],
  },
  {
    category: 'Navegación y Estructura',
    items: [
      {
        id: 'scroll-header',
        title: 'Header Dinámico sencillo (Scroll)',
        description: 'Header que cambia de estilo al hacer scroll.',
        component: <HeaderDemo />,
        tsxCode: HEADER_TSX,
        cssCode: HEADER_CSS,
        usage: 'Copia el código en components/layout/ScrollHeader.tsx',
        dependencies: 'clsx tailwind-merge',
        requiresUtils: true,
      },
    ],
  },
  {
    category: 'Efectos Visuales y Texto',
    items: [
      {
        id: 'parallax-scroll',
        title: 'Scroll Parallax con Texto',
        description:
          'Efecto de imagen sticky que se encoge suavemente al hacer scroll, revelando el contenido inferior.',
        component: <TextParallaxDemo />,
        tsxCode: PARALLAX_TSX,
        usageCode: PARALLAX_USAGE,
        usage:
          'Envuelve tu contenido con este componente. Requiere Framer Motion.',
        dependencies: 'framer-motion',
        requiresUtils: false,
      },
    ],
  },
];

export default function AnimationsPage() {
  return (
    <div className="min-h-screen bg-slate-800/50 px-6 pt-32 pb-20">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Laboratorio de Animaciones
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Colección de micro-interacciones UI. Copia, pega y adapta.
          </p>
        </div>

        {COMPONENT_REGISTRY.map(
          (section, idx) =>
            section.items.length > 0 && (
              <div
                key={idx}
                className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700"
              >
                <h2 className="border-l-4 border-purple-500 pl-4 text-2xl font-bold text-white">
                  {section.category}
                </h2>

                <div className="grid grid-cols-1 gap-12">
                  {section.items.map((item) => (
                    <ComponentShowcase
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      component={item.component}
                      tsxCode={item.tsxCode}
                      cssCode={item.cssCode}
                      usageCode={item.usageCode}
                      usage={item.usage}
                      dependencies={item.dependencies}
                      requiresUtils={item.requiresUtils}
                    />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
