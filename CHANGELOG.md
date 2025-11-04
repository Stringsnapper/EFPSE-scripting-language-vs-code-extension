# Change Log

All notable changes to the "easy-fps-editor-language-support" extension will be documented in this file.

## [0.0.3] - 2025-11-04

### Fixed
- **Critical**: Added support for `.states` file extension (the actual FSM file extension used by EFPSE)
- Fixed syntax highlighting not working in FSM files
- FSM files now properly detected for context-aware IntelliSense

### Added
- FSM-specific code snippets: `state`, `frame`, `frameset`, `image`, `sound`
- Better keyword highlighting for FSM commands (image, sound, state, frame, frameset)
- Improved TextMate scopes for better theme colorization:
  - Separate scopes for `$global.*` and `$map.*` variables
  - Different scopes for procedure definitions vs calls
  - Distinct scopes for FSM actions and states
  - Commands now use `support.function.builtin` for consistent coloring
- Documentation for customizing colors in settings.json

### Changed
- Improved operator precedence in syntax highlighting (++, --, +=, etc.)
- Better variable pattern matching with clearer scope hierarchy

## [0.0.2] - 2025-11-04

### Added
- Complete command set from official Easy FPS Editor documentation
- FSM-specific syntax highlighting for .state files
- Context-aware IntelliSense (different completions for .script vs .state files)
- FSM Actions: NONE, READY, SOUND, ATTACK, JUMPIFEQUALS, INCREMENT, DECREMENT, etc.
- FSM States: IDLE, DEATH, DRAW, HOLSTER, ATTACK, ALTATTACK, RELOAD, SEE, CHASE, FLEE, HURT
- All trigonometric functions: SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2
- Additional math functions: POWER, CLAMP
- Special functions: LASTDAMAGE, HP, MAXHP, AMMO, MAGAMMO
- Script commands: auto, timeout, pause, halt, keeptrigger, shader, light, vn, cutscene commands
- Enhanced linting for FSM files:
  - **Critical**: Detection of leading whitespace (breaks FSM)
  - Frame delay validation (warns if < 0.01)
  - First frame NONE action recommendation
  - Image/sound loading detection
- Improved variable name validation
- Documentation links in README

### Changed
- Updated syntax highlighting grammar with comprehensive command coverage
- Improved IntelliSense to provide context-specific suggestions
- Enhanced linting with separate logic for .script and .state files
- Updated README with complete feature documentation

## [0.0.1] - Initial Release

### Added
- Basic syntax highlighting for Easy FPS Editor scripts
- IntelliSense with code completion
- Basic linting for procedures and variables
- Support for .script and .state file extensions