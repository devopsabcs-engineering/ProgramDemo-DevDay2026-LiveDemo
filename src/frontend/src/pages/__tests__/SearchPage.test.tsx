import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../SearchPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

vi.mock('../../hooks', () => ({
  usePrograms: vi.fn(),
  useProgramTypes: vi.fn(),
  useProgram: vi.fn(),
  useFocusOnRouteChange: vi.fn(() => ({ current: null })),
}));

import { usePrograms, useProgramTypes } from '../../hooks';
const mockUsePrograms = usePrograms as ReturnType<typeof vi.fn>;
const mockUseProgramTypes = useProgramTypes as ReturnType<typeof vi.fn>;

const baseUsePrograms = {
  programs: [],
  totalElements: 0,
  totalPages: 0,
  page: 0,
  isLoading: false,
  error: null,
  setPage: vi.fn(),
  setFilters: vi.fn(),
};

const programTypes = [
  { id: 1, typeName: 'Community Services', typeNameFr: 'Services communautaires' },
  { id: 2, typeName: 'Health & Wellness', typeNameFr: 'Santé et bien-être' },
];

const renderPage = () =>
  render(<MemoryRouter><SearchPage /></MemoryRouter>);

describe('SearchPage', () => {
  beforeEach(() => {
    mockUseProgramTypes.mockReturnValue({ programTypes, isLoading: false, error: null });
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title', () => {
    renderPage();
    expect(screen.getByText('search.title')).toBeInTheDocument();
  });

  it('renders status filter select', () => {
    renderPage();
    expect(screen.getByLabelText('search.filters.status')).toBeInTheDocument();
  });

  it('renders program type filter select', () => {
    renderPage();
    expect(screen.getByLabelText('search.filters.programType')).toBeInTheDocument();
  });

  it('renders program type options from hook', () => {
    renderPage();
    expect(screen.getByText('Community Services')).toBeInTheDocument();
    expect(screen.getByText('Health & Wellness')).toBeInTheDocument();
  });

  it('renders clear button', () => {
    renderPage();
    expect(screen.getByText('common.clear')).toBeInTheDocument();
  });

  it('shows loading spinner while loading', () => {
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, isLoading: true });
    renderPage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error alert when fetch fails', () => {
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, error: { detail: 'Server failure' } });
    renderPage();
    expect(screen.getByText('Server failure')).toBeInTheDocument();
  });

  it('shows no results message when programs is empty', () => {
    renderPage();
    expect(screen.getByText('search.results.empty')).toBeInTheDocument();
  });

  it('renders programs list when programs exist', () => {
    const programs = [
      { id: 1, programName: 'Youth Initiative', status: 'SUBMITTED' as const, programTypeId: 1, createdAt: '2026-01-01T00:00:00Z' },
    ];
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, programs, totalElements: 1 });
    renderPage();
    expect(screen.getByText('Youth Initiative')).toBeInTheDocument();
  });

  it('calls setFilters when status changes', () => {
    const setFilters = vi.fn();
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, setFilters });
    renderPage();
    fireEvent.change(screen.getByLabelText('search.filters.status'), { target: { value: 'APPROVED' } });
    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({ status: 'APPROVED' }));
  });

  it('calls setFilters when type changes', () => {
    const setFilters = vi.fn();
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, setFilters });
    renderPage();
    fireEvent.change(screen.getByLabelText('search.filters.programType'), { target: { value: '1' } });
    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({ programTypeId: 1 }));
  });

  it('calls setFilters with undefined when clear is clicked', () => {
    const setFilters = vi.fn();
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, setFilters });
    renderPage();
    fireEvent.click(screen.getByText('common.clear'));
    expect(setFilters).toHaveBeenCalledWith({ status: undefined, programTypeId: undefined });
  });

  it('shows pagination when totalPages > 1', () => {
    const programs = [
      { id: 1, programName: 'P1', status: 'SUBMITTED' as const, programTypeId: 1, createdAt: '2026-01-01T00:00:00Z' },
    ];
    mockUsePrograms.mockReturnValue({ ...baseUsePrograms, programs, totalPages: 3, totalElements: 60 });
    renderPage();
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });
});
