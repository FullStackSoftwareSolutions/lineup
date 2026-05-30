import { config as loadDotenv } from "dotenv";
import { fileURLToPath } from "node:url";
import type { Config } from "drizzle-kit";

// Load canonical DB env from repo root regardless of cwd.
loadDotenv({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
} satisfies Config;
