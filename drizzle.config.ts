import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "path";
import fs from "node:fs";

function GetLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }
    const filePath = path.resolve(basePath, dbFile);

    // Convert Windows path to proper file:// URL format
    const url = `file:${filePath.replace(/\\/g, "/")}`;
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get local D1 DB");
  }
}

// Check if we have the required environment variables for remote D1
function hasRemoteD1Config() {
  return (
    process.env.CLOUDFLARE_D1_ACCOUNT_ID &&
    process.env.DATABASE_ID &&
    process.env.CLOUDFLARE_D1_API_TOKEN
  );
}

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "sqlite",
  // driver: "d1-http",
  // dbCredentials: {
  //   accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID!,
  //   databaseId: process.env.DATABASE_ID!,
  //   token: process.env.CLOUDFLARE_D1_API_TOKEN!,
  // },
  ...(process.env.NODE_ENV === "production" && hasRemoteD1Config()
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID!,
          databaseId: process.env.DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_API_TOKEN!,
        },
      }
    : {
        dbCredentials: {
          url: GetLocalD1DB(),
        },
      }),
});
