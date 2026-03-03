import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReviewDetailPage } from '../ReviewDetailPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

vi.mock('../../hooks', () => ({
  useProgram: vi.fn(),
  usePrograms: vi.fn(),
  useProgramTypes: vi.fn(),
  useFocusOnRouteChange: vi.fn(() => ({ current: null })),
}));

vi.mock('../../services', () => ({
  reviewProgram: vi.fn(),
}));

import { useProgram } from '../../hooks';
const mockUseProgram = useProgram as ReturnType<typeof vi.fn>;

const mockProgram = {
  id: 5,
  programName: 'Youth Employment Initiative',
  programDescription: 'A program for youth',
  programTypeId: 1,
  programTypeName: 'Community Services',
  status: 'SUBMITTED' as const,
  createdAt: '2026-01-01T00:00:00Z',
  createdBy: 'citizen@example.com',
  submittedAt: '2026-01-02T10:00:00Z',
};

const renderPage = (id = '5') =>
  render(
    <MemoryRouter initialEntries={[`/review/${id}`]}>
      <Routes>
        <Route path="/review/:id" element={<ReviewDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('ReviewDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner while isLoading=true', () => {
    mockUseProgram.mockReturnValue({ program: null, isLoading: true, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error alert when error occurs', () => {
    mockUseProgram.mockReturnValue({ program: null, isLoading: false, error: { detail: 'Not found' }, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('shows not found alert when program is null', () => {
    mockUseProgram.mockReturnValue({ program: null, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('error.pageNotFoundMessage')).toBeInTheDocument();
  });

  it('renders the program name when loaded', () => {
    mockUseProgram.mockReturnValue({ program: mockProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('Youth Employment Initiative')).toBeInTheDocument();
  });

  it('renders program type name', () => {
    mockUseProgram.mockReturnValue({ program: mockProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('Community Services')).toBeInTheDocument();
  });

  it('renders created by email', () => {
    mockUseProgram.mockReturnValue({ program: mockProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('citizen@example.com')).toBeInTheDocument();
  });

  it('renders approve and reject buttons for SUBMITTED program', () => {
    mockUseProgram.mockReturnValue({ program: mockProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('review.detail.approve')).toBeInTheDocument();
    expect(screen.getByText('review.detail.reject')).toBeInTheDocument();
  });

  it('does not render review actions for APPROVED program', () => {
    const approvedProgram = { ...mockProgram, status: 'APPROVED' as const };
    mockUseProgram.mockReturnValue({ program: approvedProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.queryByText('review.detail.approve')).not.toBeInTheDocument();
  });

  it('renders back button when error occurs', () => {
    mockUseProgram.mockReturnValue({ program: null, isLoading: false, error: { detail: 'Error' }, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('common.back')).toBeInTheDocument();
  });

  it('renders status badge for program', () => {
    mockUseProgram.mockReturnValue({ program: mockProgram, isLoading: false, error: null, refetch: vi.fn() });
    renderPage();
    expect(screen.getByText('program.status.SUBMITTED')).toBeInTheDocument();
  });
});
