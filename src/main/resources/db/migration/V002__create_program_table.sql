-- ============================================================================
-- Migration: V002__create_program_table.sql
-- Description: Create program table for storing program request submissions
-- Author: CIVIC Demo Team
-- Date: 2026-03-03
-- ============================================================================

CREATE TABLE IF NOT EXISTS program (
    id INT IDENTITY(1,1) PRIMARY KEY,
    program_name NVARCHAR(200) NOT NULL,
    program_description NVARCHAR(MAX),
    program_type_id INT,
    status NVARCHAR(20) DEFAULT 'DRAFT',
    reviewer_comments NVARCHAR(MAX),
    submitted_at DATETIME2,
    reviewed_at DATETIME2,
    created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME2,
    created_by NVARCHAR(100),
    CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) REFERENCES program_type(id)
);
