import { Project } from "@/lib/types";

export const ALL_PROJECTS: Project[] = [
  {
    slug: 'ecommerce-fashion',
    title: "Fashion't Park E-commerce",
    description: "Plataforma Full Stack robusta con tienda pública y panel administrativo.",
    longDescription: `Este proyecto nació de la necesidad de crear una tienda online que 
    soportara picos de tráfico durante campañas de Black Friday y Cyber Monday. 
    El desafío principal fue diseñar una arquitectura que mantuviera la consistencia 
    de datos en el inventario mientras múltiples usuarios realizaban compras simultáneas.
    Implementé un sistema de caché con Redis para las consultas frecuentes, reduciendo 
    la carga en la base de datos en un 70%. Las imágenes se optimizan automáticamente 
    con Next.js Image y se almacenan en AWS S3 con CDN CloudFront para 
    tiempos de carga inferiores a 1 segundo.
    El panel administrativo permite gestionar productos, categorías, órdenes 
    y usuarios con roles y permisos granulares, además de incluir 
    dashboards en tiempo real con métricas 
    de ventas y comportamiento de usuarios.`,
    
    image: "/images/demo-ecommerce-minecraft.jpg", 
    video: '/videos/ecommerce-minecraft.mp4',
    
    tags: [
      "Next.js",
      "TypeScript",
      "AWS",
      "Docker",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Full Stack",
      "DevOps",
      "E-commerce"
    ],
    
    category: "Full Stack",
    featured: true,
    hasCaseStudy: true,
    
    links: {
      repo: "https://github.com/Envigite/Ecommerce-minecraft",
      demo: "https://www.fashiontpark.store"
    },
    
    challenges: [
      "Implementar carrito persistente entre sesiones sin perder datos.",
      "Optimizar tiempos de carga con catálogo de +5,000 productos.",
      "Integrar pasarela de pagos Stripe con webhooks para confirmación segura.",
      "Manejar concurrencia en inventario para evitar sobreventa.",
      "Implementar búsqueda avanzada con filtros múltiples sin sacrificar performance."
    ],
    
    features: [
      "Autenticación con NextAuth y roles RBAC (Admin, Vendedor, Cliente)",
      "Dashboard de ventas en tiempo real con gráficos interactivos",
      "Upload de imágenes a S3 con compresión automática",
      "Sistema de notificaciones por email con Resend",
      "Carrito persistente con sincronización cross-device",
      "Panel administrativo completo con gestión de productos e inventario",
      "Integración completa con Stripe para pagos y reembolsos"
    ],
    
    // ✨ NUEVOS CAMPOS OPCIONALES
    
    screenshots: [
      "/images/projects/ecommerce/screenshot-home.jpg",
      "/images/projects/ecommerce/screenshot-product.jpg",
      "/images/projects/ecommerce/screenshot-cart.jpg",
      "/images/projects/ecommerce/screenshot-admin-dashboard.jpg",
      "/images/projects/ecommerce/screenshot-admin-products.jpg"
    ],
  },
  {
    slug: 'cierre-temporada',
    title: "Dashboard Cierre de Temporada",
    description: "Visualización de datos complejos y KPIs logísticos para gerencia.",
    longDescription: "Un dashboard crítico para la toma de decisiones en el sector agrícola. Permite visualizar el rendimiento de la cosecha, mermas y proyecciones en tiempo real.",
    image: "/images/dashboard-cierre.png",
    video: '/videos/cierre-temporada.mp4',
    tags: ["React", "Vite", "Recharts", "Tailwind"],
    category: "Frontend",
    featured: true,
    hasCaseStudy: true, // <--- TIENE PÁGINA DE DETALLE
    links: {
      repo: "https://github.com/Envigite/cierre-temporada",
      demo: "/demos/cierre-temporada" // Link interno a la demo
    },
    challenges: [
      "Manejo de grandes volúmenes de datos en el cliente.",
      "Sincronización de múltiples gráficos interactivos.",
      "Diseño responsivo para tablets en terreno."
    ],
    features: [
      "Gráficos interactivos con Recharts",
      "Filtros avanzados por fecha y lote",
      "Exportación a Excel/PDF"
    ],
  },
  {
    slug: 'minecraft-repo',
    title: "Minecraft Repository Android",
    description: "App nativa Android con Arquitectura MVVM y Clean Architecture.",
    longDescription: "Una aplicación móvil nativa que consume la API de Minecraft para mostrar skins y recursos. Enfocada en buenas prácticas de desarrollo Android moderno.",
    image: "/images/minecraft-repository-1.gif",
    video: '/videos/minecraft-repository.mp4',
    isVertical: true,
    tags: ["Kotlin", "Android", "MVVM", "Room"],
    category: "Mobile",
    featured: true,
    hasCaseStudy: true, // <--- NO TIENE DETALLE (Solo link a repo)
    links: {
      repo: "https://github.com/Envigite/MinecraftRepository",
      demo: null 
    },
  },
  {
    slug: 'animaciones-lab',
    title: "Laboratorio de Animaciones",
    description: "Colección de componentes interactivos y experimentos de UI.",
    longDescription: "Un espacio de experimentación donde pruebo nuevas librerías de animación y patrones de interfaz de usuario avanzados.",
    image: "/images/animaciones-preview.png",
    video: '/videos/demo-ecommerce-minecraft.mp4',
    tags: ["Framer Motion", "Tailwind", "UI/UX"],
    category: "Creative",
    featured: true,
    hasCaseStudy: true,
    links: {
      repo: "https://github.com/Envigite/portfolio",
      demo: "/projects/animaciones"
    },
  },
];