import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950">
      <div className="z-10 flex flex-col items-center gap-8">
        <h1 className="animate-neon-flicker box-reflect relative w-full text-center text-5xl leading-[0.70em] font-bold uppercase outline-none sm:tracking-[17px] md:text-8xl xl:text-9xl">
          Coming Soon
        </h1>

        <p className="mt-8 text-lg font-light tracking-widest text-gray-400 uppercase">
          Estamos construyendo algo increíble
        </p>

        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white transition-all hover:border-purple-500/50 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
}
