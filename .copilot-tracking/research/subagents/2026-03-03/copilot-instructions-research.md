# Copilot Instructions File Specification Research

**Research Date**: 2026-03-03  
**Research Topic**: Copilot Instructions File Specification for CIVIC Demo  
**Status**: Complete

## Overview

This document specifies the complete file structure, frontmatter, and content for five GitHub Copilot instruction files required for the CIVIC (Citizen Intake via Integrated Copilot) demo application. Each specification follows the prompt-builder.instructions.md authoring standards from hve-core.

## Research Sources

- [README.md](../../README.md) - Project requirements and technical stack
- prompt-builder.instructions.md - Authoring standards for instructions files
- GitHub Copilot official documentation - Instructions file format

## Key Project Requirements Summary

| Requirement | Value |
|-------------|-------|
| Java Version | 21 |
| Spring Boot | 3.x with Spring Data JPA |
| React Version | 18 with TypeScript |
| Build Tool (Frontend) | Vite (port 3000) |
| Target Database | Azure SQL |
| Local Database | H2 with `MODE=MSSQLServer` |
| Package Base | `com.ontario.program` |
| Commit Format | `AB#{id}` for ADO linking |
| Branch Format | `feature/{id}-description` |
| Accessibility | WCAG 2.2 compliance |
| Localization | Bilingual EN/FR via i18next |
| CSS Framework | Ontario Design System |

---

## File 1: Global Project Instructions

### File Path

`.github/copilot-instructions.md`

### Purpose

Provides global project context that applies to all files in the repository. This file is automatically included in Copilot's context for every interaction.

### Frontmatter

```yaml
---
description: "Global GitHub Copilot instructions for the CIVIC Program Approval Demo - Ontario Public Sector Developer Day 2026"
---
```

### Content Structure

```markdown
# CIVIC Program Approval Demo - Copilot Instructions

## Project Overview

This repository contains the CIVIC (Citizen Intake via Integrated Copilot) Program Approval Demo for the Ontario Public Sector Developer Day 2026. The application enables citizens to submit program requests and ministry employees to review and approve them.

## Architecture

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | React 18, TypeScript, Vite | Port 3000 |
| Backend | Java 21, Spring Boot 3.x | Spring Data JPA |
| Database | Azure SQL (prod), H2 (local) | Flyway migrations |
| Cloud | Azure App Service, Container Apps | Docker deployment |

## Core Requirements

### Bilingual Support (EN/FR)

- All user-facing text uses i18next translation keys
- Translation files: `public/locales/{en,fr}/translation.json`
- Never hardcode user-facing strings
- Key naming: `{feature}.{element}.{property}` (e.g., `program.form.title`)

### Accessibility (WCAG 2.2)

- All interactive elements have accessible names
- Color contrast ratio minimum 4.5:1
- Keyboard navigation for all functionality
- ARIA labels on dynamic content
- Focus management on route changes

### Ontario Design System

- Use Ontario Design System CSS classes
- Import from `@ontario-digital-service/ontario-design-system-component-library`
- Follow Ontario.ca header/footer templates
- Use Ontario colour palette variables

## Package Structure

### Backend (Java)

```text
src/main/java/com/ontario/program/
├── controller/     # REST API endpoints
├── service/        # Business logic
├── repository/     # Spring Data JPA interfaces
├── model/          # JPA entities
├── dto/            # Data Transfer Objects
└── config/         # Configuration classes
```

### Frontend (React)

```text
src/
├── components/     # Reusable React components
├── pages/          # Route-level page components
├── hooks/          # Custom React hooks
├── services/       # API client functions
├── i18n/           # Internationalization setup
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Development Workflow

### Branch Naming

Format: `feature/{work-item-id}-{short-description}`

Example: `feature/123-add-program-form`

### Commit Messages

Format: `AB#{work-item-id}: {description}`

Example: `AB#123: Add program submission form component`

### Pull Requests

