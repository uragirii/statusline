# Statusline

A TypeScript-based statusline script for Claude Code that displays git branch, model info, context usage, cost, and duration.

## Installation

Install dependencies:

```bash
bun install
```

## Building

Build the statusline JavaScript file using Bun:

```bash
bun run build
```

This will create a bundled JavaScript file at `./dist/statusline.js` (~6KB).

> **Note:** We compile to JavaScript rather than a standalone binary. Benchmarks showed nearly identical performance (~20ms execution time for both), but the JS file is 6KB vs 57MB for the binary. The JS version is also faster with large contexts and easier to maintain.

## Deploying to Claude

Deploy the built file to your Claude user-scripts directory:

```bash
bun run deploy
```

This will:
1. Build the TypeScript code into JavaScript
2. Copy it to `~/.claude/user-scripts/statusline.js`
3. Make it executable
4. Confirm the update

### Manual Setup

If needed, you can manually configure Claude to use the statusline:

1. Update `~/.claude/settings.json`:
```json
{
  "statusLine": {
    "type": "command",
    "command": "bun ~/.claude/user-scripts/statusline.js"
  }
}
```

## Testing

Test the statusline with sample JSON input:

```bash
echo '{"model":{"id":"claude-sonnet-4-5","display_name":"Sonnet 4.5"},"workspace":{"current_dir":"'$(pwd)'","project_dir":"'$(pwd)'"},"context_window":{"total_input_tokens":5000,"total_output_tokens":1000,"context_window_size":200000,"current_usage":{"input_tokens":4000,"output_tokens":800,"cache_creation_input_tokens":500,"cache_read_input_tokens":300}},"output_style":{"name":"normal"},"cost":{"total_cost_usd":0.15,"total_duration_ms":45000}}' | bun ./dist/statusline.js
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
2. Run `bun run deploy` to deploy to Claude user-scripts

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
