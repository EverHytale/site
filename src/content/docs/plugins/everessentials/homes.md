---
title: Home System
description: Understanding the home system in EverEssentials
---

The home system allows players to save locations and teleport back to them instantly. This guide explains how the system works and how to use it effectively.

## Overview

A **home** is a saved location in the world that a player can teleport to at any time. Each home stores:

- **World**: The world/dimension the home is in
- **Position**: X, Y, Z coordinates
- **Look Direction**: Pitch (up/down) and Yaw (left/right) rotation

When you teleport to a home, you will be placed at the exact position and facing the same direction as when you set the home.

---

## Quick Start

### Setting Your First Home

Stand where you want your home to be and run:

```
/sethome
```

This creates a home named "home" (the default name).

### Teleporting Home

```
/home
```

This teleports you to your default home.

### Multiple Homes

If you have permission for multiple homes, you can name them:

```
/sethome base
/sethome farm
/sethome mine
```

Then teleport to any of them:

```
/home base
/home farm
/home mine
```

---

## Commands Summary

| Command | Description |
|---------|-------------|
| `/home` | Teleport to your default home |
| `/home <name>` | Teleport to a specific home |
| `/homes` | List all your homes |
| `/sethome` | Set a home at your location (default name) |
| `/sethome <name>` | Set a named home at your location |
| `/delhome <name>` | Delete a specific home |
| `/delhome *` | Delete all your homes |
| `/renamehome <old> <new>` | Rename an existing home |

---

## Home Limits

The number of homes you can have depends on your permissions:

| Permission | Homes |
|------------|-------|
| `everessentials.sethome` only | 1 |
| `+ everessentials.sethome.multiple` | 3 (default) |
| `+ everessentials.sethome.multiple.vip` | 5 |
| `+ everessentials.sethome.multiple.staff` | 10 |
| `+ everessentials.sethome.multiple.unlimited` | Unlimited |

:::tip
If you have multiple rank permissions, the highest limit applies.
:::

---

## Home Names

### Valid Names

Home names can contain:
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscores (_)
- Hyphens (-)

Examples of valid names: `home`, `base`, `farm_1`, `my-house`, `123`

### Invalid Names

- Empty or blank names
- Names containing spaces (`my home` ❌)
- Names containing colons (`player:home` ❌ - reserved for admin syntax)
- The reserved name `bed` (reserved for bed respawn)

---

## No Home Behavior

When you use `/home` without having any homes set, the behavior depends on the server configuration:

### If `spawnIfNoHome` is enabled (default)

You will be teleported to the world spawn point with a message:

> No home set, teleporting to spawn...

### If `spawnIfNoHome` is disabled

You will receive an error message:

> You don't have any homes set.

---

## Updating a Home

If you set a home with a name that already exists, the old location is replaced:

```
/sethome base
```

> Home **base** has been updated!

This is useful for moving your base to a new location without deleting and recreating the home.

---

## Data Storage

Your homes are saved automatically when:

- You set, delete, or rename a home
- You disconnect from the server
- The server shuts down

Homes persist across server restarts and are tied to your player UUID.

### Storage Location

Depending on the server configuration:

| Storage Type | Location |
|--------------|----------|
| JSON (default) | `mods/EverHytale_EverEssentials/data/players/<uuid>.json` |
| H2 | `mods/EverHytale_EverEssentials/everessentials.mv.db` |
| MySQL/PostgreSQL | Remote database |

---

## Admin Features

Server administrators can manage other players' homes.

### Viewing Other Players' Homes

```
/homes <player>
```

**Permission**: `everessentials.homes.others`

### Teleporting to Other Players' Homes

```
/home <player>:<homename>
```

**Permission**: `everessentials.home.others`

### Managing Other Players' Homes

```
/sethome <player>:<homename>
/delhome <player>:<homename>
/renamehome <player>:<oldname> <newname>
```

**Permissions**: `everessentials.sethome.others`, `everessentials.delhome.others`, `everessentials.renamehome.others`

---

## Tips & Best Practices

1. **Name your homes descriptively**: Use names like `farm`, `mine`, `nether_portal` instead of `1`, `2`, `3`

2. **Face the right direction**: When setting a home, face the direction you want to be looking when you teleport back

3. **Set homes in safe locations**: Avoid setting homes in water, lava, or areas where you might fall

4. **Use /homes to check your limit**: The `/homes` command shows how many homes you have and your maximum

5. **Rename instead of delete**: If you want to change a home name, use `/renamehome` to preserve the location
