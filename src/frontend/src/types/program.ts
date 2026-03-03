/**
 * CIVIC Program Types
 * TypeScript interfaces for program management domain
 */

export type ProgramStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface Program {
  id: number;
  programName: string;
  programDescription?: string;
  programTypeId: number;
  programTypeName?: string;
  status: ProgramStatus;
  reviewerComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface ProgramType {
  id: number;
  typeName: string;
  typeNameFr: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface CreateProgramRequest {
  programName: string;
  programDescription?: string;
  programTypeId: number;
  createdBy?: string;
}

export interface ReviewProgramRequest {
  status: 'APPROVED' | 'REJECTED';
  reviewerComments?: string;
}

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  violations?: ValidationViolation[];
}

export interface ValidationViolation {
  field: string;
  message: string;
}
