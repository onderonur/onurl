'use server';

import type { ServerActionState } from '@/core/actions/types';
import { prisma } from '@/core/db/db';
import { isUniqueConstraintError } from '@/core/db/utils';
import { getShortUrl } from '@/features/short-urls/data';
import { DEFAULT_ALIAS_LENGTH } from '@/features/short-urls/utils';
import type { ShortUrl } from '@prisma/client';
import { goTry } from 'go-try';
import { customAlphabet } from 'nanoid';
import type { ShortUrlInput } from './schemas';
import { shortUrlInputSchema } from './schemas';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
);

type CreateShortUrlState = ServerActionState<ShortUrlInput, ShortUrl>;

export async function createShortUrl(
  previousState: CreateShortUrlState,
  formData: FormData,
): Promise<CreateShortUrlState> {
  const input = shortUrlInputSchema.safeParse({
    url: formData.get('url'),
    customAlias: formData.get('customAlias'),
  });

  if (!input.success) {
    return {
      status: 'error',
      fieldErrors: input.error.format(),
      formData,
    };
  }

  const { data } = input;

  const parsedUrl = new URL(data.url);

  if (parsedUrl.origin === process.env.NEXT_PUBLIC_BASE_URL) {
    return { status: 'error', error: 'Invalid host', formData };
  }

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
        status: 'error',
        error: `"${data.customAlias}" is already in use. Please use another alias.`,
        formData,
      };
    }

    return { status: 'error', error: error.message, formData };
  }

  return { status: 'success', data: shortUrl };
}

export async function increaseShortUrlClicks(alias: string) {
  const shortUrl = await getShortUrl(alias);

  if (!shortUrl) return;

  await prisma.shortUrl.update({
    where: { alias },
    data: { clicks: shortUrl.clicks + 1 },
  });
}
