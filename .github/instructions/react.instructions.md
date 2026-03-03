---
description: "React 18 and TypeScript coding standards with Ontario Design System and WCAG 2.2 compliance"
applyTo: "**/*.{ts,tsx}"
---

# React and TypeScript Coding Standards

These standards apply to all TypeScript and React code in the CIVIC demo project. Follow them when creating or modifying frontend files.

## Technology Stack

The project uses the following technologies:

* **React 18** with functional components and hooks
* **TypeScript 5.x** in strict mode
* **Vite** for build and dev server (port 3000)
* **i18next** for internationalization (English/French)
* **React Router** for client-side navigation
* **React Hook Form** for form state management
* **axios** for HTTP requests

## Project Structure

Organize frontend code into the following structure:

```text
src/
├── components/    # Reusable UI components
├── pages/         # Route-level components
├── hooks/         # Custom React hooks
├── services/      # API client functions
├── i18n/          # Translation files
│   └── locales/
│       ├── en.json
│       └── fr.json
└── types/         # TypeScript interfaces
```

Directory responsibilities:

* `components` - Reusable UI components (buttons, forms, modals)
* `pages` - Top-level route components
* `hooks` - Custom hooks for shared logic
* `services` - API integration functions
* `i18n` - Translation configuration and locale files
* `types` - Shared TypeScript interfaces and types

## Component Conventions

Use functional components with explicit Props interfaces.

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProgramCardProps {
  id: number;
  nameEn: string;
  nameFr: string;
  status: string;
  onSelect?: (id: number) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  nameEn,
  nameFr,
  status,
  onSelect,
}) => {
  const { t, i18n } = useTranslation();
  const displayName = i18n.language === 'fr' ? nameFr : nameEn;

  const handleClick = () => {
    onSelect?.(id);
  };

  return (
    <div className="ontario-card" onClick={handleClick}>
      <h3>{displayName}</h3>
      <p>{t('program.status.label')}: {status}</p>
    </div>
  );
};
```

Component rules:

* Use functional components only (no class components)
* Define explicit `Props` interface for each component
* Use `React.FC<Props>` type annotation
* Export named components (not default exports)
* TypeScript strict mode compliance required

## Form Handling

Use React Hook Form for form state and validation.

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ProgramFormData {
  nameEn: string;
  nameFr: string;
  programTypeId: number;
  description?: string;
}

interface ProgramFormProps {
  onSubmit: (data: ProgramFormData) => void;
  isLoading?: boolean;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="ontario-form-group">
        <label htmlFor="nameEn" className="ontario-label">
          {t('program.form.nameEn.label')}
          <span className="ontario-label__flag">
            ({t('common.required')})
          </span>
        </label>
        <input
          id="nameEn"
          type="text"
          className="ontario-input"
          aria-describedby={errors.nameEn ? 'nameEn-error' : undefined}
          aria-invalid={errors.nameEn ? 'true' : 'false'}
          {...register('nameEn', {
            required: t('program.form.nameEn.required'),
            maxLength: {
              value: 200,
              message: t('program.form.nameEn.maxLength'),
            },
          })}
        />
        {errors.nameEn && (
          <span id="nameEn-error" className="ontario-error-message" role="alert">
            {errors.nameEn.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="ontario-button ontario-button--primary"
        disabled={isLoading}
      >
        {isLoading ? t('common.submitting') : t('common.submit')}
      </button>
    </form>
  );
};
```

Form handling rules:

* Use React Hook Form for all forms
* Define typed form data interfaces
* Get error messages from i18n keys
* Associate labels with inputs using `htmlFor`/`id`
* Include accessible error messaging

## Bilingual Support (i18next)

Use the i18next key pattern for all user-facing text.

Key pattern: `{feature}.{element}.{property}`

Examples:

* `citizen.form.programName.label`
* `citizen.form.programName.placeholder`
* `citizen.form.programName.required`
* `program.list.title`
* `common.submit`
* `common.cancel`

Translation file structure (`src/i18n/locales/en.json`):

```json
{
  "citizen": {
    "form": {
      "programName": {
        "label": "Program Name",
        "placeholder": "Enter the program name",
        "required": "Program name is required"
      },
      "submit": {
        "label": "Submit Application"
      }
    }
  },
  "program": {
    "list": {
      "title": "Available Programs",
      "empty": "No programs available"
    },
    "status": {
      "label": "Status",
      "active": "Active",
      "inactive": "Inactive"
    }
  },
  "common": {
    "submit": "Submit",
    "cancel": "Cancel",
    "required": "required",
    "loading": "Loading...",
    "error": "An error occurred"
  }
}
```

Usage in components:

