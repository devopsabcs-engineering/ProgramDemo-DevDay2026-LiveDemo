import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="ontario-header ontario-header--application" id="ontario-header">
      <div className="ontario-row">
        <div className="ontario-columns ontario-small-6">
          <a href="#main-content" className="ontario-header__skip-link">
            {t('header.skipToMain')}
          </a>
          <a href="https://www.ontario.ca" className="ontario-header__logo-container">
            <svg
              className="ontario-header__logo ontario-header-logo--ontario"
              width="98"
              height="27"
              viewBox="0 0 98 27"
              aria-hidden="true"
              focusable="false"
            >
              <title>Ontario.ca</title>
              <path
                fill="currentColor"
                d="M4.1 25.1c-1.2 0-2.3-.4-3.1-1.3-.8-.9-1-2.1-1-3.3v-14c0-1.2.3-2.4 1-3.3.9-.9 2-1.3 3.1-1.3 1.2 0 2.2.4 3.1 1.3.8.9 1 2.1 1 3.3v14c0 1.2-.3 2.4-1 3.3-.9.9-2 1.3-3.1 1.3zm0-21.3c-.7 0-1.2.3-1.5.7-.4.5-.5 1.1-.5 1.9v14c0 .8.2 1.4.5 1.9.3.4.8.7 1.5.7s1.2-.3 1.5-.7c.4-.5.5-1.1.5-1.9v-14c0-.8-.2-1.4-.5-1.9-.3-.4-.8-.7-1.5-.7zm20.3 21.1V9l-5.6 15.9h-1.5L11.7 9v15.9H9.5V2h3.1l5.4 15.5L23.4 2h3.1v23h-2.1zm12.5 0V9h-5.3V7h2.3V4.9c0-1.1.3-2 .9-2.6.6-.6 1.6-.9 2.7-.9h2v2h-1.8c-.5 0-.9.1-1.1.4-.2.3-.4.7-.4 1.2v2h3.3v2h-3.3v16h-2.3v-.9h2.9zm13.7 0l-1.7-6h-6.2l-1.7 6h-2.3L45.1 2h2.5l6.4 23h-2.4zm-4.9-17.6l-2.5 9.3h5l-2.5-9.3zm15.2 17.6V9h-5.3V7h2.3V4.9c0-1.1.3-2 .9-2.6.6-.6 1.6-.9 2.7-.9h2v2h-1.8c-.5 0-.9.1-1.1.4-.2.3-.4.7-.4 1.2v2h3.3v2h-3.3v16h-2.3v-.9h2.9zm11.9.2c-1.5 0-2.7-.5-3.6-1.4-.9-1-1.3-2.3-1.3-4v-7.4c0-1.7.4-3 1.3-4 .9-1 2.1-1.4 3.6-1.4s2.7.5 3.6 1.4c.9 1 1.3 2.3 1.3 4v7.4c0 1.7-.4 3-1.3 4-.9.9-2.1 1.4-3.6 1.4zm0-2c.9 0 1.6-.3 2.1-.9.5-.6.7-1.4.7-2.5v-7.4c0-1-.2-1.9-.7-2.5s-1.2-.9-2.1-.9-1.6.3-2.1.9c-.5.6-.7 1.4-.7 2.5v7.4c0 1 .2 1.9.7 2.5s1.2.9 2.1.9z"
              />
            </svg>
          </a>
        </div>
        <div className="ontario-columns ontario-small-6 ontario-header__right-container">
          <LanguageToggle />
        </div>
      </div>
      <div className="ontario-row">
        <div className="ontario-columns ontario-small-12">
          <div className="ontario-application-header">
            <div className="ontario-application-header__logo">
              <Link to="/" className="ontario-application-header__title">
                {t('header.title')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="ontario-navigation" aria-label="Main navigation">
        <ul className="ontario-navigation__list">
          <li className={`ontario-navigation__item ${isActive('/') ? 'ontario-navigation__item--active' : ''}`}>
            <Link to="/" className="ontario-navigation__link">
              {t('nav.submitProgram')}
            </Link>
          </li>
          <li className={`ontario-navigation__item ${isActive('/search') ? 'ontario-navigation__item--active' : ''}`}>
            <Link to="/search" className="ontario-navigation__link">
              {t('nav.searchPrograms')}
            </Link>
          </li>
          <li className={`ontario-navigation__item ${isActive('/review') ? 'ontario-navigation__item--active' : ''}`}>
            <Link to="/review" className="ontario-navigation__link">
              {t('nav.reviewDashboard')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
