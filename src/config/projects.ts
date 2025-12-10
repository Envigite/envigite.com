import { Project } from "@/lib/types";

export const ALL_PROJECTS: Project[] = [
  {/*  <--- ECOMMERCE MINECRAFT ---> */
    slug: 'ecommerce-minecraft',
    title: "Fashion't Park E-commerce",
    description: "Plataforma Full Stack nativa en la nube, desplegada en AWS con arquitectura de microservicios contenerizados.",
    
    longDescription: `Fashion't Park nació de una curiosidad personal: ¿Cómo se ve y se siente una aplicación de nivel empresarial construida desde cero? Aunque la estética rinde homenaje al universo de Minecraft, la ingeniería detrás es totalmente seria.
    
    No quería usar soluciones "mágicas" prefabricadas. En su lugar, decidí ensuciarme las manos construyendo mi propio sistema de autenticación seguro con JWT y Cookies HttpOnly, y separando completamente el Frontend del Backend para una arquitectura desacoplada real.
    
    El mayor desafío (y mi mayor orgullo) fue salir del "localhost". Llevar esto a la nube me obligó a dominar Docker y el ecosistema de AWS. No solo es código; es infraestructura: configuré servidores en App Runner, gestioné dominios con Route 53 y aseguré la entrega de contenido. 
    
    Hoy, el proyecto cuenta con un panel administrativo que permite controlar el negocio en tiempo real, desde el inventario hasta las métricas de usuarios. Es la prueba viviente de que puedo tomar una idea, contenerizarla y desplegarla para que el mundo la vea.`,

    image: "/images/projects/ecommerce-minecraft/screenshot-home.webp",
    video: '/videos/projects/ecommerce-minecraft/demo-ecommerce-minecraft.webm',
    
    tags: [
      "Next.js 16",
      "TypeScript",
      "AWS App Runner",
      "Docker",
      "Node.js & Express",
      "PostgreSQL (RDS)",
      "Tailwind CSS",
      "Zustand",
      "CloudFront",
      "DevOps"
    ],
    
    category: "Full Stack",
    role: "Arquitecto & Desarrollador Full Stack",
    year: "2025",
    status: "En Producción",

    featured: true,
    hasCaseStudy: true,
    
    links: {
      repo: "https://github.com/Envigite/Ecommerce-minecraft",
      demo: "https://www.fashiontpark.store"
    },
    
    challenges: [
      "Orquestar el despliegue de Frontend y Backend como servicios independientes en AWS App Runner.",
      "Configurar correctamente CORS y Cookies HttpOnly para la comunicación segura entre dominios distintos.",
      "Implementar un sistema de Roles (RBAC) para proteger rutas administrativas y datos sensibles.",
      "Mantener la persistencia del carrito de compras sincronizando el estado local (Zustand) con la base de datos.",
      "Gestionar certificados SSL y registros DNS personalizados (Route 53) para asegurar la plataforma."
    ],
    
    features: [
      "Infraestructura Cloud-Native escalable con Docker y AWS",
      "Sistema de Autenticación personalizado (JWT + HttpOnly Cookies)",
      "Panel Administrativo con gráficos de métricas en tiempo real (Recharts)",
      "Gestión completa de Inventario (CRUD) y Usuarios",
      "Carrito de compras inteligente y persistente",
      "Diseño UI/UX temático y totalmente responsivo",
      "Protección de rutas mediante Middleware avanzado"
    ],
    
    screenshots: [
      "/images/projects/ecommerce-minecraft/screenshot-home.webp",
      "/images/projects/ecommerce-minecraft/screenshot-login.webp",
      "/images/projects/ecommerce-minecraft/screenshot-products.webp",
      "/images/projects/ecommerce-minecraft/screenshot-cart.webp",
      "/images/projects/ecommerce-minecraft/screenshot-admin-dashboard.webp",
      "/images/projects/ecommerce-minecraft/screenshot-admin-products.webp",
    ],
    
    architecture: [
      {
        title: "Desacoplamiento Frontend/Backend",
        desc: "Arquitectura separada donde Next.js maneja la UI y Express la lógica de negocio, permitiendo escalabilidad independiente."
      },
      {
        title: "Seguridad Robusta",
        desc: "Implementación de JWT rotativos y Cookies con flags 'Secure' y 'SameSite' para prevenir ataques XSS y CSRF."
      },
      {
        title: "DevOps & CI/CD",
        desc: "Uso de Docker para garantizar la paridad entre desarrollo y producción, con despliegues automatizados en AWS."
      }
    ]
  },
  {/* <--- CIERRE TEMPORADA ---> */
    slug: 'cierre-temporada',
  title: "Dashboard Cierre de Temporada",
  description: "Plataforma de inteligencia de negocios para el sector agrícola, migrada de un MVP táctico a una arquitectura escalable en Next.js.",

  longDescription: `Este proyecto nació en las trincheras del Área de Operaciones. Ante un cierre de temporada crítico y plazos imposibles, recibí la misión de consolidar la data productiva para la Gerencia. Mi primera decisión fue estratégica: priorizar la velocidad. Utilicé técnicas de Rapid Prototyping asistido por IA para entregar un MVP funcional que salvó la presentación y permitió la toma de decisiones basada en datos reales.

  Sin embargo, como ingeniero, sabía que el código de emergencia no es sostenible. Decidí realizar una reingeniería total, migrando la solución a Next.js 16 con App Router. Implementé una arquitectura modular estricta con TypeScript para blindar la lógica de cálculo (vital en métricas de mermas y rendimiento) y sustituí la deuda técnica del prototipo por patrones de diseño limpios y componentes reutilizables.

  El resultado es una herramienta de visualización "Premium" que no solo se ve bien, sino que es extremadamente robusta. Integré Framer Motion para micro-interacciones que guían al usuario y Chart.js para manejar grandes volúmenes de datos sin sacrificar rendimiento. Lo que comenzó como un script de supervivencia es hoy un producto digital maduro, escalable y listo para crecer.`,

  image: "/images/projects/cierre-temporada/screenshot-home.webp",
  video: "/videos/projects/cierre-temporada/demo-cierre-temporada.webm",
  
  tags: [
    "Next.js 16",
    "TypeScript",
    "Chart.js",
    "Framer Motion",
    "Tailwind CSS",
    "Data Visualization",
    "App Router",
    "Rapid Prototyping"
  ],

  category: "Frontend",
  role: "Product Engineer & Lead Developer",
  year: "2025",
  status: "En Producción",

  featured: true,
  hasCaseStudy: true,

  links: {
    repo: "https://github.com/Envigite/cierre-temporada",
    demo: "/demos/cierre-temporada"
  },

  challenges: [
    "Refactorizar la lógica de negocio 'hardcoded' de un MVP rápido hacia un sistema tipado y modular.",
    "Garantizar la precisión decimal en cálculos de mermas y rendimiento agrícola utilizando TypeScript estricto.",
    "Optimizar el renderizado de gráficos complejos (Chart.js) dentro de la arquitectura de Server Components de Next.js.",
    "Diseñar una UX fluida que transforme tablas de datos áridos en insights visuales inmediatos para la gerencia.",
    "Implementar un sistema de filtrado avanzado (por lote, fecha y tipo de fruto) sin comprometer la performance del cliente."
  ],

  features: [
    "Dashboard interactivo de alto rendimiento (Next.js App Router)",
    "Visualización avanzada de métricas (Frutilla/Mix Berries) con Chart.js",
    "Transiciones y feedback visual fluido con Framer Motion",
    "Cálculo automatizado de KPIs logísticos y de despezonado",
    "Arquitectura de componentes atomizada y tipada",
    "Diseño UI 'Premium' enfocado en la legibilidad de datos",
    "Exportación de reportes ejecutivos"
  ],

  screenshots: [
    "/images/projects/cierre-temporada/screenshot-resumen.webp",
    "/images/projects/cierre-temporada/screenshot-despezonado.webp",
    "/images/projects/cierre-temporada/screenshot-embalaje.webp",
    "/images/projects/cierre-temporada/screenshot-categorias.webp",
    "/images/projects/cierre-temporada/screenshot-exportacion.webp",
    "/images/projects/cierre-temporada/screenshot-desviaciones.webp"
  ],

  architecture: [
    {
      title: "Evolución de Arquitectura",
      desc: "Migración de un Monolito Frontend (Legacy) a una estructura modular basada en Next.js App Router, separando UI de la lógica de negocio."
    },
    {
      title: "Integridad de Datos",
      desc: "Uso de TypeScript estricto e interfaces compartidas para asegurar que los cálculos de mermas y proyecciones sean matemáticamente consistentes."
    },
    {
      title: "Visualización Performante",
      desc: "Implementación optimizada de librerías gráficas (Chart.js) evitando re-renders innecesarios mediante la gestión eficiente del estado."
    }
  ]
  },
  {/* <--- MINECRAFT REPOSITORY ---> */
  slug: 'minecraft-repository',
  title: "Minecraft Repository Android",
  description: "Aplicación nativa Android diseñada bajo Clean Architecture y MVVM, con estrategia Offline-First y gestión de estados asíncronos.",

  longDescription: `Todo desarrollador Android pasa por una fase donde mete todo el código en la 'MainActivity'. Yo quería graduarme de esa etapa. Este proyecto nació de mi intención deliberada de dominar la ingeniería de software móvil moderna. Usé la API de Minecraft como excusa, pero mi verdadero objetivo era implementar una arquitectura que soportara escalabilidad real, no solo "que funcionara".

  Me obsesioné con el desacoplamiento. Implementé Clean Architecture estricta, utilizando Dagger Hilt para la inyección de dependencias y asegurándome de que la UI no supiera nada de dónde vienen los datos. Para la red, orquesté Retrofit con Corrutinas de Kotlin, evitando bloquear el hilo principal (Main Thread) y garantizando una experiencia de usuario (UX) sedosa, incluso con conexiones inestables.

  Lo más gratificante fue implementar la persistencia local con Room. Logré que la aplicación fuera "Offline-First", permitiendo a los usuarios acceder a sus recursos guardados sin internet. Hoy, este repositorio no es solo una app de skins; es mi plantilla de referencia ('blueprint') sobre cómo se debe estructurar una aplicación Android profesional, modular y testeable.`,

  image: "/images/projects/minecraft-repository/screenshot-home.webp",
  video: "/videos/projects/minecraft-repository/demo-minecraft-repository.webm",
  isVertical: true,

  tags: [
    "Kotlin",
    "Android SDK",
    "MVVM",
    "Clean Architecture",
    "Dagger Hilt",
    "Coroutines & Flow",
    "Room Database",
    "Retrofit",
  ],

  category: "Mobile",
  role: "Android Engineer",
  year: "2023",
  status: "En Producción",

  featured: true,
  hasCaseStudy: true,

  links: {
    repo: "https://github.com/Envigite/MinecraftRepository",
  },

  challenges: [
    "Evitar los 'ANR' (Application Not Responding) gestionando operaciones pesadas de I/O en hilos secundarios mediante Dispatchers de Corrutinas.",
    "Implementar el patrón Repository para actuar como una única fuente de verdad, arbitrando entre la API remota y la base de datos local (Room).",
    "Configurar Dagger Hilt para inyectar dependencias de red y base de datos, eliminando el acoplamiento fuerte entre componentes.",
    "Manejar eficientemente el ciclo de vida de Android para prevenir fugas de memoria (Memory Leaks) al rotar la pantalla o cambiar de contexto.",
    "Optimizar el rendimiento del RecyclerView utilizando DiffUtil para renderizar solo los elementos que cambiaron en la lista."
  ],

  features: [
    "Arquitectura MVVM (Model-View-ViewModel) robusta",
    "Sincronización de datos en tiempo real (REST API)",
    "Persistencia de datos local (Offline mode) con Room",
    "Inyección de Dependencias escalable con Dagger Hilt",
    "Gestión asíncrona segura con Kotlin Coroutines",
    "UI Adaptativa con ConstraintLayout y Material Design",
    "Manejo de estados de carga y error en la UI"
  ],

  screenshots: [
    "/images/projects/minecraft-repository/screenshot-home.webp",
    "/images/projects/minecraft-repository/screenshot-search.webp",
    "/images/projects/minecraft-repository/screenshot-api.webp",
    "/images/projects/minecraft-repository/screenshot-room.webp",
    "/images/projects/minecraft-repository/screenshot-room-load.webp",
    "/images/projects/minecraft-repository/screenshot-room-search.webp",
  ],

  architecture: [
    {
      title: "Clean Architecture",
      desc: "Separación estricta en capas (Data, Domain, Presentation) para que la lógica de negocio sea independiente del framework de Android."
    },
    {
      title: "Repository Pattern",
      desc: "Abstracción de las fuentes de datos. El ViewModel solicita datos al Repositorio sin importarle si vienen de la nube (Retrofit) o del disco (Room)."
    },
    {
      title: "Dependency Injection",
      desc: "Uso de Dagger Hilt para proveer instancias singleton de la base de datos y clientes de red, facilitando el testing y la modularidad."
    }
  ]
  },
  {/* <--- LABORATORIO ANIMACIONES ---> */
  slug: 'animaciones-lab',
  title: "UI Design System & Animations Lab",
  description: "Biblioteca viva de componentes reutilizables y playground de micro-interacciones experimental.",

  longDescription: `Todo desarrollador Senior sabe que reescribir el mismo botón o animación en cada proyecto es un error de eficiencia. Este laboratorio nació de mi necesidad de centralizar y estandarizar mi lenguaje de diseño. Quería un espacio aislado ("sandbox") donde pudiera romper cosas, experimentar con físicas de animación complejas y perfeccionar la accesibilidad sin el riesgo de afectar la producción de una aplicación completa.

  Ingenierilmente, lo construí como un sistema de documentación vivo. No son solo "divs" bonitos; implementé un patrón de arquitectura que expone simultáneamente el componente renderizado y su código fuente (Source Code View). Utilicé Tailwind CSS para la atomicidad de los estilos y Framer Motion para gestionar orquestaciones complejas de estado, asegurando que cada componente sea agnóstico y totalmente portable a cualquier otro proyecto de mi ecosistema.

  El resultado es mi propio "acelerador de desarrollo". Lo que ves aquí no son solo experimentos; son piezas de LEGO pre-validadas listas para ensamblar. Este laboratorio reduce drásticamente mis tiempos de desarrollo futuros, permitiéndome copiar, pegar y adaptar soluciones de UI complejas con la confianza de que ya han sido probadas y optimizadas.`,

  image: "/images/projects/animaciones-lab/screenshot-home.webp",
  video: "/videos/projects/animaciones-lab/demo-animaciones-lab.webm",

  tags: [
    "React",
    "Framer Motion",
    "Tailwind CSS",
    "Design Systems",
    "Component Driven Dev",
    "UI Engineering",
    "DX"
  ],

  category: "Creative",
  role: "UI Engineer & Designer",
  year: "2025",
  status: "En Proceso",

  hasCaseStudy: true,

  links: {
    demo: "/demos/animaciones"
  },

  challenges: [
    "Diseñar componentes totalmente desacoplados que funcionen aislados del contexto global de la aplicación.",
    "Implementar un sistema de 'Live Preview' que sincronice la vista del componente con su representación en código crudo.",
    "Gestionar la complejidad de animaciones basadas en física (Framer Motion) asegurando 60 FPS constantes.",
    "Crear abstracciones de Tailwind CSS para evitar la repetición de clases utilitarias (DRY) sin perder flexibilidad.",
    "Estandarizar la API (props) de los componentes para que sean intuitivos de usar en el futuro."
  ],

  features: [
    "Playground interactivo de componentes UI",
    "Visualizador de código fuente en tiempo real (Syntax Highlighting)",
    "Botones 'Copy-to-Clipboard' para integración rápida",
    "Animaciones gestuales avanzadas (Drag, Hover, Tap)",
    "Componentes modulares agnósticos al contexto",
    "Galería de patrones de diseño experimental",
  ],

  screenshots: [
    "/images/projects/animaciones-lab/screenshot-home.webp",
    "/images/projects/animaciones-lab/screenshot-code.webp",
    "/images/projects/animaciones-lab/screenshot-example.webp",
  ],

  architecture: [
    {
      title: "Component-Driven Development",
      desc: "Desarrollo de interfaces desde lo más pequeño (átomos) hacia lo complejo, asegurando aislamiento y testabilidad."
    },
    {
      title: "Atomicidad de Estilos",
      desc: "Uso de Tailwind CSS para crear un sistema de diseño predecible y fácil de mantener, evitando conflictos de CSS global."
    },
    {
      title: "Render Props & Composition",
      desc: "Patrones de React avanzados para crear componentes contenedores que manejan la lógica de presentación del código y la demo."
    }
  ]
  },
  {/* <--- MINECRAFT SERVER ---> */
  slug: 'minecraft-server',
  title: "Minecraft Server Hub",
  description: "Dashboard de onboarding para jugadores, gamificado con estética Pixel Art y micro-interacciones inmersivas.",

  longDescription: `Gestionar un servidor privado para amigos y familia conlleva un problema logístico recurrente: el soporte técnico. Me cansé de enviar la IP, la lista de mods y las instrucciones de instalación por WhatsApp cada vez que alguien quería unirse. Decidí solucionar esto creando un "Hub" centralizado que no solo fuera informativo, sino que extendiera la experiencia de juego al navegador.

  Técnicamente, el reto no era la complejidad lógica, sino la fidelidad estética y la "sensación de juego" (Game Feel). Aproveché la flexibilidad de Tailwind CSS para recrear la interfaz de usuario de Minecraft (bordes nítidos, sombras duras, paleta de colores específica) sin depender de imágenes pesadas. Utilicé Framer Motion para orquestar la entrada de elementos y gestionar las micro-interacciones, haciendo que los botones se sientan "clicky" y receptivos, imitando la respuesta del menú del juego real.

  El resultado es una Single Page Application (SPA) dentro de mi portafolio que eliminó la fricción de entrada para nuevos jugadores. Integra la API del portapapeles para copiar la IP con un solo toque y guía al usuario paso a paso en la instalación de Fabric. Es un ejemplo de cómo una UI temática bien ejecutada puede transformar una página de instrucciones aburrida en una experiencia memorable.`,

  image: "/images/projects/minecraft-server/screenshot-home.webp",
  video: "/videos/projects/minecraft-server/demo-minecraft-server.webm",

  tags: [
    "Next.js (Client Components)",
    "Framer Motion",
    "Tailwind CSS",
    "Gamification",
    "UX Design",
    "Lucide React"
  ],

  category: "Creative",
  role: "Frontend Designer",
  year: "2025",
  status: "En Producción",

  featured: false,
  hasCaseStudy: true,

  links: {
    demo: "/demos/minecraft-server"
  },

  challenges: [
    "Replicar fielmente la estética 'Blocky' y Pixel Art de Minecraft utilizando exclusivamente CSS moderno (Borders y Box Shadows) para mantener el rendimiento.",
    "Orquestar animaciones de entrada escalonadas (Staggered Animation) con Framer Motion para dar una sensación cinematográfica al cargar.",
    "Implementar una UX robusta para la copia de IP (Clipboard API) con feedback visual inmediato y manejo de errores.",
    "Asegurar la legibilidad de fuentes 'Pixel' (Press Start 2P) en diferentes resoluciones y dispositivos móviles.",
    "Integrar video de fondo en loop sin afectar la métrica de 'First Contentful Paint' ni el rendimiento del scroll."
  ],

  features: [
    "Estética inmersiva fiel al videojuego (UI Theming)",
    "Copia de IP 'One-Click' con feedback animado",
    "Micro-interacciones táctiles en botones y tarjetas",
    "Guía de instalación paso a paso integrada",
    "Fondo de video dinámico optimizado",
    "Tipografía customizada (Google Fonts) para inmersión total",
    "Diseño totalmente responsivo (Mobile-First)"
  ],

  screenshots: [
    "/images/projects/minecraft-server/screenshot-home.webp",
  ],

  architecture: [
    {
      title: "Interactive Client Components",
      desc: "Uso de la directiva 'use client' de Next.js para habilitar interactividad avanzada (Hooks, Browser APIs) manteniendo una carga inicial rápida."
    },
    {
      title: "Utility-First Theming",
      desc: "Construcción de un sistema de diseño ad-hoc usando clases de utilidad de Tailwind para bordes complejos y sombras sólidas (Hard Shadows)."
    },
    {
      title: "Motion Orchestration",
      desc: "Uso de variantes de Framer Motion para sincronizar la aparición de elementos UI con la carga del video de fondo."
    }
  ]
}
];