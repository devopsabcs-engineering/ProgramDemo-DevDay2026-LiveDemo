# Azure DevOps Work Item Hierarchy Research

## Research Topic

Azure DevOps Work Item Hierarchy for CIVIC Demo - Complete Epic → Feature → User Story structure for creating all ADO work items via MCP during Act 1.

## Research Context

- Demo starts with NO work items - all created during Act 1 (Architect persona)
- Citizens submit program requests through public portal
- Ministry employees review via internal portal
- Notifications sent on approval/rejection
- 3 database tables, 5 API endpoints, dual-portal frontend

---

## Work Item Hierarchy

### Epic

#### E1: CIVIC Program Request Management System

**Title**: CIVIC Program Request Management System

**Description**:
Build a bilingual (English/French) web application enabling citizens to submit government program requests and ministry employees to review, approve, or reject submissions. The system includes a public-facing citizen portal, an internal ministry review portal, automated notifications, and a PostgreSQL database backend with Spring Boot APIs.

**Business Value**:
- Streamline citizen-government interactions for program requests
- Provide transparent tracking and status updates
- Enable efficient ministry review workflows
- Support Ontario's bilingual requirements

---

### Features

#### F1: Infrastructure Setup

**Title**: Infrastructure Setup

**Description**:
Cloud infrastructure provisioning including Azure resources, networking, and deployment targets. This infrastructure is pre-deployed for the demo environment.

**Status**: **CLOSE IMMEDIATELY** (Pre-deployed infrastructure - no demo work required)

**Parent**: E1 - CIVIC Program Request Management System

---

#### F2: Database Schema & Migrations

**Title**: Database Schema & Migrations

**Description**:
Design and implement the PostgreSQL database schema using Flyway migrations. Includes three core tables: program_type (reference data), program (submissions), and notification (audit trail).

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F2:

---

###### US2.1: Create Program Type Reference Table

**Title**: Create Program Type Reference Table Migration

**Description**:
As a database administrator, I need to create the program_type reference table to store bilingual program type options that populate the submission form dropdown.

**Acceptance Criteria**:
- [ ] Flyway migration script V1__create_program_type_table.sql created
- [ ] Table includes columns: id (PK, auto-increment), type_name (varchar, not null), type_name_fr (varchar, not null)
- [ ] Migration executes successfully against PostgreSQL
- [ ] Table supports UTF-8 for French character encoding

---

###### US2.2: Create Program Submissions Table

**Title**: Create Program Submissions Table Migration

**Description**:
As a database administrator, I need to create the program table to store citizen program request submissions with all required fields for submission, review, and audit tracking.

**Acceptance Criteria**:
- [ ] Flyway migration script V2__create_program_table.sql created
- [ ] Table includes columns: id (PK), program_name (varchar, not null), description (text), program_type_id (FK to program_type), status (varchar, default 'pending'), reviewer_comments (text, nullable), submitted_at (timestamp), reviewed_at (timestamp, nullable), created_at (timestamp), updated_at (timestamp), created_by (varchar)
- [ ] Foreign key constraint to program_type table established
- [ ] Status field supports values: pending, approved, rejected
- [ ] Timestamps auto-populate on insert/update

---

###### US2.3: Create Notification Audit Table

**Title**: Create Notification Audit Table Migration

**Description**:
As a database administrator, I need to create the notification table to track all system notifications sent for program status changes.

**Acceptance Criteria**:
- [ ] Flyway migration script V3__create_notification_table.sql created
- [ ] Table includes columns: id (PK), program_id (FK to program), notification_type (varchar), recipient_email (varchar), subject (varchar), body (text), sent_at (timestamp), created_at (timestamp), updated_at (timestamp), status (varchar)
- [ ] Foreign key constraint to program table established
- [ ] notification_type supports values: submission_confirmation, approval, rejection
- [ ] status supports values: pending, sent, failed

---

###### US2.4: Seed Program Type Reference Data

**Title**: Seed Program Type Reference Data

**Description**:
As a database administrator, I need to seed the program_type table with initial bilingual reference data for the program submission dropdown.

