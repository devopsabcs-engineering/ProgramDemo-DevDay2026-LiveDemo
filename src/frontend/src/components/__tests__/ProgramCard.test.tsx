import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgramCard } from '../ProgramCard';
import type { Program } from '../../types/program';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

const baseProgram: Program = {
  id: 1,
  programName: 'Youth Employment',
  programDescription: 'A program to help youth',
  programTypeId: 1,
  programTypeName: 'Community Services',
  status: 'SUBMITTED',
  createdAt: '2026-01-15T10:00:00Z',
  submittedAt: '2026-01-16T10:00:00Z',
};

const renderCard = (program: Program = baseProgram, showActions = true) =>
  render(
    <MemoryRouter>
      <ProgramCard program={program} showActions={showActions} />
    </MemoryRouter>
  );

describe('ProgramCard', () => {
  it('renders the program name', () => {
    renderCard();
    expect(screen.getByText('Youth Employment')).toBeInTheDocument();
  });

  it('renders the program type name', () => {
    renderCard();
    expect(screen.getByText('Community Services')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    renderCard();
    expect(screen.getByText('program.status.SUBMITTED')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderCard();
    expect(screen.getByText('A program to help youth')).toBeInTheDocument();
  });

  it('truncates long description to 150 characters', () => {
    const longDesc = 'A'.repeat(200);
    renderCard({ ...baseProgram, programDescription: longDesc });
    expect(screen.getByText(`${'A'.repeat(150)}...`)).toBeInTheDocument();
  });

  it('renders View link when showActions is true', () => {
    renderCard();
    expect(screen.getByText('common.view')).toBeInTheDocument();
  });

  it('does not render View link when showActions is false', () => {
    renderCard(baseProgram, false);
    expect(screen.queryByText('common.view')).not.toBeInTheDocument();
  });

  it('renders dash when submittedAt is not provided', () => {
    renderCard({ ...baseProgram, submittedAt: undefined });
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders dash when programTypeName is not provided', () => {
    renderCard({ ...baseProgram, programTypeName: undefined });
    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThan(0);
  });
});
