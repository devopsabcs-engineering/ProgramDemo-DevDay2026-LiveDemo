import React from 'react';

type AlertType = 'informational' | 'success' | 'warning' | 'error';

interface AlertProps {
  type: AlertType;
  title?: string;
  children: React.ReactNode;
}

const typeToModifier: Record<AlertType, string> = {
  informational: '',
  success: 'ontario-callout--success',
  warning: 'ontario-callout--warning',
  error: 'ontario-callout--error',
};

export const Alert: React.FC<AlertProps> = ({ type, title, children }) => {
  return (
    <div
      className={`ontario-callout ${typeToModifier[type]}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      {title && (
        <p className="ontario-callout__title">{title}</p>
      )}
      {children}
    </div>
  );
};
