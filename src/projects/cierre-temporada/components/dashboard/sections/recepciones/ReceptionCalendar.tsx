'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Search } from 'lucide-react';
import { RECEPTION_DATES } from '@/projects/cierre-temporada/data/reception-dates';

interface ReceptionCalendarProps {
  onClose: () => void;
}

export default function ReceptionCalendar({ onClose }: ReceptionCalendarProps) {
  const [filter, setFilter] = useState('todos');

  const uniqueProducers = [
    'todos',
    ...Array.from(new Set(RECEPTION_DATES.map((d) => d.productor))),
  ];

  const filteredData =
    filter === 'todos'
      ? RECEPTION_DATES
      : RECEPTION_DATES.filter((d) => d.productor === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg font-bold">Calendario de Recepciones</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueProducers.map((p) => (
                <option key={p} value={p}>
                  {p === 'todos' ? 'Filtrar por Productor (Todos)' : p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="custom-scrollbar h-[400px] overflow-y-auto p-6 pt-2">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-100 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                <th className="pb-3 pl-2">Fecha</th>
                <th className="pb-3">Recepción</th>
                <th className="pb-3">Productor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.01 }}
                  className="group transition-colors hover:bg-blue-50/50"
                >
                  <td className="py-3 pl-2 text-sm font-medium text-gray-600">
                    {item.fecha}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {item.recepcion}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500 transition-colors group-hover:text-blue-700">
                    {item.productor}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="py-10 text-center text-gray-400">
              No se encontraron recepciones para este productor.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
