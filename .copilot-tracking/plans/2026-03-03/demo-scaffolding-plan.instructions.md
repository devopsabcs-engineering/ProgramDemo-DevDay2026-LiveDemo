---
applyTo: '.copilot-tracking/changes/2026-03-03/demo-scaffolding-changes.md'
---
<!-- markdownlint-disable-file -->
# Implementation Plan: CIVIC Demo Scaffolding Files

## Overview

Create all 13 scaffolding files required for the Developer Day 2026 live demo, enabling GitHub Copilot to build the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) application from scratch during a 130-minute presentation.

## Objectives

### User Requirements

* Create 7 configuration files (.github/copilot-instructions.md, 4 instruction files, .vscode/mcp.json, .gitignore) — Source: Research document Section 1-2, 7
* Create 3 documentation files (architecture.md, data-dictionary.md, design-document.md) — Source: Research document Section 4
* Create 1 talk track file (TALK-TRACK.md) — Source: Research document Section 5
* Create 2 PowerShell scripts (Start-Local.ps1, Stop-Local.ps1) — Source: Research document Section 6
* Follow bilingual (EN/FR) patterns with i18next keys — Source: README.md conventions

### Derived Objectives

* Ensure instruction files use proper frontmatter with `applyTo` patterns — Derived from: GitHub Copilot instruction standards
* Structure talk track with presenter dialogue format and timing markers — Derived from: Research Section 5 formatting requirements
* Make scripts PowerShell 7 compatible with comment-based help — Derived from: PowerShell best practices

## Context Summary

### Project Files

* `.copilot-tracking/research/2026-03-03/demo-scaffolding-research.md` - Primary research document with all specifications
* `README.md` - Existing project README with technology stack and conventions

### References

* `.copilot-tracking/research/subagents/2026-03-03/copilot-instructions-research.md` - Detailed instruction file specs
* `.copilot-tracking/research/subagents/2026-03-03/ado-work-items-research.md` - ADO work item hierarchy
* `.copilot-tracking/research/subagents/2026-03-03/documentation-specs-research.md` - Documentation structure
* `.copilot-tracking/research/subagents/2026-03-03/talk-track-research.md` - Talk track timeline
* `.copilot-tracking/research/subagents/2026-03-03/scripts-gitignore-research.md` - Script specifications

### Standards References

* Ontario Design System: https://designsystem.ontario.ca/
* WCAG 2.2: https://www.w3.org/TR/WCAG22/
* RFC 7807 ProblemDetail: https://datatracker.ietf.org/doc/html/rfc7807

## Implementation Checklist

### [x] Implementation Phase 1: Core Configuration Files

<!-- parallelizable: true -->

* [x] Step 1.1: Create `.gitignore` with Java, Node, IDE, and OS sections
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 15-50)
* [x] Step 1.2: Create `.vscode/mcp.json` with Azure DevOps MCP server configuration
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 52-70)
* [x] Step 1.3: Create `.github/copilot-instructions.md` global Copilot instructions
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 72-140)

### [x] Implementation Phase 2: Language-Specific Instruction Files

<!-- parallelizable: true -->

* [x] Step 2.1: Create `.github/instructions/ado-workflow.instructions.md`
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 144-190)
* [x] Step 2.2: Create `.github/instructions/java.instructions.md`
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 192-290)
* [x] Step 2.3: Create `.github/instructions/react.instructions.md`
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 292-390)
* [x] Step 2.4: Create `.github/instructions/sql.instructions.md`
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 392-450)

### [x] Implementation Phase 3: Technical Documentation Files

<!-- parallelizable: true -->

* [x] Step 3.1: Create `docs/architecture.md` with C4 diagram
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 454-520)
* [x] Step 3.2: Create `docs/data-dictionary.md` with ER diagram and table specs
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 522-650)
* [x] Step 3.3: Create `docs/design-document.md` with API specs and component hierarchy
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 652-820)

### [x] Implementation Phase 4: Talk Track Documentation

<!-- parallelizable: false -->

* [x] Step 4.1: Create `TALK-TRACK.md` Part 1: Building From Zero (Minutes 0-70)
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 824-950)
* [x] Step 4.2: Complete `TALK-TRACK.md` Part 2: Closing the Loop (Minutes 70-130)
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 952-1100)

### [x] Implementation Phase 5: PowerShell Development Scripts

<!-- parallelizable: true -->

* [x] Step 5.1: Create `scripts/Start-Local.ps1` with build and server startup
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 1104-1200)
* [x] Step 5.2: Create `scripts/Stop-Local.ps1` with process termination
  * Details: .copilot-tracking/details/2026-03-03/demo-scaffolding-details.md (Lines 1202-1250)

### [x] Implementation Phase 6: Validation

<!-- parallelizable: false -->

* [x] Step 6.1: Verify all 13 files exist with correct paths
  * Run `Get-ChildItem -Recurse` to list all created files
  * Verify directory structure matches specification
* [x] Step 6.2: Validate Markdown formatting
  * Check frontmatter syntax on instruction files
  * Verify Mermaid diagram syntax in documentation files
* [x] Step 6.3: Test PowerShell script syntax
  * Run `Test-Script` or `pwsh -c` syntax check on both scripts
  * Verify comment-based help renders correctly
* [x] Step 6.4: Report any issues requiring follow-up
  * Document findings for user review
  * Identify any gaps from research specifications

## Planning Log

See [demo-scaffolding-log.md](.copilot-tracking/plans/logs/2026-03-03/demo-scaffolding-log.md) for discrepancy tracking, implementation paths considered, and suggested follow-on work.

## Dependencies

* PowerShell 7.x (for script development)
* Mermaid diagram support (for documentation validation)
* Git (for .gitignore verification)

## Success Criteria

* ✅ All 13 files created in their specified locations — Traces to: Research file count table
* ✅ Instruction files have proper `applyTo` frontmatter — Traces to: GitHub Copilot instruction standards
* ✅ Documentation files contain Mermaid diagrams — Traces to: Research Section 4
* ✅ Talk track covers full 130-minute timeline — Traces to: Research Section 5
* ✅ PowerShell scripts have comment-based help — Traces to: Research Section 6
* ✅ .gitignore includes `!.vscode/mcp.json` exception — Traces to: Research Section 7
