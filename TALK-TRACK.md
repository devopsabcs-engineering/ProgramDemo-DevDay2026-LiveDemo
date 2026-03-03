---
title: CIVIC Demo Talk Track
description: Two-presenter talk track for the Developer Day 2026 live coding demonstration
author: CIVIC Demo Team
ms.date: 2026-03-03
ms.topic: reference
---

**Event:** Developer Day 2026 — Ontario Public Sector
**Duration:** 130 minutes (10:30 AM – 2:00 PM)
**Break:** 11:40 AM – 1:00 PM (Lunch - 80 minutes)
**Actual Coding Time:** ~100 minutes
**Presenters:**

- 🎙️ **HAMMAD** (MC) - Narration and audience engagement
- 💻 **EMMANUEL** (Keyboard) - Live coding with GitHub Copilot

## Presenter Roles

| Emoji | Presenter | Role                                                              |
|-------|-----------|-------------------------------------------------------------------|
| 🎙️    | HAMMAD    | MC — sets context, asks questions, holds audience conversation    |
| 💻    | EMMANUEL  | On keyboard — drives all live coding with GitHub Copilot          |

## Checkpoint Strategy

| Tag      | Checkpoint                    | Minute | Time       |
|----------|-------------------------------|--------|------------|
| `v0.1.0` | Scaffolding complete          | 20     | 10:50 AM   |
| `v0.2.0` | Database schema complete      | 32     | 11:02 AM   |
| `v0.3.0` | Backend API complete          | 52     | 11:22 AM   |
| `v0.4.0` | Citizen Portal complete       | 70     | 11:40 AM   |
| `v0.5.0` | Ministry Portal complete      | 87     | 1:17 PM    |
| `v0.6.0` | Test suite complete           | 100    | 1:30 PM    |
| `v0.7.0` | CI/CD configuration complete  | 107    | 1:37 PM    |
| `v0.8.0` | Budget migration complete     | 115    | 1:45 PM    |
| `v1.0.0` | Full demo complete            | 120    | 1:50 PM    |

---

## Part 1: Building From Zero (Minutes 0-70 | 10:30-11:40 AM)

### Opening (Minutes 0-8 | 10:30-10:38 AM)

**Purpose:** Set the stage, show the "blank canvas"

#### Scripted Dialogue — Opening

> 🎙️ **HAMMAD**: Good morning everyone! Welcome to Developer Day 2026. Today we're going to do something a little different — we're going to build an entire government application from scratch, right here, right now, using GitHub Copilot.
>
> 🎙️ **HAMMAD**: Emmanuel, can you show us what we're starting with?
>
> 💻 **EMMANUEL**: Absolutely. Let me share my screen. You can see our GitHub repository here — look at this, we have exactly one file: a README. That's it. No code. No database. Nothing.
>
> 🎙️ **HAMMAD**: And what about our infrastructure?
>
> 💻 **EMMANUEL**: *Opens Azure portal* Here's our resource group — `rg-dev-125`. The infrastructure team has pre-deployed our Azure resources, but they're empty. No data, no connections, no deployed applications.
>
> 🎙️ **HAMMAD**: And our backlog?
>
> 💻 **EMMANUEL**: *Opens Azure DevOps* Zero work items. No Epic. No Features. No Stories. We're starting from absolute zero.
>
> 🎙️ **HAMMAD**: So in the next 70 minutes before lunch, we're going to have a working citizen portal. Let's see if Copilot can help us get there.

**Demo actions:**

- **[00:00] 10:30 AM** — Open VS Code, show empty repository with only `README.md`
- **[02:00] 10:32 AM** — Open Azure Portal, navigate to `rg-dev-125`, show pre-deployed (but empty) resources
- **[04:00] 10:34 AM** — Open Azure DevOps, show empty backlog boards
- **[06:00] 10:36 AM** — Return to VS Code, read through README.md highlighting business problem

**Key beat (EMMANUEL):** Emphasize the empty state — "This is ALL we have. One file."

**Audience engagement point:** "How many of you have started a new project in the last year? Show of hands."

---

### Act 1: The Architect (Minutes 8-20 | 10:38-10:50 AM)

**Purpose:** Set up project structure, create all work items via MCP

**Checkpoint:** `v0.1.0` — Project scaffolding complete

#### Scripted Dialogue — Act 1

