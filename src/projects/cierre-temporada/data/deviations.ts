export interface DeviationItem {
  id: number;
  titulo: string;
  descripcion: string;
}

export const DEVIATIONS_DATA = {
  desviaciones: [
    { id: 1, titulo: "Proceso 100% Manual", descripcion: "Ralentiza el proceso y lo deja expuesto a errores humanos constantes en la línea." },
    { id: 2, titulo: "Falta de Planificación", descripcion: "Dificulta la comunicación fluida entre las áreas de recepción, proceso y despacho." },
    { id: 3, titulo: "Personal no Capacitado", descripcion: "Pone en riesgo la calidad del producto final y la seguridad de las personas." },
    { id: 4, titulo: "Estándar Corporativo", descripcion: "Ausencia de definiciones claras. Necesitamos hablar todos el mismo lenguaje operativo." },
    { id: 5, titulo: "Norma de Calidad", descripcion: "Falta asegurar la consistencia y adecuación a un estándar de exportación determinado." },
    { id: 6, titulo: "Información en Tiempo Real", descripcion: "La data llega con retraso, lo que imposibilita la toma de decisiones correctivas inmediatas." },
    { id: 7, titulo: "Materiales / Insumos", descripcion: "Quiebres de stock generan pausas laborales y pérdida de tiempo y dinero." },
    { id: 8, titulo: "Cuadraturas de Proceso", descripcion: "Dificultad para verificar la consistencia y precisión de los datos de kilos." },
    { id: 9, titulo: "Obsolescencia Tecnológica", descripcion: "Necesidad urgente de adquisición de equipos y actualización de software." }
  ],
  acciones: [
    { id: 1, titulo: "Análisis Costo por Caja", descripcion: "Implementación de sistema de costos unitarios en tiempo real para optimización." },
    { id: 2, titulo: "Estructura por Áreas", descripcion: "Definir organigrama y establecer líderes claros por cada zona del proceso." },
    { id: 3, titulo: "Digitalización de Datos", descripcion: "Eliminación de planillas manuales. Recopilación digital en cada punto de control." },
    { id: 4, titulo: "Creación Norma Calidad", descripcion: "Redacción y capacitación de manuales de estándares y procedimientos (SOP)." },
    { id: 5, titulo: "Canales de Comunicación", descripcion: "Implementar sistemas de información efectivos (Slack/Teams/Dashboard)." },
    { id: 6, titulo: "Plan de Compras (MRP)", descripcion: "Gestión de inventario automatizada según la programación de producción." },
    { id: 7, titulo: "Control de Cuadratura", descripcion: "Implementar controles de masa automatizados (balanzas IoT) en entrada y salida." },
    { id: 8, titulo: "Dashboard en Tiempo Real", descripcion: "Implementar sistemas de monitoreo visual en planta (Andon screens)." },
    { id: 9, titulo: "Inversión CAPEX", descripcion: "Adquisición de equipos para nuevo sistema de trazabilidad y etiquetado." }
  ]
};