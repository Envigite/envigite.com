'use client';

import { useMemo } from 'react';
import { ShoppingBag, PieChart, BarChart3 } from 'lucide-react';
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
import { motion } from 'framer-motion';

import { useProductosLogic } from '@/projects/cierre-temporada/hooks/useProductosLogic';
import { formatNumber } from '@/projects/cierre-temporada/lib/metrics';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ThemeStyles {
  bg: string;
  border: string;
  text: string;
  icon: string;
  bar: string;
}

interface ProductCardProps {
  label: string;
  weight: number;
  pallets: number;
  percentage: number;
  colorTheme: string;
  delay: number;
}

const ProductCard = ({
  label,
  weight,
  pallets,
  percentage,
  colorTheme,
  delay,
}: ProductCardProps) => {
  const colors: Record<string, ThemeStyles> = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-900',
      icon: 'text-red-600',
      bar: 'bg-red-500',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-indigo-900',
      icon: 'text-indigo-600',
      bar: 'bg-indigo-500',
    },
    teal: {
      bg: 'bg-teal-50',
      border: 'border-teal-100',
      text: 'text-teal-900',
      icon: 'text-teal-600',
      bar: 'bg-teal-500',
    },
  };

  const theme = colors[colorTheme] || colors.red;

  return (
    <motion.div
      className={`${theme.bg} ${theme.border} relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <ShoppingBag className={`h-6 w-6 ${theme.icon}`} />
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black ${theme.text}`}>
            {percentage.toFixed(1)}%
          </span>
          <span className="block text-[10px] font-bold text-gray-400 uppercase">
            del total
          </span>
        </div>
      </div>

      <h3 className={`text-xl font-bold ${theme.text} mb-4`}>{label}</h3>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
            Peso
          </p>
          <p className={`text-lg font-bold ${theme.text}`}>
            {formatNumber(weight)} <span className="text-xs">kg</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
            Palets
          </p>
          <p className={`text-lg font-bold ${theme.text}`}>{pallets}</p>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/50">
        <motion.div
          className={`h-full ${theme.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default function Productos() {
  const { productList, totals, chartDataPeso, chartDataPalets } =
    useProductosLogic();

  const doughnutOptions: ChartOptions<'doughnut'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: { legend: { display: false } },
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
      plugins: { legend: { display: false } },
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
        className="flex flex-col items-end justify-between gap-4 md:flex-row"
      >
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Productos Terminados
          </h2>
          <p className="text-lg text-gray-500">
            Desglose por categoría comercial
          </p>
        </div>

        <div className="flex gap-6 rounded-2xl border border-gray-100 bg-white px-6 py-3 shadow-sm">
          <div className="border-r border-gray-100 pr-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Total Kilos
            </p>
            <p className="text-xl font-black text-gray-800">
              {formatNumber(totals.peso)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Total Palets
            </p>
            <p className="text-xl font-black text-gray-800">{totals.palets}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {productList.map((prod, index) => (
          <ProductCard
            key={prod.id}
            label={prod.label}
            weight={prod.peso}
            pallets={prod.palets}
            percentage={prod.percentage}
            colorTheme={prod.color}
            delay={0.1 * index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 flex w-full items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <PieChart className="h-5 w-5 text-gray-400" />
              Distribución por Peso
            </h3>
          </div>

          <div className="relative h-64 w-64">
            <Doughnut data={chartDataPeso} options={doughnutOptions} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-gray-800">100%</span>
              <span className="text-xs font-bold text-gray-400 uppercase">
                Total
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            {productList.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: p.colorHex }}
                />
                <span className="text-sm font-medium text-gray-600">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6 flex w-full items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <BarChart3 className="h-5 w-5 text-gray-400" />
              Inventario de Palets
            </h3>
          </div>

          <div className="h-64 w-full">
            <Bar data={chartDataPalets} options={barOptions} />
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Producto Principal
              </span>
              <span className="text-sm font-bold text-gray-900">
                Frutilla ({productList[0].palets} Palets)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
