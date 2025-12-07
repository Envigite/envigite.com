'use client';

import { useState } from 'react';
import { ALL_PROJECTS } from '@/config/projects';
import { ProjectGridCard } from '@/components/ui/ProjectGridCard';
import { Header } from '@/components/layout/Header'; // Asumiendo que quieres el header aquí también
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  // Filtro simple (opcional, si quieres escalarlo a futuro)
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Full Stack', 'Frontend', 'Mobile', 'Creative'];

  const filteredProjects =
    filter === 'Todos'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 pt-24 pb-20">
      {/* Puedes reutilizar tu Header global o ponerlo en el layout.tsx de /projects */}

      <div className="container mx-auto max-w-7xl">
        {/* Encabezado de Página */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-bold text-white md:text-6xl"
            >
              Proyectos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-xl text-neutral-400"
            >
              Explorando código, diseño y arquitectura. Desde aplicaciones
              móviles hasta sistemas web complejos.
            </motion.p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <ProjectGridCard
              key={project.title}
              project={project}
              index={idx}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-neutral-500">
            No se encontraron proyectos en esta categoría.
          </div>
        )}
      </div>
    </main>
  );
}
