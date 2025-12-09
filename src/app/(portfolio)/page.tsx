import { Hero } from '@/components/sections/HeroScroll';
import { Carousell } from '@/components/sections/Carousell';
import { TechStack } from '@/components/sections/TechStack';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-900">
      <Hero />
      <TechStack />
      <Carousell />
      <FeaturedProjects />
      <section className="flex h-screen w-full items-center justify-center">
        <h2 className="text-4xl font-bold text-white/20">
          Siguiente Sección...
        </h2>
      </section>
    </main>
  );
}
