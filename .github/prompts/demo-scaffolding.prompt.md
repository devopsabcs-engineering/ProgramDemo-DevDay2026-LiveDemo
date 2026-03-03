---
description: "Research scaffolding requirements for CIVIC demo from README.md — produces comprehensive research document for planning"
agent: Task Researcher
argument-hint: "topic=demo-scaffolding"
---

# Demo Scaffolding Research

Research all scaffolding requirements for the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) GitHub Copilot demo.

## Inputs

* ${input:topic:demo-scaffolding}: Research topic identifier.

## Research Context

**Demo Overview:**

* **Duration**: 130 minutes (10:30 AM – 1:50 PM with lunch break 11:40 AM – 1:00 PM)
* **Audience**: Ontario Public Sector (OPS) developers and leadership
* **Presenters**: Hammad Aslam (MC) and Emmanuel (live coding)
* **Goal**: Showcase GitHub Copilot building CIVIC from scratch
* **Azure**: Resources pre-deployed in resource group `rg-dev-125`
* **ADO**: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-LiveDemo`

**Starting State (What Exists When Demo Begins):**

Only two files exist in the repository:

1. `README.md` — single source of truth for business problem and tech stack
2. `.github/prompts/bootstrap-demo.prompt.md` — this bootstrap prompt

Nothing else exists: no code, no documentation, no configuration files, no scripts, **no ADO work items** — all must be created via MCP during the demo.

---

Read `README.md` thoroughly and produce a comprehensive research document.

## Required Research Sections

### 1. Copilot Instructions Specification

Document all instruction files to create:

| File | `applyTo` | Content Summary |
|------|-----------|-----------------|
| `.github/copilot-instructions.md` | (global) | Project overview, tech stack, bilingual EN/FR, WCAG 2.2, Ontario DS, commit format `AB#{id}`, branch format `feature/{id}-description` |
| `.github/instructions/ado-workflow.instructions.md` | `**` | Branching, commit, PR conventions for ADO |
| `.github/instructions/java.instructions.md` | `backend/**` | Java 21, Spring Boot 3.x, Spring Data JPA, constructor injection, `@Valid` + Bean Validation, `ResponseEntity`, `ProblemDetail` (RFC 7807), Flyway, H2 local profile with `MODE=MSSQLServer`, package `com.ontario.program` |
| `.github/instructions/react.instructions.md` | `frontend/**` | React 18 + TypeScript + Vite (`server.port: 3000`), functional components with hooks, i18next for EN/FR, Ontario DS CSS classes, WCAG 2.2 Level AA, `react-router-dom`, axios |
| `.github/instructions/sql.instructions.md` | `database/**` | Azure SQL target, Flyway versioned migrations `V001__description.sql`, `NVARCHAR` for bilingual text, `IF NOT EXISTS` guards, `INT IDENTITY(1,1)` PKs, `DATETIME2` timestamps, seed data via `INSERT ... WHERE NOT EXISTS` |

### 2. MCP Configuration

Full `.vscode/mcp.json` specification:

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

### 3. ADO Work Item Creation Plan

Document the full hierarchy to create via MCP in Act 1 (none exist beforehand):

* **Epic**: CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community
  * **Feature**: Infrastructure Setup (pre-deployed in `rg-dev-125`, close immediately)
  * **Feature**: Database Layer — Stories: program_type table, program table, notification table, seed data
  * **Feature**: Backend API — Stories: Spring Boot scaffolding, submit endpoint, list/get endpoints, review endpoint, program-types endpoint
  * **Feature**: Citizen Portal — Stories: React scaffolding, Ontario DS layout, submission form, confirmation page, search page, bilingual EN/FR
  * **Feature**: Ministry Portal — Stories: review dashboard, review detail page, approve/reject actions
  * **Feature**: Quality Assurance — Stories: backend controller tests, frontend component tests, accessibility tests, bilingual verification
  * **Feature**: CI/CD Pipeline — Stories: CI workflow, Dependabot config, secret scanning
  * **Feature**: Live Change Demo — Stories: add program_budget field end-to-end, update tests for new field

### 4. Documentation Specifications

**`docs/architecture.md`:**

* Mermaid C4/flowchart diagram
* Components: browsers → React App Service → Java API App Service → Azure SQL
* Also show: Durable Functions, Logic Apps, AI Foundry

**`docs/data-dictionary.md`:**

