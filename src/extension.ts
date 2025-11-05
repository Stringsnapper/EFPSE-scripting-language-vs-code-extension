// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Language commands and keywords for scripting
const SCRIPT_COMMANDS = [
    // Generic commands
    'auto', 'timeout', 'call', 'pause', 'halt', 'keeptrigger',
    // Map commands
    'map', 'next', 'return', 'quickreturn', 'goto', 'start',
    // Player commands
    'player', 'heal', 'hurt', 'teleport', 'move', 'rotation', 'retro', 'turn',
    'check', 'speed', 'zoom', 'velocity', 'position', 'heldweapon', 'mag', 'ammo',
    // Entity commands
    'entity', 'delete', 'spawnat', 'spawnatpos',
    // Door commands
    'door', 'open', 'close', 'lock', 'unlock',
    // Light commands
    'light', 'create', 'status', 'offset', 'flashlight', 'ambient', 'sun',
    // Status and inventory
    'status', 'give', 'take', 'weapon', 'key',
    // Visual commands
    'cursor', 'shader', 'set', 'texture', 'bool', 'int', 'float', 'vec2', 'vec3', 'vec4',
    // Game commands
    'game', 'save', 'load', 'slot', 'quick',
    // Physics
    'gravity',
    // HUD
    'hud', 'image', 'autoscale', 'variable', 'text', 'font',
    // Cutscene commands
    'vn', 'preload', 'show', 'bg', 'hide', 'play', 'stop', 'music', 'video',
    'button', 'label', 'front', 'back', 'bind', 'unbind',
    // Settings
    'resolution'
];

// FSM commands for .state files
const FSM_COMMANDS = [
    'image', 'sound', 'state', 'frame', 'frameset',
    // FSM Actions
    'NONE', 'READY', 'SOUND', 'SOUNDANDATTACK', 'ATTACK',
    'PLAYERSPEED', 'PARTICLES', 'CUSTOMPARTICLE', 'PLAYERDISTANCE', 'PLAYERVISIBLE',
    'SETVAR', 'MODELTEXTURE', 'SPAWN', 'HUDIMG', 'CAMSPEED', 'CHECKPOS',
    'SETYAW', 'ADDYAW', 'ROTMODE', 'HEAL', 'HURT', 'SETHP',
    'EXPLOSION', 'PROJECTILE',
    // Math operations
    'INCREMENT', 'DECREMENT', 'MULTIPLY', 'DIVIDE', 'MODULO', 'CLAMP',
    // Jump conditions
    'JUMPIFEQUALS', 'JUMPIFNEQUALS', 'JUMPIFGEQUALS', 'JUMPIFLEQUALS',
    'JUMPIFGREATER', 'JUMPIFLESS', 'JUMPIFHPLESS',
    'JUMPIFLESSAMMO', 'JUMPIFNOAMMO', 'JUMPIFNOAMMOTOTAL',
    // Weapon-specific
    'GIVEAMMO', 'TAKEAMMO', 'SETAMMO', 'RELOAD', 'MUZZLEFLASH', 'SETSTAT', 'ZOOM'
];

// FSM States
const FSM_STATES = [
    'IDLE', 'DEATH', 'DEAD', 'DRAW', 'HOLSTER', 'ATTACK', 'ALTATTACK', 'RELOAD',
    'SEE', 'CHASE', 'FLEE', 'HURT', 'XDEATH'
];

const KEYWORDS = [
    'procedure', 'end', 'if', 'else', 'call', 'return'
];

