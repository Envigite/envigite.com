'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Target,
  AlertOctagon,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';
import { useDeviationsLogic } from '@/projects/cierre-temporada/hooks/useDeviationsLogic';

interface ItemCardProps {
  id: number;
  title: string;
  description: string;
  type: 'desviaciones' | 'acciones';
  index: number;
}

const ItemCard = ({ id, title, description, type, index }: ItemCardProps) => {
  const isDev = type === 'desviaciones';

  const styles = isDev
    ? {
        wrapper: 'bg-amber-50/50 border-amber-100 hover:border-amber-300',
        iconBg: 'bg-amber-100 text-amber-600',
        number: 'text-amber-200',
        title: 'text-amber-900',
        desc: 'text-amber-700/80',
        icon: AlertTriangle,
      }
    : {
        wrapper: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300',
        iconBg: 'bg-emerald-100 text-emerald-600',
        number: 'text-emerald-200',
        title: 'text-emerald-900',
        desc: 'text-emerald-700/80',
        icon: CheckCircle2,
      };

  const Icon = styles.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative rounded-2xl border p-6 ${styles.wrapper} shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      <span
        className={`pointer-events-none absolute top-2 right-4 text-6xl font-black opacity-20 select-none ${styles.number}`}
      >
        {id.toString().padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${styles.iconBg} shadow-inner`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h4 className={`mb-2 text-lg font-bold ${styles.title} pr-12`}>
          {title}
        </h4>

        <p className={`text-sm leading-relaxed font-medium ${styles.desc}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Desviaciones() {
  const { activeTab, setActiveTab, currentList } = useDeviationsLogic();

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Análisis y Mejora
        </h2>
        <p className="text-lg text-gray-500">
          Detección de brechas y plan de acción correctivo
        </p>
      </motion.div>

      <div className="flex justify-center md:justify-start">
        <div className="relative inline-flex rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
          <motion.div
            className={`absolute top-1.5 bottom-1.5 z-0 rounded-lg shadow-sm ${
              activeTab === 'desviaciones' ? 'bg-amber-100' : 'bg-emerald-100'
            }`}
            initial={false}
            animate={{
              x: activeTab === 'desviaciones' ? 0 : '100%',
              width: '50%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          <button
            onClick={() => setActiveTab('desviaciones')}
            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-bold transition-colors ${
              activeTab === 'desviaciones'
                ? 'text-amber-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertOctagon className="h-4 w-4" />
            Desviaciones
          </button>
          <button
            onClick={() => setActiveTab('acciones')}
            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-bold transition-colors ${
              activeTab === 'acciones'
                ? 'text-emerald-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            Acciones
          </button>
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {currentList.map((item, index) => (
            <ItemCard
              key={`${activeTab}-${item.id}`}
              index={index}
              id={item.id}
              title={item.titulo}
              description={item.descripcion}
              type={activeTab}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-12 flex items-center justify-center gap-4 rounded-2xl border p-6 text-center ${
          activeTab === 'desviaciones'
            ? 'border-amber-100 bg-amber-50 text-amber-800'
            : 'border-emerald-100 bg-emerald-50 text-emerald-800'
        }`}
      >
        {activeTab === 'desviaciones' ? (
          <>
            <ShieldAlert className="h-8 w-8 opacity-50" />
            <div>
              <p className="text-lg font-bold">9 Puntos Críticos Detectados</p>
              <p className="text-sm opacity-80">
                Requieren atención inmediata para la próxima temporada.
              </p>
            </div>
          </>
        ) : (
          <>
            <Target className="h-8 w-8 opacity-50" />
            <div>
              <p className="text-lg font-bold">
                Plan de Modernización Integral
              </p>
              <p className="text-sm opacity-80">
                Enfoque en digitalización, estandarización y eficiencia.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
