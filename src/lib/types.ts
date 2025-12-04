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