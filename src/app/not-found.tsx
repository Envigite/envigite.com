'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Terminal, Search, Code2, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  const floatingVariant = (delay: number): Variants => ({
    animate: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      },
    },
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]"
        />

        <motion.div
          variants={floatingVariant(0)}
          initial="animate"
          animate="animate"
          className="absolute top-1/4 left-1/4 text-purple-500/20"
        >
          <Terminal className="h-12 w-12" />
        </motion.div>
        <motion.div
          variants={floatingVariant(2)}
          initial="animate"
          animate="animate"
          className="absolute right-1/4 bottom-1/3 text-blue-500/20"
        >
          <Code2 className="h-16 w-16" />
        </motion.div>
        <motion.div
          variants={floatingVariant(4)}
          initial="animate"
          animate="animate"
          className="absolute top-1/6 right-2/5 text-pink-500/20"
        >
          <Search className="h-8 w-8" />
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-purple-500/10 backdrop-blur-xl"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 rounded-full border border-red-500/20 bg-red-500/10 p-3 text-red-400"
        >
          <ShieldAlert className="h-8 w-8" />
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <motion.h1
            animate={{
              textShadow: [
                '0 0 10px rgba(168,85,247,0.5)',
                '0 0 20px rgba(168,85,247,0.8)',
                '0 0 10px rgba(168,85,247,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="animate-gradient bg-linear-to-r from-purple-400 via-blue-500 to-purple-400 bg-size-[200%_auto] bg-clip-text text-9xl font-extrabold tracking-tighter text-transparent"
          >
            404
          </motion.h1>
          <div className="absolute -inset-1 -z-10 rounded-full bg-purple-500/30 opacity-50 blur-xl"></div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mt-4 text-3xl font-bold text-white md:text-4xl"
        >
          Página no encontrada
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 mb-8 text-lg leading-relaxed text-neutral-400"
        >
          Parece que te has aventurado demasiado lejos en el ciberespacio. La
          ruta que buscas no existe o ha sido movida a otro servidor.
        </motion.p>

        {/* Botón de regreso */}
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:bg-neutral-200 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="relative z-10">Volver al Inicio</span>
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 font-mono text-sm text-neutral-500"
      >
        Error Code: 404_NOT_FOUND | System: Envigite.dev
      </motion.div>
    </main>
  );
}
