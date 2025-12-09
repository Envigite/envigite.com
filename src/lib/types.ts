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

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  video?: string | null;
  isVertical?: boolean;     // Opcional: Para videos de móvil
  
  tags: string[];
  category?: string;
  featured?: boolean;       // Si sale en la Sección FeaturedProjects de la Home
  hasCaseStudy?: boolean;   // Si tiene página de detalle
  
  links: {
    repo: string;
    demo?: string | null;
  };
  
  challenges?: string[];
  features?: string[];
  
screenshots?: string[]; // Múltiples imágenes
}