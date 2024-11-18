'use server';

import type { ServerActionState } from '@/core/actions/types';
import { connectToDb } from '@/core/db/db';
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

export async function createShortUrl(
  previousState: ServerActionState<ShortUrlInput, ShortUrl> | null,
  formData: FormData,
): Promise<ServerActionState<ShortUrlInput, ShortUrl>> {
  const input = shortUrlInputSchema.safeParse({
    url: formData.get('url'),
    customAlias: formData.get('customAlias'),
  });

  if (!input.success) {
    return {
      success: false,
      fieldErrors: input.error.format(),
      formData,
    };
  }

  const { data } = input;

  const parsedUrl = new URL(data.url);

  if (parsedUrl.origin === process.env.NEXT_PUBLIC_BASE_URL) {
    return { success: false, error: 'Invalid host', formData };
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
        formData,
      };
    }

    return { success: false, error: error.message, formData };
  }

  return { success: true, data: shortUrl };
}

export async function increaseShortUrlClicks(alias: string) {
  const prisma = await connectToDb();

  const shortUrl = await getShortUrl(alias);

  if (!shortUrl) return;

  await prisma.shortUrl.update({
    where: { alias },
    data: { clicks: shortUrl.clicks + 1 },
  });
}
