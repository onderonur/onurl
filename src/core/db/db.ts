import type { Maybe } from '@/core/shared/types';
import { PrismaClient } from '@prisma/client';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable');
}

declare global {
  // eslint-disable-next-line no-var
  var db: Maybe<{
    prisma: PrismaClient;
    promise: Maybe<Promise<void>>;
  }>;
}

export async function connectToDb() {
  if (!globalThis.db) {
    globalThis.db = { prisma: new PrismaClient(), promise: null };
  }

  if (!globalThis.db.promise) {
    globalThis.db.promise = globalThis.db.prisma.$connect();
  }

  await globalThis.db.promise;

  return globalThis.db.prisma;
}
