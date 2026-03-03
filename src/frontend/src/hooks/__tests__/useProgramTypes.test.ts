import { renderHook, act, waitFor } from '@testing-library/react';
import { useProgramTypes } from '../useProgramTypes';
import * as programTypeService from '../../services/programTypeService';

vi.mock('../../services/programTypeService', () => ({
  getProgramTypes: vi.fn(),
}));

const mockGetProgramTypes = programTypeService.getProgramTypes as ReturnType<typeof vi.fn>;

const mockTypes = [
  { id: 1, typeName: 'Community Services', typeNameFr: 'Services communautaires' },
  { id: 2, typeName: 'Health & Wellness', typeNameFr: 'Santé et bien-être' },
];

describe('useProgramTypes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches program types and returns them', async () => {
    mockGetProgramTypes.mockResolvedValue(mockTypes);
    const { result } = renderHook(() => useProgramTypes());
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.programTypes).toHaveLength(2);
    expect(result.current.programTypes[0].typeName).toBe('Community Services');
    expect(result.current.error).toBeNull();
  });

  it('returns empty list when no types exist', async () => {
    mockGetProgramTypes.mockResolvedValue([]);
    const { result } = renderHook(() => useProgramTypes());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.programTypes).toHaveLength(0);
  });

  it('sets error when fetch fails', async () => {
    const mockError = { title: 'Server Error', status: 500, detail: 'Internal error', type: 'about:blank', instance: '' };
    mockGetProgramTypes.mockRejectedValue(mockError);
    const { result } = renderHook(() => useProgramTypes());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toEqual(mockError);
    expect(result.current.programTypes).toHaveLength(0);
  });

  it('refetch re-calls the API', async () => {
    mockGetProgramTypes.mockResolvedValue(mockTypes);
    const { result } = renderHook(() => useProgramTypes());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.refetch(); });
    expect(mockGetProgramTypes).toHaveBeenCalledTimes(2);
  });
});
