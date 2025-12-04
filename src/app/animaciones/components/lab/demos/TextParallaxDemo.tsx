'use client';

import { TextParallaxContent } from '../effects/TextParallax';

const ContentBlock = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pt-12 pb-24 text-slate-300 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Contenido de ejemplo
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-slate-400 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        blanditiis soluta eius quam mminus pridem?
      </p>
      <p className="mb-8 text-xl text-slate-400 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button className="w-full rounded bg-slate-200 px-9 py-4 text-xl font-bold text-slate-900 transition-colors hover:bg-white md:w-fit">
        Saber más -{'>'}
      </button>
    </div>
  </div>
);

export const TextParallaxDemo = () => {
  return (
    <div className="relative h-[600px] w-full overflow-y-auto rounded-lg border border-white/10 bg-zinc-950">
      <div className="pointer-events-none absolute top-4 right-0 left-0 z-50 text-center">
        <span className="inline-block rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
          Haz scroll dentro de este recuadro 👇
        </span>
      </div>

      <div className="bg-zinc-950">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
          subheading="Efecto Parallax"
          heading="Scroll Suave"
        >
          <ContentBlock />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop"
          subheading="Calidad"
          heading="Clean Code"
        >
          <ContentBlock />
        </TextParallaxContent>
      </div>
    </div>
  );
};
