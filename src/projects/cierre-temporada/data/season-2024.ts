import { SeasonData } from "@/projects/cierre-temporada/types/dashboard";

export const SEASON_DATA: SeasonData = {
  recepciones: [
    {
      numero: 1,
      productor: "L. Carrasco",
      kilosRecepcionados: 1993.8,
      kilosDespezonados: 0,
      kilosLavados: 1814.85,
      kilosNoLavados: 0,
      mermaDespezonado: { hoja: 0, jugo: 0, desecho: 0 },
      mermaLavado: { jugo: 0, hongo: 0, frutaMalDespezonada: 0, desecho: 196 }
    },
    {
      numero: 2,
      productor: "P. Farías",
      kilosRecepcionados: 27800.40,
      kilosDespezonados: 4539.4,
      kilosLavados: 23209.33,
      kilosNoLavados: 0,
      mermaDespezonado: { hoja: 412.06, jugo: 492, desecho: 0 },
      mermaLavado: { jugo: 351, hongo: 0, frutaMalDespezonada: 50, desecho: 3209.25 }
    },
    {
      numero: 3,
      productor: "F. Carrasco",
      kilosRecepcionados: 10902.7,
      kilosDespezonados: 0,
      kilosLavados: 4945.81,
      kilosNoLavados: 5779.1,
      mermaDespezonado: { hoja: 0, jugo: 0, desecho: 0 },
      mermaLavado: { jugo: 0, hongo: 0, frutaMalDespezonada: 0, desecho: 178.9 }
    },
    {
      numero: 4,
      productor: "J. Carrasco",
      kilosRecepcionados: 6230,
      kilosDespezonados: 0,
      kilosLavados: 5360.01,
      kilosNoLavados: 0,
      mermaDespezonado: { hoja: 0, jugo: 0, desecho: 0 },
      mermaLavado: { jugo: 0, hongo: 0, frutaMalDespezonada: 0, desecho: 1117 }
    },
    {
      numero: 5,
      productor: "C. Giofer Spa",
      kilosRecepcionados: 43267.5,
      kilosDespezonados: 0,
      kilosLavados: 32333.32,
      kilosNoLavados: 8911,
      mermaDespezonado: { hoja: 0, jugo: 0, desecho: 0 },
      mermaLavado: { jugo: 1315, hongo: 0, frutaMalDespezonada: 0, desecho: 441.89 }
    },
    {
      numero: 6,
      productor: "Agricola Frut JH SPA",
      kilosRecepcionados: 435736.20,
      kilosDespezonados: 350711.11,
      calculoParaDespezonado: 406714.9,
      calculoParaLavado: 300321.37,
      kilosLavados: 323159.94,
      kilosNoLavados: 1669,
      mermaDespezonado: { hoja: 54273.34, jugo: 29879.3, desecho: 354 },
      mermaLavado: { jugo: 20577.4, hongo: 287.55, frutaMalDespezonada: 1436.9, desecho: 3465.05 }
    }
  ],
  
  datosProductores: {
    "L. Carrasco": { recepciones: 3 },
    "P. Farías": { recepciones: 8 },
    "F. Carrasco": { recepciones: 1 },
    "J. Carrasco": { recepciones: 1 },
    "C. Giofer Spa": { recepciones: 7 },
    "Agricola Frut JH SPA": { recepciones: 52 }
  },

  resumenManual: {
    mermas: {
      despezonado: {
        hoja: 50999,
        jugo: 29168,
        desecho: 200
      },
      lavado: {
        jugo: 38724,
        hongo: 288,
        frutaMalDespezonada: 1437,
        desecho: 10633
      }
    },
    totalDesecho: 63935.04,
    totalNoLavado: 22561.1,
    rendimientoActualizado: 87.71
  },

  embalaje: {
    totalTotes: 311,
    pesoTotalTotes: 146611.4,
    totalPaletsCajas: 414,
    pesoTotalCajas: 222286.28,
    totalesCongelados: {
      paletsIQFPendientes: 69,
      pesoIQFPendientes: 17195.98
    },
    totalCajas: 16415,
    paletsIQF: 1074
  },

  categorias: {
    granel: 358,
    bolsas6x5: 16,
    bolsas13x2: 29,
    bolsas14x2: 9,
    bolsas10x1: 2
  },

  productos: {
    mixBerries: {
      palets: 2,
      peso: 684.4
    },
    frutilla: {
      palets: 403,
      peso: 217019.98
    },
    pulpaFrutilla: {
      palets: 9,
      peso: 4581.9
    }
  }
};