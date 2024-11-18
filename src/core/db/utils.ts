import type { Prisma } from '@prisma/client';
import { prismaErrorSchema } from './schemas';

export function isUniqueConstraintError(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  const prismaError = prismaErrorSchema.safeParse(error);

  // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
  return prismaError.success && prismaError.data.code === 'P2002';
}
