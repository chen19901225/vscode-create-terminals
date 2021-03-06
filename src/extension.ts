// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TerminalManager } from "./terminalmanager";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	let manager = new TerminalManager(context);
	manager.logText("create-terminals loaded");
	manager.start();
	// vscode.workspace.onDidChangeConfiguration(() => {
	// 	manager.loadConfig();
	// 	manager.closeTerminal();
	// });
	vscode.commands.registerCommand("create-terminals.reloadConfig", () => {
		manager.loadConfig();
		manager.closeTerminal();
		manager.run_once();
	});

	vscode.commands.registerCommand("create-terminals.close_all_terminal", () => {
		manager.closeAllTerminal();
	})
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json


	//context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
