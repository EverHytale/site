---
title: Commands
description: Complete command reference for EverEssentials
---

This page lists all available commands in EverEssentials.

## Home Commands

### /home

Teleport to one of your homes.

```
/home
/home <name>
```

| Argument | Description |
|----------|-------------|
| `name` | Optional. The name of the home to teleport to. If not specified, teleports to your default home. |

**Permission**: `everessentials.home`

:::tip
If you have no homes set and `spawnIfNoHome` is enabled in the configuration, you will be teleported to the world spawn point.
:::

---

### /homes

List all your homes.

```
/homes
```

**Permission**: `everessentials.homes`

---

### /sethome

Set a home at your current location.

```
/sethome
/sethome <name>
```

| Argument | Description |
|----------|-------------|
| `name` | Optional. The name for this home. If not specified, uses "home" as the default name. |

**Permission**: `everessentials.sethome`

:::note
The player's look direction (pitch and yaw) is saved with the home location. When teleporting back, you will face the same direction.
:::

---

### /delhome

Delete one or all of your homes.

```
/delhome <name>
/delhome *
```

| Argument | Description |
|----------|-------------|
| `name` | The name of the home to delete. Use `*` to delete all homes. |

**Permission**: `everessentials.delhome`

---

### /renamehome

Rename an existing home.

```
/renamehome <oldName> <newName>
```

| Argument | Description |
|----------|-------------|
| `oldName` | The current name of the home. |
| `newName` | The new name for the home. |

**Permission**: `everessentials.renamehome`

---

## Home Name Rules

When creating or renaming homes, the following rules apply:

- Names cannot be empty or blank
- Names cannot contain spaces
- Names cannot contain `:` (reserved for admin syntax)
- The name `bed` is reserved for the bed respawn system
- Names can be numeric (e.g., `1`, `2`, `3`)

---

## Admin Syntax

Administrators with the appropriate permissions can manage other players' homes using the `player:home` syntax:

```
/home player:homename
/homes player
/sethome player:homename
/delhome player:homename
/renamehome player:oldname newname
```

| Permission | Description |
|------------|-------------|
| `everessentials.home.others` | Teleport to other players' homes |
| `everessentials.homes.others` | List other players' homes |
| `everessentials.sethome.others` | Set homes for other players |
| `everessentials.delhome.others` | Delete other players' homes |
| `everessentials.renamehome.others` | Rename other players' homes |
