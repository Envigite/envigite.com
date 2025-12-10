'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/hooks/useLightbox';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef } from 'react';
import { Project } from '@/lib/types';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Zap,
  Layers,
  Target,
  Code2,
  Rocket,
  Smartphone,
  Monitor,
  X,
  Fullscreen,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const containerRef = useRef(null);

  const { selectedImage, setSelectedImage } = useLightbox();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.65]);

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-950 pt-24 pb-32">
      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative z-10 container mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 left-6"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 border-b pb-2 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver
          </Link>
        </motion.div>

        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px]" />

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6 flex justify-center pt-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-md">
            {project.category === 'Mobile' ? (
              <Smartphone className="h-3 w-3" />
            ) : (
              <Monitor className="h-3 w-3" />
            )}
            {project.category}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 md:text-xl"
        >
          {project.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {project.links.demo && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.links.demo}
                target="_blank"
                className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-black transition-all hover:bg-neutral-200"
              >
                <ExternalLink className="h-4 w-4" />
                Ver Demo Live
              </Link>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {project.links.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-bold text-white transition-all hover:border-white/30 hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                Código Fuente
              </Link>
            )}
          </motion.div>
        </motion.div>
      </motion.header>

      <section className="container mx-auto mt-20 mb-32 max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl shadow-purple-900/20"
        >
          {project.video ? (
            project.isVertical ? (
              <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
                />
                <div className="relative z-10 aspect-9/16 h-[90%] overflow-hidden rounded-[2.5rem] border-8 border-neutral-900 bg-black shadow-2xl ring-1 ring-white/10">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            )
          ) : (
            <div className="group relative aspect-video w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950/50 to-transparent opacity-60" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset" />
        </motion.div>
      </section>

      {/* 3. INFO GRID */}
      <div className="container mx-auto grid max-w-4xl gap-20 px-6">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            {
              label: 'Rol',
              value: project.role || 'Developer',
              icon: Code2,
            },
            {
              label: 'Año',
              value: project.year || '2024',
              icon: Rocket,
            },
            {
              label: 'Stack',
              value: `${project.tags.length}+ Techs`,
              icon: Layers,
            },
            {
              label: 'Estado',
              value: project.status || 'Completado',
              icon: CheckCircle2,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/5 bg-white/2 p-6 transition-colors hover:bg-white/4"
            >
              <item.icon className="mb-3 h-5 w-5 text-purple-400" />
              <div className="text-sm font-medium text-neutral-500">
                {item.label}
              </div>
              <div className="mt-1 text-lg font-bold text-white">
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
            <Layers className="h-5 w-5 text-purple-500" /> Stack Tecnológico
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={scaleIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="cursor-default rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-purple-500/50 hover:text-white"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">La Historia</h3>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="rounded-3xl border border-white/5 bg-neutral-900/50 p-8 leading-8 whitespace-pre-line text-neutral-300 shadow-inner">
              {project.longDescription || project.description}
            </div>
          </div>
        </motion.div>

        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 border-l-4 border-purple-500 pl-4 text-2xl font-bold text-white">
              Galería
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.screenshots.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(img)}
                  className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg"
                >
                  {project.isVertical ? (
                    <>
                      <Image
                        src={img}
                        alt="Blur Background"
                        fill
                        className="scale-110 object-cover opacity-50 blur-xl"
                      />
                      <div className="absolute inset-0 p-2">
                        <Image
                          src={img}
                          alt={`Captura móvil ${i}`}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={img}
                      alt={`Captura web ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Fullscreen className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-red-500/10 bg-linear-to-br from-red-500/5 to-transparent p-8"
            >
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Zap className="h-5 w-5 text-red-400" /> El Desafío
              </h3>
              <ul className="space-y-4">
                {project.challenges.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-neutral-400 md:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.features && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-green-500/10 bg-linear-to-br from-green-500/5 to-transparent p-8"
            >
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle2 className="h-5 w-5 text-green-400" /> La Solución
              </h3>
              <ul className="space-y-4">
                {project.features.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-neutral-400 md:text-base"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Ingeniería & Arquitectura
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(
              project.architecture || [
                {
                  title: 'Escalabilidad',
                  desc: 'Arquitectura diseñada para crecer.',
                },
                { title: 'Seguridad', desc: 'Enfoque en protección de datos.' },
                {
                  title: 'Performance',
                  desc: 'Optimización de recursos y carga.',
                },
              ]
            ).map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-white/2 p-6 transition-colors hover:bg-white/4"
              >
                <h4 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative ${
                project.isVertical
                  ? 'aspect-9/16 h-[85vh]'
                  : 'aspect-video w-full max-w-6xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Vista completa"
                fill
                className="object-contain"
                quality={100}
                priority
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-11 right-6 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:-right-12"
                title="Cerrar (Esc)"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
