<!-- markdownlint-disable-file -->
# Implementation Details: CIVIC Demo Scaffolding Files

## Context Reference

Sources: `.copilot-tracking/research/2026-03-03/demo-scaffolding-research.md`, subagent research documents

---

## Implementation Phase 1: Core Configuration Files

<!-- parallelizable: true -->

### Step 1.1: Create `.gitignore`

Create a comprehensive .gitignore file covering Java, Node.js, IDE, and OS-specific files.

Files:
* `.gitignore` - Root level ignore file for repository

Content sections:
1. **Java/Maven**: `target/`, `*.jar`, `*.class`, `*.war`, `*.ear`, `.gradle/`, `build/`
2. **Node/npm**: `node_modules/`, `dist/`, `.env.local`, `npm-debug.log*`
3. **IDE**: `.idea/`, `*.iml`, `.vscode/*` with critical exception `!.vscode/mcp.json`
4. **OS**: `.DS_Store`, `Thumbs.db`, `Desktop.ini`
5. **Logs**: `*.log`, `logs/`, `spring.log`
6. **Coverage**: `coverage/`, `*.lcov`, `jacoco/`
7. **H2 Database**: `*.mv.db`, `*.trace.db`
8. **Certificates**: `*.pem`, `*.key`, `*.crt`, `*.p12`, `*.jks`

Critical requirement:
* Must include `!.vscode/mcp.json` exception to keep MCP configuration tracked in Git

Success criteria:
* File contains all 8 sections
* Exception for mcp.json is present

Context references:
* Research document (Lines 477-500) - .gitignore specification

Dependencies:
* None

---

### Step 1.2: Create `.vscode/mcp.json`

Create MCP (Model Context Protocol) configuration for Azure DevOps integration.

Files:
* `.vscode/mcp.json` - VS Code MCP server configuration

Content:
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

Success criteria:
* Valid JSON syntax
* Correct organization name: `MngEnvMCAP675646`
* Correct project name: `ProgramDemo-DevDay2026-LiveDemo`

Context references:
* Research document (Lines 110-120) - MCP configuration

Dependencies:
* `.vscode/` directory exists (create if needed)

---

### Step 1.3: Create `.github/copilot-instructions.md`

Create global GitHub Copilot instructions for the entire CIVIC project.

Files:
* `.github/copilot-instructions.md` - Global Copilot instructions (~150 lines)

Frontmatter:
```yaml
---
description: "Global GitHub Copilot instructions for the CIVIC Program Approval Demo - Ontario Public Sector Developer Day 2026"
---
```

Content sections:

1. **Project Overview** - CIVIC demo purpose: bilingual (EN/FR) web application for government program requests

2. **Architecture Table**:
   | Layer | Technology | Purpose |
   |-------|------------|---------|
   | Frontend | React 18 + TypeScript + Vite | Citizen and Ministry portals |
   | Backend | Java 21 + Spring Boot 3.x | REST API |
   | Database | Azure SQL (prod) / H2 (local) | Data persistence |
   | Cloud | Azure App Service, Durable Functions, Logic Apps, AI Foundry | Hosting and AI |

3. **Core Requirements**:
   - Bilingual Support: `nameEn`/`nameFr` fields in Java, i18next keys in React
   - Accessibility: WCAG 2.2 Level AA compliance
   - Ontario Design System: Use CSS classes from designsystem.ontario.ca

4. **Package Structure**:
   - Backend: `com.ontario.program.{controller,service,repository,model,dto,config}`
   - Frontend: `src/{components,pages,hooks,services,i18n,types}`

5. **Development Workflow**:
   - Branch naming: `feature/{work-item-id}-{description}`
   - Commit format: `AB#{work-item-id}: {imperative-description}`
   - PR linking: Include `Fixes AB#{id}` in body

6. **Local Development**:
   - Backend: `./mvnw spring-boot:run -Dspring.profiles.active=local`
   - Frontend: `npm run dev` (port 3000)

7. **Testing Requirements**:
   - Backend: JUnit 5, 80% coverage target
   - Frontend: Vitest, React Testing Library, vitest-axe

Success criteria:
* Valid frontmatter with description
* Architecture table present
* All 7 sections documented

Context references:
* Research document (Lines 56-80) - Copilot instructions specification

Dependencies:
* `.github/` directory exists

---

## Implementation Phase 2: Language-Specific Instruction Files

<!-- parallelizable: true -->

### Step 2.1: Create `.github/instructions/ado-workflow.instructions.md`

Create Azure DevOps workflow instructions for branch, commit, and PR conventions.

Files:
* `.github/instructions/ado-workflow.instructions.md` - ADO workflow conventions (~100 lines)

