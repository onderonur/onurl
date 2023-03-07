import { NextApiHandler, NextApiRequest } from 'next';
import { nanoid } from 'nanoid';
import handleErrors from '@/error-handling/handleErrors';
import createApiError from '@/error-handling/createApiError';
import * as Yup from 'yup';
import { parse } from 'uri-js';
import {
  shortUrlInputSchema,
  DEFAULT_ALIAS_LENGTH,
  URL_LIFETIME_IN_MINUTES,
} from '@/short-url/ShortUrlUtils';
import { ShortUrl } from '@prisma/client';
import connectToDb from '@/db/connectToDb';
import { goTry } from 'go-try';
import { isUniqueConstraintError } from '@/db/DbUtils';

const getInputValidationSchema = Yup.object().shape({
  alias: Yup.string().label('Alias').required().trim(),
});

const extractGetInput = async (req: NextApiRequest) => {
  try {
    await getInputValidationSchema.validate(req.query);
  } catch (err) {
    throw createApiError(422, (err as Error).message);
  }
  const { alias } = req.query;
  if (typeof alias !== 'string') {
    throw createApiError(422, 'Invalid URL');
  }
  return alias;
};

const isShortUrlExpired = (shortUrl: ShortUrl) => {
  const now = Date.now();
  const urlExpiresAt =
    shortUrl.createdAt.getTime() + URL_LIFETIME_IN_MINUTES * 60 * 1000;
  return now >= urlExpiresAt;
};

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
  const prisma = await connectToDb();

  switch (req.method) {
    case 'GET': {
      const alias = await extractGetInput(req);

      let shortUrl = await prisma.shortUrl.findFirst({
        where: { alias },
      });

      if (!shortUrl) {
        throw createApiError(404, 'URL not found');
      }

      if (isShortUrlExpired(shortUrl)) {
        throw createApiError(404, 'URL is expired');
      }

      shortUrl = await prisma.shortUrl.update({
        where: { alias },
        data: { clicks: shortUrl.clicks + 1 },
      });

      res.json(shortUrl);
      break;
    }
    case 'POST': {
      const { url, customAlias } = await extractPostInput(req);

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
