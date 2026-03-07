'use server';

import type { ServerActionState } from '@/core/actions/types';
import { db } from '@/core/db/db';
import type { ShortUrl } from '@/core/db/schema';
import { shortUrls } from '@/core/db/schema';
import { isUniqueConstraintError } from '@/core/db/utils';
import { getShortUrl } from '@/features/short-urls/data';
import { DEFAULT_ALIAS_LENGTH } from '@/features/short-urls/utils';
import { eq, sql } from 'drizzle-orm';
import { goTry } from 'go-try';
import { customAlphabet } from 'nanoid';
import type { IncreaseShortUrlClicksInput, ShortUrlInput } from './schemas';
import {
  increaseShortUrlClicksInputSchema,
  shortUrlInputSchema,
} from './schemas';

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

  const [error, createdShortUrls] = await goTry(() =>
    db
      .insert(shortUrls)
      .values({
        url: data.url,
        alias: data.customAlias || nanoid(DEFAULT_ALIAS_LENGTH),
        clicks: 0,
        updatedAt: new Date(),
      })
      .returning(),
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

  const [shortUrl] = createdShortUrls;

  if (!shortUrl) {
    return { status: 'error', error: 'Something went wrong', formData };
  }

  return { status: 'success', data: shortUrl };
}

export async function increaseShortUrlClicks(
  alias: IncreaseShortUrlClicksInput,
) {
  const parsedAlias = increaseShortUrlClicksInputSchema.safeParse(alias);

  if (!parsedAlias.success) return;

  const shortUrl = await getShortUrl(parsedAlias.data);

  if (!shortUrl) return;

  await db
    .update(shortUrls)
    .set({
      clicks: sql`${shortUrls.clicks} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(shortUrls.alias, alias));
}