Frontmatter:
```yaml
---
description: "Azure DevOps workflow conventions for branching, commits, and PR linking"
applyTo: "**"
---
```

Content sections:

1. **Branch Naming Convention**:
   - Pattern: `feature/{work-item-id}-{short-description}`
   - Example: `feature/123-add-program-api`

2. **Commit Message Format**:
   - Pattern: `AB#{work-item-id}: {imperative-description}`
   - Example: `AB#123: Add POST endpoint for program submission`
   - Rules: Start with verb, no period at end, max 72 chars

3. **PR Title Format**:
   - Pattern: `AB#{work-item-id}: {description}`
   - Example: `AB#123: Add program submission API`

4. **PR Body Requirements**:
   - Must include `Fixes AB#{id}` or `Closes AB#{id}` for auto-close
   - Template with Description, Testing, and Checklist sections

5. **Post-Merge Cleanup**:
   - Delete feature branch after merge
   - Verify work item state updated to Done

Success criteria:
* `applyTo: "**"` for global application
* All 5 sections present
* Examples for each pattern

Context references:
* Research document (Lines 81-95) - ADO workflow specification

Dependencies:
* `.github/instructions/` directory exists (create if needed)

---

### Step 2.2: Create `.github/instructions/java.instructions.md`

Create Java 21 and Spring Boot 3.x coding standards.

Files:
* `.github/instructions/java.instructions.md` - Java coding standards (~250 lines)

Frontmatter:
```yaml
---
description: "Java 21 and Spring Boot 3.x coding standards for the CIVIC demo"
applyTo: "**/*.java"
---
```

Content sections:

1. **Technology Stack**:
   - Java 21 with virtual threads
   - Spring Boot 3.x
   - Spring Data JPA
   - Flyway migrations
   - H2 (local), Azure SQL (production)

2. **Package Structure**:
   ```
   com.ontario.program
   ├── controller/    # REST controllers
   ├── service/       # Business logic
   ├── repository/    # JPA repositories
   ├── model/         # JPA entities
   ├── dto/           # Request/Response DTOs
   └── config/        # Configuration classes
   ```

3. **Entity Conventions**:
   - Use `jakarta.persistence` annotations
   - Bilingual fields: `nameEn`, `nameFr` pattern
   - Timestamps: `LocalDateTime` with `@Column(name = "created_at")`
   - ID generation: `@GeneratedValue(strategy = GenerationType.IDENTITY)`

4. **Repository Conventions**:
   - Extend `JpaRepository<T, ID>`
   - Use method name queries where possible
   - Use `@Query` for complex queries with named parameters

5. **Service Conventions**:
   - Constructor injection (no `@Autowired` on fields)
   - `@Transactional(readOnly = true)` for read methods
   - `@Transactional` for write methods
   - Interface + Implementation pattern optional for demo

6. **Controller Conventions**:
   - `@RestController` with `@RequestMapping("/api/...")`
   - Return `ResponseEntity<T>` for all endpoints
   - Use `@Valid` for request body validation
   - Handle path variables with `@PathVariable`

7. **DTO Conventions**:
   - Use Java records for immutability
   - Bean Validation annotations: `@NotBlank`, `@Size`, `@NotNull`
   - Example: `public record CreateProgramRequest(@NotBlank String programName, ...) {}`

8. **Error Handling**:
   - RFC 7807 `ProblemDetail` responses
   - `@RestControllerAdvice` for global exception handling
   - Map exceptions to appropriate HTTP status codes

9. **Testing Conventions**:
   - JUnit 5 with `@Test` annotations
   - Mockito for mocking: `@Mock`, `@InjectMocks`
   - Given/When/Then pattern in test method names
   - Integration tests with `@SpringBootTest`

10. **Local Profile Configuration**:
    - Profile name: `local`
    - H2 with `MODE=MSSQLServer` for Azure SQL compatibility
    - Flyway enabled for migrations
    - Console enabled at `/h2-console`

Success criteria:
* `applyTo: "**/*.java"` targets Java files only
* All 10 sections present
* Code examples for each convention

Context references:
* Research document (Lines 96-108) - Java instructions specification

Dependencies:
* Step 2.1 creates `.github/instructions/` directory

---

### Step 2.3: Create `.github/instructions/react.instructions.md`

Create React 18 and TypeScript coding standards with Ontario Design System.

Files:
* `.github/instructions/react.instructions.md` - React coding standards (~250 lines)

Frontmatter:
```yaml
---
description: "React 18 and TypeScript coding standards with Ontario Design System and WCAG 2.2 compliance"
applyTo: "**/*.{ts,tsx}"
---
```

Content sections:

