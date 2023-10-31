import { Prisma } from '@prisma/client';
import { z } from 'zod';

const PrismaErrorSchema = z.instanceof(Prisma.PrismaClientKnownRequestError);

export function isUniqueConstraintError(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  const prismaError = PrismaErrorSchema.safeParse(error);

  // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
  return prismaError.success && prismaError.data.code === 'P2002';
}
