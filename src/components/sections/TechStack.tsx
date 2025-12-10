'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Database,
  Palette,
  Wrench,
  Zap,
  ShieldCheck,
  Infinity,
} from 'lucide-react';

const techStack = {
  frontend: {
    title: 'Frontend & UI',
    icon: Palette,
    color: 'from-blue-600 to-cyan-600',
    barColor: 'from-blue-500 to-cyan-500',
    techs: [
      // Core & Frameworks
      { name: 'React', description: 'Ecosistema, Hooks, Virtual DOM' },
      { name: 'Next.js', description: 'App Router, SSR, Server Actions' },
      { name: 'TypeScript', description: 'Tipado estricto y escalabilidad' },
      { name: 'React Native', description: 'Desarrollo móvil multiplataforma' },

      // Estado & Data Fetching (Muy importante en empresas)
      { name: 'Zustand', description: 'Estado global ligero y rápido' },

      // Estilos & UI
      { name: 'Tailwind CSS', description: 'Diseño utility-first rápido' },
    ],
  },
  backend: {
    title: 'Backend & Data',
    icon: Database,
    color: 'from-green-600 to-emerald-600',
    barColor: 'from-green-500 to-emerald-500',
    techs: [
      // Runtimes & Frameworks
      { name: 'Node.js', description: 'Entorno de ejecución asíncrono' },
      { name: 'Express', description: 'Arquitectura REST estándar' },

      // Bases de Datos
      { name: 'PostgreSQL', description: 'SQL relacional robusto' },
      { name: 'MongoDB', description: 'NoSQL orientado a documentos' },

      // Seguridad
      { name: 'JWT & OAuth', description: 'Estrategias de autenticación' },
      { name: 'NextAuth.js', description: 'Auth para Next.js' },
    ],
  },
  tools: {
    title: 'DevOps & Cloud',
    icon: Wrench,
    color: 'from-purple-600 to-pink-600',
    barColor: 'from-purple-500 to-pink-500',
    techs: [
      // Contenedores & Orquestación
      { name: 'Docker', description: 'Containerización de aplicaciones' },

      // Cloud (AWS es el rey, pero saber otros suma)
      { name: 'AWS S3/EC2', description: 'Almacenamiento y Cómputo' },
      { name: 'Vercel', description: 'Despliegue Frontend/Edge' },

      // CI/CD & Versionamiento
      { name: 'Git & GitHub', description: 'Flujo de trabajo colaborativo' },
      { name: 'GitHub Actions', description: 'Pipelines de CI/CD' },
    ],
  },
};

const TechCard = ({
  tech,
  index,
  barColor,
}: {
  tech: (typeof techStack.frontend.techs)[0];
  index: number;
  barColor: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="group rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm transition-all hover:scale-103 hover:border-white/20 hover:bg-white/10">
        <div className="mb-3">
          <h4 className="font-bold text-white transition group-hover:rotate-2">
            {tech.name}
          </h4>
          <p className="text-xs text-neutral-500 group-hover:text-white">
            {tech.description}
          </p>
        </div>

        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{
              duration: 1.5,
              delay: index * 0.1 + 0.3,
              ease: 'easeOut',
            }}
            className={`h-full rounded-full bg-linear-to-r ${barColor}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({
  data,
  index,
}: {
  data: typeof techStack.frontend;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = data.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className={`rounded-xl bg-linear-to-br ${data.color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{data.title}</h3>
          <div className="h-1 w-24 rounded-full bg-linear-to-r from-white/40 to-transparent" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {data.techs.map((tech, idx) => (
          <TechCard
            key={tech.name}
            tech={tech}
            index={idx}
            barColor={data.barColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const TechStack = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={targetRef}
      className="via-neutral-850 relative bg-linear-to-b from-neutral-900 to-neutral-900"
      id="habilidades"
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative mx-auto max-w-7xl px-6 pb-16"
      >
        {/* Header de la sección */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-neutral-300">
              Arsenal Tecnológico
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            Tecnologías que{' '}
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Domino
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-neutral-400"
          >
            Un stack moderno y robusto que me permite construir desde interfaces
            dinámicas hasta arquitecturas backend escalables
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {Object.entries(techStack).map(([key, data], index) => (
            <CategorySection key={key} data={data} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid gap-6 sm:grid-cols-3"
        >
          {[
            {
              label: 'Calidad de Código',
              value: '100%',
              icon: ShieldCheck,
            },
            {
              label: 'Aprendizaje',
              value: 'Continuo',
              icon: Infinity,
            },
            {
              label: 'Enfoque',
              value: 'Rendimiento',
              icon: Zap,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-6 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
                <Icon className="mx-auto mb-3 h-8 w-8 text-blue-400" />
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
