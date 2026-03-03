import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrograms, useProgramTypes } from '../hooks';
import type { ProgramStatus } from '../types/program';
import { Alert, LoadingSpinner, ProgramCard } from '../components';

export const SearchPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { programTypes } = useProgramTypes();
  const [statusFilter, setStatusFilter] = useState<ProgramStatus | undefined>();
  const [typeFilter, setTypeFilter] = useState<number | undefined>();

  const {
    programs,
    totalElements,
    totalPages,
    page,
    isLoading,
    error,
    setPage,
    setFilters,
  } = usePrograms({ status: statusFilter, programTypeId: typeFilter });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProgramStatus | '';
    const newStatus = value === '' ? undefined : value;
    setStatusFilter(newStatus);
    setFilters({ status: newStatus, programTypeId: typeFilter });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newType = value === '' ? undefined : parseInt(value, 10);
    setTypeFilter(newType);
    setFilters({ status: statusFilter, programTypeId: newType });
  };

  const handleClear = () => {
    setStatusFilter(undefined);
    setTypeFilter(undefined);
    setFilters({ status: undefined, programTypeId: undefined });
  };

  return (
    <div className="ontario-padding-top-24-!">
      <h1>{t('search.title')}</h1>

      {/* Filters */}
      <div className="ontario-row ontario-margin-bottom-24-!">
        <div className="ontario-columns ontario-small-12 ontario-medium-4">
          <div className="ontario-form-group">
            <label htmlFor="statusFilter" className="ontario-label">
              {t('search.filters.status')}
            </label>
            <select
              id="statusFilter"
              className="ontario-input ontario-dropdown"
              value={statusFilter || ''}
              onChange={handleStatusChange}
            >
              <option value="">{t('search.filters.allStatuses')}</option>
              <option value="DRAFT">{t('program.status.DRAFT')}</option>
              <option value="SUBMITTED">{t('program.status.SUBMITTED')}</option>
              <option value="APPROVED">{t('program.status.APPROVED')}</option>
              <option value="REJECTED">{t('program.status.REJECTED')}</option>
            </select>
          </div>
        </div>
        <div className="ontario-columns ontario-small-12 ontario-medium-4">
          <div className="ontario-form-group">
            <label htmlFor="typeFilter" className="ontario-label">
              {t('search.filters.programType')}
            </label>
            <select
              id="typeFilter"
              className="ontario-input ontario-dropdown"
              value={typeFilter || ''}
              onChange={handleTypeChange}
            >
              <option value="">{t('search.filters.allTypes')}</option>
              {programTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {i18n.language === 'fr' ? type.typeNameFr : type.typeName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="ontario-columns ontario-small-12 ontario-medium-4">
          <div className="ontario-form-group">
            <label className="ontario-label ontario-show-for-sr">
              {t('common.actions')}
            </label>
            <button
              type="button"
              className="ontario-button ontario-button--secondary ontario-margin-top-24-!"
              onClick={handleClear}
            >
              {t('common.clear')}
            </button>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <Alert type="error" title={t('error.serverError')}>
          <p>{error.detail}</p>
        </Alert>
      )}

      {/* Loading state */}
      {isLoading && <LoadingSpinner />}

      {/* Results */}
      {!isLoading && !error && (
        <>
          {programs.length === 0 ? (
            <Alert type="informational">
              <p>{t('search.results.empty')}</p>
            </Alert>
          ) : (
            <>
              <p className="ontario-margin-bottom-16-!">
                {t('search.results.showing', {
                  from: page * 20 + 1,
                  to: Math.min((page + 1) * 20, totalElements),
                  total: totalElements,
                })}
              </p>

              <div className="ontario-row">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-margin-bottom-24-!"
                  >
                    <ProgramCard program={program} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Pagination">
                  <ul className="ontario-pagination">
                    <li>
                      <button
                        className="ontario-pagination__link"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        aria-label={t('accessibility.pagination.previous')}
                      >
                        &laquo; {t('common.back')}
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i}>
                        <button
                          className={`ontario-pagination__link ${page === i ? 'ontario-pagination__link--active' : ''}`}
                          onClick={() => setPage(i)}
                          aria-label={t('accessibility.pagination.page', {
                            number: i + 1,
                          })}
                          aria-current={page === i ? 'page' : undefined}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className="ontario-pagination__link"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        aria-label={t('accessibility.pagination.next')}
                      >
                        {t('common.next')} &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
