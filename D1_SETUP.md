# D1 Database Setup and Sync Guide

## Problem

You were getting a `URL_SCHEME_NOT_SUPPORTED` error when trying to use Drizzle Studio with your D1 database. This happened because the local database path wasn't properly formatted as a URL.

## Solution

### 1. Fixed Drizzle Configuration

The `drizzle.config.ts` file has been updated to properly handle both local and remote D1 databases:

- **Local Development**: Uses the local SQLite file in `.wrangler/state/v3/d1/`
- **Production**: Connects to your remote D1 database via HTTP

### 2. Environment Variables

Make sure you have these environment variables set in your `.env` file:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=6e426781-8049-460d-b136-449d40281c0c
CLOUDFLARE_D1_TOKEN=your_api_token
```

### 3. Database Sync Commands

#### Quick Sync (Recommended)

```bash
npm run db:sync
```

This will:

- Generate migrations from your schema
- Apply migrations to local database
- Apply migrations to remote database

#### Manual Steps

If you prefer to run steps individually:

```bash
# Generate migrations from schema changes
npm run db:generate

# Apply to local database
npm run db:migrate:local

# Apply to remote database
npm run db:migrate:remote
```

### 4. Using Drizzle Studio

After syncing, you can start Drizzle Studio:

```bash
npm run drizzle:studio
```

### 5. Development Workflow

1. **Make schema changes** in `db/schema.ts`
2. **Generate migrations**: `npm run db:generate`
3. **Apply to both databases**: `npm run db:sync`
4. **Start Drizzle Studio**: `npm run drizzle:studio`
5. **Deploy**: `npm run deploy`

### 6. Troubleshooting

#### If Drizzle Studio still shows errors:

1. Check that your `.env` file has the correct D1 credentials
2. Run `npm run db:sync` to ensure both databases are in sync
3. Restart Drizzle Studio

#### If data isn't appearing in remote database:

1. Verify your `CLOUDFLARE_D1_TOKEN` has the correct permissions
2. Check that `CLOUDFLARE_DATABASE_ID` matches your D1 database ID
3. Run `npm run db:migrate:remote` to apply pending migrations

#### If local database is corrupted:

```bash
# Remove local database
rm -rf .wrangler/state/v3/d1/

# Recreate and sync
npm run db:sync
```

### 7. Database Locations

- **Local**: `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/[hash].sqlite`
- **Remote**: Cloudflare D1 (accessible via your D1 dashboard)

### 8. Verification

To verify your setup is working:

1. **Check local database**: `npm run drizzle:studio` (should open without errors)
2. **Check remote database**: Visit your Cloudflare D1 dashboard
3. **Test data persistence**: Add data locally, then check if it appears in your web app

## Notes

- The local database is used for development and testing
- The remote database is used in production
- Always run `npm run db:sync` after making schema changes
- Your `wrangler.jsonc` already has the correct D1 configuration
