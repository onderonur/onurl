import { prisma } from '@/core/db/db';
import { cache } from 'react';
import 'server-only';

export const getShortUrl = cache(async (alias: string) => {
  const shortUrl = await prisma.shortUrl.findFirst({
    where: { alias },
  });

  return shortUrl;
});
