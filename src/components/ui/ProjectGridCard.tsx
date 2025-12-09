'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectProps {
  project: Project;
  index: number;
}

export const ProjectGridCard = ({ project, index }: ProjectProps) => {
  const detailsLink = `/projects/${project.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {project.hasCaseStudy ? (
          <Link
            href={detailsLink}
            className="group block h-full w-full cursor-pointer"
          >
            {project.video ? (
              project.isVertical ? (
                <>
                  <div className="absolute inset-0 z-0">
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full scale-110 object-cover opacity-50 blur-sm"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-2 transition duration-300 group-hover:scale-105">
                    <video
                      src={project.video}
                      poster={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
                    />
                  </div>
                </>
              ) : (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              )
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Eye className="h-4 w-4" /> Ver Detalles
              </span>
            </div>
          </Link>
        ) : (
          // Si no tiene Case Study, imagen estática
          <div className="relative h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          {/* 2. TÍTULO: Si tiene Case Study, lleva al detalle interno */}
          {project.hasCaseStudy ? (
            <Link href={detailsLink} className="group transition-colors">
              <h3 className="line-clamp-1 text-xl font-bold text-white group-hover:text-purple-400">
                {project.title}
              </h3>
            </Link>
          ) : (
            <h3 className="line-clamp-1 text-xl font-bold text-neutral-300">
              {project.title}
            </h3>
          )}

          <div className="flex gap-2 text-neutral-400">
            <Link
              href={project.links.repo}
              target="_blank"
              className="transition-colors hover:text-white"
              title="Ver Código"
            >
              <Github className="h-5 w-5" />
            </Link>

            {project.links.demo && (
              <Link
                href={project.links.demo}
                target={'_blank'}
                className="transition-colors hover:text-white"
                title="Ver Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 7).map((tag) => (
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
