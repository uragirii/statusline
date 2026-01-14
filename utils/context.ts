import { colors } from "../constants";
import type { StatusLineInput, ContextPercentageResult } from "../types";

export const calculateContextPercentage = (data: StatusLineInput): ContextPercentageResult => {
  const { current_usage, context_window_size } = data.context_window;

  if (!current_usage) {
    return { percentage: 0, color: colors.dim };
  }

  const current =
    current_usage.input_tokens +
    current_usage.cache_creation_input_tokens +
    current_usage.cache_read_input_tokens;

  const pct = Math.floor((current * 100) / context_window_size);

  // Traffic light colors: <50% dim (like cost/time), 50-70% yellow, 70%+ red
  let color: string = colors.dim;
  if (pct >= 70) {
    color = colors.red;
  } else if (pct >= 50) {
    color = colors.yellow;
  }

  return { percentage: pct, color };
};
