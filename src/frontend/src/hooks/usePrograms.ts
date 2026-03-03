import { useState, useEffect, useCallback } from 'react';
import type { Program, PagedResponse, ProblemDetail, ProgramStatus } from '../types/program';
import { getPrograms, getProgram } from '../services/programService';
import type { GetProgramsParams } from '../services/programService';

interface UseProgramsResult {
  programs: Program[];
  totalElements: number;
  totalPages: number;
  page: number;
  isLoading: boolean;
  error: ProblemDetail | null;
  refetch: () => void;
  setPage: (page: number) => void;
  setFilters: (filters: { status?: ProgramStatus; programTypeId?: number }) => void;
}

export const usePrograms = (
  initialParams: GetProgramsParams = {}
): UseProgramsResult => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(initialParams.page ?? 0);
  const [status, setStatus] = useState<ProgramStatus | undefined>(initialParams.status);
  const [programTypeId, setProgramTypeId] = useState<number | undefined>(
    initialParams.programTypeId
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ProblemDetail | null>(null);

  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PagedResponse<Program> = await getPrograms({
        status,
        programTypeId,
        page,
        size: initialParams.size ?? 20,
      });
      setPrograms(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err as ProblemDetail);
    } finally {
      setIsLoading(false);
    }
  }, [status, programTypeId, page, initialParams.size]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const setFilters = useCallback(
    (filters: { status?: ProgramStatus; programTypeId?: number }) => {
      setStatus(filters.status);
      setProgramTypeId(filters.programTypeId);
      setPage(0); // Reset to first page when filters change
    },
    []
  );

  return {
    programs,
    totalElements,
    totalPages,
    page,
    isLoading,
    error,
    refetch: fetchPrograms,
    setPage,
    setFilters,
  };
};

interface UseProgramResult {
  program: Program | null;
  isLoading: boolean;
  error: ProblemDetail | null;
  refetch: () => void;
}

export const useProgram = (id: number): UseProgramResult => {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ProblemDetail | null>(null);

  const fetchProgram = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProgram(id);
      setProgram(data);
    } catch (err) {
      setError(err as ProblemDetail);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProgram();
  }, [fetchProgram]);

  return { program, isLoading, error, refetch: fetchProgram };
};
