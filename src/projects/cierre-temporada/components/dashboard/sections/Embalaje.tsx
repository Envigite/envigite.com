'use client';

import {
  Package,
  Box,
  Snowflake,
  Scale,
  ArrowRightLeft,
  Layers,
  CheckCircle2,
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
  ArcElement,
  ChartOptions,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

import { useEmbalajeLogic } from '@/projects/cierre-temporada/hooks/useEmbalajeLogic';
import { formatNumber } from '@/projects/cierre-temporada/lib/metrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DetailCardProps {
  title: string;
  count: number;
  weight: number;
  percentage: number;
  icon: LucideIcon;
  colorTheme: 'emerald' | 'blue' | 'purple';
  delay: number;
}

const DetailCard = ({
  title,
  count,
  weight,
  percentage,
  icon: Icon,
  colorTheme,
  delay,
}: DetailCardProps) => {
  const styles = {
    emerald: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      text: 'text-emerald-900',
      subtext: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      bar: 'bg-emerald-500',
      hover: 'hover:border-emerald-300',
    },
    blue: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
      text: 'text-blue-900',
      subtext: 'text-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      bar: 'bg-blue-500',
      hover: 'hover:border-blue-300',
    },
    purple: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-100',
      text: 'text-purple-900',
      subtext: 'text-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      bar: 'bg-purple-500',
      hover: 'hover:border-purple-300',
    },
  }[colorTheme];

  return (
    <motion.div
      className={`${styles.bg} ${styles.border} ${styles.hover} group relative overflow-hidden rounded-2xl border p-6 transition-colors`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-3 ${styles.iconBg}`}>
          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-bold tracking-wider uppercase ${styles.subtext}`}
          >
            {percentage.toFixed(1)}% Peso
          </span>
        </div>
      </div>

      <h4 className={`text-lg font-bold ${styles.text} mb-1`}>{title}</h4>
      <div className="space-y-1">
        <p className="text-3xl font-black tracking-tight">
          {count} <span className="text-sm font-medium opacity-60">Palets</span>
        </p>
        <p className={`text-sm font-semibold ${styles.subtext}`}>
          {formatNumber(weight)} kg
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
        <motion.div
          className={`h-full ${styles.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default function Embalaje() {
  const { state, actions, data } = useEmbalajeLogic();
  const { stats, chartDataPalets, chartDataPeso, embalajeRaw } = data;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Embalaje y Procesamiento
          </h2>
          <p className="text-lg text-gray-500">Gestión de producto terminado</p>
        </motion.div>

        <motion.div
          className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:gap-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="rounded-lg bg-indigo-50 p-2">
              <Scale className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">
                Peso Total
              </p>
              <p className="text-xl font-black text-gray-800">
                {formatNumber(stats.totalPeso)}
              </p>
            </div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex items-center gap-3 px-2">
            <div className="rounded-lg bg-blue-50 p-2">
              <Layers className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">
                Total Palets
              </p>
              <p className="text-xl font-black text-gray-800">
                {stats.totalPalets}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="my-6 flex justify-center">
        <div className="relative inline-flex rounded-xl bg-gray-100/80 p-1.5">
          <motion.div
            className="absolute top-1.5 bottom-1.5 z-0 rounded-lg bg-white shadow-sm"
            initial={false}
            animate={{
              x: state.activeTab === 'general' ? 0 : '100%',
              width: '50%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          <button
            onClick={() => actions.setActiveTab('general')}
            className={`relative z-10 px-8 py-2 text-sm font-bold transition-colors ${
              state.activeTab === 'general'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => actions.setActiveTab('distribucion')}
            className={`relative z-10 px-8 py-2 text-sm font-bold transition-colors ${
              state.activeTab === 'distribucion'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Distribución
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state.activeTab === 'general' ? (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <DetailCard
                title="Totes"
                count={embalajeRaw.totalTotes}
                weight={embalajeRaw.pesoTotalTotes}
                percentage={stats.percTotes}
                icon={Package}
                colorTheme="emerald"
                delay={0.1}
              />
              <DetailCard
                title="Cajas"
                count={embalajeRaw.totalPaletsCajas}
                weight={embalajeRaw.pesoTotalCajas}
                percentage={stats.percCajas}
                icon={Box}
                colorTheme="blue"
                delay={0.2}
              />
              <DetailCard
                title="IQF Pendiente"
                count={embalajeRaw.totalesCongelados.paletsIQFPendientes}
                weight={embalajeRaw.totalesCongelados.pesoIQFPendientes}
                percentage={stats.percIQF}
                icon={Snowflake}
                colorTheme="purple"
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
                <h3 className="mb-6 text-lg font-bold text-gray-800">
                  Inventario por Tipo (Palets)
                </h3>
                <div className="h-64">
                  <Bar
                    data={chartDataPalets}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                        x: { grid: { display: false } },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 p-8 text-white shadow-xl">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

                <div>
                  <div className="mb-2 flex items-center gap-2 text-blue-300">
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      Cuadratura
                    </span>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold">Validación Kilos</h3>
                  <p className="text-sm text-gray-400">
                    Total Embalado vs Total Lavado
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-gray-300">Lavado (Origen)</span>
                      <span className="font-mono">
                        {formatNumber(stats.totalLavado)}
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold text-white">
                        Embalado (Final)
                      </span>
                      <span className="font-mono font-bold text-green-400">
                        {formatNumber(stats.totalPeso)}
                      </span>
                    </div>

                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
                      <motion.div
                        className={`h-full ${
                          stats.porcentajeCuadratura > 100
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            stats.porcentajeCuadratura,
                            100
                          )}%`,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="mt-2 flex justify-end">
                      <span
                        className={`text-2xl font-black ${
                          stats.porcentajeCuadratura > 98
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {stats.porcentajeCuadratura.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <p className="text-xs leading-relaxed text-gray-300">
                      El proceso mantiene una consistencia del{' '}
                      <strong className="text-white">
                        {stats.porcentajeCuadratura.toFixed(2)}%
                      </strong>{' '}
                      respecto al ingreso de la línea de lavado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="distribucion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-8 self-start text-lg font-bold text-gray-800">
                Distribución por Peso
              </h3>
              <div className="relative h-72 w-72">
                <Doughnut
                  key="doughnut-chart-distribucion"
                  data={chartDataPeso}
                  options={
                    {
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '65%',
                      plugins: { legend: { display: false } },
                      animation: {
                        animateScale: false,
                        animateRotate: true,
                        duration: 2500,
                        easing: 'easeOutQuart',
                      },
                    } as ChartOptions<'doughnut'>
                  }
                />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-gray-800">
                    100%
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Total
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-gray-800">
                Desglose Detallado
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'Totes',
                    val: embalajeRaw.pesoTotalTotes,
                    perc: stats.percTotes,
                    color: 'bg-emerald-500',
                  },
                  {
                    label: 'Cajas',
                    val: embalajeRaw.pesoTotalCajas,
                    perc: stats.percCajas,
                    color: 'bg-blue-500',
                  },
                  {
                    label: 'IQF Pendiente',
                    val: embalajeRaw.totalesCongelados.pesoIQFPendientes,
                    perc: stats.percIQF,
                    color: 'bg-purple-500',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="relative overflow-hidden rounded-xl bg-gray-50 p-4"
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-3 w-3 rounded-full ${item.color} shadow-sm`}
                        />
                        <span className="font-bold text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-gray-900">
                          {formatNumber(item.val)} kg
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                          {item.perc.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
                      <motion.div
                        className={`h-full ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.perc}%` }}
                        transition={{
                          duration: 1.5,
                          ease: 'easeOut',
                          delay: 0.2,
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                  <span className="text-sm font-bold text-gray-500 uppercase">
                    Total Procesado
                  </span>
                  <span className="text-2xl font-black text-gray-900">
                    {formatNumber(stats.totalPeso)} kg
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
