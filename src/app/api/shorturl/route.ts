import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import createApiError from '@/error-handling/createApiError';
import { parse } from 'uri-js';
import {
  shortUrlInputSchema,
  DEFAULT_ALIAS_LENGTH,
} from '@/short-url/ShortUrlUtils';
import connectToDb from '@/db/connectToDb';
import { goTry } from 'go-try';
import { isUniqueConstraintError } from '@/db/DbUtils';
import handleErrors from '@/error-handling/handleErrors';

// https://stackoverflow.com/a/19709846
const isAbsoluteUrl = (url: string) => {
  if (url.startsWith('//')) {
    return true;
  }

  const uri = parse(url);

  return !!uri.scheme;
};

const extractPostInput = async (request: NextRequest) => {
  const body = await request.json();
  const result = shortUrlInputSchema.safeParse(body);

  if (!result.success) {
    throw createApiError(422, result.error.message);
  }

  let { url, customAlias } = result.data;

  // If we have no protocol, we add "http" prefix.
  // Otherwise, it redirects to "http://localhost:3000/<url>"
  // instead of "http(s)://<url>".
  if (!isAbsoluteUrl(url)) {
    url = `http://${url}`;
  }

  customAlias = encodeURIComponent(customAlias);

  return { url, customAlias };
};

export const POST = handleErrors(async (request: NextRequest) => {
  const { url, customAlias } = await extractPostInput(request);

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

  return NextResponse.json(shortUrl);
});
