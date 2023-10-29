import { increaseShortUrlClicks } from '@/short-urls/short-url-actions';
import { getShortUrl } from '@/short-urls/short-url-fetchers';
import { isShortUrlExpired } from '@/short-urls/short-url-utils';
import { notFound, permanentRedirect } from 'next/navigation';

type AliasPageProps = {
  params: {
    alias: string;
  };
};

export default async function AliasPage({ params }: AliasPageProps) {
  const { alias } = params;

  const shortUrl = await getShortUrl(alias);

  if (!shortUrl || isShortUrlExpired(shortUrl)) {
    notFound();
  }

  await increaseShortUrlClicks(alias);

  return permanentRedirect(shortUrl.url);
}
