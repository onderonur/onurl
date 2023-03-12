import { goTry } from 'go-try';
import { NextRequest, NextResponse } from 'next/server';
import ApiError from './ApiError';

// https://github.com/zeit/micro#error-handling
const handleErrors =
  (handler: (request: NextRequest) => Promise<NextResponse>) =>
  async (request: NextRequest) => {
    const [err, response] = await goTry(async () => await handler(request));

    if (err) {
      let statusCode = 500;
      let message = 'Oops, something went wrong!';
      if (err instanceof ApiError) {
        ({ statusCode, message } = err);
      }
      return NextResponse.json({ statusCode, message }, { status: statusCode });
    }

    return response;
  };

export default handleErrors;
