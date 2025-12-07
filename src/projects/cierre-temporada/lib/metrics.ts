import { SEASON_DATA } from "@/projects/cierre-temporada/data/season-2024";
import { DashboardMetrics } from "@/projects/cierre-temporada/types/dashboard";

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 0,
  }).format(num);
};

export const getDashboardMetrics = (): DashboardMetrics => {
  const { recepciones, productos, resumenManual, embalaje } = SEASON_DATA;

  const totalKilosRecepcionados = recepciones.reduce((acc, r) => acc + r.kilosRecepcionados, 0);
  const totalKilosDespezonados = recepciones.reduce((acc, r) => acc + r.kilosDespezonados, 0);
  const totalKilosLavados = recepciones.reduce((acc, r) => acc + r.kilosLavados, 0);
  
  const pesoTotalProducto = 
    embalaje.pesoTotalTotes + 
    embalaje.pesoTotalCajas + 
    (embalaje.totalesCongelados.pesoIQFPendientes || 0);

  const totalDesecho = resumenManual?.totalDesecho || 0;
  
  const porcentajeRendimiento = totalKilosRecepcionados > 0 
    ? (pesoTotalProducto / totalKilosRecepcionados) * 100 
    : 0;
  
  const porcentajeFrutilla = pesoTotalProducto > 0 
    ? (productos.frutilla.peso / pesoTotalProducto) * 100 
    : 0;
    
  const porcentajeMixBerries = pesoTotalProducto > 0 
    ? (productos.mixBerries.peso / pesoTotalProducto) * 100 
    : 0;
    
  const porcentajePulpa = pesoTotalProducto > 0 
    ? (productos.pulpaFrutilla.peso / pesoTotalProducto) * 100 
    : 0;

  return {
    totales: {
      recepcionado: totalKilosRecepcionados,
      despezonado: totalKilosDespezonados,
      lavado: totalKilosLavados,
      productoFinal: pesoTotalProducto,
      desecho: totalDesecho,
      palets: embalaje.totalTotes + embalaje.totalPaletsCajas + embalaje.totalesCongelados.paletsIQFPendientes
    },
    porcentajes: {
      rendimiento: porcentajeRendimiento,
      frutilla: porcentajeFrutilla,
      mixBerries: porcentajeMixBerries,
      pulpa: porcentajePulpa,
      desecho: totalKilosRecepcionados > 0 ? (totalDesecho / totalKilosRecepcionados) * 100 : 0
    },
    distribucion: {
      frutilla: productos.frutilla.peso,
      mixBerries: productos.mixBerries.peso,
      pulpa: productos.pulpaFrutilla.peso
    }
  };
};