// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class NoWorkspaceOpen extends Error { }
class NoTextEditorOpen extends Error { }
class DocumentIsUntitled extends Error { }

function getFilenameWithoutExtension(): string {
	if (!vscode.workspace.rootPath) {
		throw new NoWorkspaceOpen();
	}

	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		throw new NoTextEditorOpen();
	}

	const document = editor.document;
	if (document.isUntitled) {
		throw new DocumentIsUntitled();
	}

	const path = document.uri.path;
	const filename = path.split('/').pop() || '';
	const filenameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));

	return `${filenameWithoutExtension}`;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "go-to-current-file" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('go-to-current-file.go-to-current-file', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from go-to-current-file!');
		let filename = getFilenameWithoutExtension();
    	vscode.commands.executeCommand('workbench.action.quickOpen', filename);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
