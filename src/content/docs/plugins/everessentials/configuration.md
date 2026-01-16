---
title: Configuration
description: Configuration reference for EverEssentials
---

EverEssentials uses a JSON configuration file located at `mods/EverHytale_EverEssentials/config.json`.

## Configuration File

```json
{
  "configVersion": 1,
  "logLevel": "info",
  "defaultLocale": "en",
  "storage": {
    "type": "json",
    "json": {
      "path": "data"
    },
    "h2": {
      "filename": "everessentials"
    },
    "sql": {
      "host": "localhost",
      "port": 3306,
      "database": "everessentials",
      "username": "root",
      "password": ""
    }
  },
  "homes": {
    "sethomeMultiple": {
      "default": 3,
      "vip": 5,
      "staff": 10
    },
    "spawnIfNoHome": true
  }
}
```

---

## General Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `configVersion` | integer | `1` | Internal version for config migrations. Do not modify. |
| `logLevel` | string | `"info"` | Log level: `debug`, `info`, `warn`, `error` |
| `defaultLocale` | string | `"en"` | Default language for messages: `en`, `fr` |

---

## Storage Configuration

EverEssentials supports multiple storage backends for player data.

### Storage Type

| Option | Description |
|--------|-------------|
| `json` | File-based storage (default). Each player has a separate JSON file. |
| `h2` | Embedded H2 database. Good for single-server setups. |
| `mysql` | MySQL/MariaDB database. Recommended for multi-server setups. |
| `postgresql` | PostgreSQL database. Alternative for multi-server setups. |

### JSON Storage

```json
"storage": {
  "type": "json",
  "json": {
    "path": "data"
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `path` | `"data"` | Folder name for player data files (relative to plugin folder) |

Player data files are stored as `data/players/<uuid>.json`.

### H2 Storage

```json
"storage": {
  "type": "h2",
  "h2": {
    "filename": "everessentials"
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `filename` | `"everessentials"` | Database filename (without extension) |

### SQL Storage (MySQL/PostgreSQL)

```json
"storage": {
  "type": "mysql",
  "sql": {
    "host": "localhost",
    "port": 3306,
    "database": "everessentials",
    "username": "root",
    "password": "secret"
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `host` | `"localhost"` | Database server hostname |
| `port` | `3306` | Database server port (3306 for MySQL, 5432 for PostgreSQL) |
| `database` | `"everessentials"` | Database name |
| `username` | `"root"` | Database username |
| `password` | `""` | Database password |

---

## Home Configuration

### sethomeMultiple

Defines home limits for different permission ranks.

```json
"homes": {
  "sethomeMultiple": {
    "default": 3,
    "vip": 5,
    "staff": 10
  }
}
```

| Rank | Permission | Default Limit |
|------|------------|---------------|
| `default` | `everessentials.sethome.multiple` | 3 |
| `vip` | `everessentials.sethome.multiple.vip` | 5 |
| `staff` | `everessentials.sethome.multiple.staff` | 10 |

You can add custom ranks by adding entries to the map and giving players the corresponding permission.

**Example**: Adding a `donor` rank with 7 homes:

```json
"sethomeMultiple": {
  "default": 3,
  "vip": 5,
  "donor": 7,
  "staff": 10
}
```

Then give players the permission `everessentials.sethome.multiple.donor`.

:::tip
Players with `everessentials.sethome.multiple.unlimited` bypass all limits.
:::

### spawnIfNoHome

```json
"homes": {
  "spawnIfNoHome": true
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `spawnIfNoHome` | boolean | `true` | If `true`, players without homes are teleported to spawn when using `/home`. If `false`, they receive an error message. |

---

## Localization

EverEssentials supports multiple languages. Message files are located in:

```
mods/EverHytale_EverEssentials/
├── messages_en.json
└── messages_fr.json
```

The `defaultLocale` setting determines which language file is used as fallback. When possible, the plugin uses the player's client language.

### Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `fr` | French |

### Message Format

Messages support rich text formatting using XML-like tags:

```json
{
  "home": {
    "teleport": "<green>Teleported to home <gold>{name}</gold>!</green>",
    "set": "<green>Home <gold>{name}</gold> set!</green>"
  }
}
```

Available colors: `red`, `green`, `blue`, `yellow`, `gold`, `aqua`, `white`, `gray`, `dark_red`, `dark_green`, etc.

---

## Configuration Migration

When the plugin detects an outdated configuration version, it automatically migrates your settings to the latest format while preserving your customizations.

:::note
Always backup your configuration before updating the plugin.
:::
