import { useMemo } from 'react';
import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';
import { getDashboardMetrics } from '@/projects/cierre-temporada/lib/metrics';

export const useProductosLogic = () => {
  const globalMetrics = useMemo(() => getDashboardMetrics(), []);
  const { productos } = SEASON_DATA;

  const productList = useMemo(() => [
    {
      id: 'frutilla',
      label: 'Frutilla',
      palets: productos.frutilla.palets,
      peso: productos.frutilla.peso,
      percentage: globalMetrics.porcentajes.frutilla,
      color: 'red',
      colorHex: '#ef4444'
    },
    {
      id: 'mix',
      label: 'Mix Berries',
      palets: productos.mixBerries.palets,
      peso: productos.mixBerries.peso,
      percentage: globalMetrics.porcentajes.mixBerries,
      color: 'indigo', 
      colorHex: '#6366f1' 
    },
    {
      id: 'pulpa',
      label: 'Pulpa Frutilla',
      palets: productos.pulpaFrutilla.palets,
      peso: productos.pulpaFrutilla.peso,
      percentage: globalMetrics.porcentajes.pulpa,
      color: 'teal', 
      colorHex: '#14b8a6' 
    }
  ], [productos, globalMetrics]);

  const totals = {
    peso: globalMetrics.totales.productoFinal,
    palets: globalMetrics.totales.palets
  };

  const chartDataPeso = {
    labels: productList.map(p => p.label),
    datasets: [{
      data: productList.map(p => p.peso),
      backgroundColor: productList.map(p => p.colorHex),
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const chartDataPalets = {
    labels: productList.map(p => p.label),
    datasets: [{
      label: 'Palets',
      data: productList.map(p => p.palets),
      backgroundColor: productList.map(p => p.colorHex),
      borderRadius: 6,
      barThickness: 40,
    }]
  };

  return {
    productList,
    totals,
    chartDataPeso,
    chartDataPalets
  };
};