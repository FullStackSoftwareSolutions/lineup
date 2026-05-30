import { config as loadDotenv } from "dotenv";
import { fileURLToPath } from "node:url";

// Load canonical DB env from repo root regardless of cwd.
loadDotenv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const { migrate } = await import("@db/db/migrate");
await migrate();
