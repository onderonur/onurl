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

let queue: {
  resolve: (next: void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (err: any) => void;
  next: VoidFunction;
}[] = [];

// https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/
const withDb = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const next = () => {
    req.models = models;
    return fn(req, res);
  };

  const { readyState } = mongoose.connections[0];

  // TODO: May need the handle concurrent requests
  // with a little bit more details (disconnecting, disconnected etc).
  switch (readyState) {
    case readyStates.connected:
      return next();
    case readyStates.connecting:
      return new Promise<void>((resolve, reject) => {
        queue.push({ resolve, reject, next });
      });
    default:
      try {
        await mongoose.connect(process.env.DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });

        next();
      } catch (err) {
        queue.forEach(({ reject }) => reject(err));
        queue = [];
      }

      queue.forEach(({ resolve, next }) => resolve(next()));
      queue = [];
  }
};

export default withDb;