> 🎙️ **HAMMAD**: Alright, so before we write any code, we need to set up our project structure. Emmanuel, where do you start?
>
> 💻 **EMMANUEL**: First I need Copilot to understand our project. Let me create some instruction files. *Opens Copilot Chat*
>
> I'm going to ask Copilot: "Based on our README, generate a copilot-instructions.md file that describes our tech stack, coding conventions, and the fact that we need bilingual support."
>
> 🎙️ **HAMMAD**: And Copilot's going to write all that for us?
>
> 💻 **EMMANUEL**: Watch this. *Shows Copilot generating the file* It's picking up from the README that we're using React, Java Spring Boot, Azure SQL. It even knows we need Ontario Design System compliance and WCAG accessibility.
>
> 🎙️ **HAMMAD**: Now what about our backlog? We need something to track.
>
> 💻 **EMMANUEL**: This is where it gets interesting. We've configured the Azure DevOps MCP server. Now I can ask Copilot to create our entire work item hierarchy directly in ADO.
>
> *Types: "Create an Epic for CIVIC with Features for Database, Backend API, Citizen Portal, Ministry Portal, QA, and CI/CD. Each Feature should have 3-5 User Stories based on the README requirements."*
>
> 🎙️ **HAMMAD**: Wait — Copilot is actually creating work items in Azure DevOps right now?
>
> 💻 **EMMANUEL**: *Shows ADO updating* Look at the board. Epic created. Features appearing. Stories populating. This would normally take a Product Owner an hour to set up.

**Demo actions:**

- **[08:00] 10:38 AM** — Create `.github/copilot-instructions.md` via Copilot
- **[10:00] 10:40 AM** — Create `.github/instructions/java.instructions.md`
- **[11:00] 10:41 AM** — Create `.github/instructions/react.instructions.md`
- **[12:00] 10:42 AM** — Create `.github/instructions/sql.instructions.md`
- **[13:00] 10:43 AM** — Configure `.vscode/mcp.json` for Azure DevOps
- **[14:00] 10:44 AM** — Restart VS Code to load MCP server
- **[15:00] 10:45 AM** — Create Epic via MCP (show ADO updating live)
- **[17:00] 10:47 AM** — Create Features via MCP
- **[18:30] 10:48:30 AM** — Create User Stories via MCP
- **[20:00] 10:50 AM** — Commit and tag `v0.1.0`

**Key beat (EMMANUEL):** Show ADO board updating in real-time as MCP creates work items

**Audience engagement point:** "Who here has spent more than an hour just setting up a backlog for a new project?"

#### Files Created — Act 1

| File                                                | Purpose                      |
|-----------------------------------------------------|------------------------------|
| `.github/copilot-instructions.md`                   | Global project conventions   |
| `.github/instructions/java.instructions.md`         | Java/Spring Boot conventions |
| `.github/instructions/react.instructions.md`        | React/TypeScript conventions |
| `.github/instructions/sql.instructions.md`          | SQL/Flyway conventions       |
| `.github/instructions/ado-workflow.instructions.md` | ADO workflow conventions     |
| `.vscode/mcp.json`                                  | MCP server configuration     |
| `docs/architecture.md`                              | System architecture diagram  |
| `docs/data-dictionary.md`                           | ER diagram and table specs   |
| `docs/design-document.md`                           | API and component specs      |

#### Risk Mitigation — Act 1

| Risk                                     | Likelihood | Impact | Mitigation                           | Recovery                             |
|------------------------------------------|------------|--------|--------------------------------------|--------------------------------------|
| MCP server won't start                   | Medium     | High   | Pre-test MCP, have manual ADO ready  | Create work items manually via ADO   |
| Copilot generates incorrect instructions | Medium     | Medium | Review generated content live        | Edit manually, explain correction    |
| VS Code extension crash                  | Low        | High   | Have second VS Code instance ready   | Restart, checkout v0.0.0             |

---

### Act 2: The DBA (Minutes 20-32 | 10:50-11:02 AM)

**Purpose:** Create database schema via Flyway migrations

**Checkpoint:** `v0.2.0` — Database schema complete

#### Scripted Dialogue — Act 2

> 🎙️ **HAMMAD**: Alright architects have done their job. Now we need a database. Emmanuel, you're wearing the DBA hat now?
>
> 💻 **EMMANUEL**: That's right. And our data-dictionary document has everything Copilot needs. Let me pull the first Database User Story from ADO... *Shows story* "Create program_type table for lookup values."
>
> I'll ask Copilot: "Generate a Flyway migration V001 for the program_type table based on our data-dictionary.md"
>
> 🎙️ **HAMMAD**: And it knows about the bilingual columns?
>
> 💻 **EMMANUEL**: *Shows generated SQL* Look — `type_name` and `type_name_fr`. It picked that up from our documentation. And it's using `NVARCHAR` for Unicode support, `IF NOT EXISTS` guards — all the patterns from our sql.instructions.md.
>
> 🎙️ **HAMMAD**: How do we verify this works?
>
> 💻 **EMMANUEL**: We're using H2 locally with SQL Server compatibility mode. Let me run the migration... *Executes* Done. Table created. And now the seed data...

