export const HAMBURGER_TSX = `import { cn } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative z-50 w-[30px] h-6 flex flex-col justify-between"
    >
      <span
        className={cn(
          'block h-[3px] w-full bg-white rounded-sm transition-all duration-400 ease-in-out origin-center',
          isOpen && 'rotate-45 translate-y-2.5'
        )}
      />
      <span
        className={cn(
          'block h-[3px] w-full bg-white rounded-sm transition-all duration-400 ease-in-out',
          isOpen && 'opacity-0 translate-x-4'
        )}
      />
      <span
        className={cn(
          'block h-[3px] w-full bg-white rounded-sm transition-all duration-400 ease-in-out origin-center',
          isOpen && '-rotate-45 -translate-y-[11px]'
        )}
      />
    </div>
  );
};`;

export const HAMBURGER_CSS = `<div class="hamburger-btn" onclick="this.classList.toggle('open')">
  <span class="bar top"></span>
  <span class="bar middle"></span>
  <span class="bar bottom"></span>
</div>

<style>
/* CSS Styles */
.hamburger-btn {
  width: 30px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  z-index: 50;
}

.bar {
  display: block;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  transition: all 0.4s ease-in-out;
}

/* Animation States */
.hamburger-btn.open .top {
  transform: translateY(10px) rotate(45deg);
}

.hamburger-btn.open .middle {
  opacity: 0;
  transform: translateX(16px);
}

.hamburger-btn.open .bottom {
  transform: translateY(-11px) rotate(-45deg);
}
</style>`;

export const HEADER_TSX = `"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const ScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambia a negro después de 50px de scroll
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ease-in-out",
        isScrolled ? "bg-black py-4 shadow-md" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between text-white">
        <span className="font-bold text-xl">Logo</span>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
        </nav>
      </div>
    </header>
  );
};`;

export const HEADER_CSS = `.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  transition: background-color 0.4s ease-in-out;
  background-color: transparent;
  z-index: 50;
}

.header.scrolled {
  background-color: black;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`;

export const PARALLAX_TSX = `"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: \`url(\${imgUrl})\`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: \`calc(100vh - \${IMG_PADDING * 2}px)\`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: { subheading: string; heading: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-5xl">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

interface TextParallaxProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

export const TextParallaxContent = ({ 
  imgUrl, 
  subheading, 
  heading, 
  children 
}: TextParallaxProps) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};`;

export const PARALLAX_USAGE = `import { TextParallaxContent } from '@/components/ui/TextParallax';

export default function MyPage() {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="/images/mi-foto.jpg"
        subheading="Subtítulo increíble"
        heading="Título Principal"
      >
        <div className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="text-3xl font-bold">Aquí va tu contenido</h2>
          <p className="mt-4 text-gray-600">
            Este contenido aparecerá deslizándose sobre la imagen
            cuando hagas scroll hacia abajo.
          </p>
        </div>
      </TextParallaxContent>
    </div>
  );
}`;