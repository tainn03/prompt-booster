<p align="center">
  <img src="https://github.com/user-attachments/assets/d0030322-28c4-4a12-aa67-617edf60c0d3" alt="Content Booster Use Cases" style="max-width: 100%; height: auto;" />
</p>

## Requirements

- **Visual Studio Code** 1.109.0 or higher
- **GitHub Copilot Extension** installed and authenticated
- **GitHub Copilot Subscription** (or active Free trial)

## How to Install

#### Step 1: Get the .vsix File
- Download the latest `.vsix` from [prompt-booster-1.0.0.vsix](https://github.com/tainn03/prompt-booster/blob/main/prompt-booster-1.0.0.vsix)

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

Select any text in the editor (or terminal) and press the keybinding — or right-click and pick a command. If no text is selected, the clipboard content is offered as fallback.

| Key | Command | Output | When to Use |
|---|---|---|---|
| `⌘⌥P` | **Boost: Prompt** | Replace selection | Apply 9 prompt engineering techniques (CoT, ToT, Few-Shot, ReAct, etc.) to any AI prompt |
| `⌘⌥S` | **Boost: Skill** | Replace selection | Sharpen skill/agent definitions — triggers, boundaries, error handling, constraints |
| `⌘⌥A` | **Boost: Agent** | Replace selection | Optimize agent configs — capabilities, tools, autonomy gates, interaction protocols |
| `⌘⌥I` | **Boost: Instructions** | Replace selection | Crystal-clear SOPs, runbooks, how-to guides — fill gaps, add troubleshooting |
| `⌘⌥B` | **Boost: Content** | Replace selection | Expand and polish any text — add detail, improve structure, refine language |
| `⌘⌥E` | **Extract Key Insights** | New markdown doc | Distill long text into structured insights. 8 modes via Quick Pick: |

### Input Sources

All commands accept text from:
1. **Editor selection** — select text, trigger command (priority)
2. **Terminal** — select text in terminal, press keybinding
3. **Clipboard** — no selection detected? A notification offers to use clipboard content
4. **Command Palette** — `Ctrl+Shift+P` → type command name

## Extension Settings

This extension contributes the following settings:

- `promptBooster.modelFamily` (string, default: `gpt-4o`)
  - Specifies which Copilot model family to use (e.g., `gpt-4o`, `gpt-4`, `gpt-3.5-turbo`)
  - Falls back to any available Copilot model if your preferred family is unavailable

- `promptBooster.streamResponse` (boolean, default: `true`)
  - When enabled, the boosted result appears in the editor as it's being generated
  - When disabled, the full response is collected before inserting