**Acceptance Criteria**:
- [ ] Flyway migration script V4__seed_program_types.sql created
- [ ] Minimum 5 program types seeded with English and French names
- [ ] Program types include: Healthcare/Santé, Education/Éducation, Housing/Logement, Employment/Emploi, Social Services/Services sociaux
- [ ] Data loads successfully without errors

---

#### F3: Backend API Development

**Title**: Backend API Development

**Description**:
Develop Spring Boot REST APIs to support program submission, retrieval, review workflows, and reference data access. APIs serve both citizen and ministry portal frontends.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F3:

---

###### US3.1: Submit Program Request API

**Title**: Implement POST /api/programs Endpoint

**Description**:
As a citizen, I need an API endpoint to submit my program request so that it can be stored and processed by the ministry.

**Acceptance Criteria**:
- [ ] POST /api/programs endpoint implemented in Spring Boot
- [ ] Request body accepts: program_name, description, program_type_id, created_by (email)
- [ ] Validates required fields (program_name, program_type_id, created_by)
- [ ] Auto-sets status to 'pending' and submitted_at to current timestamp
- [ ] Returns 201 Created with program ID on success
- [ ] Returns 400 Bad Request with validation errors on invalid input
- [ ] Triggers submission confirmation notification (or queues it)

---

###### US3.2: List Programs API with Filtering

**Title**: Implement GET /api/programs Endpoint with Filtering

**Description**:
As a ministry employee, I need an API endpoint to retrieve program submissions with filtering capabilities so that I can efficiently manage my review workload.

**Acceptance Criteria**:
- [ ] GET /api/programs endpoint implemented
- [ ] Supports query parameters: status (pending/approved/rejected), program_type_id, date_from, date_to
- [ ] Returns paginated results with default page size of 20
- [ ] Results sorted by submitted_at descending (newest first)
- [ ] Returns 200 OK with array of program objects
- [ ] Each program object includes all fields plus program_type name

---

###### US3.3: Get Program Details API

**Title**: Implement GET /api/programs/{id} Endpoint

**Description**:
As a user, I need an API endpoint to retrieve full details of a specific program submission for viewing or review purposes.

**Acceptance Criteria**:
- [ ] GET /api/programs/{id} endpoint implemented
- [ ] Returns complete program object with all fields
- [ ] Includes nested program_type object with name and name_fr
- [ ] Returns 200 OK on success
- [ ] Returns 404 Not Found if program ID doesn't exist

---

###### US3.4: Review Program API

**Title**: Implement PUT /api/programs/{id}/review Endpoint

**Description**:
As a ministry employee, I need an API endpoint to approve or reject program submissions with optional comments so that citizens receive timely decisions.

**Acceptance Criteria**:
- [ ] PUT /api/programs/{id}/review endpoint implemented
- [ ] Request body accepts: status (approved/rejected), reviewer_comments (optional)
- [ ] Validates status is either 'approved' or 'rejected'
- [ ] Updates reviewed_at timestamp to current time
- [ ] Only allows review of programs with 'pending' status
- [ ] Returns 200 OK with updated program on success
- [ ] Returns 400 Bad Request if program not in pending status
- [ ] Returns 404 Not Found if program ID doesn't exist
- [ ] Triggers approval/rejection notification to citizen

---

###### US3.5: Get Program Types API

**Title**: Implement GET /api/program-types Endpoint

**Description**:
As a citizen, I need an API endpoint to retrieve available program types so that I can select the appropriate category for my submission.

**Acceptance Criteria**:
- [ ] GET /api/program-types endpoint implemented
- [ ] Returns array of all program types
- [ ] Each type includes: id, type_name, type_name_fr
- [ ] Results sorted alphabetically by type_name
- [ ] Returns 200 OK with array (empty array if no types)
- [ ] Response is cacheable (appropriate cache headers)

---

#### F4: Citizen Portal Frontend

**Title**: Citizen Portal Frontend Development

**Description**:
Build the public-facing citizen portal using React with Ontario Design System components. Portal enables citizens to submit program requests, view confirmation, and search their submissions.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F4:

---

###### US4.1: Program Submission Form

**Title**: Build Citizen Program Submission Form

**Description**:
As a citizen, I need a bilingual submission form to request government programs so that I can apply for services I need.

