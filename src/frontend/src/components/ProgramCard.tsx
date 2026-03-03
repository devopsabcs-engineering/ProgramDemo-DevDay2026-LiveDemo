import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Program } from '../types/program';
import { StatusBadge } from './StatusBadge';

interface ProgramCardProps {
  program: Program;
  showActions?: boolean;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  showActions = true,
}) => {
  const { t } = useTranslation();

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="ontario-card ontario-card--position-vertical">
      <div className="ontario-card__heading">
        <h3 className="ontario-h5">{program.programName}</h3>
      </div>
      <div className="ontario-card__content">
        <p className="ontario-margin-bottom-8-!">
          <strong>{t('program.fields.type')}:</strong>{' '}
          {program.programTypeName || '-'}
        </p>
        <p className="ontario-margin-bottom-8-!">
          <strong>{t('program.fields.status')}:</strong>{' '}
          <StatusBadge status={program.status} />
        </p>
        <p className="ontario-margin-bottom-8-!">
          <strong>{t('program.fields.submittedAt')}:</strong>{' '}
          {formatDate(program.submittedAt)}
        </p>
        {program.programDescription && (
          <p className="ontario-margin-bottom-16-!">
            {program.programDescription.length > 150
              ? `${program.programDescription.substring(0, 150)}...`
              : program.programDescription}
          </p>
        )}
      </div>
      {showActions && (
        <div className="ontario-card__actions">
          <Link
            to={`/review/${program.id}`}
            className="ontario-button ontario-button--secondary"
          >
            {t('common.view')}
          </Link>
        </div>
      )}
    </div>
  );
};
