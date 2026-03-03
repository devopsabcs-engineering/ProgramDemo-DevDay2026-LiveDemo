-- ============================================================================
-- Migration: V005__create_indexes.sql
-- Description: Create indexes for query optimization
-- Author: CIVIC Demo Team
-- Date: 2026-03-03
-- ============================================================================

-- Improve filtering by status
CREATE INDEX IF NOT EXISTS idx_program_status ON program(status);

-- Improve filtering by program type
CREATE INDEX IF NOT EXISTS idx_program_type ON program(program_type_id);

-- Improve notification lookup by program
CREATE INDEX IF NOT EXISTS idx_notification_program ON notification(program_id);

-- Improve notification filtering by status
CREATE INDEX IF NOT EXISTS idx_notification_status ON notification(status);
