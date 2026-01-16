---
title: Docker Compose
description: Deploy a Hytale server with Docker Compose
---

Docker Compose provides an easier way to configure and manage your Hytale server with persistent storage and automatic restarts.

## Prerequisites

- Docker 20.10+ with Docker Compose v2
- Minimum 4GB RAM (8GB recommended)
- Hytale account with server access
- UDP port 5520 available

## Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/everhytale/dockers.git
cd dockers/dockers/hytale-server
```

### Step 2: Start the Server

```bash
docker-compose up -d
```

### Step 3: Authenticate

```bash
# Attach to the console
docker attach hytale-server

# Authenticate with device code
/auth login device

# Follow the instructions, then persist credentials
/auth persistence Encrypted

# Detach: Ctrl+P, Ctrl+Q
```

### Step 4: View Logs

```bash
docker-compose logs -f
```

## docker-compose.yml

Here's the complete configuration file:

```yaml
version: '3.8'

services:
  hytale-server:
    image: everhytale/hytale-server:latest
    container_name: hytale-server
    restart: unless-stopped
    
    # Interactive mode for authentication
    stdin_open: true
    tty: true

    environment:
      # Memory Configuration
      - MIN_MEMORY=${MIN_MEMORY:-4G}
      - MAX_MEMORY=${MAX_MEMORY:-8G}
      
      # Network Configuration
      - SERVER_PORT=${SERVER_PORT:-5520}
      - SERVER_BIND=${SERVER_BIND:-0.0.0.0}
      
      # Server Configuration
      - AUTH_MODE=${AUTH_MODE:-authenticated}
      - DISABLE_SENTRY=${DISABLE_SENTRY:-false}
      - USE_AOT_CACHE=${USE_AOT_CACHE:-true}
      
      # Backup Configuration
      - BACKUP_ENABLED=${BACKUP_ENABLED:-false}
      - BACKUP_DIR=${BACKUP_DIR:-/server/backups}
      - BACKUP_FREQUENCY=${BACKUP_FREQUENCY:-30}
      - BACKUP_MAX_COUNT=${BACKUP_MAX_COUNT:-5}

    ports:
      - "${SERVER_PORT:-5520}:5520/udp"

    volumes:
      # Server data
      - hytale-data:/server
      
      # Machine-ID for encrypted auth
      - /etc/machine-id:/etc/machine-id:ro
      - /var/lib/dbus/machine-id:/var/lib/dbus/machine-id:ro

    deploy:
      resources:
        limits:
          memory: 10G
        reservations:
          memory: 4G

    stop_grace_period: 60s

    healthcheck:
      test: ["CMD", "pgrep", "-f", "HytaleServer.jar"]
      interval: 30s
      timeout: 10s
      start_period: 120s
      retries: 3

volumes:
  hytale-data:
    name: hytale-data
```

## Environment File

Create a `.env` file to customize settings:

```bash
# Memory
MIN_MEMORY=4G
MAX_MEMORY=8G

# Network
SERVER_PORT=5520

# Backups
BACKUP_ENABLED=true
BACKUP_FREQUENCY=30
BACKUP_MAX_COUNT=10
```

## Configuration Options

### Memory Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `MIN_MEMORY` | `4G` | Minimum JVM heap |
| `MAX_MEMORY` | `8G` | Maximum JVM heap |

### Network Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `5520` | UDP port |
| `SERVER_BIND` | `0.0.0.0` | Bind address |

### Server Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_MODE` | `authenticated` | `authenticated` or `offline` |
| `DISABLE_SENTRY` | `false` | Disable crash reporting |
| `USE_AOT_CACHE` | `true` | Faster startup with AOT |

### Backup Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKUP_ENABLED` | `false` | Enable auto-backups |
| `BACKUP_DIR` | `/server/backups` | Backup location |
| `BACKUP_FREQUENCY` | `30` | Minutes between backups |
| `BACKUP_MAX_COUNT` | `5` | Max backups to keep |

## Common Commands

### Start the Server

```bash
docker-compose up -d
```

### Stop the Server

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

### Restart the Server

```bash
docker-compose restart
```

### Update to Latest Image

```bash
docker-compose pull
docker-compose up -d
```

### Access Server Console

```bash
docker attach hytale-server
# Detach: Ctrl+P, Ctrl+Q
```

## Installing Mods

Place mod JAR files in the server's `mods/` directory:

```bash
# Find the volume location
docker volume inspect hytale-data

# Or copy directly into the container
docker cp EverEssentials.jar hytale-server:/server/mods/

# Restart the server
docker-compose restart
```

## Backup and Restore

### Manual Backup

```bash
# Stop the server
docker-compose stop

# Backup the volume
docker run --rm -v hytale-data:/data -v $(pwd):/backup alpine \
  tar czf /backup/hytale-backup-$(date +%Y%m%d).tar.gz -C /data .

# Start the server
docker-compose start
```

### Restore from Backup

```bash
# Stop the server
docker-compose stop

# Restore the volume
docker run --rm -v hytale-data:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar xzf /backup/hytale-backup-YYYYMMDD.tar.gz -C /data"

# Start the server
docker-compose start
```

## Production Recommendations

### Use Specific Image Tags

```yaml
image: everhytale/hytale-server:1.0.0+2026.01.15-c04fdfe10
```

### Enable Backups

```bash
BACKUP_ENABLED=true
BACKUP_FREQUENCY=15
BACKUP_MAX_COUNT=20
```

### Set Resource Limits

```yaml
deploy:
  resources:
    limits:
      memory: 16G
      cpus: '4'
    reservations:
      memory: 8G
      cpus: '2'
```

## Troubleshooting

### Container Keeps Restarting

```bash
# Check logs
docker-compose logs --tail=100

# Common issues:
# - Not enough memory
# - Authentication failed
# - Port already in use
```

### Cannot Attach to Console

Ensure `stdin_open: true` and `tty: true` are set in docker-compose.yml.

### Data Not Persisting

Verify the volume is correctly mounted:

```bash
docker volume ls
docker volume inspect hytale-data
```

## Next Steps

- [Kubernetes Deployment](/infrastructure/kubernetes/) - For production scaling
- [Installing Plugins](/guides/getting-started/) - Add EverEssentials
