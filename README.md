# Statusline

A TypeScript-based statusline script for Claude Code that displays git branch, model info, context usage, cost, and duration.

## Installation

Install dependencies:

```bash
bun install
```

## Building

Build the statusline binary using Bun:

```bash
bun run build
```

This will create a compiled executable at `./dist/statusline`.

## Symlinking to Claude Folder

After building, symlink the compiled binary to your Claude configuration directory:

### macOS/Linux

```bash
# Find your Claude config directory (usually ~/.claude/)
mkdir -p ~/.claude/

# Create symlink
ln -sf "$(pwd)/dist/statusline" ~/.claude/statusline

# Make it executable (if needed)
chmod +x ~/.claude/statusline
```

### Verify the symlink

```bash
ls -la ~/.claude/statusline
# Should show: ~/.claude/statusline -> /path/to/this/repo/dist/statusline
```

## Testing

Test the statusline with sample JSON input:

```bash
echo '{"model":{"id":"claude-sonnet-4-5","display_name":"Sonnet 4.5"},"workspace":{"current_dir":"'$(pwd)'","project_dir":"'$(pwd)'"},"context_window":{"total_input_tokens":5000,"total_output_tokens":1000,"context_window_size":200000,"current_usage":{"input_tokens":4000,"output_tokens":800,"cache_creation_input_tokens":500,"cache_read_input_tokens":300}},"output_style":{"name":"normal"},"cost":{"total_cost_usd":0.15,"total_duration_ms":45000}}' | ./dist/statusline
```

## Development

The codebase is organized as follows:

- `index.ts` - Main entry point
- `constants.ts` - ANSI colors and pricing constants
- `types.ts` - TypeScript interfaces
- `utils/` - Utility functions
  - `format.ts` - Formatting utilities (duration, tokens, visual length)
  - `git.ts` - Git-related functions
  - `context.ts` - Context percentage calculation
  - `progress.ts` - Progress bar creation
  - `cost.ts` - Cost calculation

After making changes:

1. Run `bun run build` to rebuild
2. The symlink will automatically use the updated binary

## Features

- Git branch and dirty status indicator
- Model name with special highlighting for Opus models
- Output style mode
- Session cost with color-coded thresholds
- Session duration
- Token usage (current/max)
- Context window progress bar with percentage

---

This project was created using Bun. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
