/**
 * Strip ANSI color codes to get visual length
 */
export const visualLength = (str: string): number => {
  return str.replace(/\x1b\[[0-9;]*m/g, "").length;
};

/**
 * Format duration from milliseconds
 */
export const formatDuration = (ms: number): string => {
  if (!ms) return "0s";

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Format token count in K format
 */
export const formatTokens = (tokens: number): string => {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(1)}M`;
  } else if (tokens >= 1000) {
    return `${Math.floor(tokens / 1000)}K`;
  }
  return tokens.toString();
};
