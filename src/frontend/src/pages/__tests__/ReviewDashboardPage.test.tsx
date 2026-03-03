import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReviewDashboardPage } from '../ReviewDashboardPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

vi.mock('../../hooks', () => ({
  usePrograms: vi.fn(),
  useProgram: vi.fn(),
  useProgramTypes: vi.fn(),
}));

import { usePrograms } from '../../hooks';
const mockUsePrograms = usePrograms as ReturnType<typeof vi.fn>;

describe('ReviewDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner while fetching', () => {
    mockUsePrograms.mockReturnValue({ programs: [], isLoading: true, error: null });
    render(<MemoryRouter><ReviewDashboardPage /></MemoryRouter>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows page title', () => {
    mockUsePrograms.mockReturnValue({ programs: [], isLoading: false, error: null });
    render(<MemoryRouter><ReviewDashboardPage /></MemoryRouter>);
    expect(screen.getByText('review.dashboard.title')).toBeInTheDocument();
  });

  it('shows no results message when programs is empty', () => {
    mockUsePrograms.mockReturnValue({ programs: [], isLoading: false, error: null });
    render(<MemoryRouter><ReviewDashboardPage /></MemoryRouter>);
    expect(screen.getByText('common.noResults')).toBeInTheDocument();
  });

  it('shows error alert when error occurs', () => {
    mockUsePrograms.mockReturnValue({ programs: [], isLoading: false, error: { detail: 'Server error' } });
    render(<MemoryRouter><ReviewDashboardPage /></MemoryRouter>);
    expect(screen.getByText('Server error')).toBeInTheDocument();
  });

  it('renders program cards when programs exist', () => {
    const programs = [
      { id: 1, programName: 'Program One', status: 'SUBMITTED' as const, programTypeId: 1, createdAt: '2026-01-01T00:00:00Z' },
    ];
    mockUsePrograms.mockReturnValue({ programs, isLoading: false, error: null });
    render(<MemoryRouter><ReviewDashboardPage /></MemoryRouter>);
    expect(screen.getByText('Program One')).toBeInTheDocument();
  });
});