**Acceptance Criteria**:
- [ ] Submission form page implemented at /submit route
- [ ] Form fields: Program Name (text input), Description (textarea), Program Type (dropdown from API), Email (text input)
- [ ] All fields have bilingual labels (EN/FR based on language toggle)
- [ ] Client-side validation for required fields
- [ ] Program Type dropdown populated from GET /api/program-types
- [ ] Form submits to POST /api/programs
- [ ] Loading state shown during submission
- [ ] Error messages displayed for validation failures
- [ ] Ontario Design System form components used

---

###### US4.2: Submission Confirmation Page

**Title**: Build Submission Confirmation Page

**Description**:
As a citizen, I need a confirmation page after submitting my program request so that I know my submission was received successfully.

**Acceptance Criteria**:
- [ ] Confirmation page displays after successful submission
- [ ] Shows confirmation message in selected language
- [ ] Displays submitted program details (name, type, reference ID)
- [ ] Shows expected next steps and timeline
- [ ] Provides link to submit another request
- [ ] Provides link to search/track submissions
- [ ] Ontario Design System alert/success components used

---

###### US4.3: Program Search Page

**Title**: Build Citizen Program Search Page

**Description**:
As a citizen, I need a search page to find and track my previously submitted program requests so that I can monitor their status.

**Acceptance Criteria**:
- [ ] Search page implemented at /search route
- [ ] Search by email address field
- [ ] Results displayed in data table format
- [ ] Table columns: Program Name, Type, Status, Submitted Date
- [ ] Status displayed with appropriate visual indicators (pending=yellow, approved=green, rejected=red)
- [ ] Click row to view full details
- [ ] Empty state message when no results found
- [ ] Ontario Design System table components used

---

###### US4.4: Ontario Design System Layout

**Title**: Implement Ontario Design System Layout for Citizen Portal

**Description**:
As a citizen, I need the portal to follow Ontario Design System standards so that I have a consistent, accessible government service experience.

**Acceptance Criteria**:
- [ ] Ontario DS header component with government branding
- [ ] Ontario DS footer component with required links
- [ ] Responsive layout for mobile/tablet/desktop
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Skip navigation link for screen readers
- [ ] Consistent typography using Ontario DS tokens
- [ ] Proper color contrast ratios

---

###### US4.5: Bilingual Language Toggle

**Title**: Implement Bilingual Language Toggle

**Description**:
As a citizen, I need to switch between English and French so that I can use the portal in my preferred official language.

**Acceptance Criteria**:
- [ ] Language toggle button in header (EN | FR)
- [ ] All UI labels switch on toggle (no page reload)
- [ ] Form field labels, buttons, messages all translated
- [ ] Program type names display in selected language
- [ ] Language preference persisted in localStorage
- [ ] Default language based on browser preference
- [ ] Toggle accessible via keyboard navigation

---

#### F5: Ministry Portal Frontend

**Title**: Ministry Portal Frontend Development

**Description**:
Build the internal ministry review portal enabling government employees to view, filter, and process program submissions through approval or rejection workflows.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F5:

---

###### US5.1: Review Dashboard

**Title**: Build Ministry Review Dashboard

**Description**:
As a ministry employee, I need a dashboard to view all program submissions so that I can manage my review workload efficiently.

**Acceptance Criteria**:
- [ ] Dashboard page implemented at /ministry/dashboard route
- [ ] Data table displays all submissions from GET /api/programs
- [ ] Table columns: ID, Program Name, Type, Submitter Email, Status, Submitted Date
- [ ] Filter controls for: Status (dropdown), Program Type (dropdown), Date Range (date pickers)
- [ ] Filters trigger API call with query parameters
- [ ] Pagination controls for large result sets
- [ ] Row click navigates to review detail page
- [ ] Pending count badge displayed prominently
- [ ] Auto-refresh or manual refresh button

---

###### US5.2: Program Review Detail Page

**Title**: Build Program Review Detail Page

**Description**:
As a ministry employee, I need a detail page to view complete submission information so that I can make informed approval decisions.