1. **Technology Stack**:
   - React 18 with functional components
   - TypeScript 5.x in strict mode
   - Vite for build and dev server (port 3000)
   - i18next for internationalization
   - React Router for navigation

2. **Project Structure**:
   ```
   src/
   ├── components/    # Reusable UI components
   ├── pages/         # Route-level components
   ├── hooks/         # Custom React hooks
   ├── services/      # API client functions
   ├── i18n/          # Translation files
   └── types/         # TypeScript interfaces
   ```

3. **Component Conventions**:
   - Functional components only (no class components)
   - Explicit Props interfaces: `interface ComponentNameProps { ... }`
   - TypeScript strict mode compliance
   - Export named components: `export const ComponentName: React.FC<Props> = ...`

4. **Form Handling**:
   - React Hook Form for form state
   - Validation with resolver pattern
   - Error messages from i18n keys
   - Accessible form field labeling

5. **Bilingual Support (i18next)**:
   - Key pattern: `{feature}.{element}.{property}`
   - Example: `citizen.form.programName.label`
   - `useTranslation()` hook in components
   - Language files: `src/i18n/locales/{en,fr}.json`

6. **Ontario Design System**:
   - Import CSS: `import '@ontario-digital-service/ontario-design-system/dist/styles/ontario-theme.min.css'`
   - Use ODS components: `ontario-button`, `ontario-input`, etc.
   - Follow ODS documentation for class names
   - Reference: https://designsystem.ontario.ca/

7. **Accessibility (WCAG 2.2)**:
   - All form inputs have associated labels
   - ARIA attributes for dynamic content: `aria-live`, `aria-describedby`
   - Focus management on route changes
   - Keyboard navigation support
   - Color contrast ratios meet Level AA
   - Skip links for main content

8. **API Integration**:
   - Use axios with typed responses
   - Service functions in `src/services/`
   - Handle loading, error, and success states
   - Example: `export const getPrograms = async (): Promise<Program[]> => ...`

9. **Testing Conventions**:
   - Vitest for test runner
   - React Testing Library for component tests
   - vitest-axe for accessibility testing
   - Test files: `*.test.tsx` co-located with components
   - Coverage target: 75%

Success criteria:
* `applyTo: "**/*.{ts,tsx}"` targets TypeScript files
* All 9 sections present
* Ontario Design System references included

Discrepancy references:
* Addresses DD-01 if ODS import path differs from research

Context references:
* Research document (Lines 109-130) - React instructions specification

Dependencies:
* Step 2.1 creates `.github/instructions/` directory

---

### Step 2.4: Create `.github/instructions/sql.instructions.md`

Create Azure SQL and Flyway migration standards.

Files:
* `.github/instructions/sql.instructions.md` - SQL standards (~150 lines)

Frontmatter:
```yaml
---
description: "Azure SQL and Flyway migration standards for the CIVIC demo"
applyTo: "**/*.sql"
---
```

Content sections:

1. **Target Database**:
   - Production: Azure SQL Database
   - Local: H2 with `MODE=MSSQLServer` for compatibility
   - Schema: dbo (default)

2. **Migration Naming**:
   - Pattern: `V{NNN}__{description}.sql`
   - Examples:
     - `V001__create_program_type_table.sql`
     - `V002__create_program_table.sql`
     - `V003__create_notification_table.sql`
     - `V004__seed_program_types.sql`
   - Double underscore required between version and description
   - Use snake_case for descriptions

3. **Column Types**:
   - Primary keys: `INT IDENTITY(1,1) PRIMARY KEY`
   - Bilingual text: `NVARCHAR(n)` for Unicode support
   - Long text: `NVARCHAR(MAX)`
   - Timestamps: `DATETIME2`
   - Status fields: `NVARCHAR(20)`

4. **Table Guards (Idempotent)**:
   - Pattern for CREATE TABLE:
     ```sql
     IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'table_name')
     BEGIN
         CREATE TABLE table_name (...);
     END
     ```
   - Note: H2 compatibility - use simpler `CREATE TABLE IF NOT EXISTS` for local

5. **Seed Data Pattern**:
   - Use portable INSERT with NOT EXISTS check:
     ```sql
     INSERT INTO table_name (col1, col2)
     SELECT 'value1', 'value2'
     WHERE NOT EXISTS (SELECT 1 FROM table_name WHERE col1 = 'value1');
     ```
   - This works on both Azure SQL and H2

6. **Foreign Keys**:
   - Named constraints with `FK_` prefix
   - Pattern: `FK_{child_table}_{parent_table}`
   - Example: `CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) REFERENCES program_type(id)`

Success criteria:
* `applyTo: "**/*.sql"` targets SQL files
* All 6 sections present
* H2 compatibility notes included

Context references:
* Research document (Lines 131-145) - SQL instructions specification

