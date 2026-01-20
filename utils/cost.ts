import { colors } from "../constants";
import type { StatusLineInput } from "../types";

/**
 * Format session cost from stdin data
 */
export const calculateCost = (data: StatusLineInput): string => {
  const cost = data.cost?.total_cost_usd ?? 0;

  let costText = cost < 0.01 ? "<$0.01" : `$${cost.toFixed(2)}`;

  // Color coding: <$5 dim, $5-$9.99 yellow, $10+ red
  if (cost >= 10) {
    return `${colors.red}${costText}${colors.reset}`;
  } else if (cost >= 5) {
    return `${colors.yellow}${costText}${colors.reset}`;
  } else if (cost >= 0.01) {
    return `${colors.dim}${costText}${colors.reset}`;
  }
  return costText;
};
