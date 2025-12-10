'use client';

import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

const TIMELINE_DATA = [
  {
    year: '2022 - Presente',
    title: 'Desarrollador Full Stack',
    company: 'Proyectos Independientes',
    description:
      'Desarrollo de aplicaciones web y móbiles complejas enfocadas en arquitectura escalable y experiencia de usuario. Implementación de soluciones E-commerce y Dashboards utilizando el stack moderno.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    type: 'work',
  },
  {
    year: '2025',
    title: 'Analista de Datos',
    company: 'Antarcold',
    description:
      'Desarrollo de soluciones de software y automatización para optimizar procesos logísticos. Implementación de dashboards interactivos para monitoreo de KPIs en tiempo real.',
    tags: ['Next.js', 'Data Visualization', 'Chart.js', 'Dashboard Logic'],
    type: 'work',
  },
  {
    year: '2022 - 2024',
    title: 'Certificación Full Stack',
    company: 'Platzi',
    description:
      'Especialización intensiva en desarrollo frontend avanzado y arquitectura de backend. +300 horas de práctica intensiva.',
    tags: ['Frontend Architecture', 'Backend Architecture', 'API REST'],
    type: 'education',
  },
];

export const Timeline = () => {
  return (
    <section className="relative bg-neutral-900 py-24" id="trayectoria">
      <div className="relative z-10 container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Mi Trayectoria
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-purple-500" />
          <p className="mt-4 text-neutral-400">
            Formación académica y experiencia profesional.
          </p>
        </motion.div>

        <div className="relative space-y-12">
          <div className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-linear-to-b from-purple-500 via-purple-500/20 to-transparent md:left-1/2 md:-ml-px" />

          {TIMELINE_DATA.map((item, index) => {
            const isWork = item.type === 'work';
            const Icon = isWork ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.3, delayChildren: 0.3 }}
                className={`relative flex flex-col gap-8 md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="ml-12 flex-1 hover:scale-103 md:ml-0">
                  <div
                    className={`relative rounded-2xl border border-white/5 bg-white/2 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/4 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} `}
                  >
                    <div
                      className={`absolute top-6 hidden h-4 w-4 rotate-45 border-t border-l border-white/5 bg-neutral-950 md:block ${index % 2 === 0 ? '-left-2 border-t border-l' : '-right-2 rotate-180 border-r border-b'} `}
                    />

                    <div
                      className={`mb-4 flex flex-col gap-2 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}
                    >
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        <Calendar className="h-3 w-3" />
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="text-sm font-medium text-neutral-400">
                        @{item.company}
                      </div>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                      {item.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs font-medium text-neutral-300 transition-colors hover:border-white/10 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-neutral-950 bg-neutral-900 shadow-xl md:left-1/2 md:-ml-5">
                  <Icon
                    className={`h-4 w-4 ${isWork ? 'text-purple-400' : 'text-blue-400'}`}
                  />
                </div>

                <div className="hidden flex-1 md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
