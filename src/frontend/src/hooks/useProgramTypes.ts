import { useState, useEffect, useCallback } from 'react';
import type { ProgramType, ProblemDetail } from '../types/program';
import { getProgramTypes } from '../services/programTypeService';

interface UseProgramTypesResult {
  programTypes: ProgramType[];
  isLoading: boolean;
  error: ProblemDetail | null;
  refetch: () => void;
}

export const useProgramTypes = (): UseProgramTypesResult => {
  const [programTypes, setProgramTypes] = useState<ProgramType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ProblemDetail | null>(null);

  const fetchProgramTypes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProgramTypes();
      setProgramTypes(data);
    } catch (err) {
      setError(err as ProblemDetail);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgramTypes();
  }, [fetchProgramTypes]);

  return { programTypes, isLoading, error, refetch: fetchProgramTypes };
};
