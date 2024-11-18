import type { ShortUrl } from '@prisma/client';

export const DEFAULT_ALIAS_LENGTH = 10;
export const URL_LIFETIME_IN_MINUTES = 5;

export const isShortUrlExpired = (shortUrl: ShortUrl) => {
  const now = Date.now();
  const urlExpiresAt =
    shortUrl.createdAt.getTime() + URL_LIFETIME_IN_MINUTES * 60 * 1000;
  return now >= urlExpiresAt;
};
