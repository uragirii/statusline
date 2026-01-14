import { colors } from "../constants";

/**
 * Create a progress bar for context percentage
 */
export const createProgressBar = (percentage: number, color: string, width: number = 40): string => {
  const filled = Math.floor((percentage / 100) * width);
  const empty = width - filled;

  const bar = "█".repeat(filled) + "░".repeat(empty);
  const label = `ctx ${percentage}%`;

  // Apply dim effect to make colors lighter (except if already dim)
  const dimColor = color === colors.dim ? color : `${colors.dim}${color}`;

  return `${dimColor}${bar}${colors.reset} ${dimColor}${label}${colors.reset}`;
};