```tsx
import { useTranslation } from 'react-i18next';

export const ProgramList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('program.list.title')}</h1>
      {/* component content */}
    </div>
  );
};
```

i18n rules:

* Never hardcode user-facing strings
* Use `useTranslation()` hook in components
* Follow key pattern: `{feature}.{element}.{property}`
* Keep translation files in `src/i18n/locales/{en,fr}.json`

## Ontario Design System

Import and use Ontario Design System components and styles.

CSS import (in `main.tsx` or `App.tsx`):

```tsx
import '@ontario-digital-service/ontario-design-system/dist/styles/ontario-theme.min.css';
```

Using ODS web components:

```tsx
import React from 'react';

export const Header: React.FC = () => {
  return (
    <ontario-header
      type="application"
      application-header-info='{"title": "CIVIC Demo", "href": "/"}'
      language-toggle-options='{"englishLink": "/en", "frenchLink": "/fr"}'
    />
  );
};
```

Using ODS CSS classes:

```tsx
export const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="ontario-button ontario-button--primary"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
```

Common ODS classes:

* `ontario-button`, `ontario-button--primary`, `ontario-button--secondary`
* `ontario-input`, `ontario-textarea`, `ontario-select`
* `ontario-label`, `ontario-hint`
* `ontario-form-group`
* `ontario-error-message`
* `ontario-card`

Reference: <https://designsystem.ontario.ca/>

## Accessibility (WCAG 2.2)

Ensure all components meet WCAG 2.2 Level AA requirements.

Form input accessibility:

```tsx
<div className="ontario-form-group">
  <label htmlFor="email" className="ontario-label">
    {t('form.email.label')}
  </label>
  <span id="email-hint" className="ontario-hint">
    {t('form.email.hint')}
  </span>
  <input
    id="email"
    type="email"
    className="ontario-input"
    aria-describedby="email-hint email-error"
    aria-invalid={hasError ? 'true' : 'false'}
  />
  {hasError && (
    <span id="email-error" className="ontario-error-message" role="alert">
      {errorMessage}
    </span>
  )}
</div>
```

Dynamic content accessibility:

```tsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage && <p>{statusMessage}</p>}
</div>
```

Focus management on route changes:

```tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useFocusOnRouteChange = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname]);

  return mainRef;
};
```

Accessibility requirements:

* All form inputs have associated `<label>` elements
* Use `aria-describedby` for hints and error messages
* Use `aria-live` regions for dynamic status updates
* Manage focus on route changes
* Support full keyboard navigation
* Color contrast meets Level AA (4.5:1 for text)
* Include skip links for main content

## API Integration

Use axios with typed responses for API calls.

Service function example (`src/services/programService.ts`):

```tsx
import axios from 'axios';
import { Program, CreateProgramRequest, ProgramResponse } from '../types/program';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPrograms = async (): Promise<Program[]> => {
  const response = await apiClient.get<Program[]>('/programs');
  return response.data;
};

export const getProgram = async (id: number): Promise<Program> => {
  const response = await apiClient.get<Program>(`/programs/${id}`);
  return response.data;
};

export const createProgram = async (
  data: CreateProgramRequest
): Promise<ProgramResponse> => {
  const response = await apiClient.post<ProgramResponse>('/programs', data);
  return response.data;
};
```

Custom hook for API calls (`src/hooks/usePrograms.ts`):

```tsx
import { useState, useEffect } from 'react';
import { Program } from '../types/program';
import { getPrograms } from '../services/programService';

interface UseProgramsResult {
  programs: Program[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const usePrograms = (): UseProgramsResult => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPrograms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { programs, isLoading, error, refetch: fetchPrograms };
};
```

API integration rules:

* Use axios with typed generic responses
* Create service functions in `src/services/`
* Handle loading, error, and success states
* Use custom hooks for reusable data fetching
* Define types in `src/types/`

## Testing Conventions

Use Vitest and React Testing Library with accessibility testing.

Component test example:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { ProgramCard } from './ProgramCard';

expect.extend(toHaveNoViolations);

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

describe('ProgramCard', () => {
  const defaultProps = {
    id: 1,
    nameEn: 'Test Program',
    nameFr: 'Programme de test',
    status: 'active',
  };

  it('renders program name in English when language is en', () => {
    render(<ProgramCard {...defaultProps} />);
    expect(screen.getByText('Test Program')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ProgramCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Test Program'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgramCard {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

Testing rules:

* Use Vitest as the test runner
* Use React Testing Library for component tests
* Use vitest-axe for accessibility testing
* Co-locate test files with components (`*.test.tsx`)
* Target 75% code coverage
* Test user interactions, not implementation details
