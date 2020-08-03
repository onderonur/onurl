import '@/types';
import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Maybe } from '@/types';
import models from '../models';

declare module 'http' {
  interface IncomingMessage {
    models: Maybe<typeof models>;
  }
}

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let pendingPromise: Maybe<Promise<typeof mongoose>> = null;

// https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/
const withDb = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const next = () => {
    req.models = models;
    return fn(req, res);
  };

  const { readyState } = mongoose.connection;

  // TODO: May need to handle concurrent requests
  // with a little bit more details (disconnecting, disconnected etc).
  if (readyState === readyStates.connected) {
    return next();
  } else if (pendingPromise) {
    // Wait for the already pending promise if there is one.
    await pendingPromise;
    return next();
  }

  pendingPromise = mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }

  next();
};

export default withDb;
