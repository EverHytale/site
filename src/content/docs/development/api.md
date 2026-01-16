---
title: API Reference
description: Developer API for EverHytale plugins
---

## Overview

EverHytale plugins expose APIs that allow you to extend functionality and integrate with other plugins.

## EverEssentials API

### Plugin Instance

```java
// Get the plugin instance
EverEssentialsPlugin plugin = EverEssentialsPlugin.getInstance();
```

### Command Registration

EverEssentials uses the native Hytale command system:

```java
public class EverEssentialsPlugin extends JavaPlugin {
    @Override
    protected void setup() {
        this.getCommandRegistry().registerCommand(new YourCommand());
    }
}
```

### Custom UI Pages

Create custom admin pages by extending `InteractiveCustomUIPage`:

```java
public class YourCustomPage extends InteractiveCustomUIPage<YourEventData> {
    
    public YourCustomPage(@Nonnull PlayerRef playerRef) {
        super(playerRef, CustomPageLifetime.CanDismiss, EVENT_CODEC);
    }
    
    @Override
    public void build(@Nonnull Ref<EntityStore> ref,
                     @Nonnull UICommandBuilder commandBuilder,
                     @Nonnull UIEventBuilder eventBuilder,
                     @Nonnull Store<EntityStore> store) {
        // Build your UI here
        commandBuilder.append("Pages/YourPage.ui");
    }
    
    @Override
    public void handleDataEvent(@Nonnull Ref<EntityStore> ref,
                               @Nonnull Store<EntityStore> store,
                               @Nonnull YourEventData data) {
        // Handle UI events here
    }
}
```

### Player Management

```java
// Get all online players
List<PlayerRef> players = Universe.get().getPlayers();

// Get a specific player by UUID
PlayerRef player = Universe.get().getPlayer(uuid);

// Send a message to a player
player.sendMessage(Message.raw("§aHello!"));

// Disconnect a player
player.getPacketHandler().disconnect("Reason");
```

### Teleportation

```java
// Get player transform
TransformComponent transform = store.getComponent(ref, TransformComponent.getComponentType());
Vector3d position = transform.getPosition();

// Teleport a player
Teleport teleport = new Teleport(world, targetPosition, targetRotation);
store.addComponent(ref, Teleport.getComponentType(), teleport);
```

## Event Handling

### UI Event Codecs

Define codecs for UI event data:

```java
public static final BuilderCodec<YourEventData> EVENT_CODEC = 
    BuilderCodec.builder(YourEventData.class, YourEventData::new)
        .addField(new KeyedCodec<>("Action", Codec.STRING), 
            (e, v) -> e.action = v, e -> e.action)
        .build();
```

## Best Practices

1. **Use proper null checks** - Always validate player references before operations
2. **Handle disconnected players** - Players may disconnect during operations
3. **Respect permissions** - Check player permissions before sensitive actions
4. **Clean up resources** - Close UI pages and release resources properly
