'use client';

import { useState } from 'react';
import { Copy, Check, Download, Box, Info, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Press_Start_2P, VT323 } from 'next/font/google';

const fontTitle = Press_Start_2P({ weight: '400', subsets: ['latin'] });
const fontBody = VT323({ weight: '400', subsets: ['latin'] });

const SERVER_CONFIG = {
  ip: '_minecraft_ZG791C470TdRs3QjX9Z1GwSEyuKD.fathooo.com',
  version: 'Fabric 1.21.5',
  fabricLink: 'https://fabricmc.net/use/installer/',
  modsLink:
    'https://drive.google.com/drive/folders/1tzJsOjjoqt8wrcbASV9BxGqouyEO8fRu?usp=sharing',
};

const MinecraftButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center px-6 py-3 text-white transition-transform active:scale-95 border-b-4 border-r-2 border-t-2 border-l-2 select-none cursor-pointer';

  const variants = {
    primary:
      'bg-[#7c8528] border-t-[#c8d45d] border-l-[#c8d45d] border-b-[#3a4011] border-r-[#3a4011] hover:bg-[#8d9632]',
    secondary:
      'bg-[#585858] border-t-[#8b8b8b] border-l-[#8b8b8b] border-b-[#2e2e2e] border-r-[#2e2e2e] hover:bg-[#6e6e6e]',
  };

  const content = (
    <span
      className={`${fontBody.className} flex items-center gap-2 text-xl tracking-wide text-shadow-sm`}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
};

const InfoSlot = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | React.ReactNode;
  icon: LucideIcon;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="border-2 border-[#373737] bg-[#8b8b8b] p-0.5 shadow-lg"
  >
    <div className="flex h-full flex-col items-center justify-center border-t-2 border-r-2 border-b-2 border-l-2 border-white bg-[#c6c6c6] p-4 text-center">
      <div
        className={`${fontTitle.className} mb-2 flex items-center gap-2 text-xs text-[#404040] uppercase`}
      >
        <Icon size={14} /> {label}
      </div>
      <div className={`${fontBody.className} text-2xl text-[#202020]`}>
        {value}
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_CONFIG.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copiando', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-transparent p-4 text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source
          src="/videos/projects/minecraft-server/background.webm"
          type="video/webm"
        />
      </video>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="border-4 border-black bg-[#c6c6c6] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)]">
          <div className="border-t-4 border-r-4 border-b-4 border-l-4 border-white p-6 md:p-10">
            <div className="mb-10 space-y-4 text-center">
              <motion.h1
                className={`${fontTitle.className} text-3xl text-[#3f3f3f] drop-shadow-[2px_2px_0px_#ffffff] md:text-5xl`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                NUEVO SERVIDOR
              </motion.h1>
              <p
                className={`${fontBody.className} text-2xl font-bold text-[#404040]`}
              >
                Mundo de Mods & Aventuras
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoSlot
                label="Versión"
                value={SERVER_CONFIG.version}
                icon={Box}
              />
              <InfoSlot
                label="Estado"
                value={
                  <span className="text-[#00aa00] drop-shadow-[1px_1px_0px_#000]">
                    ● Online
                  </span>
                }
                icon={Info}
              />
            </div>

            <motion.div
              className="group relative mb-8 border-2 border-[#a0a0a0] bg-black p-0.5"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col items-center justify-between gap-4 border-2 border-[#505050] bg-[#1e1e1e] p-4 md:flex-row">
                <div className="w-full flex-1 overflow-hidden">
                  <p
                    className={`${fontTitle.className} mb-1 text-xs text-[#aaaaaa]`}
                  >
                    IP del Servidor:
                  </p>
                  <code
                    className={`${fontBody.className} block truncate text-2xl tracking-wider text-white`}
                  >
                    {SERVER_CONFIG.ip}
                  </code>
                </div>

                <MinecraftButton
                  onClick={handleCopy}
                  className="w-full min-w-[140px] md:w-auto"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="copied"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-yellow-200"
                      >
                        <Check size={20} /> ¡LISTO!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Copy size={20} /> COPIAR
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MinecraftButton>
              </div>
            </motion.div>

            <div className="flex flex-col items-center justify-center gap-4 border-t-2 border-dashed border-[#a0a0a0] pt-8 md:flex-row">
              <video
                src="/videos/projects/minecraft-server/steve-dancig.webm"
                poster="{project.image}"
                autoPlay
                loop
                muted
                playsInline
                className="z-50 h-6 max-w-full rounded-xl border border-gray-500 object-contain shadow-[4px_4px_2px_0px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-800"
              />
              <MinecraftButton
                href={SERVER_CONFIG.fabricLink}
                variant="secondary"
                className="w-full md:w-auto"
              >
                <Download size={20} /> DESCARGAR FABRIC
              </MinecraftButton>
              <MinecraftButton
                href={SERVER_CONFIG.modsLink}
                variant="primary"
                className="w-full md:w-auto"
              >
                <Box size={20} /> PACK DE MODS
              </MinecraftButton>
            </div>

            <div className="relative mt-10 border-4 border-[#8b4513] bg-[#f4e4b5] p-6 font-serif text-[#5c4033] shadow-inner">
              <h2
                className={`${fontTitle.className} mb-4 inline-block border-b-2 border-[#8b4513] pb-2 text-xl`}
              >
                Guía de Instalación
              </h2>
              <div
                className={`${fontBody.className} space-y-4 text-xl leading-tight`}
              >
                <p>
                  1. Descarga e instala{' '}
                  <strong>Fabric {SERVER_CONFIG.version.split(' ')[1]}</strong>.
                </p>
                <p>
                  2. Descarga el pack de mods y mueve los archivos a la carpeta:
                  <br />
                  <code className="mt-1 inline-block rounded border border-[#bfa87a] bg-[#dccfa3] px-2">
                    %appdata%\.minecraft\mods
                  </code>
                </p>
                <p>3. ¡Inicia el juego y conéctate a la IP!</p>
                <p>4. ¡Recuerda hacerle caso a la Tuga!</p>
              </div>

              <div className="absolute top-2 right-2 opacity-50">
                <Info size={32} className="text-[#8b4513]" />
              </div>
            </div>
          </div>
        </div>

        <p
          className={`${fontBody.className} mt-4 text-center text-lg text-gray-500`}
        >
          Servidor privado
        </p>
      </motion.div>
    </main>
  );
}
