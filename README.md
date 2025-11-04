# Easy FPS Editor Language Support

Comprehensive language support extension for Easy FPS Editor script files (.script and .state files).

## Features

- **Syntax Highlighting**: Full syntax highlighting for Easy FPS Editor scripting language and FSM (Finite State Machine) files
- **IntelliSense**: Context-aware auto-completion for commands, keywords, functions, FSM actions, and states
- **Linting**: Real-time error detection for common syntax issues including:
  - Duplicate procedure names
  - Unclosed procedures
  - Leading whitespace (critical FSM error)
  - Frame delay warnings
  - Variable naming conventions
- **Code Snippets**: Quick snippets for procedures and control flow statements
- **Dual Language Support**: Separate features for `.script` (scripting) and `.state` (FSM) files

## Supported File Types

- `.script` - Script files for game logic, cutscenes, triggers, and terminals
- `.state` - FSM (Finite State Machine) files for weapons, enemies, and decorations

## Language Features

### Script Commands (.script files)
**Generic**: auto, timeout, call, pause, halt, keeptrigger  
**Map**: map, next, return, quickreturn, goto, start  
**Player**: player, heal, hurt, teleport, move, rotation, retro, turn, check, speed, zoom, velocity  
**Entity**: entity, delete, spawnat, spawnatpos  
**Door**: door, open, close, lock, unlock  
**Light**: light, create, status, offset, flashlight, ambient, sun  
**Inventory**: give, take, weapon, key  
**Visual**: cursor, shader, hud, image, text, font  
**Cutscene**: vn, show, bg, hide, play, stop, music, video, button, label

### FSM Actions (.state files)
**Basic**: image, sound, state, frame, frameset, NONE, READY, SOUND, ATTACK, RELOAD  
**Math**: INCREMENT, DECREMENT, MULTIPLY, DIVIDE, MODULO, CLAMP  
**Jumps**: JUMPIFEQUALS, JUMPIFGREATER, JUMPIFLESS, JUMPIFNOAMMO, JUMPIFHPLESS  
**Effects**: PARTICLES, CUSTOMPARTICLE, EXPLOSION, PROJECTILE, MUZZLEFLASH  
**Advanced**: SETVAR, MODELTEXTURE, SPAWN, HUDIMG, CAMSPEED, ZOOM

### FSM States
IDLE, ATTACK, RELOAD, DEATH, DEAD, SEE, CHASE, FLEE, HURT, DRAW, HOLSTER, ALTATTACK, XDEATH

### Keywords
procedure, end, if, else, call, return

### Functions
**Math**: RANDOM, SQRT, ABS, CEIL, FLOOR, ROUND, MIN, MAX, CLAMP, POWER  
**Trigonometry**: SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2  
**Special**: LASTDAMAGE, HP, MAXHP, AMMO, MAGAMMO

### Variables
Variables are prefixed with `$` and use namespaces:
- `$map.*` - Map-specific variables (cleared between maps)
- `$global.*` - Global variables (persist across maps)
- Local variables - Available only within current script

## Usage

### Installation

**Option 1: Development Mode (Testing)**
1. Open this extension folder in VS Code
2. Press **F5** to launch Extension Development Host
3. The extension will be active in the new window
4. Open any `.script` or `.state` file to test

**Option 2: Local Installation (Production Use)**
1. Copy the entire `VSCodeExtension` folder to your VS Code extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`
   - **macOS/Linux**: `~/.vscode/extensions/`
2. Restart VS Code
3. The extension will be active for all `.script` and `.state` files

**Option 3: Symlink (Recommended for Development)**
```powershell
# Windows (PowerShell - Run as Administrator)
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.vscode\extensions\easy-fps-editor-language-support" -Target "C:\Users\jolle\repos\EasyFPSEditor_CE\VSCodeExtension"
```

```bash
# macOS/Linux
ln -s /path/to/EasyFPSEditor_CE/VSCodeExtension ~/.vscode/extensions/easy-fps-editor-language-support
```

### Using the Extension

1. Open any `.script` or `.state` file
2. Start typing to see context-aware IntelliSense suggestions
3. Use snippets by typing `procedure` or `if` and pressing Tab
4. Linting errors and warnings will appear automatically in real-time

## Best Practices (Enforced by Linter)

### FSM Files (.state)
- **CRITICAL**: No leading whitespace! Lines must start at column 0
- First frame of each state should use NONE action (engine bug workaround)
- Frame delays should be ≥ 0.01 (lower values cause frame skipping)
- Load images/sounds at the beginning of the file

### Script Files (.script)
- Use `$map.` prefix for map-scoped variables
- Use `$global.` prefix for game-wide variables
- All procedures must end with `end` keyword
- Place procedures at the beginning of the script

## Testing the Extension

Press **F5** to open a new Extension Development Host window where you can test the extension with your Easy FPS Editor script files.

## Requirements

- VS Code 1.105.0 or higher

## Documentation Sources

This extension is based on the official Easy FPS Editor documentation:
- [Scripting Documentation](https://pixelwolf.net/efpse/wiki/index.php/Scripting)
- [FSM Documentation](https://pixelwolf.net/efpse/wiki/index.php/FSM)
- [Easy FPS Editor Wiki](https://pixelwolf.net/efpse/wiki/index.php/Main_Page)

## Known Issues

None at this time. Please report issues on the project repository.

## Release Notes

### 0.0.2

Extended release with:
- Complete command set from official documentation
- FSM-specific syntax highlighting and IntelliSense
- Enhanced linting for FSM best practices
- Context-aware completions for .script vs .state files
- All trigonometric and math functions
- FSM state constants

### 0.0.1

Initial release with:
- Basic syntax highlighting
- IntelliSense completion
- Basic linting for procedure structure and variable naming conventions
