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
  MessageCircle,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
      className="via-neutral-850 relative h-[200vh] bg-linear-to-b from-neutral-900 to-neutral-900"
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
              <div className="flex flex-col items-center gap-6">
                {' '}
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-600 to-purple-600 opacity-75 blur-lg transition-opacity group-hover:opacity-100" />

                  <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-neutral-900 md:h-64 md:w-64">
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-900/20 to-purple-900/20">
                      <Image
                        src="/perfil.png"
                        alt="Foto de Perfil"
                        fill
                        className="object-cover object-top"
                        priority
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-4"
                >
                  {[
                    {
                      name: 'LinkedIn',
                      icon: Linkedin,
                      url: 'https://www.linkedin.com/in/benja-envigite/',
                      color: 'hover:text-blue-400',
                    },
                    {
                      name: 'GitHub',
                      icon: Github,
                      url: 'https://github.com/Envigite',
                      color: 'hover:text-purple-400',
                    },
                    {
                      name: 'WhatsApp',
                      icon: MessageCircle,
                      url: 'https://wa.link/1u042c',
                      color: 'hover:text-green-400',
                    },
                    {
                      name: 'Correo',
                      icon: Mail,
                      url: 'mailto:benjacontrerasma@yahoo.com',
                      color: 'hover:text-pink-400',
                    },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      aria-label={social.name}
                      className={`group relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-neutral-400 backdrop-blur-md transition-all hover:bg-white/10 ${social.color}`}
                    >
                      <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </Link>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-col justify-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-2 mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                  Hola, soy{' '}
                  <span className="bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Benjamín
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-xl"
                >
                  Desarrollador Full Stack, transformo ideas complejas en
                  productos digitales de{' '}
                  <span className="font-medium text-white">
                    arquitectura escalable
                  </span>{' '}
                  y{' '}
                  <span className="font-medium text-white">
                    experiencias memorables
                  </span>
                  .
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-10 flex flex-wrap gap-3"
                >
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
                        className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-medium tracking-wide text-neutral-300">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href="/projects"
                    className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-neutral-200"
                  >
                    Ver Proyectos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href="/docs/CV Benjamin Contreras.pdf"
                    target="_blank"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" />
                    Descargar CV
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