**Demo actions:**

- **[20:00] 10:50 AM** — Pull DBA User Story from ADO
- **[21:00] 10:51 AM** — Create `database/migrations/V001__create_program_type.sql`
- **[23:00] 10:53 AM** — Create `database/migrations/V002__create_program.sql`
- **[25:00] 10:55 AM** — Create `database/migrations/V003__create_notification.sql`
- **[27:00] 10:57 AM** — Create `database/migrations/V004__seed_program_types.sql`
- **[29:00] 10:59 AM** — Start backend to run migrations (H2 + Flyway)
- **[31:00] 11:01 AM** — Verify tables via H2 console
- **[32:00] 11:02 AM** — Commit and tag `v0.2.0`, update ADO stories

**Key beat (EMMANUEL):** Run migrations and show H2 console with created tables

**Audience engagement point:** "How many database migrations does your typical project have? We just created 4 in 12 minutes."

#### Files Created — Act 2

| File                                                | Purpose                   |
|-----------------------------------------------------|---------------------------|
| `database/migrations/V001__create_program_type.sql` | Lookup table              |
| `database/migrations/V002__create_program.sql`      | Main entity table         |
| `database/migrations/V003__create_notification.sql` | Notifications table       |
| `database/migrations/V004__seed_program_types.sql`  | 5 program types (EN/FR)   |

#### Risk Mitigation — Act 2

| Risk                                 | Likelihood | Impact | Mitigation                            | Recovery                      |
|--------------------------------------|------------|--------|---------------------------------------|-------------------------------|
| H2 won't start                       | Low        | High   | Pre-test H2, have Azure SQL fallback  | Connect to Azure SQL directly |
| Flyway migration syntax error        | Medium     | Medium | Review SQL before running             | Manual SQL correction         |
| Missing FK constraint causes failure | Medium     | Medium | Review data-dictionary                | Adjust migration order        |

---

### Act 3: The Backend Developer (Minutes 32-52 | 11:02-11:22 AM)

**Purpose:** Create Spring Boot API with 5 endpoints

**Checkpoint:** `v0.3.0` — Backend API complete

#### Scripted Dialogue — Act 3

> 🎙️ **HAMMAD**: Database is ready. Time for the API layer. What's the plan?
>
> 💻 **EMMANUEL**: *Pulls Backend Story from ADO* We need 5 endpoints. Let me start with the Spring Boot scaffolding. I'll use Copilot to generate the project structure...
>
> *Types: "Generate a Spring Boot 3.x project with Java 21, Spring Data JPA, Flyway, H2 for local development, package com.ontario.program"*
>
> 🎙️ **HAMMAD**: What about the actual endpoints?
>
> 💻 **EMMANUEL**: Let's do them one by one. First, `POST /api/programs` to submit a new program. Copilot, generate a controller, service, and DTO based on our design-document.md...
>
> *Shows code generation* Look at this — it created the controller, added `@Valid` for bean validation, wrapped the response in `ResponseEntity`. This matches our Java instructions file perfectly.
>
> 🎙️ **HAMMAD**: Can we see it work?
>
> 💻 **EMMANUEL**: Let me start the application... *Starts Spring Boot* Now I'll hit it with curl...
>
> ```bash
> curl -X POST http://localhost:8080/api/programs \
>   -H "Content-Type: application/json" \
>   -d '{"programName":"Community Garden","description":"Neighborhood garden initiative","programTypeId":1}'
> ```
>
> 🎙️ **HAMMAD**: *Shows 201 response* It's working! One endpoint down, four to go.

**Demo actions:**

- **[32:00] 11:02 AM** — Pull Backend Story from ADO
- **[33:00] 11:03 AM** — Generate Spring Boot `pom.xml` and main class
- **[35:00] 11:05 AM** — Generate `ProgramController` with POST /api/programs
- **[38:00] 11:08 AM** — Generate `GET /api/programs` (list all) and `GET /api/programs/{id}`
- **[41:00] 11:11 AM** — Generate `PUT /api/programs/{id}/review` (approve/reject)
- **[44:00] 11:14 AM** — Generate `GET /api/program-types` (lookup values)
- **[47:00] 11:17 AM** — Start Spring Boot application
- **[48:00] 11:18 AM** — Test endpoints with curl commands (show all 5)
- **[51:00] 11:21 AM** — Commit and tag `v0.3.0`, update ADO stories
- **[52:00] 11:22 AM** — Keep backend running for frontend integration

**Key beat (EMMANUEL):** Live curl test showing 201 Created response with program ID

