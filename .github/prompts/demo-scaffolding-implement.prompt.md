---
description: "Execute 4-phase implementation plan for CIVIC demo scaffolding with phase-stop for review"
agent: Task Implementor
argument-hint: "[phaseStop={true|false}]"
---

# Demo Scaffolding Implementation

Execute the implementation plan for CIVIC demo scaffolding files.

## Inputs

* ${input:phaseStop:true}: (Optional, defaults to true) Stop after each phase for user review and commit.

## Implementation Context

Locate the implementation plan in `.copilot-tracking/plans/` containing the 4-phase scaffolding plan.

**Key References:**

* Azure resource group: `rg-dev-125`
* ADO Organization: `MngEnvMCAP675646`
* ADO Project: `ProgramDemo-DevDay2026-LiveDemo`
* Repository: Only `README.md` and `.github/prompts/` exist initially

---

Execute all 4 phases, stopping after each for user review and commit.

## Phase Execution

### Phase 1: Configuration Files

Create 7 configuration files:

1. `.gitignore`
2. `.vscode/mcp.json`
3. `.github/copilot-instructions.md`
4. `.github/instructions/ado-workflow.instructions.md`
5. `.github/instructions/java.instructions.md`
6. `.github/instructions/react.instructions.md`
7. `.github/instructions/sql.instructions.md`

**⏸️ STOP** — Wait for user review and commit before proceeding.

### Phase 2: Documentation Files

Create 3 documentation files:

1. `docs/architecture.md`
2. `docs/data-dictionary.md`
3. `docs/design-document.md`

**⏸️ STOP** — Wait for user review and commit before proceeding.

### Phase 3: Operational Files

Create 2 PowerShell scripts:

1. `scripts/Start-Local.ps1`
2. `scripts/Stop-Local.ps1`

**⏸️ STOP** — Wait for user review and commit before proceeding.

### Phase 4: Talk Track

Create 1 talk track file:

1. `TALK-TRACK.md` (at repository root)

**⏸️ STOP** — Wait for user review and commit before proceeding.

## Quality Gates

Validate each file against these quality gates before completing each phase:

### YAML Frontmatter Validation

* All markdown files with frontmatter must have valid YAML
* No trailing spaces in frontmatter
* Proper quotation of values containing special characters

### Instruction Files Validation

* `description` field present and descriptive
* `applyTo` field present with valid glob pattern
* Content is specific, actionable guidance for Copilot
* No generic placeholder content

### Mermaid Syntax Validation

* All Mermaid diagrams use valid syntax
* Diagrams render without errors
* Node and edge labels are properly quoted if containing special characters

### Talk Track Validation

* Covers full 130 minutes (10:30 AM – 1:50 PM) with no gaps
* Includes lunch break (11:40 AM – 1:00 PM)
* Uses two-presenter format throughout:
  * 🎙️ **HAMMAD** for MC narration/audience engagement
  * 💻 **EMMANUEL** for live coding actions
* Scripted dialogue in blockquotes with presenter indicator
* `Demo actions:` bullet lists with minute markers AND actual times
* Act 1 explicitly includes ADO work item creation via MCP
* Includes commit checkpoints table (v0.1.0 through v1.0.0) with minute AND actual time
* Includes risk mitigation table
* Includes key numbers summary table at the end

### PowerShell Scripts Validation

* Use `param()` blocks with typed parameters
* Include help comments (synopsis, description, examples)
* Handle common error conditions
* Use approved verbs (`Start-`, `Stop-`)
* Backend port 8080, frontend port 3000

### `.gitignore` Validation

* Java patterns: `target/`, `*.jar`, `*.class`, `.gradle/`, `build/`
* Node patterns: `node_modules/`, `dist/`, `.env.local`
* IDE patterns: `.idea/`, `*.iml`
* Preserve pattern: `!.vscode/mcp.json`
* OS patterns: `.DS_Store`, `Thumbs.db`
* Log patterns: `*.log`, `logs/`

### MCP Configuration Validation

* JSON syntax is valid
* ADO organization: `MngEnvMCAP675646`
* ADO project: `ProgramDemo-DevDay2026-LiveDemo`
* Command uses `npx -y azure-devops-mcp`

## Success Criteria

Implementation is complete when:

1. All 13 files are created with complete, production-ready content
2. All quality gates pass for each file
3. User has reviewed and committed each phase
4. No TODOs or placeholders remain in any file
5. `TALK-TRACK.md` is at repository root (not in `docs/`)
6. Documentation references Azure resource group `rg-dev-125`
7. MCP configuration references correct ADO organization and project
