import { config as loadDotenv } from "dotenv";
import { fileURLToPath } from "node:url";

/**
 * Load the canonical DB/secrets config from the repo-root /.env so the
 * whatsapp service picks up DB_* (and other secrets) when run natively.
 * In Docker these come from compose `environment:` instead, and dotenv
 * won't override already-set vars. Mirrors next.config.js + db scripts.
 *
 * Imported for its side effect as the FIRST import in server.ts so the env
 * is populated before @db's connection module reads process.env.
 */
loadDotenv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });
