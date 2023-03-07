import { Prisma } from '@prisma/client';

export function isUniqueConstraintError(
  err: unknown,
): err is Prisma.PrismaClientKnownRequestError {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    err.code === 'P2002'
  );
}