**Audience engagement point:** "5 endpoints in 20 minutes. Complete with validation, error handling, service layer. Who wants to check my code coverage later?"

#### API Endpoints

| Method | Endpoint                    | Purpose                |
|--------|-----------------------------|------------------------|
| POST   | `/api/programs`             | Submit new program     |
| GET    | `/api/programs`             | List all programs      |
| GET    | `/api/programs/{id}`        | Get program by ID      |
| PUT    | `/api/programs/{id}/review` | Approve/reject program |
| GET    | `/api/program-types`        | Get lookup values      |

#### Risk Mitigation — Act 3

| Risk                        | Likelihood | Impact | Mitigation                        | Recovery                    |
|-----------------------------|------------|--------|-----------------------------------|-----------------------------|
| Spring Boot won't compile   | Medium     | High   | Pre-compiled JAR backup           | Run pre-built version       |
| Port 8080 already in use    | Low        | Low    | Stop-Local.ps1 before demo        | Kill process manually       |
| Curl command syntax error   | Low        | Low    | Pre-tested curl commands          | Copy from backup script     |

---

### Act 4: The Frontend Developer (Minutes 52-70 | 11:22-11:40 AM)

**Purpose:** Create React citizen portal with Ontario Design System

**Checkpoint:** `v0.4.0` — Citizen Portal complete

#### Scripted Dialogue — Act 4

> 🎙️ **HAMMAD**: Backend is serving data. Now we need somewhere for citizens to interact. Emmanuel?
>
> 💻 **EMMANUEL**: *Pulls Frontend Story* Time for React. Let me scaffold the project...
>
> *Creates React + Vite + TypeScript project* Now the real magic — Ontario Design System. I need Copilot to create components that match the ODS standards.
>
> 🎙️ **HAMMAD**: And the bilingual requirement?
>
> 💻 **EMMANUEL**: i18next handles that. Watch — I'll create the submission form with both English and French labels... *Shows component generation with translation keys*
>
> Here's the form in English... *Clicks language toggle* ...and here it is in French. "Soumettez votre programme."
>
> 🎙️ **HAMMAD**: *Audience murmurs* That's impressive. Can a citizen actually submit something?
>
> 💻 **EMMANUEL**: Let's try. *Fills out form, clicks Submit* ...and look at the backend logs. POST request received, 201 Created. The program is in our database!
>
> 🎙️ **HAMMAD**: So a citizen can now submit programs. But wait — Emmanuel, where do Ministry employees review these submissions?
>
> 💻 **EMMANUEL**: *Pauses, looks at audience* That... is an excellent question. We have the API endpoint for review, but we haven't built the Ministry Portal yet.
>
> 🎙️ **HAMMAD**: So citizens can submit... but nobody can approve them?
>
> 💻 **EMMANUEL**: Not yet.
>
> 🎙️ **HAMMAD**: *To audience* Well folks, I think that's a perfect problem to solve... after lunch.

**Demo actions:**

- **[52:00] 11:22 AM** — Pull Frontend Stories from ADO
- **[53:00] 11:23 AM** — Create React + Vite + TypeScript scaffold
- **[55:00] 11:25 AM** — Add Ontario Design System CSS and fonts
- **[57:00] 11:27 AM** — Create Layout component (Header, Footer, LanguageToggle)
- **[60:00] 11:30 AM** — Create SubmitProgram form page
- **[63:00] 11:33 AM** — Configure i18next with EN/FR translations
- **[65:00] 11:35 AM** — Create SubmitConfirmation page
- **[67:00] 11:37 AM** — Wire axios to backend API
- **[68:00] 11:38 AM** — Live demo: Submit a program, show bilingual toggle
- **[69:00] 11:39 AM** — Commit and tag `v0.4.0`, update ADO stories
- **[70:00] 11:40 AM** — **CLIFFHANGER**: Mention Ministry Portal is missing

**Key beat (EMMANUEL):** Live form submission showing data flow from React → API → Database

**Audience engagement point:** "Let's flip the language toggle — is the French translation correct? Anyone here speak French?"

#### Risk Mitigation — Act 4

| Risk                        | Likelihood | Impact | Mitigation                        | Recovery                    |
|-----------------------------|------------|--------|-----------------------------------|-----------------------------|
| npm install takes too long  | High       | Medium | Pre-cached node_modules           | Skip install, use cache     |
| Ontario DS CSS not loading  | Medium     | Medium | Pre-downloaded CSS backup         | Load from local files       |
| CORS error on API call      | Medium     | High   | Backend CORS config tested        | Add CORS annotation         |
| i18next translation missing | Low        | Low    | Fallback keys defined             | Show English only           |

