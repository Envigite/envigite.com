import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Esta función permite combinar clases de Tailwind sin conflictos
// Ejemplo: cn("bg-red-500", condcion && "bg-blue-500")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}