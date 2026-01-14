#!/usr/bin/env bun

import { basename } from "path";
import { colors } from "./constants";
import type { StatusLineInput } from "./types";
import { visualLength, formatDuration, formatTokens } from "./utils/format";
import { getGitBranch, isGitDirty } from "./utils/git";
import { calculateContextPercentage } from "./utils/context";
import { createProgressBar } from "./utils/progress";
import { calculateCost } from "./utils/cost";

const formatStatusLine = (data: StatusLineInput): string => {
  const cwd = data.workspace.current_dir;
  const dir = `${colors.cyan}${basename(cwd)}${colors.reset}`;
  const gitBranch = getGitBranch(cwd);
  const gitDirty = isGitDirty(cwd) ? `${colors.red}*${colors.reset}` : "";
  const ctxData = calculateContextPercentage(data);
  const mode = data.output_style.name;
  const cost = calculateCost(data);

  // Model name with special handling for Opus
  const modelId = data.model.id;
  const isOpus = modelId.includes("opus");
  const modelName = data.model.display_name;
  let modelDisplay: string;

  if (isOpus) {
    modelDisplay = `${colors.blink}${colors.brightRed}${colors.bold}[${modelName}]${colors.reset}`;
  } else {
    modelDisplay = `${colors.green}${modelName}${colors.reset}`;
  }

  // Left side content (first line - without ctx)
  let leftSide: string;
  if (gitBranch) {
    leftSide = `${dir} ${colors.magenta}git:(${gitBranch})${colors.reset}${gitDirty} | ${modelDisplay} | ${mode} | ${cost}`;
  } else {
    leftSide = `${dir} | ${modelDisplay} | ${mode} | ${cost}`;
  }

  // Right side content (first line)
  const duration = data.cost?.total_duration_ms || 0;
  const durationStr = formatDuration(duration);

  const currentTokens = data.context_window.current_usage
    ? data.context_window.current_usage.input_tokens +
      data.context_window.current_usage.cache_creation_input_tokens +
      data.context_window.current_usage.cache_read_input_tokens
    : 0;

  const tokensStr = `${formatTokens(currentTokens)}/${formatTokens(
    data.context_window.context_window_size
  )}`;
  const rightSide = `${colors.dim}⏱ ${durationStr} | ${tokensStr}${colors.reset}`;

  // Calculate padding to align right side on first line
  const terminalWidth = process.stdout.columns || 120;
  const leftLen = visualLength(leftSide);
  const rightLen = visualLength(rightSide);
  const padding = Math.max(2, terminalWidth - leftLen - rightLen);

  const firstLine = `${leftSide}${" ".repeat(padding)}${rightSide}`;

  // Second line - progress bar for context percentage
  const progressBarWidth = Math.min(50, Math.floor(terminalWidth * 0.6));
  const progressBar = createProgressBar(ctxData.percentage, ctxData.color, progressBarWidth);

  return `${firstLine}\n${progressBar}`;
};

// Read JSON from stdin
let input = "";

process.stdin.setEncoding("utf-8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input) as StatusLineInput;
    const statusLine = formatStatusLine(data);
    console.log(statusLine);
  } catch (error) {
    console.error("Error parsing input:", error);
    process.exit(1);
  }
});
