-- ============================================================================
-- Migration: V004__seed_program_types.sql
-- Description: Seed program_type with bilingual reference data
-- Author: CIVIC Demo Team
-- Date: 2026-03-03
-- ============================================================================

-- Community Services / Services communautaires
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Community Services', 'Services communautaires'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Community Services');

-- Health & Wellness / Santé et bien-être
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Health & Wellness', 'Santé et bien-être'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Health & Wellness');

-- Education & Training / Éducation et formation
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Education & Training', 'Éducation et formation'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Education & Training');

-- Environment & Conservation / Environnement et conservation
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Environment & Conservation', 'Environnement et conservation'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Environment & Conservation');

-- Economic Development / Développement économique
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Economic Development', 'Développement économique'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Economic Development');
