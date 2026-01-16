---
title: UI System
description: Understanding the EverEssentials UI system
---

EverEssentials uses Hytale's native UI system to provide interactive administration panels.

## Architecture

### InteractiveCustomUIPage

The admin panel extends `InteractiveCustomUIPage`, which provides:

- Page lifecycle management
- Event handling for user interactions
- Data binding with codecs

```java
public class AdminPage extends InteractiveCustomUIPage<AdminPage.AdminEventData> {
    // ...
}
```

### UI Components

The admin panel consists of several UI elements:

| Element | Description |
|---------|-------------|
| `#PlayerList` | Container for player buttons |
| `#PlayerButton` | Individual player selection button |
| `#SelectedPlayerName` | Display for selected player's name |
| `#SelectedPlayerUUID` | Display for selected player's UUID |
| `#SelectedPlayerWorld` | Display for selected player's world |
| `#SelectedPlayerPosition` | Display for selected player's coordinates |

### Action Buttons

| Button ID | Action |
|-----------|--------|
| `#TeleportToButton` | Teleport to selected player |
| `#TeleportHereButton` | Teleport player to you |
| `#KickButton` | Kick selected player |
| `#BanButton` | Ban selected player |
| `#RefreshButton` | Refresh player list |

## Event Handling

### Event Data Structure

```java
public static class AdminEventData {
    public String action;
    public String targetUuid;
    public String targetName;
}
```

### Event Codec

Events are serialized using a `BuilderCodec`:

```java
public static final BuilderCodec<AdminEventData> EVENT_CODEC = 
    BuilderCodec.builder(AdminEventData.class, AdminEventData::new)
        .addField(new KeyedCodec<>("Action", Codec.STRING), 
            (e, v) -> e.action = v, e -> e.action)
        .addField(new KeyedCodec<>("TargetUuid", Codec.STRING), 
            (e, v) -> e.targetUuid = v, e -> e.targetUuid)
        .addField(new KeyedCodec<>("TargetName", Codec.STRING), 
            (e, v) -> e.targetName = v, e -> e.targetName)
        .build();
```

### Supported Actions

| Action | Description |
|--------|-------------|
| `select` | Select a player from the list |
| `teleport_to` | Teleport to selected player |
| `teleport_here` | Teleport selected player to you |
| `kick` | Kick selected player |
| `ban` | Ban selected player |
| `refresh` | Refresh the player list |

## Creating Custom Pages

To create your own admin pages:

1. Create a new class extending `InteractiveCustomUIPage`
2. Define your event data class and codec
3. Implement `build()` to construct the UI
4. Implement `handleDataEvent()` to process events

```java
public class CustomPage extends InteractiveCustomUIPage<CustomPage.EventData> {
    
    @Override
    public void build(...) {
        commandBuilder.append("Pages/CustomPage.ui");
        // Add your UI logic
    }
    
    @Override
    public void handleDataEvent(...) {
        // Handle your events
    }
}
```

## Best Practices

1. **Rebuild on changes**: Call `rebuild()` after state changes to update the UI
2. **Validate player references**: Always check if players are still online
3. **Use proper error messages**: Inform users when actions fail
4. **Close pages appropriately**: Call `close()` after actions that dismiss the UI
