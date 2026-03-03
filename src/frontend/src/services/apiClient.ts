import axios, { AxiosError } from 'axios';
import type { ProblemDetail } from '../types/program';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetail>) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({
      type: 'about:blank',
      title: 'Network Error',
      status: 0,
      detail: 'Unable to connect to the server',
      instance: error.config?.url || '',
    } as ProblemDetail);
  }
);

export default apiClient;
