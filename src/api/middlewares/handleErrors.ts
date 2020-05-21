import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// https://github.com/zeit/micro#error-handling
const handleErrors = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    return await fn(req, res);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.message || 'Oops, something went wrong!';
    res.status(status).send(message);
  }
};

export default handleErrors;
