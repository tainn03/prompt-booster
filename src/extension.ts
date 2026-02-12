import * as vscode from 'vscode';

/**
 * Combined system prompt — merges all 9 prompt engineering techniques
 */
const SYSTEM_PROMPT = `You are a world-class prompt engineer. Your task is to take the user's original prompt and rewrite it into an optimal, production-grade prompt by applying ALL of the following 9 techniques simultaneously. Blend them naturally into a single cohesive improved prompt — do NOT list them as separate sections.

## Techniques to Apply

1. **General Improvement** — Make the prompt clearer, more specific, well-structured, and effective. Remove ambiguity and add necessary detail.

2. **Chain-of-Thought (CoT)** — Instruct the AI to reason step by step, breaking complex problems into sequential logical steps before arriving at a final answer.

3. **Few-Shot Examples** — Include 2-3 concise, realistic input/output examples that demonstrate the expected behavior and output format.

4. **Tree-of-Thought (ToT)** — Ask the AI to consider multiple distinct approaches, evaluate the pros/cons of each, and select the best path before producing the final answer.

5. **ReAct (Reason + Act)** — Structure the prompt so the AI alternates between Thought (reasoning), Action (what to do next), and Observation (noting results) when tackling the task.

6. **Role-Play / Persona** — Assign the AI a specific expert persona most relevant to the task, including expertise level, communication style, and perspective.

7. **Structured Output** — Specify a clear output format (e.g., Markdown, JSON, numbered list, table) with a template or schema for the expected response.

8. **Socratic Method** — Where appropriate, instruct the AI to surface assumptions, ask clarifying questions, and guide reasoning before giving a definitive answer.

9. **Constraints & Guardrails** — Add explicit boundaries: scope limits, topics to avoid, tone requirements, audience, quality criteria, and any relevant constraints.

## Rules
- Preserve the original intent completely.
- Produce a single, unified, natural-sounding prompt — not a checklist of techniques.
- Only output the improved prompt. No explanations, preambles, or meta-commentary.
- The improved prompt should be immediately usable as-is.`;

/**
 * Get Copilot model
 * @returns The selected Copilot language model chat or undefined if none available
 */
async function getCopilotModel(): Promise<vscode.LanguageModelChat | undefined> {
	const config = vscode.workspace.getConfiguration('promptBooster');
	const family = config.get<string>('modelFamily', 'gpt-4o');

	let models = await vscode.lm.selectChatModels({ vendor: 'copilot', family });

	// Fallback: try any copilot model if preferred family is unavailable
	if (models.length === 0) {
		models = await vscode.lm.selectChatModels({ vendor: 'copilot' });
	}

	if (models.length === 0) {
		vscode.window.showErrorMessage(
			'No GitHub Copilot model available. Ensure Copilot is installed and signed in.'
		);
		return undefined;
	}

	return models[0];
}

/**
 * Get selected text and editor
 * @returns The active text editor, the current selection, and the selected text, or undefined if no active editor or no selection
 */
function getEditorSelection(): { editor: vscode.TextEditor; selection: vscode.Selection; text: string } | undefined {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active editor.');
		return undefined;
	}

	const selection = editor.selection;
	const text = editor.document.getText(selection);
	if (!text.trim()) {
		vscode.window.showInformationMessage('Select some text to boost.');
		return undefined;
	}

	return { editor, selection, text };
}

/**
 * Build messages for the chat request
 * @param selectedText The original selected text from the editor
 * @returns An array of chat messages to send to the language model
 */
function buildMessages(selectedText: string): vscode.LanguageModelChatMessage[] {
	return [
		vscode.LanguageModelChatMessage.User(
			`[SYSTEM INSTRUCTION] ${SYSTEM_PROMPT}`
		),
		vscode.LanguageModelChatMessage.User(
			`Original prompt:\n${selectedText}`
		),
	];
}

/**
 * Send the boost request to the model and handle the response
 * @param model The selected Copilot language model chat
 * @param messages The chat messages to send
 * @param editor The active text editor
 * @param selection The current text selection
 * @param token The cancellation token
 */
async function sendBoostRequest(
	model: vscode.LanguageModelChat,
	messages: vscode.LanguageModelChatMessage[],
	editor: vscode.TextEditor,
	selection: vscode.Selection,
	token: vscode.CancellationToken,
): Promise<void> {
	const config = vscode.workspace.getConfiguration('promptBooster');
	const streamEnabled = config.get<boolean>('streamResponse', true);

	const response = await model.sendRequest(messages, {}, token);

	if (streamEnabled) {
		// Stream: replace selection incrementally
		let firstChunk = true;
		for await (const part of response.text) {
			await editor.edit(
				(editBuilder) => {
					if (firstChunk) {
						editBuilder.replace(selection, part);
						firstChunk = false;
					} else {
						const pos = editor.selection.end;
						editBuilder.insert(pos, part);
					}
				},
				{ undoStopBefore: firstChunk, undoStopAfter: false },
			);
		}
	} else {
		// Collect full response then replace
		let boostedPrompt = '';
		for await (const part of response.text) {
			boostedPrompt += part;
		}

		await editor.edit((editBuilder) => {
			editBuilder.replace(selection, boostedPrompt.trim());
		});
	}
}

/**
 * Boost prompt command
 * @returns A promise that resolves when the command is complete
 */
async function boostPromptCommand(): Promise<void> {
	const ctx = getEditorSelection();
	if (!ctx) { return; }

	const model = await getCopilotModel();
	if (!model) { return; }

	const messages = buildMessages(ctx.text);

	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: 'Boosting prompt...',
			cancellable: true,
		},
		async (_progress, token) => {
			await sendBoostRequest(model, messages, ctx.editor, ctx.selection, token);
			vscode.window.showInformationMessage('Prompt boosted!');
		},
	);
}

/**
 * Activate the extension
 * @param context The extension context
 */
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('prompt-booster.boostPrompt', boostPromptCommand),
	);
}

export function deactivate() { }
