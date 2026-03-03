import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="ontario-footer ontario-footer--default">
      <div className="ontario-row">
        <div className="ontario-columns ontario-small-12">
          <ul className="ontario-footer__links-container ontario-footer__links-container--inline">
            <li>
              <a
                className="ontario-footer__link"
                href="https://www.ontario.ca/page/accessibility"
              >
                {t('footer.accessibility')}
              </a>
            </li>
            <li>
              <a
                className="ontario-footer__link"
                href="https://www.ontario.ca/page/privacy-statement"
              >
                {t('footer.privacy')}
              </a>
            </li>
            <li>
              <a
                className="ontario-footer__link"
                href="https://www.ontario.ca/feedback/contact-us"
              >
                {t('footer.contactUs')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="ontario-row">
        <div className="ontario-columns ontario-small-12">
          <p className="ontario-footer__copyright">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