Dependencies:
* Step 2.1 creates `.github/instructions/` directory

---

## Implementation Phase 3: Technical Documentation Files

<!-- parallelizable: true -->

### Step 3.1: Create `docs/architecture.md`

Create architecture documentation with C4 Container diagram.

Files:
* `docs/architecture.md` - Architecture overview (~100 lines)

Content sections:

1. **Title and Overview**:
   - CIVIC Program Request Management System
   - Bilingual (EN/FR) web application for government program requests

2. **C4 Container Diagram** (Mermaid):
   ```mermaid
   C4Container
       title CIVIC System Container Diagram
       
       Person(citizen, "Citizen", "Submits program requests")
       Person(reviewer, "Ministry Reviewer", "Reviews and approves requests")
       
       System_Boundary(azure, "Azure Cloud") {
           Container(frontend, "React Web App", "React 18, TypeScript", "Citizen and Ministry portals")
           Container(backend, "Java API", "Spring Boot 3.x", "REST API for program management")
           ContainerDb(database, "Azure SQL", "SQL Server", "Program and notification data")
           Container(functions, "Durable Functions", "Azure Functions", "Workflow orchestration")
           Container(logic, "Logic Apps", "Azure Logic Apps", "Email notifications")
           Container(ai, "AI Foundry", "Azure AI", "Intelligent processing")
       }
       
       Rel(citizen, frontend, "Submits requests", "HTTPS")
       Rel(reviewer, frontend, "Reviews requests", "HTTPS")
       Rel(frontend, backend, "API calls", "REST/JSON")
       Rel(backend, database, "Reads/Writes", "JDBC")
       Rel(backend, functions, "Triggers workflows", "HTTP")
       Rel(functions, logic, "Sends notifications", "HTTP")
       Rel(backend, ai, "AI processing", "HTTP")
   ```

3. **Technology Stack Table**:
   | Component | Technology | Version |
   |-----------|------------|---------|
   | Frontend | React + TypeScript + Vite | 18.x, 5.x |
   | Backend | Java + Spring Boot | 21, 3.x |
   | Database | Azure SQL / H2 | - |
   | Orchestration | Azure Durable Functions | - |
   | Notifications | Azure Logic Apps | - |
   | AI | Azure AI Foundry | - |

4. **Azure Resources** (rg-dev-125):
   - App Service (frontend)
   - App Service (backend)
   - Azure SQL Database
   - Function App
   - Logic App
   - AI Foundry workspace

5. **Compliance**:
   - WCAG 2.2 Level AA
   - Ontario Design System
   - Bilingual (English/French)

Success criteria:
* Mermaid C4 diagram renders correctly
* All Azure components represented
* Resource group reference included

Context references:
* Research document (Lines 265-285) - Architecture specification

Dependencies:
* `docs/` directory exists (create if needed)

---

### Step 3.2: Create `docs/data-dictionary.md`

Create data dictionary with ER diagram and complete table specifications.

Files:
* `docs/data-dictionary.md` - Data dictionary (~200 lines)

Content sections:

1. **ER Diagram** (Mermaid):
   ```mermaid
   erDiagram
       program_type ||--o{ program : "categorizes"
       program ||--o{ notification : "generates"
       
       program_type {
           INT id PK
           NVARCHAR type_name
           NVARCHAR type_name_fr
       }
       
       program {
           INT id PK
           NVARCHAR program_name
           NVARCHAR program_description
           INT program_type_id FK
           NVARCHAR status
           NVARCHAR reviewer_comments
           DATETIME2 submitted_at
           DATETIME2 reviewed_at
           DATETIME2 created_at
           DATETIME2 updated_at
           NVARCHAR created_by
       }
       
       notification {
           INT id PK
           INT program_id FK
           NVARCHAR notification_type
           NVARCHAR recipient_email
           NVARCHAR subject
           NVARCHAR body
           DATETIME2 sent_at
           DATETIME2 created_at
           DATETIME2 updated_at
           NVARCHAR status
       }
   ```

2. **Table: program_type** (Reference data):
   | Column | Type | Constraints | Description |
   |--------|------|-------------|-------------|
   | id | INT | PK IDENTITY(1,1) | Unique identifier |
   | type_name | NVARCHAR(100) | NOT NULL | English name |
   | type_name_fr | NVARCHAR(100) | NOT NULL | French name |

