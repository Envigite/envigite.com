'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    links: {
      repo: string;
      demo?: string | null;
    };
  };
  index: number;
}

export const ProjectGridCard = ({ project, index }: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80"
    >
      {/* Imagen */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-1 text-xl font-bold text-white">
            {project.title}
          </h3>

          {/* Links Icons */}
          <div className="flex gap-2 text-neutral-400">
            <Link
              href={project.links.repo}
              target="_blank"
              className="transition-colors hover:text-white"
              title="Ver Código"
            >
              <Github className="h-5 w-5" />
            </Link>

            {/* Lógica Condicional: Solo renderiza si existe demo */}
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target={project.links.demo.startsWith('/') ? '_self' : '_blank'} // Abre en la misma pestaña si es interno
                className="transition-colors hover:text-white"
                title="Ver Demo"
              >
                {project.links.demo.startsWith('/') ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ExternalLink className="h-5 w-5" />
                )}
              </Link>
            )}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-400">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
