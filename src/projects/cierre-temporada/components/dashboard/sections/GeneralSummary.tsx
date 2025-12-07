'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion, Variants } from 'framer-motion';
import {
  TrendingUp,
  Package,
  AlertTriangle,
  Warehouse,
  LucideIcon,
  ArrowUpRight,
  CheckCircle2,
  Box,
  Snowflake,
  Factory,
} from 'lucide-react';

import {
  getDashboardMetrics,
  formatNumber,
} from '@/projects/cierre-temporada/lib/metrics';
import { SEASON_DATA } from '@/projects/cierre-temporada/data/season-2024';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  gradient: string;
  shadowColor: string;
}

const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  gradient,
  shadowColor,
}: StatCardProps) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-xl ${gradient} ${shadowColor}`}
  >
    <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
    <div className="pointer-events-none absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-black/10 blur-xl" />

    <div className="relative z-10 flex items-start justify-between">
      <div className="space-y-1">
        <p className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white/80 uppercase lg:text-xs">
          {title}
        </p>
        <h3 className="text-2xl font-black tracking-tight drop-shadow-md lg:text-3xl">
          {value}
        </h3>
        <div className="mt-2 inline-flex items-center rounded-lg border border-white/10 bg-white/20 px-2 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-white/90 lg:text-xs">
            {subtext}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/20 p-2 shadow-inner backdrop-blur-md lg:p-3">
        <Icon className="h-5 w-5 text-white lg:h-6 lg:w-6" />
      </div>
    </div>
  </motion.div>
);

export default function GeneralSummary() {
  const metrics = useMemo(() => getDashboardMetrics(), []);
  const { totales, porcentajes, distribucion } = metrics;
  const { embalaje } = SEASON_DATA;

  const porcentajeProductoFinal =
    (totales.productoFinal / totales.lavado) * 100;

  const productChartData = {
    labels: ['Frutilla', 'Mix Berries', 'Pulpa'],
    datasets: [
      {
        data: [
          distribucion.frutilla,
          distribucion.mixBerries,
          distribucion.pulpa,
        ],
        backgroundColor: ['#ef4444', '#6366f1', '#14b8a6'],
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const processChartData = {
    labels: ['Recepción', 'Despezonado', 'Lavado', 'Final'],
    datasets: [
      {
        label: 'Kilos',
        data: [
          totales.recepcionado,
          totales.despezonado,
          totales.lavado,
          totales.productoFinal,
        ],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(96, 165, 250, 0.8)',
          'rgba(52, 211, 153, 0.8)',
          'rgba(248, 113, 113, 0.8)',
        ],
        borderRadius: 8,
        borderSkipped: false as const,
      },
    ],
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Resumen de Temporada
        </h2>
        <div className="mx-auto my-4 h-1 w-20 rounded-full bg-blue-600" />
        <p className="mx-auto max-w-2xl text-lg text-gray-500">
          Visión estratégica del rendimiento productivo y distribución de la
          temporada 2024-2025.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <StatCard
          title="Kilos Recepcionados"
          value={`${formatNumber(totales.recepcionado)}`}
          subtext="Total Bruto"
          icon={Warehouse}
          gradient="bg-gradient-to-br from-red-500 to-pink-600"
          shadowColor="shadow-red-200"
        />
        <StatCard
          title="Rendimiento Global"
          value={`${porcentajes.rendimiento.toFixed(2)}%`}
          subtext="Inc. Jugo"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
          shadowColor="shadow-blue-200"
        />
        <StatCard
          title="Rend. Embasado"
          value={`${porcentajeProductoFinal.toFixed(2)}%`}
          subtext="Eficiencia Línea"
          icon={Factory}
          gradient="bg-gradient-to-br from-purple-500 to-fuchsia-600"
          shadowColor="shadow-purple-200"
        />
        <StatCard
          title="Producto Final"
          value={`${formatNumber(totales.productoFinal)}`}
          subtext="Total Neto"
          icon={Package}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          shadowColor="shadow-emerald-200"
        />
        <StatCard
          title="Mermas Totales"
          value={`${formatNumber(totales.desecho)}`}
          subtext="Pérdida Total"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          shadowColor="shadow-amber-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="h-8 w-2 rounded-full bg-blue-500"></span>
              Flujo de Proceso
            </h3>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-400">
              En Kilos
            </span>
          </div>

          <div className="h-72 w-full">
            <Bar
              data={processChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    border: { display: false },
                    grid: { color: '#f3f4f6' },
                    ticks: {
                      font: { size: 11, weight: 'bold' },
                      color: '#9ca3af',
                      callback: function (value) {
                        return formatNumber(Number(value));
                      },
                    },
                  },
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                      font: { size: 12, weight: 'bold' },
                      color: '#4b5563',
                    },
                  },
                },
                animation: {
                  duration: 3000,
                  easing: 'easeOutQuart',
                  delay: 1000,
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="h-8 w-2 rounded-full bg-indigo-500"></span>
              Mix de Productos
            </h3>
            <ArrowUpRight className="h-5 w-5 text-gray-300" />
          </div>

          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <div className="relative h-60 w-60">
              <Pie
                data={productChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: { legend: { display: false } },
                  animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 3000,
                    easing: 'easeOutQuart',
                    delay: 500,
                  },
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-800">100%</span>
                <span className="text-xs font-medium text-gray-400 uppercase">
                  Total
                </span>
              </div>
            </div>

            <div className="w-full space-y-4 md:w-auto">
              {[
                {
                  label: 'Frutilla',
                  val: porcentajes.frutilla,
                  color: 'bg-red-500',
                },
                {
                  label: 'Mix Berries',
                  val: porcentajes.mixBerries,
                  color: 'bg-indigo-500',
                },
                {
                  label: 'Pulpa',
                  val: porcentajes.pulpa,
                  color: 'bg-teal-500',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-40 items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${item.color} shadow-sm`}
                    ></span>
                    <span className="text-sm font-semibold text-gray-600">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {item.val.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
      >
        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-emerald-400 via-green-500 to-teal-500" />

        <h3 className="mb-8 flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          Detalle Producto Final
        </h3>

        <div className="mx-auto mb-10 max-w-3xl">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Rendimiento sobre Lavado
            </span>
            <div className="text-right">
              <span className="text-3xl font-black text-green-600">
                {porcentajeProductoFinal.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
            <motion.div
              className="h-4 rounded-full bg-linear-to-r from-emerald-400 to-teal-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(porcentajeProductoFinal, 100)}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 transition-colors hover:border-emerald-200">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2 transition-colors group-hover:bg-emerald-200">
                <Warehouse className="h-5 w-5 text-emerald-700" />
              </div>
              <h5 className="text-lg font-bold text-emerald-800">Totes</h5>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-emerald-900">
                {embalaje.totalTotes}
              </p>
              <p className="text-sm font-medium text-emerald-600">Palets</p>
            </div>
            <div className="mt-4 border-t border-emerald-200/50 pt-4">
              <p className="text-lg font-bold text-emerald-700">
                {formatNumber(embalaje.pesoTotalTotes)} kg
              </p>
            </div>
          </div>

          <div className="group rounded-2xl border border-blue-100 bg-blue-50/50 p-6 transition-colors hover:border-blue-200">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 transition-colors group-hover:bg-blue-200">
                <Box className="h-5 w-5 text-blue-700" />
              </div>
              <h5 className="text-lg font-bold text-blue-800">Cajas</h5>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-blue-900">
                {embalaje.totalPaletsCajas}
              </p>
              <p className="text-sm font-medium text-blue-600">Palets</p>
            </div>
            <div className="mt-4 border-t border-blue-200/50 pt-4">
              <p className="text-lg font-bold text-blue-700">
                {formatNumber(embalaje.pesoTotalCajas)} kg
              </p>
            </div>
          </div>

          <div className="group rounded-2xl border border-purple-100 bg-purple-50/50 p-6 transition-colors hover:border-purple-200">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 transition-colors group-hover:bg-purple-200">
                <Snowflake className="h-5 w-5 text-purple-700" />
              </div>
              <h5 className="text-lg font-bold text-purple-800">
                IQF Pendiente
              </h5>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-purple-900">
                {embalaje.totalesCongelados.paletsIQFPendientes}
              </p>
              <p className="text-sm font-medium text-purple-600">Palets</p>
            </div>
            <div className="mt-4 border-t border-purple-200/50 pt-4">
              <p className="text-lg font-bold text-purple-700">
                {formatNumber(embalaje.totalesCongelados.pesoIQFPendientes)} kg
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
          <p className="mb-1 text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Total Producto Final
          </p>
          <p className="text-4xl font-black tracking-tight text-gray-800">
            {formatNumber(totales.productoFinal)}{' '}
            <span className="text-lg font-bold text-gray-400">kg</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
