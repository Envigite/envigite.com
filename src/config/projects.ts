//import { Project } from '@/lib/types'; // Asegúrate de definir este tipo o usa any por ahora

export const ALL_PROJECTS = [
  {
    slug: 'ecommerce-minecraft', // ID único para URL si lo necesitas
    title: "Fashion't Park E-commerce",
    description: "Plataforma Full Stack robusta con tienda pública y panel administrativo.",
    tags: ["Next.js", "Docker", "AWS", "Stripe"],
    image: "/images/demo-ecommerce-minecraft.gif", // Asegúrate de que las rutas sean correctas
    category: "Full Stack",
    links: {
      repo: "https://github.com/Envigite/Ecommerce-minecraft",
      demo: "https://www.fashiontpark.store"
    },
    featured: true
  },
  {
    slug: 'cierre-temporada',
    title: "Dashboard Cierre de Temporada",
    description: "Visualización de datos complejos y KPIs logísticos para gerencia.",
    tags: ["React", "Vite", "Recharts", "Tailwind"],
    image: "/images/dashboard-cierre.png",
    category: "Frontend",
    links: {
      repo: "https://github.com/Envigite/cierre-temporada",
      // Enlace interno a tu sub-proyecto migrado
      demo: "/projects/cierre-temporada" 
    },
    featured: false
  },
  {
    slug: 'minecraft-repo',
    title: "Minecraft Repository Android",
    description: "App nativa Android con Arquitectura MVVM y Clean Architecture.",
    tags: ["Kotlin", "Android", "MVVM", "Room"],
    image: "/images/minecraft-repository-1.gif",
    category: "Mobile",
    links: {
      repo: "https://github.com/Envigite/MinecraftRepository",
      demo: null // <--- AQUÍ: Si es null, no mostramos botón
    },
    featured: false
  },
  {
    slug: 'animaciones-lab',
    title: "Laboratorio de Animaciones",
    description: "Colección de componentes interactivos y experimentos de UI.",
    tags: ["Framer Motion", "Tailwind", "UI/UX"],
    image: "/images/animaciones-preview.png", // Crea una captura de tu lab
    category: "Creative",
    links: {
      repo: "https://github.com/Envigite/portfolio",
      demo: "/projects/animaciones" // Enlace interno
    },
    featured: true
  }
];