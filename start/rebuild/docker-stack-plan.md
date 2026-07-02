# Docker Stack Plan

## Services (docker-compose.yml)

```yaml
services:
  web:
    build: .
    ports: ['3000:3000']
    env_file: .env
    depends_on: [postgres, minio]
  worker:
    build: .
    command: pnpm worker
    env_file: .env
    depends_on: [postgres, redis]
  postgres:
    image: postgres:16
    ports: ['5432:5432']
    volumes: ['pgdata:/var/lib/postgresql/data']
  redis:
    image: redis:7
    ports: ['6379:6379']
  minio:
    image: minio/minio
    ports: ['9000:9000']
    volumes: ['miniodata:/data']
volumes:
  pgdata:
  miniodata:
```
