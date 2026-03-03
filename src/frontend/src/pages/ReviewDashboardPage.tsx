import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePrograms } from '../hooks';
import { Alert, LoadingSpinner, ProgramCard } from '../components';

export const ReviewDashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const {
    programs: pendingPrograms,
    isLoading,
    error,
  } = usePrograms({ status: 'SUBMITTED' });

  return (
    <div className="ontario-padding-top-24-!">
      <h1>{t('review.dashboard.title')}</h1>
      <p className="ontario-lead-statement">
        {t('review.dashboard.description')}
      </p>

      {/* Error display */}
      {error && (
        <Alert type="error" title={t('error.serverError')}>
          <p>{error.detail}</p>
        </Alert>
      )}

      {/* Loading state */}
      {isLoading && <LoadingSpinner />}

      {/* Pending Programs */}
      {!isLoading && !error && (
        <>
          <h2 className="ontario-h4 ontario-margin-top-24-!">
            {t('review.dashboard.pendingReview')} ({pendingPrograms.length})
          </h2>

          {pendingPrograms.length === 0 ? (
            <Alert type="informational">
              <p>{t('common.noResults')}</p>
            </Alert>
          ) : (
            <div className="ontario-row">
              {pendingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-margin-bottom-24-!"
                >
                  <ProgramCard program={program} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
