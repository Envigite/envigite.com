import React from 'react';

export interface ComponentShowcaseProps {
  title: string;
  description: string;
  component: React.ReactNode;
  tsxCode: string;
  cssCode?: string;
  usage?: string;
  usageCode?: string;
  dependencies?: string;
  requiresUtils?: boolean;
}

export interface ComponentItem extends ComponentShowcaseProps {
  id: string;
}

export const VALID_CATEGORIES = ['Full Stack', 'Frontend', 'Mobile', 'Creative'] as const;
export type ProjectCategory = (typeof VALID_CATEGORIES)[number];

export type ProjectStatus = 'En Producción' | 'En Proceso' | 'Mantenimiento';

export interface ArchitecturePoint {
  title: string;
  desc: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  video?: string | null;
  isVertical?: boolean;     // Opcional: Para videos de móvil
  
  tags: string[];
  category: ProjectCategory;

  role?: string;         // Ej: "Full Stack Dev", "Frontend Lead"
  year?: string;         // Ej: "2024", "2025"
  status?: ProjectStatus;

  featured?: boolean;       // Si sale en la Sección FeaturedProjects de la Home
  hasCaseStudy?: boolean;   // Si tiene página de detalle
  
  links: {
    repo?: string | null;
    demo?: string | null;
  };
  
  challenges?: string[];
  features?: string[];
  
  screenshots?: string[];
  architecture?: ArchitecturePoint[];
}