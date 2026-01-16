---
title: Contributing
description: How to contribute to EverHytale plugins
---

We welcome contributions from the community! Here's how you can help.

## Getting Started

### Prerequisites

- Java 21 or higher
- Gradle 9.x
- Git
- A Hytale server for testing

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/everessentials.git
cd everessentials
```

3. Set up the Hytale server JAR:

```bash
# Copy HytaleServer.jar to libs/
cp /path/to/HytaleServer.jar libs/
```

4. Build the project:

```bash
./gradlew build
```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring

### Coding Standards

- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public APIs
- Keep methods focused and concise

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add player teleportation command
fix: resolve null pointer in admin page
docs: update API documentation
```

## Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Test thoroughly on a local server
4. Update documentation if needed
5. Submit a pull request

### PR Checklist

- [ ] Code compiles without errors
- [ ] New features are documented
- [ ] Existing tests pass
- [ ] Changes are tested locally
- [ ] Commit messages are clear

## Reporting Issues

When reporting bugs, please include:

- Hytale server version
- Plugin version
- Steps to reproduce
- Expected vs actual behavior
- Error logs if applicable

## Feature Requests

We're open to feature requests! Please:

1. Check if the feature already exists or is planned
2. Open an issue with the `enhancement` label
3. Describe the feature and its use case
4. Be patient - we'll review all suggestions

## Community

- **Discord**: [discord.gg/aDdR2nN9](https://discord.gg/aDdR2nN9)
- **GitHub Discussions**: For questions and ideas

Thank you for contributing to EverHytale!
