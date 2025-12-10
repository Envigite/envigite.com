'use client';

import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-8 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            ¿Listo para construir algo{' '}
            <span className="text-purple-500">increíble</span>?
          </h2>

          <p className="mb-12 max-w-xl text-lg text-neutral-400">
            Actualmente estoy disponible para unirme a nuevos equipos. Si buscas
            un desarrollador que entienda de código y de producto, hablemos.
          </p>

          <div className="mb-20 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:benjacontrerasma@yahoo.com"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-neutral-200"
            >
              <Mail className="h-5 w-5" />
              Envíame un correo
            </a>
            <a
              href="https://www.linkedin.com/in/benja-envigite/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5" />
              Conectemos en LinkedIn
              <ArrowUpRight className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
            </a>
            <a
              href="https://wa.link/1u042c"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-green-700 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              Contacto más personal
              <ArrowUpRight className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
            </a>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-sm text-neutral-500 md:flex-row">
            <p>© 2025 Benjamín. Casi todos los derechos reservados.</p>

            <div className="flex gap-6">
              <div className="cursor-pointer hover:text-purple-500">
                <Link
                  href="https://github.com/Envigite"
                  target="_blank"
                  className="flex items-center gap-1"
                >
                  <Github className="mx-1 h-5 w-5" />
                  Github
                </Link>
              </div>

              <div className="group cursor-pointer bg-linear-to-r from-neutral-500 to-neutral-500 bg-clip-text text-transparent hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045]">
                <Link
                  href="https://www.instagram.com/envigite73/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Instagram className="h-5 w-5 text-neutral-500 group-hover:text-red-500" />
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
