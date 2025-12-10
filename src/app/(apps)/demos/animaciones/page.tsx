'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ComponentShowcase } from '@/components/ui/ComponentShowcase';
import { HeaderDemo } from '@/projects/animaciones/components/lab/demos/ScrollHeaderDemo';
import { HamburgerDemo } from '@/projects/animaciones/components/lab/demos/HamburgerDemo';
import { TextParallaxDemo } from '@/projects/animaciones/components/lab/demos/TextParallaxDemo';
import { HoverImageLinksDemo } from '@/projects/animaciones/components/lab/demos/HoverImageLinksDemo';
import { ScrollToTopDemo } from '@/projects/animaciones/components/lab/demos/ScrollToTopDemo';
import { NeonTextDemo } from '@/projects/animaciones/components/lab/demos/NeonTextDemo';
import { InfiniteCarouselDemo } from '@/projects/animaciones/components/lab/demos/InfiniteCarouselDemo';
import {
  HAMBURGER_TSX,
  HAMBURGER_CSS,
  HAMBURGER_USAGE,
  HEADER_TSX,
  HEADER_CSS,
  PARALLAX_TSX,
  PARALLAX_USAGE,
  HOVER_LINKS_TSX,
  HOVER_LINKS_USAGE,
  SCROLL_TOP_TSX,
  SCROLL_TOP_USAGE,
  NEON_TSX,
  NEON_CSS,
  NEON_USAGE,
  CAROUSEL_TSX,
  CAROUSEL_USAGE,
} from '@/projects/animaciones/snippets';
import { ComponentItem } from '@/lib/types';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  MousePointer2,
  Palette,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Botones e Interactividad': MousePointer2,
  'Navegación y Estructura': Layers,
  'Efectos Visuales y Texto': Palette,
};

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
        usageCode: HAMBURGER_USAGE,
        usage: "Importa el componente y controla el estado 'isOpen'.",
        dependencies: 'clsx tailwind-merge',
        requiresUtils: true,
      },
      {
        id: 'scroll-to-top',
        title: 'Botón Volver Arriba',
        description:
          'Botón flotante que aparece suavemente al hacer scroll. Esencial para páginas largas.',
        component: <ScrollToTopDemo />,
        tsxCode: SCROLL_TOP_TSX,
        usageCode: SCROLL_TOP_USAGE,
        usage:
          'Agrégalo en tu layout principal para que esté disponible en todas las páginas.',
        dependencies: 'lucide-react clsx tailwind-merge',
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
      {
        id: 'hover-image-links',
        title: 'Enlaces con Revelado de Imagen',
        description:
          'Enlaces elegantes que muestran una imagen flotante siguiendo el cursor al hacer hover.',
        component: <HoverImageLinksDemo />,
        tsxCode: HOVER_LINKS_TSX,
        usageCode: HOVER_LINKS_USAGE,
        usage:
          'Renderiza una lista de estos componentes dentro de un contenedor oscuro.',
        dependencies: 'framer-motion lucide-react',
        requiresUtils: false,
      },
      {
        id: 'neon-text',
        title: 'Texto Neón Cyberpunk',
        description:
          'Texto con animación de parpadeo (flicker) y reflejo inferior.',
        component: <NeonTextDemo />,
        tsxCode: NEON_TSX,
        cssCode: NEON_CSS,
        usageCode: NEON_USAGE,
        usage:
          'Copia el CSS en tus globales y usa el componente en fondos oscuros.',
        dependencies: 'clsx tailwind-merge',
        requiresUtils: true,
      },
      {
        id: 'infinite-carousel',
        title: 'Carrusel Infinito (Marquee)',
        description:
          'Desplazamiento continuo de elementos. Perfecto para mostrar logos o stack.',
        component: <InfiniteCarouselDemo />,
        tsxCode: CAROUSEL_TSX,
        usageCode: CAROUSEL_USAGE,
        usage: 'Pasa un array de elementos React. Requiere Framer Motion.',
        dependencies: 'framer-motion clsx tailwind-merge',
        requiresUtils: true,
      },
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AnimationsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 selection:bg-purple-500/30 selection:text-purple-200">
      <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950" />
      </div>

      <div className="mx-auto max-w-6xl space-y-20 px-6">
        <div className="relative text-center">
          <div className="absolute top-0 left-0 hidden lg:block">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver al inicio
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-300 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              Design System
            </span>

            <h1 className="bg-linear-to-r from-white via-purple-100 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
              Laboratorio de Animaciones
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-neutral-400">
              Colección de micro-interacciones UI listas para copiar y pegar.
              Diseñadas con{' '}
              <span className="font-medium text-white">Tailwind CSS</span> y{' '}
              <span className="font-medium text-white">Framer Motion</span>.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-24"
        >
          {COMPONENT_REGISTRY.map((section, idx) => {
            const Icon = CATEGORY_ICONS[section.category] || Layers;

            return (
              section.items.length > 0 && (
                <motion.section
                  key={idx}
                  variants={fadeInUp}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-purple-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {section.category}
                    </h2>
                  </div>

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
                </motion.section>
              )
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
