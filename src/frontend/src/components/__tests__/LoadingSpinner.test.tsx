import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('LoadingSpinner', () => {
  it('renders with role="status"', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders screen-reader text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('common.loading')).toBeInTheDocument();
  });

  it('has aria-live="polite"', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
