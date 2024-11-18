import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const prismaErrorSchema = z.instanceof(
  Prisma.PrismaClientKnownRequestError,
);
