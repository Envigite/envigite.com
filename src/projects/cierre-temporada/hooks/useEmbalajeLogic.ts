import { useMemo, useState } from 'react';
import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';
import { getDashboardMetrics } from '@/projects/cierre-temporada/lib/metrics';

export const useEmbalajeLogic = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'distribucion'>('general');
  
  const globalMetrics = useMemo(() => getDashboardMetrics(), []);
  const { embalaje } = SEASON_DATA;

  const stats = useMemo(() => {
    const totalPeso = 
      embalaje.pesoTotalTotes + 
      embalaje.pesoTotalCajas + 
      embalaje.totalesCongelados.pesoIQFPendientes;

    const totalPalets = 
      embalaje.totalTotes + 
      embalaje.totalPaletsCajas + 
      embalaje.totalesCongelados.paletsIQFPendientes;

    const totalLavado = globalMetrics.totales.lavado;
    const porcentajeCuadratura = totalLavado > 0 ? (totalPeso / totalLavado) * 100 : 0;

    return {
      totalPeso,
      totalPalets,
      totalLavado,
      porcentajeCuadratura,
      percTotes: (embalaje.pesoTotalTotes / totalPeso) * 100,
      percCajas: (embalaje.pesoTotalCajas / totalPeso) * 100,
      percIQF: (embalaje.totalesCongelados.pesoIQFPendientes / totalPeso) * 100
    };
  }, [embalaje, globalMetrics]);

  const chartDataPalets = {
    labels: ["Totes", "Cajas", "IQF Pendiente"],
    datasets: [
      {
        label: "Cantidad de Palets",
        data: [
          embalaje.totalTotes,
          embalaje.totalPaletsCajas,
          embalaje.totalesCongelados.paletsIQFPendientes
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", 
          "rgba(59, 130, 246, 0.8)", 
          "rgba(168, 85, 247, 0.8)",
        ],
        borderRadius: 8,
        borderSkipped: false as const,
      },
    ],
  };

  const chartDataPeso = {
    labels: ["Totes", "Cajas", "IQF Pendiente"],
    datasets: [
      {
        data: [
          embalaje.pesoTotalTotes,
          embalaje.pesoTotalCajas,
          embalaje.totalesCongelados.pesoIQFPendientes
        ],
        backgroundColor: [
          "#10b981", 
          "#3b82f6", 
          "#a855f7", 
        ],
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  };

  return {
    state: { activeTab },
    actions: { setActiveTab },
    data: {
      stats,
      chartDataPalets,
      chartDataPeso,
      embalajeRaw: embalaje 
    }
  };
};