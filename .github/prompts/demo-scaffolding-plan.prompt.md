---
description: "Create 4-phase implementation plan for CIVIC demo scaffolding from research document"
agent: Task Planner
argument-hint: "[chat={true|false}]"
---

# Demo Scaffolding Plan

Create a 4-phase implementation plan for the CIVIC demo scaffolding files.

## Inputs

* ${input:chat:true}: (Optional, defaults to true) Include conversation context for clarifications.

## Planning Context

Locate the research document in `.copilot-tracking/research/` containing demo scaffolding specifications.

**Key References:**

* Azure resource group: `rg-dev-125`
* ADO Organization: `MngEnvMCAP675646`
* ADO Project: `ProgramDemo-DevDay2026-LiveDemo`
* Demo duration: 130 minutes (10:30 AM – 1:50 PM with lunch break)
* Presenters: Hammad (MC) and Emmanuel (live coding)

---

Create a 4-phase implementation plan with commit checkpoints.

## Required Phases

### Phase 1: Configuration Files (7 files)

**Commit checkpoint after completion.**

| # | File | Purpose |
|---|------|---------|
| 1 | `.gitignore` | Java + Node + IDE + OS ignore rules |
| 2 | `.vscode/mcp.json` | ADO MCP server config for `MngEnvMCAP675646` / `ProgramDemo-DevDay2026-LiveDemo` |
| 3 | `.github/copilot-instructions.md` | Global Copilot context |
| 4 | `.github/instructions/ado-workflow.instructions.md` | `applyTo: **` — branching, commit, PR conventions |
| 5 | `.github/instructions/java.instructions.md` | `applyTo: backend/**` — Spring Boot conventions |
| 6 | `.github/instructions/react.instructions.md` | `applyTo: frontend/**` — React + Ontario DS conventions |
| 7 | `.github/instructions/sql.instructions.md` | `applyTo: database/**` — Flyway + Azure SQL conventions |

### Phase 2: Documentation Files (3 files)

**Commit checkpoint after completion.**

| # | File | Purpose |
|---|------|---------|
| 1 | `docs/architecture.md` | Mermaid C4/flowchart: browsers → React → Java API → Azure SQL |
| 2 | `docs/data-dictionary.md` | Mermaid ER diagram, 3 tables, all columns, seed data |
| 3 | `docs/design-document.md` | 5 API endpoints, DTOs, component hierarchy |

### Phase 3: Operational Files (2 scripts)

**Commit checkpoint after completion.**

| # | File | Purpose |
|---|------|---------|
| 1 | `scripts/Start-Local.ps1` | PowerShell with `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql` |
| 2 | `scripts/Stop-Local.ps1` | Kill processes on ports 8080 and 3000 |

### Phase 4: Talk Track (1 file)

**Commit checkpoint after completion.**

| # | File | Purpose |
|---|------|---------|
| 1 | `TALK-TRACK.md` | 130-minute demo script at **repository root** |

## Implementation Constraints

Apply these constraints during implementation:

### All Files

* No TODOs or placeholders — all content must be complete and production-ready
* Valid YAML frontmatter where applicable
* Consistent formatting throughout

### Instruction Files

* Must include `description` field in frontmatter
* Must include `applyTo` field with correct glob pattern
* Content must be specific and actionable for Copilot

### Documentation Files

* Valid Mermaid syntax — diagrams must render correctly
* Complete specifications — no missing details
* Cross-references between documents where appropriate

### Talk Track

* Covers all 130 minutes with no gaps
* Uses two-presenter format: 🎙️ HAMMAD (MC) and 💻 EMMANUEL (live coding)
* Includes minute markers AND actual times (e.g., `min 5 | ⏰ 10:35 AM`)
* Act 1 explicitly includes ADO work item creation via MCP (no items exist beforehand)
* Includes commit checkpoints (v0.1.0 through v1.0.0)
* Includes risk mitigation table
* Includes key numbers summary table

### PowerShell Scripts

* Use `param()` blocks with proper parameter definitions
* Include help comments (`<#...#>` or `# .SYNOPSIS`)
* Handle errors gracefully
* Backend port 8080, frontend port 3000

### MCP Configuration

* Reference correct ADO organization and project
* Use `npx -y azure-devops-mcp` command format

### `.gitignore`

* Java artifacts: `target/`, `*.jar`, `*.class`, `.gradle/`, `build/`
* Node artifacts: `node_modules/`, `dist/`, `.env.local`
* IDE artifacts: `.idea/`, `*.iml`
* Preserve `.vscode/mcp.json` (negation pattern)
* OS artifacts: `.DS_Store`, `Thumbs.db`

## Success Criteria

Implementation plan must:

1. Cover all 13 scaffolding files across 4 phases
2. Include commit checkpoints after each phase
3. Provide enough detail for Task Implementor to execute without clarification
4. Reference Azure resource group `rg-dev-125` where appropriate
5. Reference ADO org/project in MCP configuration
6. Place `TALK-TRACK.md` at repository root (not in `docs/`)
