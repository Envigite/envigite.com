'use client';

import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { CalendarRange, Table } from 'lucide-react';

import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';
import { RECEPTION_DATES } from '@/projects/cierre-temporada/data/reception-dates';
import ComparativaTurnos from './ComparativaTurnos';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface ResumenMensualProps {
  visible: boolean;
}

interface ResumenDataEntry {
  key: string;
  recepciones: number;
  kRec: number;
  kDes: number;
  kLav: number;
  fechaRef: Date;
}

const ResumenMensual = ({ visible }: ResumenMensualProps) => {
  const [vistaActual, setVistaActual] = useState<'mes' | 'semana'>('mes');
  const [filtroProductor, setFiltroProductor] = useState<string>('todos');
  const [mostrarComparativaTurnos, setMostrarComparativaTurnos] =
    useState<boolean>(false);

  const productores = useMemo(() => {
    const unicos = Array.from(new Set(RECEPTION_DATES.map((r) => r.productor)));
    return ['todos', ...unicos];
  }, []);

  const resumenData = useMemo(() => {
    const totalEsperadoRecepcionado = 542277;
    const fechaInicioDespezonado = new Date('2025-02-22');

    let processedData = RECEPTION_DATES.map((entry) => {
      const numRecepcion = parseInt(entry.recepcion.replace('R-', ''), 10);
      const datosProductor = SEASON_DATA.recepciones.find(
        (r) => r.productor === entry.productor
      );

      let kilosRecepcionados = 0;
      let kilosDespezonados = 0;
      let kilosLavados = 0;

      if (datosProductor) {
        const totalRecs =
          SEASON_DATA.datosProductores[entry.productor]?.recepciones || 1;
        kilosRecepcionados = datosProductor.kilosRecepcionados / totalRecs;
        kilosLavados = datosProductor.kilosLavados / totalRecs;

        const fechaObj = new Date(entry.fecha);
        if (fechaObj >= fechaInicioDespezonado) {
          const recsConDesp = RECEPTION_DATES.filter(
            (r) =>
              r.productor === entry.productor &&
              new Date(r.fecha) >= fechaInicioDespezonado
          ).length;

          if (entry.productor === 'Agricola Frut JH SPA') {
            if (numRecepcion >= 27)
              kilosDespezonados =
                datosProductor.kilosDespezonados / (recsConDesp || 1);
          } else if (datosProductor.kilosDespezonados > 0) {
            kilosDespezonados =
              datosProductor.kilosDespezonados / (recsConDesp || 1);
          }
        }
      }

      return {
        ...entry,
        fechaObj: new Date(entry.fecha),
        kilosRecepcionados,
        kilosDespezonados,
        kilosLavados,
      };
    });

    const currentTotal = processedData.reduce(
      (acc, curr) => acc + curr.kilosRecepcionados,
      0
    );
    const factor =
      currentTotal > 0 ? totalEsperadoRecepcionado / currentTotal : 1;

    processedData = processedData.map((d) => ({
      ...d,
      kilosRecepcionados: d.kilosRecepcionados * factor,
      kilosDespezonados: d.kilosDespezonados * factor,
      kilosLavados: d.kilosLavados * factor,
    }));

    const filtered =
      filtroProductor === 'todos'
        ? processedData
        : processedData.filter((d) => d.productor === filtroProductor);

    const grouped = filtered.reduce(
      (acc: Record<string, ResumenDataEntry>, item) => {
        let key = '';
        if (vistaActual === 'mes') {
          key = item.fechaObj.toLocaleString('es', {
            month: 'long',
            year: 'numeric',
          });
        } else {
          const date = new Date(item.fechaObj);
          date.setDate(date.getDate() - (date.getDay() || 7) + 1);
          key = `Semana ${date.getDate()}/${date.getMonth() + 1}`;
        }

        if (!acc[key]) {
          acc[key] = {
            key,
            recepciones: 0,
            kRec: 0,
            kDes: 0,
            kLav: 0,
            fechaRef: item.fechaObj,
          };
        }

        acc[key].recepciones += 1;
        acc[key].kRec += item.kilosRecepcionados;
        acc[key].kDes += item.kilosDespezonados;
        acc[key].kLav += item.kilosLavados;

        return acc;
      },
      {}
    );

    return Object.values(grouped).sort(
      (a: ResumenDataEntry, b: ResumenDataEntry) =>
        a.fechaRef.getTime() - b.fechaRef.getTime()
    );
  }, [filtroProductor, vistaActual]);

  const chartData = {
    labels: resumenData.map((d) => d.key),
    datasets: [
      {
        label: 'Recepción',
        data: resumenData.map((d) => d.kRec),
        backgroundColor: '#2dd4bf',
        borderRadius: 4,
      },
      {
        label: 'Despezonado',
        data: resumenData.map((d) => d.kDes),
        backgroundColor: '#60a5fa',
        borderRadius: 4,
      },
      {
        label: 'Lavado',
        data: resumenData.map((d) => d.kLav),
        backgroundColor: '#f87171',
        borderRadius: 4,
      },
    ],
  };

  const formatNum = (n: number) => Math.round(n).toLocaleString('es-CL');

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
    >
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <CalendarRange className="h-5 w-5 text-blue-600" />
          Resumen Temporal
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() =>
              setMostrarComparativaTurnos(!mostrarComparativaTurnos)
            }
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              mostrarComparativaTurnos
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ver Turnos
          </button>

          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setVistaActual('mes')}
              className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                vistaActual === 'mes'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              MES
            </button>
            <button
              onClick={() => setVistaActual('semana')}
              className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                vistaActual === 'semana'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              SEMANA
            </button>
          </div>

          <select
            value={filtroProductor}
            onChange={(e) => setFiltroProductor(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {productores.map((p) => (
              <option key={p} value={p}>
                {p === 'todos' ? 'Todos los Productores' : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ComparativaTurnos visible={mostrarComparativaTurnos} />

      <div className="mt-6 h-80 w-full rounded-xl border border-gray-100 bg-linear-to-b from-gray-50/50 to-white p-4">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
              x: { grid: { display: false } },
            },
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                labels: { boxWidth: 10, usePointStyle: true },
              },
            },
          }}
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-6 py-3">
          <Table className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-bold text-gray-600 uppercase">
            Detalle Numérico
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Periodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Recep.
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-teal-600 uppercase">
                  K. Recep
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase">
                  K. Desp
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase">
                  K. Lav
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Rend.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {resumenData.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-gray-50/80">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                    {row.key}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {row.recepciones}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {formatNum(row.kRec)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatNum(row.kDes)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatNum(row.kLav)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {row.kRec > 0
                        ? Math.round((row.kLav / row.kRec) * 100)
                        : 0}
                      %
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumenMensual;
