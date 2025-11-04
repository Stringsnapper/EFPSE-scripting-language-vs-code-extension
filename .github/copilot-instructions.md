# VS Code Extension for Easy FPS Editor

## Project Overview
This is a VS Code extension that provides comprehensive language support for Easy FPS Editor scripting language (.script and .states files).

## Features Implemented
- ✅ Syntax highlighting for Easy FPS Editor script syntax
- ✅ IntelliSense with code completion for commands, procedures, and variables
- ✅ Linting for common syntax errors (duplicate procedures, unclosed procedures, variable naming)
- ✅ Support for .script, .state, and .states file extensions
- ✅ Code snippets for procedures and control structures
- ✅ Context-aware completions for .script vs .states files
- ✅ FSM-specific linting (whitespace detection, frame delays, best practices)
- ✅ Complete command set from official documentation
- ✅ FSM-specific snippets (state, frame, frameset, image, sound)

## Language Syntax Rules

### Script Files (.script)
- Procedures defined with `procedure <name>` and end with `end`
- Variables prefixed with `$` (e.g., `$map.playerx`, `$global.speed`)
- Commands: player, entity, door, sound, hud, status, give, take, call, return, map, light, shader
- Control flow: if/else conditions
- Math operators: +, -, *, /, =, +=, -=, *=, /=, ++, --
- Functions: RANDOM, SQRT, ABS, SIN, COS, CEIL, FLOOR, ROUND, MIN, MAX, etc.
- Comments start with `//`

### FSM Files (.state)
- **CRITICAL**: No leading whitespace allowed (will break FSM!)
- State definitions: `state <NAME> <NEXT> <INTERPOLATE>`
- Frame definitions: `frame <INDEX> <DELAY> <OFFSETX> <OFFSETY> <OFFSETZ> <ACTION>`
- Actions: NONE, READY, ATTACK, SOUND, JUMPIFEQUALS, INCREMENT, etc.
- States: IDLE, ATTACK, RELOAD, DEATH, CHASE, FLEE, etc.
- First frame should use NONE action (engine bug workaround)
- Frame delays ≥ 0.01 recommended

## Documentation Sources
- [Easy FPS Editor Scripting](https://pixelwolf.net/efpse/wiki/index.php/Scripting)
- [Easy FPS Editor FSM](https://pixelwolf.net/efpse/wiki/index.php/FSM)
- [Easy FPS Editor Wiki](https://pixelwolf.net/efpse/wiki/index.php/Main_Page)
- [EFPSE Dev Builds](https://github.com/CG8516/DumpingGround/tree/main/EFPSE_DEVBUILDS)

## Testing
Press F5 to launch the Extension Development Host and test the extension with Easy FPS Editor script files.

## Development Guidelines
- TypeScript is used for all extension code
- Syntax highlighting uses TextMate grammar (syntaxes/efpss.tmLanguage.json)
- Language configuration provides bracket matching and auto-closing pairs
- Extension activates automatically when .script or .state files are opened
- Separate linting logic for .script vs .state files
- Context-aware IntelliSense based on file type
