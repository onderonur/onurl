import { increaseShortUrlClicks } from '@/features/short-urls/short-urls.actions';
import { getShortUrl } from '@/features/short-urls/short-urls.data';
import { isShortUrlExpired } from '@/features/short-urls/short-urls.utils';
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