const FUNCTIONS = [
    'RANDOM', 'SQRT', 'ABS', 'SIN', 'COS', 'TAN', 'ASIN', 'ACOS', 'ATAN', 'ATAN2',
    'CEIL', 'FLOOR', 'ROUND', 'POWER', 'CLAMP', 'MIN', 'MAX', 'LASTDAMAGE', 'HP', 'MAXHP', 'AMMO', 'MAGAMMO'
];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Easy FPS Editor Language Support is now active');

	// Register completion provider
	const completionProvider = vscode.languages.registerCompletionItemProvider(
		'efpss',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				const completions: vscode.CompletionItem[] = [];
				
				// Determine if we're in a .states/.state file or .script file
				const isStateFile = document.fileName.endsWith('.state') || document.fileName.endsWith('.states');

				// Command completions
				const commands = isStateFile ? FSM_COMMANDS : SCRIPT_COMMANDS;
				commands.forEach((cmd: string) => {
					const item = new vscode.CompletionItem(cmd, vscode.CompletionItemKind.Method);
					item.detail = isStateFile ? 'FSM Command' : 'EFPS Command';
					completions.push(item);
				});

				// FSM States for .state files
				if (isStateFile) {
					FSM_STATES.forEach((state: string) => {
						const item = new vscode.CompletionItem(state, vscode.CompletionItemKind.Constant);
						item.detail = 'FSM State';
						completions.push(item);
					});
				}

				// Keyword completions (for .script files)
				if (!isStateFile) {
					KEYWORDS.forEach((kw: string) => {
						const item = new vscode.CompletionItem(kw, vscode.CompletionItemKind.Keyword);
						item.detail = 'EFPS Keyword';
						completions.push(item);
					});
				}

				// Function completions
				FUNCTIONS.forEach((fn: string) => {
					const item = new vscode.CompletionItem(fn, vscode.CompletionItemKind.Function);
					item.detail = 'EFPS Function';
					if (fn === 'RANDOM' || fn === 'MIN' || fn === 'MAX') {
						item.insertText = new vscode.SnippetString(`${fn}($1,$2)`);
					} else {
						item.insertText = new vscode.SnippetString(`${fn}($1)`);
					}
					completions.push(item);
				});

				// Procedure snippet
				if (linePrefix.match(/^\s*proc/)) {
					const procItem = new vscode.CompletionItem('procedure', vscode.CompletionItemKind.Snippet);
					procItem.insertText = new vscode.SnippetString('procedure ${1:name}\n\t$0\nend');
					procItem.documentation = 'Create a new procedure';
					completions.push(procItem);
				}

				// If statement snippet
				if (linePrefix.match(/^\s*if/)) {
					const ifItem = new vscode.CompletionItem('if', vscode.CompletionItemKind.Snippet);
					ifItem.insertText = new vscode.SnippetString('if ${1:condition} {\n\t$0\n}');
					ifItem.documentation = 'Create an if statement';
					completions.push(ifItem);
				}

				// FSM-specific snippets
				if (isStateFile) {
					// State snippet
					if (linePrefix.match(/^\s*sta/)) {
						const stateItem = new vscode.CompletionItem('state', vscode.CompletionItemKind.Snippet);
						stateItem.insertText = new vscode.SnippetString('state ${1:IDLE} ${2:NONE} ${3:0}\nframe ${4:0} ${5:0.025} 0 0 0 NONE\n$0');
						stateItem.documentation = 'Create a new FSM state';
						completions.push(stateItem);
					}

					// Frame snippet
					if (linePrefix.match(/^\s*fra/)) {
						const frameItem = new vscode.CompletionItem('frame', vscode.CompletionItemKind.Snippet);
						frameItem.insertText = new vscode.SnippetString('frame ${1:0} ${2:0.025} ${3:0} ${4:0} ${5:0} ${6:NONE}');
						frameItem.documentation = 'Create a new frame';
						completions.push(frameItem);
					}

					// Frameset snippet
					if (linePrefix.match(/^\s*frame/)) {
						const framesetItem = new vscode.CompletionItem('frameset', vscode.CompletionItemKind.Snippet);
						framesetItem.insertText = new vscode.SnippetString('frameset ${1:0} ${2:10} ${3:0.025} ${4:0} ${5:0} ${6:0} ${7:NONE}');
						framesetItem.documentation = 'Create a frameset range';
						completions.push(framesetItem);
					}

					// Image load snippet
					if (linePrefix.match(/^\s*im/)) {
						const imageItem = new vscode.CompletionItem('image', vscode.CompletionItemKind.Snippet);
						imageItem.insertText = new vscode.SnippetString('image ${1:SpriteName} ${2:0} ${3:10}');
						imageItem.documentation = 'Load sprite images';
						completions.push(imageItem);
					}

					// Sound load snippet
					if (linePrefix.match(/^\s*so/)) {
						const soundItem = new vscode.CompletionItem('sound', vscode.CompletionItemKind.Snippet);
						soundItem.insertText = new vscode.SnippetString('sound ${1:SoundName}');
						soundItem.documentation = 'Load a sound';
						completions.push(soundItem);
					}
				}

				return completions;
			}
		}
	);

	// Register diagnostic collection for linting
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('efpss');
	context.subscriptions.push(diagnosticCollection);

	// Lint on document change
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				updateDiagnostics(editor.document, diagnosticCollection);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			updateDiagnostics(e.document, diagnosticCollection);
		})
	);

	context.subscriptions.push(completionProvider);
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (document.languageId !== 'efpss') {
		return;
	}

	const diagnostics: vscode.Diagnostic[] = [];
	const text = document.getText();
	const lines = text.split('\n');
	const isStateFile = document.fileName.endsWith('.state') || document.fileName.endsWith('.states');

	if (isStateFile) {
		// FSM-specific linting
		lintFSMFile(lines, diagnostics);
	} else {
		// Script-specific linting
		lintScriptFile(lines, diagnostics);
	}

	collection.set(document.uri, diagnostics);
}

