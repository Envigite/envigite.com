'use client';

import { useMemo } from 'react';
import {
  Ship,
  Calendar,
  Box,
  Scale,
  Package,
  Container,
  LucideIcon,
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

import { useExportacionLogic } from '@/projects/cierre-temporada/hooks/useExportacionLogic';
import { formatNumber } from '@/projects/cierre-temporada/lib/metrics';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  delay: number;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  delay,
}: MetricCardProps) => (
  <motion.div
    className={`rounded-2xl p-6 text-white shadow-lg ${colorClass} relative overflow-hidden`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -5 }}
  >
    <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold tracking-wider uppercase opacity-80">
          {title}
        </p>
        <h3 className="mt-1 text-3xl font-black tracking-tight">{value}</h3>
      </div>
      <div className="rounded-xl bg-white/20 p-3 shadow-inner backdrop-blur-md">
        <Icon className="h-8 w-8 text-white" />
      </div>
    </div>
  </motion.div>
);

export default function Exportacion() {
  const {
    selectedId,
    setSelectedId,
    summaryMetrics,
    currentExport,
    chartsData,
    exportList,
  } = useExportacionLogic();

  const doughnutOptions: ChartOptions<'doughnut'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, padding: 20 },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: false,
        duration: 2000,
        easing: 'easeOutQuart',
      },
    }),
    []
  );

  const barOptions: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', align: 'end' } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f3f4f6' },
          border: { display: false },
        },
        x: { grid: { display: false }, border: { display: false } },
      },
      animation: { duration: 2000, easing: 'easeOutQuart' },
    }),
    []
  );

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Exportación
        </h2>
        <p className="text-lg text-gray-500">
          Control de despachos y embarques
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {exportList.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setSelectedId(exp.id)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-sm transition-all duration-300 ${
              selectedId === exp.id
                ? 'scale-105 transform bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            } `}
          >
            <Ship className="h-4 w-4" />
            <span>Exportación {exp.numeroExportacion}</span>
          </button>
        ))}
        <button
          onClick={() => setSelectedId('resumen')}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-sm transition-all duration-300 ${
            selectedId === 'resumen'
              ? 'scale-105 transform bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          } `}
        >
          <Container className="h-4 w-4" />
          <span>Resumen General</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {selectedId === 'resumen' ? (
          <motion.div
            key="view-resumen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Envíos"
                value={summaryMetrics.totalExportaciones}
                icon={Ship}
                colorClass="bg-gradient-to-br from-blue-600 to-indigo-700"
                delay={0.1}
              />
              <MetricCard
                title="Total Cajas"
                value={formatNumber(summaryMetrics.totalCajas)}
                icon={Box}
                colorClass="bg-gradient-to-br from-purple-600 to-fuchsia-700"
                delay={0.2}
              />
              <MetricCard
                title="Peso Total"
                value={`${formatNumber(summaryMetrics.totalPeso)} kg`}
                icon={Scale}
                colorClass="bg-gradient-to-br from-teal-500 to-emerald-600"
                delay={0.3}
              />
              <MetricCard
                title="Variedad Productos"
                value={summaryMetrics.productosUnicos.length}
                icon={Package}
                colorClass="bg-gradient-to-br from-red-500 to-orange-600"
                delay={0.4}
              />
            </div>

            <motion.div
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="mb-6 text-xl font-bold text-gray-800">
                Productos Exportados
              </h3>
              <div className="flex flex-wrap gap-4">
                {summaryMetrics.productosUnicos.map((prod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-3"
                  >
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <Package className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-bold text-gray-700">{prod}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          currentExport &&
          chartsData && (
            <motion.div
              key={`view-export-${currentExport.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                      <Ship className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-black tracking-wide text-gray-800 uppercase">
                      Embarque Nº {currentExport.numeroExportacion}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1 text-gray-500 shadow-sm">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-bold">
                      {currentExport.fecha}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-purple-50 p-4 text-purple-600">
                      <Box className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase">
                        Cantidad Despachada
                      </p>
                      <p className="text-3xl font-black text-gray-900">
                        {formatNumber(currentExport.numeroCajas)}{' '}
                        <span className="text-lg text-gray-400">Cajas</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                    <div className="rounded-2xl bg-teal-50 p-4 text-teal-600">
                      <Scale className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase">
                        Peso Neto
                      </p>
                      <p className="text-3xl font-black text-gray-900">
                        {formatNumber(currentExport.peso)}{' '}
                        <span className="text-lg text-gray-400">kg</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {chartsData.hasDistribucion ? (
                  <motion.div
                    className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="mb-6 w-full text-left text-lg font-bold text-gray-800">
                      Distribución por Categoría
                    </h4>
                    <div className="relative h-64 w-64">
                      <Doughnut
                        key={`doughnut-${currentExport.id}`}
                        data={chartsData.doughnutData}
                        options={doughnutOptions}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-100 bg-gray-50 p-8 text-gray-400">
                    <Box className="mb-2 h-10 w-10 opacity-50" />
                    <p>Sin datos de categorías</p>
                  </div>
                )}

                <motion.div
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="mb-6 text-lg font-bold text-gray-800">
                    Detalle de Productos
                  </h4>
                  <div className="h-64 w-full">
                    <Bar
                      key={`bar-${currentExport.id}`}
                      data={chartsData.barData}
                      options={barOptions}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
