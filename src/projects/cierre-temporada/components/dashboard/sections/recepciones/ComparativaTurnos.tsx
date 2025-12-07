"use client";

import { Bar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Sun, Moon, ArrowRightLeft } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparativaTurnosProps {
  visible: boolean;
}

const ComparativaTurnos = ({ visible }: ComparativaTurnosProps) => {
  const datosLavado = {
    fechaInicio: "18/03/2025",
    fechaFin: "27/03/2025",
    dia: 32930.91,
    noche: 19055.42,
  };

  const datosEmbalaje = {
    fechaInicio: "18/03/2025",
    fechaFin: "02/04/2025",
    dia: 52616.05,
    noche: 32278.37,
  };

  const calcularEstadisticas = (datos: { dia: number; noche: number }) => {
    const total = datos.dia + datos.noche;
    const porcentajeDia = (datos.dia / total) * 100;
    const porcentajeNoche = (datos.noche / total) * 100;
    const diferencia = datos.dia - datos.noche;
    const diferenciaPorcentual = (diferencia / datos.noche) * 100;

    return { porcentajeDia, porcentajeNoche, diferencia, diferenciaPorcentual };
  };

  const estLavado = calcularEstadisticas(datosLavado);
  const estEmbalaje = calcularEstadisticas(datosEmbalaje);

  const chartData = {
    labels: ["Lavado", "Embalaje"],
    datasets: [
      {
        label: "Turno Día",
        data: [datosLavado.dia, datosEmbalaje.dia],
        backgroundColor: "rgba(251, 191, 36, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Turno Noche",
        data: [datosLavado.noche, datosEmbalaje.noche],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-500" />
              Comparativa de Turnos
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Lavado
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Sun className="w-4 h-4" />{" "}
                        <span className="text-xs font-bold">DÍA</span>
                      </div>
                      <p className="text-lg font-bold text-amber-900">
                        {datosLavado.dia.toLocaleString("es-CL")} kg
                      </p>
                      <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-amber-500 h-full"
                          style={{ width: `${estLavado.porcentajeDia}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-700 mb-1">
                        <Moon className="w-4 h-4" />{" "}
                        <span className="text-xs font-bold">NOCHE</span>
                      </div>
                      <p className="text-lg font-bold text-indigo-900">
                        {datosLavado.noche.toLocaleString("es-CL")} kg
                      </p>
                      <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full"
                          style={{ width: `${estLavado.porcentajeNoche}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Embalaje
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Sun className="w-4 h-4" />{" "}
                        <span className="text-xs font-bold">DÍA</span>
                      </div>
                      <p className="text-lg font-bold text-amber-900">
                        {datosEmbalaje.dia.toLocaleString("es-CL")} kg
                      </p>
                      <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-amber-500 h-full"
                          style={{ width: `${estEmbalaje.porcentajeDia}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-700 mb-1">
                        <Moon className="w-4 h-4" />{" "}
                        <span className="text-xs font-bold">NOCHE</span>
                      </div>
                      <p className="text-lg font-bold text-indigo-900">
                        {datosEmbalaje.noche.toLocaleString("es-CL")} kg
                      </p>
                      <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full"
                          style={{ width: `${estEmbalaje.porcentajeNoche}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
                <div className="w-full h-64">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "top" } },
                      scales: {
                        y: { beginAtZero: true, grid: { color: "#f3f4f6" } },
                        x: { grid: { display: false } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComparativaTurnos;
