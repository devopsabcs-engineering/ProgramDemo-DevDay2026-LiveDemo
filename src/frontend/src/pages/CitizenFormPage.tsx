import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { CreateProgramRequest } from '../types/program';
import { createProgram } from '../services';
import { useProgramTypes } from '../hooks';
import { Alert, LoadingSpinner } from '../components';

interface FormData {
  programName: string;
  programDescription: string;
  programTypeId: string;
  createdBy: string;
}

export const CitizenFormPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { programTypes, isLoading: typesLoading } = useProgramTypes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const request: CreateProgramRequest = {
        programName: data.programName,
        programDescription: data.programDescription || undefined,
        programTypeId: parseInt(data.programTypeId, 10),
        createdBy: data.createdBy || undefined,
      };

      // Create program (backend auto-submits on create)
      const program = await createProgram(request);
      navigate(`/confirmation/${program.id}`);
    } catch {
      setSubmitError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="ontario-padding-top-24-!">
      <h1>{t('citizen.form.title')}</h1>
      <p className="ontario-lead-statement">{t('citizen.form.description')}</p>

      {submitError && (
        <Alert type="error" title={t('error.serverError')}>
          <p>{submitError}</p>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Program Name */}
        <div className="ontario-form-group">
          <label htmlFor="programName" className="ontario-label">
            {t('citizen.form.programName.label')}
            <span className="ontario-label__flag">({t('common.required')})</span>
          </label>
          <input
            id="programName"
            type="text"
            className={`ontario-input ${errors.programName ? 'ontario-input--error' : ''}`}
            placeholder={t('citizen.form.programName.placeholder')}
            aria-describedby={errors.programName ? 'programName-error' : undefined}
            aria-invalid={errors.programName ? 'true' : 'false'}
            {...register('programName', {
              required: t('citizen.form.programName.required'),
              maxLength: {
                value: 200,
                message: t('citizen.form.programName.maxLength'),
              },
            })}
          />
          {errors.programName && (
            <span
              id="programName-error"
              className="ontario-error-message"
              role="alert"
            >
              {errors.programName.message}
            </span>
          )}
        </div>

        {/* Program Type */}
        <div className="ontario-form-group">
          <label htmlFor="programTypeId" className="ontario-label">
            {t('citizen.form.programType.label')}
            <span className="ontario-label__flag">({t('common.required')})</span>
          </label>
          <select
            id="programTypeId"
            className={`ontario-input ontario-dropdown ${errors.programTypeId ? 'ontario-input--error' : ''}`}
            aria-describedby={errors.programTypeId ? 'programTypeId-error' : undefined}
            aria-invalid={errors.programTypeId ? 'true' : 'false'}
            {...register('programTypeId', {
              required: t('citizen.form.programType.required'),
            })}
          >
            <option value="">{t('citizen.form.programType.placeholder')}</option>
            {programTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {i18n.language === 'fr' ? type.typeNameFr : type.typeName}
              </option>
            ))}
          </select>
          {errors.programTypeId && (
            <span
              id="programTypeId-error"
              className="ontario-error-message"
              role="alert"
            >
              {errors.programTypeId.message}
            </span>
          )}
        </div>

        {/* Program Description */}
        <div className="ontario-form-group">
          <label htmlFor="programDescription" className="ontario-label">
            {t('citizen.form.programDescription.label')}
          </label>
          <span id="programDescription-hint" className="ontario-hint">
            {t('citizen.form.programDescription.hint')}
          </span>
          <textarea
            id="programDescription"
            className="ontario-input ontario-textarea"
            rows={5}
            placeholder={t('citizen.form.programDescription.placeholder')}
            aria-describedby="programDescription-hint"
            {...register('programDescription')}
          />
        </div>

        {/* Email */}
        <div className="ontario-form-group">
          <label htmlFor="createdBy" className="ontario-label">
            {t('citizen.form.createdBy.label')}
          </label>
          <span id="createdBy-hint" className="ontario-hint">
            {t('citizen.form.createdBy.hint')}
          </span>
          <input
            id="createdBy"
            type="email"
            className="ontario-input"
            placeholder={t('citizen.form.createdBy.placeholder')}
            aria-describedby="createdBy-hint"
            {...register('createdBy')}
          />
        </div>

        <button
          type="submit"
          className="ontario-button ontario-button--primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('common.submitting')
            : t('citizen.form.submit.label')}
        </button>
      </form>
    </div>
  );
};
