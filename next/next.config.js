/**
 * Load the canonical DB config from the repo-root /.env so Next picks up
 * DB_USER / DB_PASSWORD / DB_HOST / DB_NAME / DB_PORT without duplication.
 * Must run before ./src/env.js so its schema validation sees them.
 *
 * Gotcha: by the time next.config.js runs, Next has already loaded the next/
 * dir's env, and @next/env caches per-process. A plain loadEnvConfig(root)
 * no-ops (cached), while forceReload swaps the active set and DROPS next/.env's
 * OPENAI_*GITHUB_* values. So snapshot the next/ vars, force-load root for the
 * DB_* keys, then merge the snapshot back on top.
 */
import nextEnv from "@next/env";
import { fileURLToPath } from "node:url";
const { loadEnvConfig } = nextEnv;

const nextDirEnv = { ...process.env };
loadEnvConfig(fileURLToPath(new URL("..", import.meta.url)), undefined, undefined, true);
Object.assign(process.env, nextDirEnv);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  webpack: (config, { webpack }) => {
    config.externals.push("cloudflare:sockets");
    config.externalsType = "commonjs";

    return config;
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default config;
