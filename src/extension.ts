import * as vscode from 'vscode';

// ============== SYSTEM PROMPTS — BOOST ==============

const PROMPT_SYSTEM_PROMPT = `You are a world-class prompt engineer. Your task is to take the user's original prompt and rewrite it into an optimal, production-grade prompt by applying ALL of the following 9 techniques simultaneously. Blend them naturally into a single cohesive improved prompt — do NOT list them as separate sections.

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

const SKILL_SYSTEM_PROMPT = `You are a skill definition optimizer. Your task is to take the user's skill or agent definition and rewrite it into a production-grade version with precise triggers, clear boundaries, and robust behavior rules.

## Focus Areas
- **Trigger Clarity** — Make activation conditions explicit and unambiguous
- **Boundary Definition** — Clearly define scope: what the skill handles and what it defers
- **Action Specificity** — Ensure each action is concrete, measurable, and executable
- **Error Handling** — Add recovery paths for expected failure modes
- **Context & Dependencies** — Specify required inputs, preconditions, and external dependencies
- **Constraints & Guardrails** — Add limitations, exclusions, quality criteria, and safety rules

## Rules
- Preserve the original intent and functionality completely.
- Output a single, cohesive, natural-sounding definition — not a checklist of sections.
- Only output the improved version. No explanations or meta-commentary.
- The output should be immediately usable as a drop-in replacement for the original.`;

const AGENT_SYSTEM_PROMPT = `You are an agent configuration optimizer. Your task is to take the user's agent definition and rewrite it into a production-grade version with clear capabilities, tool usage, autonomy levels, and interaction patterns.

## Focus Areas
- **Capability Definition** — Make each capability explicit, scoped, and non-overlapping
- **Tool & Integration Mapping** — Clarify which tools are available, when each is used, and their limitations
- **Autonomy & Delegation** — Define when the agent acts independently vs. escalates to a human
- **Interaction Protocol** — Specify communication patterns, response formats, and escalation paths
- **Memory & State** — Define what context persists across sessions and how it's managed
- **Safety & Constraints** — Add guardrails, rate limits, approval gates, and prohibited actions

## Rules
- Preserve the original intent and capabilities completely.
- Output a single, cohesive, natural-sounding configuration — not a checklist of sections.
- Only output the improved version. No explanations or meta-commentary.
- The output should be immediately usable as a drop-in replacement for the original.`;

const INSTRUCTIONS_SYSTEM_PROMPT = `You are an instruction set optimizer. Your task is to take the user's instructions and rewrite them into a crystal-clear, complete, and actionable version that leaves no room for misinterpretation.

## Focus Areas
- **Clarity & Precision** — Remove ambiguity, use precise language, define terms
- **Completeness** — Fill logical gaps, cover edge cases, handle exceptions
- **Logical Structure** — Use numbered steps, hierarchical sections, or decision trees where appropriate
- **Prerequisites** — Specify what's needed before starting (tools, knowledge, permissions)
- **Success Criteria** — Define measurable outcomes that confirm correct execution
- **Troubleshooting** — Anticipate common mistakes and include recovery steps

## Rules
- Preserve the original intent and sequence completely.
- Match the original format style (list, paragraph, etc.) unless a clear improvement presents itself.
- Only output the improved instructions. No explanations or meta-commentary.
- The output should be immediately usable as a drop-in replacement for the original.`;

const CONTENT_SYSTEM_PROMPT = `You are a content editor and writer. Your task is to take the user's text and rewrite it into a more detailed, better structured, and higher quality version while preserving the original meaning, intent, and key messages.

## Focus Areas
- **Expand & Enrich** — Elaborate on each point, add relevant detail, include examples and contextual background
- **Improve Structure** — Organize with clear paragraphs, headings, lists, and transitions for readability
- **Refine Language** — Enhance vocabulary, sentence flow, tone consistency, and overall readability
- **Maintain Voice** — Preserve the original author's style, perspective, and intent
- **Add Depth** — Include reasoning, context, nuance, and supporting details where appropriate
- **Polish** — Fix grammar, clarity problems, awkward phrasing, and logical gaps

