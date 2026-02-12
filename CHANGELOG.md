# Change Log

All notable changes to the "prompt-booster" extension will be documented in this file.

## [0.0.1] - 2026-02-12

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