---

## 🎬 CLIFFHANGER (11:40 AM)

### The Dramatic Setup

> 🎙️ **HAMMAD**: *Standing up from chair* Okay everyone, let me summarize where we are. Emmanuel, can you show the database?
>
> 💻 **EMMANUEL**: *Opens H2 console, runs query* We have... *counts* ...five program submissions in the database. Real data from real form submissions.
>
> 🎙️ **HAMMAD**: And the ADO board?
>
> 💻 **EMMANUEL**: *Shows board* Database Feature — complete. Backend API — complete. Citizen Portal — complete. Three Features done in 70 minutes.
>
> 🎙️ **HAMMAD**: But I see three Features still in "New" status. Ministry Portal. QA. CI/CD.
>
> 💻 **EMMANUEL**: *Nods slowly* Correct.
>
> 🎙️ **HAMMAD**: Which means... Ontario citizens can submit program requests right now. But those requests just... sit there?
>
> 💻 **EMMANUEL**: No Ministry employee can see them. No approvals. No rejections. Just... pending forever.
>
> 🎙️ **HAMMAD**: *To audience* Sounds like a typical government project. *Laughter* Enjoy your lunch everyone — we'll close this loop at 1:00. Don't be late!

**Emotional Arc:** Accomplishment → Realization → Suspense → Humor → Promise

---

## LUNCH BREAK (11:40 AM – 1:00 PM)

**During break:**

- Keep backend and frontend running (shows persistence)
- Optional: Submit a few more programs via citizen portal (audience can try if setup allows)
- Have backup videos ready in case restart is needed

---

## Part 2: Closing the Loop (Minutes 70-130 | 1:00-2:00 PM)

### Recap (Minutes 70-73 | 1:00-1:03 PM)

**Purpose:** Re-engage audience, remind of cliffhanger

#### Scripted Dialogue — Recap

> 🎙️ **HAMMAD**: Welcome back! Hope you had a good lunch. Emmanuel, where did we leave off?
>
> 💻 **EMMANUEL**: *Opens H2 console* Let me check our database... we now have... *counts* ...nine submissions in the queue. Seems someone was busy during lunch.
>
> 🎙️ **HAMMAD**: And not a single one approved, correct?
>
> 💻 **EMMANUEL**: Correct. Citizens are submitting. Ministry staff are... eating sandwiches.
>
> 🎙️ **HAMMAD**: Let's fix that.

**Demo actions:**

- **[70:00] 1:00 PM** — Reopen VS Code, show running services
- **[71:00] 1:01 PM** — Query database, show pending submissions
- **[72:00] 1:02 PM** — Show ADO board with remaining Features
- **[73:00] 1:03 PM** — Transition to Act 5

---

### Act 5: Completing the Story (Minutes 73-87 | 1:03-1:17 PM)

**Purpose:** Build Ministry Portal — Review Dashboard, Detail Page, Approve/Reject

**Checkpoint:** `v0.5.0` — Ministry Portal complete

#### Scripted Dialogue — Act 5

> 💻 **EMMANUEL**: *Pulls Ministry Portal Story* Now we close the loop. I need a dashboard showing all pending submissions, a detail page for each, and approve/reject buttons.
>
> 🎙️ **HAMMAD**: Same Ontario Design System?
>
> 💻 **EMMANUEL**: Absolutely. Same components, just different data and actions. Watch — Copilot already knows our component structure from the Citizen Portal...
>
> *Creates ReviewDashboard* I'm asking for a table of submissions with status badges. Boom — component generated. Now the detail page... *Creates ReviewDetail* ...with approve and reject buttons that call our PUT endpoint.
>
> 🎙️ **HAMMAD**: And the bilingual support?
>
> 💻 **EMMANUEL**: Same i18next setup. "Approuver" and "Rejeter" in French.
>
> 🎙️ **HAMMAD**: Let's see it work!
>
> 💻 **EMMANUEL**: *Opens Ministry Portal, shows dashboard* Here are our 9 pending submissions. Let me click into one... *Shows detail* ...and approve it.
>
> *Clicks Approve* ...status changed to "APPROVED". Let me check the database... *Shows updated record* ...reviewed_at timestamp set, status updated.
>
> 🎙️ **HAMMAD**: *To audience* 14 minutes ago, we had no Ministry Portal. Now we have a fully functional review system.

**Demo actions:**