function lintScriptFile(lines: string[], diagnostics: vscode.Diagnostic[]): void {
	let procedureStack: { name: string; line: number }[] = [];
	const procedureNames = new Set<string>();

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmedLine = line.trim();

		// Skip comments and empty lines
		if (trimmedLine.startsWith('//') || trimmedLine === '') {
			continue;
		}

		// Check for procedure definition
		const procMatch = trimmedLine.match(/^procedure\s+(\w+)/);
		if (procMatch) {
			const procName = procMatch[1];
			if (procedureNames.has(procName)) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(i, 0, i, line.length),
					`Duplicate procedure name: ${procName}`,
					vscode.DiagnosticSeverity.Error
				);
				diagnostics.push(diagnostic);
			}
			procedureNames.add(procName);
			procedureStack.push({ name: procName, line: i });
		}

		// Check for 'end' keyword
		if (trimmedLine === 'end') {
			if (procedureStack.length === 0) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(i, 0, i, line.length),
					'Unexpected "end" without matching procedure',
					vscode.DiagnosticSeverity.Error
				);
				diagnostics.push(diagnostic);
			} else {
				procedureStack.pop();
			}
		}

		// Check for variable naming conventions
		const varMatches = line.matchAll(/\$([a-zA-Z_][a-zA-Z0-9_\.]*)/g);
		for (const match of varMatches) {
			const varName = match[1];
			// Check if it starts with 'map.' or 'global.' for best practices
			if (!varName.startsWith('map.') && !varName.startsWith('global.') && varName.includes('.')) {
				const startPos = match.index || 0;
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(i, startPos, i, startPos + match[0].length),
					`Variable should start with 'map.' or 'global.': ${match[0]}`,
					vscode.DiagnosticSeverity.Warning
				);
				diagnostics.push(diagnostic);
			}
		}

	}

	// Check for unclosed procedures
	procedureStack.forEach(proc => {
		const diagnostic = new vscode.Diagnostic(
			new vscode.Range(proc.line, 0, proc.line, lines[proc.line].length),
			`Procedure "${proc.name}" is not closed with "end"`,
			vscode.DiagnosticSeverity.Error
		);
		diagnostics.push(diagnostic);
	});
}

function lintFSMFile(lines: string[], diagnostics: vscode.Diagnostic[]): void {
	let currentState: string | null = null;
	let hasImageLoad = false;
	const requiredStates = new Set<string>();
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmedLine = line.trim();

		// Skip empty lines
		if (trimmedLine === '') {
			continue;
		}

		// Check for leading whitespace (FSM best practice - critical!)
		if (line.length > 0 && (line[0] === ' ' || line[0] === '\t')) {
			const diagnostic = new vscode.Diagnostic(
				new vscode.Range(i, 0, i, 1),
				'FSM files MUST NOT have leading whitespace. This will break the FSM!',
				vscode.DiagnosticSeverity.Error
			);
			diagnostics.push(diagnostic);
		}

		// Check for image/sound loading
		if (trimmedLine.startsWith('image ') || trimmedLine.startsWith('sound ')) {
			hasImageLoad = true;
		}

		// Check for state definition
		const stateMatch = trimmedLine.match(/^state\s+(\w+)/);
		if (stateMatch) {
			currentState = stateMatch[1];
			requiredStates.add(currentState);
			
			// Check if first frame after state is NONE (best practice)
			if (i + 1 < lines.length) {
				const nextLine = lines[i + 1].trim();
				if (nextLine.startsWith('frame ') && !nextLine.includes(' NONE')) {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(i + 1, 0, i + 1, lines[i + 1].length),
						'First frame of a state should use NONE action to avoid engine bug',
						vscode.DiagnosticSeverity.Warning
					);
					diagnostics.push(diagnostic);
				}
			}
		}

		// Check frame delays
		const frameMatch = trimmedLine.match(/^frame\s+\d+\s+([\d.]+)/);
		if (frameMatch) {
			const delay = parseFloat(frameMatch[1]);
			if (delay < 0.01 && delay !== 0) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(i, 0, i, line.length),
					`Frame delay ${delay} is too small. Values below 0.01 cause frame skipping. Use 0.01 or higher.`,
					vscode.DiagnosticSeverity.Warning
				);
				diagnostics.push(diagnostic);
			}
		}
	}

	// Warn if no image/sound loading detected
	if (!hasImageLoad) {
		const diagnostic = new vscode.Diagnostic(
			new vscode.Range(0, 0, 0, 1),
			'FSM file should load images or sounds using "image" or "sound" commands',
			vscode.DiagnosticSeverity.Information
		);
		diagnostics.push(diagnostic);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
