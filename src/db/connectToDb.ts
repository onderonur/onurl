import '@/common/CommonTypes';
import mongoose from 'mongoose';
import { Maybe } from '@/common/CommonTypes';
import ShortUrl from './ShortUrl';

const models = {
  ShortUrl,
};

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let pendingPromise: Maybe<Promise<typeof mongoose>> = null;

async function connectToDb() {
  const { readyState } = mongoose.connection;

  // TODO: May need to handle concurrent requests
  // with a little bit more details (disconnecting, disconnected etc).
  if (readyState === readyStates.connected) {
    return models;
  } else if (pendingPromise) {
    // Wait for the already pending promise if there is one.
    await pendingPromise;
    return models;
  }

  pendingPromise = mongoose.connect(process.env.DATABASE_URL);

  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }

  return models;
}

export default connectToDb;
