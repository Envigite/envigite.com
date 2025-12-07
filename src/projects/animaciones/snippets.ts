export const HAMBURGER_TSX = `import { cn } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="relative z-50 flex h-5 w-7.5 cursor-pointer flex-col justify-between"
    >
      <span
        className={cn(
          'block h-1 w-full origin-center rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && 'translate-y-2 rotate-45'
        )}
      />
      <span
        className={cn(
          'block h-1 w-full rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && 'translate-x-4 opacity-0'
        )}
      />
      <span
        className={cn(
          'block h-1 w-full origin-center rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && '-translate-y-2 -rotate-45'
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

export const HAMBURGER_USAGE = `import { useState } from "react";
import { HamburgerButton } from "@/components/ui/HamburgerButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <span className="text-xl font-bold">Logo</span>

      {/* El botón controla el estado del menú */}
      <HamburgerButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />

      {/* Menú condicional */}
      <div className={\`fixed inset-0 bg-neutral-900 z-40 transition-transform duration-300 \${
        isOpen ? "translate-x-0" : "translate-x-full"
      }\`}>
        {/* Links del menú... */}
      </div>
    </nav>
  );
}`;

export const HEADER_TSX = `"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const ScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

export const HOVER_LINKS_TSX = `"use client";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface HoverImageLinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

export const HoverImageLink = ({
  heading,
  imgSrc,
  subheading,
  href,
}: HoverImageLinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = ref.current!.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{ initial: { x: 0 }, whileHover: { x: -16 } }}
          transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{ initial: { x: 0 }, whileHover: { x: 16 } }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{ top, left, translateX: "-50%", translateY: "-50%" }}
        variants={{ initial: { scale: 0, rotate: "-12.5deg" }, whileHover: { scale: 1, rotate: "12.5deg" } }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={\`Image for \${heading}\`}
      />

      <motion.div
        variants={{ initial: { x: "25%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <ArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};`;

export const HOVER_LINKS_USAGE = `import { HoverImageLink } from "@/components/ui/HoverImageLink";

export default function LinksSection() {
  return (
    <section className="bg-neutral-950 p-8">
      <div className="mx-auto max-w-5xl">
        <HoverImageLink
          heading="Proyectos"
          subheading="Mira lo que he construido"
          imgSrc="/imgs/proyectos.jpg"
          href="/proyectos"
        />
        <HoverImageLink
          heading="Sobre Mí"
          subheading="Conoce mi historia"
          imgSrc="/imgs/perfil.jpg"
          href="/about"
        />
      </div>
    </section>
  );
}`;

export const SCROLL_TOP_TSX = `"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 cursor-pointer rounded-full shadow-lg transition-all duration-300",
        "bg-purple-600 text-white hover:bg-purple-700 hover:scale-110",
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};`;

export const SCROLL_TOP_USAGE = `// src/app/layout.tsx (o donde quieras usarlo)
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <ScrollToTop /> {/* Se coloca una vez y funciona en toda la web */}
      </body>
    </html>
  );
}`;

export const NEON_TSX = `import { cn } from "@/lib/utils";

export const NeonText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <h1
      className={cn(
        "relative w-full text-center font-bold uppercase outline-none leading-[0.70em]",
        "animate-neon-flicker box-reflect", // Clases personalizadas
        "text-5xl sm:tracking-[17px] md:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  );
};`;

export const NEON_CSS = `/* src/app/globals.css */

@layer utilities {
  .animate-neon-flicker {
    animation: dimlight 5s infinite;
  }
  
  .box-reflect {
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0004);
  }
}

@keyframes dimlight {
  0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92% {
    color: #0e3742;
    text-shadow: none;
  }
  
  18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
    color: #fff;
    text-shadow: 
      0 0 10px #03bcf4,
      0 0 20px #03bcf4,
      0 0 40px #03bcf4,
      0 0 80px #03bcf4;
  }
}`;

export const NEON_USAGE = `import { NeonText } from "@/components/ui/NeonText";

export default function HeroSection() {
  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <NeonText>Cyberpunk</NeonText>
    </section>
  );
}`;

export const CAROUSEL_TSX = `"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export const InfiniteCarousel = ({
  items,
  speed = 20,
  direction = "left",
  className,
}: InfiniteCarouselProps) => {
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div className="absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-neutral-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-neutral-950 to-transparent pointer-events-none" />

      <motion.div
        key={\`\${direction}-\${speed}\`}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex min-w-full gap-8 py-4 shrink-0"
      >
        {items.map((item, idx) => (
          <div key={\`original-\${idx}\`} className="shrink-0">{item}</div>
        ))}
        {items.map((item, idx) => (
          <div key={\`dup-\${idx}\`} className="shrink-0">{item}</div>
        ))}
      </motion.div>
    </div>
  );
};`;

export const CAROUSEL_USAGE = `import { InfiniteCarousel } from "@/components/ui/InfiniteCarousel";
import {
  Cloud,
  Code2,
  Database,
  Server,
  Smartphone,
  Globe,
  Cpu,
} from 'lucide-react';

const TECH_STACK = [
  { name: 'React', icon: <Code2 className="text-blue-400" /> },
  { name: 'Next.js', icon: <Globe className="text-white" /> },
  { name: 'TypeScript', icon: <Code2 className="text-blue-600" /> },
  { name: 'AWS', icon: <Cloud className="text-orange-400" /> },
  { name: 'Node.js', icon: <Server className="text-green-500" /> },
  { name: 'PostgreSQL', icon: <Database className="text-blue-300" /> },
  { name: 'Mobile', icon: <Smartphone className="text-purple-400" /> },
  { name: 'Docker', icon: <Cpu className="text-blue-500" /> },
];

export const TechStack = () => {
  const items = TECH_STACK.map((tech) => (
    <div
      key={tech.name}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
    >
      {tech.icon}
      <span className="text-sm font-medium text-gray-300">{tech.name}</span>
    </div>
  ));

  return (
    <div className="flex w-full flex-col gap-8 overflow-hidden rounded-lg border border-white/10 bg-neutral-950 py-12">
      <div>
        <p className="mb-4 text-center text-xs tracking-widest text-gray-500 uppercase">
          Stack Principal
        </p>
        <InfiniteCarousel items={items} speed={25} direction="left" />
      </div>

      <div>
        <p className="mb-4 text-center text-xs tracking-widest text-gray-500 uppercase">
          Herramientas
        </p>
        <InfiniteCarousel items={items} speed={15} direction="right" />
      </div>
    </div>
  );
};`;