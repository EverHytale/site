---
title: Permissions
description: Complete permission reference for EverEssentials
---

EverEssentials uses Hytale's native permission system. This page lists all available permission nodes.

## Permission Structure

All EverEssentials permissions follow this pattern:

```
everessentials.<category>.<action>
```

## Wildcard Support

Hytale's permission system supports wildcards:

| Wildcard | Description |
|----------|-------------|
| `everessentials.*` | Grants all EverEssentials permissions |
| `everessentials.home.*` | Grants all home-related permissions |
| `everessentials.sethome.*` | Grants all sethome permissions |

---

## Home Permissions

| Permission | Description |
|------------|-------------|
| `everessentials.home` | Use the `/home` command |
| `everessentials.home.others` | Teleport to other players' homes |

---

## Homes (List) Permissions

| Permission | Description |
|------------|-------------|
| `everessentials.homes` | Use the `/homes` command |
| `everessentials.homes.others` | List other players' homes |

---

## SetHome Permissions

| Permission | Description |
|------------|-------------|
| `everessentials.sethome` | Use the `/sethome` command (1 home) |
| `everessentials.sethome.multiple` | Have multiple homes (uses default limit) |
| `everessentials.sethome.multiple.<rank>` | Have multiple homes with rank-specific limit |
| `everessentials.sethome.multiple.unlimited` | Unlimited homes |
| `everessentials.sethome.others` | Set homes for other players |

### Multi-Home Permission System

The multi-home system works as follows:

1. **Without `sethome.multiple`**: Player can only have 1 home
2. **With `sethome.multiple`**: Player can have homes up to the `default` limit (3 by default)
3. **With `sethome.multiple.<rank>`**: Player can have homes up to the rank-specific limit
4. **With `sethome.multiple.unlimited`**: Player has no home limit

:::tip
When a player has multiple rank permissions, the highest limit is used.
:::

---

## DelHome Permissions

| Permission | Description |
|------------|-------------|
| `everessentials.delhome` | Use the `/delhome` command |
| `everessentials.delhome.others` | Delete other players' homes |

---

## RenameHome Permissions

| Permission | Description |
|------------|-------------|
| `everessentials.renamehome` | Use the `/renamehome` command |
| `everessentials.renamehome.others` | Rename other players' homes |

---

## Example Permission Setup

### Regular Player

```yaml
permissions:
  - everessentials.home
  - everessentials.homes
  - everessentials.sethome
  - everessentials.delhome
  - everessentials.renamehome
```

### VIP Player

```yaml
permissions:
  - everessentials.home
  - everessentials.homes
  - everessentials.sethome
  - everessentials.sethome.multiple
  - everessentials.sethome.multiple.vip
  - everessentials.delhome
  - everessentials.renamehome
```

### Staff Member

```yaml
permissions:
  - everessentials.*
```

Or more granular:

```yaml
permissions:
  - everessentials.home.*
  - everessentials.homes.*
  - everessentials.sethome.*
  - everessentials.delhome.*
  - everessentials.renamehome.*
```
