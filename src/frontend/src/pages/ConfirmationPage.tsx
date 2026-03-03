import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from '../components';

export const ConfirmationPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="ontario-padding-top-24-!">
      <Alert type="success" title={t('confirmation.title')}>
        <p>{t('confirmation.message')}</p>
        <p>
          <strong>{t('confirmation.referenceNumber')}:</strong> {id}
        </p>
      </Alert>

      <div className="ontario-padding-top-24-!">
        <h2 className="ontario-h4">{t('confirmation.whatNext')}</h2>
        <p>{t('confirmation.nextSteps')}</p>
      </div>

      <div className="ontario-button-group ontario-padding-top-24-!">
        <Link to="/" className="ontario-button ontario-button--primary">
          {t('confirmation.submitAnother')}
        </Link>
        <Link
          to={`/review/${id}`}
          className="ontario-button ontario-button--secondary"
        >
          {t('confirmation.viewStatus')}
        </Link>
      </div>
    </div>
  );
};