**Acceptance Criteria**:
- [ ] Detail page implemented at /ministry/programs/{id} route
- [ ] Displays all program fields in readable format
- [ ] Shows submission timestamp and any review history
- [ ] Program type displayed with both EN and FR names
- [ ] Back button to return to dashboard
- [ ] Approve and Reject action buttons visible for pending programs
- [ ] Buttons disabled for already-reviewed programs
- [ ] Loading state while fetching details

---

###### US5.3: Approve/Reject Actions

**Title**: Implement Approve and Reject Actions

**Description**:
As a ministry employee, I need approve and reject buttons with optional comments so that I can process program submissions and communicate decisions.

**Acceptance Criteria**:
- [ ] Approve button triggers confirmation modal
- [ ] Reject button triggers confirmation modal
- [ ] Modal includes optional reviewer_comments textarea
- [ ] Comments field has maximum character limit (500)
- [ ] Confirm action calls PUT /api/programs/{id}/review
- [ ] Success message displayed after action completes
- [ ] Page redirects to dashboard after successful action
- [ ] Error handling for failed API calls
- [ ] Buttons disabled during API call (prevent double-submit)

---

###### US5.4: Ministry Portal Authentication UI

**Title**: Implement Ministry Portal Authentication UI

**Description**:
As a ministry employee, I need a login mechanism so that only authorized staff can access the review portal.

**Acceptance Criteria**:
- [ ] Login page at /ministry/login route
- [ ] Username and password fields
- [ ] Login form submits credentials (mock authentication for demo)
- [ ] Session management (localStorage token for demo)
- [ ] Protected routes redirect to login if not authenticated
- [ ] Logout button in ministry portal header
- [ ] Session timeout after 30 minutes of inactivity

---

#### F6: Testing & Quality Assurance

**Title**: Testing & Quality Assurance

**Description**:
Implement comprehensive testing including unit tests, integration tests, and end-to-end tests to ensure application quality and reliability.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F6:

---

###### US6.1: Backend Unit Tests

**Title**: Implement Backend Unit Tests

**Description**:
As a QA engineer, I need unit tests for Spring Boot services and controllers so that backend logic is verified in isolation.

**Acceptance Criteria**:
- [ ] JUnit 5 test framework configured
- [ ] Unit tests for ProgramService (submit, list, get, review methods)
- [ ] Unit tests for ProgramTypeService
- [ ] Unit tests for NotificationService
- [ ] Mock repository layer in unit tests
- [ ] Minimum 80% code coverage for service layer
- [ ] Tests run successfully in CI pipeline

---

###### US6.2: Backend Integration Tests

**Title**: Implement Backend Integration Tests

**Description**:
As a QA engineer, I need integration tests for API endpoints so that the full request/response cycle is verified.

**Acceptance Criteria**:
- [ ] Spring Boot Test with TestRestTemplate configured
- [ ] Integration tests for all 5 API endpoints
- [ ] Tests use embedded H2 or Testcontainers PostgreSQL
- [ ] Tests verify HTTP status codes and response bodies
- [ ] Tests verify error handling scenarios
- [ ] Database state reset between tests
- [ ] Tests run successfully in CI pipeline

---

###### US6.3: Frontend Component Tests

**Title**: Implement Frontend Component Tests

**Description**:
As a QA engineer, I need React component tests so that UI components render and behave correctly.

**Acceptance Criteria**:
- [ ] Jest and React Testing Library configured
- [ ] Tests for SubmissionForm component
- [ ] Tests for ConfirmationPage component
- [ ] Tests for SearchPage component
- [ ] Tests for ReviewDashboard component
- [ ] Tests for ReviewDetail component
- [ ] Tests verify rendering, user interactions, and state changes
- [ ] Minimum 70% code coverage for components

---

###### US6.4: End-to-End Tests

**Title**: Implement End-to-End Tests

**Description**:
As a QA engineer, I need E2E tests for critical user journeys so that the complete application flow is verified.

**Acceptance Criteria**:
- [ ] Playwright or Cypress test framework configured
- [ ] E2E test: Citizen submits program request successfully
- [ ] E2E test: Citizen searches for submitted program
- [ ] E2E test: Ministry employee approves program
- [ ] E2E test: Ministry employee rejects program with comments
- [ ] E2E test: Bilingual toggle works across pages
- [ ] Tests run against deployed test environment
- [ ] Tests integrated into CI/CD pipeline