- **[73:00] 1:03 PM** — Pull Ministry Portal Stories from ADO
- **[74:00] 1:04 PM** — Create `ReviewDashboard.tsx` component
- **[77:00] 1:07 PM** — Create `ReviewDetail.tsx` component
- **[80:00] 1:10 PM** — Add approve/reject actions with API calls
- **[82:00] 1:12 PM** — Add routing for `/ministry/*` paths
- **[84:00] 1:14 PM** — Live demo: View dashboard, open submission, approve it
- **[86:00] 1:16 PM** — Verify approval in database
- **[87:00] 1:17 PM** — Commit and tag `v0.5.0`, update ADO stories

**Key beat (EMMANUEL):** Live approve action showing real-time database update

**Audience engagement point:** "The citizen-to-ministry loop is now complete. Who would have bet we'd get here in under 90 minutes?"

#### Risk Mitigation — Act 5

| Risk                              | Likelihood | Impact | Mitigation                       | Recovery                       |
|-----------------------------------|------------|--------|----------------------------------|--------------------------------|
| Backend stopped during lunch      | Medium     | High   | Check services before resuming   | Restart with Start-Local.ps1   |
| API returns 500 error             | Medium     | Medium | Pre-test PUT endpoint            | Show expected response         |
| React routing conflict            | Low        | Medium | Pre-configure routes             | Manual route fix               |

---

### Act 6: The QA Engineer (Minutes 87-100 | 1:17-1:30 PM)

**Purpose:** Add automated tests — Backend, Frontend, Accessibility

**Checkpoint:** `v0.6.0` — Test suite complete

#### Scripted Dialogue — Act 6

> 🎙️ **HAMMAD**: Working code is great. Tested code is better. Emmanuel, time to put on the QA hat?
>
> 💻 **EMMANUEL**: *Pulls QA Stories* Let's start with the backend. Copilot, generate controller tests for our 5 endpoints...
>
> *Shows test generation* MockMvc, @WebMvcTest, proper arrange-act-assert pattern. Let me run these... *Runs tests* ...5 tests, all passing.
>
> 🎙️ **HAMMAD**: Frontend?
>
> 💻 **EMMANUEL**: React Testing Library and Vitest. Generate component tests for the submission form...
>
> *Shows test generation* It's testing the form submission, the validation errors, the success state. Run them... *Runs tests* ...passing.
>
> 🎙️ **HAMMAD**: What about accessibility? That's a requirement for OPS.
>
> 💻 **EMMANUEL**: This is important. Let me ask Copilot to generate axe-core accessibility tests for our pages...
>
> *Shows accessibility test* It's checking ARIA labels, color contrast, keyboard navigation. All WCAG 2.2 Level AA requirements we specified in our instructions. *Runs tests* ...passing.
>
> 🎙️ **HAMMAD**: How's our test coverage looking?
>
> 💻 **EMMANUEL**: *Shows coverage report* Backend: 80%. Frontend: 75%. Accessibility: All critical paths covered.

**Demo actions:**

- **[87:00] 1:17 PM** — Pull QA Stories from ADO
- **[88:00] 1:18 PM** — Generate backend controller tests (`ProgramControllerTest.java`)
- **[91:00] 1:21 PM** — Run backend tests, show results
- **[93:00] 1:23 PM** — Generate frontend component tests (`SubmitProgram.test.tsx`)
- **[96:00] 1:26 PM** — Run frontend tests, show results
- **[98:00] 1:28 PM** — Generate accessibility tests (`accessibility.test.tsx`)
- **[99:00] 1:29 PM** — Run accessibility tests, show WCAG compliance
- **[100:00] 1:30 PM** — Commit and tag `v0.6.0`, update ADO stories

**Key beat (EMMANUEL):** Show all tests passing in terminal with green checkmarks

**Audience engagement point:** "How many of you write tests after the demo is done? Be honest."

#### Risk Mitigation — Act 6

| Risk                            | Likelihood | Impact | Mitigation                        | Recovery                       |
|---------------------------------|------------|--------|-----------------------------------|--------------------------------|
| Test fails unexpectedly         | Medium     | Low    | Skip failing test, note it        | Continue demo                  |
| Coverage threshold not met      | Low        | Low    | Show coverage as-is               | Explain coverage goals         |
| axe-core false positive         | Medium     | Low    | Review accessibility rules        | Skip specific rule             |

---

### Act 7: The DevOps Engineer (Minutes 100-107 | 1:30-1:37 PM)

**Purpose:** Add CI pipeline, Dependabot, GHAS secret scanning

**Checkpoint:** `v0.7.0` — CI/CD configuration complete

#### Scripted Dialogue — Act 7

