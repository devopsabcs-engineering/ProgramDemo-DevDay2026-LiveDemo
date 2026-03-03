import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitizenFormPage } from '../CitizenFormPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

vi.mock('../../hooks', () => ({
  useProgramTypes: vi.fn(),
  usePrograms: vi.fn(),
  useProgram: vi.fn(),
  useFocusOnRouteChange: vi.fn(() => ({ current: null })),
}));

vi.mock('../../services', () => ({
  createProgram: vi.fn(),
}));

import { useProgramTypes } from '../../hooks';
const mockUseProgramTypes = useProgramTypes as ReturnType<typeof vi.fn>;

const programTypes = [
  { id: 1, typeName: 'Community Services', typeNameFr: 'Services communautaires' },
];

const renderPage = () =>
  render(<MemoryRouter><CitizenFormPage /></MemoryRouter>);

describe('CitizenFormPage', () => {
  beforeEach(() => {
    mockUseProgramTypes.mockReturnValue({ programTypes, isLoading: false, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders LoadingSpinner while program types are loading', () => {
    mockUseProgramTypes.mockReturnValue({ programTypes: [], isLoading: true, error: null });
    renderPage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the form title', () => {
    renderPage();
    expect(screen.getByText('citizen.form.title')).toBeInTheDocument();
  });

  it('renders the program name input', () => {
    renderPage();
    expect(screen.getByLabelText(/citizen.form.programName.label/)).toBeInTheDocument();
  });

  it('renders the program type select', () => {
    renderPage();
    expect(screen.getByLabelText(/citizen.form.programType.label/)).toBeInTheDocument();
  });

  it('renders program type options', () => {
    renderPage();
    expect(screen.getByText('Community Services')).toBeInTheDocument();
  });

  it('renders program description textarea', () => {
    renderPage();
    expect(screen.getByLabelText('citizen.form.programDescription.label')).toBeInTheDocument();
  });

  it('renders email input', () => {
    renderPage();
    expect(screen.getByLabelText('citizen.form.createdBy.label')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: 'citizen.form.submit.label' })).toBeInTheDocument();
  });

  it('renders form description text', () => {
    renderPage();
    expect(screen.getByText('citizen.form.description')).toBeInTheDocument();
  });
});
