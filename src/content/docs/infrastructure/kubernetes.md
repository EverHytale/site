---
title: Kubernetes (Helm)
description: Deploy a Hytale server on Kubernetes with Helm
---

Deploy production-grade Hytale servers on Kubernetes using our Helm chart.

## Prerequisites

- Kubernetes 1.33+
- Helm 3.x
- PersistentVolume provisioner
- UDP load balancer or Gateway API support

## Quick Start

### Add the Helm Repository

```bash
helm repo add everhytale https://everhytale.github.io/charts
helm repo update
```

### Install the Chart

```bash
helm install my-hytale everhytale/hytale
```

### Install with Custom Values

```bash
helm install my-hytale everhytale/hytale \
  --set jvm.maxMemory=16G \
  --set service.type=LoadBalancer
```

### Install from Source

```bash
git clone https://github.com/everhytale/charts.git
cd charts
helm install my-hytale ./charts/hytale
```

## Authentication

After installation, authenticate the server:

```bash
# Attach to the pod
kubectl attach -it deployment/my-hytale

# In the server console
/auth login device
/auth persistence Encrypted

# Detach: Ctrl+P, Ctrl+Q
```

## Configuration

### values.yaml Overview

```yaml
# Image configuration
image:
  repository: everhytale/hytale-server
  tag: ""  # Uses Chart.AppVersion
  pullPolicy: IfNotPresent

# JVM settings
jvm:
  minMemory: "4G"
  maxMemory: "8G"

# Server settings
server:
  port: 5520
  bind: "0.0.0.0"
  authMode: "authenticated"

# Persistence
persistence:
  enabled: true
  size: 10Gi

# Service
service:
  type: ClusterIP
  port: 5520

# Resources
resources:
  requests:
    cpu: 1000m
    memory: 4Gi
  limits:
    cpu: 4000m
    memory: 8Gi
```

### Image Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `image.repository` | Image repository | `everhytale/hytale-server` |
| `image.tag` | Image tag | `""` (Chart.AppVersion) |
| `image.pullPolicy` | Pull policy | `IfNotPresent` |

### JVM Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `jvm.minMemory` | Minimum heap | `4G` |
| `jvm.maxMemory` | Maximum heap | `8G` |
| `jvm.javaOpts` | Custom JVM options | `""` |

### Server Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `server.port` | UDP port | `5520` |
| `server.authMode` | Auth mode | `authenticated` |
| `server.disableSentry` | Disable Sentry | `false` |
| `server.useAotCache` | Use AOT cache | `true` |

### Backup Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `backup.enabled` | Enable backups | `false` |
| `backup.dir` | Backup directory | `/server/backups` |
| `backup.frequency` | Interval (minutes) | `30` |
| `backup.maxCount` | Max backups | `5` |

### Persistence

| Parameter | Description | Default |
|-----------|-------------|---------|
| `persistence.enabled` | Enable PVC | `true` |
| `persistence.size` | Volume size | `10Gi` |
| `persistence.storageClass` | Storage class | `""` |
| `persistence.existingClaim` | Use existing PVC | `""` |

### Service

| Parameter | Description | Default |
|-----------|-------------|---------|
| `service.type` | Service type | `ClusterIP` |
| `service.port` | Service port | `5520` |
| `service.nodePort` | NodePort | `null` |

### Resources

| Parameter | Description | Default |
|-----------|-------------|---------|
| `resources.requests.cpu` | CPU request | `1000m` |
| `resources.requests.memory` | Memory request | `4Gi` |
| `resources.limits.cpu` | CPU limit | `4000m` |
| `resources.limits.memory` | Memory limit | `8Gi` |

## Authentication Options

### Option 1: Interactive (Recommended for Initial Setup)

```bash
kubectl attach -it deployment/my-hytale
/auth login device
/auth persistence Encrypted
```

### Option 2: Values File

```yaml
auth:
  ownerName: "MyUsername"
  ownerUuid: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  sessionToken: "your-session-token"
  identityToken: "your-identity-token"
```

### Option 3: Existing Secret

```bash
# Create the secret
kubectl create secret generic hytale-auth \
  --from-literal=OWNER_NAME=MyUsername \
  --from-literal=OWNER_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
  --from-literal=SESSION_TOKEN=your-token \
  --from-literal=IDENTITY_TOKEN=your-jwt
```

```yaml
auth:
  existingSecret: "hytale-auth"
```

## Deployment Examples

### Development Server

```yaml
# dev-values.yaml
jvm:
  minMemory: "2G"
  maxMemory: "4G"

server:
  disableSentry: true
  authMode: "unauthenticated"

persistence:
  enabled: false

resources:
  requests:
    cpu: 500m
    memory: 2Gi
  limits:
    cpu: 2000m
    memory: 4Gi
```

```bash
helm install dev-server everhytale/hytale -f dev-values.yaml
```

### Production Server

```yaml
# prod-values.yaml
jvm:
  minMemory: "8G"
  maxMemory: "16G"

backup:
  enabled: true
  frequency: 15
  maxCount: 20

auth:
  existingSecret: "hytale-auth-prod"

machineId:
  mountFromHost: true

service:
  type: LoadBalancer
  externalTrafficPolicy: Local

persistence:
  enabled: true
  size: 50Gi
  storageClass: "fast-ssd"

resources:
  requests:
    cpu: 2000m
    memory: 8Gi
  limits:
    cpu: 8000m
    memory: 16Gi

nodeSelector:
  node-type: gaming
```

```bash
helm install prod-server everhytale/hytale -f prod-values.yaml
```

### With Gateway API (UDPRoute)

```yaml
# gateway-values.yaml
service:
  type: ClusterIP

udpRoute:
  enabled: true
  parentRefs:
    - name: main-gateway
      namespace: gateway-system
      sectionName: hytale-udp
```

## Exposing the Server

### LoadBalancer (Cloud Providers)

```yaml
service:
  type: LoadBalancer
  externalTrafficPolicy: Local
```

### NodePort

```yaml
service:
  type: NodePort
  nodePort: 30520
```

### Gateway API

```yaml
udpRoute:
  enabled: true
  parentRefs:
    - name: my-gateway
      namespace: gateway-system
```

## Management Commands

### View Logs

```bash
kubectl logs -l app.kubernetes.io/name=hytale -f
```

### Access Console

```bash
kubectl attach -it deployment/my-hytale
```

### Check Status

```bash
kubectl get pods -l app.kubernetes.io/name=hytale
kubectl describe pod -l app.kubernetes.io/name=hytale
```

### Upgrade

```bash
helm upgrade my-hytale everhytale/hytale -f values.yaml
```

### Uninstall

```bash
helm uninstall my-hytale
```

:::caution
The PVC is not deleted automatically. To remove data:
```bash
kubectl delete pvc my-hytale
```
:::

## Troubleshooting

### Pod Fails to Start

```bash
kubectl describe pod -l app.kubernetes.io/name=hytale
kubectl logs -l app.kubernetes.io/name=hytale --previous
```

### Memory Issues

Ensure JVM memory matches resource limits:

```yaml
jvm:
  maxMemory: "8G"
resources:
  limits:
    memory: 10Gi  # Slightly more than maxMemory
```

### Cannot Attach to Console

Enable console access:

```yaml
console:
  tty: true
  stdin: true
```

### Authentication Fails

Mount machine-id for encrypted persistence:

```yaml
machineId:
  mountFromHost: true
```

## Next Steps

- [Installing Plugins](/guides/getting-started/) - Add EverEssentials
- [Docker Compose](/infrastructure/docker-compose/) - Simpler alternative
