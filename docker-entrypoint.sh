#!/bin/sh
set -e

# Mark migration 0003 as applied if the slug column already exists
# (handles DBs that were set up via drizzle-kit push before the migration file existed)
echo "[entrypoint] Checking for pre-existing schema changes..."
node scripts/mark-migration.js 2>/dev/null || true

# Run database migrations
echo "[entrypoint] Running database migrations..."
node scripts/migrate.js || {
  echo "[entrypoint] WARNING: migrations failed â€” continuing anyway"
}

# Seed sample projects if the table is empty (first boot only)
# Set SEED_ON_BOOT=false to disable
if [ "$SEED_ON_BOOT" != "false" ]; then
  echo "[entrypoint] Seeding sample projects (if table is empty)..."
  node scripts/seed-projects.js || {
    echo "[entrypoint] WARNING: project seeding failed â€” continuing anyway"
  }
fi

# Start the Next.js server
echo "[entrypoint] Starting Next.js..."
exec node server.js