* Mermaid ER diagram with 3 tables
* `program_type`: `id` (INT PK), `type_name` (NVARCHAR(100)), `type_name_fr` (NVARCHAR(100)) — no audit columns
* `program`: `id` (INT PK), `program_name` (NVARCHAR(200)), `program_description` (NVARCHAR(MAX)), `program_type_id` (INT FK), `status` (NVARCHAR(20) default 'DRAFT'), `reviewer_comments` (NVARCHAR(MAX)), `submitted_at` (DATETIME2), `reviewed_at` (DATETIME2), `created_at` (DATETIME2), `updated_at` (DATETIME2), `created_by` (NVARCHAR(100))
* `notification`: `id` (INT PK), `program_id` (INT FK), `notification_type` (NVARCHAR(50)), `recipient_email` (NVARCHAR(200)), `subject` (NVARCHAR(500)), `body` (NVARCHAR(MAX)), `sent_at` (DATETIME2), `created_at` (DATETIME2), `updated_at` (DATETIME2 DEFAULT GETDATE()), `status` (NVARCHAR(20))
* 5 program types seed data (EN/FR): Community Services, Health & Wellness, Education & Training, Environment & Conservation, Economic Development

**`docs/design-document.md`:**

* 5 API endpoints with request/response DTOs and validation rules
* RFC 7807 error handling specification
* Frontend component hierarchy: Layout (Header, Footer, LanguageToggle) → pages (SubmitProgram, SubmitConfirmation, SearchPrograms, ReviewDashboard, ReviewDetail)

### 5. Talk Track Specification

**Location**: `TALK-TRACK.md` at repository root (not in `docs/`)

**Duration**: 130 minutes total

**Presenter Roles:**

* 🎙️ **HAMMAD** — MC, sets context, asks questions, holds audience conversation
* 💻 **EMMANUEL** — on keyboard, driving all live coding

**Part 1: "Building From Zero" (Minutes 0–70 | ⏰ 10:30 AM – 11:40 AM)**

| Minutes | Time | Act | Content |
|---------|------|-----|---------|
| 0–8 | 10:30–10:38 | Opening | Show empty repo, Azure portal (`rg-dev-125`), empty ADO board |
| 8–20 | 10:38–10:50 | Act 1: The Architect | Run scaffolding prompts, configure MCP, create ADO Epic/Features/Stories via MCP |
| 20–32 | 10:50–11:02 | Act 2: The DBA | 4 Flyway migrations |
| 32–52 | 11:02–11:22 | Act 3: The Backend Developer | Spring Boot + 5 API endpoints + curl tests |
| 52–70 | 11:22–11:40 | Act 4: The Frontend Developer | React + Ontario DS + bilingual citizen portal |

**Cliffhanger (11:40 AM)**: Citizen can submit but Ministry Portal is empty — nobody can approve.

**Lunch Break**: 11:40 AM – 1:00 PM

**Part 2: "Closing the Loop" (Minutes 70–130 | ⏰ 1:00 PM – 2:00 PM)**

| Minutes | Time | Act | Content |
|---------|------|-----|---------|
| 70–73 | 1:00–1:03 | Recap | Quick recap, show submissions in database |
| 73–87 | 1:03–1:17 | Act 5: Completing the Story | Ministry review dashboard, detail, approve/reject |
| 87–100 | 1:17–1:30 | Act 6: The QA Engineer | Backend + frontend tests, accessibility |
| 100–107 | 1:30–1:37 | Act 7: The DevOps Engineer | CI pipeline, Dependabot, GHAS |
| 107–120 | 1:37–1:50 | Act 8: The Full Stack Change | Add program_budget field end-to-end |
| 120–130 | 1:50–2:00 | Closing | Summary stats, ADO board complete, Q&A |

**Formatting Requirements:**

* Two-presenter format with emoji indicators
* Scripted dialogue in blockquotes with presenter indicator
* `Demo actions:` bullet lists with minute markers AND actual times
* `Key beat (EMMANUEL):` and `Audience engagement point:` callouts
* Tagged commit checkpoints (v0.1.0 through v1.0.0) with recovery strategy
* Risk mitigation table
* Key numbers summary table

### 6. Local Development Scripts

**`scripts/Start-Local.ps1`:**

* Parameters: `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`
* Backend port 8080, frontend port 3000
* Help comments and `param()` block

**`scripts/Stop-Local.ps1`:**

* Kill processes on ports 8080 and 3000

### 7. `.gitignore` Specification

Combined rules for:

* Java: `target/`, `*.jar`, `*.class`, `.gradle/`, `build/`
* Node: `node_modules/`, `dist/`, `.env.local`
* IDE: `.idea/`, `*.iml`, `.vscode/` (except `mcp.json`)
* OS: `.DS_Store`, `Thumbs.db`
* Logs: `*.log`, `logs/`

## Out of Scope

* Document upload functionality
* `.devcontainer/devcontainer.json`
* Azure Durable Functions orchestration code
* Logic Apps connector configuration
* AI Foundry integration code
* CD deployment workflow

## Success Criteria

Research document must contain enough detail that `/task-plan` can produce a file-by-file implementation plan for all 13 scaffolding files without further clarification:

* 7 configuration files
* 3 documentation files
* 2 PowerShell scripts
* 1 talk track file (at repository root)
