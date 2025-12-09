'use client';

import { useState } from 'react';
import { ALL_PROJECTS } from '@/config/projects';
import { ProjectGridCard } from '@/components/ui/ProjectGridCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categories = ['Todos', 'Full Stack', 'Frontend', 'Mobile', 'Creative'];

  const filteredProjects =
    filter === 'Todos'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === filter);
  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-6 pt-32 pb-20">
      <div className="container mx-auto max-w-7xl">
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
              Explorando código, diseño y arquitectura.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <ProjectGridCard
                key={project.slug}
                project={project}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-neutral-500">
            No se encontraron proyectos en esta categoría.
          </div>
        )}

        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:px-10 disabled:opacity-50"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Cargando...
                </>
              ) : (
                <>
                  Cargar más proyectos ({filteredProjects.length - visibleCount}{' '}
                  restantes)
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
