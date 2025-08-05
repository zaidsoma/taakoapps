#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔄 D1 Database Sync Script");
console.log("==========================\n");

// Check if environment variables are set
const requiredEnvVars = [
  "CLOUDFLARE_D1_ACCOUNT_ID",
  "DATABASE_ID",
  "CLOUDFLARE_D1_API_TOKEN",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error("\nPlease set these in your .dev.vars file or environment.");
  process.exit(1);
}

console.log("✅ Environment variables configured");
console.log("📊 Account ID:", process.env.CLOUDFLARE_D1_ACCOUNT_ID);
console.log("🗄️  Database ID:", process.env.DATABASE_ID);
console.log(
  "🔑 Token:",
  process.env.CLOUDFLARE_D1_API_TOKEN?.substring(0, 10) + "..."
);

try {
  // Step 1: Generate migrations from schema
  console.log("\n📝 Generating migrations...");
  execSync("npx drizzle-kit generate", { stdio: "inherit" });

  // Step 2: Apply migrations to local database
  console.log("\n🏠 Applying migrations to local database...");
  execSync("npx wrangler d1 migrations apply taakoapps --local", {
    stdio: "inherit",
  });

  // Step 3: Apply migrations to remote database
  console.log("\n☁️  Applying migrations to remote database...");
  execSync("npx wrangler d1 migrations apply taakoapps", { stdio: "inherit" });

  console.log("\n✅ Database sync completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("   1. Start Drizzle Studio: npx drizzle-kit studio");
  console.log("   2. Your data should now be synced between local and remote");
} catch (error) {
  console.error("\n❌ Error during sync:", error.message);
  process.exit(1);
}
