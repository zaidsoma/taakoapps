import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Use the correct binding depending on the environment
const dbBinding =
  typeof process !== "undefined" && process.env.DB
    ? process.env.DB
    : typeof globalThis !== "undefined" && (globalThis as any).DB
    ? (globalThis as any).DB
    : undefined;

if (!dbBinding) {
  throw new Error(
    "D1 database binding not found. Make sure you are running in a supported environment."
  );
}

export const db = drizzle(dbBinding, { schema });
