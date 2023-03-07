import * as Yup from 'yup';
import validator from 'validator';
import { ShortUrl } from '@prisma/client';

const MAX_CUSTOM_ALIAS_LENGTH = 30;
export const DEFAULT_ALIAS_LENGTH = 10;
export const URL_LIFETIME_IN_MINUTES = 5;

export const shortUrlInputSchema = Yup.object({
  url: Yup.string()
    .label('URL')
    .required()
    .test(
      'is-url',
      ({ label }) => `${label} does not have a valid URL format`,
      (value) => (value ? validator.isURL(value) : true),
    )
    .trim()
    .default(''),
  customAlias: Yup.string()
    .label('Custom Alias')
    .max(MAX_CUSTOM_ALIAS_LENGTH)
    .trim()
    .default(''),
});

export const isShortUrlExpired = (shortUrl: ShortUrl) => {
  const now = Date.now();
  const urlExpiresAt =
    shortUrl.createdAt.getTime() + URL_LIFETIME_IN_MINUTES * 60 * 1000;
  return now >= urlExpiresAt;
};
