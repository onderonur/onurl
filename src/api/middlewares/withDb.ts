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

// https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/
const withDb = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const next = () => {
    req.models = models;
    return fn(req, res);
  };

  // TODO: May need the handle concurrent request
  // with a little bit more details (like connecting... etc).
  if (mongoose.connections[0].readyState) {
    return next();
  }

  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return next();
};

export default withDb;
