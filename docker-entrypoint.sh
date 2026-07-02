#!/bin/sh
set -e

# Run database migrations
echo "[entrypoint] Running database migrations..."
node scripts/migrate.js || {
  echo "[entrypoint] WARNING: migrations failed — continuing anyway"
}

# Start the Next.js server
echo "[entrypoint] Starting Next.js..."
exec node server.js
