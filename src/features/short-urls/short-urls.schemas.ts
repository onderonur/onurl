import { z } from 'zod';

const MAX_CUSTOM_ALIAS_LENGTH = 30;

export const shortUrlInputSchema = z.object({
  url: z.string().trim().url({ message: 'URL does not have a valid format' }),
  customAlias: z
    .string()
    .trim()
    .regex(/^([\dA-Za-z]+)?$/, {
      message: 'Alias should only contain letters and numbers',
    })
    .max(MAX_CUSTOM_ALIAS_LENGTH, {
      message: `Max custom alias length is ${MAX_CUSTOM_ALIAS_LENGTH}`,
    }),
});

export type ShortUrlInput = z.infer<typeof shortUrlInputSchema>;
