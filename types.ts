export interface ModelInfo {
  id: string;
  display_name: string;
}

export interface WorkspaceInfo {
  current_dir: string;
  project_dir: string;
}

export interface CurrentUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
}

export interface ContextWindow {
  total_input_tokens: number;
  total_output_tokens: number;
  context_window_size: number;
  current_usage?: CurrentUsage;
}

export interface OutputStyle {
  name: string;
}

export interface Cost {
  total_cost_usd?: number;
  total_duration_ms?: number;
}

export interface StatusLineInput {
  model: ModelInfo;
  workspace: WorkspaceInfo;
  context_window: ContextWindow;
  output_style: OutputStyle;
  cost?: Cost;
}

export interface ContextPercentageResult {
  percentage: number;
  color: string;
}
