---
description: "Azure SQL and Flyway migration standards for the CIVIC demo"
applyTo: "**/*.sql"
---

# SQL and Database Migration Standards

These standards apply to all SQL files in the CIVIC demo project, including Flyway migrations, seed data scripts, and ad-hoc queries.

## Target Database

The project uses different databases by environment:

* **Production**: Azure SQL Database
* **Local Development**: H2 with `MODE=MSSQLServer` for compatibility

Schema: `dbo` (default schema for Azure SQL)

Write SQL that works on both Azure SQL and H2 in MSSQLServer mode. When platform-specific syntax is required, document the compatibility considerations.

## Migration Naming

Use Flyway versioned migration naming conventions.

Pattern: `V{NNN}__{description}.sql`

Examples:

```text
V001__create_program_type_table.sql
V002__create_program_table.sql
V003__create_notification_table.sql
V004__seed_program_types.sql
V005__add_status_column_to_program.sql
```

Naming rules:

* Version prefix: `V` followed by a three-digit number (`001`, `002`, etc.)
* Double underscore (`__`) between version and description (required by Flyway)
* Description uses `snake_case`
* Keep descriptions concise but descriptive
* Migrations execute in version order

Migration location: `src/main/resources/db/migration/`

## Column Types

Use Azure SQL-compatible column types that work with H2 in MSSQLServer mode.

| Purpose | Column Type | Example |
|---------|-------------|---------|
| Primary key | `INT IDENTITY(1,1) PRIMARY KEY` | `id INT IDENTITY(1,1) PRIMARY KEY` |
| Bilingual short text | `NVARCHAR(n)` | `name_en NVARCHAR(200) NOT NULL` |
| Bilingual long text | `NVARCHAR(MAX)` | `description_en NVARCHAR(MAX)` |
| Timestamps | `DATETIME2` | `created_at DATETIME2 NOT NULL` |
| Status fields | `NVARCHAR(20)` | `status NVARCHAR(20) DEFAULT 'ACTIVE'` |
| Foreign keys | `INT` | `program_type_id INT NOT NULL` |
| Boolean flags | `BIT` | `is_active BIT DEFAULT 1` |
| Email/URL | `NVARCHAR(255)` | `email NVARCHAR(255)` |

Column type rules:

* Use `NVARCHAR` (not `VARCHAR`) for Unicode support (French characters)
* Use `DATETIME2` (not `DATETIME`) for better precision
* Use `IDENTITY(1,1)` for auto-increment primary keys
* Include `NOT NULL` for required columns
* Provide `DEFAULT` values where appropriate

## Table Guards (Idempotent)

Use idempotent patterns for table creation.

Azure SQL pattern:

```sql
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'program_type')
BEGIN
    CREATE TABLE program_type (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name_en NVARCHAR(100) NOT NULL,
        name_fr NVARCHAR(100) NOT NULL,
        description_en NVARCHAR(MAX),
        description_fr NVARCHAR(MAX),
        created_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
```

H2-compatible pattern (for local development):

```sql
CREATE TABLE IF NOT EXISTS program_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name_en NVARCHAR(100) NOT NULL,
    name_fr NVARCHAR(100) NOT NULL,
    description_en NVARCHAR(MAX),
    description_fr NVARCHAR(MAX),
    created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Compatibility notes:

* Flyway migrations run once per version, so guards are optional for new tables
* Use guards when modifying existing tables or for re-runnable scripts
* Azure SQL uses `sys.tables`; H2 uses `CREATE TABLE IF NOT EXISTS`
* For maximum compatibility, use H2-compatible syntax in migrations

## Seed Data Pattern

Use portable INSERT patterns that work on both Azure SQL and H2.

Recommended pattern (portable):

```sql
INSERT INTO program_type (name_en, name_fr, description_en, description_fr)
SELECT 'Health Services', 'Services de santé', 'Programs related to health care services', 'Programmes liés aux services de soins de santé'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE name_en = 'Health Services');

INSERT INTO program_type (name_en, name_fr, description_en, description_fr)
SELECT 'Education', 'Éducation', 'Programs related to education and training', 'Programmes liés à l''éducation et à la formation'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE name_en = 'Education');

INSERT INTO program_type (name_en, name_fr, description_en, description_fr)
SELECT 'Social Services', 'Services sociaux', 'Programs related to social support', 'Programmes liés au soutien social'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE name_en = 'Social Services');
```

Seed data rules:

* Use `INSERT ... SELECT ... WHERE NOT EXISTS` for idempotent inserts
* Check for existing records using a unique business key (not ID)
* Escape single quotes in French text by doubling them (`l''éducation`)
* Group related seed data in a single migration file
* Name seed data migrations clearly: `V004__seed_program_types.sql`

## Foreign Keys

Use named constraints with consistent naming conventions.

Pattern: `FK_{child_table}_{parent_table}`

Complete table example with foreign key:

```sql
CREATE TABLE IF NOT EXISTS program (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name_en NVARCHAR(200) NOT NULL,
    name_fr NVARCHAR(200) NOT NULL,
    description_en NVARCHAR(MAX),
    description_fr NVARCHAR(MAX),
    program_type_id INT NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME2,
    CONSTRAINT FK_program_program_type
        FOREIGN KEY (program_type_id)
        REFERENCES program_type(id)
);
```

Adding foreign key to existing table:

```sql
ALTER TABLE program
ADD CONSTRAINT FK_program_program_type
    FOREIGN KEY (program_type_id)
    REFERENCES program_type(id);
```

Foreign key naming examples:

* `FK_program_program_type` - program references program_type
* `FK_notification_program` - notification references program
* `FK_submission_citizen` - submission references citizen

Foreign key rules:

* Always name constraints explicitly (do not rely on auto-generated names)
* Use `FK_` prefix followed by child table and parent table names
* Create foreign keys after both tables exist
* Consider ON DELETE behavior (default is NO ACTION)

## Index Naming

Use consistent naming for indexes.

Pattern: `IX_{table}_{column(s)}`

Examples:

```sql
-- Single column index
CREATE INDEX IX_program_status ON program(status);

-- Composite index
CREATE INDEX IX_program_type_status ON program(program_type_id, status);

-- Unique index
CREATE UNIQUE INDEX UX_program_type_name_en ON program_type(name_en);
```

Index naming rules:

* Use `IX_` prefix for non-unique indexes
* Use `UX_` prefix for unique indexes
* Include table name and indexed column(s)
* Order columns in composite indexes by selectivity
