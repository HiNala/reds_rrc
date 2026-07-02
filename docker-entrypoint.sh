#!/bin/sh
set -e

# Run database migrations (push schema to Postgres)
echo "[entrypoint] Pushing schema to Postgres..."
npx drizzle-kit push --force || echo "[entrypoint] WARNING: drizzle-kit push failed — continuing anyway"

# Start the Next.js server
echo "[entrypoint] Starting Next.js..."
exec node server.js
