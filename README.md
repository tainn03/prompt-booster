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

## How to Use

1. Open any file in VS Code
2. Select the prompt text you want to improve
3. Use the keyboard shortcut:
   - **Windows/Linux**: `Ctrl+Alt+B`
   - **macOS**: `Cmd+Alt+B`
   
   OR right-click and select **"Boost Prompt with Copilot"**

4. The selected text is replaced with the enhanced version

## How It Works

The extension sends your selected prompt to GitHub Copilot with a comprehensive system instruction that applies all 9 prompt engineering techniques simultaneously:

- It preserves your original intent
- Blends techniques naturally into a single cohesive prompt
- Produces immediately usable output
- No explanations or meta-commentary in the result

Example transformation:

**Before:**  
```
Write a story about cats
```

**After:**  
```
You are a creative fiction writer with expertise in character development. Write a short story (500-800 words) about cats. 

Consider these approaches:
1. Focus on a cat's perspective and internal thoughts
2. Explore a cat's relationship with humans
3. Create a humorous scenario

Choose the approach that makes the most engaging story. For the output, use clear paragraphs, vivid sensory details, and dialogue where appropriate. Structure it with an introduction, rising action, and resolution. The tone should be [specify], and the target audience is [specify].
```

## Extension Settings

This extension contributes the following settings:

- `promptBooster.modelFamily` (string, default: `gpt-4o`)
  - Specifies which Copilot model family to use (e.g., `gpt-4o`, `gpt-4`, `gpt-3.5-turbo`)
  - Falls back to any available Copilot model if your preferred family is unavailable

- `promptBooster.streamResponse` (boolean, default: `true`)
  - When enabled, the improved prompt appears in the editor as it's being generated
  - When disabled, the full response is collected before inserting

## Known Issues

- The extension requires an active GitHub Copilot authentication. If you see "No GitHub Copilot model available", verify that:
  - The GitHub Copilot extension is installed
  - You are signed in to GitHub
  - Your Copilot subscription is active

## Release Notes

### 0.0.1

Initial release of Prompt Booster:
- Single powerful command that combines all 9 prompt engineering techniques
- Real-time streaming of improved prompts
- Customizable Copilot model selection
- Context menu and keyboard shortcut support
- Full configuration options for power users

---

## Tips for Best Results

1. **Be Specific** — Even a simple prompt will be enhanced, but more detailed inputs lead to better results
2. **Provide Context** — Include relevant information about your use case, audience, and goals
3. **Review First** — The enhanced prompt is usually excellent, but review it to ensure it matches your needs
4. **Iterate** — Try boosting the boosted prompt for further refinement

---

**Enhance your prompts. Improve your results.**
