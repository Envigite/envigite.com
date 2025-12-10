'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALL_PROJECTS } from '@/config/projects';
import { Project } from '@/lib/types';

const ProjectCard = ({
  project,
  index,
  isLarge,
}: {
  project: Project;
  index: number;
  isLarge: boolean;
}) => {
  const detailsLink = `/projects/${project.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 transition-all duration-500 hover:border-white/20',
        isLarge ? 'aspect-video md:col-span-2' : 'col-span-1 aspect-4/3'
      )}
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Link href={detailsLink} className="block h-full w-full">
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
                    className="h-full w-full scale-110 object-cover opacity-50 blur-xl"
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
                poster={project.image}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-neutral-950/20 transition-colors group-hover:bg-neutral-950/40" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 flex w-full flex-col gap-4 p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="mb-2 text-2xl leading-tight font-bold text-white drop-shadow-lg md:text-3xl">
              {project.title}
            </h3>
            <p className="line-clamp-2 max-w-lg text-sm text-neutral-200 drop-shadow-md md:text-base">
              {project.description}
            </p>
          </div>

          <div className="pointer-events-auto hidden translate-y-4 gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            {project.links.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                className="rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                title="Ver Código"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target={'_blank'}
                className="rounded-full bg-white p-3 text-black transition-colors hover:bg-neutral-200"
                title="Ver Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-2 hidden flex-wrap gap-2 md:flex">
          {project.tags.slice(0, 7).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-100 shadow-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-auto absolute top-4 right-4 flex gap-2 md:hidden">
        <Link
          href={detailsLink}
          className="rounded-full border border-white/10 bg-neutral-950/50 p-2 text-white backdrop-blur-md"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export const FeaturedProjects = () => {
  const displayProjects = ALL_PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative bg-neutral-900 py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Proyectos <br />
              <span className="text-neutral-500">Seleccionados.</span>
            </h2>
            <p className="text-lg text-neutral-400">
              Una colección de soluciones técnicas donde la arquitectura y el
              diseño se encuentran.
            </p>
          </div>

          <Link
            href="/projects"
            className="group flex items-center gap-2 border-b border-white/20 pb-1 text-white transition duration-500 hover:scale-110 hover:border-white"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project as Project}
              index={idx}
              isLarge={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
