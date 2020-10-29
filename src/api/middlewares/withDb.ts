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
    useFindAndModify: false,
  });

  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }

  // We need to return "next" from "withDb". Otherwise, if it wraps an async function,
  // the wrapper function of "withDb" (like "handleErrors" etc)
  // can't wait and catch errors inside it the function wrapped by "withDb".
  // It just waits for "withDb" to complete and continues.
  // As an alternative, we can "await" this "next" too of course.
  // Main point is, waiting it to be completed.
  return next();
};

export default withDb;
