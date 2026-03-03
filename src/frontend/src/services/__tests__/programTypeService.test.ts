import { getProgramTypes } from '../programTypeService';
import apiClient from '../apiClient';

vi.mock('../apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = (apiClient as { get: ReturnType<typeof vi.fn> }).get;

describe('programTypeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all program types from the API', async () => {
    const mockTypes = [
      { id: 1, typeName: 'Community Services', typeNameFr: 'Services communautaires' },
      { id: 2, typeName: 'Health & Wellness', typeNameFr: 'Santé et bien-être' },
    ];
    mockedGet.mockResolvedValue({ data: mockTypes });

    const result = await getProgramTypes();
    expect(result).toEqual(mockTypes);
    expect(mockedGet).toHaveBeenCalledWith('/program-types');
  });

  it('returns an empty array when no types exist', async () => {
    mockedGet.mockResolvedValue({ data: [] });
    const result = await getProgramTypes();
    expect(result).toEqual([]);
  });
});
