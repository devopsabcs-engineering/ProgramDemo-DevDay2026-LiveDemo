---
title: CIVIC Program Request Management System - Design Document
description: Design specification with API endpoints, frontend components, and compliance requirements
author: DevOps ABCS Engineering
ms.date: 2026-03-03
ms.topic: reference
keywords:
  - design
  - api
  - frontend
  - wcag
  - ontario-design-system
---

## Overview

This document specifies the design for the CIVIC Program Request Management System, including REST API endpoints, frontend component hierarchy, TypeScript interfaces, and compliance requirements.

## API Endpoints

### POST /api/programs

Submit a new program request.

**Request DTO:** `CreateProgramRequest`

```java
record CreateProgramRequest(
    @NotBlank String programName,
    String programDescription,
    @NotNull Integer programTypeId,
    String createdBy
) {}
```

**Response DTO:** `ProgramResponse`

```java
record ProgramResponse(
    Integer id,
    String programName,
    String programDescription,
    Integer programTypeId,
    String programTypeName,
    String status,
    String reviewerComments,
    LocalDateTime submittedAt,
    LocalDateTime reviewedAt,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String createdBy
) {}
```

**Response Status:** 201 Created

**Example Request:**

```json
{
    "programName": "Youth Employment Initiative",
    "programDescription": "A program to help youth find employment opportunities",
    "programTypeId": 1,
    "createdBy": "citizen@example.com"
}
```

### GET /api/programs

List programs with optional filtering and pagination.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | String | No | Filter by status (DRAFT, SUBMITTED, APPROVED, REJECTED) |
| programTypeId | Integer | No | Filter by program type |
| page | Integer | No | Page number (0-indexed, default: 0) |
| size | Integer | No | Page size (default: 20) |

**Response DTO:** `PagedResponse<ProgramResponse>`

```java
record PagedResponse<T>(
    List<T> content,
    long totalElements,
    int totalPages,
    int page,
    int size
) {}
```

**Response Status:** 200 OK

**Example Response:**

```json
{
    "content": [
        {
            "id": 1,
            "programName": "Youth Employment Initiative",
            "programDescription": "A program to help youth find employment",
            "programTypeId": 1,
            "programTypeName": "Community Services",
            "status": "SUBMITTED",
            "createdAt": "2026-03-03T10:30:00",
            "createdBy": "citizen@example.com"
        }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "page": 0,
    "size": 20
}
```

### GET /api/programs/{id}

Get a single program by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | Program ID |

**Response DTO:** `ProgramResponse`

**Response Status:** 200 OK, 404 Not Found

### PUT /api/programs/{id}/review

Approve or reject a program request.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | Program ID |

**Request DTO:** `ReviewProgramRequest`

```java
record ReviewProgramRequest(
    @NotBlank String status,  // APPROVED or REJECTED
    String reviewerComments
) {}
```

**Response DTO:** `ProgramResponse`

**Response Status:** 200 OK

**Example Request:**

```json
{
    "status": "APPROVED",
    "reviewerComments": "Program meets all requirements. Approved for implementation."
}
```

### GET /api/program-types

List all available program types.

**Response DTO:** `ProgramTypeResponse[]`

```java
record ProgramTypeResponse(
    Integer id,
    String typeName,
    String typeNameFr
) {}
```

**Response Status:** 200 OK

**Example Response:**

```json
[
    {
        "id": 1,
        "typeName": "Community Services",
        "typeNameFr": "Services communautaires"
    },
    {
        "id": 2,
        "typeName": "Health & Wellness",
        "typeNameFr": "Santé et bien-être"
    }
]
```

## Error Handling

### RFC 7807 ProblemDetail

All API errors follow the RFC 7807 Problem Details specification.

**Error Response Structure:**

```json
{
    "type": "about:blank",
    "title": "Not Found",
    "status": 404,
    "detail": "Program with ID 999 not found",
    "instance": "/api/programs/999"
}
```

**Common Error Responses:**

| Status | Title | Description |
|--------|-------|-------------|
| 400 | Bad Request | Invalid request body or parameters |
| 404 | Not Found | Resource not found |
| 409 | Conflict | State conflict (e.g., reviewing a draft program) |
| 500 | Internal Server Error | Unexpected server error |

