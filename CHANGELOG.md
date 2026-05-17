# Change Log

All notable changes to the "prompt-booster" extension will be documented in this file.

## [1.0.0] - 2026-05-17

### Added
- **4 new Boost commands** with dedicated keybindings:
  - `Ctrl+Alt+P` / `Cmd+Alt+P` — Boost: Prompt (9 techniques, same as v0.0.1)
  - `Ctrl+Alt+S` / `Cmd+Alt+S` — Boost: Skill (optimize skill/agent definitions)
  - `Ctrl+Alt+A` / `Cmd+Alt+A` — Boost: Agent (optimize agent configurations)
  - `Ctrl+Alt+I` / `Cmd+Alt+I` — Boost: Instructions (clarify SOPs, runbooks)
  - `Ctrl+Alt+B` / `Cmd+Alt+B` — Boost: Content (expand and rewrite any text)
- **Extract Key Insights** command (`Ctrl+Alt+E` / `Cmd+Alt+E`) — distill long text into structured markdown with 8 modes via Quick Pick:
  - Reorganize & Deduplicate
  - Smart Default
  - Errors & Issues
  - Action Items & Decisions
  - Timeline / Chronological
  - Root Cause Analysis
  - Executive Summary
  - Custom Focus
- **Clipboard fallback** — when no editor selection, reads clipboard and shows a confirmation notification with text preview
- **Terminal support** — keybindings now work when terminal has focus
- **Copilot Memories integration** — Extract command optionally loads 3-layer memory context (user/repo/session) for domain-aware extraction
- All 6 commands available in right-click context menu and Command Palette
- `USECASE.md` — comprehensive use case documentation

### Changed
- `Ctrl+Alt+B` now triggers Boost: Content (was the old single boost command)
- Each command has its own SYSTEM_PROMPT tailored to the content type
- Editor selection is priority input; clipboard is fallback for all commands

### Fixed
- Input source expanded beyond editor selection — works from terminal and clipboard too

### Added
- Single powerful command: "Boost Prompt with Copilot" that combines all 9 prompt engineering techniques
- Integration with GitHub Copilot via VS Code Language Model API
- Full support for all 9 advanced prompt engineering techniques:
  1. General Improvement — clarity, specificity, structure
  2. Chain-of-Thought (CoT) — step-by-step reasoning
  3. Few-Shot Examples — illustrative input/output pairs
  4. Tree-of-Thought (ToT) — multi-path reasoning
  5. ReAct — Thought/Action/Observation phases
  6. Role-Play / Persona — expert persona assignment
  7. Structured Output — format specifications
  8. Socratic Method — question-guided reasoning
  9. Constraints & Guardrails — explicit boundaries
- Real-time streaming of improved prompts (configurable)
- Context menu integration for selected text
- Keyboard shortcut: `Ctrl+Alt+B` (Windows/Linux), `Cmd+Alt+B` (macOS)
- Configuration options:
  - `promptBooster.modelFamily`: Choose Copilot model family (default: gpt-4o)
  - `promptBooster.streamResponse`: Enable/disable streaming (default: true)
- Comprehensive documentation and architecture guides
- Full test coverage for core functionality

### Technical Details
- Built with TypeScript and VS Code Extension API
- Uses Language Model Chat API for Copilot integration
- Minimal dependencies, fast compilation
- Efficient streaming implementation with proper undo stack handling
- Graceful error handling and user feedback

### Initial Release Notes
This initial release provides a complete, production-ready prompt enhancement tool that harnesses the power of 9 proven prompt engineering techniques through a single intuitive command. The extension seamlessly integrates with VS Code and GitHub Copilot to transform any prompt into a polished, optimized version while preserving the original intent.
