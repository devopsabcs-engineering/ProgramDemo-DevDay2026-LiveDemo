---
title: CIVIC Program Request Management System - Architecture
description: Architecture overview and C4 Container diagram for the CIVIC bilingual web application
author: DevOps ABCS Engineering
ms.date: 2026-03-03
ms.topic: reference
keywords:
  - architecture
  - c4-diagram
  - azure
  - civic
---

## Overview

The CIVIC Program Request Management System is a bilingual (English/French) web application designed for Ontario Public Sector program request management. Citizens submit program requests through a web portal, and Ministry Reviewers process these requests through a dedicated review dashboard.

## C4 Container Diagram

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

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend | React + TypeScript + Vite | 18.x, 5.x |
| Backend | Java + Spring Boot | 21, 3.x |
| Database | Azure SQL / H2 | - |
| Orchestration | Azure Durable Functions | - |
| Notifications | Azure Logic Apps | - |
| AI | Azure AI Foundry | - |

## Azure Resources

**Resource Group:** `rg-dev-125`

| Resource | Type | Purpose |
|----------|------|---------|
| App Service (Frontend) | Web App | Hosts React SPA |
| App Service (Backend) | Web App | Hosts Spring Boot API |
| Azure SQL Database | Database | Program and notification data storage |
| Function App | Azure Functions | Durable Functions for workflow orchestration |
| Logic App | Azure Logic Apps | Email notification workflows |
| AI Foundry Workspace | Azure AI | Intelligent processing capabilities |

## Data Flow

1. **Citizen Submission:** Citizens access the React frontend via HTTPS and submit program requests
2. **API Processing:** Frontend sends REST/JSON requests to the Spring Boot backend
3. **Data Persistence:** Backend stores program data in Azure SQL via JDBC
4. **Workflow Trigger:** Backend triggers Durable Functions for approval workflows
5. **Notifications:** Durable Functions invoke Logic Apps for email notifications
6. **AI Processing:** Backend leverages AI Foundry for intelligent request processing

## Compliance

| Standard | Requirement | Status |
|----------|-------------|--------|
| WCAG 2.2 | Level AA accessibility | Required |
| Ontario Design System | Government UI standards | Required |
| Bilingual Support | English/French | Required |

## Security Considerations

* HTTPS encryption for all communications
* Azure Active Directory integration for authentication
* Role-based access control (RBAC) for Ministry Reviewers
* Data encryption at rest and in transit
* Audit logging for all program state changes