- Title format: `AB#{id}: {description}`
- Include `Fixes AB#{id}` in PR body to auto-close work items
- All PRs require passing CI checks

## Local Development

### Backend

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### Frontend

```bash
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API requests to the backend on `http://localhost:8080`.

## Testing Requirements

- Backend: JUnit 5 with Spring Boot Test
- Frontend: Vitest with React Testing Library
- All new features require corresponding unit tests
- Accessibility tests using vitest-axe
```

---

## File 2: ADO Workflow Instructions

### File Path

`.github/instructions/ado-workflow.instructions.md`

### Purpose

Defines Azure DevOps integration conventions for branching, commits, and PR linking. Applies globally to ensure all Git operations follow the ADO integration patterns.

### Frontmatter

```yaml
---
description: "Azure DevOps workflow conventions for branching, commits, and PR linking"
applyTo: "**"
---
```

### Content Structure

```markdown
# Azure DevOps Workflow Instructions

These conventions ensure seamless integration between GitHub and Azure DevOps for work item tracking and traceability.

## Branch Naming Convention

Create branches using the following format:

```text
feature/{work-item-id}-{short-description}
bugfix/{work-item-id}-{short-description}
hotfix/{work-item-id}-{short-description}
```

### Examples

```text
feature/456-add-program-form
bugfix/789-fix-validation-error
hotfix/101-security-patch
```

### Rules

- Use lowercase letters and hyphens only
- Keep descriptions short (3-5 words maximum)
- Always include the ADO work item ID
- No special characters except hyphens

## Commit Message Format

Format all commit messages using the ADO linking syntax:

```text
AB#{work-item-id}: {imperative-description}
```

### Examples

```text
AB#456: Add program submission form
AB#456: Implement form validation
AB#789: Fix null pointer in program service
AB#101: Update security dependencies
```

### Rules

- Start with `AB#` followed by the work item ID
- Use imperative mood (Add, Fix, Update, Remove)
- Keep the first line under 72 characters
- Capitalize the first word after the colon
- No period at the end

### Multi-Line Commits

For complex changes, add a body after a blank line:

```text
AB#456: Add program submission form

- Create ProgramForm component with validation
- Add form state management with React Hook Form
- Implement bilingual field labels using i18next
- Add unit tests for form validation
```

## Pull Request Conventions

### PR Title Format

```text
AB#{work-item-id}: {description}
```

### PR Body Requirements

Include the following in every PR body:

```markdown
## Summary

Brief description of the changes.

## Work Item

Fixes AB#{work-item-id}

## Changes

- Change 1
- Change 2

## Testing

Describe how the changes were tested.
```

### Auto-Close Work Items

Use `Fixes AB#{id}` in the PR body to automatically transition the work item to "Done" when the PR merges.

## Post-Merge Cleanup

After a PR merges to `main`:

1. Delete the feature branch (GitHub handles this automatically if configured)
2. Verify the work item transitioned to "Done" in ADO
3. Pull the latest `main` locally: `git pull origin main`

## Useful Git Commands

### Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/{id}-{description}
```

### Commit with ADO Link

```bash
git add .
git commit -m "AB#{id}: {description}"
```

### Push and Create PR

```bash
git push -u origin feature/{id}-{description}
# Then create PR in GitHub UI or CLI
```
```

---

## File 3: Java Instructions

### File Path

`.github/instructions/java.instructions.md`

### Purpose

Defines Java and Spring Boot coding standards, patterns, and conventions. Applies to all Java source files.

### Frontmatter

```yaml
---
description: "Java 21 and Spring Boot 3.x coding standards for the CIVIC demo"
applyTo: "**/*.java"
---
```

### Content Structure

