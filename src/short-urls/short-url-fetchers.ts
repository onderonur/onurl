import connectToDb from '@/db/connect-to-db';
import { cache } from 'react';

export const getShortUrl = cache(async (alias: string) => {
  const prisma = await connectToDb();

  const shortUrl = await prisma.shortUrl.findFirst({
    where: { alias },
  });

  return shortUrl;
});
