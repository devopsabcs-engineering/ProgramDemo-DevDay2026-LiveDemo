import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '../LanguageToggle';

const mockChangeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LanguageToggle', () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
    localStorageMock.clear();
  });

  it('renders the toggle button', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows FR abbreviation when language is en', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('FR')).toBeInTheDocument();
  });

  it('shows toggle text from translation key', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('language.toggle')).toBeInTheDocument();
  });

  it('calls changeLanguage with "fr" when language is "en"', () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
  });

  it('stores new language in localStorage on click', () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorageMock.getItem('i18nextLng')).toBe('fr');
  });
});
