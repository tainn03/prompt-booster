# Prompt Booster

A powerful VS Code extension that enhances your prompts using GitHub Copilot and 9 advanced prompt engineering techniques. Select any prompt text, and instantly receive a production-grade, optimized version that combines all proven prompting strategies.

## Features

- **One-Click Prompt Enhancement** — Select text and press `Ctrl+Alt+B` (or `Cmd+Alt+B` on Mac) to boost your prompt
- **Streaming Feedback** — Watch improvements appear in real-time as the model generates them
- **Context Menu Integration** — Right-click on selected text to boost
- **Customizable via Settings** — Choose your Copilot model and enable/disable streaming

## Requirements

- **Visual Studio Code** 1.109.0 or higher
- **GitHub Copilot Extension** installed and authenticated
- **GitHub Copilot Subscription** (or active Free trial)

## How to Install

#### Step 1: Get the .vsix File
- Download the latest `.vsix` file from [prompt-booster-0.0.1.vsix](https://github.com/tainn03/prompt-booster/blob/main/prompt-booster-0.0.1.vsix)

#### Step 2: Install in VS Code

1. Open VS Code
2. Go to **Extensions** tab
3. Click the **More** menu (three dots) → **Install from VSIX...**
4. Select the `.vsix` file from your computer
5. Click **Install**

#### Step 3: Verify Installation
- Look for **Prompt Booster** in your Extensions list
- The extension is now ready to use!

## How to Use

1. Open any file in VS Code (supports: .txt, .md, .js, .py, any text file)
2. Select the prompt text you want to improve
3. Use one of these methods to activate:
   - **Keyboard shortcut**: Press `Ctrl+Alt+B` (Windows/Linux) or `Cmd+Alt+B` (macOS)
   - **Context menu**: Right-click on selected text → **"Boost Prompt with Copilot"**
   - **Command palette**: Press `Ctrl+Shift+P` / `Cmd+Shift+P` → Search for **"Boost Prompt with Copilot"**

4. The selected text is replaced with the enhanced version
5. The improved prompt appears in real-time (if streaming is enabled)
6. Review the result and iterate if needed

## Extension Settings

This extension contributes the following settings:

- `promptBooster.modelFamily` (string, default: `gpt-4o`)
  - Specifies which Copilot model family to use (e.g., `gpt-4o`, `gpt-4`, `gpt-3.5-turbo`)
  - Falls back to any available Copilot model if your preferred family is unavailable

- `promptBooster.streamResponse` (boolean, default: `true`)
  - When enabled, the improved prompt appears in the editor as it's being generated
  - When disabled, the full response is collected before inserting
