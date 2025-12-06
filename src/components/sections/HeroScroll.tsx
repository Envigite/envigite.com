'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Download,
  Sparkles,
  Server,
  Layout,
  Zap,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Animaciones del estado inicial
  const opacityIntro = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yIntro = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Animaciones del perfil
  const opacityProfile = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const yProfile = useTransform(scrollYProgress, [0.15, 0.45], [120, 0]);
  const scaleProfile = useTransform(scrollYProgress, [0.15, 0.45], [0.9, 1]);

  return (
    <section
      ref={targetRef}
      className="relative h-[200vh] bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: opacityIntro, y: yIntro, scale: scaleIntro }}
          className="absolute z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-neutral-300">
              Desarrollador Full Stack
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-8xl lg:text-9xl"
          >
            Construyo
            <br />
            <span className="bg-linear-to-b from-purple-800 via-purple-300 to-neutral-400 bg-clip-text text-transparent">
              Experiencias
            </span>
            <br />
            Digitales
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl text-lg text-neutral-400 md:text-xl"
          >
            Arquitectura escalable, interfaces impecables y código que resuelve
            problemas reales
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-wider text-neutral-500 uppercase">
              Scroll para conocerme
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-5 rounded-full border-2 border-white/20"
            >
              <div className="mx-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: opacityProfile, y: yProfile, scale: scaleProfile }}
          className="absolute z-20 w-full max-w-6xl px-6"
        >
          <div className="relative rounded-3xl border border-white/10 bg-linear-to-b from-neutral-900/90 to-neutral-950/90 p-8 backdrop-blur-xl md:p-12">
            <div className="absolute -top-px right-1/4 left-1/4 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <div className="group relative">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-600 to-purple-600 opacity-75 blur-lg transition-opacity group-hover:opacity-100" />
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-neutral-900 md:h-64 md:w-64">
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-900/20 to-purple-900/20">
                    <Image
                      src="perfil.png"
                      alt="Foto de Perfil"
                      fill
                      className="object-cover object-top"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </div>

              <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left">
                <h2 className="mt-4 mb-3 text-4xl font-bold text-white">
                  Hola, soy Benjamín
                </h2>

                <p className="mb-6 text-base leading-relaxed text-neutral-400 md:text-lg">
                  Desarrollador Full Stack con pasión por crear soluciones
                  digitales que combinan
                  <span className="font-medium text-white">
                    {' '}
                    arquitectura escalable
                  </span>{' '}
                  con
                  <span className="font-medium text-white">
                    {' '}
                    interfaces intuitivas
                  </span>
                  . Me especializo en transformar ideas complejas en productos
                  funcionales y elegantes.
                </p>

                <div className="mb-8 flex flex-wrap justify-center gap-3 md:justify-start">
                  {[
                    { label: 'Arquitectura de Software', icon: Server },
                    { label: 'Diseño UI/UX', icon: Layout },
                    { label: 'Rendimiento Web', icon: Zap },
                    { label: 'DevOps & Cloud', icon: Terminal },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-full border border-white/5 bg-white/3 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/8"
                      >
                        <Icon className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-xs font-medium tracking-wide text-neutral-300">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <button className="group flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
                    Ver Mis Proyectos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:scale-110 hover:border-white/20 hover:bg-white/10"
                      aria-label="GitHub"
                      onClick={() => window.open('https://github.com/Envigite')}
                    >
                      <Github className="h-5 w-5" />
                    </button>
                    <button
                      className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:scale-110 hover:border-white/20 hover:bg-white/10"
                      aria-label="LinkedIn"
                      onClick={() =>
                        window.open(
                          'https://www.linkedin.com/in/benja-envigite/'
                        )
                      }
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:scale-110 hover:border-white/20 hover:bg-white/10"
                      aria-label="Descargar CV"
                      onClick={() => (
                        window.open('/docs/CV Benjamin Contreras.pdf'),
                        '_blank'
                      )}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
