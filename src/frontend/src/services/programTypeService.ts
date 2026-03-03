import apiClient from './apiClient';
import type { ProgramType } from '../types/program';

/**
 * Get all available program types
 */
export const getProgramTypes = async (): Promise<ProgramType[]> => {
  const response = await apiClient.get<ProgramType[]>('/program-types');
  return response.data;
};
