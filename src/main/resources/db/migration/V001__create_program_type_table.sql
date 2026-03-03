-- ============================================================================
-- Migration: V001__create_program_type_table.sql
-- Description: Create program_type reference table for bilingual program categories
-- Author: CIVIC Demo Team
-- Date: 2026-03-03
-- ============================================================================

CREATE TABLE IF NOT EXISTS program_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    type_name_fr NVARCHAR(100) NOT NULL
);
