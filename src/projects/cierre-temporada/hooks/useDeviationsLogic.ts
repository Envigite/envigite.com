import { useState } from 'react';
import { DEVIATIONS_DATA } from '@/projects/cierre-temporada/data/deviations';

export const useDeviationsLogic = () => {
  const [activeTab, setActiveTab] = useState<'desviaciones' | 'acciones'>('desviaciones');

  const currentList = activeTab === 'desviaciones' 
    ? DEVIATIONS_DATA.desviaciones 
    : DEVIATIONS_DATA.acciones;

  return {
    activeTab,
    setActiveTab,
    currentList
  };
};