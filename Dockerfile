# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgres://postgres:postgres@localhost:5432/redsrrc
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy standalone Next.js output (includes minimal node_modules for server)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy drizzle migration files + migration runner
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --chown=nextjs:nodejs scripts/migrate.js ./scripts/migrate.js
COPY --chown=nextjs:nodejs scripts/seed-projects.js ./scripts/seed-projects.js
COPY --chown=nextjs:nodejs scripts/mark-migration.js ./scripts/mark-migration.js

# Entrypoint script that runs migrations then starts the server
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
# Fix Windows CRLF line endings (safe no-op if already LF)
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["./docker-entrypoint.sh"]
