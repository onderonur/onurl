import '@/common/CommonTypes';
import { Maybe } from '@/common/CommonTypes';
import mongoose from 'mongoose';
import ShortUrl from './ShortUrl';

const models = {
  ShortUrl,
};

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable');
}

declare global {
  // eslint-disable-next-line no-var
  var db: {
    conn: Maybe<typeof mongoose>;
    promise: Maybe<Promise<typeof mongoose>>;
  };
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.db;

if (!cached) {
  global.db = { conn: null, promise: null };
  cached = global.db;
}

// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
async function connectToDb() {
  if (cached.conn) {
    return models;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URL, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return models;
}

export default connectToDb;
