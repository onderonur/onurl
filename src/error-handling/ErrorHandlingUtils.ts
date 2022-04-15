import { AxiosError } from 'axios';
import ApiError from './ApiError';

export function isAxiosError(error: unknown): error is AxiosError<ApiError> {
  return (error as AxiosError).isAxiosError;
}
