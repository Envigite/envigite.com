'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROJECTS = [
  {
    title: "Fashion't Park E-commerce",
    description:
      'Plataforma Full Stack de arquitectura robusta y escalable. Integra tienda pública, panel de administración con métricas y seguridad RBAC. Contenerizada con Docker y desplegada en infraestructura AWS (ECR, App Runner, RDS) con CI/CD.',
    tags: [
      'Next.js 16',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'AWS',
      'TypeScript',
    ],
    video: '/videos/demo-ecommerce-minecraft.mp4',
    image: '/images/demo-ecommerce-minecraft.jpg',
    links: {
      demo: 'https://www.fashiontpark.store',
      repo: 'https://github.com/Envigite/Ecommerce-minecraft',
    },
    featured: true,
  },
  {
    title: 'Dashboard Cierre de Temporada',
    description:
      'Plataforma legacy de una arquitectura moderna para visualización de KPIs productivos y logísticos.',
    tags: ['Next.js', 'TypeScript', 'Chart.js', 'Tailwind', 'Framer Motion'],
    image: '/images/dashboard-cierre.png',
    links: {
      demo: 'https://www.envigite.com/cierre',
      repo: 'https://github.com/Envigite/cierre-temporada',
    },
    featured: false,
  },
  {
    title: 'Minecraft Repository',
    description:
      'Aplicación Android nativa desarrollada con Kotlin y Arquitectura Limpia (MVVM). Integra consumo de API REST, inyección de dependencias y persistencia de datos local para una experiencia fluida y escalable.',
    tags: ['Kotlin', 'Android SDK', 'MVVM', 'Retrofit', 'Dagger Hilt', 'Room'],
    video: '/videos/minecraft-repository.mp4',
    image: '/images/minecraft-repository-1.gif',
    links: {
      demo: 'https://tudemo.com',
      repo: 'https://github.com/Envigite/MinecraftRepository',
    },
    featured: false,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0] & { video?: string };
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 transition-all duration-500 hover:border-white/20',
        project.featured
          ? 'aspect-video md:col-span-2'
          : 'col-span-1 aspect-4/3'
      )}
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
      </div>

      <div className="absolute bottom-0 left-0 flex w-full flex-col gap-4 p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="mb-2 text-2xl leading-tight font-bold text-white md:text-3xl">
              {project.title}
            </h3>
            <p className="line-clamp-2 max-w-lg text-sm text-neutral-300 md:text-base">
              {project.description}
            </p>
          </div>

          <div className="hidden translate-y-4 gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <Link
              href={project.links.repo}
              target="_blank"
              className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
              title="Ver Código"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={project.links.demo}
              target="_blank"
              className="rounded-full bg-white p-3 text-black transition-colors hover:bg-neutral-200"
              title="Ver Demo en vivo"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 md:hidden">
        <Link
          href={project.links.demo}
          className="rounded-full border border-white/10 bg-neutral-950/50 p-2 text-white backdrop-blur-md"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export const FeaturedProjects = () => {
  return (
    <section className="relative bg-neutral-950 py-32">
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
            href="/proyectos"
            className="group flex items-center gap-2 border-b border-white/20 pb-1 text-white transition-colors hover:border-white"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