---

#### F7: CI/CD Pipeline

**Title**: CI/CD Pipeline Implementation

**Description**:
Implement continuous integration and continuous deployment pipelines using Azure DevOps to automate build, test, and deployment processes.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F7:

---

###### US7.1: Build Pipeline

**Title**: Implement Build Pipeline

**Description**:
As a DevOps engineer, I need a build pipeline that compiles code and runs tests so that every commit is validated automatically.

**Acceptance Criteria**:
- [ ] Azure DevOps YAML pipeline created
- [ ] Pipeline triggers on PR to main branch
- [ ] Pipeline triggers on push to main branch
- [ ] Backend stage: Maven build, run unit tests, run integration tests
- [ ] Frontend stage: npm install, npm build, npm test
- [ ] Build artifacts published for deployment
- [ ] Build status badge added to README
- [ ] Pipeline completes in under 10 minutes

---

###### US7.2: Release Pipeline

**Title**: Implement Release Pipeline

**Description**:
As a DevOps engineer, I need a release pipeline that deploys the application to Azure so that approved changes reach production automatically.

**Acceptance Criteria**:
- [ ] Release pipeline with stages: Dev, Staging, Production
- [ ] Dev stage auto-deploys on successful main build
- [ ] Staging/Production require manual approval gates
- [ ] Backend deploys to Azure App Service or Container App
- [ ] Frontend deploys to Azure Static Web Apps
- [ ] Database migrations run via Flyway on deployment
- [ ] Environment-specific configuration via Azure App Configuration
- [ ] Rollback capability for failed deployments

---

###### US7.3: Infrastructure as Code

**Title**: Implement Infrastructure as Code

**Description**:
As a DevOps engineer, I need Bicep templates for Azure resources so that infrastructure is version-controlled and repeatable.

**Acceptance Criteria**:
- [ ] Bicep templates for all Azure resources
- [ ] Resources include: App Service/Container App, Static Web App, PostgreSQL Flexible Server, App Configuration, Key Vault
- [ ] Parameters file for each environment (dev, staging, prod)
- [ ] Infrastructure pipeline deploys Bicep templates
- [ ] Resource naming follows convention: civic-{env}-{resource}
- [ ] Tags applied: environment, application, owner

---

#### F8: Live Change Demo Feature

**Title**: Live Change Demo - Program Budget Field

**Description**:
Demonstrate full-stack development workflow by adding a program_budget field across all layers: database migration, API changes, and frontend updates. This feature showcases the complete change request lifecycle during Act 8.

**Parent**: E1 - CIVIC Program Request Management System

##### User Stories for F8:

---

###### US8.1: Add Budget Column Migration

**Title**: Add program_budget Column to Program Table

**Description**:
As a database administrator, I need to add a program_budget column to the program table so that citizens can specify requested funding amounts.

**Acceptance Criteria**:
- [ ] Flyway migration script V5__add_program_budget.sql created
- [ ] Column: program_budget (DECIMAL(12,2), nullable)
- [ ] Migration is backward compatible (nullable allows existing records)
- [ ] Migration runs successfully on existing database
- [ ] Column allows values from 0 to 999,999,999.99

---

###### US8.2: Update Backend API for Budget

**Title**: Update APIs to Support program_budget Field

**Description**:
As a backend developer, I need to update the APIs to accept and return the program_budget field so that the new field flows through the system.

**Acceptance Criteria**:
- [ ] POST /api/programs accepts optional program_budget in request body
- [ ] GET /api/programs returns program_budget in response objects
- [ ] GET /api/programs/{id} returns program_budget in response
- [ ] program_budget field added to Program entity/DTO
- [ ] Validation: if provided, must be positive number
- [ ] Existing tests updated, new tests added for budget field

---

###### US8.3: Update Submission Form for Budget

**Title**: Add Budget Field to Citizen Submission Form

**Description**:
As a citizen, I need a budget field on the submission form so that I can indicate the funding amount I'm requesting.