**Validation Error Example:**

```json
{
    "type": "about:blank",
    "title": "Bad Request",
    "status": 400,
    "detail": "Validation failed",
    "instance": "/api/programs",
    "violations": [
        {
            "field": "programName",
            "message": "must not be blank"
        }
    ]
}
```

## Frontend Component Hierarchy

```text
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

### Route Descriptions

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | CitizenFormPage | Program submission form for citizens |
| `/confirmation/:id` | ConfirmationPage | Submission confirmation with program ID |
| `/search` | SearchPage | Search and filter programs |
| `/review` | ReviewDashboardPage | Ministry reviewer dashboard |
| `/review/:id` | ReviewDetailPage | Individual program review page |

## TypeScript Interfaces

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

interface CreateProgramRequest {
    programName: string;
    programDescription?: string;
    programTypeId: number;
    createdBy?: string;
}

interface ReviewProgramRequest {
    status: 'APPROVED' | 'REJECTED';
    reviewerComments?: string;
}

interface ProblemDetail {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    violations?: ValidationViolation[];
}

interface ValidationViolation {
    field: string;
    message: string;
}
```

## WCAG 2.2 Compliance Checklist

Accessibility requirements for Level AA compliance:

- [ ] All form inputs have visible labels
- [ ] Error messages announced to screen readers
- [ ] Focus management on navigation
- [ ] Keyboard-only navigation works
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Skip links present
- [ ] Language toggle accessible
- [ ] Form validation errors clearly identified
- [ ] Focus indicators visible
- [ ] Headings used in logical order
- [ ] Alternative text for images
- [ ] Page titles descriptive and unique
- [ ] Links have descriptive text
- [ ] Tables have proper headers

### Focus Management Requirements

| Action | Expected Behavior |
|--------|-------------------|
| Form submission error | Focus moves to first error field |
| Page navigation | Focus moves to main content or h1 |
| Modal open | Focus trapped within modal |
| Modal close | Focus returns to trigger element |
| Language toggle | Focus remains on toggle |

## Ontario Design System Component Mapping

| UI Element | ODS Component | CSS Class |
|------------|---------------|-----------|
| Primary button | ontario-button | `ontario-button--primary` |
| Secondary button | ontario-button | `ontario-button--secondary` |
| Form input | ontario-input | `ontario-input` |
| Form label | ontario-label | `ontario-label` |
| Form hint | ontario-hint | `ontario-hint` |
| Alert (info) | ontario-alert | `ontario-alert--informational` |
| Alert (success) | ontario-alert | `ontario-alert--success` |
| Alert (warning) | ontario-alert | `ontario-alert--warning` |
| Alert (error) | ontario-alert | `ontario-alert--error` |
| Header | ontario-header | `ontario-header` |
| Footer | ontario-footer | `ontario-footer` |
| Fieldset | ontario-fieldset | `ontario-fieldset` |
| Radio button | ontario-radios | `ontario-radios` |
| Checkbox | ontario-checkboxes | `ontario-checkboxes` |
| Select | ontario-dropdown | `ontario-dropdown` |
| Textarea | ontario-textarea | `ontario-textarea` |

### Required ODS Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="@ontario-digital-service/ontario-design-system">
</head>
<body>
    <header class="ontario-header">
        <!-- Ontario Header Component -->
    </header>
    
    <main id="main-content" class="ontario-main">
        <!-- Page Content -->
    </main>
    
    <footer class="ontario-footer">
        <!-- Ontario Footer Component -->
    </footer>
</body>
</html>
```

## Internationalization (i18n)

### Language Support

| Language | Code | Default |
|----------|------|---------|
| English | en | Yes |
| French | fr | No |

### Translation Key Structure

```typescript
interface TranslationKeys {
    common: {
        submit: string;
        cancel: string;
        save: string;
        loading: string;
    };
    form: {
        programName: string;
        programDescription: string;
        programType: string;
        validation: {
            required: string;
            maxLength: string;
        };
    };
    status: {
        draft: string;
        submitted: string;
        approved: string;
        rejected: string;
    };
}
```

### Language Toggle Behavior

* Toggle persists selected language in localStorage
* All content updates without page reload
* URL includes language parameter (e.g., `?lang=fr`)
* Default language detected from browser settings
