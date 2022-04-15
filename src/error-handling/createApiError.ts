import ApiError from './ApiError';

// https://github.com/zeit/micro#error-handling
const createApiError = (statusCode: number, message: string) => {
  const err = new ApiError(statusCode, message);
  return err;
};

export default createApiError;
