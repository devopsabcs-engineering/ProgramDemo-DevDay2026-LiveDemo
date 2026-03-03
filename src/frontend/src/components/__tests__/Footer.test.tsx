import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders accessibility link', () => {
    render(<Footer />);
    expect(screen.getByText('footer.accessibility')).toBeInTheDocument();
  });

  it('renders privacy link', () => {
    render(<Footer />);
    expect(screen.getByText('footer.privacy')).toBeInTheDocument();
  });

  it('renders contact us link', () => {
    render(<Footer />);
    expect(screen.getByText('footer.contactUs')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('footer.copyright')).toBeInTheDocument();
  });
});
