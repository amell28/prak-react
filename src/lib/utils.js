import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getDiscountByTier(tier) {
  switch (tier) {
    case "Platinum":
      return 20
    case "Gold":
      return 15
    case "Silver":
      return 10
    case "Bronze":
    default:
      return 5
  }
}
