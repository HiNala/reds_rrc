# Deployment Plan

## Platform: Railway

### Services

1. **Web** — Next.js app (Node.js runtime)
2. **Worker** — Background job processor
3. **Postgres** — Managed database
4. **Redis** — Queue/cache (if needed)
5. **MinIO/S3** — Asset storage

### Environment

- Production: Railway
- Staging: Railway (separate environment)
- Local: Docker Compose

### CI/CD

- GitHub Actions: lint → test → build → deploy
- Preview deployments on PR