> 🎙️ **HAMMAD**: Tests are passing locally. How do we make sure they keep passing?
>
> 💻 **EMMANUEL**: *Pulls DevOps Stories* CI pipeline. Let me have Copilot generate a GitHub Actions workflow...
>
> *Shows workflow generation* It's building the backend with Maven, running tests, building the frontend with npm, running those tests too. Multi-job pipeline.
>
> 🎙️ **HAMMAD**: And security?
>
> 💻 **EMMANUEL**: Two things: Dependabot for dependency updates, and GitHub Advanced Security for secret scanning. Let me generate those configs...
>
> *Creates dependabot.yml* Weekly security updates for Maven and npm. *Creates GHAS workflow* Secret scanning enabled — if I accidentally commit a connection string, this catches it.
>
> 🎙️ **HAMMAD**: Very important for government applications.
>
> 💻 **EMMANUEL**: Absolutely. Our instructions file reminds Copilot about security requirements. It's baked into every suggestion.

**Demo actions:**

- **[100:00] 1:30 PM** — Pull DevOps Stories from ADO
- **[101:00] 1:31 PM** — Generate `.github/workflows/ci.yml`
- **[103:00] 1:33 PM** — Generate `.github/dependabot.yml`
- **[105:00] 1:35 PM** — Enable GHAS in workflow (code scanning, secret scanning)
- **[106:00] 1:36 PM** — Explain PR checks and branch protection
- **[107:00] 1:37 PM** — Commit and tag `v0.7.0`, update ADO stories

**Key beat (EMMANUEL):** Show CI workflow YAML with multi-job structure

**Audience engagement point:** "CI in 7 minutes. How long did your last pipeline setup take?"

#### Risk Mitigation — Act 7

| Risk                            | Likelihood | Impact | Mitigation                       | Recovery                       |
|---------------------------------|------------|--------|----------------------------------|--------------------------------|
| YAML syntax error               | Medium     | Low    | Pre-validated YAML backup        | Copy from backup               |
| GitHub API rate limit           | Low        | Medium | Pre-created workflow template    | Show template only             |
| GHAS not enabled on repo        | Low        | Low    | Pre-enable GHAS on repo          | Skip GHAS demo                 |

---

### Act 8: The Full Stack Change (Minutes 107-120 | 1:37-1:50 PM)

**Purpose:** Demonstrate iterative development — Add `program_budget` field end-to-end

**Checkpoint:** `v0.8.0` → `v1.0.0` — Full stack change complete

#### Scripted Dialogue — Act 8

> 🎙️ **HAMMAD**: We have a complete application. But what happens when requirements change? Emmanuel, let's say the Ministry needs a budget field on program submissions. Can Copilot help us add that?
>
> 💻 **EMMANUEL**: Let me show you the real power of those instruction files we created at the start. I'll ask Copilot: "Add a program_budget field to the program table and expose it through the entire stack."
>
> Watch what happens...
>
> 🎙️ **HAMMAD**: What's it doing?
>
> 💻 **EMMANUEL**: *Narrates as code generates* Database migration V005 adding the column... Entity field with `@Column`... DTO field with validation... Controller already handles it... Frontend form now has a budget input... and Copilot is generating updated tests.
>
> 🎙️ **HAMMAD**: All from one prompt?
>
> 💻 **EMMANUEL**: Because our instruction files define the patterns, Copilot knows how to apply changes consistently across the stack. Let me run the tests... *Runs* ...all passing with the new field.
>
> 🎙️ **HAMMAD**: *To audience* That's a full stack change in under 15 minutes. Model, migration, API, UI, tests. In a traditional project, that's a sprint planning meeting just to estimate.

**Demo actions:**

- **[107:00] 1:37 PM** — Pull Full Stack Story from ADO
- **[108:00] 1:38 PM** — Generate `V005__add_program_budget.sql` migration
- **[110:00] 1:40 PM** — Update `Program.java` entity with budget field
- **[112:00] 1:42 PM** — Update `ProgramDTO.java` with validation
- **[114:00] 1:44 PM** — Update `SubmitProgram.tsx` with budget input
- **[116:00] 1:46 PM** — Update `ReviewDetail.tsx` to display budget
- **[117:00] 1:47 PM** — Update tests for new field
- **[118:00] 1:48 PM** — Run all tests (backend + frontend)
- **[119:00] 1:49 PM** — Live demo: Submit program with budget, verify end-to-end
- **[120:00] 1:50 PM** — Commit and tag `v1.0.0`, update ADO stories

**Key beat (EMMANUEL):** Single prompt triggering changes across 6+ files

**Audience engagement point:** "How long would this change request take in your organization? Days? Weeks?"

#### Risk Mitigation — Act 8

| Risk                            | Likelihood | Impact | Mitigation                       | Recovery                       |
|---------------------------------|------------|--------|----------------------------------|--------------------------------|
| Migration conflicts with data   | Medium     | Medium | Use nullable column              | ALTER TABLE with DEFAULT       |
| Test regression                 | Medium     | Medium | Run tests incrementally          | Fix one component at a time    |
| Form validation error           | Low        | Low    | Pre-test validation rules        | Adjust validation              |

