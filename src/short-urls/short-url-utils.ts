import type { ShortUrl } from '@prisma/client';
import { z } from 'zod';

const MAX_CUSTOM_ALIAS_LENGTH = 30;
export const DEFAULT_ALIAS_LENGTH = 10;
export const URL_LIFETIME_IN_MINUTES = 5;

export const shortUrlInputSchema = z.object({
  url: z.string().trim().url({ message: 'URL does not have a valid format' }),
  customAlias: z
    .string()
    .trim()
    .regex(/^([a-zA-Z1-9]+)?$/, {
      message: 'Alias should only contain letters and numbers',
    })
    .max(MAX_CUSTOM_ALIAS_LENGTH, {
      message: `Max custom alias length is ${MAX_CUSTOM_ALIAS_LENGTH}`,
    }),
});

export type ShortUrlInput = z.infer<typeof shortUrlInputSchema>;

export const isShortUrlExpired = (shortUrl: ShortUrl) => {
  const now = Date.now();
  const urlExpiresAt =
    shortUrl.createdAt.getTime() + URL_LIFETIME_IN_MINUTES * 60 * 1000;
  return now >= urlExpiresAt;
};
