import { increaseShortUrlClicks } from '@/features/short-urls/actions';
import { getShortUrl } from '@/features/short-urls/data';
import { isShortUrlExpired } from '@/features/short-urls/utils';
import { notFound, permanentRedirect } from 'next/navigation';

type AliasPageProps = {
  params: Promise<{
    alias: string;
  }>;
};

export default async function AliasPage(props: AliasPageProps) {
  const { alias } = await props.params;
  await increaseShortUrlClicks(alias);

  const shortUrl = await getShortUrl(alias);

  if (!shortUrl || isShortUrlExpired(shortUrl)) {
    notFound();
  }

  return permanentRedirect(shortUrl.url);
}
