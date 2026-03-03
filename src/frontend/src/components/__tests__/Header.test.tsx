import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>
  );

describe('Header', () => {
  it('renders the header element', () => {
    renderWithRouter();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders skip to main content link', () => {
    renderWithRouter();
    expect(screen.getByText('header.skipToMain')).toBeInTheDocument();
  });

  it('renders application title', () => {
    renderWithRouter();
    expect(screen.getByText('header.title')).toBeInTheDocument();
  });

  it('renders submit program nav link', () => {
    renderWithRouter();
    expect(screen.getByText('nav.submitProgram')).toBeInTheDocument();
  });

  it('renders search programs nav link', () => {
    renderWithRouter();
    expect(screen.getByText('nav.searchPrograms')).toBeInTheDocument();
  });

  it('renders review dashboard nav link', () => {
    renderWithRouter();
    expect(screen.getByText('nav.reviewDashboard')).toBeInTheDocument();
  });

  it('marks home nav item as active when on / path', () => {
    renderWithRouter('/');
    const nav = screen.getByRole('navigation');
    const items = nav.querySelectorAll('.ontario-navigation__item');
    expect(items[0]).toHaveClass('ontario-navigation__item--active');
    expect(items[1]).not.toHaveClass('ontario-navigation__item--active');
  });

  it('marks search nav item as active when on /search path', () => {
    renderWithRouter('/search');
    const nav = screen.getByRole('navigation');
    const items = nav.querySelectorAll('.ontario-navigation__item');
    expect(items[1]).toHaveClass('ontario-navigation__item--active');
  });

  it('renders language toggle button', () => {
    renderWithRouter();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
