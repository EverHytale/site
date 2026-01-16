---
title: EverEssentials - Overview
description: Essential administration plugin for Hytale servers
---

EverEssentials is the main administration plugin of the EverHytale project. It provides a comprehensive set of tools to manage your Hytale server.

## Features

### Home System

A complete home teleportation system:

- **Multiple Homes**: Players can set multiple named homes based on their permissions
- **Direction Saving**: Homes save the player's look direction (pitch and yaw)
- **Spawn Fallback**: Players without homes can be teleported to spawn
- **Admin Management**: Administrators can manage other players' homes

See the [Home System](/plugins/everessentials/homes) guide for details.

### Interactive Admin Panel

A modern and intuitive user interface to manage your players:

- **Player List**: View all connected players in real-time
- **Detailed Information**: UUID, world, position, player language
- **Quick Actions**: Teleportation, kick, ban with one click

### Player Management

- **Teleport to Player**: Instantly teleport to any player
- **Teleport Player Here**: Bring a player to your location
- **Kick**: Remove a player from the server
- **Ban**: Ban a player (with ban system integration)

### Flexible Storage

Multiple storage backends supported:

- **JSON**: File-based storage (default)
- **H2**: Embedded database
- **MySQL/PostgreSQL**: Remote database for multi-server setups

### Internationalization

Built-in support for multiple languages:

- English (en)
- French (fr)
- Automatic detection of player's client language

---

## Quick Links

| Page | Description |
|------|-------------|
| [Commands](/plugins/everessentials/commands) | Complete command reference |
| [Permissions](/plugins/everessentials/permissions) | Permission nodes reference |
| [Configuration](/plugins/everessentials/configuration) | Configuration file reference |
| [Home System](/plugins/everessentials/homes) | Detailed home system guide |
| [UI System](/plugins/everessentials/ui-system) | Custom UI framework |

---

## Installation

1. Download the latest `EverEssentials.jar` from the releases page
2. Place it in your server's `mods/` folder
3. Start the server to generate the default configuration
4. Edit `mods/EverHytale_EverEssentials/config.json` as needed
5. Restart the server or use `/reload`

---

## Architecture

The plugin is structured into several components:

```
fr.everhytale.everessentials/
├── EverEssentialsPlugin.java    # Plugin entry point
├── commands/
│   └── home/                    # Home commands
│       ├── HomeCommand.java
│       ├── HomesCommand.java
│       ├── SetHomeCommand.java
│       ├── DelHomeCommand.java
│       └── RenameHomeCommand.java
├── config/
│   └── EssentialsConfig.java    # Configuration management
├── homes/
│   ├── Home.java                # Home data model
│   ├── HomeLocation.java        # Location with rotation
│   └── HomeManager.java         # Home operations
├── player/
│   ├── EssentialsPlayer.java    # Player wrapper
│   ├── PlayerData.java          # Persistent player data
│   └── PlayerManager.java       # Player data management
```

---

## Dependencies

- **Hytale Server**: 2026.01.x or later
- **Java**: 21+
- **EverCore**: Core library (bundled)

---

## Support

- **GitHub Issues**: Report bugs and request features
- **Discord**: Join the EverHytale community