**Acceptance Criteria**:
- [ ] Budget field added to submission form (currency input)
- [ ] Field label: "Requested Budget" / "Budget demandé"
- [ ] Input formatted as currency with $ prefix
- [ ] Client-side validation for positive numbers
- [ ] Field is optional (not required)
- [ ] Budget value submitted to POST /api/programs
- [ ] Help text explains the field purpose

---

###### US8.4: Display Budget in Review Portal

**Title**: Display Budget in Ministry Review Portal

**Description**:
As a ministry employee, I need to see the requested budget amount on the review dashboard and detail pages so that I can consider funding in my decision.

**Acceptance Criteria**:
- [ ] Budget column added to review dashboard table
- [ ] Budget formatted as currency ($X,XXX.XX)
- [ ] Budget displayed on program detail page
- [ ] Dashboard sortable by budget amount
- [ ] Filter option to find high-value requests (>$100,000)
- [ ] Budget shows "N/A" or "-" if not provided

---

## Summary Statistics

| Item Type | Count |
|-----------|-------|
| Epics | 1 |
| Features | 8 |
| User Stories | 24 |
| **Total Work Items** | **33** |

### Breakdown by Feature

| Feature | User Stories |
|---------|--------------|
| F1: Infrastructure Setup | 0 (Close Immediately) |
| F2: Database Schema & Migrations | 4 |
| F3: Backend API Development | 5 |
| F4: Citizen Portal Frontend | 5 |
| F5: Ministry Portal Frontend | 4 |
| F6: Testing & Quality Assurance | 4 |
| F7: CI/CD Pipeline | 3 |
| F8: Live Change Demo | 4 |

---

## Work Item Creation Order (Act 1)

For MCP creation during Act 1, create work items in this dependency order:

1. **Epic E1** - Create first as parent for all Features
2. **Feature F1** (Infrastructure) - Create and close immediately
3. **Feature F2** (Database) - Create, then create US2.1-2.4
4. **Feature F3** (Backend API) - Create, then create US3.1-3.5
5. **Feature F4** (Citizen Portal) - Create, then create US4.1-4.5
6. **Feature F5** (Ministry Portal) - Create, then create US5.1-5.4
7. **Feature F6** (Testing) - Create, then create US6.1-6.4
8. **Feature F7** (CI/CD) - Create, then create US7.1-7.3
9. **Feature F8** (Live Change Demo) - Create, then create US8.1-8.4

---

## Demo Act Mapping

| Act | Feature | Stories |
|-----|---------|---------|
| Act 1 (Architect) | All | Create all work items |
| Act 2 (DBA) | F2 | US2.1, US2.2, US2.3, US2.4 |
| Act 3 (Backend Dev) | F3 | US3.1, US3.2, US3.3, US3.4, US3.5 |
| Act 4 (Frontend Dev) | F4 | US4.1, US4.2, US4.3, US4.4, US4.5 |
| Act 5 (Complete Story) | F5 | US5.1, US5.2, US5.3, US5.4 |
| Act 6 (QA Engineer) | F6 | US6.1, US6.2, US6.3, US6.4 |
| Act 7 (DevOps Engineer) | F7 | US7.1, US7.2, US7.3 |
| Act 8 (Full Stack Change) | F8 | US8.1, US8.2, US8.3, US8.4 |

---

## References

- Database schema based on provided 3-table structure
- API endpoints based on provided 5-endpoint specification
- Frontend components based on citizen/ministry portal requirements
- Ontario Design System for government UI standards
- Azure DevOps work item types: Epic → Feature → User Story hierarchy

---

## Research Status

**Status**: Complete

**Findings Summary**:
- Designed complete ADO hierarchy with 1 Epic, 8 Features, 24 User Stories
- Each User Story includes title, description, and acceptance criteria
- Feature F1 (Infrastructure) marked for immediate closure
- Feature F8 (Live Change Demo) covers Act 8 program_budget requirements
- Work items map to demo acts for persona-based development flow

---

## Recommended Next Research

- [ ] Research Azure DevOps MCP tool parameters for work item creation
- [ ] Research ADO work item field mappings (Title, Description, Acceptance Criteria formatting)
- [ ] Research ADO parent-child linking via MCP
- [ ] Research ADO work item state transitions for closing F1

---

## Clarifying Questions

None - research requirements fully addressed based on provided context.
