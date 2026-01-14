import { execSync } from "child_process";

export const getGitBranch = (cwd: string): string => {
  try {
    return execSync("git --no-optional-locks -c gc.auto=0 symbolic-ref --short HEAD", {
      cwd,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
  } catch {
    try {
      return execSync("git --no-optional-locks -c gc.auto=0 rev-parse --short HEAD", {
        cwd,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
    } catch {
      return "";
    }
  }
};

export const isGitDirty = (cwd: string): boolean => {
  try {
    const status = execSync("git --no-optional-locks -c gc.auto=0 status --porcelain", {
      cwd,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return status.trim().length > 0;
  } catch {
    return false;
  }
};
