import { InfiniteCarousel } from '@/components/ui/InfiniteCarousel';
import { TECH_STACK } from '@/config/technologies';

export const Carousell = () => {
  const items = TECH_STACK.map((tech) => (
    <div
      key={tech.name}
      className="flex h-16 w-16 items-center justify-center opacity-70 transition-all duration-300 hover:scale-120 hover:opacity-100"
    >
      {tech.icon}
    </div>
  ));

  return (
    <section className="flex items-center justify-center">
      <div className="flex max-w-5xl flex-col gap-8 overflow-hidden rounded-lg bg-transparent">
        <div>
          <p className="mb-4 py-4 text-center text-xs tracking-widest text-gray-500 uppercase">
            Tecnologías con las que Trabajo
          </p>
          <InfiniteCarousel items={items} speed={15} direction="left" />
        </div>
      </div>
    </section>
  );
};
