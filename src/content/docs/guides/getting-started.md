---
title: Getting Started
description: Guide to install and configure EverHytale plugins on your Hytale server
---

## Prerequisites

Before installing EverHytale plugins, make sure you have:

- A working Hytale server
- Java 21 or higher
- Gradle 9.x for compilation (if building from source)

## Installation

### From Releases

1. Download the latest version of the plugin from the [GitHub releases](https://github.com/everhytale/everessentials/releases)
2. Place the `.jar` file in your server's `mods/` folder
3. Restart your server

### From Source

```bash
# Clone the repository
git clone https://github.com/everhytale/everessentials.git
cd everessentials

# Build with Gradle
./gradlew build

# The JAR file will be in build/libs/
```

## Configuration

EverHytale plugins are designed to work with minimal configuration. Most features are available immediately after installation.

### Directory Structure

```
server/
├── mods/
│   └── EverEssentials.jar
├── config/
│   └── everhytale/
│       └── everessentials.json
└── ...
```

## First Steps

Once the plugin is installed, you can:

1. Use the `/admin` command to open the administration panel
2. Manage connected players through the graphical interface
3. Perform teleportations, kicks, and bans

## Next Steps

- Check out the [EverEssentials](/plugins/everessentials/overview/) documentation to discover all features
- Learn to use the [Development API](/development/api/) to create your own extensions
