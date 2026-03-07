import { db } from '@/core/db/db';
import { shortUrls } from '@/core/db/schema';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import 'server-only';

export const getShortUrl = cache(async (alias: string) => {
  const [shortUrl] = await db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.alias, alias))
    .limit(1);

  return shortUrl;
});
