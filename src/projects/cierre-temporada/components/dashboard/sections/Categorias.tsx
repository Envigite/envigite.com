'use client';

import { useMemo } from 'react';
import { Boxes, Scale, Trophy, LucideIcon, ArrowRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

import { useCategoriasLogic } from '@/projects/cierre-temporada/hooks/useCategoriasLogic';
import { formatNumber } from '@/projects/cierre-temporada/lib/metrics';

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
  icon: LucideIcon;
  colorClass: string;
  delay: number;
}

const MetricCard = ({
  title,
  value,
  subtext,
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

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold tracking-wider uppercase opacity-90">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight">{value}</h3>
        <p className="mt-1 inline-block rounded-md bg-white/20 px-2 py-0.5 text-sm font-medium opacity-90 backdrop-blur-sm">
          {subtext}
        </p>
      </div>
      <div className="rounded-xl bg-white/20 p-3 shadow-inner backdrop-blur-md">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </motion.div>
);

export default function Categorias() {
  const { categoryList, totals, chartData } = useCategoriasLogic();

  const barOptions: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: '#f3f4f6' },
          ticks: { font: { size: 11 }, color: '#9ca3af' },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 12, weight: 'bold' }, color: '#4b5563' },
        },
      },
      animation: { duration: 2000, easing: 'easeOutQuart' },
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Categorías de Embalaje
        </h2>
        <p className="text-lg text-gray-500">
          Distribución por formato de empaque
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Peso Total Empacado"
          value={`${formatNumber(totals.totalPeso)}`}
          subtext="Kg Totales"
          icon={Scale}
          colorClass="bg-gradient-to-br from-purple-600 to-indigo-600"
          delay={0.1}
        />
        <MetricCard
          title="Total Palets"
          value={totals.totalPalets}
          subtext="Unidades Físicas"
          icon={Boxes}
          colorClass="bg-gradient-to-br from-blue-500 to-sky-600"
          delay={0.2}
        />
        <MetricCard
          title="Categoría Principal"
          value={totals.topCategory.label}
          subtext={`${totals.topCategory.percentage.toFixed(1)}% del volumen`}
          icon={Trophy}
          colorClass="bg-gradient-to-br from-red-500 to-orange-500"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
            <span className="h-6 w-1.5 rounded-full bg-gray-800" />
            Detalle por Categoría
          </h3>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {categoryList.map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className={`${cat.theme.bg} ${cat.theme.border} relative overflow-hidden rounded-xl border p-4`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className={`font-bold ${cat.theme.text}`}>
                      {cat.label}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-mono font-bold">{cat.palets}</span>{' '}
                      Palets
                      <span className="text-gray-300">|</span>
                      <span>{formatNumber(cat.peso)} kg</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-black ${cat.theme.text}`}>
                      {cat.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/50">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: cat.theme.bar }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Comparativa Visual
            </h3>
            <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs font-bold text-gray-400 uppercase">
              <ArrowRight className="h-3 w-3" /> Horizontal
            </div>
          </div>

          <div className="h-[400px] w-full">
            <Bar data={chartData} options={barOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
