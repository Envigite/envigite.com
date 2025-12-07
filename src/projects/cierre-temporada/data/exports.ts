export interface ExportacionData {
  id: number;
  fecha: string;
  numeroExportacion: number;
  numeroCajas: number;
  peso: number;
  distribuciones: Record<string, number>;
  productos: Record<string, Record<string, number>>;
}

export const EXPORT_DATA: ExportacionData[] = [
  {
    id: 1,
    fecha: "21-03-2025",
    numeroExportacion: 1,
    numeroCajas: 1764,
    peso: 24025.68,
    distribuciones: {
      M: 1685,
      S: 76,
      L: 3,
    },
    productos: {
      Frutilla: {
        Total: 1764,
      },
    },
  },
  {
    id: 2,
    fecha: "10-04-2025",
    numeroExportacion: 2,
    numeroCajas: 1764,
    peso: 22172.04,
    distribuciones: {}, 
    productos: {
      Frutilla: {
        "13 x 2Lb": 924,
        "6 x 5Lb": 724,
      },
      "Pulpa Frutilla": {
        "14 x 2Lb": 58,
      },
      "Mix Berries": {
        "13 x 2Lb": 58,
      },
    },
  },
];