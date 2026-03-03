import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgram } from '../hooks';
import { reviewProgram } from '../services';
import type { ReviewProgramRequest } from '../types/program';
import { Alert, LoadingSpinner, StatusBadge } from '../components';

export const ReviewDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const programId = parseInt(id || '0', 10);

  const { program, isLoading, error, refetch } = useProgram(programId);
  const [reviewerComments, setReviewerComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleReview = async (status: 'APPROVED' | 'REJECTED') => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const request: ReviewProgramRequest = {
        status,
        reviewerComments: reviewerComments || undefined,
      };
      await reviewProgram(programId, request);
      refetch();
    } catch {
      setSubmitError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="ontario-padding-top-24-!">
        <Alert type="error" title={t('error.serverError')}>
          <p>{error.detail}</p>
        </Alert>
        <button
          className="ontario-button ontario-button--secondary ontario-margin-top-16-!"
          onClick={() => navigate('/review')}
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="ontario-padding-top-24-!">
        <Alert type="error" title={t('error.pageNotFound')}>
          <p>{t('error.pageNotFoundMessage')}</p>
        </Alert>
      </div>
    );
  }

  const canReview = program.status === 'SUBMITTED';

  return (
    <div className="ontario-padding-top-24-!">
      <button
        className="ontario-button ontario-button--tertiary ontario-margin-bottom-16-!"
        onClick={() => navigate('/review')}
      >
        &laquo; {t('common.back')}
      </button>

      <h1>{t('review.detail.title')}</h1>

      {submitError && (
        <Alert type="error" title={t('error.serverError')}>
          <p>{submitError}</p>
        </Alert>
      )}

      {/* Program Information */}
      <div className="ontario-callout ontario-margin-bottom-24-!">
        <h2 className="ontario-h4">{t('review.detail.programInfo')}</h2>
        <dl className="ontario-data-list">
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.id')}</dt>
            <dd>{program.id}</dd>
          </div>
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.name')}</dt>
            <dd>{program.programName}</dd>
          </div>
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.type')}</dt>
            <dd>{program.programTypeName || '-'}</dd>
          </div>
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.status')}</dt>
            <dd>
              <StatusBadge status={program.status} />
            </dd>
          </div>
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.description')}</dt>
            <dd>{program.programDescription || '-'}</dd>
          </div>
        </dl>
      </div>

      {/* Submission Details */}
      <div className="ontario-callout ontario-margin-bottom-24-!">
        <h2 className="ontario-h4">{t('review.detail.submissionDetails')}</h2>
        <dl className="ontario-data-list">
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.createdBy')}</dt>
            <dd>{program.createdBy || '-'}</dd>
          </div>
          <div className="ontario-data-list__item">
            <dt>{t('program.fields.submittedAt')}</dt>
            <dd>{formatDate(program.submittedAt)}</dd>
          </div>
          {program.reviewedAt && (
            <div className="ontario-data-list__item">
              <dt>{t('program.fields.reviewedAt')}</dt>
              <dd>{formatDate(program.reviewedAt)}</dd>
            </div>
          )}
          {program.reviewerComments && (
            <div className="ontario-data-list__item">
              <dt>{t('program.fields.reviewerComments')}</dt>
              <dd>{program.reviewerComments}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Review Actions */}
      {canReview && (
        <div className="ontario-callout ontario-margin-bottom-24-!">
          <h2 className="ontario-h4">{t('review.detail.reviewActions')}</h2>

          <div className="ontario-form-group">
            <label htmlFor="reviewerComments" className="ontario-label">
              {t('review.detail.comments.label')}
            </label>
            <span id="reviewerComments-hint" className="ontario-hint">
              {t('review.detail.comments.hint')}
            </span>
            <textarea
              id="reviewerComments"
              className="ontario-input ontario-textarea"
              rows={4}
              placeholder={t('review.detail.comments.placeholder')}
              aria-describedby="reviewerComments-hint"
              value={reviewerComments}
              onChange={(e) => setReviewerComments(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="ontario-button-group">
            <button
              type="button"
              className="ontario-button ontario-button--primary"
              onClick={() => handleReview('APPROVED')}
              disabled={isSubmitting}
            >
              {t('review.detail.approve')}
            </button>
            <button
              type="button"
              className="ontario-button ontario-button--secondary"
              onClick={() => handleReview('REJECTED')}
              disabled={isSubmitting}
            >
              {t('review.detail.reject')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
