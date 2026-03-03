<!-- markdownlint-disable-file -->
# Task Research: Demo Scaffolding for CIVIC GitHub Copilot Demo

Comprehensive research for scaffolding requirements needed prior to the Developer Day 2026 demo showcasing GitHub Copilot building the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) application from scratch.

## Task Implementation Requests

* Research and document all 13 scaffolding files required before demo begins
* Specify complete content for each file with implementation-ready detail
* Document ADO work item hierarchy for creation via MCP during demo
* Create talk track specification for 130-minute presentation

## Scope and Success Criteria

* Scope: All scaffolding files, documentation, PowerShell scripts, and talk track. Excludes dev container, Azure Durable Functions code, Logic Apps configuration, and AI Foundry integration code.
* Assumptions:
  * Azure resources pre-deployed in `rg-dev-125`
  * ADO organization `MngEnvMCAP675646`, project `ProgramDemo-DevDay2026-LiveDemo`
  * Demo starts with only README.md and bootstrap prompt in repository
  * All ADO work items created via MCP during Act 1
* Success Criteria:
  * ✅ Complete specification for all 7 configuration files
  * ✅ Complete specification for all 3 documentation files
  * ✅ Complete specification for 2 PowerShell scripts
  * ✅ Complete talk track with 130-minute timeline
  * ✅ Sufficient detail for `/task-plan` to generate implementation plan without clarification

## Outline

