---
title: Server Deployment
description: Deploy your Hytale server with Docker or Kubernetes
---

EverHytale provides production-ready infrastructure solutions for deploying Hytale dedicated servers.

## Deployment Options

| Method | Best For | Complexity |
|--------|----------|------------|
| [Docker](/infrastructure/docker/) | Single server, local development | Easy |
| [Docker Compose](/infrastructure/docker-compose/) | Single server with persistence | Easy |
| [Kubernetes](/infrastructure/kubernetes/) | Production, scaling, high availability | Advanced |

## Quick Comparison

### Docker

- Simple single-container deployment
- Perfect for testing and development
- Manual management of updates

### Docker Compose

- Includes persistence and health checks
- Easy environment configuration
- Recommended for most single-server setups

### Kubernetes (Helm)

- Production-grade deployment
- Automatic scaling and recovery
- Gateway API support for UDP traffic
- Best for multi-server environments

## Requirements

All deployment methods require:

- **Hytale account** with server access
- **UDP port 5520** available (Hytale uses QUIC protocol)
- **Minimum 4GB RAM** (8GB recommended)

## Docker Image

All methods use the official EverHytale Docker image:

```
everhytale/hytale-server
```

Available on:
- [Docker Hub](https://hub.docker.com/r/everhytale/hytale-server)
- GitHub Container Registry

### Image Tags

| Tag | Description |
|-----|-------------|
| `latest` | Latest stable release |
| `X.Y.Z+HYTALE_VERSION` | Specific image + Hytale version |
| `HYTALE_VERSION` | Latest image for this Hytale version |
| `rc` | Release candidate |
| `dev` | Development build |
| `edge` | Latest from main branch |

## Next Steps

Choose your deployment method:

- [Docker Installation](/infrastructure/docker/) - Quick start with Docker
- [Docker Compose](/infrastructure/docker-compose/) - Recommended for single servers
- [Kubernetes](/infrastructure/kubernetes/) - Production deployment with Helm
