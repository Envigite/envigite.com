import { Hero } from '@/components/sections/HeroScroll';
import { Carousell } from '@/components/sections/Carousell';
import { TechStack } from '@/components/sections/TechStack';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-950">
      {/* El Header ya está en layout.tsx, así que no lo ponemos aquí */}

      {/* Sección 1: Hero */}
      <Hero />

      {/* Sección 2: Tecnologías */}
      <TechStack />

      {/* Sección 2: Espacio temporal para ver el scroll */}
      <Carousell />
      <section className="flex h-screen w-full items-center justify-center">
        <h2 className="text-4xl font-bold text-white/20">
          Siguiente Sección...
        </h2>
      </section>
    </main>
  );
}
