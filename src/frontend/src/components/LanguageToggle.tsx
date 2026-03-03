import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      type="button"
      className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
      onClick={toggleLanguage}
      aria-label={
        i18n.language === 'en'
          ? t('language.french')
          : t('language.english')
      }
    >
      <abbr title={i18n.language === 'en' ? 'Français' : 'English'} className="ontario-show-for-small-only">
        {i18n.language === 'en' ? 'FR' : 'EN'}
      </abbr>
      <span className="ontario-show-for-medium">
        {t('language.toggle')}
      </span>
    </button>
  );
};
