import { useMemo } from 'react';
import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';

const PESOS_CATEGORIAS: Record<string, number> = {
  granel: 191592.54,
  bolsas6x5: 9853.64,
  bolsas13x2: 15328.2,
  bolsas14x2: 4581.9,
  bolsas10x1: 930,
};

const LABELS_CATEGORIAS: Record<string, string> = {
  granel: "Granel",
  bolsas6x5: "Bolsas 6 x 5 Lb",
  bolsas13x2: "Bolsas 13 x 2 Lb",
  bolsas14x2: "Bolsas 14 x 2 Lb",
  bolsas10x1: "Bolsas 10 x 1 Kg"
};

const COLORS_CATEGORIAS: Record<string, { bg: string, border: string, text: string, bar: string }> = {
  granel: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', bar: '#ef4444' }, 
  bolsas6x5: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', bar: '#3b82f6' }, 
  bolsas13x2: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', bar: '#f59e0b' }, 
  bolsas14x2: { bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-700', bar: '#14b8a6' }, 
  bolsas10x1: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', bar: '#a855f7' }, 
};

export const useCategoriasLogic = () => {
  const { categorias } = SEASON_DATA;

  const categoryList = useMemo(() => {
    const list = Object.entries(categorias).map(([key, palets]) => {
      const label = LABELS_CATEGORIAS[key] || key;
      const peso = PESOS_CATEGORIAS[key] || 0;
      const theme = COLORS_CATEGORIAS[key] || COLORS_CATEGORIAS.granel;

      return {
        id: key,
        label,
        palets,
        peso,
        theme
      };
    });

    const totalPalets = list.reduce((acc, item) => acc + item.palets, 0);

    return list.map(item => ({
      ...item,
      percentage: totalPalets > 0 ? (item.palets / totalPalets) * 100 : 0
    })).sort((a, b) => b.palets - a.palets);

  }, [categorias]);

  const totals = useMemo(() => {
    const totalPalets = categoryList.reduce((acc, item) => acc + item.palets, 0);
    const totalPeso = categoryList.reduce((acc, item) => acc + item.peso, 0);
    const topCategory = categoryList[0]; 

    return { totalPalets, totalPeso, topCategory };
  }, [categoryList]);

  const chartData = {
    labels: categoryList.map(c => c.label),
    datasets: [{
      label: 'Cantidad de Palets',
      data: categoryList.map(c => c.palets),
      backgroundColor: categoryList.map(c => c.theme.bar),
      borderRadius: 6,
      barThickness: 40,
    }]
  };

  return {
    categoryList,
    totals,
    chartData
  };
};