1. [Copilot Instructions Specification](#1-copilot-instructions-specification) (5 files)
2. [MCP Configuration](#2-mcp-configuration) (1 file)
3. [ADO Work Item Creation Plan](#3-ado-work-item-creation-plan) (33 work items)
4. [Documentation Specifications](#4-documentation-specifications) (3 files)
5. [Talk Track Specification](#5-talk-track-specification) (1 file)
6. [Local Development Scripts](#6-local-development-scripts) (2 PowerShell files)
7. [.gitignore Specification](#7-gitignore-specification) (1 file)

---

## Key Discoveries

| Category | Finding | Evidence |
|----------|---------|----------|
| **Technology Stack** | Java 21 + Spring Boot 3.x, React 18 + TypeScript + Vite | README.md |
| **Bilingual Pattern** | Java: `nameEn`/`nameFr` fields; React: i18next keys; SQL: `NVARCHAR` columns | Subagent research |
| **ADO Integration** | Commit: `AB#{id}:`, Branch: `feature/{id}-description`, PR: `Fixes AB#{id}` | README.md |
| **Local Database** | H2 with `MODE=MSSQLServer` for Azure SQL compatibility | README.md lessons learned |
| **Work Items** | 1 Epic, 8 Features, 24 User Stories = 33 total items | ADO subagent research |
| **Demo Duration** | 130 minutes with 80-minute lunch break; actual coding ~100 minutes | Talk track research |

## Selected Approach

Create all 13 scaffolding files with the following structure:

| # | File Path | Type | Lines (est.) |
|---|-----------|------|--------------|
| 1 | `.github/copilot-instructions.md` | Config | ~150 |
| 2 | `.github/instructions/ado-workflow.instructions.md` | Config | ~100 |
| 3 | `.github/instructions/java.instructions.md` | Config | ~250 |
| 4 | `.github/instructions/react.instructions.md` | Config | ~250 |
| 5 | `.github/instructions/sql.instructions.md` | Config | ~150 |
| 6 | `.vscode/mcp.json` | Config | ~10 |
| 7 | `docs/architecture.md` | Docs | ~100 |
| 8 | `docs/data-dictionary.md` | Docs | ~200 |
| 9 | `docs/design-document.md` | Docs | ~300 |
| 10 | `TALK-TRACK.md` | Docs | ~800 |
| 11 | `scripts/Start-Local.ps1` | Script | ~120 |
| 12 | `scripts/Stop-Local.ps1` | Script | ~60 |
| 13 | `.gitignore` | Config | ~100 |

---

## 1. Copilot Instructions Specification

### File 1.1: `.github/copilot-instructions.md`

**Frontmatter:**
```yaml
---
description: "Global GitHub Copilot instructions for the CIVIC Program Approval Demo - Ontario Public Sector Developer Day 2026"
---
```

**Content Sections:**
1. Project Overview - CIVIC demo purpose and goals
2. Architecture table - Frontend/Backend/Database/Cloud layers
3. Core Requirements:
   - Bilingual Support (EN/FR) with i18next keys
   - Accessibility (WCAG 2.2) requirements
   - Ontario Design System CSS classes
4. Package Structure - Backend (`com.ontario.program`) and Frontend (`src/`)
5. Development Workflow - Branch naming, commit format, PR conventions
6. Local Development - Commands for backend/frontend startup
7. Testing Requirements - JUnit 5, Vitest, vitest-axe

### File 1.2: `.github/instructions/ado-workflow.instructions.md`

**Frontmatter:**
```yaml
---
description: "Azure DevOps workflow conventions for branching, commits, and PR linking"
applyTo: "**"
---
```

**Content Sections:**
1. Branch Naming Convention: `feature/{work-item-id}-{short-description}`
2. Commit Message Format: `AB#{work-item-id}: {imperative-description}`
3. PR Title Format: `AB#{work-item-id}: {description}`
4. PR Body Requirements: Include `Fixes AB#{id}` for auto-close
5. Post-Merge Cleanup steps

### File 1.3: `.github/instructions/java.instructions.md`

**Frontmatter:**
```yaml
---
description: "Java 21 and Spring Boot 3.x coding standards for the CIVIC demo"
applyTo: "**/*.java"
---
```

**Content Sections:**
1. Technology Stack - Java 21, Spring Boot 3.x, Spring Data JPA, Flyway
2. Package Structure - `com.ontario.program.{controller,service,repository,model,dto,config}`
3. Entity Conventions - `jakarta.persistence`, bilingual fields (`nameEn`/`nameFr`), `LocalDateTime`
4. Repository Conventions - `JpaRepository`, method name queries, `@Query` for complex
5. Service Conventions - Constructor injection, `@Transactional(readOnly = true)`
6. Controller Conventions - `@RestController`, `ResponseEntity<T>`, `@Valid`
7. DTO Conventions - Java records with Bean Validation
8. Error Handling - RFC 7807 `ProblemDetail` with `@RestControllerAdvice`
9. Testing - JUnit 5, Mockito, Given/When/Then pattern
10. Local Profile - H2 with `MODE=MSSQLServer`, Flyway enabled

### File 1.4: `.github/instructions/react.instructions.md`

**Frontmatter:**
```yaml
---
description: "React 18 and TypeScript coding standards with Ontario Design System and WCAG 2.2 compliance"
applyTo: "**/*.{ts,tsx}"
---
```

**Content Sections:**
1. Technology Stack - React 18, TypeScript 5.x strict, Vite (port 3000), i18next
2. Project Structure - `components/`, `pages/`, `hooks/`, `services/`, `i18n/`, `types/`
3. Component Conventions - Functional components, explicit interfaces, TypeScript strict
4. Form Handling - React Hook Form with validation
5. Bilingual Support - i18next with `{feature}.{element}.{property}` key pattern
6. Ontario Design System - CSS classes, component library imports
7. Accessibility - ARIA attributes, focus management, keyboard navigation
8. API Integration - axios with typed responses
9. Testing - Vitest, React Testing Library, vitest-axe for accessibility

### File 1.5: `.github/instructions/sql.instructions.md`

**Frontmatter:**
```yaml
---
description: "Azure SQL and Flyway migration standards for the CIVIC demo"
applyTo: "**/*.sql"
---
```

**Content Sections:**
1. Target Database - Azure SQL (production), H2 with `MODE=MSSQLServer` (local)
2. Migration Naming - `V001__description.sql` format
3. Column Types - `NVARCHAR` for bilingual text, `INT IDENTITY(1,1)` for PKs, `DATETIME2` for timestamps
4. Table Guards - `IF NOT EXISTS` pattern for idempotent migrations
5. Seed Data - `INSERT ... WHERE NOT EXISTS` pattern (portable)
6. Foreign Keys - Named constraints with `FK_` prefix

---

## 2. MCP Configuration

### File 2.1: `.vscode/mcp.json`

```json
{
  "servers": {
    "azure-devops": {
      "command": "npx",
      "args": ["-y", "azure-devops-mcp", "--organization", "MngEnvMCAP675646", "--project", "ProgramDemo-DevDay2026-LiveDemo"]
    }
  }
}
```

---

## 3. ADO Work Item Creation Plan

### Summary Statistics

| Item Type | Count |
|-----------|-------|
| Epics | 1 |
| Features | 8 |
| User Stories | 24 |
| **Total** | **33** |

### Epic

**E1: CIVIC Program Request Management System**
- Description: Build a bilingual (EN/FR) web application enabling citizens to submit government program requests and ministry employees to review, approve, or reject submissions

### Features and User Stories

| Feature | Stories | Demo Act |
|---------|---------|----------|
| **F1: Infrastructure Setup** | 0 (Close immediately - pre-deployed) | Act 1 |
| **F2: Database Schema & Migrations** | 4 (program_type, program, notification, seed data) | Act 2 |
| **F3: Backend API Development** | 5 (POST, GET list, GET by id, PUT review, GET types) | Act 3 |
| **F4: Citizen Portal Frontend** | 5 (form, confirmation, search, layout, bilingual) | Act 4 |
| **F5: Ministry Portal Frontend** | 4 (dashboard, detail, approve/reject, auth UI) | Act 5 |
| **F6: Testing & Quality Assurance** | 4 (backend unit, integration, frontend, E2E) | Act 6 |
| **F7: CI/CD Pipeline** | 3 (build, release, IaC) | Act 7 |
| **F8: Live Change Demo** | 4 (migration, API, form, review display for budget) | Act 8 |

### User Stories Detail (F2-F8)

#### F2: Database Stories
- **US2.1**: Create program_type table migration (V001)
- **US2.2**: Create program table migration (V002)
- **US2.3**: Create notification table migration (V003)
- **US2.4**: Seed 5 bilingual program types (V004)

#### F3: Backend API Stories
- **US3.1**: POST /api/programs (submit)
- **US3.2**: GET /api/programs (list with filtering)
- **US3.3**: GET /api/programs/{id} (get by ID)
- **US3.4**: PUT /api/programs/{id}/review (approve/reject)
- **US3.5**: GET /api/program-types (lookup values)

#### F4: Citizen Portal Stories
- **US4.1**: Program submission form
- **US4.2**: Submission confirmation page
- **US4.3**: Program search page
- **US4.4**: Ontario Design System layout
- **US4.5**: Bilingual language toggle

#### F5: Ministry Portal Stories
- **US5.1**: Review dashboard with filters
- **US5.2**: Program review detail page
- **US5.3**: Approve/reject actions with comments
- **US5.4**: Basic authentication UI

#### F6: QA Stories
- **US6.1**: Backend unit tests (80% coverage)
- **US6.2**: Backend integration tests
- **US6.3**: Frontend component tests (75% coverage)
- **US6.4**: E2E tests for critical flows

#### F7: CI/CD Stories
- **US7.1**: GitHub Actions CI workflow
- **US7.2**: Dependabot configuration
- **US7.3**: GHAS secret scanning

#### F8: Live Change Stories (program_budget field)
- **US8.1**: V005 migration adding program_budget column
- **US8.2**: Backend API updates for budget field
- **US8.3**: Citizen form budget input
- **US8.4**: Ministry review budget display

---

## 4. Documentation Specifications

### File 4.1: `docs/architecture.md`

**Content:**
1. Title and overview
2. Mermaid C4Container diagram showing:
   - Citizens and Ministry Reviewers (Persons)
   - Azure boundary with:
     - React App Service (frontend)
     - Java API App Service (backend)
     - Azure SQL Database
     - Azure Durable Functions
     - Logic Apps
     - AI Foundry
3. Technology stack table
4. Azure resources list (rg-dev-125)
5. Compliance summary

### File 4.2: `docs/data-dictionary.md`

**Content:**
1. Mermaid ER diagram with relationships:
   - `program_type ||--o{ program`
   - `program ||--o{ notification`
2. Three table specifications:

**program_type (reference data, no audit columns):**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK IDENTITY(1,1) |
| type_name | NVARCHAR(100) | NOT NULL |
| type_name_fr | NVARCHAR(100) | NOT NULL |

**program (main entity):**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK IDENTITY(1,1) |
| program_name | NVARCHAR(200) | NOT NULL |
| program_description | NVARCHAR(MAX) | |
| program_type_id | INT | FK → program_type(id) |
| status | NVARCHAR(20) | DEFAULT 'DRAFT' |
| reviewer_comments | NVARCHAR(MAX) | |
| submitted_at | DATETIME2 | |
| reviewed_at | DATETIME2 | |
| created_at | DATETIME2 | NOT NULL |
| updated_at | DATETIME2 | |
| created_by | NVARCHAR(100) | |

**notification (audit/history):**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK IDENTITY(1,1) |
| program_id | INT | FK → program(id) |
| notification_type | NVARCHAR(50) | |
| recipient_email | NVARCHAR(200) | |
| subject | NVARCHAR(500) | |
| body | NVARCHAR(MAX) | |
| sent_at | DATETIME2 | |
| created_at | DATETIME2 | NOT NULL |
| updated_at | DATETIME2 | DEFAULT GETDATE() |
| status | NVARCHAR(20) | |

3. Seed data (5 program types):
   - Community Services / Services communautaires
   - Health & Wellness / Santé et bien-être
   - Education & Training / Éducation et formation
   - Environment & Conservation / Environnement et conservation
   - Economic Development / Développement économique

### File 4.3: `docs/design-document.md`

**Content:**
1. API Endpoints (5 total):
   - POST /api/programs - CreateProgramRequest/ProgramResponse DTOs
   - GET /api/programs - PagedResponse with query params
   - GET /api/programs/{id} - ProgramResponse
   - PUT /api/programs/{id}/review - ReviewProgramRequest
   - GET /api/program-types - ProgramTypeResponse[]

2. RFC 7807 ProblemDetail specification with example response

3. Frontend Component Hierarchy:
```
App → BrowserRouter → Layout → Routes
  Layout: Header, LanguageToggle, Footer
  Routes: /, /confirmation/:id, /search, /review, /review/:id
```

4. TypeScript interfaces for all DTOs and component props

5. WCAG 2.2 compliance checklist

6. Ontario Design System component mapping

---

## 5. Talk Track Specification

### File 5.1: `TALK-TRACK.md` (repository root)

**Header:**
- Event: Developer Day 2026 — Ontario Public Sector
- Duration: 130 minutes (10:30 AM – 2:00 PM)
- Break: 11:40 AM – 1:00 PM (Lunch)
- Presenters: 🎙️ HAMMAD (MC), 💻 EMMANUEL (keyboard)

### Part 1: Building From Zero (Minutes 0–70 | 10:30–11:40 AM)

| Minutes | Time | Act | Content |
|---------|------|-----|---------|
| 0–8 | 10:30–10:38 | Opening | Empty repo tour, Azure portal, empty ADO board |
| 8–20 | 10:38–10:50 | Act 1: Architect | Scaffolding, MCP config, ADO work items via MCP |
| 20–32 | 10:50–11:02 | Act 2: DBA | 4 Flyway migrations (V001-V004) |
| 32–52 | 11:02–11:22 | Act 3: Backend | Spring Boot + 5 API endpoints + curl tests |
| 52–70 | 11:22–11:40 | Act 4: Frontend | React + Ontario DS + bilingual citizen portal |

**CLIFFHANGER (11:40 AM):** Citizens can submit but Ministry Portal is empty — nobody can approve!

### Part 2: Closing the Loop (Minutes 70–130 | 1:00–2:00 PM)

| Minutes | Time | Act | Content |
|---------|------|-----|---------|
| 70–73 | 1:00–1:03 | Recap | Database query, show pending submissions |
| 73–87 | 1:03–1:17 | Act 5: Complete | Ministry dashboard, detail, approve/reject |
| 87–100 | 1:17–1:30 | Act 6: QA | Backend + frontend + accessibility tests |
| 100–107 | 1:30–1:37 | Act 7: DevOps | CI workflow, Dependabot, GHAS |
| 107–120 | 1:37–1:50 | Act 8: Full Stack | Add program_budget end-to-end |
| 120–130 | 1:50–2:00 | Closing | Stats summary, ADO board complete, Q&A |

### Formatting Requirements

1. **Presenter dialogue:** Blockquotes with emoji indicators
   ```markdown
   > 🎙️ **HAMMAD**: [MC dialogue]
   > 💻 **EMMANUEL**: [Technical response]
   ```

2. **Demo actions:** Minute + time format
   ```markdown
   - **[MM:SS] HH:MM AM/PM** — Action description
   ```

3. **Callouts:**
   - `**Key beat (EMMANUEL):**` for pivotal moments
   - `**Audience engagement point:**` for interaction

4. **Checkpoints:** 9 version tags (v0.1.0 → v1.0.0)

5. **Risk mitigation tables** per act

6. **Key numbers summary:**
   - ~2,350+ lines of code
   - 25+ work items completed
   - 100% ADO board closure

---

## 6. Local Development Scripts

### File 6.1: `scripts/Start-Local.ps1`

**Parameters:**
- `-SkipBuild` — Skip Maven/npm build steps
- `-BackendOnly` — Start only Java backend (port 8080)
- `-FrontendOnly` — Start only React frontend (port 3000)
- `-UseAzureSql` — Use Azure SQL instead of H2

**Features:**
- Comment-based help (`.SYNOPSIS`, `.DESCRIPTION`, `.PARAMETER`, `.EXAMPLE`)
- Prerequisite checks (Java 21, Maven, Node, npm)
- Colored status output
- Spring profile switching (`local` vs `azure`)
- `Start-Process` for backgrounded servers

### File 6.2: `scripts/Stop-Local.ps1`

**Features:**
- Uses `Get-NetTCPConnection` to find processes on ports 8080/3000
- `Stop-Process -Force` to terminate
- Reports what was stopped or "no processes running"

---

## 7. .gitignore Specification

### File 7.1: `.gitignore`

**Sections:**
1. **Java/Maven:** `target/`, `*.jar`, `*.class`, `*.war`, `*.ear`, `.gradle/`, `build/`
2. **Node/npm:** `node_modules/`, `dist/`, `.env.local`, `npm-debug.log*`
3. **IDE:** `.idea/`, `*.iml`, `.vscode/*` with `!.vscode/mcp.json` exception
4. **OS:** `.DS_Store`, `Thumbs.db`, `Desktop.ini`
5. **Logs:** `*.log`, `logs/`, `spring.log`
6. **Coverage:** `coverage/`, `*.lcov`, `jacoco/`
7. **H2 Database:** `*.mv.db`, `*.trace.db`
8. **Certificates:** `*.pem`, `*.key`, `*.crt`, `*.p12`, `*.jks`

**Critical:** Must include `!.vscode/mcp.json` to keep MCP configuration tracked.

---

## Research Evidence

### Subagent Documents Created

| Document | Path | Status |
|----------|------|--------|
| Copilot Instructions | `.copilot-tracking/research/subagents/2026-03-03/copilot-instructions-research.md` | ✅ Complete |
| ADO Work Items | `.copilot-tracking/research/subagents/2026-03-03/ado-work-items-research.md` | ✅ Complete |
| Documentation Specs | `.copilot-tracking/research/subagents/2026-03-03/documentation-specs-research.md` | ✅ Complete |
| Talk Track | `.copilot-tracking/research/subagents/2026-03-03/talk-track-research.md` | ✅ Complete |
| Scripts/Gitignore | `.copilot-tracking/research/subagents/2026-03-03/scripts-gitignore-research.md` | ✅ Complete |

### External References

- Ontario Design System: https://designsystem.ontario.ca/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- RFC 7807 ProblemDetail: https://datatracker.ietf.org/doc/html/rfc7807
- Spring Boot 3.x: https://spring.io/projects/spring-boot
- React 18: https://react.dev/
- i18next: https://www.i18next.com/
- Flyway: https://flywaydb.org/

---

## Out of Scope (Confirmed)

- Document upload functionality
- `.devcontainer/devcontainer.json`
- Azure Durable Functions orchestration code
- Logic Apps connector configuration
- AI Foundry integration code
- CD deployment workflow (CI only)

---

## Potential Next Research

- [ ] Ontario Design System exact CSS class names for specific components
- [ ] i18next JSON structure and translation file templates
- [ ] ADO MCP Server exact API command syntax for work item creation
- [ ] Pre-recorded video production specifications
- [ ] Anticipated Q&A questions for closing

---

**Research Status: ✅ COMPLETE**

All 13 scaffolding file specifications documented with sufficient detail for `/task-plan` to generate a file-by-file implementation plan without further clarification.