```markdown
# Java Coding Standards

These standards apply to all Java source files in the CIVIC Program Approval Demo.

## Technology Stack

- Java 21 (LTS)
- Spring Boot 3.x
- Spring Data JPA
- Flyway for migrations
- JUnit 5 for testing

## Package Structure

All Java classes belong under the base package `com.ontario.program`:

```text
com.ontario.program/
├── controller/     # @RestController classes
├── service/        # @Service classes with business logic
├── repository/     # Spring Data JPA repositories
├── model/          # @Entity JPA classes
├── dto/            # Data Transfer Objects for API
├── config/         # @Configuration classes
├── exception/      # Custom exception classes
└── util/           # Utility classes
```

## Entity Conventions

### JPA Entity Pattern

```java
package com.ontario.program.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "programs")
public class Program {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String nameEn;
    
    @Column(nullable = false, length = 200)
    private String nameFr;
    
    @Column(length = 2000)
    private String descriptionEn;
    
    @Column(length = 2000)
    private String descriptionFr;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgramStatus status;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
}
```

### Rules

- Use `jakarta.persistence` annotations (not `javax.persistence`)
- Include both English and French columns for bilingual fields (suffixed `En`/`Fr`)
- Use `LocalDateTime` for timestamps (not `Date` or `Timestamp`)
- Add `@PrePersist` and `@PreUpdate` lifecycle callbacks
- Use `@Enumerated(EnumType.STRING)` for enum columns

## Repository Conventions

### Spring Data JPA Repository Pattern

```java
package com.ontario.program.repository;

import com.ontario.program.model.Program;
import com.ontario.program.model.ProgramStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    
    List<Program> findByStatus(ProgramStatus status);
    
    @Query("SELECT p FROM Program p WHERE LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(p.nameFr) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Program> searchByName(String name);
}
```

### Rules

- Extend `JpaRepository<Entity, ID>` for full CRUD
- Use method name query derivation when possible
- Use `@Query` with JPQL for complex queries
- Always add `@Repository` annotation

## Service Conventions

### Service Layer Pattern

```java
package com.ontario.program.service;

import com.ontario.program.dto.ProgramDto;
import com.ontario.program.model.Program;
import com.ontario.program.repository.ProgramRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProgramService {
    
    private final ProgramRepository programRepository;
    
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }
    
    public List<ProgramDto> findAll() {
        return programRepository.findAll().stream()
            .map(this::toDto)
            .toList();
    }
    
    @Transactional
    public ProgramDto create(ProgramDto dto) {
        Program program = toEntity(dto);
        Program saved = programRepository.save(program);
        return toDto(saved);
    }
    
    private ProgramDto toDto(Program program) {
        // Map entity to DTO
    }
    
    private Program toEntity(ProgramDto dto) {
        // Map DTO to entity
    }
}
```

### Rules

- Use constructor injection (not `@Autowired` on fields)
- Add `@Transactional(readOnly = true)` at class level
- Override with `@Transactional` on write methods
- Keep mapping logic in private methods

## Controller Conventions

### REST Controller Pattern

```java
package com.ontario.program.controller;

