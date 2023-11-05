'use server';

import { customAlphabet } from 'nanoid';
import type { ShortUrlInput } from '@/short-urls/short-url-utils';
import {
  shortUrlInputSchema,
  DEFAULT_ALIAS_LENGTH,
} from '@/short-urls/short-url-utils';
import connectToDb from '@/db/connect-to-db';
import { goTry } from 'go-try';
import { isUniqueConstraintError } from '@/db/db-utils';
import { getShortUrl } from './short-url-fetchers';
import type { ServerActionResult } from '@/server-actions/server-action-types';
import type { ShortUrl } from '@prisma/client';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
);

export async function createShortUrl(
  currentState: ServerActionResult<ShortUrlInput, ShortUrl> | null,
  formData: FormData,
): Promise<ServerActionResult<ShortUrlInput, ShortUrl>> {
  const input = shortUrlInputSchema.safeParse({
    url: formData.get('url'),
    customAlias: formData.get('customAlias'),
  });

  if (!input.success) {
    return { success: false, fieldErrors: input.error.format() };
  }

  const { data } = input;

  const parsedUrl = new URL(data.url);

  if (parsedUrl.origin === process.env.NEXT_PUBLIC_BASE_URL) {
    return { success: false, error: 'Invalid host' };
  }

  const prisma = await connectToDb();

  const [error, shortUrl] = await goTry(() =>
    prisma.shortUrl.create({
      data: {
        url: data.url,
        alias: data.customAlias || nanoid(DEFAULT_ALIAS_LENGTH),
        clicks: 0,
      },
    }),
  );

  if (error) {
    if (isUniqueConstraintError(error)) {
      return {
        success: false,
        error: `"${data.customAlias}" is already in use. Please use another alias.`,
      };
    }

    return { success: false, error: error.message };
  }

  return { success: true, data: shortUrl };
}

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
