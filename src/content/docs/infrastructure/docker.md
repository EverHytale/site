---
title: Docker Installation
description: Deploy a Hytale server with Docker
---

Deploy a Hytale dedicated server using the pre-built Docker image.

## Prerequisites

- Docker 20.10+
- Minimum 4GB RAM (8GB recommended)
- Hytale account with server access
- UDP port 5520 available

## Quick Start

### Pull the Image

```bash
# Latest stable release
docker pull everhytale/hytale-server:latest

# Specific Hytale version
docker pull everhytale/hytale-server:2026.01.15-c04fdfe10
```

### Run the Server

```bash
# Create data directory
mkdir -p ./data

# Run the server
docker run -d \
  --name hytale-server \
  -p 5520:5520/udp \
  -v ./data:/server \
  -v /etc/machine-id:/etc/machine-id:ro \
  -e MIN_MEMORY=4G \
  -e MAX_MEMORY=8G \
  everhytale/hytale-server:latest
```

## Authentication

Hytale servers require authentication. After starting the container:

### Step 1: Attach to the Console

```bash
docker attach hytale-server
```

### Step 2: Authenticate

```
/auth login device
```

You'll see:
```
===================================================================
DEVICE AUTHORIZATION
===================================================================
Visit: https://accounts.hytale.com/device
Enter code: ABCD-1234
===================================================================
```

### Step 3: Complete Authorization

1. Visit the URL in your browser
2. Enter the code
3. Wait for confirmation in the console

### Step 4: Persist Credentials

```
/auth persistence Encrypted
```

This saves credentials to `auth.enc` so they survive container restarts.

### Step 5: Detach from Container

Press `Ctrl+P` then `Ctrl+Q` to detach without stopping the server.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MIN_MEMORY` | `4G` | Minimum JVM heap size |
| `MAX_MEMORY` | `8G` | Maximum JVM heap size |
| `SERVER_PORT` | `5520` | Server port (UDP) |
| `SERVER_BIND` | `0.0.0.0` | Bind address |
| `AUTH_MODE` | `authenticated` | Authentication mode |
| `USE_AOT_CACHE` | `true` | Use AOT cache for faster startup |

### Backup Options

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKUP_ENABLED` | `false` | Enable automatic backups |
| `BACKUP_DIR` | `/server/backups` | Backup directory |
| `BACKUP_FREQUENCY` | `30` | Interval in minutes |
| `BACKUP_MAX_COUNT` | `5` | Maximum backups to keep |

## Data Structure

The `/server` volume contains all persistent data:

```
/server/
├── universe/          # Worlds and player data
├── mods/              # Installed mods (EverEssentials, etc.)
├── logs/              # Server logs
├── .cache/            # Optimized cache
├── auth.enc           # Encrypted authentication
├── config.json        # Server configuration
├── permissions.json   # Permissions
├── whitelist.json     # Whitelisted players
└── bans.json          # Banned players
```

## Managing the Server

### View Logs

```bash
docker logs -f hytale-server
```

### Stop the Server

```bash
docker stop hytale-server
```

### Start the Server

```bash
docker start hytale-server
```

### Remove the Container

```bash
docker rm hytale-server
```

:::caution
Removing the container doesn't delete your data if you used a volume mount (`-v ./data:/server`).
:::

## Firewall Configuration

Hytale uses QUIC protocol over UDP.

### Linux (ufw)

```bash
sudo ufw allow 5520/udp
```

### Linux (iptables)

```bash
sudo iptables -A INPUT -p udp --dport 5520 -j ACCEPT
```

### Windows PowerShell

```powershell
New-NetFirewallRule -DisplayName "Hytale Server" -Direction Inbound -Protocol UDP -LocalPort 5520 -Action Allow
```

## Troubleshooting

### Machine-ID Error

If you see "Failed to get Hardware UUID":

```bash
docker run -d \
  --name hytale-server \
  -v /etc/machine-id:/etc/machine-id:ro \
  -v /var/lib/dbus/machine-id:/var/lib/dbus/machine-id:ro \
  ...
```

### Server Won't Start

1. Check logs: `docker logs hytale-server`
2. Ensure minimum 4GB RAM available
3. Verify port 5520 is not in use

### Token Expired

Re-authenticate using the device flow:

```bash
docker attach hytale-server
# Then in console:
/auth login device
```

## Next Steps

- [Docker Compose](/infrastructure/docker-compose/) - Easier configuration with compose files
- [Installing Plugins](/guides/getting-started/) - Add EverEssentials and other plugins
