import { useMemo, useState } from 'react';
import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';

export const useRecepcionesLogic = () => {
  const [productorSeleccionado, setProductorSeleccionado] = useState<string>('todos');
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarFechas, setMostrarFechas] = useState(false);
  const [mostrarResumenMensual, setMostrarResumenMensual] = useState(false);

  const productores = useMemo(() => {
    const unicos = Array.from(new Set(SEASON_DATA.recepciones.map(r => r.productor)));
    return ['todos', ...unicos];
  }, []);

  const recepcionesFiltradas = useMemo(() => {
    if (productorSeleccionado === 'todos') return SEASON_DATA.recepciones;
    return SEASON_DATA.recepciones.filter(r => r.productor === productorSeleccionado);
  }, [productorSeleccionado]);

  const metricas = useMemo(() => {
    const initial = {
      kilosRecepcionados: 0,
      kilosDespezonados: 0,
      kilosLavados: 0,
      kilosNoLavados: 0,
      mermaDespezonado: { hoja: 0, jugo: 0, desecho: 0 },
      mermaLavado: { jugo: 0, hongo: 0, frutaMal: 0, desecho: 0 }
    };

    const acumulado = recepcionesFiltradas.reduce((acc, r) => {
      acc.kilosRecepcionados += r.kilosRecepcionados;
      acc.kilosDespezonados += r.kilosDespezonados;
      acc.kilosLavados += r.kilosLavados;
      acc.kilosNoLavados += (r.kilosNoLavados || 0);
      
      acc.mermaDespezonado.hoja += r.mermaDespezonado.hoja;
      acc.mermaDespezonado.jugo += r.mermaDespezonado.jugo;
      acc.mermaDespezonado.desecho += r.mermaDespezonado.desecho;

      acc.mermaLavado.jugo += r.mermaLavado.jugo;
      acc.mermaLavado.hongo += r.mermaLavado.hongo;
      acc.mermaLavado.frutaMal += r.mermaLavado.frutaMalDespezonada;
      acc.mermaLavado.desecho += r.mermaLavado.desecho;

      return acc;
    }, initial);

    const totalMermaDespezonado = 
      acumulado.mermaDespezonado.hoja + 
      acumulado.mermaDespezonado.jugo + 
      acumulado.mermaDespezonado.desecho;

    const totalMermaLavado = 
      acumulado.mermaLavado.jugo + 
      acumulado.mermaLavado.hongo + 
      acumulado.mermaLavado.frutaMal + 
      acumulado.mermaLavado.desecho;

    return {
      ...acumulado,
      totalKilosRecepcionadosNetos: acumulado.kilosRecepcionados - acumulado.kilosNoLavados,
      totalMermaDespezonado,
      totalMermaLavado,
      totalKilosMerma: totalMermaDespezonado + totalMermaLavado, // Suma simple, ajustar si desecho/hoja no son merma total
      totalKilosJugo: acumulado.mermaDespezonado.jugo + acumulado.mermaLavado.jugo + acumulado.mermaLavado.frutaMal + acumulado.kilosNoLavados
    };
  }, [recepcionesFiltradas]);

  const porcentajes = useMemo(() => {
    const { 
      kilosRecepcionados, 
      kilosDespezonados, 
      kilosLavados, 
      totalKilosJugo,
      mermaDespezonado,
      mermaLavado
    } = metricas;

    if (kilosRecepcionados === 0) return { 
      rendimientoDespezonado: 0, 
      rendimientoLavado: 0, 
      rendimientoTotal: 0, 
      rendimientoConJugo: 0,
      mermaTotal: 0,
      jugoTotal: 0 
    };

    const rendimientoDespezonado = kilosRecepcionados > 0 ? (kilosDespezonados / kilosRecepcionados) * 100 : 0;
    const rendimientoLavado = kilosDespezonados > 0 ? (kilosLavados / kilosDespezonados) * 100 : 0;
    const rendimientoTotal = (kilosLavados / kilosRecepcionados) * 100;
    
    const rendimientoConJugo = ((kilosLavados + totalKilosJugo) / kilosRecepcionados) * 100;

    const totalMermaKg = (mermaDespezonado.hoja + mermaDespezonado.desecho) + (mermaLavado.hongo + mermaLavado.desecho);
    const mermaTotal = (totalMermaKg / kilosRecepcionados) * 100;

    const jugoTotal = (totalKilosJugo / kilosRecepcionados) * 100;

    return {
      rendimientoDespezonado,
      rendimientoLavado,
      rendimientoTotal,
      rendimientoConJugo,
      mermaTotal,
      jugoTotal
    };
  }, [metricas]);

  const chartData = useMemo(() => {
    const dataMap = new Map();
    
    recepcionesFiltradas.forEach(r => {
      if (!dataMap.has(r.productor)) {
        dataMap.set(r.productor, { recepcionado: 0, despezonado: 0, lavado: 0 });
      }
      const current = dataMap.get(r.productor);
      current.recepcionado += r.kilosRecepcionados;
      current.despezonado += r.kilosDespezonados;
      current.lavado += r.kilosLavados;
    });

    const labels = Array.from(dataMap.keys());
    return {
      labels,
      datasets: [
        {
          label: 'Recepcionado',
          data: labels.map(l => dataMap.get(l).recepcionado),
          backgroundColor: '#2dd4bf', // Teal-400
        },
        {
          label: 'Despezonado',
          data: labels.map(l => dataMap.get(l).despezonado),
          backgroundColor: '#60a5fa', // Blue-400
        },
        {
          label: 'Lavado',
          data: labels.map(l => dataMap.get(l).lavado),
          backgroundColor: '#f87171', // Red-400
        }
      ]
    };
  }, [recepcionesFiltradas]);

  return {
    state: { productorSeleccionado, mostrarDetalles, mostrarFechas, mostrarResumenMensual },
    actions: { setProductorSeleccionado, setMostrarDetalles, setMostrarFechas, setMostrarResumenMensual },
    data: { productores, recepcionesFiltradas, metricas, porcentajes, chartData }
  };
};