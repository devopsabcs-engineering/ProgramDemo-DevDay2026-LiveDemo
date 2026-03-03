---
description: "Global GitHub Copilot instructions for the CIVIC Program Approval Demo - Ontario Public Sector Developer Day 2026"
---

# CIVIC Program Approval Demo

## Project Overview

CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) is a bilingual (EN/FR) web application for Ontario government program requests. This demo showcases GitHub Copilot-assisted development for the Ontario Public Sector Developer Day 2026.

## Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 + TypeScript + Vite | Citizen and Ministry portals |
| Backend | Java 21 + Spring Boot 3.x | REST API |
| Database | Azure SQL (prod) / H2 (local) | Data persistence |
| Cloud | Azure App Service, Durable Functions, Logic Apps, AI Foundry | Hosting and AI |

## Core Requirements

### Bilingual Support

- All domain entities must include `nameEn` and `nameFr` fields in Java
- React components use i18next keys for all user-facing text
- Language toggle must be accessible from all pages

### Accessibility

- WCAG 2.2 Level AA compliance required
- All interactive elements must be keyboard accessible
- Provide appropriate ARIA labels and roles
- Ensure sufficient color contrast ratios

### Ontario Design System

- Use CSS classes from [designsystem.ontario.ca](https://designsystem.ontario.ca/)
- Follow Ontario branding guidelines
- Maintain consistent component styling

## Package Structure

### Backend (Java)

```text
com.ontario.program
├── controller/    # REST endpoints
├── service/       # Business logic
├── repository/    # Data access
├── model/         # JPA entities
├── dto/           # Data transfer objects
└── config/        # Configuration classes
```

### Frontend (React)

```text
src/
├── components/    # Reusable UI components
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
├── services/      # API client services
├── i18n/          # Internationalization
└── types/         # TypeScript definitions
```

## Development Workflow

### Branch Naming

```text
feature/{work-item-id}-{description}
```

Example: `feature/123-add-program-list`

### Commit Format

```text
AB#{work-item-id}: {imperative-description}
```

Example: `AB#123: Add program listing endpoint`

### Pull Request Linking

Include `Fixes AB#{id}` in PR body to auto-link Azure DevOps work items.

## Local Development

### Backend

```bash
./mvnw spring-boot:run -Dspring.profiles.active=local
```

Runs on port 8080 with H2 in-memory database.

### Frontend

```bash
npm run dev
```

Runs on port 3000 with hot module replacement.

## Testing Requirements

### Backend

- Framework: JUnit 5
- Coverage target: 80%
- Use `@SpringBootTest` for integration tests
- Use `@WebMvcTest` for controller tests

### Frontend

- Framework: Vitest
- Use React Testing Library for component tests
- Use vitest-axe for accessibility testing
- Mock API calls with MSW (Mock Service Worker)