3. **Table: program** (Main entity):
   | Column | Type | Constraints | Description |
   |--------|------|-------------|-------------|
   | id | INT | PK IDENTITY(1,1) | Unique identifier |
   | program_name | NVARCHAR(200) | NOT NULL | Program title |
   | program_description | NVARCHAR(MAX) | | Detailed description |
   | program_type_id | INT | FK → program_type(id) | Category reference |
   | status | NVARCHAR(20) | DEFAULT 'DRAFT' | DRAFT/SUBMITTED/APPROVED/REJECTED |
   | reviewer_comments | NVARCHAR(MAX) | | Review feedback |
   | submitted_at | DATETIME2 | | Submission timestamp |
   | reviewed_at | DATETIME2 | | Review timestamp |
   | created_at | DATETIME2 | NOT NULL | Creation timestamp |
   | updated_at | DATETIME2 | | Last update timestamp |
   | created_by | NVARCHAR(100) | | Submitter identifier |

4. **Table: notification** (Audit/history):
   | Column | Type | Constraints | Description |
   |--------|------|-------------|-------------|
   | id | INT | PK IDENTITY(1,1) | Unique identifier |
   | program_id | INT | FK → program(id) | Related program |
   | notification_type | NVARCHAR(50) | | Type of notification |
   | recipient_email | NVARCHAR(200) | | Recipient address |
   | subject | NVARCHAR(500) | | Email subject |
   | body | NVARCHAR(MAX) | | Email body |
   | sent_at | DATETIME2 | | Send timestamp |
   | created_at | DATETIME2 | NOT NULL | Creation timestamp |
   | updated_at | DATETIME2 | DEFAULT GETDATE() | Last update timestamp |
   | status | NVARCHAR(20) | | PENDING/SENT/FAILED |

5. **Seed Data** (5 program types):
   | id | type_name | type_name_fr |
   |----|-----------|--------------|
   | 1 | Community Services | Services communautaires |
   | 2 | Health & Wellness | Santé et bien-être |
   | 3 | Education & Training | Éducation et formation |
   | 4 | Environment & Conservation | Environnement et conservation |
   | 5 | Economic Development | Développement économique |

Success criteria:
* Mermaid ER diagram renders correctly
* All 3 tables fully documented
* Seed data for all 5 program types

Context references:
* Research document (Lines 286-345) - Data dictionary specification

Dependencies:
* `docs/` directory exists

---

### Step 3.3: Create `docs/design-document.md`

Create design document with API specifications and frontend component hierarchy.

Files:
* `docs/design-document.md` - Design specification (~300 lines)

Content sections:

1. **API Endpoints**:

   **POST /api/programs** - Submit new program request
   - Request DTO: `CreateProgramRequest`
     ```java
     record CreateProgramRequest(
         @NotBlank String programName,
         String programDescription,
         @NotNull Integer programTypeId,
         String createdBy
     ) {}
     ```
   - Response DTO: `ProgramResponse` (id, programName, status, createdAt, etc.)
   - Status: 201 Created

   **GET /api/programs** - List programs with filtering
   - Query params: `status`, `programTypeId`, `page`, `size`
   - Response: `PagedResponse<ProgramResponse>`
   - Status: 200 OK

   **GET /api/programs/{id}** - Get program by ID
   - Response: `ProgramResponse`
   - Status: 200 OK, 404 Not Found

   **PUT /api/programs/{id}/review** - Approve or reject program
   - Request DTO: `ReviewProgramRequest`
     ```java
     record ReviewProgramRequest(
         @NotBlank String status,  // APPROVED or REJECTED
         String reviewerComments
     ) {}
     ```
   - Response: `ProgramResponse`
   - Status: 200 OK

   **GET /api/program-types** - List program types
   - Response: `ProgramTypeResponse[]`
   - Status: 200 OK

2. **RFC 7807 ProblemDetail**:
   ```json
   {
       "type": "about:blank",
       "title": "Not Found",
       "status": 404,
       "detail": "Program with ID 999 not found",
       "instance": "/api/programs/999"
   }
   ```

3. **Frontend Component Hierarchy**:
   ```
   App
   └── BrowserRouter
       └── Routes
           ├── Layout (persistent)
           │   ├── Header
           │   ├── LanguageToggle
           │   └── Footer
           └── Route Components
               ├── / → CitizenFormPage
               ├── /confirmation/:id → ConfirmationPage
               ├── /search → SearchPage
               ├── /review → ReviewDashboardPage
               └── /review/:id → ReviewDetailPage
   ```

4. **TypeScript Interfaces**:
   ```typescript
   interface Program {
       id: number;
       programName: string;
       programDescription?: string;
       programTypeId: number;
       programTypeName?: string;
       status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
       reviewerComments?: string;
       submittedAt?: string;
       reviewedAt?: string;
       createdAt: string;
       updatedAt?: string;
       createdBy?: string;
   }

   interface ProgramType {
       id: number;
       typeName: string;
       typeNameFr: string;
   }

   interface PagedResponse<T> {
       content: T[];
       totalElements: number;
       totalPages: number;
       page: number;
       size: number;
   }
   ```

