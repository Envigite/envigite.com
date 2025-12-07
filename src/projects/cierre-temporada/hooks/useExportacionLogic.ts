import { useMemo, useState } from 'react';
import { EXPORT_DATA } from '@/projects/cierre-temporada/data/exports';

export const useExportacionLogic = () => {
  const [selectedId, setSelectedId] = useState<number | 'resumen'>(1);

  const summaryMetrics = useMemo(() => {
    return {
      totalExportaciones: EXPORT_DATA.length,
      totalCajas: EXPORT_DATA.reduce((acc, curr) => acc + curr.numeroCajas, 0),
      totalPeso: EXPORT_DATA.reduce((acc, curr) => acc + curr.peso, 0),
      productosUnicos: Array.from(new Set(
        EXPORT_DATA.flatMap(exp => Object.keys(exp.productos))
      ))
    };
  }, []);

  const currentExport = useMemo(() => {
    if (selectedId === 'resumen') return null;
    return EXPORT_DATA.find(e => e.id === selectedId) || EXPORT_DATA[0];
  }, [selectedId]);

  const chartsData = useMemo(() => {
    if (!currentExport) return null;

    const hasDistribucion = Object.keys(currentExport.distribuciones).length > 0;
    const doughnutData = {
      labels: Object.keys(currentExport.distribuciones),
      datasets: [{
        data: Object.values(currentExport.distribuciones),
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"], 
        borderWidth: 0,
        hoverOffset: 10
      }]
    };

    const labels: string[] = []; 

    const allBoxTypes = new Set<string>();
    Object.values(currentExport.productos).forEach(types => {
      Object.keys(types).forEach(t => {
        if (t !== 'Total') allBoxTypes.add(t);
      });
    });
    
    if (allBoxTypes.size === 0) {
       Object.keys(currentExport.productos).forEach(p => labels.push(p));
    } else {
       labels.push(...Array.from(allBoxTypes));
    }

    // Construir datasets
    const colors: Record<string, string> = {
      'Frutilla': '#ef4444',
      'Mix Berries': '#6366f1',
      'Pulpa Frutilla': '#14b8a6'
    };

    const barDatasets = Object.entries(currentExport.productos).map(([productName, types]) => {
      return {
        label: productName,
        data: labels.map(label => {
            if (allBoxTypes.size === 0 && label === productName) return types.Total;
            return types[label] || 0;
        }),
        backgroundColor: colors[productName] || '#94a3b8',
        borderRadius: 4,
      };
    });

    return {
      hasDistribucion,
      doughnutData,
      barData: {
        labels,
        datasets: barDatasets
      }
    };
  }, [currentExport]);

  return {
    selectedId,
    setSelectedId,
    summaryMetrics,
    currentExport,
    chartsData,
    exportList: EXPORT_DATA
  };
};