// Interfaces base para mermas
export interface MermaDespezonado {
  hoja: number;
  jugo: number;
  desecho: number;
}

export interface MermaLavado {
  jugo: number;
  hongo: number;
  frutaMalDespezonada: number;
  desecho: number;
}

// Interface principal de Recepción
export interface Recepcion {
  numero: number;
  productor: string;
  kilosRecepcionados: number;
  kilosDespezonados: number;
  kilosLavados: number;
  kilosNoLavados: number;
  calculoParaDespezonado?: number;
  calculoParaLavado?: number;
  mermaDespezonado: MermaDespezonado;
  mermaLavado: MermaLavado;
  fecha?: string;
}

// Interfaces para Embalaje y Productos
export interface TotalesEmbalaje {
  totalTotes: number;
  pesoTotalTotes: number;
  totalPaletsCajas: number;
  pesoTotalCajas: number;
  totalesCongelados: {
    paletsIQFPendientes: number;
    pesoIQFPendientes: number;
  };
  totalCajas: number;
  paletsIQF: number;
}

export interface ProductoData {
  palets: number;
  peso: number;
}

// Estructura de Datos Manuales (Corrección Crítica)
export interface ResumenManualData {
  mermas: {
    despezonado: MermaDespezonado;
    lavado: MermaLavado;
  };
  totalDesecho: number;
  totalNoLavado: number;
  rendimientoActualizado: number;
}

// Interface Global de los Datos
export interface SeasonData {
  recepciones: Recepcion[];
  datosProductores: Record<string, { recepciones: number }>;
  embalaje: TotalesEmbalaje;
  categorias: {
    [key: string]: number;
  };
  productos: {
    mixBerries: ProductoData;
    frutilla: ProductoData;
    pulpaFrutilla: ProductoData;
  };
  resumenManual?: ResumenManualData;
}

// Interfaces de Métricas Calculadas
export interface DashboardMetrics {
  totales: {
    recepcionado: number;
    despezonado: number;
    lavado: number;
    productoFinal: number;
    desecho: number;
    palets: number;
  };
  porcentajes: {
    rendimiento: number;
    frutilla: number;
    mixBerries: number;
    pulpa: number;
    desecho: number;
  };
  distribucion: {
    frutilla: number;
    mixBerries: number;
    pulpa: number;
  };
}