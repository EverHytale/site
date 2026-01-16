---
title: FAQ
description: Frequently asked questions about EverHytale plugins
---

## General Questions

### What is EverHytale?

EverHytale is a collection of open-source plugins for Hytale servers. Our goal is to provide essential tools for server administrators.

### Is EverHytale free?

Yes! All EverHytale plugins are completely free and open source under the MIT license.

### Which Hytale version is supported?

EverHytale plugins are built for the current Hytale server version (2026.01.x). We update our plugins as new versions are released.

## Installation

### Where do I put the plugin files?

Place the `.jar` files in your server's `mods/` folder.

### Do I need to configure anything?

Most features work out of the box. Advanced configuration options are available in the config files.

### The plugin isn't loading, what should I do?

1. Check that you're using Java 21 or higher
2. Verify the JAR file is in the correct folder
3. Check server logs for error messages
4. Ensure you have the correct Hytale server version

## EverEssentials

### How do I open the admin panel?

Use the `/admin` command in-game.

### Can I customize the permissions?

Yes, EverEssentials uses Hytale's native permission system. Configure permissions in your server's permissions file.

### Why can't I kick/ban a player?

Make sure you have the required permissions:
- `everessentials.admin.kick` for kicking
- `everessentials.admin.ban` for banning

### The player list is empty

The player list only shows currently online players. Use the refresh button to update the list.

## Development

### Can I contribute to EverHytale?

Absolutely! Check out our [Contributing Guide](/docs/development/contributing/) to get started.

### Where can I find the source code?

All our code is available on [GitHub](https://github.com/everhytale).

### How do I report a bug?

Open an issue on the relevant GitHub repository with:
- Steps to reproduce
- Expected vs actual behavior
- Server version and logs

## Community

### Is there a Discord server?

Yes! Join us at [discord.gg/aDdR2nN9](https://discord.gg/aDdR2nN9).

### How can I get help?

- Check this documentation
- Search existing GitHub issues
- Ask on our Discord server
- Open a new GitHub issue
