import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="ontario-loading-spinner" role="status" aria-live="polite">
      <span className="ontario-show-for-sr">{t('common.loading')}</span>
    </div>
  );
};
