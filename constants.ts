// ANSI color codes
export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  blink: "\x1b[5m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  brightRed: "\x1b[91m",
  brightYellow: "\x1b[93m",
} as const;

// Pricing per million tokens
export const PRICING = {
  opus: {
    input: 15,
    output: 75,
  },
  default: {
    input: 3,
    output: 15,
  },
} as const;
