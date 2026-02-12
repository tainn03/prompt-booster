import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension should be present', () => {
		const ext = vscode.extensions.getExtension('tainn03.prompt-booster');
		assert.ok(ext, 'Extension should be registered');
	});

	test('Commands should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);

		assert.ok(
			commands.includes('prompt-booster.boostPrompt'),
			'boostPrompt command should be registered',
		);
	});

	test('Configuration defaults should be set', () => {
		const config = vscode.workspace.getConfiguration('promptBooster');
		assert.strictEqual(config.get('modelFamily'), 'gpt-4o');
		assert.strictEqual(config.get('streamResponse'), true);
	});
});