5. **WCAG 2.2 Compliance Checklist**:
   - [ ] All form inputs have visible labels
   - [ ] Error messages announced to screen readers
   - [ ] Focus management on navigation
   - [ ] Keyboard-only navigation works
   - [ ] Color contrast meets 4.5:1 ratio
   - [ ] Skip links present
   - [ ] Language toggle accessible

6. **Ontario Design System Components**:
   | UI Element | ODS Component | CSS Class |
   |------------|---------------|-----------|
   | Primary button | ontario-button | `ontario-button--primary` |
   | Form input | ontario-input | `ontario-input` |
   | Form label | ontario-label | `ontario-label` |
   | Alert | ontario-alert | `ontario-alert--{type}` |
   | Header | ontario-header | `ontario-header` |
   | Footer | ontario-footer | `ontario-footer` |

Success criteria:
* All 5 API endpoints documented with DTOs
* RFC 7807 error format specified
* Component hierarchy matches route structure
* TypeScript interfaces match backend DTOs
* WCAG checklist included

Context references:
* Research document (Lines 346-380) - Design document specification

Dependencies:
* `docs/` directory exists

---

## Implementation Phase 4: Talk Track Documentation

<!-- parallelizable: false -->

### Step 4.1: Create `TALK-TRACK.md` Part 1: Building From Zero

Create the talk track file with Part 1 covering minutes 0-70 (10:30-11:40 AM).

Files:
* `TALK-TRACK.md` - Root level talk track (~800 lines total)

Header section:
```markdown
# CIVIC Demo Talk Track

**Event:** Developer Day 2026 — Ontario Public Sector
**Duration:** 130 minutes (10:30 AM – 2:00 PM)
**Break:** 11:40 AM – 1:00 PM (Lunch - 80 minutes)
**Actual Coding Time:** ~100 minutes
**Presenters:**
- 🎙️ **HAMMAD** (MC) - Narration and audience engagement
- 💻 **EMMANUEL** (Keyboard) - Live coding with GitHub Copilot
```

Part 1 timeline:

**Opening (Minutes 0-8 | 10:30-10:38 AM)**
- Show empty repository (only README.md)
- Tour Azure portal (rg-dev-125 resources)
- Show empty ADO board
- Introduce demo goals

**Act 1: Architect (Minutes 8-20 | 10:38-10:50 AM)**
- Create scaffolding files via Copilot
- Configure MCP for ADO
- Create Epic, Features, User Stories via MCP
- Checkpoint: v0.1.0

**Act 2: DBA (Minutes 20-32 | 10:50-11:02 AM)**
- Create V001__create_program_type_table.sql
- Create V002__create_program_table.sql
- Create V003__create_notification_table.sql
- Create V004__seed_program_types.sql
- Run migrations, verify H2 console
- Checkpoint: v0.2.0

**Act 3: Backend Developer (Minutes 32-52 | 11:02-11:22 AM)**
- Spring Boot project setup
- Entity classes (Program, ProgramType, Notification)
- Repository interfaces
- Service layer with business logic
- REST controllers (5 endpoints)
- Test with curl commands
- Checkpoint: v0.3.0

**Act 4: Frontend Developer (Minutes 52-70 | 11:22-11:40 AM)**
- React + Vite project setup
- Ontario Design System integration
- Citizen submission form
- Confirmation page
- Search page
- Bilingual toggle with i18next
- Checkpoint: v0.4.0

**CLIFFHANGER (11:40 AM)**:
> 🎙️ **HAMMAD**: "Citizens can submit their ideas... but wait. Who's going to approve them? The Ministry Portal is completely empty! We'll find out after lunch..."

Dialogue format:
```markdown
> 🎙️ **HAMMAD**: [MC dialogue here]

> 💻 **EMMANUEL**: [Technical response or Copilot prompt here]
```

Demo action format:
```markdown
- **[08:00] 10:38 AM** — Open VS Code, create `.github/copilot-instructions.md`
```

Success criteria:
* Header with event details and presenters
* Part 1 timeline (0-70 minutes) complete
* Cliffhanger before lunch break
* Dialogue format consistent

Context references:
* Research document (Lines 381-420) - Talk track Part 1 specification

Dependencies:
* None

---

### Step 4.2: Complete `TALK-TRACK.md` Part 2: Closing the Loop

Add Part 2 content covering minutes 70-130 (1:00-2:00 PM) to the talk track.

Files:
* `TALK-TRACK.md` - Continue from Part 1

Part 2 timeline:

**Recap (Minutes 70-73 | 1:00-1:03 PM)**
- Query database, show pending submissions
- "Let's give those citizens some good news!"

