'use client';

import {
  BarChart2,
  Filter,
  Calendar,
  BarChart,
  Info,
  Droplets,
  Trash2,
  CheckCircle,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

import { useRecepcionesLogic } from '@/projects/cierre-temporada/hooks/useRecepcionesLogic';
import { formatNumber } from '@/projects/cierre-temporada/lib/metrics';
import ReceptionCalendar from './recepciones/ReceptionCalendar';
import ResumenMensual from './recepciones/ResumenMensual';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  colorClass: string;
  icon?: LucideIcon;
  delay?: number;
}

const MetricCard = ({
  title,
  value,
  subtext,
  colorClass,
  icon: Icon,
  delay = 0,
}: MetricCardProps) => (
  <motion.div
    className={`rounded-2xl p-6 text-white shadow-lg ${colorClass} relative overflow-hidden`}
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold tracking-wider uppercase opacity-90">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight">{value}</h3>
        <p className="mt-1 inline-block rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium opacity-90 backdrop-blur-sm">
          {subtext}
        </p>
      </div>
      {Icon && (
        <div className="rounded-xl bg-white/20 p-3 shadow-inner backdrop-blur-md">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  </motion.div>
);

export default function Recepciones() {
  const { state, actions, data } = useRecepcionesLogic();
  const { metricas, porcentajes } = data;

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Despezonado y Lavado
          </h2>
          <p className="text-lg text-gray-500">
            Gestión operativa por productor
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-4 w-4 text-blue-500" />
            </div>
            <select
              value={state.productorSeleccionado}
              onChange={(e) => actions.setProductorSeleccionado(e.target.value)}
              className="min-w-[200px] cursor-pointer appearance-none rounded-xl border-none bg-gray-50 py-2.5 pr-10 pl-10 text-sm font-semibold text-gray-700 transition-all outline-none hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
            >
              {data.productores.map((p) => (
                <option key={p} value={p}>
                  {p === 'todos' ? 'Todos los Productores' : p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>

          <div className="mx-1 h-8 w-px bg-gray-200" />

          <button
            onClick={() => actions.setMostrarFechas(true)}
            className="rounded-xl p-2.5 text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600"
            title="Ver calendario"
          >
            <Calendar className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              actions.setMostrarResumenMensual(!state.mostrarResumenMensual)
            }
            className={`rounded-xl p-2.5 transition-all ${
              state.mostrarResumenMensual
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
            }`}
            title="Ver resumen mensual"
          >
            <BarChart className="h-5 w-5" />
          </button>
        </motion.div>
      </div>

      <motion.div
        className="flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="rounded-lg bg-amber-100 p-2">
          <Info className="h-5 w-5 text-amber-600" />
        </div>
        <div className="pt-1 text-sm text-amber-800">
          <span className="mb-1 block font-bold">
            Datos Excluidos del Cálculo:
          </span>
          <span className="opacity-90">
            Recepciones 1-4 de L. Carrasco (10.111 Kg) por deterioro total y
            Recepción R-23 (6.202 Kg) por devolución al productor.
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Kilos Recepcionados"
          value={`${formatNumber(metricas.kilosRecepcionados)} kg`}
          subtext={`${data.recepcionesFiltradas.length} lotes procesados`}
          colorClass="bg-gradient-to-br from-emerald-500 to-teal-600"
          icon={CheckCircle}
          delay={0.1}
        />
        <MetricCard
          title="Kilos Despezonados"
          value={`${formatNumber(metricas.kilosDespezonados)} kg`}
          subtext={`Rendimiento: ${porcentajes.rendimientoDespezonado.toFixed(
            1
          )}%`}
          colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          icon={BarChart2}
          delay={0.2}
        />
        <MetricCard
          title="Kilos Lavados"
          value={`${formatNumber(metricas.kilosLavados)} kg`}
          subtext={`Rendimiento: ${porcentajes.rendimientoLavado.toFixed(1)}%`}
          colorClass="bg-gradient-to-br from-purple-500 to-violet-600"
          icon={Droplets}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="h-8 w-2 rounded-full bg-blue-500"></span>
              Volumen por Productor
            </h3>
          </div>
          <div className="h-80">
            <Bar
              data={data.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end',
                    labels: { usePointStyle: true, boxWidth: 8 },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    border: { display: false },
                    grid: { color: '#f3f4f6' },
                    ticks: {
                      font: { size: 11 },
                      color: '#9ca3af',
                      callback: (val) => formatNumber(Number(val)),
                    },
                  },
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                      font: { size: 11, weight: 'bold' },
                      color: '#4b5563',
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-amber-400" />
            <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="rounded-lg bg-amber-100 p-2">
                <Droplets className="h-5 w-5 text-amber-600" />
              </div>
              Recuperación de Jugo
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <p className="mb-1 text-xs font-bold tracking-wide text-amber-600 uppercase">
                  Despezonado
                </p>
                <p className="text-xl font-black text-amber-800">
                  {formatNumber(metricas.mermaDespezonado.jugo)}{' '}
                  <span className="text-xs font-medium">kg</span>
                </p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <p className="mb-1 text-xs font-bold tracking-wide text-amber-600 uppercase">
                  Lavado
                </p>
                <p className="text-xl font-black text-amber-800">
                  {formatNumber(metricas.mermaLavado.jugo)}{' '}
                  <span className="text-xs font-medium">kg</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-amber-100 pt-4">
              <span className="text-sm font-medium text-gray-500">
                Total Recuperado
              </span>
              <span className="text-2xl font-black text-amber-600">
                {formatNumber(metricas.totalKilosJugo)} kg
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-red-100 bg-white p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-red-500" />
            <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="rounded-lg bg-red-100 p-2">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              Mermas y Desechos
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
                <p className="mb-1 text-xs font-bold tracking-wide text-red-600 uppercase">
                  Hoja / Desecho
                </p>
                <p className="text-xl font-black text-red-800">
                  {formatNumber(
                    metricas.mermaDespezonado.hoja +
                      metricas.mermaDespezonado.desecho
                  )}{' '}
                  <span className="text-xs font-medium">kg</span>
                </p>
              </div>
              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
                <p className="mb-1 text-xs font-bold tracking-wide text-red-600 uppercase">
                  Hongo / Desecho
                </p>
                <p className="text-xl font-black text-red-800">
                  {formatNumber(
                    metricas.mermaLavado.hongo + metricas.mermaLavado.desecho
                  )}{' '}
                  <span className="text-xs font-medium">kg</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-red-100 pt-4">
              <span className="text-sm font-medium text-gray-500">
                Pérdida Total
              </span>
              <span className="text-2xl font-black text-red-600">
                {formatNumber(metricas.totalKilosMerma)} kg
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {state.mostrarResumenMensual && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ResumenMensual visible={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.mostrarFechas && (
          <ReceptionCalendar onClose={() => actions.setMostrarFechas(false)} />
        )}
      </AnimatePresence>

      {state.mostrarDetalles && (
        <motion.div
          className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-8 py-6">
            <h3 className="text-lg font-bold text-gray-800">
              Detalle de Lotes
            </h3>
            <button
              onClick={() => actions.setMostrarDetalles(false)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Ocultar Tabla
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white">
                <tr className="border-b border-gray-100 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                  <th className="px-8 py-4">Nº</th>
                  <th className="px-4 py-4">Productor</th>
                  <th className="px-4 py-4 text-right text-emerald-600">
                    Recepción
                  </th>
                  <th className="px-4 py-4 text-right text-blue-600">
                    Despezonado
                  </th>
                  <th className="px-4 py-4 text-right text-purple-600">
                    Lavado
                  </th>
                  <th className="px-8 py-4 text-right">Rend. Final</th>
                </tr>
              </thead>
              <motion.tbody
                className="divide-y divide-gray-50"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {data.recepcionesFiltradas.map((r) => {
                  const rend =
                    r.kilosRecepcionados > 0
                      ? ((r.kilosLavados +
                          r.mermaDespezonado.jugo +
                          r.mermaLavado.jugo +
                          r.mermaLavado.frutaMalDespezonada +
                          (r.kilosNoLavados || 0)) /
                          r.kilosRecepcionados) *
                        100
                      : 0;

                  return (
                    <motion.tr
                      key={r.numero}
                      variants={itemVariants}
                      className="group transition-colors hover:bg-gray-50/80"
                    >
                      <td className="px-8 py-4 text-sm font-bold text-gray-800">
                        R-{r.numero}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-700">
                        {r.productor}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-sm text-gray-600">
                        {formatNumber(r.kilosRecepcionados)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-sm text-gray-600">
                        {formatNumber(r.kilosDespezonados)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-sm text-gray-600">
                        {formatNumber(r.kilosLavados)}
                      </td>
                      <td className="px-8 py-4 text-right text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            rend >= 85
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {rend.toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      )}

      {!state.mostrarDetalles && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => actions.setMostrarDetalles(true)}
            className="group flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-blue-600"
          >
            <span className="text-sm font-medium">
              Ver Detalle Completo de Lotes
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-blue-500" />
          </button>
        </div>
      )}
    </div>
  );
}
