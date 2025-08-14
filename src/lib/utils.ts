import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
  switch (status) {
    case "Em andamento":
      return "bg-yellow-500";
    case "Finalizado":
      return "bg-green-500";
    case "Pendente":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
