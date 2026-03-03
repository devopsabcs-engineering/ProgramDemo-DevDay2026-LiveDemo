<!-- markdownlint-disable-file -->
# Release Changes: CIVIC Demo Scaffolding Files

**Related Plan**: demo-scaffolding-plan.instructions.md
**Implementation Date**: 2026-03-03

## Summary

Create all 13 scaffolding files for the Developer Day 2026 live demo, enabling GitHub Copilot to build the CIVIC application from scratch during a 130-minute presentation.

## Changes

### Added

* `.gitignore` - Repository ignore file with Java, Node, IDE, OS, logs, coverage, H2, certificates sections
* `.vscode/mcp.json` - Azure DevOps MCP server configuration for work item management
* `.github/copilot-instructions.md` - Global Copilot instructions with architecture, bilingual, and workflow guidance
* `.github/instructions/ado-workflow.instructions.md` - ADO branch, commit, and PR conventions
* `.github/instructions/java.instructions.md` - Java 21 and Spring Boot 3.x coding standards (10 sections)
* `.github/instructions/react.instructions.md` - React 18 and TypeScript standards with Ontario Design System (9 sections)
* `.github/instructions/sql.instructions.md` - Azure SQL and Flyway migration standards (7 sections)
* `docs/architecture.md` - Architecture overview with C4 Container diagram
* `docs/data-dictionary.md` - Data dictionary with ER diagram and 3 table specifications
* `docs/design-document.md` - Design specification with 5 API endpoints and frontend component hierarchy
* `scripts/Start-Local.ps1` - PowerShell script for starting local development servers (175 lines)
* `scripts/Stop-Local.ps1` - PowerShell script for stopping local servers (85 lines)
* `TALK-TRACK.md` - 130-minute demo talk track with presenter dialogues, timings, and risk mitigation

### Modified

### Removed

## Additional or Deviating Changes

* No deviations from the implementation plan

## Release Summary

**Total Files Affected**: 13 files created

### Configuration Files (3 files)

| File | Purpose |
|------|---------|
| `.gitignore` | 8-section ignore file with `!.vscode/mcp.json` exception |
| `.vscode/mcp.json` | Azure DevOps MCP server (org: MngEnvMCAP675646, project: ProgramDemo-DevDay2026-LiveDemo) |
| `.github/copilot-instructions.md` | Global Copilot instructions with architecture, bilingual support, and workflow guidance |

### Instruction Files (4 files)

| File | applyTo | Purpose |
|------|---------|---------|
| `.github/instructions/ado-workflow.instructions.md` | `**` | ADO branch naming, commit format, PR linking |
| `.github/instructions/java.instructions.md` | `**/*.java` | Java 21/Spring Boot 3.x standards, 10 sections |
| `.github/instructions/react.instructions.md` | `**/*.{ts,tsx}` | React 18/TypeScript/Ontario Design System, 9 sections |
| `.github/instructions/sql.instructions.md` | `**/*.sql` | Azure SQL/Flyway migrations, 7 sections |

### Documentation Files (3 files)

| File | Purpose |
|------|---------|
| `docs/architecture.md` | C4 Container diagram, Azure resource group rg-dev-125 |
| `docs/data-dictionary.md` | ER diagram, 3 tables, 5 seed program types |
| `docs/design-document.md` | 5 API endpoints (RFC 7807), component hierarchy |

### Talk Track (1 file)

| File | Purpose |
|------|---------|
| `TALK-TRACK.md` | 130-minute timeline, 8 acts, 9 checkpoints (v0.1.0-v1.0.0), risk mitigation |

### PowerShell Scripts (2 files)

| File | Lines | Purpose |
|------|-------|---------|
| `scripts/Start-Local.ps1` | 175 | 4 parameters, prerequisite checks, colored output |
| `scripts/Stop-Local.ps1` | 85 | Stop-ProcessOnPort function for ports 8080/3000 |

### Validation Results

* All 13 files exist in correct locations
* PowerShell scripts pass syntax validation
* mcp.json parses as valid JSON with correct organization and project values
* Instruction files have proper `applyTo` frontmatter

### Deployment Notes

No deployment required. These are scaffolding files for the live demo environment.
