import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('StatusBadge', () => {
  it('renders DRAFT status with correct class', () => {
    render(<StatusBadge status="DRAFT" />);
    const badge = screen.getByText('program.status.DRAFT');
    expect(badge).toHaveClass('ontario-badge--draft');
  });

  it('renders SUBMITTED status with correct class', () => {
    render(<StatusBadge status="SUBMITTED" />);
    const badge = screen.getByText('program.status.SUBMITTED');
    expect(badge).toHaveClass('ontario-badge--submitted');
  });

  it('renders APPROVED status with correct class', () => {
    render(<StatusBadge status="APPROVED" />);
    const badge = screen.getByText('program.status.APPROVED');
    expect(badge).toHaveClass('ontario-badge--approved');
  });

  it('renders REJECTED status with correct class', () => {
    render(<StatusBadge status="REJECTED" />);
    const badge = screen.getByText('program.status.REJECTED');
    expect(badge).toHaveClass('ontario-badge--rejected');
  });
});
