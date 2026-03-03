import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProgramStatus } from '../types/program';

interface StatusBadgeProps {
  status: ProgramStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getStatusClass = (status: ProgramStatus): string => {
    switch (status) {
      case 'DRAFT':
        return 'ontario-badge--draft';
      case 'SUBMITTED':
        return 'ontario-badge--submitted';
      case 'APPROVED':
        return 'ontario-badge--approved';
      case 'REJECTED':
        return 'ontario-badge--rejected';
      default:
        return 'ontario-badge--draft';
    }
  };

  return (
    <span className={`ontario-badge ${getStatusClass(status)}`}>
      {t(`program.status.${status}`)}
    </span>
  );
};