## Rules
- Preserve the original meaning, intent, and key messages completely.
- Make the output substantially more detailed and well-developed than the input — expand without padding.
- Only output the rewritten version. No explanations, preamble, or meta-commentary.
- The output should be immediately usable as a replacement for the original.`;

// ============== SYSTEM PROMPT — EXTRACT ==============

const EXTRACT_BASE_PROMPT = `You are an expert information extractor and log analyst. From the following text, extract ONLY the most important, actionable, and critical information. Return a well-structured markdown document.

## General Rules
- Be extremely concise but informative — every bullet must carry signal.
- Prioritize errors, exceptions, warnings, performance issues, and security concerns.
- Group related findings under clear headings.
- Include timestamps and context only when they add value.
- Use clear, professional language with severity indicators (🔴 Critical, 🟡 Warning, 🟢 Info).
- Output strictly in markdown with appropriate headings, bullet points, and code blocks where helpful.
- Do NOT add hallucinated information.
- Only output the extracted insights. No preamble, explanation, or meta-commentary.`;

interface ExtractMode {
	id: string;
	label: string;
	description: string;
	/** Additional instruction appended to EXTRACT_BASE_PROMPT */
	instruction: string;
}

const EXTRACT_MODES: ExtractMode[] = [
	{
		id: 'smart',
		label: 'Smart Default',
		description: 'Auto-detect content type and extract the most relevant insights',
		instruction: 'Analyze the content, determine its type (log, transcript, report, etc.), and extract insights accordingly. Adapt your heading structure to the content type.',
	},
	{
		id: 'reorganize',
		label: 'Reorganize & Deduplicate',
		description: 'Restructure messy content with clear hierarchy, remove duplicates',
		instruction: 'Completely restructure the content with a clear logical hierarchy. Detect and merge duplicate or redundant information — keep the best version. Organize into sections with descriptive headings. Use consistent formatting throughout (lists, tables, code blocks as appropriate). Preserve ALL unique information — you are restructuring, not summarizing. The output should be cleaner, better organized, and more scannable than the input.',
	},
	{
		id: 'error',
		label: 'Errors & Issues',
		description: 'Focus on errors, exceptions, warnings, and root causes',
		instruction: 'Focus exclusively on errors, exceptions, warnings, failures, and issues. Ignore informational or routine messages. Group recurring errors and note frequency. Highlight severity and affected components.',
	},
	{
		id: 'action',
		label: 'Action Items & Decisions',
		description: 'Extract TODO items, decisions made, owners, and next steps',
		instruction: 'Focus on action items, decisions made, assigned owners, deadlines, blockers, and next steps. Format action items as checkboxes (- [ ]) and decisions as bullet points with context.',
	},
	{
		id: 'timeline',
		label: 'Timeline / Chronological',
		description: 'Organize events chronologically with timestamps',
		instruction: 'Organize events in chronological order. Preserve and highlight all timestamps. Use a timeline format with clear time markers. Note gaps or missing time periods if relevant.',
	},
	{
		id: 'rca',
		label: 'Root Cause Analysis',
		description: 'Trace issues to root causes + suggest fixes',
		instruction: 'For each issue or problem found, trace backward to identify the root cause. Present as: Issue → Root Cause → Impact → Suggested Fix. Prioritize actionable remediation steps.',
	},
	{
		id: 'summary',
		label: 'Executive Summary',
		description: 'Business-friendly overview for stakeholders',
		instruction: 'Use clear, non-technical language. Focus on: what happened, business impact, key metrics, timeline, and recommendations. Omit technical details unless critical to decision-making.',
	},
	{
		id: 'custom',
		label: 'Custom Focus',
		description: 'Enter your own focus area for extraction',
		instruction: '',
	},
];

// ============== TYPES & REGISTRY ==============

type BoostType = 'prompt' | 'skill' | 'agent' | 'instructions' | 'content';

const SYSTEM_PROMPTS: Record<BoostType, string> = {
	prompt: PROMPT_SYSTEM_PROMPT,
	skill: SKILL_SYSTEM_PROMPT,
	agent: AGENT_SYSTEM_PROMPT,
	instructions: INSTRUCTIONS_SYSTEM_PROMPT,
	content: CONTENT_SYSTEM_PROMPT,
};

const BOOST_COMMANDS: { command: string; type: BoostType; label: string }[] = [
	{ command: 'prompt-booster.boostPrompt', type: 'prompt', label: 'Prompt' },
	{ command: 'prompt-booster.boostSkill', type: 'skill', label: 'Skill' },
	{ command: 'prompt-booster.boostAgent', type: 'agent', label: 'Agent' },
	{ command: 'prompt-booster.boostInstructions', type: 'instructions', label: 'Instructions' },
	{ command: 'prompt-booster.boostContent', type: 'content', label: 'Content' },
];

// ============== API LAYER ==============

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
 * Get text from available sources.
 * Priority: 1) Active editor selection  2) Clipboard (with user confirmation)
 * @param actionLabel Label used in the clipboard prompt (e.g. "Boost", "Extract insights from")
 */
async function getInputText(actionLabel = 'Boost'): Promise<{ text: string; editor?: vscode.TextEditor; selection?: vscode.Selection } | undefined> {
	// 1. Try active editor selection
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const selection = editor.selection;
		const text = editor.document.getText(selection);
		if (text.trim()) {
			return { text, editor, selection };
		}
	}

	// 2. Fallback: offer to use clipboard content
	const clipboard = await vscode.env.clipboard.readText();
	if (clipboard.trim()) {
		const action = await vscode.window.showInformationMessage(
			`${actionLabel} clipboard content?`,
			{ modal: false, detail: clipboard.length > 200 ? clipboard.slice(0, 200) + '...' : clipboard },
			{ title: actionLabel, isCloseAffordance: false },
		);
		if (action?.title === actionLabel) {
			return { text: clipboard.trim() };
		}
	}

	return undefined;
}

/**
 * Build messages for the chat request
 * @param selectedText The selected text from the editor
 * @returns An array of chat messages to send to the language model
 */
function buildMessages(systemPrompt: string, selectedText: string): vscode.LanguageModelChatMessage[] {
	return [
		vscode.LanguageModelChatMessage.User(`[SYSTEM INSTRUCTION] ${systemPrompt}`),
		vscode.LanguageModelChatMessage.User(`Selected text:\n${selectedText}`),
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
	token: vscode.CancellationToken,
	editor?: vscode.TextEditor,
	selection?: vscode.Selection,
): Promise<void> {
	const config = vscode.workspace.getConfiguration('promptBooster');
	const streamEnabled = config.get<boolean>('streamResponse', true);

	const response = await model.sendRequest(messages, {}, token);

	if (editor && selection) {
		// Editor path: replace selection inline (supports streaming)
		if (streamEnabled) {
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
			let boosted = '';
			for await (const part of response.text) {
				boosted += part;
			}
			await editor.edit((editBuilder) => {
				editBuilder.replace(selection, boosted.trim());
			});
		}
	} else {
		// Input path: create a new untitled document with the result
		let boosted = '';
		for await (const part of response.text) {
			boosted += part;
		}
		const doc = await vscode.workspace.openTextDocument({
			content: boosted.trim(),
			language: 'markdown',
		});
		await vscode.window.showTextDocument(doc);
	}
}

// ============== COMMAND HANDLERS ==============

/**
 * Generic boost command — selects the right SYSTEM_PROMPT per type
 */
async function boostCommand(type: BoostType): Promise<void> {
	const input = await getInputText();
	if (!input) { return; }

	const model = await getCopilotModel();
	if (!model) { return; }

	const messages = buildMessages(SYSTEM_PROMPTS[type], input.text);

	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: `Boosting ${type}...`,
			cancellable: false,
		},
		async (_progress, token) => {
			await sendBoostRequest(model, messages, token, input.editor, input.selection);
		},
	);

	const label = type.charAt(0).toUpperCase() + type.slice(1);
	vscode.window.showInformationMessage(`${label} boosted!`);
}

// ============== EXTRACT KEY INSIGHTS ==============

/**
 * Show Quick Pick to select extract mode
 */
async function selectExtractMode(): Promise<{ mode: ExtractMode; customInstruction?: string } | undefined> {
	const items = EXTRACT_MODES.map((m) => ({
		label: m.label,
		description: '',
		detail: m.description,
		mode: m,
	}));

	const picked = await vscode.window.showQuickPick(items, {
		title: 'Extract Key Insights — choose focus',
		placeHolder: 'How would you like the insights extracted?',
		ignoreFocusOut: true,
	});

	if (!picked) { return undefined; }

	// If Custom Focus, prompt for instruction
	if (picked.mode.id === 'custom') {
		const custom = await vscode.window.showInputBox({
			title: 'Custom Focus',
			prompt: 'Describe what you want extracted from the text',
			placeHolder: 'e.g. "Only extract database queries and performance issues"',
			ignoreFocusOut: true,
			validateInput: (v) => (v.trim() ? null : 'Please enter a focus area'),
		});
		if (!custom?.trim()) { return undefined; }
		return { mode: picked.mode, customInstruction: custom.trim() };
	}

	return { mode: picked.mode };
}

/**
 * Write AI response to a new untitled markdown document
 */
async function writeResultToNewDocument(content: string): Promise<void> {
	const doc = await vscode.workspace.openTextDocument({
		content: content.trim(),
		language: 'markdown',
	});
	await vscode.window.showTextDocument(doc);
}

/**
 * Extract Key Insights command — distill long text into structured bullet points
 */
async function extractCommand(): Promise<void> {
	const input = await getInputText('Extract insights from');
	if (!input) { return; }

	const selection = await selectExtractMode();
	if (!selection) { return; }

	const model = await getCopilotModel();
	if (!model) { return; }

	// Build the full system prompt: base + mode instruction + optional custom focus + memory context
	let fullPrompt = EXTRACT_BASE_PROMPT;
	fullPrompt += `\n\n## Mode-Specific Instruction\n${selection.mode.instruction}`;
	if (selection.customInstruction) {
		fullPrompt += `\n\n## Custom Focus\n${selection.customInstruction}`;
	}

	// Attach memory context as a separate user message so the AI sees it alongside the source text
	const messages: vscode.LanguageModelChatMessage[] = [
		vscode.LanguageModelChatMessage.User(`[SYSTEM INSTRUCTION] ${fullPrompt}`),
	];
	messages.push(
		vscode.LanguageModelChatMessage.User(`Selected text:\n${input.text}`)
	);

	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: `Extracting insights (${selection.mode.label})...`,
			cancellable: true,
		},
		async (_progress, token) => {
			const response = await model.sendRequest(messages, {}, token);
			let result = '';
			for await (const part of response.text) {
				result += part;
			}
			await writeResultToNewDocument(result);
		},
	);

	vscode.window.showInformationMessage('Key insights extracted!');
}

// ============== ACTIVATION ==============

export function activate(context: vscode.ExtensionContext) {
	// Register 5 boost commands
	for (const { command, type } of BOOST_COMMANDS) {
		context.subscriptions.push(
			vscode.commands.registerCommand(command, () => boostCommand(type)),
		);
	}

	// Register extract command
	context.subscriptions.push(
		vscode.commands.registerCommand('prompt-booster.extractKeyInsights', extractCommand),
	);
}

export function deactivate() { }