import com.ontario.program.dto.ProgramDto;
import com.ontario.program.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {
    
    private final ProgramService programService;
    
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }
    
    @GetMapping
    public ResponseEntity<List<ProgramDto>> findAll() {
        return ResponseEntity.ok(programService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProgramDto> findById(@PathVariable Long id) {
        return programService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ProgramDto> create(@Valid @RequestBody ProgramDto dto) {
        ProgramDto created = programService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

### Rules

- Use `@RestController` (not `@Controller` with `@ResponseBody`)
- Return `ResponseEntity<T>` for all endpoints
- Use `@Valid` on request body DTOs
- Follow REST conventions: GET (read), POST (create), PUT (update), DELETE (remove)
- Use plural nouns in path: `/api/programs` not `/api/program`

## DTO Conventions

### DTO Pattern with Validation

```java
package com.ontario.program.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProgramDto(
    Long id,
    
    @NotBlank(message = "English name is required")
    @Size(max = 200, message = "English name must be 200 characters or less")
    String nameEn,
    
    @NotBlank(message = "French name is required")
    @Size(max = 200, message = "French name must be 200 characters or less")
    String nameFr,
    
    @Size(max = 2000, message = "English description must be 2000 characters or less")
    String descriptionEn,
    
    @Size(max = 2000, message = "French description must be 2000 characters or less")
    String descriptionFr,
    
    String status
) {}
```

### Rules

- Prefer Java records for DTOs (immutable by default)
- Add Jakarta Bean Validation annotations
- Include both English and French fields for bilingual content
- Use meaningful validation messages

## Testing Conventions

### Unit Test Pattern

```java
package com.ontario.program.service;

import com.ontario.program.model.Program;
import com.ontario.program.repository.ProgramRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgramServiceTest {
    
    @Mock
    private ProgramRepository programRepository;
    
    @InjectMocks
    private ProgramService programService;
    
    @Test
    @DisplayName("findAll returns all programs as DTOs")
    void findAll_returnsAllPrograms() {
        // Given
        when(programRepository.findAll()).thenReturn(List.of(createProgram()));
        
        // When
        var result = programService.findAll();
        
        // Then
        assertThat(result).hasSize(1);
    }
    
    private Program createProgram() {
        // Create test fixture
    }
}
```

### Rules

- Use JUnit 5 (`org.junit.jupiter.api`)
- Use Mockito for mocking dependencies
- Add `@DisplayName` for readable test names
- Follow Given/When/Then structure in comments
- Use AssertJ assertions (not JUnit assertions)

## Local Development Profile

### application-local.yml

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:programdb;MODE=MSSQLServer;DB_CLOSE_DELAY=-1
    driver-class-name: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
  flyway:
    enabled: true
```

### Rules

- Use H2 with `MODE=MSSQLServer` to match Azure SQL behavior
- Enable H2 console for debugging at `/h2-console`
- Set `ddl-auto: validate` and let Flyway handle schema
- Enable `show-sql` for development debugging
```

---

## File 4: React Instructions

### File Path

`.github/instructions/react.instructions.md`

### Purpose

Defines React and TypeScript coding standards, component patterns, and accessibility requirements. Applies to all TypeScript/TSX files.

### Frontmatter

```yaml
---
description: "React 18 and TypeScript coding standards with Ontario Design System and WCAG 2.2 compliance"
applyTo: "**/*.{ts,tsx}"
---
```

### Content Structure

```markdown
# React Coding Standards

These standards apply to all React and TypeScript source files in the CIVIC Program Approval Demo.

## Technology Stack

- React 18
- TypeScript 5.x (strict mode)
- Vite (development server on port 3000)
- i18next for internationalization
- React Hook Form for forms
- Ontario Design System component library

## Project Structure

```text
src/
├── components/           # Reusable UI components
│   ├── common/           # Shared components (Button, Input, etc.)
│   └── forms/            # Form-specific components
├── pages/                # Route-level page components
├── hooks/                # Custom React hooks
├── services/             # API client functions
├── i18n/                 # i18next configuration
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
└── App.tsx               # Root component with routing
```

## Component Conventions

### Functional Component Pattern

```tsx
import { useTranslation } from 'react-i18next';

interface ProgramCardProps {
  program: Program;
  onSelect: (id: number) => void;
}

export function ProgramCard({ program, onSelect }: ProgramCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const displayName = currentLang === 'fr' ? program.nameFr : program.nameEn;
  const displayDescription = currentLang === 'fr' ? program.descriptionFr : program.descriptionEn;
  
  return (
    <article 
      className="ontario-card"
      aria-labelledby={`program-${program.id}-title`}
    >
      <h3 id={`program-${program.id}-title`}>{displayName}</h3>
      <p>{displayDescription}</p>
      <button
        type="button"
        className="ontario-button ontario-button--primary"
        onClick={() => onSelect(program.id)}
        aria-label={t('program.card.selectAriaLabel', { name: displayName })}
      >
        {t('program.card.select')}
      </button>
    </article>
  );
}
```

### Rules

- Use named function exports (not default exports)
- Define props interface above the component
- Destructure props in function signature
- Use `useTranslation` hook for all user-facing text
- Select language-appropriate content based on `i18n.language`

## Internationalization (i18n)

### Translation Key Pattern

```tsx
// ❌ Avoid hardcoded strings
<h1>Program Submission</h1>

// ✅ Use translation keys
const { t } = useTranslation();
<h1>{t('program.form.title')}</h1>
```

### Translation File Structure

```json
// public/locales/en/translation.json
{
  "program": {
    "form": {
      "title": "Program Submission",
      "nameLabel": "Program Name",
      "descriptionLabel": "Program Description",
      "submitButton": "Submit Program"
    },
    "card": {
      "select": "Select Program",
      "selectAriaLabel": "Select {{name}} program"
    }
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "required": "Required"
  }
}
```

```json
// public/locales/fr/translation.json
{
  "program": {
    "form": {
      "title": "Soumission de programme",
      "nameLabel": "Nom du programme",
      "descriptionLabel": "Description du programme",
      "submitButton": "Soumettre le programme"
    },
    "card": {
      "select": "Sélectionner le programme",
      "selectAriaLabel": "Sélectionner le programme {{name}}"
    }
  },
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite",
    "required": "Obligatoire"
  }
}
```

### Rules

- Key format: `{feature}.{element}.{property}`
- Use interpolation for dynamic values: `{{name}}`
- Keep translation files in sync (same keys in EN and FR)
- Group related keys under feature namespaces

## Accessibility (WCAG 2.2)

### Required Patterns

```tsx
// Accessible form field
<div className="ontario-form-group">
  <label 
    htmlFor="program-name"
    className="ontario-label"
  >
    {t('program.form.nameLabel')}
    <span className="ontario-label__flag">
      {t('common.required')}
    </span>
  </label>
  <input
    id="program-name"
    type="text"
    className="ontario-input"
    aria-required="true"
    aria-describedby="program-name-hint"
    {...register('name', { required: true })}
  />
  <p id="program-name-hint" className="ontario-hint">
    {t('program.form.nameHint')}
  </p>
  {errors.name && (
    <p 
      className="ontario-error-message" 
      role="alert"
      aria-live="polite"
    >
      {t('program.form.nameError')}
    </p>
  )}
</div>
```

### Rules

- All form inputs must have associated `<label>` elements
- Use `htmlFor` to associate labels with inputs
- Add `aria-required="true"` on required fields
- Use `aria-describedby` to associate hints and errors
- Wrap error messages in `role="alert"` with `aria-live="polite"`
- Use semantic HTML elements (`<main>`, `<nav>`, `<article>`, `<section>`)
- Ensure colour contrast ratio of at least 4.5:1

### Focus Management

```tsx
import { useEffect, useRef } from 'react';

export function ProgramConfirmation() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Move focus to heading on page load for screen readers
    headingRef.current?.focus();
  }, []);
  
  return (
    <main>
      <h1 ref={headingRef} tabIndex={-1}>
        {t('program.confirmation.title')}
      </h1>
      {/* ... */}
    </main>
  );
}
```

## Ontario Design System

### CSS Class Usage

```tsx
// Ontario buttons
<button className="ontario-button ontario-button--primary">
  {t('common.submit')}
