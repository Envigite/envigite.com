import { Hero } from '@/components/sections/HeroScroll';
import { Carousell } from '@/components/sections/Carousell';
import { TechStack } from '@/components/sections/TechStack';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Timeline } from '@/components/sections/Timeline';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-900">
      <Hero />
      <TechStack />
      <Carousell />
      <FeaturedProjects />
      <Timeline />
      <Footer />
    </main>
  );
}
