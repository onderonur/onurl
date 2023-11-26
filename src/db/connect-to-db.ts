import type { Maybe } from '@/common/common-types';
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
  if (!global.db) {
    global.db = { prisma: new PrismaClient(), promise: null };
  }

  if (!global.db.promise) {
    global.db.promise = global.db.prisma.$connect();
  }

  await global.db.promise;

  return global.db.prisma;
}
