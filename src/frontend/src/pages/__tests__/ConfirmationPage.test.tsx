import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfirmationPage } from '../ConfirmationPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

const renderPage = (id = '42') =>
  render(
    <MemoryRouter initialEntries={[`/confirmation/${id}`]}>
      <Routes>
        <Route path="/confirmation/:id" element={<ConfirmationPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('ConfirmationPage', () => {
  it('renders success alert with title', () => {
    renderPage();
    expect(screen.getByText('confirmation.title')).toBeInTheDocument();
  });

  it('renders the confirmation message', () => {
    renderPage();
    expect(screen.getByText('confirmation.message')).toBeInTheDocument();
  });

  it('renders the reference number id', () => {
    renderPage('42');
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders what next section', () => {
    renderPage();
    expect(screen.getByText('confirmation.whatNext')).toBeInTheDocument();
    expect(screen.getByText('confirmation.nextSteps')).toBeInTheDocument();
  });

  it('renders submit another link', () => {
    renderPage();
    expect(screen.getByText('confirmation.submitAnother')).toBeInTheDocument();
  });

  it('renders view status link', () => {
    renderPage();
    expect(screen.getByText('confirmation.viewStatus')).toBeInTheDocument();
  });
});
