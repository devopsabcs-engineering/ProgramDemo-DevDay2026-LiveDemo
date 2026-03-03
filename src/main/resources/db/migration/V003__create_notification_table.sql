-- ============================================================================
-- Migration: V003__create_notification_table.sql
-- Description: Create notification table for tracking email notifications
-- Author: CIVIC Demo Team
-- Date: 2026-03-03
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification (
    id INT IDENTITY(1,1) PRIMARY KEY,
    program_id INT,
    notification_type NVARCHAR(50),
    recipient_email NVARCHAR(200),
    subject NVARCHAR(500),
    body NVARCHAR(MAX),
    sent_at DATETIME2,
    created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    status NVARCHAR(20),
    CONSTRAINT FK_notification_program FOREIGN KEY (program_id) REFERENCES program(id)
);
