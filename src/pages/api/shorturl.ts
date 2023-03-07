import { NextApiHandler, NextApiRequest } from 'next';
import { nanoid } from 'nanoid';
import handleErrors from '@/error-handling/handleErrors';
import createApiError from '@/error-handling/createApiError';
import { parse } from 'uri-js';
import {
  shortUrlInputSchema,
  DEFAULT_ALIAS_LENGTH,
} from '@/short-url/ShortUrlUtils';
import connectToDb from '@/db/connectToDb';
import { goTry } from 'go-try';
import { isUniqueConstraintError } from '@/db/DbUtils';

// https://stackoverflow.com/a/19709846
const isAbsoluteUrl = (url: string) => {
  if (url.startsWith('//')) {
    return true;
  }

  const uri = parse(url);
  return !!uri.scheme;
};

const extractPostInput = async (req: NextApiRequest) => {
  try {
    await shortUrlInputSchema.validate(req.body);
  } catch (err) {
    throw createApiError(422, (err as Error).message);
  }
  let { url } = req.body;
  url = url.trim();
  // If we have no protocol, we add "http" prefix.
  // Otherwise, it redirects to "http://localhost:3000/<url>"
  // instead of "http(s)://<url>".
  if (!isAbsoluteUrl(url)) {
    url = `http://${url}`;
  }
  let { customAlias } = req.body;
  customAlias = customAlias.trim();
  customAlias = encodeURIComponent(customAlias);
  return { url, customAlias };
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      const { url, customAlias } = await extractPostInput(req);

      const prisma = await connectToDb();

      const [err, shortUrl] = await goTry(() =>
        prisma.shortUrl.create({
          data: {
            url,
            alias: customAlias || nanoid(DEFAULT_ALIAS_LENGTH),
            clicks: 0,
          },
        }),
      );

      if (err) {
        if (isUniqueConstraintError(err)) {
          throw createApiError(
            422,
            `"${customAlias}" is already in use. Please use another alias.`,
          );
        }

        throw err;
      }

      res.json(shortUrl);
      break;
    }
    default:
      throw createApiError(405, 'Method Not Allowed');
  }
};

export default handleErrors(handler);
