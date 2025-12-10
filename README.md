# 🚀 Envigite.com

<div align="center">

  <h3>
    <a href="https://www.envigite.com/" target="_blank">
      🌐 Ver Demo en Vivo
    </a>
    <span> | </span>
    <a href="https://github.com/Envigite/envigite.com/issues" target="_blank">
      🏸 Reportar un Bug
    </a>
  </h3>

</div>

---

## 💡 ¿Por qué existe este proyecto?

**El Problema:**
Un currículum tradicional en PDF o un perfil de LinkedIn son estáticos; dicen *qué* tecnologías conozco, pero no demuestran **cómo** las implemento ni la calidad de mi trabajo. Necesitaba un espacio donde mi código pudiera hablar por sí mismo, rompiendo la barrera entre "decir que sé programar" y "demostrarlo en vivo".

**Mi Solución:**
Desarrollé este Portafolio como mi cuartel general digital. Es una plataforma centralizada, performante e interactiva que no solo lista mis proyectos, sino que profundiza en la **arquitectura técnica** y los desafíos de ingeniería detrás de cada uno. Es el punto de encuentro donde convergen mi trayectoria, mis habilidades y las vías para contactarme.

**La Motivación (El toque personal):**
Construí esto desde cero porque **amo programar**. Podría haber usado una plantilla, pero elegí diseñar mi propia arquitectura para tener control total sobre el rendimiento y la experiencia de usuario. Este sitio es mi "laboratorio vivo": aquí aplico las mejores prácticas que aprendo día a día (CI/CD, optimización, Clean Code) y demuestro que trato mi marca personal con el mismo rigor profesional que un producto de software empresarial.

---

## 📸 Vistazo Rápido

<div align="center">

  <img src="https://github.com/user-attachments/assets/5056b5d9-6de2-4d25-babd-df95ef002fe2" alt="Demo de la aplicación" width="400px">
  <img src="https://github.com/user-attachments/assets/264abcc4-4f62-4995-a5f2-025753a39787" alt="Demo de la aplicación" width="400px">
  <img src="https://github.com/user-attachments/assets/82ec1190-f802-435d-a74e-c9f9e73924fb" alt="Demo de la aplicación" width="400px">
  <p><em>Una pequeña muestra de la experiencia de usuario.</em></p>
</div>

---

## 🛠️ Ingeniería y Arquitectura: Detrás del Código

Este proyecto no es solo una "cara bonita". Fue construido siguiendo principios de **Ingeniería de Software** para garantizar escalabilidad, mantenibilidad y rendimiento extremo.

### Fase 1: Diseño y Estrategia (Component-Driven) 🧩

No empecé tirando líneas al azar. Adopté una arquitectura basada en componentes:

* **Atomic Design:** Desglosé la interfaz en átomos (botones, iconos), moléculas (tarjetas de proyectos) y organismos (secciones completas).
* **Separación de Intereses (SoC):** La lógica de los datos (`src/config`), la estructura (`src/components`) y los tipos (`src/types`) viven separados. Esto hace que añadir un nuevo proyecto sea tan simple como editar un JSON, sin tocar el código fuente.

### Fase 2: Desarrollo Frontend (Next.js & Motion) 🎨

Aquí el reto fue equilibrar la estética con la velocidad.

1.  **Tipado Estricto (TypeScript):** Cero `any`. Definí interfaces sólidas para Proyectos y Experiencia, asegurando que el código sea autodocumentado y libre de errores en tiempo de ejecución.
2.  **Core Web Vitals:** Optimicé el *Largest Contentful Paint (LCP)* y el *Cumulative Layout Shift (CLS)* usando `next/image`, priorización de carga y gestión eficiente de fuentes.
3.  **Animaciones Declarativas:** Implementé **Framer Motion** para micro-interacciones y transiciones de página, cuidando de usar propiedades aceleradas por hardware para no bloquear el hilo principal (Main Thread).

### Fase 3: Infraestructura y DevOps (AWS) ☁️

Aquí es donde me puse la gorra de **DevOps**. No quería un deploy manual propenso a errores.

* **Infraestructura como Código (Mentalidad):** Configuré un pipeline de **CI/CD con GitHub Actions**.
* **Seguridad Zero Trust:** Implementé autenticación **OIDC (OpenID Connect)** para conectar GitHub con AWS. No hay claves de acceso (`AWS_ACCESS_KEY`) hardcodeadas en el repo, eliminando vectores de ataque.
* **Cloud & CDN:** El sitio vive en **AWS S3** (almacenamiento) y se distribuye globalmente mediante **CloudFront** (CDN), garantizando latencia mínima y caché inteligente en el borde (Edge).

---

## 🧠 Desafíos Técnicos y Soluciones

El camino tuvo obstáculos interesantes. Así los superé:

| El Desafío 🔥 | Cómo lo superé y qué aprendí 💡 |
| :--- | :--- |
| **Animaciones vs. Rendimiento** | Las animaciones complejas solían bajar los FPS en móviles. Aprendí a usar `UseScroll` y `UseTransform` de Framer Motion de manera eficiente, optimizando el árbol de renderizado para mantener 60fps estables incluso en dispositivos de gama media. |
| **Pipeline de Despliegue Seguro** | Quería evitar subir archivos manualmente a S3. Configuré un Workflow de GitHub Actions que detecta cambios en `main`, construye el proyecto (`npm run build`), sincroniza con S3 usando el flag `--delete` para limpieza automática e invalida la caché de CloudFront para reflejar cambios al instante. |

---

## 🧰 Stack Tecnológico

Seleccioné este stack para demostrar dominio del ecosistema moderno de React y Cloud:

**Core & Frontend:**
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Infraestructura & DevOps:**
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=Amazon%20AWS&logoColor=white)

---

## ⚙️ Instalación y Uso Local

¿Quieres ver cómo está construido por dentro? Clona el repo y explora el código limpio:

1.  **Clona el repositorio:**
    ```bash
    git clone git@github.com:Envigite/envigite.com.git
    ```
2.  **Instala las dependencias:**
    ```bash
    cd portfolio
    npm install
    ```
3.  **¡Arranca el entorno de desarrollo!**
    ```bash
    npm run dev
    ```
    > Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4.  **Para probar el build de producción (Simulación AWS):**
    ```bash
    npm run build
    # Esto generará la carpeta 'out' lista para S3
    ```

---

## 👋 Conectemos

Si te gustó este proyecto, tienes feedback, o estás buscando un desarrollador apasionado que no le teme a los desafíos, ¡hablemos!

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/benja-envi)
[![Portfolio](https://img.shields.io/badge/Mi_Portafolio-FF5722?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/Envigite)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:benjacontrerasma@yahoo.com)

</div>

---
<p align="center">Hecho con 💙 y mucho código por Benjamín Contreras.</p>
