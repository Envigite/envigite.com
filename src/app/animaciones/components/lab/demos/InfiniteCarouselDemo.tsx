'use client';

import { InfiniteCarousel } from '../effects/InfiniteCarousel';
import {
  Cloud,
  Code2,
  Database,
  Server,
  Smartphone,
  Globe,
  Cpu,
} from 'lucide-react';

const TECH_STACK = [
  { name: 'React', icon: <Code2 className="text-blue-400" /> },
  { name: 'Next.js', icon: <Globe className="text-white" /> },
  { name: 'TypeScript', icon: <Code2 className="text-blue-600" /> },
  { name: 'AWS', icon: <Cloud className="text-orange-400" /> },
  { name: 'Node.js', icon: <Server className="text-green-500" /> },
  { name: 'PostgreSQL', icon: <Database className="text-blue-300" /> },
  { name: 'Mobile', icon: <Smartphone className="text-purple-400" /> },
  { name: 'Docker', icon: <Cpu className="text-blue-500" /> },
];

export const InfiniteCarouselDemo = () => {
  // Preparamos los items como componentes visuales
  const items = TECH_STACK.map((tech) => (
    <div
      key={tech.name}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
    >
      {tech.icon}
      <span className="text-sm font-medium text-gray-300">{tech.name}</span>
    </div>
  ));

  return (
    <div className="flex w-full flex-col gap-8 overflow-hidden rounded-lg border border-white/10 bg-neutral-950 py-12">
      {/* Carrusel Lento a la Izquierda */}
      <div>
        <p className="mb-4 text-center text-xs tracking-widest text-gray-500 uppercase">
          Stack Principal
        </p>
        <InfiniteCarousel items={items} speed={25} direction="left" />
      </div>

      {/* Carrusel Rápido a la Derecha (Solo por diversión) */}
      <div>
        <p className="mb-4 text-center text-xs tracking-widest text-gray-500 uppercase">
          Herramientas
        </p>
        <InfiniteCarousel items={items} speed={15} direction="right" />
      </div>
    </div>
  );
};
