import { colors, PRICING } from "../constants";
import type { StatusLineInput } from "../types";

/**
 * Calculate session cost based on model pricing
 */
export const calculateCost = (data: StatusLineInput): string => {
  const { total_input_tokens, total_output_tokens } = data.context_window;
  const modelId = data.model.id;

  // Pricing per million tokens
  const isOpus = modelId.includes("opus");
  const inputPrice = isOpus ? PRICING.opus.input : PRICING.default.input;
  const outputPrice = isOpus ? PRICING.opus.output : PRICING.default.output;

  const cost =
    (total_input_tokens / 1_000_000) * inputPrice +
    (total_output_tokens / 1_000_000) * outputPrice;

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
