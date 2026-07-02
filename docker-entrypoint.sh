#!/bin/sh
set -e

# Run database migrations
echo "[entrypoint] Running database migrations..."
node scripts/migrate.js || {
  echo "[entrypoint] WARNING: migrations failed — continuing anyway"
}

# Seed sample projects if the table is empty (first boot only)
# Set SEED_ON_BOOT=false to disable
if [ "$SEED_ON_BOOT" != "false" ]; then
  echo "[entrypoint] Seeding sample projects (if table is empty)..."
  node scripts/seed-projects.js || {
    echo "[entrypoint] WARNING: project seeding failed — continuing anyway"
  }
fi

# Start the Next.js server
echo "[entrypoint] Starting Next.js..."
exec node server.js