**Act 5: Complete the Loop (Minutes 73-87 | 1:03-1:17 PM)**
- Ministry review dashboard (list pending)
- Program detail page
- Approve/reject actions with comments
- Test full workflow
- Checkpoint: v0.5.0

**Act 6: QA Engineer (Minutes 87-100 | 1:17-1:30 PM)**
- Backend unit tests (JUnit 5)
- Backend integration tests
- Frontend component tests (Vitest)
- Accessibility tests (vitest-axe)
- Coverage reports
- Checkpoint: v0.6.0

**Act 7: DevOps Engineer (Minutes 100-107 | 1:30-1:37 PM)**
- GitHub Actions CI workflow
- Dependabot configuration
- GitHub Advanced Security (GHAS) scanning
- Checkpoint: v0.7.0

**Act 8: Full Stack Change (Minutes 107-120 | 1:37-1:50 PM)**
- V005 migration: Add program_budget column
- Update backend DTOs and API
- Update citizen form with budget field
- Update ministry review display
- Complete end-to-end test
- Checkpoint: v0.8.0

**Closing (Minutes 120-130 | 1:50-2:00 PM)**
- Stats summary:
  - ~2,350+ lines of code
  - 25+ work items completed
  - 100% ADO board closure
- Show completed ADO board
- Q&A
- Final checkpoint: v1.0.0

Risk mitigation tables per act:
| Risk | Mitigation | Fallback |
|------|------------|----------|
| Copilot slow response | Pre-cached prompts | Copy from backup |
| API test failure | Pre-verified curl | Show expected output |

Key numbers summary at end:
```markdown
## Key Numbers

| Metric | Value |
|--------|-------|
| Lines of code | ~2,350+ |
| ADO work items | 25+ |
| API endpoints | 5 |
| Database tables | 3 |
| Flyway migrations | 5 |
| React pages | 5 |
| Git checkpoints | 9 |
| Demo duration | 130 min |
```

Success criteria:
* Part 2 timeline (70-130 minutes) complete
* Risk mitigation tables per act
* Stats summary included
* 9 checkpoint versions (v0.1.0 → v1.0.0)

Context references:
* Research document (Lines 421-445) - Talk track Part 2 specification

Dependencies:
* Step 4.1 creates initial TALK-TRACK.md

---

## Implementation Phase 5: PowerShell Development Scripts

<!-- parallelizable: true -->

### Step 5.1: Create `scripts/Start-Local.ps1`

Create PowerShell script for starting local development environment.

Files:
* `scripts/Start-Local.ps1` - Start local servers (~120 lines)

Comment-based help:
```powershell
<#
.SYNOPSIS
    Starts the CIVIC local development environment.

.DESCRIPTION
    Launches the Java Spring Boot backend (port 8080) and React frontend (port 3000)
    for local development. Supports running backend-only, frontend-only, or both.

.PARAMETER SkipBuild
    Skip Maven and npm build steps. Use when dependencies are already installed.

.PARAMETER BackendOnly
    Start only the Java backend server on port 8080.

.PARAMETER FrontendOnly
    Start only the React frontend server on port 3000.

.PARAMETER UseAzureSql
    Use Azure SQL connection instead of H2. Requires Azure credentials.

.EXAMPLE
    .\Start-Local.ps1
    Starts both backend and frontend with full build.

.EXAMPLE
    .\Start-Local.ps1 -SkipBuild -BackendOnly
    Starts only backend without rebuilding.
#>
```

Parameters:
```powershell
[CmdletBinding()]
param(
    [switch]$SkipBuild,
    [switch]$BackendOnly,
    [switch]$FrontendOnly,
    [switch]$UseAzureSql
)
```

Features:
1. **Prerequisite checks**:
   - Java 21: `java --version`
   - Maven: `mvn --version`
   - Node: `node --version`
   - npm: `npm --version`

2. **Colored status output**:
   ```powershell
   function Write-Status([string]$Message, [string]$Type = "Info") {
       switch ($Type) {
           "Success" { Write-Host "✓ $Message" -ForegroundColor Green }
           "Warning" { Write-Host "⚠ $Message" -ForegroundColor Yellow }
           "Error"   { Write-Host "✗ $Message" -ForegroundColor Red }
           default   { Write-Host "→ $Message" -ForegroundColor Cyan }
       }
   }
   ```

3. **Spring profile switching**:
   - Local: `-Dspring.profiles.active=local` (H2)
   - Azure: `-Dspring.profiles.active=azure` (Azure SQL)

4. **Background server launch**:
   ```powershell
   Start-Process -FilePath "cmd" -ArgumentList "/c mvnw spring-boot:run" -WorkingDirectory $backendPath
   Start-Process -FilePath "cmd" -ArgumentList "/c npm run dev" -WorkingDirectory $frontendPath
   ```

