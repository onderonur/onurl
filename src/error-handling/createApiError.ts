import ApiError from './ApiError';

// https://github.com/zeit/micro#error-handling
export default function createApiError(statusCode: number, message: string) {
  const err = new ApiError(statusCode, message);
  return err;
}