</button>

<button className="ontario-button ontario-button--secondary">
  {t('common.cancel')}
</button>

// Ontario form elements
<input className="ontario-input" />
<textarea className="ontario-textarea" />
<select className="ontario-input ontario-dropdown" />

// Ontario layout
<div className="ontario-row">
  <div className="ontario-columns ontario-small-12 ontario-medium-6">
    {/* Column content */}
  </div>
</div>

// Ontario alerts
<div className="ontario-alert ontario-alert--informational">
  <div className="ontario-alert__body">
    <p>{t('program.form.infoMessage')}</p>
  </div>
</div>
```

### Rules

- Use Ontario Design System classes for all UI elements
- Do not override Ontario styles with custom CSS unless necessary
- Follow Ontario grid system for responsive layouts
- Use Ontario colour variables from the design system

## Form Handling

### React Hook Form Pattern

```tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ProgramFormData {
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  programType: string;
}

export function ProgramForm() {
  const { t } = useTranslation();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<ProgramFormData>();
  
  const onSubmit: SubmitHandler<ProgramFormData> = async (data) => {
    await submitProgram(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="ontario-form-group">
        <label htmlFor="nameEn" className="ontario-label">
          {t('program.form.nameEnLabel')}
        </label>
        <input
          id="nameEn"
          type="text"
          className="ontario-input"
          aria-invalid={!!errors.nameEn}
          {...register('nameEn', { 
            required: t('program.form.nameRequired') 
          })}
        />
        {errors.nameEn && (
          <p className="ontario-error-message" role="alert">
            {errors.nameEn.message}
          </p>
        )}
      </div>
      
      <button 
        type="submit" 
        className="ontario-button ontario-button--primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('common.submitting') : t('program.form.submit')}
      </button>
    </form>
  );
}
```

## API Client Pattern

### Service Function Pattern

```tsx
// src/services/programService.ts
import { Program, CreateProgramDto } from '../types/program';

const API_BASE = '/api';

export async function getPrograms(): Promise<Program[]> {
  const response = await fetch(`${API_BASE}/programs`);
  if (!response.ok) {
    throw new Error('Failed to fetch programs');
  }
  return response.json();
}

export async function createProgram(data: CreateProgramDto): Promise<Program> {
  const response = await fetch(`${API_BASE}/programs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create program');
  }
  return response.json();
}
```

## Type Definitions

### Interface Pattern

```tsx
// src/types/program.ts
export interface Program {
  id: number;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  programType: ProgramType;
  status: ProgramStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProgramType = 'GRANT' | 'BENEFIT' | 'SERVICE';
export type ProgramStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface CreateProgramDto {
  nameEn: string;
  nameFr: string;
  descriptionEn?: string;
  descriptionFr?: string;
  programType: ProgramType;
}
```

## Testing Conventions

### Component Test Pattern

```tsx
// src/components/ProgramCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProgramCard } from './ProgramCard';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

describe('ProgramCard', () => {
  const mockProgram = {
    id: 1,
    nameEn: 'Test Program',
    nameFr: 'Programme de test',
    descriptionEn: 'A test program',
    descriptionFr: 'Un programme de test',
  };
  
  it('renders program name in English', () => {
    render(<ProgramCard program={mockProgram} onSelect={vi.fn()} />);
    
    expect(screen.getByText('Test Program')).toBeInTheDocument();
  });
  
  it('calls onSelect when button is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<ProgramCard program={mockProgram} onSelect={onSelect} />);
    await user.click(screen.getByRole('button'));
    
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
```

### Accessibility Test Pattern

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { ProgramForm } from './ProgramForm';

expect.extend(toHaveNoViolations);

describe('ProgramForm accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ProgramForm />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });
});
```
```

---

## File 5: SQL Instructions

### File Path

`.github/instructions/sql.instructions.md`

### Purpose

Defines SQL and Flyway migration standards for database schema management. Applies to all SQL files.

### Frontmatter

```yaml
---
description: "SQL and Flyway migration standards for Azure SQL and H2 compatibility"
applyTo: "**/*.sql"
---
```

### Content Structure

```markdown
# SQL and Flyway Migration Standards

These standards apply to all SQL migration files in the CIVIC Program Approval Demo.

## Technology Stack

- Azure SQL (production)
- H2 (local development with `MODE=MSSQLServer`)
- Flyway for schema migrations

## Flyway Migration Location

All migrations reside in:

```text
src/main/resources/db/migration/
├── V1__create_programs_table.sql
├── V2__add_program_types.sql
├── V3__create_submissions_table.sql
└── ...
```

## Migration Naming Convention

```text
V{version}__{description}.sql
```

### Rules

- Start with `V` followed by a version number
- Use double underscore `__` as separator
- Use snake_case for description
- Version numbers must be unique and sequential
- Example: `V1__create_programs_table.sql`

### Repeatable Migrations (Optional)

For reference data that may change:

```text
R__{description}.sql
```

Example: `R__seed_program_types.sql`

## SQL Style Guidelines

### Table Creation Pattern

```sql
-- V1__create_programs_table.sql
CREATE TABLE programs (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name_en NVARCHAR(200) NOT NULL,
    name_fr NVARCHAR(200) NOT NULL,
    description_en NVARCHAR(MAX),
    description_fr NVARCHAR(MAX),
    program_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100)
);

-- Create index for common queries
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_type ON programs(program_type);
```

### Rules

- Use `BIGINT IDENTITY(1,1)` for auto-incrementing primary keys
- Use `NVARCHAR` for text fields (Unicode support for EN/FR)
- Use `NVARCHAR(MAX)` for long text fields
- Use `VARCHAR` for ASCII-only fields (status, type enums)
- Use `DATETIME2` for timestamps (more precision than `DATETIME`)
- Include `created_at` and `updated_at` audit columns
- Add indexes on frequently queried columns

## Bilingual Data Support

### Column Naming

All user-facing text columns have English and French variants:

```sql
name_en NVARCHAR(200) NOT NULL,
name_fr NVARCHAR(200) NOT NULL,
description_en NVARCHAR(MAX),
description_fr NVARCHAR(MAX),
```

### Validation Constraints

```sql
-- Both languages required for display name
ALTER TABLE programs 
ADD CONSTRAINT chk_programs_name_bilingual 
CHECK (name_en IS NOT NULL AND name_fr IS NOT NULL);
```

## Foreign Key Patterns

### Reference Table Pattern

```sql
-- V2__create_program_types_table.sql
CREATE TABLE program_types (
    id INT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_en NVARCHAR(100) NOT NULL,
    name_fr NVARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

-- Seed reference data
INSERT INTO program_types (id, code, name_en, name_fr, display_order) VALUES
(1, 'GRANT', 'Grant', 'Subvention', 1),
(2, 'BENEFIT', 'Benefit', 'Prestation', 2),
(3, 'SERVICE', 'Service', 'Service', 3);

-- Add foreign key to programs
ALTER TABLE programs 
ADD program_type_id INT REFERENCES program_types(id);
```

## Migration Safety Rules

### Always Include

```sql
-- Wrap DDL in transaction (Flyway handles this, but be explicit)
BEGIN TRANSACTION;

-- Your DDL here

COMMIT TRANSACTION;
```

### Backwards Compatible Changes

Safe operations that don't break existing code:

```sql
-- Adding a nullable column (safe)
ALTER TABLE programs ADD new_column NVARCHAR(100);

-- Adding an index (safe)
CREATE INDEX idx_programs_new ON programs(new_column);

-- Adding a table (safe)
CREATE TABLE new_table (...);
```

### Breaking Changes (Require Coordination)

Operations that need frontend/backend updates first:

```sql
-- Renaming a column (breaking)
-- Step 1: Add new column
ALTER TABLE programs ADD new_name NVARCHAR(200);
-- Step 2: Copy data
UPDATE programs SET new_name = old_name;
-- Step 3: Update application code
-- Step 4: Drop old column (separate migration)
ALTER TABLE programs DROP COLUMN old_name;

-- Removing NOT NULL (use new migration after app update)
ALTER TABLE programs ALTER COLUMN some_column NVARCHAR(100) NULL;
```

## H2 Compatibility Notes

When running locally with H2 in `MODE=MSSQLServer`:

### Supported Features

- `IDENTITY(1,1)` for auto-increment
- `NVARCHAR` and `VARCHAR` types
- `DATETIME2` type
- Basic T-SQL syntax
- Standard foreign keys

### Unsupported Features (Avoid)

```sql
-- Avoid SQL Server-specific features not in H2:
-- FILESTREAM, GEOGRAPHY, HIERARCHYID, computed columns with complex expressions

-- Instead of GETDATE() in default, use application-level timestamps
-- Or provide H2-compatible alternative
```

### Conditional Blocks (When Needed)

```sql
-- For SQL Server-specific features, use conditional execution
-- This is rarely needed if you stick to ANSI SQL
```

## Query Patterns for Repository Layer

### Search Query Pattern

```sql
-- Bilingual search (referenced in JpaRepository @Query)
SELECT * FROM programs 
WHERE LOWER(name_en) LIKE LOWER(CONCAT('%', @searchTerm, '%'))
   OR LOWER(name_fr) LIKE LOWER(CONCAT('%', @searchTerm, '%'))
ORDER BY created_at DESC;
```

### Pagination Pattern

```sql
-- SQL Server pagination (Spring Data handles this)
SELECT * FROM programs
ORDER BY created_at DESC
OFFSET @offset ROWS
FETCH NEXT @limit ROWS ONLY;
```

## Audit Trail Pattern

### Audit Columns

All tables include:

```sql
created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
created_by NVARCHAR(100),
updated_by NVARCHAR(100)
```

### Update Trigger (Optional)

```sql
-- Trigger to auto-update updated_at
CREATE TRIGGER trg_programs_updated_at
ON programs
AFTER UPDATE
AS
BEGIN
    UPDATE programs
    SET updated_at = GETDATE()
    FROM programs p
    INNER JOIN inserted i ON p.id = i.id;
END;
```

## Example Complete Migration

```sql
-- V3__create_submissions_table.sql
-- Creates the submissions table for program submission tracking

BEGIN TRANSACTION;

CREATE TABLE submissions (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    program_id BIGINT NOT NULL REFERENCES programs(id),
    
    -- Submitter information
    submitter_email NVARCHAR(255) NOT NULL,
    submitter_name NVARCHAR(200) NOT NULL,
    
    -- Bilingual content
    justification_en NVARCHAR(MAX),
    justification_fr NVARCHAR(MAX),
    
    -- Status tracking
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    reviewed_by NVARCHAR(100),
    reviewed_at DATETIME2,
    review_notes NVARCHAR(MAX),
    
    -- Document reference
    document_url NVARCHAR(500),
    
    -- Audit columns
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100)
);

-- Indexes for common queries
CREATE INDEX idx_submissions_program ON submissions(program_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_email ON submissions(submitter_email);

COMMIT TRANSACTION;
```
```

---

## Summary of Specifications

| File | applyTo Pattern | Primary Focus |
|------|-----------------|---------------|
| copilot-instructions.md | (global) | Project overview, architecture, workflow |
| ado-workflow.instructions.md | `**` | Git branching, commits, PR conventions |
| java.instructions.md | `**/*.java` | Spring Boot patterns, JPA entities, services |
| react.instructions.md | `**/*.{ts,tsx}` | React components, i18n, accessibility |
| sql.instructions.md | `**/*.sql` | Flyway migrations, SQL patterns |

## Key Conventions Cross-Reference

| Convention | Java | React | SQL |
|------------|------|-------|-----|
| Bilingual fields | `nameEn`, `nameFr` | i18next keys | `name_en`, `name_fr` |
| Package/path prefix | `com.ontario.program` | `src/` | `db/migration/` |
| Timestamp type | `LocalDateTime` | ISO string | `DATETIME2` |
| Validation | Jakarta Bean Validation | React Hook Form | CHECK constraints |

## Recommended Next Research

1. **Ontario Design System Deep Dive** - Document specific Ontario DS components, colour variables, and grid classes for comprehensive frontend guidance
2. **Test Plan Structure** - Research Azure DevOps Test Plans integration for automated test case linking
3. **GitHub Actions CI/CD** - Specify workflow templates for the build/test/deploy pipeline
4. **Docker Container Specs** - Document Dockerfile patterns for Java container deployment

---

**Research Status**: Complete  
**Output Path**: `.copilot-tracking/research/subagents/2026-03-03/copilot-instructions-research.md`