5. **URL output**:
   - Backend: http://localhost:8080
   - Frontend: http://localhost:3000
   - H2 Console: http://localhost:8080/h2-console

Success criteria:
* Comment-based help renders with `Get-Help`
* All 4 parameters functional
* Prerequisite checks with clear errors
* Colored output for status messages

Context references:
* Research document (Lines 446-460) - Start script specification

Dependencies:
* `scripts/` directory exists (create if needed)

---

### Step 5.2: Create `scripts/Stop-Local.ps1`

Create PowerShell script for stopping local development servers.

Files:
* `scripts/Stop-Local.ps1` - Stop local servers (~60 lines)

Comment-based help:
```powershell
<#
.SYNOPSIS
    Stops the CIVIC local development servers.

.DESCRIPTION
    Finds and terminates processes running on ports 8080 (backend) and 3000 (frontend).
    Reports what was stopped or indicates if no processes were running.

.EXAMPLE
    .\Stop-Local.ps1
    Stops all CIVIC development servers.
#>
```

Features:
1. **Find processes by port**:
   ```powershell
   function Stop-ProcessOnPort([int]$Port) {
       $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
       if ($connections) {
           $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
           foreach ($pid in $pids) {
               $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
               if ($process) {
                   Write-Status "Stopping $($process.ProcessName) (PID: $pid) on port $Port" "Warning"
                   Stop-Process -Id $pid -Force
                   Write-Status "Stopped process on port $Port" "Success"
               }
           }
       } else {
           Write-Status "No process found on port $Port" "Info"
       }
   }
   ```

2. **Stop both servers**:
   ```powershell
   Stop-ProcessOnPort -Port 8080  # Backend
   Stop-ProcessOnPort -Port 3000  # Frontend
   ```

3. **Summary output**:
   - Report what was stopped
   - Indicate "No CIVIC servers running" if nothing found

Success criteria:
* Finds processes on ports 8080 and 3000
* Graceful handling when no processes running
* Clear status messages

Context references:
* Research document (Lines 461-475) - Stop script specification

Dependencies:
* `scripts/` directory exists

---

## Implementation Phase 6: Validation

<!-- parallelizable: false -->

### Step 6.1: Verify all 13 files exist

Run verification commands to confirm all files created.

Validation commands:
```powershell
# List all created files
Get-ChildItem -Path . -Recurse -Include *.md,*.json,*.ps1,.gitignore | Select-Object FullName

# Expected files (13 total):
# 1. .gitignore
# 2. .vscode/mcp.json
# 3. .github/copilot-instructions.md
# 4. .github/instructions/ado-workflow.instructions.md
# 5. .github/instructions/java.instructions.md
# 6. .github/instructions/react.instructions.md
# 7. .github/instructions/sql.instructions.md
# 8. docs/architecture.md
# 9. docs/data-dictionary.md
# 10. docs/design-document.md
# 11. TALK-TRACK.md
# 12. scripts/Start-Local.ps1
# 13. scripts/Stop-Local.ps1
```

Success criteria:
* All 13 files exist in correct locations

### Step 6.2: Validate Markdown formatting

Check frontmatter and Mermaid diagram syntax.

Validation tasks:
* Verify YAML frontmatter on instruction files starts with `---`
* Verify `applyTo` patterns match expected file globs
* Verify Mermaid code blocks use correct diagram types (C4Container, erDiagram)

### Step 6.3: Test PowerShell script syntax

Validate script syntax without execution.

Validation commands:
```powershell
# Test script syntax
$scriptPath = "scripts/Start-Local.ps1"
$tokens = $null
$errors = $null
[System.Management.Automation.Language.Parser]::ParseFile($scriptPath, [ref]$tokens, [ref]$errors)
if ($errors.Count -eq 0) { Write-Host "Syntax OK: $scriptPath" }

# Verify help renders
Get-Help .\scripts\Start-Local.ps1 -Detailed
Get-Help .\scripts\Stop-Local.ps1 -Detailed
```

### Step 6.4: Report any issues

Document any issues discovered during validation:
* Missing content sections
* Syntax errors
* Missing file references
* Provide next steps for resolution

---

## Dependencies

* PowerShell 7.x for script validation
* Git for .gitignore verification
* VS Code for MCP configuration validation

## Success Criteria

* All 13 files created in specified locations
* Instruction files have valid frontmatter with `applyTo`
* Documentation files contain valid Mermaid diagrams
* Talk track covers full 130-minute timeline with 9 checkpoints
* PowerShell scripts have complete comment-based help
* .gitignore includes `!.vscode/mcp.json` exception