---

### Closing (Minutes 120-130 | 1:50-2:00 PM)

**Purpose:** Summarize achievement, final ADO board review, Q&A

#### Scripted Dialogue — Closing

> 🎙️ **HAMMAD**: Emmanuel, let's take stock of what we accomplished today.
>
> 💻 **EMMANUEL**: *Opens ADO board* Let's look at our board. Every Feature — complete. Every Story — closed.
>
> 🎙️ **HAMMAD**: In about 100 minutes of actual coding time.
>
> 💻 **EMMANUEL**: Let me show you some numbers... *Types `git log --shortstat`*
>
> 🎙️ **HAMMAD**: From one README file and an empty repository.
>
> 💻 **EMMANUEL**: GitHub Copilot didn't write all the code. But it accelerated every step. The instruction files gave it context. The MCP integration let it manage our work items. And the consistent patterns made changes predictable.
>
> 🎙️ **HAMMAD**: *To audience* Questions?

**Demo actions:**

- **[120:00] 1:50 PM** — Show final ADO board with all items closed
- **[122:00] 1:52 PM** — Run git log stats, show total commits and lines
- **[124:00] 1:54 PM** — Show architecture diagram with all components implemented
- **[126:00] 1:56 PM** — Quick demo: Submit new program → approve → full loop
- **[128:00] 1:58 PM** — Open Q&A
- **[130:00] 2:00 PM** — Closing remarks

**Key beat (EMMANUEL):** Final `git log --shortstat` showing total code written

**Audience engagement point:** "What was the most surprising thing you saw today?"

---

## Key Numbers

| Metric              | Value          |
|---------------------|----------------|
| Lines of code       | ~2,350+        |
| ADO work items      | 25+            |
| API endpoints       | 5              |
| Database tables     | 3              |
| Flyway migrations   | 5              |
| React pages         | 5              |
| Git checkpoints     | 9              |
| Demo duration       | 130 min        |

## Demo Statistics Summary

| Category               | Metric                    | Value          |
|------------------------|---------------------------|----------------|
| **Time**               | Total coding time         | ~100 minutes   |
|                        | Part 1 duration           | 70 minutes     |
|                        | Part 2 duration           | 60 minutes     |
|                        | Lunch break               | 80 minutes     |
| **Code**               | Lines of Java code        | ~800           |
|                        | Lines of TypeScript code  | ~1,200         |
|                        | Lines of SQL              | ~150           |
|                        | Lines of YAML             | ~200           |
|                        | Total lines of code       | ~2,350+        |
| **Files**              | Java source files         | 15+            |
|                        | React components          | 12+            |
|                        | SQL migrations            | 5              |
|                        | Test files                | 6+             |
|                        | Configuration files       | 10+            |
| **Project Management** | Epic                      | 1              |
|                        | Features                  | 8              |
|                        | User Stories              | 25+            |
|                        | Work items closed         | 100%           |
| **Testing**            | Backend test coverage     | 80%+           |
|                        | Frontend test coverage    | 75%+           |
|                        | Accessibility compliance  | WCAG 2.2 AA    |
| **Git**                | Commits                   | ~20            |
|                        | Tags                      | 9              |
| **API**                | Endpoints implemented     | 5              |
|                        | API success responses     | 201, 200       |
| **UI**                 | Pages created             | 6              |
|                        | Languages supported       | 2 (EN/FR)      |

---

## Recovery Commands

```powershell
# If behind schedule, skip to checkpoint
git checkout v0.4.0  # Skip to end of Part 1

# If something breaks, quick rollback
git stash
git checkout v0.3.0
git stash pop

# Emergency reset to known good state
git reset --hard v0.3.0
```

---

## Pre-Recorded Video Backup Strategy

| Segment     | Video File                  | Duration | Use Case                     |
|-------------|-----------------------------|----------|------------------------------|
| Act 1       | `backup/act1-architect.mp4` | 12 min   | MCP not working              |
| Act 2       | `backup/act2-dba.mp4`       | 12 min   | Database connectivity issues |
| Act 3       | `backup/act3-backend.mp4`   | 20 min   | Spring Boot startup issues   |
| Act 4       | `backup/act4-frontend.mp4`  | 18 min   | npm issues                   |
| Full Part 1 | `backup/part1-complete.mp4` | 70 min   | Complete Part 1 failure      |
| Full Part 2 | `backup/part2-complete.mp4` | 60 min   | Complete Part 2 failure      |
