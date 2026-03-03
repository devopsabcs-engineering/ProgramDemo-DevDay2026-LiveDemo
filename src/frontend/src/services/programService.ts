import apiClient from './apiClient';
import type {
  Program,
  CreateProgramRequest,
  ReviewProgramRequest,
  PagedResponse,
  ProgramStatus,
} from '../types/program';

export interface GetProgramsParams {
  status?: ProgramStatus;
  programTypeId?: number;
  page?: number;
  size?: number;
}

/**
 * Get paginated list of programs with optional filtering
 */
export const getPrograms = async (
  params: GetProgramsParams = {}
): Promise<PagedResponse<Program>> => {
  const response = await apiClient.get<PagedResponse<Program>>('/programs', {
    params: {
      status: params.status,
      programTypeId: params.programTypeId,
      page: params.page ?? 0,
      size: params.size ?? 20,
    },
  });
  return response.data;
};

/**
 * Get a single program by ID
 */
export const getProgram = async (id: number): Promise<Program> => {
  const response = await apiClient.get<Program>(`/programs/${id}`);
  return response.data;
};

/**
 * Create a new program request
 */
export const createProgram = async (
  data: CreateProgramRequest
): Promise<Program> => {
  const response = await apiClient.post<Program>('/programs', data);
  return response.data;
};

/**
 * Submit a draft program for review
 */
export const submitProgram = async (id: number): Promise<Program> => {
  const response = await apiClient.put<Program>(`/programs/${id}/submit`);
  return response.data;
};

/**
 * Review a submitted program (approve/reject)
 */
export const reviewProgram = async (
  id: number,
  data: ReviewProgramRequest
): Promise<Program> => {
  const response = await apiClient.put<Program>(`/programs/${id}/review`, data);
  return response.data;
};
