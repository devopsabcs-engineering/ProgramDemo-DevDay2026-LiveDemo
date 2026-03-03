import { render, screen } from '@testing-library/react';
import { Alert } from '../Alert';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('Alert', () => {
  it('renders children content', () => {
    render(
      <Alert type="informational">
        <p>Test message</p>
      </Alert>
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders optional title when provided', () => {
    render(
      <Alert type="success" title="Success Title">
        <p>Content</p>
      </Alert>
    );
    expect(screen.getByText('Success Title')).toBeInTheDocument();
  });

  it('does not render title when omitted', () => {
    render(
      <Alert type="warning">
        <p>Warning content</p>
      </Alert>
    );
    expect(screen.queryByText('Success Title')).not.toBeInTheDocument();
  });

  it('renders with error type and role="alert"', () => {
    render(
      <Alert type="error">
        <p>Error content</p>
      </Alert>
    );
    const el = screen.getByRole('alert');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('ontario-callout--error');
  });

  it('renders success type with correct class', () => {
    render(
      <Alert type="success">
        <p>Success</p>
      </Alert>
    );
    const el = screen.getByRole('status');
    expect(el).toHaveClass('ontario-callout--success');
  });

  it('renders warning type with correct class', () => {
    render(
      <Alert type="warning">
        <p>Warning</p>
      </Alert>
    );
    expect(screen.getByRole('status')).toHaveClass('ontario-callout--warning');
  });

  it('renders informational type with no modifier class', () => {
    render(
      <Alert type="informational">
        <p>Info</p>
      </Alert>
    );
    const el = screen.getByRole('status');
    expect(el).toHaveClass('ontario-callout');
    expect(el).not.toHaveClass('ontario-callout--error');
  });
});
