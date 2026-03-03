import { getPrograms, getProgram, createProgram, reviewProgram } from '../programService';
import apiClient from '../apiClient';

vi.mock('../apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

const mockedApiClient = apiClient as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
};

describe('programService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPrograms', () => {
    it('returns paged programs from the API', async () => {
      const mockData = {
        content: [{ id: 1, programName: 'Test', status: 'SUBMITTED' }],
        totalElements: 1,
        totalPages: 1,
        page: 0,
        size: 20,
      };
      mockedApiClient.get.mockResolvedValue({ data: mockData });

      const result = await getPrograms({});
      expect(result).toEqual(mockData);
      expect(mockedApiClient.get).toHaveBeenCalledWith('/programs', expect.any(Object));
    });

    it('passes default page=0 and size=20', async () => {
      mockedApiClient.get.mockResolvedValue({ data: { content: [], totalElements: 0, totalPages: 0, page: 0, size: 20 } });
      await getPrograms({});
      expect(mockedApiClient.get).toHaveBeenCalledWith('/programs', {
        params: { status: undefined, programTypeId: undefined, page: 0, size: 20 },
      });
    });

    it('passes status and programTypeId filters when provided', async () => {
      mockedApiClient.get.mockResolvedValue({ data: { content: [], totalElements: 0, totalPages: 0, page: 0, size: 20 } });
      await getPrograms({ status: 'APPROVED', programTypeId: 2, page: 1, size: 10 });
      expect(mockedApiClient.get).toHaveBeenCalledWith('/programs', {
        params: { status: 'APPROVED', programTypeId: 2, page: 1, size: 10 },
      });
    });
  });

  describe('getProgram', () => {
    it('returns a single program by id', async () => {
      const mockProgram = { id: 42, programName: 'Test', status: 'DRAFT', programTypeId: 1, createdAt: '2026-01-01T00:00:00Z' };
      mockedApiClient.get.mockResolvedValue({ data: mockProgram });

      const result = await getProgram(42);
      expect(result).toEqual(mockProgram);
      expect(mockedApiClient.get).toHaveBeenCalledWith('/programs/42');
    });
  });

  describe('createProgram', () => {
    it('posts program data and returns created program', async () => {
      const request = { programName: 'New', programTypeId: 1, createdBy: 'a@b.com' };
      const mockProgram = { id: 5, programName: 'New', programTypeId: 1, status: 'SUBMITTED', createdAt: '2026-01-01T00:00:00Z', createdBy: 'a@b.com' };
      mockedApiClient.post.mockResolvedValue({ data: mockProgram });

      const result = await createProgram(request);
      expect(result).toEqual(mockProgram);
      expect(mockedApiClient.post).toHaveBeenCalledWith('/programs', request);
    });
  });

  describe('reviewProgram', () => {
    it('puts review data and returns updated program', async () => {
      const reviewData = { status: 'APPROVED' as const, reviewerComments: 'Good' };
      const mockProgram = { id: 1, programName: 'Test', status: 'APPROVED', programTypeId: 1, createdAt: '2026-01-01T00:00:00Z' };
      mockedApiClient.put.mockResolvedValue({ data: mockProgram });

      const result = await reviewProgram(1, reviewData);
      expect(result).toEqual(mockProgram);
      expect(mockedApiClient.put).toHaveBeenCalledWith('/programs/1/review', reviewData);
    });
  });
});
