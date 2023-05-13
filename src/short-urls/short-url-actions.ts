'use server';

import { nanoid } from 'nanoid';
import {
  shortUrlInputSchema,
  DEFAULT_ALIAS_LENGTH,
} from '@/short-urls/short-url-utils';
import connectToDb from '@/db/connect-to-db';
import { goTry } from 'go-try';
import { isUniqueConstraintError } from '@/db/db-utils';
import { getShortUrl } from './short-url-fetchers';
import { createAction } from '@/server-actions/server-action-utils';

export const createShortUrl = createAction(async (formData: FormData) => {
  const input = shortUrlInputSchema.safeParse({
    url: formData.get('url'),
    customAlias: formData.get('customAlias'),
  });

  if (!input.success) {
    throw input.error;
  }

  const prisma = await connectToDb();

  const { data } = input;

  const [err, shortUrl] = await goTry(() =>
    prisma.shortUrl.create({
      data: {
        url: data.url,
        alias: data.customAlias || nanoid(DEFAULT_ALIAS_LENGTH),
        clicks: 0,
      },
    }),
  );

  if (err) {
    if (isUniqueConstraintError(err)) {
      throw new Error(
        `"${data.customAlias}" is already in use. Please use another alias.`,
      );
    }

    throw err;
  }

  return shortUrl;
});

export async function increaseShortUrlClicks(alias: string) {
  const prisma = await connectToDb();

  const shortUrl = await getShortUrl(alias);

  if (!shortUrl) {
    return;
  }

  await prisma.shortUrl.update({
    where: { alias },
    data: { clicks: shortUrl.clicks + 1 },
  });
}
