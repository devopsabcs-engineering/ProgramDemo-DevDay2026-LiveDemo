import { renderHook, act, waitFor } from '@testing-library/react';
import { usePrograms, useProgram } from '../usePrograms';
import * as programService from '../../services/programService';

vi.mock('../../services/programService', () => ({
  getPrograms: vi.fn(),
  getProgram: vi.fn(),
}));

const mockGetPrograms = programService.getPrograms as ReturnType<typeof vi.fn>;
const mockGetProgram = programService.getProgram as ReturnType<typeof vi.fn>;

const mockProgram = {
  id: 1,
  programName: 'Youth Initiative',
  programDescription: 'A program for youth',
  programTypeId: 1,
  status: 'SUBMITTED' as const,
  createdAt: '2026-01-01T00:00:00Z',
};

const mockPagedResponse = {
  content: [mockProgram],
  totalElements: 1,
  totalPages: 1,
  page: 0,
  size: 20,
};

describe('usePrograms', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with isLoading=true and fetches programs', async () => {
    mockGetPrograms.mockResolvedValue(mockPagedResponse);
    const { result } = renderHook(() => usePrograms());
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.programs).toHaveLength(1);
    expect(result.current.programs[0].programName).toBe('Youth Initiative');
    expect(result.current.totalElements).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });

  it('sets error when fetch fails', async () => {
    const mockError = { title: 'Not Found', status: 404, detail: 'Not found', type: 'about:blank', instance: '' };
    mockGetPrograms.mockRejectedValue(mockError);
    const { result } = renderHook(() => usePrograms());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toEqual(mockError);
    expect(result.current.programs).toHaveLength(0);
  });

  it('refetch re-calls the API', async () => {
    mockGetPrograms.mockResolvedValue(mockPagedResponse);
    const { result } = renderHook(() => usePrograms());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.refetch(); });
    expect(mockGetPrograms).toHaveBeenCalledTimes(2);
  });

  it('setPage updates the page and triggers refetch', async () => {
    mockGetPrograms.mockResolvedValue(mockPagedResponse);
    const { result } = renderHook(() => usePrograms());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.setPage(2); });
    await waitFor(() => expect(result.current.page).toBe(2));
  });

  it('setFilters updates status filter and resets page', async () => {
    mockGetPrograms.mockResolvedValue(mockPagedResponse);
    const { result } = renderHook(() => usePrograms());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.setFilters({ status: 'APPROVED' }); });
    await waitFor(() => expect(result.current.page).toBe(0));
    expect(mockGetPrograms).toHaveBeenCalledWith(expect.objectContaining({ status: 'APPROVED' }));
  });
});

describe('useProgram', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches a single program by id', async () => {
    mockGetProgram.mockResolvedValue(mockProgram);
    const { result } = renderHook(() => useProgram(1));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.program).toEqual(mockProgram);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    const mockError = { title: 'Not Found', status: 404, detail: 'Not found', type: 'about:blank', instance: '' };
    mockGetProgram.mockRejectedValue(mockError);
    const { result } = renderHook(() => useProgram(999));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toEqual(mockError);
    expect(result.current.program).toBeNull();
  });

  it('refetch re-calls the API', async () => {
    mockGetProgram.mockResolvedValue(mockProgram);
    const { result } = renderHook(() => useProgram(1));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.refetch(); });
    expect(mockGetProgram).toHaveBeenCalledTimes(2);
  });
});
