type DatabaseError = {
  code?: string;
};

export function isUniqueConstraintError(
  error: unknown,
): error is DatabaseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === '23505'
  );
}
